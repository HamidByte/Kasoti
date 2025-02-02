<template>
  <div class="question-form-wrapper mb-4">
    <input
      v-model="userInput"
      @keydown.enter="submitInput"
      :placeholder="isPlayerMode ? `Type your answer...` : `Type your question...`"
      class="w-full p-2 border rounded"
    />
    <button @click="submitInput" class="mt-2 px-4 py-2 bg-blue-500 text-white rounded">
      <span v-if="isLoading">Submitting...</span>
      <span v-else>Submit</span>
    </button>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useKasotiStore } from '@/stores/kasotiStore'
import { sendPromptApi } from '@/services/apiService'
import * as DEFINITIONS from '@/utils/constants.js'
import { verifyAnswer } from '@/utils/verifyAnswer'
import { eventBus } from '@/eventBus'

const store = useKasotiStore()

const userInput = ref('')
const isLoading = ref(false)
const startClicked = ref(false)
const isPlayerMode = computed(() => store.isPlayerMode)
const gameStarted = computed(() => store.gameStarted)
const selectedCelebrity = computed(() => store.selectedCelebrity)
const questions = computed(() => store.questions)
const answers = computed(() => store.answers)

const submitInput = async () => {
  if (!userInput.value.trim() && startClicked.value) {
    return
  }

  if (isPlayerMode.value && gameStarted.value) {
    if (
      startClicked.value &&
      userInput.value.trim().toLowerCase() !== 'yes' &&
      userInput.value.trim().toLowerCase() !== 'no'
    ) {
      alert('Please answer with "Yes" or "No" only.')
      return
    }

    isLoading.value = true // Start loading

    // First time when the game starts, send the initial prompt
    if (!startClicked.value) {
      startClicked.value = true

      // Send the initial prompt to get the first question
      const response = await sendPromptApi(DEFINITIONS.PLAYER_PROMPT)
      const question =
        response?.candidates[0]?.content?.parts[0]?.text ?? DEFINITIONS.DEFAULT_ERROR_MESSAGE

      store.addQuestion(question.trim())
    } else {
      const previousQA = questions.value
        .map((q, i) => `Q${i + 1}: ${q}\nAnswer: ${userInput.value.trim()}`)
        .join('\n\n')

      const playerPrompt = `${DEFINITIONS.PLAYER_PROMPT}\n\n${previousQA}\n\nQ${questions.value.length + 1}:`

      // Send the updated prompt to the API to get the next question
      const response = await sendPromptApi(playerPrompt)
      const question =
        response?.candidates[0]?.content?.parts[0]?.text ?? DEFINITIONS.DEFAULT_ERROR_MESSAGE

      store.addQuestion(question.trim())
      store.addAnswer(userInput.value.trim())
    }
  }

  if (!isPlayerMode.value) {
    if (!userInput.value.trim()) {
      return
    }

    store.startGame()

    try {
      // Verify the answer using custom logic
      store.checkQuestion(userInput.value.trim())

      // Retrieve the general answers
      const aiPrompt = DEFINITIONS.AI_PROMPT.replace('{celebrity}', selectedCelebrity.value)
      const response = await sendPromptApi(`${aiPrompt}\n${userInput.value}`)
      const answer =
        response?.candidates[0]?.content?.parts[0]?.text ?? DEFINITIONS.DEFAULT_ERROR_MESSAGE

      // Verify the answer using the API
      store.checkAnswer(answer.trim())

      store.addQuestion(userInput.value.trim())
      store.addAnswer(answer.trim())
    } catch (error) {
      console.error('Submission failed:', error) // Log the error for debugging
      store.addQuestion(userInput.value.trim())
      store.addAnswer(DEFINITIONS.GENERIC_ERROR_MESSAGE)
    }
  }

  isLoading.value = false // Stop loading in all cases
  userInput.value = '' // Clear input
}

// Assign the function to be triggered globally
eventBus.triggerSubmitInput = () => {
  submitInput()
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
