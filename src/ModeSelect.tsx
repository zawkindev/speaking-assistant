import { ArrowRight, BookOpen, Mic, Trophy } from "lucide-react";
import { useAppContext } from "./AppContext";

// Components
const ModeSelect: React.FC = () => {
  const { setMode, navigateTo } = useAppContext();

  const selectMode = (mode: "practice" | "mock") => {
    setMode(mode);
    if (mode === "mock") {
      navigateTo("part1");
    } else {
      navigateTo("practice");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <div className="max-w-md mx-auto pt-20">
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Mic className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            IELTS Speaking
          </h1>
          <p className="text-gray-600">Choose your practice mode</p>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => selectMode("practice")}
            className="w-full bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-blue-200"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>
              <div className="text-left flex-1">
                <h3 className="font-semibold text-gray-800 mb-1">
                  Practice Mode
                </h3>
                <p className="text-sm text-gray-600">
                  Control recording manually, skip questions
                </p>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-400" />
            </div>
          </button>

          <button
            onClick={() => selectMode("mock")}
            className="w-full bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-purple-200"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Trophy className="w-6 h-6 text-purple-600" />
              </div>
              <div className="text-left flex-1">
                <h3 className="font-semibold text-gray-800 mb-1">Mock Test</h3>
                <p className="text-sm text-gray-600">
                  Auto-recording, real test conditions
                </p>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-400" />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModeSelect;
