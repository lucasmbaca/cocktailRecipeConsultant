<script setup>
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { useModalStore } from '../stores/modal';
import {useBebidasStore} from '../stores/bebidas';
import {useFavoritosStore} from '../stores/favoritos';

const modal = useModalStore()
const bebida = useBebidasStore()
const favoritos = useFavoritosStore()


const formatearIngredientes = () => {
  const ingredientesDiv = document.createElement('div')

  for(let i=1; i <= 15; i++) {
    if(bebida.receta[`strIngredient${i}`]){
      const ingrediente = bebida.receta[`strIngredient${i}`]
      const instruccion = bebida.receta[`strMeasure${i}`]

      const ingredienteCantidad = document.createElement('p')
      ingredienteCantidad.classList.add('text-lg','text-gray-600')
      ingredienteCantidad.textContent = `${ingrediente} - ${instruccion}`

      ingredientesDiv.appendChild(ingredienteCantidad)
    }
  }
  return ingredientesDiv
}

const handleFavoritosClick = () => {
  console.log('conectado...')
}


</script>

<template>
  <TransitionRoot :show="modal.modal">
    <Dialog @close="modal.handleClickModal">
      <TransitionChild enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      </TransitionChild>
      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
          <TransitionChild enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
            <DialogPanel class="relative transform overflow-hidden rounded-lg bg-white p-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:p-6">
              <div>
                <div class="mt-3">
                  <DialogTitle class="text-4xl font-extrabold py-5">
                    {{ bebida.receta.strDrink }}
                  </DialogTitle>
                  <img 
                    :src="bebida.receta.strDrinkThumb"
                    class="mx-auto w-80"
                    >

                    <DialogTitle class="text-2xl text-gray-900 font-extrabold py-5">
                      <h3>Ingredientes y Cantidades:</h3>
                      <div v-html="formatearIngredientes().outerHTML"></div>
                    </DialogTitle>
                    <DialogTitle class="text-2xl text-gray-900 font-extrabold py-5">
                      <h3>Instrucciones:</h3>
                    </DialogTitle>
                      <p 
                        class="text-lg text-gray-600"
                      >
                        {{ bebida.receta.strInstructions }}
                      </p>
                </div>
              </div>
              <div class="mt-5 sm:mt-6 flex justify-between gap-4">
                <button class="bg-blue-500 hover:bg-blue-800 text-white font-extrabold p-2 rounded-lg w-full shadow" @click="favoritos.handleClickFavoritos">
                  {{modal.textoBoton}}
                </button>
                <button class="bg-red-500 hover:bg-red-800 text-white font-extrabold p-2 rounded-lg w-full shadow" @click="modal.handleClickModal">
                  Cerrar
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
