export const GET_RECIPES="GET_RECIPES";
export const GET_RECIPES_NAME="GET_RECIPES_NAME";
export const GET_RECIPES_ID="GET_RECIPES_ID";
export const GET_DIETS="GET_DIETS";
export const CREATE_RECIPE="CREATE_RECIPE";
export const CLEAN_DETAIL="CLEAN_DETAIL";
export const FILTERED_DIET="FILTERED_DIET"
export const ORDER_ALPHABETIC="ORDER_ALPHABETIC";
export const ORDER_HEALTH="ORDER_HEALTH";
export const DELETE_RECIPE="DELETE_RECIPE";

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
export  function getRecipeId(Id){
    return function(dispatch){
        axios.get(`http://localhost:3001/recipes/${Id}`)
            .then(res=>{
                dispatch({
                type:GET_RECIPES_ID,
                payload:res.data
            })
            })
            .catch(()=>{
                window.location.href = "/*";
                // return alert(error.response.data);  //redirecciona a la error page
                
            })
    }
}
export function cleanDetail(){
    return function(dispatch){
        dispatch({
            type:CLEAN_DETAIL,
        })   
    }
}
export  function getAllDiets(){
    return function(dispatch){
        axios.get(`http://localhost:3001/diets`)
            .then(res=>{
                dispatch({
                type:GET_DIETS,
                payload:res.data
            })
            })
    }
}


export function createRecipes(payload) {
    return async function (dispatch) {
        try {
            let data = await axios.post(`http://localhost:3001/recipes`,payload);
       return dispatch({
            type: CREATE_RECIPE,
            payload: data.data,
        })
        } catch (error) {
          return alert(error.response.data)  
        }
    }
}
export function filteredByDiet(payload){
    return {
        type:FILTERED_DIET,
        payload
    }
}
export function orderedAlphabetic(payload){
    return {
        type:ORDER_ALPHABETIC,
        payload
    }
}
export function orderedHealth(payload){
    return {
        type:ORDER_HEALTH,
        payload
    }
}
export function getNameRecipe (name){
    return async function(dispatch){
        try {
            let info= await axios.get(`http://localhost:3001/recipes?name=${name}`)
        dispatch({
            type:GET_RECIPES_NAME,
            payload:info.data
        })
        } catch (error) {
           return alert(error.response.data)
        }
        
    }
}
