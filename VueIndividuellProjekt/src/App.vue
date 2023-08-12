<template>
  <div id="app">
    <header>
      <!-- Your header content -->
    </header>
    <nav>
      <!-- Your navigation links -->
      <router-link to="/"></router-link>
      <!-- Add more navigation links for other routes -->
    </nav>
    <main>
      <router-view></router-view> <!-- Content of different routes will be displayed here -->
    </main>
  </div>
</template>

<script>
export default {
  // Component options
};
</script>

<style>
/* Your component's styles */
</style>
