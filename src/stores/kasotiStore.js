import { defineStore } from 'pinia'
import celebrities from '@/data/celebrities'

export const useKasotiStore = defineStore('kasoti', {
  state: () => ({
    questions: [],
    startTime: Date.now(),
    celebrity: celebrities[Math.floor(Math.random() * celebrities.length)].name, // Randomly select
  }),
  getters: {
    selectedCelebrity: (state) => state.celebrity,
    questionsLeft: (state) => 20 - state.questions.length,
    getTimeTaken: (state) => Math.floor((Date.now() - state.startTime) / 1000),
    isCorrectGuess: (state) => {
      return state.questions.some((q) =>
        q.question.toLowerCase().includes(state.celebrity.toLowerCase()),
      )
    },
    isCorrectGuess: (state) => {
      const lastQuestion = state.questions[state.questions.length - 1]
      return lastQuestion?.question.toLowerCase().includes(state.celebrity.toLowerCase())
    },
  },
  actions: {
    addQuestion(questionObj) {
      this.questions.push(questionObj)
    },
    restartGame() {
      this.questions = []
      this.startTime = Date.now()
      this.celebrity = celebrities[Math.floor(Math.random() * celebrities.length)].name // New random selection
    },
  },
})
