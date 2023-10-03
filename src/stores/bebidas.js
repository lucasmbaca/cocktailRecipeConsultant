import { ref, onMounted, reactive, computed } from 'vue';
import { defineStore } from 'pinia';
import APIService from '../services/APIService'
import { useModalStore } from './modal';

export const useBebidasStore = defineStore('bebidas', () => {

    const categorias = ref([]);
    const recetas = ref([])
    
    const modal = useModalStore()

    const busqueda = reactive({
        nombre:'',
        categoria:''
    })

    const receta = ref({})

    const noRecetasDisponibles = computed(() => recetas.value.length === 0)

    onMounted(async () => {
        const {data: {drinks}} = await APIService.obtenerCategorias()
        categorias.value = drinks
    })

    async function obtenerRecetas() {
       const {data: {drinks}} = await APIService.buscarRecetas(busqueda)
       recetas.value =drinks
    }

    async function seleccionarBebida(id) {
        const {data:{drinks}} = await APIService.obtenerReceta(id)
        receta.value = drinks[0]
        modal.handleClickModal()
    }

    return{
        categorias,
        busqueda,
        recetas,
        receta,
        obtenerRecetas,
        seleccionarBebida,
        noRecetasDisponibles
    }
})