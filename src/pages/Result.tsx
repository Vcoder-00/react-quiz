import { useLocation, useNavigate, Navigate } from 'react-router-dom'
import LogoQuiz from '../assets/Logo-Quiz.svg'

interface ResultState {
  correctAnswers: number
  incorrectAnswers: number
  total: number
}

function Result() {
  const location = useLocation()
  const navigate = useNavigate()
  const state = location.state as ResultState

  if (!state) {
    return <Navigate to="/" replace />
  }

  const { correctAnswers, incorrectAnswers, total } = state
  const percentage = Math.round((correctAnswers / total) * 100)

  const getMessage = (pct: number) => {
    if (pct === 100) return "Excelente! Você é um verdadeiro mestre!"
    if (pct >= 70) return "Muito bem! Você conhece bem o assunto."
    if (pct >= 40) return "Bom esforço! Mas ainda dá para melhorar."
    return "Dessa vez não foi tão bem. Que tal tentar novamente?"
  }

  const message = getMessage(percentage)

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6 text-center">
      <header className="mb-10">
        <img src={LogoQuiz} alt="Logo quiz" className="w-40" />
      </header>

      <div className="w-full max-w-md bg-quiz-dark rounded-3xl p-8 shadow-2xl flex flex-col items-center gap-6">
        <h1 className="text-3xl font-bold text-white">Resultado</h1>
        
        <div className="flex flex-col items-center gap-2">
          <span className="text-6xl font-black text-quiz-yellow">{percentage}%</span>
          <p className="text-quiz-purple font-bold uppercase tracking-widest text-sm">Aproveitamento</p>
        </div>

        <div className="w-full grid grid-cols-2 gap-4 mt-2">
          <div className="bg-black/40 p-4 rounded-2xl flex flex-col">
            <span className="text-green-400 text-2xl font-bold">{correctAnswers}</span>
            <span className="text-xs text-white/60 font-medium">Acertos</span>
          </div>
          <div className="bg-black/40 p-4 rounded-2xl flex flex-col">
            <span className="text-red-400 text-2xl font-bold">{incorrectAnswers}</span>
            <span className="text-xs text-white/60 font-medium">Erros</span>
          </div>
        </div>

        <p className="text-white text-lg font-medium leading-relaxed mt-4">
          {message}
        </p>

        <button
          onClick={() => navigate('/')}
          className="bg-quiz-yellow text-black w-full py-4 rounded-2xl text-xl font-bold shadow-lg hover:brightness-110 transition-all mt-4"
        >
          Tentar Novamente
        </button>
      </div>
    </div>
  )
}

export default Result;