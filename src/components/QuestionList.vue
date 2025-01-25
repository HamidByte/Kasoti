<template>
  <div>
    <h2 class="text-lg font-bold mb-2">Questions Asked:</h2>
    <ul>
      <li v-for="(item, index) in questions" :key="index" class="mb-2">
        <strong>Q{{ index + 1 }}:</strong> {{ item.question }} - <span>{{ item.answer }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import { useKasotiStore } from '@/stores/kasotiStore'

export default {
  setup() {
    const store = useKasotiStore()
    const questions = store.questions
    return { questions }
  },
}
</script>
