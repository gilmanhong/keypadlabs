"use client"

interface KeyPadProps {
  visibleNumbers: number[]
  onNumberPress: (number: number) => void
}

export default function KeyPad({ visibleNumbers, onNumberPress }: KeyPadProps) {
  // Keypad layout: 789, 456, 123
  const keypadNumbers = [
    [7, 8, 9],
    [4, 5, 6],
    [1, 2, 3],
  ]

  return (
    <div className="grid grid-cols-3 gap-4 w-full max-w-xs mx-auto">
      {keypadNumbers.map((row) =>
        row.map((number) => (
          <button
            key={number}
            onClick={() => onNumberPress(number)}
            className={`
              aspect-square rounded-lg text-2xl font-bold transition-all
              ${
                visibleNumbers.includes(number)
                  ? "bg-blue-500 text-white shadow-md hover:bg-blue-600"
                  : "bg-gray-200 text-gray-200 cursor-pointer"
              }
            `}
            aria-label={`Number ${number}`}
          >
            {visibleNumbers.includes(number) ? number : ""}
          </button>
        )),
      )}
    </div>
  )
}
