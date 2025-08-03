import { useEffect } from "react";
import { useAppContext } from "./AppContext";
import { questionsData } from "./hardcode";
import { ArrowLeft, ArrowRight } from "lucide-react";
import RecordingButton from "./RecordingButton";

const Part1: React.FC = () => {
  const {
    currentQuestion,
    nextQuestion,
    prevQuestion,
    mode,
    startRecording,
    isRecording,
    navigateTo,
  } = useAppContext();
  const questions = questionsData.part1;

  useEffect(() => {
    if (mode === "mock" && !isRecording) {
      // Auto-start recording for each question in mock mode
      const timer = setTimeout(() => {
        startRecording(`part1-q${currentQuestion}`);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [currentQuestion, mode, isRecording, startRecording]);

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      nextQuestion();
    } else {
      navigateTo("part2");
    }
  };

  const currentQuestionText = questions[currentQuestion];

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
              <h2 className="text-xl font-bold text-gray-800">Part 1</h2>
            </div>
            <span className="text-sm text-gray-500">
              {currentQuestion + 1} / {questions.length}
            </span>
          </div>

          <div className="mb-6">
            <p className="text-gray-700 text-lg leading-relaxed">
              {currentQuestionText}
            </p>
          </div>

          <div className="flex items-center justify-center mb-6">
            <RecordingButton
              recordingId={`part1-q${currentQuestion}`}
              disabled={mode === "mock" && isRecording}
            />
          </div>

          <div className="flex justify-between">
            <button
              onClick={prevQuestion}
              disabled={currentQuestion === 0}
              className="flex items-center space-x-2 px-4 py-2 text-gray-600 disabled:opacity-50"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            <button
              onClick={handleNext}
              disabled={mode === "mock" && isRecording}
              className="flex items-center space-x-2 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
            >
              <span>
                {currentQuestion < questions.length - 1 ? "Next" : "Part 2"}
              </span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Part1;
