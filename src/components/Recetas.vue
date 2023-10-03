<script setup>
import {useBebidasStore} from '../stores/bebidas'

const bebidas = useBebidasStore()

defineProps({
    receta:Object
})
</script>

<template>
    <div class="w-30 border shadow-lg "> 
        <div class="overflow-hidden">
            <img 
            class="p-2 hover:scale-125 transition-transform "
            :src="receta.strDrinkThumb" 
            alt="">
        </div>

        <div class="p-5">
           <h2 class="truncate font-extrabold">{{receta.strDrink}}</h2> 
           <button 
            @click="bebidas.seleccionarBebida(receta.idDrink)"
            class="bg-blue-500 hover:bg-blue-800 text-white font-extrabold mt-5 p-2 w-full"
           >
                Ver Receta
           </button>
        </div>        
    </div>
</template>

