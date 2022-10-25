import axios from 'axios'

export function getPokemons(){
    return async function(dispatch){
try {
    var {data} = await axios.get("http://localhost:3001/pokemons")
    return dispatch({
        type: 'GET_POKEMONS',
        payload: data
    })
} catch (error) {
    console.log('error en getPokemons', error)
}
    }
}

export function getTypes(){
    return async function (dispatch){
try {
    var {data} = await axios.get("http://localhost:3001/types", {})
    return dispatch({
     type: 'GET_TYPES',
     payload: data
    })
} catch (error) {
    console.log('error en getTypes', error)
}
    }
}

export function getDetail(id){
    return async function(dispatch){
        try{
            var json = await axios.get(`http://localhost:3001/pokemons/${id}`);
            return dispatch({ type: "GET_DETAILS", payload: json.data })
        }catch(error){
            console.log('error en getDetail', error)
        }
    }
}

export function cleanDetail(){
    return {
        type: "CLEAN_DETAIL"
    }
}


export function getSearch(name){
    return async function (dispatch){
try {
    const {data} = await axios.get(`http://localhost:3001/pokemons?name=${name}`)
    return dispatch({
        type: 'GET_SEARCH',
        payload: data
    })
} catch (error) {
    console.log('error en getSearch', error)
}
    }
}

export function getPost (payload) {  
    return async function (dispatch) {
try {
    var json = await axios.post("http://localhost:3001/pokemons", payload);  
    /* console.log(json)*/                                                  
    return dispatch ({
        type: "GET_POST",
        payload: json.data
    })
} catch (error) {
    console.log('error en getPost', error)
}
    }
  };

export const orderAlpha = (payload) =>{
    return{
        type: 'ORDER_ALPHA',
        payload
    }
}

export const filterTypes = (payload) =>{
    return{
        type: 'FILTER_TYPES',
        payload
    }
}

export const filterAttack = (payload) => {
    return {
        type: 'FILTER_ATTACK',
        payload
    }
}

export function filterCreated(payload){         
    return{
        type: "FILTER_CREATED",         
        payload,                        
    }
}

export const getPokeStore = () => {
    return { type: "GET_POKE_STORE" };
  };

  export const resetFilters = () => {
    return function(dispatch){
        dispatch({
            type: 'RESET_FILTERS',
        })
    }
}