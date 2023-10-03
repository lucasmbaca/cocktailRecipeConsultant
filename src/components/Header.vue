<script setup>
import { computed } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import {useBebidasStore} from '../stores/bebidas.js'
import { useNotificacionesStore } from '../stores/notificaciones';

const route = useRoute()
const bebidas = useBebidasStore()
const notificaciones = useNotificacionesStore()

const paginaInicio = computed(() => route.name === 'inicio')

const handleSubmit = () => {
    if(Object.values(bebidas.busqueda).includes('')){
        notificaciones.$patch({
            texto:'Todos los campos son obligatorios',
            mostrar:true,
            error:true
        })
        return
    }
    bebidas.obtenerRecetas()
}
</script>

<template>
    <header
        class="bg-slate-600"
        :class="{header: paginaInicio}"
    >
        <div class="mx-auto container px-5 py-5">
            <div class="flex justify-between items-center">
                <div>
                    <RouterLink
                        :to="{name:'inicio'}"
                    >
                        <img class="w-32" src="/public/img/logo.svg" alt="logo">
                    </RouterLink>
                </div>
                <nav class="text-white uppercase font-bold">
                    <RouterLink
                        :to="{name:'inicio'}"
                        active-class="text-orange-500"
                    >
                        Inicio
                    </RouterLink>

                    <RouterLink
                        :to="{name:'favoritos'}"
                        active-class="text-orange-500"
                    >
                        Favoritos
                    </RouterLink>

                </nav>
            </div>

            <form 
                v-if="paginaInicio"
                class="md:w-1/2 2xl:w-1/3 bg-orange-500 my-32 p-10 rounded-lg shadow-lg space-y-6"
                @submit.prevent="handleSubmit"
            >
                <div class="space-y-4">
                    <label
                    class="block text-white uppercase font-extrabold text-lg" 
                    for="ingrediente"
                    >Nombre o Ingrediente</label>
                    <input 
                        id="ingrediente"
                        type="text"
                        class="p-3 w-full rounded-lg focus:outline-none"
                        placeholder="Nombre o Ingrediente: Negroni"
                        v-model="bebidas.busqueda.nombre"
                    >
                </div>

                <div class="space-y-4">
                    <label
                    class="block text-white uppercase font-extrabold text-lg" 
                    for="categoria"
                    >Categoria</label>
                    <select 
                        id="ingrediente"
                        class="p-3 w-full rounded-lg focus:outline-none"
                        v-model="bebidas.busqueda.categoria"
                    >
                    <option value="">-- seleccionar --</option>
                    <option 
                        v-for="categoria in bebidas.categorias"
                        :key="categoria.strCategory"
                        :value="categoria.strCategory"
                    >{{categoria.strCategory}}</option>
                    </select>
                </div>

                <input 
                    class="bg-blue-500 hover:bg-blue-800 text-white font-extrabold p-2 w-full rounded-lg uppercase shadow"
                    type="submit" 
                    value="Buscar receta">
            </form>

        </div>
    </header>
</template>

<style scoped>
 .header{
    background-image: url('/public/img/bg.jpg');
    background-size: cover;
    background-position: center;
 }
</style>