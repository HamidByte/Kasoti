<script>
import { computed } from 'vue'
import { useKasotiStore } from '@/stores/kasotiStore'
import QuestionInput from '@/components/QuestionInput.vue'
import QuestionList from '@/components/QuestionList.vue'
import Results from '@/components/Results.vue'

export default {
  components: { QuestionInput, QuestionList, Results },
  setup() {
    const store = useKasotiStore()
    const gameOver = computed(() => store.questionsLeft <= 0 || store.isCorrectGuess) // Access as a property
    return { gameOver }
  },
}
</script>

<template>
  <div class="container">
    <h1 class="text-xl font-bold mb-4">Kasoti Game</h1>
    <QuestionInput v-if="!gameOver" />
    <QuestionList v-if="!gameOver" />
    <Results v-if="gameOver" />
  </div>
</template>

<style scoped>
.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}
</style>
