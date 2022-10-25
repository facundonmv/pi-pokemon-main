const axios = require('axios');
const { Type, Pokemon } = require('../db');    



const getApiInfo = async () => {                                                 
    const pokeUrl = []; 
    const apiUrl = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=60'); 
    
    apiUrl.data.results.forEach(el => {                             
        pokeUrl.push(axios.get(el.url).then(resp => resp.data));   
    });

    const apiInfo = Promise.all(pokeUrl)   
    .then(res => res.map(p => {             
        const info = {
            id: p.id,
            name: p.name,
            img: p.sprites.other.dream_world.front_default,
            type: p.types.map(el => el.type.name),
            health: p.stats[0].base_stat,
            attack: p.stats[1].base_stat,
            defense: p.stats[2].base_stat,
            speed: p.stats[5].base_stat,
            height: p.height,
            weight: p.weight,
        }
        return info;                      
    }))
    return await apiInfo;                 
}

const getDbInfo = async () => {            
    return await Pokemon.findAll({         
        include: {                         
            model: Type,                  
            attributes: ['name'],
            through: {                      
                attributes: [],
            },
        }
    })
}

const getAllPokemons = async () => {       
    const apiInfo = await getApiInfo();     
    const dbInfo = await getDbInfo();
    const infoTotal = apiInfo.concat(dbInfo);
    return infoTotal;                       
}


module.exports = {
    getAllPokemons
}