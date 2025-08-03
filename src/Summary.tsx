import { Home, RotateCcw, Trophy } from "lucide-react";
import AudioPlayer from "./AudioPlayer";
import { useAppContext } from "./AppContext";

const Summary: React.FC = () => {
  const { recordings, reset, navigateTo } = useAppContext();

  const handleRestart = () => {
    reset();
  };

  const recordingsList = Object.entries(recordings);

  const getRecordingTitle = (id: string) => {
    if (id.startsWith("part1-q")) {
      const qNum = parseInt(id.split("q")[1]) + 1;
      return `Part 1 - Question ${qNum}`;
    } else if (id === "part2") {
      return "Part 2 - Cue Card";
    } else if (id.startsWith("part3-q")) {
      const qNum = parseInt(id.split("q")[1]) + 1;
      return `Part 3 - Question ${qNum}`;
    }
    return id;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <div className="max-w-md mx-auto pt-8">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trophy className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Test Complete!
            </h2>
            <p className="text-gray-600">Review your recordings below</p>
          </div>

          {recordingsList.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">No recordings found</p>
            </div>
          ) : (
            <div className="space-y-4 mb-6">
              {recordingsList.map(([id, recording]) => (
                <div key={id} className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-2">
                    {getRecordingTitle(id)}
                  </h3>
                  <AudioPlayer recording={recording} />
                </div>
              ))}
            </div>
          )}

          <div className="flex space-x-3">
            <button
              onClick={handleRestart}
              className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Start Over</span>
            </button>
            <button
              onClick={() => navigateTo("home")}
              className="flex items-center justify-center space-x-2 px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              <Home className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summary;
