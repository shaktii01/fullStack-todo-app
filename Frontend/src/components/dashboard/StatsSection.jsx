import Card from "../../ui/Card";

const StatsSection = ({ tasks }) => {
  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const pending = total - completed;

  return (
    <div className="grid grid-cols-3 gap-6 mb-10">
      <Card title="Total Tasks" value={total} color="text-blue-400" />
      <Card title="Completed" value={completed} color="text-green-400" />
      <Card title="Pending" value={pending} color="text-pink-400" />
    </div>
  );
};

export default StatsSection;