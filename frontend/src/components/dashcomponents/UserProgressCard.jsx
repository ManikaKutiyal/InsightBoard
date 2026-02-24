export default function UserProgressCard({ percent, done, total }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow">
      <div className="flex flex-col items-center">
        <div className="w-20 h-20 rounded-full bg-indigo-500 text-white flex items-center justify-center text-2xl font-bold">
          MK
        </div>

        <p className="mt-4 text-lg font-semibold">{percent}% completed</p>
        <p className="text-sm text-gray-500">
          {done} of {total} tasks done
        </p>

        <div className="w-full bg-gray-200 h-2 rounded-full mt-4">
          <div
            className="h-2 rounded-full bg-indigo-500"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>
    </div>
  );
}
