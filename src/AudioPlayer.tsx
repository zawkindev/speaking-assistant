import { useRef, useState } from "react";
import type { Recording } from "./types";
import { Pause, Play } from "lucide-react";

const AudioPlayer: React.FC<{ recording: Recording }> = ({ recording }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
  };

  return (
    <div className="flex items-center space-x-3 bg-gray-50 rounded-lg p-3">
      <button
        onClick={togglePlay}
        className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center hover:bg-blue-600"
      >
        {isPlaying ? (
          <Pause className="w-4 h-4 text-white" />
        ) : (
          <Play className="w-4 h-4 text-white ml-0.5" />
        )}
      </button>
      <div className="flex-1">
        <div className="text-sm text-gray-600">
          {formatDuration(Math.floor(currentTime))} /{" "}
          {formatDuration(recording.duration)}
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
          <div
            className="bg-blue-500 h-2 rounded-full transition-all duration-100"
            style={{
              width:
                recording.duration > 0
                  ? `${(currentTime / recording.duration) * 100}%`
                  : "0%",
            }}
          ></div>
        </div>
      </div>
      <audio
        ref={audioRef}
        src={recording.url}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
      />
    </div>
  );
};

export default AudioPlayer;
