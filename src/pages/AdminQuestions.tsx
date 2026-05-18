import { useState } from 'react'
import { Link } from 'react-router-dom'
import { defaultQuizData, type Question } from '../data/quizData'
import LogoQuiz from '../assets/Logo-Quiz.svg'

function AdminQuestions() {
  const [questions, setQuestions] = useState<Question[]>(() => {
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

  // State for form
  const [editingId, setEditingId] = useState<number | null>(null)
  const [formData, setFormData] = useState({
    question: '',
    options: ['', '', '', ''],
    answer: ''
  })

  const saveQuestions = (newQuestions: Question[]) => {
    setQuestions(newQuestions)
    localStorage.setItem('@quiz_questions', JSON.stringify(newQuestions))
  }

  const handleDelete = (id: number) => {
    if (window.confirm('Tem certeza que deseja excluir esta questão?')) {
      saveQuestions(questions.filter(q => q.id !== id))
    }
  }

  const handleEdit = (question: Question) => {
    setEditingId(question.id)
    setFormData({
      question: question.question,
      options: [...question.options],
      answer: question.answer
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validation
    if (!formData.question || formData.options.some(opt => !opt) || !formData.answer) {
      alert('Por favor, preencha todos os campos.')
      return
    }

    if (!formData.options.includes(formData.answer)) {
      alert('A resposta correta deve ser uma das opções.')
      return
    }

    if (editingId !== null) {
      // Update
      const updatedQuestions = questions.map(q => 
        q.id === editingId ? { ...formData, id: editingId } : q
      )
      saveQuestions(updatedQuestions)
    } else {
      // Create
      const newQuestion: Question = {
        ...formData,
        id: Date.now()
      }
      saveQuestions([...questions, newQuestion])
    }

    // Reset
    setEditingId(null)
    setFormData({
      question: '',
      options: ['', '', '', ''],
      answer: ''
    })
  }

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...formData.options]
    newOptions[index] = value
    setFormData({ ...formData, options: newOptions })
  }

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <header className="max-w-4xl mx-auto flex justify-between items-center mb-8">
        <Link to="/">
          <img src={LogoQuiz} alt="Logo quiz" className="w-24" />
        </Link>
        <h1 className="text-2xl font-bold text-quiz-yellow">Gerenciar Questões</h1>
        <Link to="/" className="text-quiz-purple hover:underline font-medium">Voltar</Link>
      </header>

      <main className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Form Section */}
        <section className="bg-quiz-dark p-6 rounded-2xl shadow-xl h-fit">
          <h2 className="text-xl font-bold mb-6 text-quiz-yellow">
            {editingId !== null ? 'Editar Questão' : 'Nova Questão'}
          </h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-400">Pergunta</label>
              <textarea
                value={formData.question}
                onChange={e => setFormData({ ...formData, question: e.target.value })}
                className="bg-black border-2 border-quiz-purple rounded-xl p-3 focus:outline-none focus:border-quiz-yellow transition-colors"
                placeholder="Digite a pergunta..."
                rows={3}
              />
            </div>

            <div className="flex flex-col gap-3">
              <label className="text-sm font-medium text-gray-400">Opções</label>
              {formData.options.map((option, index) => (
                <input
                  key={index}
                  type="text"
                  value={option}
                  onChange={e => handleOptionChange(index, e.target.value)}
                  className="bg-black border-2 border-quiz-purple rounded-xl p-3 focus:outline-none focus:border-quiz-yellow transition-colors"
                  placeholder={`Opção ${index + 1}`}
                />
              ))}
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-400">Resposta Correta</label>
              <select
                value={formData.answer}
                onChange={e => setFormData({ ...formData, answer: e.target.value })}
                className="bg-black border-2 border-quiz-purple rounded-xl p-3 focus:outline-none focus:border-quiz-yellow transition-colors"
              >
                <option value="">Selecione a resposta</option>
                {formData.options.filter(opt => opt).map((opt, i) => (
                  <option key={i} value={opt}>{opt}</option>
                ))}
              </select>
            </div>

            <div className="flex gap-3 mt-2">
              <button
                type="submit"
                className="flex-1 bg-quiz-purple hover:bg-opacity-80 text-white font-bold py-3 rounded-xl transition-all"
              >
                {editingId !== null ? 'Salvar Alterações' : 'Adicionar Questão'}
              </button>
              {editingId !== null && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingId(null)
                    setFormData({ question: '', options: ['', '', '', ''], answer: '' })
                  }}
                  className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-xl transition-all"
                >
                  Cancelar
                </button>
              )}
            </div>
          </form>
        </section>

        {/* List Section */}
        <section className="flex flex-col gap-4">
          <h2 className="text-xl font-bold text-quiz-yellow">Questões Atuais ({questions.length})</h2>
          <div className="flex flex-col gap-4 max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar">
            {questions.map((q) => (
              <div key={q.id} className="bg-quiz-dark p-4 rounded-xl border border-gray-800 flex flex-col gap-2">
                <p className="font-bold text-white line-clamp-2">{q.question}</p>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs text-gray-400">ID: {q.id}</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(q)}
                      className="text-sm text-blue-400 hover:text-blue-300 font-medium"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(q.id)}
                      className="text-sm text-red-400 hover:text-red-300 font-medium"
                    >
                      Excluir
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}

export default AdminQuestions;