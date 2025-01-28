<script setup>
import { useKasotiStore } from '@/stores/kasotiStore'
import { computed, ref } from 'vue'
import IconMoon from '@/components/icons/IconMoon.vue'
import IconSun from '@/components/icons/IconSun.vue'

const store = useKasotiStore()
const darkMode = ref(false)
const color = computed(() => (darkMode.value ? '#ffffff' : '#1e1e1e'))
const questionsLeft = computed(() => store.questionsLeft)
const timeTaken = computed(() => store.getTimeTaken)

function toggleTheme() {
  darkMode.value = !darkMode.value
  document.documentElement.setAttribute('data-theme', darkMode.value ? 'dark' : 'light')
}
</script>

<template>
  <div class="container">
    <header>
      <!-- Logo -->
      <div class="logo">Kasoti Game</div>

      <!-- Menu -->
      <div class="menu">
        <div class="menu-left">
          <RouterLink to="/" class="menu-btn">Home</RouterLink>
          <!-- Theme Toggle Button -->
          <button class="toggle-btn" title="Toggle theme" @click="toggleTheme">
            <template v-if="darkMode">
              <IconSun :color="color" />
            </template>
            <template v-else>
              <IconMoon :color="color" />
            </template>
          </button>
        </div>

        <div class="menu-center">
          <span class="menu-btn-2">Remaining Questions: {{ questionsLeft }}</span>
          <span class="menu-btn-2">Timer: {{ timeTaken }}</span>
        </div>

        <div class="menu-right">
          <RouterLink to="/instructions" class="menu-btn">Instructions</RouterLink>
          <RouterLink to="/about" class="menu-btn">About</RouterLink>
        </div>
      </div>
    </header>

    <!-- Main Game Content -->
    <div class="game-content">
      <RouterView />
    </div>
  </div>
</template>

<style scoped>
.container {
  /* max-width: 800px; */
  height: 100vh;
  margin: 0 auto;
  text-align: center;
  background-color: var(--color-bg);
}

header {
  padding: 1rem 0;
  margin: 0 auto;
}

.logo {
  font-size: 2.5rem;
  font-weight: bold;
  color: #2c3e50;
  margin-bottom: 2rem;

  /* text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease; */
}

/* .logo:hover {
  transform: scale(1.1);
} */

[data-theme='dark'] .logo {
  color: #dff1ff;
}

.toggle-btn {
  width: 40px;
  height: 40px;
  padding: 0;
  font-size: 1.1rem;
  font-weight: bold;
  color: var(--color-surface);
  background-color: transparent;
  border: none;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.toggle-btn:hover {
  transform: translateY(-3px);
}

.toggle-btn:active {
  transform: translateY(1px);
}

.menu {
  display: flex;
  justify-content: center;
  justify-content: space-between; /* Ensures the left, center, and right sections are spaced correctly */
  gap: 20px;
  margin: 0 auto;
  width: 73%;
}

.menu-left {
  display: flex;
  flex: 1; /* Pushes to the left */
  justify-content: left;
  gap: 20px; /* Space between buttons */
}

.menu-center {
  display: flex;
  flex: 1; /* Centers the menu items */
  justify-content: center;
  gap: 20px; /* Space between buttons */
}

.menu-right {
  display: flex;
  flex: 1; /* Pushes to the right */
  justify-content: right;
  gap: 20px; /* Space between buttons */
}

.menu-btn {
  padding: 10px 20px;
  font-size: 1.1rem;
  font-weight: bold;
  color: var(--color-surface);
  background-color: var(--color-primary);
  text-decoration: none;
  border: none;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition:
    background-color 0.3s ease,
    transform 0.3s ease;
}

.menu-btn:hover {
  background-color: var(--color-primary-hover);
  transform: translateY(-3px);
}

.menu-btn:active {
  transform: translateY(1px);
}

.menu-btn-2 {
  padding: 10px 20px;
  font-size: 1.1rem;
  font-weight: bold;
  color: var(--color-surface);
  background-color: var(--color-secondary);
  border: none;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition:
    background-color 0.3s ease,
    transform 0.3s ease;
}

.menu-btn-2:hover {
  background-color: var(--color-secondary-hover);
  transform: translateY(-3px);
}

.menu-btn-2:active {
  transform: translateY(1px);
}

.game-content {
  margin: 0 auto;
  padding: 2rem;
  width: 70%;
  background-color: var(--color-surface);
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}
</style>
