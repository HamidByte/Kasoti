<template>
  <div class="question-form-wrapper mb-4">
    <input
      v-model="userInput"
      @keydown.enter="submitInput"
      placeholder="Type your question..."
      class="w-full p-2 border rounded"
    />
    <button @click="submitInput" class="mt-2 px-4 py-2 bg-blue-500 text-white rounded">
      <span v-if="isLoading">Submitting...</span>
      <span v-else>Submit</span>
    </button>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useKasotiStore } from '@/stores/kasotiStore'
import { sendQuestionApi } from '@/services/apiService'
import { verifyAnswer } from '@/utils/verifyAnswer'
import * as DEFINITIONS from '@/utils/constants.js'

export default {
  setup() {
    const userInput = ref('')
    const store = useKasotiStore()
    const selectedCelebrity = computed(() => store.selectedCelebrity)
    const isLoading = ref(false)

    const submitInput = async () => {
      if (!userInput.value.trim()) return
      isLoading.value = true // Start loading

      try {
        // Verify the answer using custom logic
        store.checkQuestion(userInput.value.trim())

        // Retrieve the general answers
        const aiPrompt = DEFINITIONS.AI_PROMPT.replace('{celebrity}', selectedCelebrity.value)
        const response = await sendQuestionApi(`${aiPrompt}\n${userInput.value}`)
        const answer =
          response?.candidates[0]?.content?.parts[0]?.text ?? DEFINITIONS.DEFAULT_ERROR_MESSAGE

        // Verify the answer using the API
        store.checkAnswer(answer.trim())

        store.addQuestion({ question: userInput.value, answer: answer.trim() })
      } catch (error) {
        console.error('Submission failed:', error) // Log the error for debugging
        store.addQuestion({
          question: userInput.value,
          answer: DEFINITIONS.GENERIC_ERROR_MESSAGE,
        })
      }

      isLoading.value = false // Stop loading in all cases
      userInput.value = '' // Clear input
    }

    return { userInput, isLoading, submitInput }
  },
}
</script>

<style scoped>
.question-form-wrapper {
  padding-top: 1rem;
}

input {
  margin-right: 1rem;
  width: 80%;
  padding: 10px 20px;
  font-size: 1.2rem;
  color: var(--color-text-primary);
  background-color: var(--color-surface);
  border-top: 0;
  border-left: 0;
  border-right: 0;
  border-bottom: 2px solid var(--color-primary);
  outline: none;
  /* box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: border-color 0.3s ease; */
}

input:focus {
  border-top: 0;
  border-left: 0;
  border-right: 0;
  border-bottom: 2px solid var(--color-primary);
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
