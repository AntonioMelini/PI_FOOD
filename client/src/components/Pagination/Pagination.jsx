import React from "react";
import './Pagination.css'

export default function Pagination ({recipesPerPage,allRecipes,pagination}){
    const pageNumbers=[];
   

    for (let i = 1; i <= Math.ceil(allRecipes/recipesPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav className="paginado">
            <ul className="ul">
                { pageNumbers && pageNumbers.map(page=>(
                   <li  key={page}>
                        <a  className="container" onClick={()=> pagination(page)}>{page}</a>
                    </li>
                ))}
            </ul>
        </nav>
        
    )
}


