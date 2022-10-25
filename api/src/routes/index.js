const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const { getPokemons, postPokemons, getPokemonsId } = require('./routePokemons')
const { getTypes } = require('./routeTypes')

router.get('/pokemons', getPokemons)
router.get('/types', getTypes)
router.post('/pokemons', postPokemons)
router.get('/pokemons/:id', getPokemonsId)

module.exports = router;
