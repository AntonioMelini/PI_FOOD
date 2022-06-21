const axios=require('axios')
const {Recipe,Diet}=require('../db')
const {YOUR_API_KEY}=process.env
const { Op } = require("sequelize");

async function getRecipes(req,res,next){
    try {
        let apiInfo = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?number=100&addRecipeInformation=true&apiKey=${YOUR_API_KEY}`)
        
        let recipeApi= apiInfo.data.results.map((recipe)=>({
                Id:recipe.id,
                Name:recipe.title,
                Resume_plate:recipe.summary,
                Health_score:recipe.healthScore,
                Instructions:recipe.analyzedInstructions[0] && recipe.analyzedInstructions[0].steps.map(steps=>steps.step),
                Image:recipe.image,
                Diet:recipe.diets?.map(diet=>diet)
            }))
        
        for (let i = 0; i < recipeApi.length; i++) {
            apiInfo.data.results[i].vegetarian &&
            recipeApi[i].Diet.push('vegetarian')
            
        }

        let recipeDB= await Recipe.findAll({
            include: {
                model: Diet,
                attributes: ['Name'],
                through: {
                    attributes: [],
                }
            }
        })
    
        res.status(200).send(recipeApi.concat(recipeDB))
    } catch (error) {
        next(error)
    }

}



async function recipesName(req,res,next){
    try {
        const {name}=req.query;
        //console.log(name)
        //
        if(name){
           
            let apiInfo= await axios.get(`https://api.spoonacular.com/recipes/complexSearch?number=100&addRecipeInformation=true&apiKey=${YOUR_API_KEY}`)

            let arrayRecipeApi= apiInfo.data.results.filter((recipe)=>recipe.title.includes(name))

            let finalRecipe= arrayRecipeApi.map(recipe=>({
                Id:recipe.id,
                Name:recipe.title,
                Resume_plate:recipe.summary,
                Health_score:recipe.healthScore,
                Instructions:recipe.analyzedInstructions[0] && recipe.analyzedInstructions[0].steps.map(steps=>steps.step),
                Image:recipe.image,
                Diet:recipe.diets?.map(diet=>diet)

            }))

            let recipeDB = await Recipe.findAll({
                where:{
                    Name: {
                    [Op.substring]: name
                    }
                },
                include:{
                    model:Diet,
                    attributes:["Name"],
                    through:{
                        attributes:[],
                    }
                }
            })
            console.log(recipeDB)
            let allRecipe =  finalRecipe.concat(recipeDB)

            if(allRecipe.length===0){
                return res.status(404).send("Recipe not found")
            }

           // console.log(allRecipe)
            res.status(200).json(allRecipe)

        }
    } catch (error) {
        next(error)
    }
}






async function recipesID(req,res,next){
    try {
        const {idReceta}=req.params;
        //console.log(name)
        if(idReceta){
            if( idReceta.length!=36 ){
            
                let apiInfo= await axios.get(`https://api.spoonacular.com/recipes/${idReceta}/information?apiKey=${YOUR_API_KEY}`)

                let RecipeApi={
                    Id:apiInfo.data.id,
                    Name:apiInfo.data.title,
                    Resume_plate:apiInfo.data.summary,
                    Health_score:apiInfo.data.healthScore,
                    Instructions:apiInfo.data.analyzedInstructions[0] && apiInfo.data.analyzedInstructions[0].steps.map(steps=>steps.step),
                    Image:apiInfo.data.image,
                    Diet:apiInfo.data.diets?.map(diet=>diet)
                } 

                
                

                //corregir para las recetas creadas

            // console.log(allRecipe)
                res.status(200).json(RecipeApi)
            }else {
                let recipeDB= await Recipe.findByPk(idReceta,{
                    include: {
                        model: Diet,
                        attributes: ['Name'],
                        through: {
                            attributes: [],
                        }
                    }})
                res.status(200).json(recipeDB)
            }
        }else{
            next("Id invalid")
        }
    } catch (error) {
        next(error)
    }
}






async function getDiets(){
    try {
        let apiInfo= await axios.get(`https://api.spoonacular.com/recipes/complexSearch?number=100&addRecipeInformation=true&apiKey=${YOUR_API_KEY}`)


        let dietsApi= apiInfo.data.results.map((recipe)=>(
            recipe.diets?.map(diet=>diet)
        ))
        
        let arrayDiets=[];
        for (let i = 0; i < dietsApi.length; i++) {
            arrayDiets=arrayDiets.concat(dietsApi[i])
        }
        //console.log(arrayDiets)

        let allDiets=[...new Set(arrayDiets)]
        allDiets.push("vegetarian");
        
       // console.log(allDiets)

      
       await Promise.all( allDiets.map(async (diet) => {
        
        await Diet.findOrCreate({
                where: {
                    Name: diet
                }
            });
        }))
            


       // console.log(allRecipe)
      
        
        return await Diet.findAll()
        
    } catch (error) {
        console.log(error)
    }
}

async function createRecipes(req,res,next){
    try {
        const{Name,
              Resume_plate,
              Health_score,
              Instructions,
              Image,
              diet}=req.body;

     
        let existeRecipe = await Recipe.findAll({
            where:{
                Name:Name
            }
        })
        //console.log(existeRecipe)

        if(existeRecipe.length===0){
           existeRecipe= await Recipe.create({
            Name,
            Resume_plate,
            Health_score,
            Instructions,
            Image
        })
        }else{
            return res.send("Its already created") 
        }

        let diets= await Diet.findAll({
            where:{
                Name:diet
            }
        })
        existeRecipe.addDiet(diets)
        res.send(existeRecipe)

        
    } catch (error) {
        next(error)
    }
}

module.exports={
    recipesName,
    getRecipes,
    recipesID,
    getDiets,
    createRecipes
}