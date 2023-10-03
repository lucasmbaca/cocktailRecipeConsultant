<script setup>
import Recetas from '../components/Recetas.vue'
import { useFavoritosStore } from '../stores/favoritos';

const favoritos = useFavoritosStore()
</script>

<template>
    <p v-if="favoritos.noFavoritos" class="text-center text-2xl font-extrabold mt-5">no hay bebidas agregadas en tus favoritos, busca en el buscador de inicio 🥃</p>
    <h1 v-else class="text-6xl mt-5 font-extrabold">Favoritos</h1>

    <div class="grid grid-cols-1 md:grid-cols-3 3xl:grid-cols-4 mt-10 gap-10">
        <Recetas
            v-for="receta in favoritos.favoritos"
            :key="receta.idDrink"
            :receta="receta"
        />
    </div>
</template>
