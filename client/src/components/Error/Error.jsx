import React from "react";
import './Error.css'

export default function Error(){
    return(
        <div className="Error">
            <h2>Oops!  Page not found.</h2>
            <h1>404</h1>
            <p>We can't find the page you're looking for.</p>
            <div className="ErrorA">
                <a href="/home" >Go back home</a>
            </div>
        </div>)
}
