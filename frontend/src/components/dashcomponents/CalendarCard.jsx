import { useEffect, useState } from "react";

export default function CalendarCard() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const secondsDeg = (now.getSeconds() / 60) * 360;
  const minutesDeg = (now.getMinutes() / 60) * 360;
  const hoursDeg = ((now.getHours() % 12) / 12) * 360 + (now.getMinutes() / 60) * 30;
  const time = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return (
    <div className="bg-[#FFF9F2] rounded-[2.5rem] p-8 shadow-sm border-b-4 border-orange-100 flex flex-col items-center">
      
      {/* Cutesy Analog Clock */}
      <div className="relative w-32 h-32 rounded-full border-4 border-[#FADCD9] bg-white shadow-inner flex items-center justify-center">
        {/* Center Point */}
        <div className="absolute w-3 h-3 bg-[#F8AFA6] rounded-full z-10" />
        
        {/* Hour Hand */}
        <div 
          className="absolute w-1 h-8 bg-gray-800 rounded-full origin-bottom"
          style={{ transform: `translateY(-50%) rotate(${hoursDeg}deg)` }}
        />
        {/* Minute Hand */}
        <div 
          className="absolute w-1 h-12 bg-gray-400 rounded-full origin-bottom"
          style={{ transform: `translateY(-50%) rotate(${minutesDeg}deg)` }}
        />
      </div>
       <div className="mt-4 text-lg font-semibold">
         ⏰ {time}
       </div>

      <div className="mt-6 text-center">
        <h2 className="text-3xl font-black text-[#5B4B49]">
          {now.getDate()} <span className="text-lg font-medium opacity-60">{now.toLocaleString("default", { month: "short" })}</span>
        </h2>
        <p className="text-[#F8AFA6] font-bold uppercase tracking-widest text-xs mt-1">
          {now.toLocaleString("default", { weekday: "long" })}
        </p>
      </div>
    </div>
  );
}

// import { useEffect, useState } from "react";

// export default function CalendarCard() {
//   const [now, setNow] = useState(new Date());

//   useEffect(() => {
//     const timer = setInterval(() => setNow(new Date()), 1000);
//     return () => clearInterval(timer);
//   }, []);

//   const day = now.getDate();
//   const month = now.toLocaleString("default", { month: "long" });
//   const weekday = now.toLocaleString("default", { weekday: "long" });
//   const time = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

//   return (
//     <div className="bg-white rounded-2xl p-6 shadow">
//       <p className="text-sm text-gray-500">{weekday}</p>
//       <h2 className="text-2xl font-bold">{day}</h2>
//       <p className="text-gray-600">{month}</p>

//       <div className="mt-4 text-lg font-semibold">
//         ⏰ {time}
//       </div>
//     </div>
//   );
// }
