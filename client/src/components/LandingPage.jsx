import React from "react";
import {Link} from 'react-router-dom';
import '../styles/LandingPage.css'


export default function LandingPage(){

    return(
      <main className="containerLanding">
      <section class="main-header">
        <div className="containerImg">

      </div>
      <div class="main-text">
        <h1>HELLO, WELCOME YOU TO THE POKEMON APP </h1>
        <p>Here you can find all the information about the different Pokémon.</p>
        <div class="main-btn">
          <Link to={'/home'} class="btn">see all pokemons</Link>
        </div>
      </div>
    
    </section>
    </main>
    )
}