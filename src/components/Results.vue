<template>
  <div class="results-wrapper mt-4 p-4 border rounded bg-gray-100">
    <h2 class="text-lg font-bold">Game Over!</h2>
    <p>Total Questions Asked: {{ totalQuestions }}</p>
    <p>Time Taken: {{ formattedTime }}</p>
    <p v-if="isCorrectGuess">{{ DEFINITIONS.WIN_MESSAGE }}</p>
    <p v-else>{{ DEFINITIONS.LOSS_MESSAGE }}</p>
    <button @click="restartGame" class="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
      Restart Game
    </button>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { useKasotiStore } from '@/stores/kasotiStore'
import { showFireworks } from '@/utils/fireworks'
import * as DEFINITIONS from '@/utils/constants.js'

export default {
  setup() {
    const store = useKasotiStore()
    const gameOver = computed(() => store.gameOver)
    const isCorrectGuess = computed(() => store.isCorrectGuess)
    const totalQuestions = computed(() => store.questions.length)
    const timeTaken = computed(() => store.getTimeTaken)
    const hours = computed(() => parseInt(timeTaken.value.split(':')[0], 10))
    const minutes = computed(() => parseInt(timeTaken.value.split(':')[1], 10))
    const seconds = computed(() => parseInt(timeTaken.value.split(':')[2], 10))

    const formattedTime = computed(() => {
      if (hours.value > 0) {
        return `${hours.value} hours, ${minutes.value} minutes and ${seconds.value} seconds`
      } else if (minutes.value > 0) {
        return `${minutes.value} minutes and ${seconds.value} seconds`
      } else {
        return `${seconds.value} seconds`
      }
    })

    const restartGame = () => {
      store.restartGame()
    }

    onMounted(() => {
      if (gameOver.value && isCorrectGuess.value) showFireworks()
    })

    return { totalQuestions, formattedTime, isCorrectGuess, restartGame, DEFINITIONS }
  },
}
</script>

<style scoped>
.results-wrapper {
  margin: 0 auto;
  text-align: center;
  color: var(--color-text-primary);
}

h2 {
  font-size: 2rem;
  font-weight: bold;
  color: var(--color-primary);
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 1px;
}

p {
  font-size: 1.2rem;
  color: var(--color-text-primary);
  margin-bottom: 0.5rem;
  line-height: 1.5;
}

p:last-child {
  margin-bottom: 1.5rem;
}

button {
  padding: 10px 20px;
  font-size: 1.1rem;
  font-weight: bold;
  color: var(--color-surface);
  background-color: var(--color-primary);
  border: none;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition:
    background-color 0.3s ease,
    transform 0.3s ease;
}

button:hover {
  background-color: var(--color-primary-hover);
  transform: translateY(-3px);
}

button:active {
  transform: translateY(1px);
}
</style>
