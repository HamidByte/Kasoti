<script setup></script>

<template>
  <div class="about">
    <h1 class="title">About</h1>
    <p class="description">
      Kasoti is a fun and interactive guessing game that challenges your skills. Players ask
      questions to figure out a mystery word or name. Kasoti uses AI to answer the questions. We
      hope you have as much fun playing it as we did creating it!
    </p>
  </div>
</template>

<style scoped>
.about {
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
}

.title {
  font-size: 2.5rem;
  font-weight: bold;
  text-align: center;
  color: var(--color-text-primary);
  margin-bottom: 1.5rem;
}

.description {
  font-size: 1.2rem;
  color: var(--color-text-secondary);
  line-height: 1.6;
  margin-bottom: 1.2rem;
}
</style>
