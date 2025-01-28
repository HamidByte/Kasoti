<template>
  <div class="question-form-wrapper mb-4">
    <input
      v-model="userQuestion"
      @keydown.enter="submitQuestion"
      placeholder="Type your question..."
      class="w-full p-2 border rounded"
    />
    <button @click="submitQuestion" class="mt-2 px-4 py-2 bg-blue-500 text-white rounded">
      <span v-if="isLoading">Submitting...</span>
      <span v-else>Submit</span>
    </button>
  </div>
</template>

<script>
import { ref } from 'vue'
import { computed } from 'vue'
import { useKasotiStore } from '@/stores/kasotiStore'
import { sendQuestion } from '@/services/apiService'

export default {
  setup() {
    const userQuestion = ref('')
    const store = useKasotiStore()
    const selectedCelebrity = computed(() => store.selectedCelebrity)
    const isLoading = ref(false)

    const submitQuestion = async () => {
      if (!userQuestion.value.trim()) return

      isLoading.value = true // Start loading

      try {
        // Final guess
        if (store.questionsLeft === 1) {
          const isCorrect =
            userQuestion.value.trim().toLowerCase() === selectedCelebrity.value.toLowerCase()
          store.addQuestion({
            question: userQuestion.value,
            answer: isCorrect ? "YES! You've guessed it!" : "NO! That's incorrect.",
          })
          userQuestion.value = '' // Clear input
          return
        }

        // Otherwise, send it to the API
        const predefinedPrompt = `I am playing a guessing game. The name is ${selectedCelebrity.value}. Answer must be in binary form only either Yes or No. Format the answer in this style: "Yes/No".`
        const apiResponse = await sendQuestion(`${predefinedPrompt}\n${userQuestion.value}`)

        const answer =
          apiResponse?.candidates[0]?.content?.parts[0]?.text ?? 'Sorry, I couldn’t process that.'

        store.addQuestion({ question: userQuestion.value, answer })
      } catch (error) {
        console.error('Submission failed:', error) // Log the error for debugging
        store.addQuestion({
          question: userQuestion.value,
          answer: 'An error occurred. Please try again later.',
        })
      } finally {
        isLoading.value = false // Stop loading in all cases
        userQuestion.value = '' // Clear input
      }
    }

    return { userQuestion, submitQuestion, isLoading }
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
  border-top: 0;
  border-left: 0;
  border-right: 0;
  border-bottom: 2px solid #3498db;
  outline: none;
  /* box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: border-color 0.3s ease; */
}

input:focus {
  border-top: 0;
  border-left: 0;
  border-right: 0;
  border-bottom: 2px solid #3498db;
}

button {
  padding: 10px 20px;
  font-size: 1.1rem;
  font-weight: bold;
  color: white;
  background-color: #3498db;
  border: none;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition:
    background-color 0.3s ease,
    transform 0.3s ease;
}

button:hover {
  background-color: #2980b9;
  transform: translateY(-3px);
}

button:active {
  transform: translateY(1px);
}
</style>
