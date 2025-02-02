import { defineStore } from 'pinia'
import { TOTAL_QUESTIONS, REGIONS } from '@/utils/constants'
import { getRandomCelebrityByRegion } from '@/utils/celebritySelector'
import { verifyAnswer } from '@/utils/verifyAnswer'

export const useKasotiStore = defineStore('kasoti', {
  state: () => ({
    isPlayerMode: false,
    selectedRegion: REGIONS[0].value,
    celebrity: getRandomCelebrityByRegion(REGIONS[0].value),
    gameStarted: false,
    startTime: null, // Timer starts when the first question is asked
    timerInterval: null,
    elapsedTime: 0, // Store elapsed time in seconds
    questions: [],
    answers: [],
    isCorrectGuess: false,
  }),
  getters: {
    selectedCelebrity: (state) => state.celebrity,
    getTimeTaken: (state) => {
      const hours = String(Math.floor(state.elapsedTime / 3600)).padStart(2, '0')
      const minutes = String(Math.floor((state.elapsedTime % 3600) / 60)).padStart(2, '0')
      const seconds = String(state.elapsedTime % 60).padStart(2, '0')
      return `${hours}:${minutes}:${seconds}` // HH:MM:SS
    },
    questionsLeft: (state) => TOTAL_QUESTIONS - state.questions.length,
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
    setToggleMode(mode) {
      this.isPlayerMode = mode
    },
    async setRegion(region) {
      this.selectedRegion = region
      this.celebrity = getRandomCelebrityByRegion(region)
    },
    startGame() {
      if (!this.gameStarted) {
        this.gameStarted = true
        this.startTimer() // Start timer on the first question
      }
    },
    checkQuestion(question) {
      if (verifyAnswer(question, this.celebrity)) {
        this.isCorrectGuess = true
        this.stopTimer() // Stop timer if the guess is correct
      }
    },
    checkAnswer(answer) {
      if (answer === 'Correct') {
        this.isCorrectGuess = true
        this.stopTimer() // Stop timer if the guess is correct
      }
    },
    addQuestion(question) {
      this.questions.push(question)
    },
    addAnswer(answer) {
      this.answers.push(answer)
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
      this.celebrity = getRandomCelebrityByRegion(this.selectedRegion)
      this.gameStarted = false
      this.resetTimer()
      this.questions = []
      this.answers = []
      this.isCorrectGuess = false
    },
  },
})
