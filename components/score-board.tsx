"use client"

interface ScoreBoardProps {
  title: string
  score: number
  accuracy: number
  timeRemaining: number
}

export default function ScoreBoard({ title, score, accuracy, timeRemaining }: ScoreBoardProps) {
  // Format time as MM:SS
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="text-center space-y-2">
      <h1 className="text-3xl font-bold text-gray-800">{title}</h1>
      <div className="flex justify-center gap-8">
        <div className="text-center">
          <p className="text-sm text-gray-500">Score</p>
          <p className="text-2xl font-bold text-gray-800">{score}</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-500">Accuracy</p>
          <p className="text-2xl font-bold text-gray-800">{accuracy}%</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-500">Time</p>
          <p className="text-2xl font-bold text-gray-800 timer">{formatTime(timeRemaining)}</p>
        </div>
      </div>
    </div>
  )
}
