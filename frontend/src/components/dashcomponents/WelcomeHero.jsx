import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function WelcomeHero() {
  const { user } = useContext(AuthContext);

  return (
    <div className="bg-[#F8AFA6]/20 border border-[#FADCD9] rounded-[2.5rem] p-8 relative overflow-hidden flex items-center min-h-70">
      {/* Background Decor */}
      <div className="absolute top-[-10%] right-[-5%] w-32 h-32 bg-[#FADCD9] rounded-full blur-3xl opacity-50" />

      <div className="relative z-10">
        <span className="text-[#F8AFA6] font-bold text-xs bg-white px-3 py-1 rounded-full shadow-sm mb-3 inline-block">
          NY, USA
        </span>
        <h1 className="text-3xl font-black text-[#5B4B49]">
          Welcome <br />
          <span className="text-4xl text-[#F8AFA6]">{user?.name || "User"}</span>
        </h1>
      </div>

      {/* Cutesy Illustration - simplified version of the flowers in the image */}
      <div className="absolute right-10 bottom-4 flex gap-2 items-end opacity-80">
        <div className="w-1.5 h-12 bg-[#5B4B49] rounded-full relative">
          <div className="absolute -top-2 -left-2 w-5 h-5 bg-[#F8AFA6] rounded-full" />
        </div>
        <div className="w-1.5 h-16 bg-[#5B4B49] rounded-full relative">
          <div className="absolute -top-2 -left-2 w-5 h-5 bg-[#FADCD9] rounded-full" />
        </div>
        <div className="w-1.5 h-10 bg-[#5B4B49] rounded-full relative">
          <div className="absolute -top-2 -left-2 w-5 h-5 bg-[#F8AFA6] rounded-full" />
        </div>
      </div>
    </div>
  );
}