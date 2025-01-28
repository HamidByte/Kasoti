<template>
  <div class="question-list-container" v-if="hasQuestions">
    <h2 class="text-lg font-bold mb-2 text-center">Questions Asked:</h2>
    <ul class="question-list">
      <li v-for="(item, index) in questions" :key="index" class="question-item">
        <div class="question">
          <span class="question-number">Q{{ index + 1 }}:</span>
          <span class="question-text">{{ item.question }}</span>
        </div>
        <div class="answer">
          <span class="answer-label">Answer:</span>
          <span class="answer-text">{{ item.answer }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useKasotiStore } from '@/stores/kasotiStore'

export default {
  setup() {
    const store = useKasotiStore()
    const questions = store.questions

    const hasQuestions = computed(() => questions.length > 0)

    return { questions, hasQuestions }
  },
}
</script>

<style scoped>
/* Container styles */
.question-list-container {
  max-height: 60vh; /* Ensures the container does not exceed the viewport height */
  overflow: hidden; /* Ensures no browser scroll appears */
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
  color: var(--color-text-primary);
  /* background-color: var(--color-bg); */
  /* padding: 1rem; */
  /* border: 1px solid var(--color-border); */
  /* border-radius: 5px; */
  /* box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); */
}

/* List styles */
.question-list {
  overflow-y: auto;
  max-height: calc(100% - 3rem); /* Ensures scroll appears only for the list */
  padding: 1rem;
  margin: 0;
}

.question-list::-webkit-scrollbar {
  width: 8px;
}

.question-list::-webkit-scrollbar-thumb {
  background-color: var(--color-primary);
  border-radius: 4px;
}

.question-list::-webkit-scrollbar-track {
  background-color: #f0f0f0;
}

/* List item styles */
.question-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem;
  background: var(--color-bg-2);
  border-bottom: 2px solid var(--color-border);
  /* border-radius: 5px; */
  /* box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); */
}

.question-item:last-child {
  margin-bottom: 0;
}

/* Question and answer styles */
.question {
  font-size: 0.9rem;
}

.question-number {
  margin-right: 0.5rem;
  font-weight: bold;
  color: var(--color-primary);
}

.question-text {
  color: var(--color-text-primary);
}

.answer {
  font-size: 0.9rem;
}

.answer-label {
  margin-right: 0.5rem;
  font-weight: bold;
  color: var(--color-primary);
}

.answer-text {
  color: var(--color-text-primary);
}
</style>
