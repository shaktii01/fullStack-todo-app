const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const imagekit = require("../services/storage.services");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

async function registerUser(req, res) {
    try {
        const { username, email, password } = req.body;
        const isUserAlreadyExists = await userModel.findOne({
            $or: [{ username }, { email }]
        });

        if (isUserAlreadyExists) {
            return res.status(409).json({
                message: 'user alrady exists '
            })
        }
        const hash = await bcrypt.hash(password, 10)
        const user = await userModel.create({
            username,
            email,
            password: hash,
        })

        const token = jwt.sign({
            id: user._id
        }, process.env.JWT_SECRET);

        res.cookie("token", token);
        res.status(201).json({
            message: 'User registered successfully'
        })
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error'
        })
    }

}

async function loginUser(req, res) {
    try {
        const { username, email, password } = req.body;
        const user = await userModel.findOne({
            $or: [
                { username },
                { email }
            ]
        });
        if (!user) {
            return res.status(401).json({
                message: 'invalid credentials'
            })
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                message: 'invalid credentials'
            })
        }

        const token = jwt.sign({
            id: user._id
        }, process.env.JWT_SECRET);
        res.cookie("token", token);
        res.status(200).json({
            message: 'User logged in successfully',
        })

    } catch (error) {
        res.status(500).json({
            message: 'Internal server error'
        })
    }
}

async function logoutUser(req, res) {
    try {
        res.clearCookie("token");

        res.status(200).json({
            message: "Logged out successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: "Internal server error"
        });
    }
}

async function forgotPassword(req, res) {

    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({
                message: 'email is required'
            })
        }
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            })
        }

        const token = jwt.sign({
            id: user._id
        }, process.env.JWT_SECRET, { expiresIn: '10m' });
        const resetLink = `http://localhost:5173/reset-password/${token}`;

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Password Reset",
            html: `
                <h3>Password Reset</h3>
                <p>Click the link below to reset your password:</p>
                <a href="${resetLink}">Reset Password</a>
                <p>This link will expire in 10 minutes.</p>
            `
        });


        res.json({
            message: "Reset link generated",

        });

    } catch (error) {
        res.status(500).json({
            message: 'Internal server error'
        })

    }

}

async function resetPassword(req, res) {
    try {

        const { token } = req.params;
        const { newPassword } = req.body;
        if (!token || !newPassword) {
            return res.status(400).json({
                message: 'Token and new password are required'
            })
        }
        let decoded;

        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            return res.status(400).json({
                message: "Invalid or expired token"
            });
        }

        const user = await userModel.findById(decoded.id);
        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            })
        }
        const hash = await bcrypt.hash(newPassword, 10);
        user.password = hash;
        await user.save();
        res.json({
            message: 'Password reset successfully'
        })

    } catch (error) {
        res.status(500).json({
            message: 'Internal server error'
        })
    }

}

async function getUserProfile(req, res) {
    try {
        const user = await userModel.findById(req.user.id).select("-password");
        res.json(user);
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error'
        });
    }
} const updateUserProfile = async (req, res) => {
    try {
        const { username, email } = req.body;

        const updateData = {
            username,
            email,
        };

        if (req.file) {
            const uploadedImage = await imagekit.upload({
                file: req.file.buffer,
                fileName: req.file.originalname,
                folder: "/uploads",
            });

            updateData.profilePic = uploadedImage.url;
        }

        const updatedUser = await userModel.findByIdAndUpdate(
            req.user.id,
            updateData,
            { new: true }
        ).select("-password");

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
            message: "Profile updated successfully",
            user: updatedUser,
        });
    } catch (error) {
        console.error("UPDATE PROFILE ERROR:", error);
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
};
module.exports = { registerUser, loginUser, logoutUser, forgotPassword, resetPassword, getUserProfile, updateUserProfile }