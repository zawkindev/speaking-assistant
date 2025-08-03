import { ArrowLeft, ArrowRight, Clock } from "lucide-react";
import { useAppContext } from "./AppContext";
import { questionsData } from "./hardcode";
import RecordingButton from "./RecordingButton";

const Part2: React.FC = () => {
  const {
    isPreparing,
    prepTime,
    startPreparation,
    isRecording,
    recordingTime,
    navigateTo,
    mode,
  } = useAppContext();
  const { topic, points } = questionsData.part2;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleNext = () => {
    navigateTo("part3");
  };

  const handleBack = () => {
    navigateTo("practice");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <div className="max-w-md mx-auto pt-8">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              {mode === "practice" && (
                <button
                  onClick={handleBack}
                  className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
              )}
              <h2 className="text-xl font-bold text-gray-800">Part 2</h2>
            </div>
            <span className="text-sm text-gray-500">Cue Card</span>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-gray-800 mb-3">{topic}</h3>
            <div className="space-y-2">
              {points.map((point, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                  <span className="text-gray-700 text-sm">{point}</span>
                </div>
              ))}
            </div>
          </div>

          {!isPreparing && !isRecording && (
            <div className="text-center mb-6">
              <button
                onClick={startPreparation}
                className="px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 flex items-center space-x-2 mx-auto"
              >
                <Clock className="w-4 h-4" />
                <span>Start Preparation (1 min)</span>
              </button>
            </div>
          )}

          {isPreparing && (
            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl font-bold text-purple-600">
                  {prepTime}
                </span>
              </div>
              <p className="text-gray-600">Preparation time remaining</p>
            </div>
          )}

          {isRecording && (
            <div className="text-center mb-6">
              <div className="flex items-center justify-center space-x-4 mb-4">
                <RecordingButton recordingId="part2" />
              </div>
              <div className="bg-red-50 rounded-lg p-3">
                <p className="text-red-600 text-sm">
                  Recording... Speak for 1-2 minutes
                </p>
                <p className="text-red-800 font-mono text-lg">
                  {formatTime(recordingTime)}
                </p>
              </div>
            </div>
          )}

          {!isPreparing && !isRecording && (
            <div className="text-center mb-6">
              <RecordingButton recordingId="part2" />
            </div>
          )}

          <div className="flex justify-end">
            <button
              onClick={handleNext}
              className="flex items-center space-x-2 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              <span>Part 3</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Part2;
