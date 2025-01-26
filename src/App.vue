<script setup></script>

<template>
  <div class="container">
    <header>
      <!-- Logo -->
      <div class="logo">Kasoti Game</div>

      <!-- Menu -->
      <div class="menu">
        <RouterLink to="/" class="menu-btn">Home</RouterLink>
        <RouterLink to="/instructions" class="menu-btn">Instructions</RouterLink>
        <RouterLink to="/about" class="menu-btn">About</RouterLink>
      </div>
    </header>

    <!-- Main Game Content -->
    <div class="game-content">
      <RouterView />
    </div>
  </div>
</template>

<style>
html,
body {
  margin: 0;
  font-family: 'Arial', sans-serif;
}
</style>

<style scoped>
.container {
  /* max-width: 800px; */
  height: 100vh;
  margin: 0 auto;
  text-align: center;
  background-color: #f4f4f9;
}

header {
  padding: 20px;
  margin-bottom: 1rem;
}

.logo {
  font-size: 2.5rem;
  font-weight: bold;
  color: #2c3e50;
  margin-bottom: 20px;
  /* text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease; */
}

/* .logo:hover {
  transform: scale(1.1);
} */

.menu {
  display: flex;
  justify-content: center;
  gap: 20px;
}

.menu-btn {
  padding: 10px 20px;
  font-size: 1.1rem;
  font-weight: bold;
  color: white;
  background-color: #3498db;
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
  background-color: #2980b9;
  transform: translateY(-3px);
}

.menu-btn:active {
  transform: translateY(1px);
}

.game-content {
  margin: 0 auto;
  padding: 2rem;
  width: 70%;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}
</style>
