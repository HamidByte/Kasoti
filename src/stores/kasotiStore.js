import { defineStore } from 'pinia'
import { TOTAL_QUESTIONS, REGIONS } from '@/utils/constants'
import { getRandomCelebrityByRegion } from '@/utils/celebritySelector'
import { verifyAnswer } from '@/utils/verifyAnswer'

export const useKasotiStore = defineStore('kasoti', {
  state: () => ({
    selectedRegion: REGIONS[0].value,
    celebrity: getRandomCelebrityByRegion(REGIONS[0].value),
    questions: [],
    startTime: null, // Timer starts when the first question is asked
    timerInterval: null,
    elapsedTime: 0, // Store elapsed time in seconds
    gameStarted: false,
    isCorrectGuess: false,
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
    gameOver() {
      if (this.isCorrectGuess || this.questionsLeft <= 0) {
        this.stopTimer() // Stop timer if the guess is correct or all questions are asked
        return true
      } else {
        return false
      }
    },
  },
  actions: {
    async setRegion(region) {
      this.selectedRegion = region
      this.celebrity = getRandomCelebrityByRegion(region)
    },
    checkAnswer(answer) {
      if (answer === 'Correct') {
        this.isCorrectGuess = true
        this.stopTimer() // Stop timer if the guess is correct
      }
    },
    checkQuestion(question) {
      if (!this.gameStarted) {
        this.gameStarted = true
        this.startTimer() // Start timer on the first question
      }

      if (verifyAnswer(question, this.celebrity)) {
        this.isCorrectGuess = true
        this.stopTimer() // Stop timer if the guess is correct
      }
    },
    addQuestion(questionObj) {
      this.questions.push(questionObj)
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
      this.gameStarted = false
      this.questions = []
      this.resetTimer()
      this.celebrity = getRandomCelebrityByRegion(this.selectedRegion)
      this.isCorrectGuess = false
    },
  },
})
