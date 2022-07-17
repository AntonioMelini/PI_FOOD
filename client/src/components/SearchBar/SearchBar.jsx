import React from "react"
//import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux"
import { getNameRecipe } from "../../redux/actions/actions";
import './SearchBar.css'

export default function SearchBar({pagination}){
    const dispatch=useDispatch();
    const [name,setName]=useState("");
    let select1=document.getElementById("DIET")
    let select2=document.getElementById("ABC")
    let select3=document.getElementById("HEALTH")

    


    //  useEffect(()=>{
        
    //  })

    function handleChange(e){
        e.preventDefault();
        setName(e.target.value);
    }

    let input=document.querySelector("input");

    async function handleClick(e){
        e.preventDefault();
        await dispatch(getNameRecipe(name));
        setName("");
        pagination(1);
        input.value=("");
        select1.value="All diets"
        select2.value="Alphabetic"
        select3.value="Health Points"
    }

    return(
        <div>
                <input type="text"
                    placeholder="Search Recipes.."
                    onChange={(e)=>handleChange(e)}
                />
                
                <button type="submit" onClick={(e)=>handleClick(e)}>Search</button>
        </div>
    )
}