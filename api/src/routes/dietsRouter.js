const { Router } = require('express');
const{getAllDiets}= require('../controllers/index')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const dietsRouter = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
dietsRouter.get('/',getAllDiets)



module.exports = dietsRouter;