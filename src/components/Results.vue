<template>
  <div class="mt-4 p-4 border rounded bg-gray-100">
    <h2 class="text-lg font-bold">Game Over!</h2>
    <p>Total Questions Asked: {{ totalQuestions }}</p>
    <p>Time Taken: {{ timeTaken }} seconds</p>
    <p v-if="correct">🎉 You guessed it correctly!</p>
    <p v-else>❌ Wrong guess. Better luck next time!</p>
    <button @click="restartGame" class="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
      Restart Game
    </button>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useKasotiStore } from '@/stores/kasotiStore'

export default {
  setup() {
    const store = useKasotiStore()
    const totalQuestions = computed(() => store.questions.length)
    const timeTaken = computed(() => store.getTimeTaken)
    const correct = computed(() => store.isCorrectGuess)

    const restartGame = () => {
      store.restartGame()
    }

    return { totalQuestions, timeTaken, correct, restartGame }
  },
}
</script>
