import { ref, watch, onMounted, computed } from "vue";
import { defineStore } from "pinia";
import { useBebidasStore } from "./bebidas";
import { useModalStore } from "./modal";
import { useNotificacionesStore } from "./notificaciones";

export const useFavoritosStore = defineStore('favoritos', () => {

    const bebida = useBebidasStore()
    const modal = useModalStore()
    const favoritos = ref([])
    const notificaciones = useNotificacionesStore()

    const noFavoritos = computed(() => favoritos.value.length === 0)

    onMounted(() => {
        favoritos.value = JSON.parse(localStorage.getItem('favoritos')) ?? []
    })

    watch(favoritos, () => {
        sincronizarLocalStorage()
    }, {
        deep:true
    })

    function sincronizarLocalStorage() {
        localStorage.setItem('favoritos', JSON.stringify(favoritos.value))
    } 

    function existefavorito(id) {
        const favoritoLocalStorage = JSON.parse(localStorage.getItem('favoritos')) ?? []
        return favoritoLocalStorage.some(favorito => favorito.idDrink === id)
    }

    function agregarFavorito() {
        favoritos.value.push(bebida.receta)
        notificaciones.mostrar = true
        notificaciones.texto = 'Agregado a Favotiros 👍🏼'
    }

    function eliminarFavorito() {
        favoritos.value = favoritos.value.filter(favorito => favorito.idDrink !== bebida.receta.idDrink)
        notificaciones.mostrar = true
        notificaciones.texto = 'Eliminado de Favoritos 😵‍💫'
    }

    function handleClickFavoritos () {
        if(existefavorito(bebida.receta.idDrink)){
            eliminarFavorito()
        } else{
            agregarFavorito()  
        }
        modal.modal = false
    } 

    return {
        handleClickFavoritos,
        favoritos,
        noFavoritos,
        existefavorito
    }
})