<script setup></script>

<template>
  <div class="instructions">
    <h1 class="title">How to Play?</h1>
    <ol class="instruction-list">
      <li>Think of a question that helps narrow down your guess.</li>
      <li>
        Ask a question that can be answered with a simple "Yes" or "No." Directly asking the name or
        open-ended questions is not allowed.
      </li>
      <li>
        In AI Mode, the AI will answer your questions. In Player Mode, the AI will ask you questions
        to guess the name.
      </li>
      <li>
        Enter your question or answer in the input field and press <strong>Enter</strong> or click
        <strong>Submit</strong>.
      </li>
      <li>
        Refine your guess by asking (Yes/No) questions or responding to AI-generated questions to
        narrow down the possibilities.
      </li>
      <li>Continue asking questions until you're confident enough to make a final guess.</li>
      <li>If you guess the name before the last question, simply type the name.</li>
      <li>If you guess correctly, celebrate your victory! If not, don’t worry—try again!</li>
    </ol>
  </div>
</template>

<style scoped>
.instructions {
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

.instruction-list {
  list-style: decimal inside;
  font-size: 1.2rem;
  color: var(--color-text-secondary);
  line-height: 1.6;
}

.instruction-list li {
  margin-bottom: 1rem;
}
</style>
