import React from "react";
import {Link} from 'react-router-dom';
import '../styles/Card.css'

export default function Card({ name, image, height, weight, types,}){
return(
    <div className="containerCardDog"> 
        <div className="cardDog">
            <div className="faceDog frontDog">
            <img src={image} alt="" />
            <h3>{name}</h3>
            </div>
            <div className="faceDog backDog">
<h3>{name}</h3>
<p>weight: {weight}</p>
<p>height: {height}</p>
<p>{types}</p>
<div className="linkDog">
    <Link>Click me</Link>
</div>
</div>
        </div>
        </div>
)
}