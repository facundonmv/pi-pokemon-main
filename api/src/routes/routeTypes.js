const axios = require('axios');
const { Type } = require('../db');     


// GET/types
const getTypes = async(req, res) => {
try {
    const apiUrlTypes = await axios.get('https://pokeapi.co/api/v2/type')
    const types = apiUrlTypes.data.results.map(el => el.name)             
    types.forEach(t => {                                 
        Type.findOrCreate({        
            where: {
                name: t,
            }
        })
    });

    const allTypes = await Type.findAll();  
    res.status(200).send(allTypes); 
} catch (error) {
    res.status(400).send('error en /types', error)
}
}

module.exports = {
    getTypes
}