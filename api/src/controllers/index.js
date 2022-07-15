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
                Diet:recipe.diets?.map(diet=>diet),
                Dish_types:recipe.dishTypes?.map(type=>type)
            }))
        
        for (let i = 0; i < recipeApi.length; i++) {
            apiInfo.data.results[i].vegetarian &&
            recipeApi[i].Diet.push('vegetarian')
        } 

         let recipeDB= await Recipe.findAll({
            include:{
                model:Diet,
                attributes:["Name"],
                through:{
                    attributes:[],
                }
            }
         })
        //console.log(recipeDB)
        let allRecipes=recipeApi.concat(recipeDB)
         //console.log(allrecipes[100])
        res.status(200).json(allRecipes)
    
    } catch (error) {
        next(error)
    }
}





async function recipesName(req,res,next){
    try {
        const {name}=req.query;
        //console.log(name)
        //
        if(name===""){return getRecipes(req,res,next)}
        if(name){
            let task=name.toLowerCase()
            let apiInfo= await axios.get(`https://api.spoonacular.com/recipes/complexSearch?number=100&addRecipeInformation=true&apiKey=${YOUR_API_KEY}`)

            let arrayRecipeApi= apiInfo.data.results.filter((recipe)=>recipe.title.toLowerCase().includes(task) && recipe)

            let finalRecipe= arrayRecipeApi?.map(recipe=>({
                Id:recipe.id,
                Name:recipe.title,
                Resume_plate:recipe.summary,
                Health_score:recipe.healthScore,
                Instructions:recipe.analyzedInstructions[0] && recipe.analyzedInstructions[0].steps.map(steps=>steps.step),
                Image:recipe.image,
                Diet:recipe.diets?.map(diet=>diet),
                Dish_types:recipe.dishTypes?.map(type=>type)

            }))
          

            let recipeDB = await Recipe.findAll({
                where:{
                    Name: {
                    [Op.like]: `%${task}%`
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
            //console.log(recipeDB)
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
            if( idReceta.length!==36 ){
                if (typeof String.prototype.replaceAll == "undefined") {  
                    String.prototype.replaceAll = function(match, replace) {  
                      return this.replace(new RegExp(match, 'g'), () => replace);  
                    }  
                  }
                let apiInfo= await axios.get(`https://api.spoonacular.com/recipes/${idReceta}/information?apiKey=${YOUR_API_KEY}`)

                let RecipeApi={
                    Id:apiInfo.data.id,
                    Name:apiInfo.data.title,
                    Resume_plate:apiInfo.data.summary.replaceAll(/<[^>]*>?/gm,""),
                    Health_score:apiInfo.data.healthScore,
                    Instructions:apiInfo.data.analyzedInstructions[0] && apiInfo.data.analyzedInstructions[0].steps.map(steps=>steps.step),
                    Image:apiInfo.data.image,
                    Diet:apiInfo.data.diets?.map(diet=>diet),
                    Dish_types:apiInfo.data.dishTypes?.map(type=>type),
                    ReadyInMinutes:apiInfo.data.readyInMinutes
                }
                
                
                    apiInfo.data.vegetarian && RecipeApi.Diet.push('vegetarian')
                    res.status(200).json(RecipeApi)
                
                
                

                

            // console.log(allRecipe)
                
            }else {
                let recipeDB= await Recipe.findByPk(idReceta,{
                    include: {
                        model: Diet,
                        attributes: ['Name'],
                        through: {
                            attributes: [],
                        }
                    }})
                    //console.log(recipeDB)
                res.status(200).json(recipeDB)
            }
        }else{
            next("Id invalid")
        }
    } catch (error) {
        next(error)
    }
}

async function getAllDiets(req,res,next){
    try {
        let diets=await getDiets()
        diets ? res.status(200).json(diets) : res.status(404).send("Not diets found")
    } catch (error) {
        next(error)
    }
}




async function getDiets(){
    let thersDiets= await Diet.findAll()
    console.log(thersDiets)
    if(!thersDiets.length){
    try {
        let apiInfo= await axios.get(`https://api.spoonacular.com/recipes/complexSearch?number=100&addRecipeInformation=true&apiKey=${YOUR_API_KEY}`)


        let dietsApi= apiInfo.data.results.map((recipe)=>(
            recipe.diets?.map(diet=>diet)
        ))
        
        let arrayDiets=[];
        for (let i = 0; i < dietsApi.length; i++) {
            arrayDiets=arrayDiets.concat(dietsApi[i])
        }
        // console.log(dietsApi)
        // console.log(arrayDiets)

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
        return ((await Diet.findAll()) )
    
    } catch (error) {
        console.log(error)
    }
 }else return thersDiets
}

async function createRecipes(req,res,next){
    try {
        const{Name,
              Resume_plate,
              Health_score,
              Instructions,
              Image,
              Dish_types,
              diets}=req.body;

     
        let existeRecipe = await Recipe.findAll({
            where:{
                Name:Name
            }
        })
        //console.log(existeRecipe)

        if(!existeRecipe.length){
           existeRecipe= await Recipe.create({
            Name,
            Resume_plate,
            Health_score,
            Instructions,
            Dish_types,
            Image
        })
        }else{
            return res.status(400).send("Its already created.Please change the name") 
        }
        //console.log(existeRecipe)
        let diet= await Diet.findAll({
            where:{
                Name:diets
            }
        })
        existeRecipe.addDiet(diet)
        res.status(201).json(existeRecipe)
        //console.log(diets)

        
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
    getAllDiets,

}