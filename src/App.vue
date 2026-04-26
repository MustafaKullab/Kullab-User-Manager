<template>
  <Toaster position="top-right" richColors expand closeButton />
  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<script setup>
import { Toaster } from "vue-sonner";
import { RouterView } from "vue-router";
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
