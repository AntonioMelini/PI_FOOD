const { Router } = require('express');
const{recipesName,getRecipes,recipesID,createRecipes}= require('../controllers/index')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const recipesRouter = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
recipesRouter.get('/recipes',recipesName)
recipesRouter.get('/recipes/:idReceta',recipesID)
recipesRouter.post('/recipes',createRecipes)
recipesRouter.get('/',getRecipes)
module.exports = recipesRouter;