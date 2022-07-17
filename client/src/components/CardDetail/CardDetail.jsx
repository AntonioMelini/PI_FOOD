import React,{useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getRecipeId,cleanDetail, deleteRecipe } from "../../redux/actions/actions";
import Loader from "../Loader/Loader.jsx";
import './CardDetail.css';


export default function CardDetail(){
    const dispatch=useDispatch();
    const { Id }=useParams();

    useEffect(()=>{
        dispatch(getRecipeId(Id));
        return () => {
                  dispatch(cleanDetail());
                };
    },[dispatch,Id])


    const card=useSelector(state=>state.recipeDetail);


    //console.log(card)
    if(card.length || card["Name"]){
    return (        
        
    <div className="detailCard">
            <div className="homes">
                <Link className="homesLink" to="/home">Home</Link>
            </div>
            <div>
                <h3>{card.Name}</h3>
                <img src={card.Image} alt="" />
                <div className="dietTypes">
                    <div>
                        <h4>Dish types:</h4>
                        {
                            card.Dish_types &&  <p key={card.Dish_types}>{card.Dish_types+", "}  </p>
                        }
                    </div>
                    <div className="healscore">
                        {
                            card.Health_score && <p >Health Score: {card.Health_score}</p>
                        }
                    </div>
                    <div className="dietetics">
                        <h4>Diets:</h4>
                        
                            {
                                card.Diet ? card.Diet.map(diet=>{
                                    return <p key={diet+"w"}>{diet}</p>
                                }) :
                                card.diets?.map(diet=>{
                                    return <p key={diet.Name+"w"}>{diet.Name}</p>
                                })
                            }
                    </div>
                </div>

                <h4>Summary:</h4>
                <div className="sumary">
                    {
                        card.Resume_plate && <p >{card.Resume_plate}</p>
                    }
                </div>
                    {
                        card.Instructions && <h4>Instructions:</h4>
                    }

                <ul>
                    {
                        card.Instructions &&  <p >{card.Instructions}</p>
                        
                    }
                </ul>
                
            </div>
                <br/>
            <div>
                {
                    card.ReadyInMinutes && <p>ReadyInMinutes: {card.ReadyInMinutes}</p>
                }
            </div>
        </div>
    )
    }else{
        return( 
            <Loader />
        )
    }
}