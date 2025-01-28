import { defineStore } from 'pinia'
import celebrities from '@/data/celebrities'
import { TOTAL_QUESTIONS } from '@/components/constants'

export const useKasotiStore = defineStore('kasoti', {
  state: () => ({
    questions: [],
    startTime: null, // Timer starts when the first question is asked
    timerInterval: null,
    elapsedTime: 0, // Store elapsed time in seconds
    celebrity: celebrities[Math.floor(Math.random() * celebrities.length)].name, // Randomly select
  }),
  getters: {
    selectedCelebrity: (state) => state.celebrity,
    questionsLeft: (state) => TOTAL_QUESTIONS - state.questions.length,
    getTimeTaken: (state) => {
      const hours = String(Math.floor(state.elapsedTime / 3600)).padStart(2, '0')
      const minutes = String(Math.floor((state.elapsedTime % 3600) / 60)).padStart(2, '0')
      const seconds = String(state.elapsedTime % 60).padStart(2, '0')
      return `${hours}:${minutes}:${seconds}` // HH:MM:SS
    },
    isCorrectGuess: (state) => {
      const lastQuestion = state.questions[state.questions.length - 1]
      if (!lastQuestion || !lastQuestion.question) return false // No questions to check yet

      const normalizeString = (str) => str.normalize('NFD').replace(/[\u0300-\u036f]/g, '') // Remove accents
      const userInput = normalizeString(lastQuestion?.question.trim().toLowerCase())
      const celebrityName = normalizeString(state.celebrity.toLowerCase())
      return userInput.includes(celebrityName)
    },
    gameOver() {
      if (this.questionsLeft <= 0 || this.isCorrectGuess) {
        // Stop the timer if all questions are asked or the guess is correct
        this.stopTimer()
        return true
      } else {
        return false
      }
    },
  },
  actions: {
    addQuestion(questionObj) {
      this.questions.push(questionObj)
      if (!this.startTime) this.startTimer() // Start timer on the first question
      if (this.isCorrectGuess) {
        this.stopTimer() // Stop timer if the guess is correct
      }
    },
    startTimer() {
      if (!this.startTime) {
        this.startTime = Date.now()
        this.timerInterval = setInterval(() => {
          this.elapsedTime = Math.floor((Date.now() - this.startTime) / 1000)
        }, 1000)
      }
    },
    stopTimer() {
      if (this.timerInterval) {
        clearInterval(this.timerInterval)
        this.timerInterval = null
      }
    },
    resetTimer() {
      this.stopTimer()
      this.startTime = null
      this.elapsedTime = 0
    },
    restartGame() {
      this.questions = []
      this.resetTimer()
      this.celebrity = celebrities[Math.floor(Math.random() * celebrities.length)].name
    },
  },
})
