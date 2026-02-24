import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

export default function ProjectStats({ total, done, percent }) {
  const data = [
    { name: "Completed", value: done },
    { name: "Remaining", value: total - done || 1 }, // || 1 prevents crash if 0
  ];

  const COLORS = ["#F8AFA6", "#E5E7EB"];

  return (
    <div className="bg-white rounded-[2.5rem] p-8 shadow-sm">
      <h3 className="text-xl font-bold text-[#5B4B49] mb-6">Task Variations</h3>
      
      <div className="h-64 w-full relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        
        {/* Center Label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-black text-[#5B4B49]">{percent}%</span>
          <span className="text-[10px] uppercase font-bold text-gray-400">Done</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="bg-[#FFF9F2] p-4 rounded-2xl text-center">
          <p className="text-xs text-gray-500 font-bold uppercase">Total</p>
          <p className="text-xl font-black">{total}</p>
        </div>
        <div className="bg-[#FADCD9]/30 p-4 rounded-2xl text-center">
          <p className="text-xs text-gray-500 font-bold uppercase">Finished</p>
          <p className="text-xl font-black text-[#F8AFA6]">{done}</p>
        </div>
      </div>
    </div>
  );
}