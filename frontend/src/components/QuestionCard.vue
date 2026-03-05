<template>
  <div class="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
    <p class="text-xs font-semibold uppercase tracking-wide text-brand-600">{{ question.category }}</p>
    <h3 class="mt-2 text-base font-semibold text-slate-800">{{ question.question }}</h3>
    <div class="mt-3 text-sm text-slate-600">
      <span class="font-semibold">Created By:</span>
      {{ question.createdBy || "Admin" }}
    </div>
  </div>
</template>

<script setup>
defineProps({
  question: {
    type: Object,
    required: true,
  },
});
</script>
