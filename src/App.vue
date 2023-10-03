<script setup>
      import Header from './components/Header.vue'
      import Modal from './components/Modal.vue'
      import { RouterView } from 'vue-router';
      import Notificacion  from './components/Notificaciones.vue'
</script>

<template>
      <Header/>
      <main class="container mx-auto ">
            <RouterView/>
      </main>
      <Modal/>
      <Notificacion/>
</template>

<style scoped></style>
