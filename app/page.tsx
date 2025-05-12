"use client"

import { useState, useEffect, useCallback } from "react"
import KeyPad from "@/components/keypad"
import ScoreBoard from "@/components/score-board"
import StartButton from "@/components/start-button"

export default function Home() {
  const [score, setScore] = useState(0)
  const [accuracy, setAccuracy] = useState(100)
  const [visibleNumbers, setVisibleNumbers] = useState<number[]>([])
  const [totalAttempts, setTotalAttempts] = useState(0)
  const [correctAttempts, setCorrectAttempts] = useState(0)
  const [lastRemovedNumber, setLastRemovedNumber] = useState<number | null>(null)

  // Game control states
  const [isGameActive, setIsGameActive] = useState(false)
  const [timeRemaining, setTimeRemaining] = useState(60) // 60 seconds = 1 minute

  // 키패드 레이아웃에 맞는 숫자 배열 (위치 고정)
  // [7, 8, 9, 4, 5, 6, 1, 2, 3]
  const keypadNumbers = [7, 8, 9, 4, 5, 6, 1, 2, 3]

  // 초기 3개의 랜덤 숫자 생성
  const generateInitialNumbers = useCallback(() => {
    // 1-9 사이의 숫자 중 랜덤하게 3개 선택
    const allNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    const shuffled = [...allNumbers].sort(() => 0.5 - Math.random())
    const selectedNumbers = shuffled.slice(0, 3)

    setVisibleNumbers(selectedNumbers)
    setLastRemovedNumber(null)
  }, [])

  // 게임 시작 시 초기 숫자 생성
  useEffect(() => {
    if (isGameActive) {
      generateInitialNumbers()
    } else {
      setVisibleNumbers([])
      setLastRemovedNumber(null)
    }
  }, [isGameActive, generateInitialNumbers])

  // 타이머 로직
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null

    if (isGameActive && timeRemaining > 0) {
      timer = setInterval(() => {
        setTimeRemaining((prevTime) => prevTime - 1)
      }, 1000)
    } else if (timeRemaining === 0 && isGameActive) {
      setIsGameActive(false)
    }

    return () => {
      if (timer) clearInterval(timer)
    }
  }, [isGameActive, timeRemaining])

  // 숫자 교체 함수
  const replaceNumber = useCallback(
    (numberToReplace: number) => {
      // 사라진 숫자 저장
      setLastRemovedNumber(numberToReplace)

      // 현재 보이는 숫자들과 사라질 숫자를 제외한 나머지 숫자들
      const allNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9]
      const availableNumbers = allNumbers
        .filter((num) => !visibleNumbers.includes(num) || num === numberToReplace)
        .filter(
          (num) => num !== numberToReplace, // 사라진 숫자 제외
        )

      // 랜덤하게 새 숫자 선택
      const randomIndex = Math.floor(Math.random() * availableNumbers.length)
      const newNumber = availableNumbers[randomIndex]

      // 사라질 숫자를 새 숫자로 교체
      setVisibleNumbers((prev) => prev.map((num) => (num === numberToReplace ? newNumber : num)))
    },
    [visibleNumbers],
  )

  // 숫자 입력 처리 (클릭 또는 키보드)
  const handleNumberInput = useCallback(
    (number: number) => {
      if (!isGameActive) return

      setTotalAttempts((prev) => prev + 1)

      // 현재 보이는 숫자인지 확인
      const isVisible = visibleNumbers.includes(number)

      if (isVisible) {
        // 정확한 입력
        setScore((prev) => prev + 1)
        setCorrectAttempts((prev) => prev + 1)

        // 숫자 교체
        replaceNumber(number)
      } else {
        // 잘못된 입력
        const newCorrectAttempts = correctAttempts
        const newTotalAttempts = totalAttempts + 1
        const newAccuracy = Math.round((newCorrectAttempts / newTotalAttempts) * 100)
        setAccuracy(newAccuracy)
      }
    },
    [isGameActive, visibleNumbers, correctAttempts, totalAttempts, replaceNumber],
  )

  // 키보드 입력 처리
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isGameActive) return

      // 1-9 사이의 숫자 키인지 확인
      const key = event.key
      if (/^[1-9]$/.test(key)) {
        const number = Number.parseInt(key, 10)
        handleNumberInput(number)
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [isGameActive, handleNumberInput])

  // 게임 시작 함수
  const startGame = () => {
    // 게임 상태 초기화
    setScore(0)
    setAccuracy(100)
    setTotalAttempts(0)
    setCorrectAttempts(0)
    setTimeRemaining(60)
    setIsGameActive(true)
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gray-50">
      <div className="w-full max-w-md space-y-6">
        <ScoreBoard title="KeyPadLabs" score={score} accuracy={accuracy} timeRemaining={timeRemaining} />

        <KeyPad
          visibleNumbers={visibleNumbers}
          keypadNumbers={keypadNumbers}
          onNumberPress={handleNumberInput}
          isGameActive={isGameActive}
        />

        <div className="text-center text-sm text-gray-600 mt-2">키보드 숫자 키(1-9)로도 플레이할 수 있습니다!</div>

        <StartButton onStart={startGame} isGameActive={isGameActive} />

        {timeRemaining === 0 && (
          <div className="text-center mt-4 p-4 bg-yellow-100 rounded-lg">
            <p className="text-lg font-semibold text-yellow-800">시간 종료!</p>
            <p className="text-gray-700">최종 점수: {score}</p>
            <p className="text-gray-700">정확도: {accuracy}%</p>
          </div>
        )}
      </div>
    </main>
  )
}
