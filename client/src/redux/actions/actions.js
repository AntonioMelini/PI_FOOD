export const GET_RECIPES="GET_RECIPES";
export const GET_RECIPES_NAME="GET_RECIPES_NAME";
export const GET_RECIPES_ID="GET_RECIPES_ID";
export const GET_DIETS="GET_DIETS";
export const CREATE_RECIPE="CREATE_RECIPE";
const axios =require ('axios')



export  function getAllRecipes(){
    return function(dispatch){
        axios.get('http://localhost:3001/')
            .then(res=>{
                dispatch({
                type:GET_RECIPES,
                payload:res.data
            })
            })
    }
}


