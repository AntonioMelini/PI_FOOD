import {CLEAN_DETAIL, CREATE_RECIPE, FILTERED_DIET, GET_DIETS, GET_RECIPES, GET_RECIPES_ID, GET_RECIPES_NAME, ORDER_ALPHABETIC, ORDER_HEALTH}from '../actions/actions'
// DELETE_RECIPE

const initialState={
    allRecipes:[],
    recipes:[],
    diets:[],
    recipeDetail:[],
  
}


export default function rootReducer (state=initialState,action){
    switch(action.type){
        case GET_RECIPES:
            
            return{
                ...state,
                recipes:action.payload,
                allRecipes:action.payload
        }
        case FILTERED_DIET:
           console.log(state.allRecipes)
            if(action.payload==="All diets") {
                return{...state,
                        recipes:state.allRecipes
                    }
            }else{
                
                return{
                    ...state,
                    recipes:state.allRecipes.filter((recipe)=>
                      recipe.diets ? recipe.diets.some(diet=>diet.Name===action.payload)
                        :  recipe.Diet.includes(action.payload)
                    )
                }
            }
        case ORDER_ALPHABETIC:
            //console.log(state.recipes)
            if(action.payload=== "Alphabetic") return{
                ...state
            }
            let sorterArray = (action.payload === 'Asc') ?
            state.recipes.sort(function(a,b) {
                
                if(a.Name.toLowerCase() > b.Name.toLowerCase())  return 1
                if( b.Name.toLowerCase() > a.Name.toLowerCase()) return -1
                return 0
            }) : 
            state.recipes.sort(function(a,b) {
                if(a.Name.toLowerCase() > b.Name.toLowerCase())  return -1
                if( b.Name.toLowerCase() > a.Name.toLowerCase()) return 1
                return 0
            })
            return{
                ...state,
                recipes:sorterArray
            }
        case ORDER_HEALTH:
            if(action.payload==="Health Points") return{
                ...state,
            }
            let orderArray = (action.payload === "Asc") ? 
            (state.recipes.sort(function (a,b){
                if(a.Health_score > b.Health_score) return 1;
                if(b.Health_score > a.Health_score) return -1;
                return 0;
            })) : (state.recipes.sort(function (a,b){
                if(a.Health_score > b.Health_score) return -1;
                if(b.Health_score > a.Health_score) return 1;
                return 0;
            }))
            return{
                ...state,
                recipes:orderArray
            }
            
        case GET_RECIPES_ID:
            return{
                ...state,
                recipeDetail:action.payload
            }
        case CLEAN_DETAIL:
            return{
                ...state,
                recipeDetail:[]
            }
        case GET_DIETS:
            return{
                ...state,
                diets:action.payload
            }
        case CREATE_RECIPE:
            return{
                ...state,
                // recipes:[...state.allRecipes,action.payload],
            }
        case GET_RECIPES_NAME:
            return{
                ...state,
                recipes:action.payload
            }
        default:{
            return state
        }
    }
}