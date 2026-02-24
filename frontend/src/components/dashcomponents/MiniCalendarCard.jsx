export default function MiniCalendarCard() {
  const now = new Date();
  const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
  const currentDay = now.getDate();
  
  // Get first day of month to align grid (simplified for this UI)
  const firstDay = new Date(now.getFullYear(), now.getMonth(), 1).getDay();
  const blanks = Array(firstDay).fill(null);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  return (
    <div className="bg-white rounded-[2.5rem] p-6 shadow-sm border-b-4 border-pink-50 h-full flex flex-col justify-between">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-[#5B4B49] font-black text-lg">
          {now.toLocaleString('default', { month: 'long' })}
        </h3>
        <span className="text-xs font-bold text-[#F8AFA6] bg-[#FADCD9]/30 px-2 py-1 rounded-lg">
          {now.getFullYear()}
        </span>
      </div>

      {/* The Calendar Grid */}
      <div className="grid grid-cols-7 gap-1 text-[10px] font-bold text-gray-400 mb-2">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => <div key={d} className="text-center">{d}</div>)}
      </div>
      
      <div className="grid grid-cols-7 gap-1">
        {blanks.map((_, i) => <div key={i} />)}
        {days.map(day => (
          <div 
            key={day} 
            className={`aspect-square flex items-center justify-center rounded-full text-xs transition-all
              ${day === currentDay 
                ? 'bg-[#F8AFA6] text-white shadow-md scale-110 font-bold' 
                : 'text-[#5B4B49] hover:bg-[#FDF8F5]'
              }`}
          >
            {day}
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-dashed border-pink-100 flex items-center justify-between">
        <p className="text-[10px] font-medium text-gray-400 italic">No events today~</p>
        <div className="w-2 h-2 bg-[#F8AFA6] rounded-full animate-pulse" />
      </div>
    </div>
  );
}