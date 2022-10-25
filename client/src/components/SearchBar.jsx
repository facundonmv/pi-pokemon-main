import React from 'react'
import { useState } from "react";
import { useDispatch} from "react-redux"
import {getSearch} from '../action/index'
import '../styles/SearchBar.css'


function SearchBar() {
    const dispatch = useDispatch();
    const [name, setName] = useState('')
    const [error, setError] = useState("");

    function handleInputChange(e) {
        e.preventDefault()
        setName(e.target.value.toLowerCase())
        // console.log(name);
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (name) {
            dispatch(getSearch(name));
            console.log(name);
            setName('')
        }
       
    }
    

    return (
        <div className='box'>
        
        <input type = "text" placeholder = "Search..." value={name} onChange = {handleInputChange} className="inputSearch"/>
        <button
                className='buttonX'
                type='submit'
                value={name}
                onClick={(e) => { handleSubmit(e) }}
            >Buscar
            </button>
        </div>
)
    }

    export default SearchBar;