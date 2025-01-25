<template>
  <div class="mb-4">
    <input
      v-model="userQuestion"
      @keydown.enter="submitQuestion"
      placeholder="Type your question..."
      class="w-full p-2 border rounded"
    />
    <button @click="submitQuestion" class="mt-2 px-4 py-2 bg-blue-500 text-white rounded">
      Submit
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

    const submitQuestion = async () => {
      if (!userQuestion.value.trim()) return

      if (store.questionsLeft === 1) {
        // Final guess
        const isCorrect =
          userQuestion.value.trim().toLowerCase() === selectedCelebrity.value.toLowerCase()
        store.addQuestion({
          question: userQuestion.value,
          answer: isCorrect ? "YES! You've guessed it!" : "NO! That's incorrect.",
        })
        return
      }

      // Otherwise, send it to the API
      const predefinedPrompt = `You are playing a guessing game. The word is ${selectedCelebrity.value}. Format the answer in this style: "Answer: [YES/NO]".`
      const apiResponse = await sendQuestion(`${predefinedPrompt}\n${userQuestion.value}`)

      const answer = apiResponse?.candidates[0]?.content?.parts[0]?.text ?? 'Error'
      store.addQuestion({ question: userQuestion.value, answer })
      userQuestion.value = ''
    }

    return { userQuestion, submitQuestion }
  },
}
</script>
