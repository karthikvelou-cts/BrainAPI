<template>
  <div class="flex min-h-screen flex-col bg-gradient-to-b from-white to-slate-100">
    <Navbar />
    <main class="mx-auto w-full max-w-6xl flex-1 px-4 py-6">
      <RouterView />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";
</script>
