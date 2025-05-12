"use client"

interface StartButtonProps {
  onStart: () => void
  isGameActive: boolean
}

export default function StartButton({ onStart, isGameActive }: StartButtonProps) {
  return (
    <button
      onClick={onStart}
      disabled={isGameActive}
      className={`
        start-button w-full py-3 px-6 rounded-lg text-white font-bold text-lg
        ${isGameActive ? "bg-gray-400 cursor-not-allowed" : "bg-green-500 hover:bg-green-600"}
      `}
    >
      {isGameActive ? "Game in Progress" : "Start Game"}
    </button>
  )
}
