<script setup>
import { ref, computed } from 'vue'
import { useKasotiStore } from '@/stores/kasotiStore'
import QuestionInput from '@/components/QuestionInput.vue'
import QuestionList from '@/components/QuestionList.vue'
import Results from '@/components/Results.vue'

const store = useKasotiStore()
const gameOver = computed(() => store.gameOver)
</script>

<template>
  <main>
    <QuestionInput v-if="!gameOver" />
    <QuestionList v-if="!gameOver" />
    <Results v-if="gameOver" />
  </main>
</template>
