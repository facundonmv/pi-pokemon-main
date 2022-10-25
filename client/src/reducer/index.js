const initialState = {
    pokemons: [],
    allPokemons: [],
    orderPokemons: [],
    attackPokemons: [],
    types: [],
    detail: [],
    filteredPokemons: [],
}

export default function rootReducer(state = initialState, action){
switch(action.type){
    case 'GET_POKEMONS':
        return{
            ...state,
            pokemons: action.payload,
            allPokemons: action.payload
        }
        case 'GET_TYPES':
            return{
                ...state,
                types: action.payload
            }
            case "GET_DETAILS":
                return{
                    ...state,
                    detail: action.payload
                }
            case "CLEAN_DETAIL":
                return{
                    ...state,
                    detail: []
    
                }
                case 'GET_SEARCH':
                    return {
                        ...state,
                        pokemons: action.payload
                    }
                    case 'GET_POST':
                        return{
                            ...state
                        }
                        case 'ORDER_ALPHA':
                            let arr = action.payload === 'az' ?
                            state.pokemons.sort(function(a,b) {
                                if (a.name > b.name){
                                    return 1
                                }
                                if (b.name > a.name){
                                    return -1
                                }
                                return 0
                            }):
                            state.pokemons.sort(function(a,b){
                                if (a.name > b.name){
                                    return -1
                                }
                                if (b.name > a.name){
                                    return 1
                                }
                                return 0
                            })
                            return{
                                ...state,
                                pokemons: arr
                            }
                            case 'RESET_FILTERS':
                                return{
                                    ...state,
                                    errors: false,
                                    filteredPokemons: []
                                }
                            case 'FILTER_TYPES':
                                let fullPokemons2 = state.allPokemons
                                let resultApi = fullPokemons2.filter(p => p.type && p.type.includes(action.payload))
                                let resultDb = fullPokemons2.filter(p => p.types && p.types.map(t => t.name).includes(action.payload))
                                let result = resultApi.concat(resultDb)
                                return {
                                    ...state,
                                    pokemons: result
                                }
                                case 'FILTER_ATTACK':
                                    const pokemonsWeight = action.payload === 'Weight 1' ?
                                    state.pokemons.sort(function(a,b) {
                                        if(typeof action.payload.weight === 'string'){
                                            if (a.weight > b.weight) {
                                                return 1
                                            }
                                            if (a.weight < b.weight){
                                                return -1
                                            }
                                            return 0
                                        } else {
                                            if (parseInt(a.weight) > parseInt(b.weight)){
                                                return 1
                                            }
                                            if (parseInt(a.weight) < parseInt(b.weight)){
                                                return -1
                                            }
                                            return 0
                                        }
                                    }) :
                                    state.pokemons.sort(function(a,b) {
                                        if(typeof action.payload.weight === 'string'){
                                            if (a.weight > b.weight) {
                                                return -1
                                            }
                                            if (a.weight < b.weight){
                                                return 1
                                            }
                                            return 0
                                        } else {
                                            if (parseInt(a.weight) > parseInt(b.weight)){
                                                return -1
                                            }
                                            if (parseInt(a.weight) < parseInt(b.weight)){
                                                return 1
                                            }
                                            return 0
                                        }
                                    })
                                    return {
                                        ...state,
                                        pokemons: pokemonsWeight
                                    }
                                    case "GET_POKE_STORE":
                                        return {
                                          ...state,
                                          pokemons: state.allPokemons,
                                        };
                                    case "FILTER_CREATED":
                                        const allPokemons2 = state.allPokemons;
                                        const createdFilter =
                                          action.payload === "created"
                                            ? allPokemons2.filter((el) => el.createdInDb)
                                            : allPokemons2.filter((el) => !el.createdInDb);
                                        return {
                                          ...state,
                                          pokemons: action.payload === "All" ? state.allPokemons : createdFilter,
                                        };
                                        default: return state
}
}