import { Mic, Square } from "lucide-react";
import { useAppContext } from "./AppContext";

const RecordingButton: React.FC<{
  recordingId: string;
  disabled?: boolean;
}> = ({ recordingId, disabled = false }) => {
  const { isRecording, startRecording, stopRecording, recordingTime } =
    useAppContext();

  const handleToggle = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording(recordingId);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="flex items-center space-x-3">
      <button
        onClick={handleToggle}
        disabled={disabled}
        className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-200 ${
          isRecording
            ? "bg-red-500 hover:bg-red-600 animate-pulse"
            : "bg-blue-500 hover:bg-blue-600"
        } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        {isRecording ? (
          <Square className="w-6 h-6 text-white" />
        ) : (
          <Mic className="w-6 h-6 text-white" />
        )}
      </button>

      {isRecording && (
        <div className="flex items-center space-x-2 text-red-600">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
          <span className="font-mono text-sm">{formatTime(recordingTime)}</span>
        </div>
      )}
    </div>
  );
};

export default RecordingButton;
