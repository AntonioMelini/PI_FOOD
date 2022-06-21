import React,{useEffect,useState} from "react";
import { useSelector,useDispatch } from "react-redux";
import Card from "../Card";
import { getAllRecipes } from "../../redux/actions/actions";



export default function Home(){
    const dispatch=useDispatch();

    useEffect(()=>{
        dispatch(getAllRecipes())
    },[dispatch])

    const recipes=useSelector(state=>state.recipes)

    return(
        <div>
            { recipes && recipes.map(recipe=>{
                
                return <Card key={recipe.Id } Image={recipe.Image} Name={recipe.Name} Diet={recipe.Diet} />
            })}
        </div>
    )
}