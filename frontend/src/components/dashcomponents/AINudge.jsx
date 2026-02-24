export default function AINudge({ total, done }) {
  let message = "Add your first task to get started.";

  if (total > 0 && done < total) {
    message = "Keep going 💪 You’re making progress.";
  }

  if (total > 0 && done === total) {
    message = "Amazing work 🎉 You completed everything!";
  }

  return (
    <div className="bg-indigo-50 border border-indigo-200 rounded-2xl p-4">
      <p className="text-indigo-700 font-medium">
        🤖 {message}
      </p>
    </div>
  );
}
