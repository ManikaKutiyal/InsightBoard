export default function UserAvatarCard() {
  return (
    <div className="bg-[#FADCD9] hover:bg-[#F8AFA6] transition-colors cursor-pointer rounded-full p-2 flex items-center shadow-sm w-fit">
      {/* The Avatar Circle */}
       {/* <div className="w-60 h-60 rounded-full bg-white flex items-center justify-center font-bold text-[#5B4B49] shadow-sm">
        <img src="https://i.pinimg.com/736x/8c/6d/db/8c6ddb5fe6600fcc4b183cb2ee228eb7.jpg"
              alt="avatar"/>
       </div> */}
        <div className="h-50 w-50 rounded-full bg-gray-300 cursor-pointer flex items-center justify-center"
        >
          <img
            src="https://i.pinimg.com/736x/8c/6d/db/8c6ddb5fe6600fcc4b183cb2ee228eb7.jpg"
            alt="avatar"
            className="h-50 w-50 rounded-full object-cover"
          />
        </div>

    </div>
  );
}