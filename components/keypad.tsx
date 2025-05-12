"use client"

interface KeyPadProps {
  visibleNumbers: number[]
  keypadNumbers: number[]
  onNumberPress: (number: number) => void
  isGameActive: boolean
}

export default function KeyPad({ visibleNumbers, keypadNumbers, onNumberPress, isGameActive }: KeyPadProps) {
  // 키패드 레이아웃: 789, 456, 123
  const keypadRows = [
    [7, 8, 9],
    [4, 5, 6],
    [1, 2, 3],
  ]

  return (
    <div className="grid grid-cols-3 gap-4 w-full max-w-xs mx-auto">
      {keypadRows.map((row, rowIndex) =>
        row.map((number, colIndex) => {
          const isVisible = visibleNumbers.includes(number)

          return (
            <button
              key={`${rowIndex}-${colIndex}`}
              onClick={() => isGameActive && isVisible && onNumberPress(number)}
              disabled={!isGameActive || !isVisible}
              className={`
                keypad-button aspect-square rounded-lg text-2xl font-bold transition-all
                ${
                  !isGameActive
                    ? "bg-gray-300 text-gray-300 cursor-not-allowed"
                    : isVisible
                      ? "bg-blue-500 text-white shadow-md hover:bg-blue-600"
                      : "bg-gray-200 text-gray-200 cursor-pointer"
                }
              `}
              aria-label={isVisible ? `숫자 ${number}` : "빈 칸"}
              data-number={number}
            >
              {isVisible && isGameActive ? number : ""}
            </button>
          )
        }),
      )}
    </div>
  )
}
