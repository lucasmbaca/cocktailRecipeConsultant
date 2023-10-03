import api from "../lib/axios";

export default{
    obtenerCategorias(){
        return api.get('/list.php?c=list')
    },
    buscarRecetas({nombre, categoria}){
        return api.get(`/filter.php?c=${categoria}&i=${nombre}`)
    },
    obtenerReceta(id) {
        return api.get(`/lookup.php?i=${id}`)
    }

}