import LogoQuiz from "../assets/Logo-Quiz.svg";
import { useNavigate } from "react-router-dom";


export default function Home() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6 text-center">
      <div className="mb-12 flex flex-col items-center">
        <div className="relative">
          <img src={LogoQuiz} alt="Logo quiz" />
        </div>


      </div>

      <div className="max-w-xs mb-10">
        <p className="text-quiz-yellow text-lg font-bold leading-tight">
          Está na hora de ser o especialista oficial em... nada específico!
        </p>
      </div>

      <button
        onClick={() => navigate('/quiz')}
        className="bg-purple-500 text-black w-full max-w-xs py-4 rounded-full text-xl font-bold shadow-lg"
      >
        Começar
      </button>

      <button
        onClick={() => navigate('/admin')}
        className="mt-4 border-2 border-quiz-purple text-white w-full max-w-xs py-3 rounded-full text-lg font-bold hover:bg-quiz-purple transition-all"
      >
        Gerenciar Questões
      </button>
    </div>


  )
}
