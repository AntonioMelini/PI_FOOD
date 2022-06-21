import React from "react"


export default function Card({Image,Name,Diet}){
console.log(Diet)
    return(
        <div>
             <h3>{Name}</h3>
            <img src={Image} alt="not found" width='200px' heigth='250px'/>
            <ul>
                {Diet?.map(diet=>{
                    return <li>{diet}</li>
                })}
            </ul>
        </div>
    )
}