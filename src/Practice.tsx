import { ArrowLeft, ArrowRight, BookOpen, Trophy, Users } from "lucide-react";
import { useAppContext } from "./AppContext";

const Practice: React.FC = () => {
  const { navigateTo } = useAppContext();

  const handleBack = () => {
    navigateTo("home");
  };

  const practiceOptions = [
    {
      id: "part1",
      title: "Part 1 - Introduction",
      description: "Personal questions about yourself, family, work, studies",
      icon: Users,
      color: "bg-blue-500",
      hoverColor: "hover:border-blue-200",
    },
    {
      id: "part2",
      title: "Part 2 - Cue Card",
      description: "Individual long turn with preparation time",
      icon: BookOpen,
      color: "bg-purple-500",
      hoverColor: "hover:border-purple-200",
    },
    {
      id: "part3",
      title: "Part 3 - Discussion",
      description: "Follow-up questions and abstract discussion",
      icon: Trophy,
      color: "bg-green-500",
      hoverColor: "hover:border-green-200",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <div className="max-w-md mx-auto pt-8">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <button
                onClick={handleBack}
                className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h2 className="text-xl font-bold text-gray-800">Practice Mode</h2>
            </div>
          </div>

          <div className="text-center mb-8">
            <p className="text-gray-600">
              Choose which part you want to practice
            </p>
          </div>

          <div className="space-y-4">
            {practiceOptions.map((option) => {
              const IconComponent = option.icon;
              return (
                <button
                  key={option.id}
                  onClick={() =>
                    navigateTo(option.id as "part1" | "part2" | "part3")
                  }
                  className={`w-full bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border-2 border-transparent ${option.hoverColor}`}
                >
                  <div className="flex items-center space-x-4">
                    <div
                      className={`w-12 h-12 ${option.color} rounded-lg flex items-center justify-center`}
                    >
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-left flex-1">
                      <h3 className="font-semibold text-gray-800 mb-1">
                        {option.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {option.description}
                      </p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-400" />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Practice;
