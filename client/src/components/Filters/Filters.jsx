import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filteredByDiet, getAllDiets, getAllRecipes, orderedAlphabetic,orderedHealth } from "../../redux/actions/actions";
import './Filters.css'


export default function Filters({setCurrentPage,setOrder}){     
    const dispatch=useDispatch();
    const allDiets=useSelector(state=>state.diets)

    useEffect(()=>{
       !allDiets.length && dispatch(getAllDiets())
    },[dispatch])

    //setDate(${e.target.value})
    

    let select1=document.getElementById("DIET")
    let select2=document.getElementById("ABC")
    let select3=document.getElementById("HEALTH")
    let input=document.querySelector("input");

   
    function handleSelect(e){
        e.preventDefault();
        dispatch(filteredByDiet(e.target.value))
        setCurrentPage(1)
        setOrder(`${e.target.value}`)
        select2.value="Alphabetic"
        select3.value="Health Points"
    } 
    function handleAbcOrder(e){
        e.preventDefault();
        dispatch(orderedAlphabetic(e.target.value))
        setCurrentPage(1)
        setOrder(`${e.target.value}`)
    }
    function handleHealthOrder(e){
        e.preventDefault();
        dispatch(orderedHealth(e.target.value))
        setCurrentPage(1)
        setOrder(`${e.target.value}`)
    }
    function handleButton(){
        dispatch(getAllRecipes())
        select1.value="All diets"
        select2.value="Alphabetic"
        select3.value="Health Points"
        input.value=("");
        setCurrentPage(1)
    }
      return    ( 
            <div className="filter">  
                <div className="btn">
                    <button onClick={()=>handleButton()}>RELOAD RECIPES</button>
                </div>
                <div className="dietas">
                    <h4>Filter by:</h4>
                    <div className="select">
                        <select id="DIET" onChange={(e)=>handleSelect(e)}>
                            <option value="All diets">All diets</option>
                                {
                                    //console.log(alldiets)
                                    allDiets?.map(diet=>{
                                        return <option key={diet.ID}  value={diet.Name}>{diet.Name}</option>
                                    })
                                }
                        </select>
                    </div>
                </div>
                <br/>
                <div className="order">
                    <h4>Order by:</h4>
                    <div className="selects">
                        <div className="abc">
                            <select id="ABC" onChange={(e)=>handleAbcOrder(e)}>
                                    <option value="Alphabetic">Alphabetic</option>
                                        <option value="Asc">Asc</option>
                                        <option value="Desc">Desc</option>
                            </select>
                        </div>
                        <br/>
                        <div className="points">
                            <select id="HEALTH" onChange={(e)=>handleHealthOrder(e)}>
                                    <option value="Health Points">Health Points</option>
                                        <option value="Asc">Asc</option>
                                        <option value="Desc">Desc</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div> 
            )
    }