import React from "react";
import {useParams, useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import { getDetail, cleanDetail } from '../action/index'
import { useEffect } from "react";
import {Link} from "react-router-dom"
import '../styles/Detail.css'

export default function PokemonDetail(){
    const dispatch = useDispatch();
    const param = useParams();
    const history = useHistory();
    const myPokemon = useSelector ((state) => state.detail); 
    
   

    useEffect(() => {
        dispatch(getDetail(param.id));                     

    }, [dispatch])

    function handleBack(e){
        e.preventDefault();
        dispatch(cleanDetail());                       
        history.push('/home');
    }

    return(
        <div className="Detail">

        
            {
                myPokemon.length > 0 ?              
                <div className="cardDetail">
                    <img src={myPokemon[0].img ? myPokemon[0].img :myPokemon[0].image} alt="img not found" className="imgDetail"/>
                    <div className="contentDetail">
            <div className="titleDetail">
            <h1 className="name-detail">{myPokemon[0].name.toUpperCase()}</h1>
            </div>      
                    <div  className="textDetail">
                    <h2> TYPE: {myPokemon[0].createdInDb? myPokemon[0].types.map(p => p.name + " ") : myPokemon[0].type + " "}</h2>
                    <h2> HP: {myPokemon[0].health}</h2>
                    <h2> ATTACK: {myPokemon[0].attack}</h2>
                    <h2> DEFENSE: {myPokemon[0].defense}</h2>
                    <h2> SPEED: {myPokemon[0].speed}</h2>
                    <h2> HEIGHT: {myPokemon[0].height}</h2>
                    <h2> WEIGHT: {myPokemon[0].weight}</h2>
                    <h2> ID: {myPokemon[0].id}</h2>                    
                    </div>
                </div>
                </div> : <img src="https://vincentrenault.fr/wp-content/uploads/2019/11/pokeball.gif" className="pokeball-gif"/>      //si está vacio, renderizo esto
            }
            
                <Link className="btnDetail" onClick={ e => handleBack(e)}>BACK</Link>  
        
        </div>
    )

}