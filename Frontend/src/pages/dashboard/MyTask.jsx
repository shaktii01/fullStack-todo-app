import MyTaskForm from "@/components/mytasks/MyTaskForm"
import RecentTask from "@/components/mytasks/RecentTask"

const MyTask = () => {
 

    return (
      <div className="w-full h-screen overflow-auto  bg-black text-zinc-200 p-10">
        <MyTaskForm/>
        <RecentTask/>
    </div>
  )
}

export default MyTask