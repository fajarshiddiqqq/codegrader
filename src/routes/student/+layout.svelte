<!-- src/routes/student/+layout.svelte -->
<script lang="ts">
  import Navbar from './Navbar.svelte';
  let { children } = $props();
</script>

<!-- 1. Full viewport, flex column -->
<div class="flex flex-col h-screen bg-gray-50">
  <Navbar />
  <!-- 2. Main takes *all* remaining space -->
  <main class="flex-1 overflow-hidden">
    {@render children()}
  </main>
</div>