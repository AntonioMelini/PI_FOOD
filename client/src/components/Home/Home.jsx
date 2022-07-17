import React,{useEffect,useState} from "react";
import { useSelector,useDispatch } from "react-redux";
import Card from "../Card/Card";
import {  getAllRecipes } from "../../redux/actions/actions";
import Pagination  from '../Pagination/Pagination'
import './Home.css'
import { Link } from "react-router-dom";
import Filters from "../Filters/Filters";
import SearchBar from "../SearchBar/SearchBar";
import Loader from "../Loader/Loader";



export default function Home(){
    const dispatch=useDispatch();
    const {recipes}=useSelector(state=>state)

    const [order,setOrder]=useState("");
    const [currentPage, setCurrentPage] = useState(1)        
    const [recipesPerPage] = useState(9)             
    const indexLastRecipe = currentPage * recipesPerPage                     
    const indexFirstRecipe = indexLastRecipe - recipesPerPage                    
    const currentRecipes = recipes.slice(indexFirstRecipe, indexLastRecipe)

    
    const pagination = (pageNumber)=>{
        //  currentPage === pageNumber ? :
        setCurrentPage(pageNumber);
    }

    useEffect(()=>{
    !recipes.length  && dispatch(getAllRecipes()) 
    },[dispatch,recipes])

    

    

  // console.log(currentRecipes)
    if(currentRecipes.length){
    return(
        <div >
            <div className="nav">
                <div>
                    <h3>TONY'S RECIPES</h3>
                </div>
                <div className="createAndSearch">
                     <Link className="createAndSearchL" to='/create'>Create Recipe</Link> 
                    <SearchBar pagination={pagination}/>
                </div>
            </div>
            
                <Filters setCurrentPage={setCurrentPage} setOrder={setOrder} />
         
            <div className="cards">

                {  currentRecipes?.map(recipe=>{   
                        return (
                          
                            <Link className="card" key={recipe.Id ? recipe.Id+"5896" : recipe.ID+"5896" } to={`/detail/${recipe.Id ? recipe.Id : recipe.ID}`}>
                            
                                 <Card  key={recipe.Id ? recipe.Id+"as" : recipe.ID } 
                                        Id={recipe.Id ? recipe.Id : recipe.ID} 
                                        Image={recipe.Image} 
                                        Name={recipe.Name} 
                                        diets={recipe.Diet ? recipe.Diet : recipe.diets.map(diet=>diet.Name)}
                                        Health_score={recipe.Health_score}
                                    
                                    />
                            </Link>
                        )
                        
                    }) 
                }
            </div>
            <div className="pagination">
                <Pagination recipesPerPage={recipesPerPage}
                            allRecipes={recipes.length}
                            pagination={pagination}
                />
            </div >
        </div>
    )
    }else{
        return (
            <div>
                <div className="nav">
                    <div>
                        <h3>TONY'S RECIPES</h3>
                    </div>
                <div className="createAndSearch">
                    <Link className="createAndSearchL" to='/create'>Create Recipe</Link> 
                    <SearchBar pagination={pagination}/>
                </div>
                </div>
                <Loader />
            </div>
                    )
    }
}