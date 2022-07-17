import React, { useEffect,useState} from "react";
import { useSelector,useDispatch} from "react-redux";
import { Link } from "react-router-dom";
import { getAllDiets,createRecipes } from "../../redux/actions/actions"
import './CreationCard.css'
// import {useNavigate} from 'react-router-dom';




function validate(recipe){
   
    const regex = /^[0-9]*$/;
    let url = /^(ftp|http|https):\/\/[^ "]+$/;
    let errors={};

    if( !( /^[a-z]+( [a-z]+)*$/i.test(recipe.Name)))    errors.Name="Only letters";
    
    if(!recipe.Name)   errors.Name="Name is required";
    
    if(!recipe.Resume_plate)    errors.Resume_plate="Resume plate is required";
    
    if(!recipe.Health_score)    errors.Health_score="Health score is required";
    
    if(!regex.test(recipe.Health_score))   errors.Health_score="Only numbers";

    if(recipe.Health_score < 0) errors.Health_score="Health score can not be less than 0"

    if(recipe.Health_score >100) errors.Health_score="Health score can not be bigger than 100"
   
    if(!recipe.Instructions)    errors.Instructions="Instructions is required";
    
    if(!url.test(recipe.Image) && recipe.Image.length!==0)    errors.Image="Only url";

   
    if(!recipe.Dish_types.match(/^[a-z,'"\s]+$/i))   errors.Dish_types="Only letters";
    
    if(!recipe.Dish_types.length || recipe.Dish_types===" ")    errors.Dish_types="Dish type is required";

    if(!recipe.diets.length)                errors.diets="Diet is required"
    

    return errors;

}

function validateDiets(Diet,value){
    if(Diet.includes(value))  return true
    else return false
}

export default function Create (){
    const dispatch=useDispatch();
    // const navigate = useNavigate();


    useEffect(()=>{
        dispatch(getAllDiets())
    },[dispatch])

    const [errors,setErrors]=useState({})
    const [recipe,setRecipe]=useState({
        Name:"",
        Resume_plate:"",
        Health_score:"",
        Instructions:"",
        Image:"",
        Dish_types:"",
        diets:[]

    })

    const allDiets=useSelector(state=>state.diets)


    

    function handleChange(e){
        setRecipe({
            ...recipe,
            [e.target.name]:e.target.value
        })
        setErrors(validate({
            ...recipe,
            [e.target.name]:e.target.value
        }))
    }




    function handleSelect(e){
        if(validateDiets(recipe.diets,e.target.value)) setErrors(({ 
            ...errors,
            diets:"Can not repeat the same Diet"}))
        else if(e.target.value==="Select a diet" ){return }
        
        else if(recipe.diets.length>5) setErrors(({
            ...errors,
            diets:"Can not select more than 5 diets.Please delete 1"
        }))

        else if (!validateDiets(recipe.diets,e.target.value)){
            delete errors.diets
            setErrors(({ 
                ...errors,
            }))
            setRecipe({
            ...recipe,
            diets:[...recipe.diets,e.target.value]
        })
        recipe.diets.length>4 && setErrors(({
            ...errors,
            diets:"Can not select more than 5 diets.Please delete 1"
        }))
        }
        
    }

    function handleClassBtn(e){
        
        setRecipe(({
            ...recipe,
            diets:recipe.diets.filter((diet)=>diet!==e.target.value)
        }))
        delete errors.diets;
        if(recipe.diets.length===1) {
            
            setErrors(({ 
                ...errors,
                diets:"Diet is required"}))
        }
    }

    async function handleSubmit(e){
        e.preventDefault();
        if(recipe.Name && recipe.Resume_plate && recipe.Health_score && recipe.Instructions  && recipe.Dish_types && recipe.diets && !Object.keys(errors).length ){
            if(recipe.Image==="")  recipe.Image = "https://statics-cuidateplus.marca.com/cms/styles/natural/azblob/hamburguesas.jpg.webp?itok=4airsSTm";
            let response=(await dispatch( createRecipes(recipe)))
            if(!response){return }
            else{
            alert("Recipe was created");
            setRecipe({
                Name:"",
                Resume_plate:"",
                Health_score:"",
                Instructions:"",
                Image:"",
                Dish_types:"",
                diets:[]
            });
            select.value="Select a diet";
            setErrors({});
            // navigate('/home');
            }
        }else{
        alert("Complete all the task")
        }
    }
    let select=document.getElementById("diet");
    return (
        <div className="form-cont">
           <div className="homie">
               <h2>TONY'S RECIPES</h2>
                <Link className="boton" to="/home">HOME</Link>               
           </div>
            <form onSubmit={(e)=>handleSubmit(e)}>
                <div className="part1">
                    <div className="nombre">
                        <h1>Add your recipe:</h1>
                        <label>Name:</label>
                        <input type="text" name="Name" value={recipe.Name} onChange={(e)=>handleChange(e)}/>
                        { errors.Name && <p className="danger">{errors.Name}</p>}
                    </div>
                    <br/>
                    <div className="summary">
                        <label>Resume plate:</label>
                        <input type="text" name="Resume_plate" value={recipe.Resume_plate} onChange={(e)=>handleChange(e)}/>
                        { errors.Resume_plate && <p className="danger">{errors.Resume_plate}</p>}
                        
                    </div>
                    <br/>
                    <div className="scores">
                        <label>Health score:</label>
                        <input type="text" name="Health_score" value={recipe.Health_score} onChange={(e)=>handleChange(e)}/>
                        { errors.Health_score && <p className="danger">{errors.Health_score}</p>}
                    </div>
                    <div className="Dietas">
                    <label>Diet:</label>
                    <select id="diet" onChange={(e)=>handleSelect(e)}>
                        <option>Select a diet</option>
                        {
                            allDiets?.map(diet=>{
                                return <option key={diet.ID}  value={diet.Name}>{diet.Name}</option>
                            })
                        }
                        {
                            
                        }
                        </select>
                        { recipe.diets?.map(diet=>{
                            return <button key={diet+"7ed4"} type="button"  className="clasbtn" onClick={(e)=>handleClassBtn(e)} value={diet}>x {diet}</button>
                        }) 
                        } 
                        {   errors.diets && <p className="danger">{errors.diets}</p>}
                    </div>
                   
                </div>
                <br/>
                <div className="part2">
                    <div className="inst">
                        <label>Instructions:</label>
                        <input type="text" name="Instructions" value={recipe.Instructions} onChange={(e)=>handleChange(e)}/>
                        { errors.Instructions && <p className="danger">{errors.Instructions}</p>}
                    </div>
                    <br/>
                    <div className="im">
                        <label>Image:</label>
                        <input type="text" name="Image" value={recipe.Image} onChange={(e)=>handleChange(e)}/>
                        { errors.Image && <p className="danger">{errors.Image}</p>}
                        
                    </div>
                    <br/>
                    <div className="dish">
                        <label>Dish type:</label>
                        <input type="text" name="Dish_types" value={recipe.Dish_types} onChange={(e)=>handleChange(e)}/>
                        { errors.Dish_types && <p className="danger">{errors.Dish_types}</p>}
                    </div>
                    <button className="crear" type="submit" >CREATE</button>
                </div>
            </form>
            
        </div>
    )
}



// Nombre
// Resumen del plato
// (health score)
// Paso a paso
// imagen
// tipo de plato
// Posibilidad de seleccionar/agregar uno o más tipos de dietas