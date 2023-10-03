<script setup>
import Recetas from '../components/Recetas.vue'
import { useBebidasStore } from '../stores/bebidas';

const bebidas = useBebidasStore()
</script>

<template>
    <p v-if="bebidas.noRecetasDisponibles" class="text-center text-2xl font-extrabold mt-2">no hay bebidas, busca en el buscador de mas arriba 🥃</p>
    <h1 v-else class="text-6xl mt-3 font-extrabold">Recetas</h1>
    <div class="grid grid-cols-1 md:grid-cols-3 3xl:grid-cols-4 mt-10 gap-10">
        <Recetas
            v-for="receta in bebidas.recetas"
            :key="receta.idDrink"
            :receta="receta"
        />
    </div>
</template>