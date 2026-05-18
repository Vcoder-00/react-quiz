import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { defaultQuizData, type Question } from '../data/quizData'
import LogoQuiz from '../assets/Logo-Quiz.svg'

export default function Quiz() {
  const [questions] = useState<Question[]>(() => {
    const savedQuestions = localStorage.getItem('@quiz_questions')
    if (savedQuestions) {
      try {
        const parsed = JSON.parse(savedQuestions)
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed
        }
      } catch (e) {
        console.error('Error parsing questions from localStorage', e)
      }
    }
    return defaultQuizData
  })
  const [currentIndex, setCurrentIndex] = useState(0)
  const [correctAnswers, setCorrectAnswers] = useState(0)
  const [incorrectAnswers, setIncorrectAnswers] = useState(0)
  const navigate = useNavigate()

  const handleAnswer = (option: string) => {
    const currentQuestion = questions[currentIndex]
    let newCorrect = correctAnswers
    let newIncorrect = incorrectAnswers

    if (option === currentQuestion.answer) {
      newCorrect++
      setCorrectAnswers(newCorrect)
    } else {
      newIncorrect++
      setIncorrectAnswers(newIncorrect)
    }

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1)
    } else {
      navigate('/resultado', {
        state: {
          correctAnswers: newCorrect,
          incorrectAnswers: newIncorrect,
          total: questions.length
        }
      })
    }
  }

  if (questions.length === 0) {
    return <div className="min-h-screen bg-black flex items-center justify-center text-quiz-yellow">Carregando...</div>
  }

  const currentQuestion = questions[currentIndex]

  return (
    <div className="min-h-screen bg-black flex flex-col items-center p-6">
      <header className="mb-8 mt-4">
        <img src={LogoQuiz} alt="Logo quiz" className="w-32" />
      </header>

      <div className="w-full max-w-md bg-quiz-dark rounded-2xl p-6 shadow-xl flex flex-col gap-6">
        <div className="flex justify-between items-center text-sm text-quiz-yellow font-bold">
          <span>Questão {currentIndex + 1} de {questions.length}</span>
          <span className="bg-quiz-purple px-3 py-1 rounded-full text-white">
            {Math.round(((currentIndex + 1) / questions.length) * 100)}%
          </span>
        </div>

        <h2 className="text-xl font-bold text-white leading-tight">
          {currentQuestion.question}
        </h2>

        <div className="flex flex-col gap-3">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(option)}
              className="w-full text-left p-4 rounded-xl border-2 border-quiz-purple hover:bg-quiz-purple text-white font-medium transition-colors"
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}