const { Type, Pokemon } = require('../db');     
const { getAllPokemons } = require('../controller/controller')



const getPokemons = async(req, res) => {    
    try {
        
        let pokemonsTotal = await getAllPokemons(); 
        const {name} = req.query           
    
        if(name){                                 
            let pokemonName = pokemonsTotal.filter((el) => 
            el.name.toLowerCase().includes(name.toLowerCase()))
            pokemonName.length ? res.status(200).send(pokemonName) : res.status(404).send('No está el Pokemon');    
        } else {                                   
            res.status(200).send(pokemonsTotal)    
        }
    } catch (error) {
        console.log('error en /pokemons', error)
    }
    }

// POST /pokemons
const postPokemons = async(req, res) => {         
    const { name, img, health, attack, defense, speed, height, weight, types, createdInDb } = req.body;
try{
    let pokemonCreated = await Pokemon.create({        
        name,
        img, 
        health, 
        attack, 
        defense, 
        speed, 
        height, 
        weight,  
        createdInDb
    }) 

    let typeDb = await Type.findAll({   
        where: {                        
            name: types,
        }
    })

    pokemonCreated.addType(typeDb); 
    res.status(200).send('Pokémon creado con éxito!')
}catch(error){
    res.status(400).send('No se pudo crear el Pokémon', error)
}
}



const getPokemonsId = async(req, res) => {
try {
        const  { id } = req.params;                    
    const pokemonsTotal = await getAllPokemons();   

    if(id){
        let pokeId = pokemonsTotal.filter(p => p.id == id)
        pokeId.length? res.status(200).json(pokeId) : res.status(404).send('No se encontró el Pokémon') 
    }
} catch (error) {
    console.log('error en /pokemons/:id', error)
}
}


module.exports = {
    getPokemons,
    postPokemons,
    getPokemonsId
}