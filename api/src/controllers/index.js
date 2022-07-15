const axios=require('axios')
const {Recipe,Diet}=require('../db')
const {YOUR_API_KEY}=process.env
const { Op } = require("sequelize");

async function getRecipes(req,res,next){
    try {

        let allRecipes= await Recipe.findAll({
            include: {
                model: Diet,
                attributes: ['Name'],
                through: {
                    attributes: [],
                },
                required:true
            }
        })
        
        res.status(200).json(allRecipes)
    } catch (error) {
        next(error)
    }

}



async function getAllApiRecipes(){
    let hay= await Recipe.findAll()
    if(!hay.length){
    try {
        let apiInfo = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?number=100&addRecipeInformation=true&apiKey=${YOUR_API_KEY}`)
        
        let recipeApi= apiInfo.data.results.map((recipe)=>({
         
            Id:recipe.id,
            Name:recipe.title,
            Resume_plate:recipe.summary,
            Health_score:recipe.healthScore,
            Instructions:recipe.analyzedInstructions[0] && recipe.analyzedInstructions[0].steps.map(steps=>steps.step),
            Image:recipe.image,
            Diets:recipe.diets?.map(diet=>diet),
            Dish_types:recipe.dishTypes?.map(type=>type)
        }))
        
        for (let i = 0; i < recipeApi.length; i++) {
            apiInfo.data.results[i].vegetarian &&
            recipeApi[i].Diets.push('vegetarian')
        }

        await Promise.all( recipeApi.map(async (recipe) => {
        //console.log(recipe)

        let recipeCreated= await Recipe.create({
                        Name: recipe.Name,
                        Resume_plate: recipe.Resume_plate,
                        Health_score: recipe.Health_score,
                        Instructions: recipe.Instructions ? recipe.Instructions.join(" ") : "not specificated",
                        Image:  recipe.Image,
                        Dish_types: recipe.Dish_types ? recipe.Dish_types.join(" ") : "not specificated"
                });
                
                let diets= await Diet.findAll({
                    where:{
                        Name:recipe.Diets
                    }
                })
                recipeCreated.addDiet(diets)
            }))
        
                
        return "succesful";
    
    } catch (error) {
        console.log(error)
    }
}else return hay;
}




async function recipesName(req,res,next){
    try {
        const {name}=req.query;
        //console.log(name)
        //
        if(name){
           
            
            let allRecipe = await Recipe.findAll({
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
        else{
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
    createRecipes,
    getAllApiRecipes
}