import React from "react";
import './Card.css'
// import { Link } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { getRecipeId } from "../../redux/actions/actions";


export default function Card({Id,Image,Name,diets,Health_score}){



    return(
    
        <div key={Id}  >
                <h3 className="name">{Name}</h3>
                <img className="image" src={Image} alt="not found" />
                <div className="cont">
                    <div className="diets">
                        {diets?.map(diet=>{
                            return <h5 key={diet+"s"}>{diet}</h5>
                            
                        })}
                    </div>
                    <div className="score">
                        <h3>Health score: {Health_score}</h3>
                    </div>
                </div>
        </div>
    
    )
}