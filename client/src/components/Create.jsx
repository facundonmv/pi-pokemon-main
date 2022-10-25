import React from "react";
import { useState, useEffect }  from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTypes, getPost, cleanDetail } from '../action/index'
import '../styles/Create.css'

function validate(input) {
    let errors = {};                            
    if (!input.name) {                          
        errors.name = "Name is required";        
    } else if (!input.health) {
        errors.health = "Health is required";
    } else if (input.health<= 0) {
        errors.health = "Health should be greater than zero";
    } else if (!input.attack) {
        errors.attack = "Attack is required";
    } else if (input.attack <= 0) {
        errors.attack = "Attack should be greater than zero";
    } else if (!input.defense) {
        errors.defense = "Defense is required";
    } else if (input.defense <= 0) {
        errors.defense = "Defense should be greater than zero";
    } else if (!input.height) {
        errors.height = "Height is required";
    } else if (input.height <= 0) {
        errors.height = "Height should be greater than zero";
      } else if (!input.weight) {
        errors.weight = "Weight is required";
      } else if (input.weight <= 0) {
        errors.weight = "Weight should be greater than zero";
      } else if (!input.speed) {
        errors.speed = "Speed is required";
      } else if (input.speed <= 0) {
        errors.speed = "Speed should be greater than zero";
      }else if (!input.image) {
        errors.image = "Please insert an image URL";
    } else if (
        !/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/.test(input.image)
      ) {
        errors.image = "Please insert a valid image URL";
    }
    return errors;
};

export default function Create () {
    const dispatch = useDispatch()
    const history = useHistory()                          
    const types = useSelector((state) => state.types)
    const [temps, setTemps] = useState([])              
    const [errors, setErrors] = useState({});            

    const [input, setInput] = useState({               
        name:"",
        img:"",
        health: "",
        attack: "",
        defense: "",
        speed: "",
        height: "",
        weight: "",
        type: [],           
    })

    useEffect (() => {
        dispatch(getTypes());
    }, []);

    function handleChange(e){               
        e.preventDefault()                  
        setInput({                         
            ...input,                      
            [e.target.name] : e.target.value   
        })                                   
     
       setErrors(validate({                
           ...input,                       
           [e.target.name] : e.target.value
       }));
       console.log(input)
    };

    function handleSelect(e) {
           
            if(!temps.includes(e.target.value)){
                if(temps.length > 0){
                    setTemps([...temps, e.target.value])    
                } else {                                    
                    setTemps([e.target.value])               
                }
            } console.log(e.target.value)
    
    }
    function handleDelete(e){          
        e.preventDefault()                                    
        setTemps(temps.filter(temp => temp !== e.target.value))  
        console.log(temps)                                   
        console.log(e.target.value)                           
    } 

    function handleSubmit(e) {                   
        if (errors.name !== undefined || 
            errors.health !== undefined ||
            errors.attack !== undefined ||
            errors.defense !== undefined ||
            errors.speed !== undefined ||
            errors.height !== undefined ||
            errors.weight !== undefined
            )  {
            document.getElementById("DoNotSubmit"); 
            return alert("Please complete the fields with valid data");
          }
        const addDog= {
            name: input.name,
            height: input.height,
            weight: input.weight,
            attack: input.attack,
            defense: input.defense,
            speed: input.speed,
            health: input.health,
            img: input.img,
            types: temps
        };
        e.preventDefault()                   
        dispatch(getPost(addDog))               
        alert("Your dog was successfully created!")
        setInput({                                   
            name:"",
            img:"",
            health: "",
            attack: "",
            defense: "",
            speed: "",
            height: "",
            weight: "",
            type: [], 
    })
        setTemps([])                            
        history.push("/home")                   
    }
    function handleBack(e){
        e.preventDefault();
        dispatch(cleanDetail());                      
        history.push('/home');
    }
    return(
        <div className='bkg'> 
        <div className='container'>
            <h1 className='title'>Create your Pokemon</h1>
            <form  className='form'
          id="DoNotSubmit"
          onSubmit={(e) => handleSubmit(e)}>
            <div><label>Name: </label>
                            <input 
                                key = "name"
                                className='input'
                                placeholder="Enter a Name"
                                type="text"
                                name="name"
                                value={input.name}
                                onChange={(e) => handleChange(e)}
                                />
                                {errors.name && (    
                                    <p className='error'>{errors.name}</p>
                                )}                                       
                        </div>
                        <div className='minMax' >
                        <label>Health: </label>
                                <input className='input' onChange={(e) => handleChange(e)} name="health" type="health" value={input.health} placeholder="Health"
                                />
                                {errors.health && (
                                    <p className='error'>{errors.health}</p>
                                )} 
                        </div>
                        <div className='minMax' >
                        <label>Attack: </label>
                                <input className='input' onChange={(e) => handleChange(e)} name="attack" type="attack" value={input.attack} placeholder="Attack"
                                />
                                {errors.attack && (
                                    <p className='error'>{errors.attack}</p>
                                )} 
                        </div>
                        <div className='minMax' >
                        <label>Defense: </label>
                                <input className='input' onChange={(e) => handleChange(e)} name="defense" type="defense" value={input.defense} placeholder="Defense"
                                />
                                {errors.defense && (
                                    <p className='error'>{errors.defense}</p>
                                )} 
                        </div>
                        <div className='minMax' >
                        <label>Height: </label>
                                <input className='input' onChange={(e) => handleChange(e)} name="height" type="height" value={input.height} placeholder="Height"
                                />
                                {errors.height && (
                                    <p className='error'>{errors.height}</p>
                                )} 
                        </div>
                        <div className='minMax'>
                        <label>Weight: </label>
                                <input className='input' onChange={(e) => handleChange(e)} name="weight" type="weight" value={input.weight} placeholder="Weight"
                                />
                                {errors.weight && (
                                    <p className='error'>{errors.weight}</p>
                                )} 

                        </div>
                        <div > <label>Speed: </label>
                            <input 
                                className='input'
                                placeholder="Speed"
                                type="text"
                                name="speed"
                                value={input.speed}
                                onChange={(e) => handleChange(e)}
                            />
                                {errors.speed && (
                                    <p className='error'>{errors.speed}</p>
                                )} 
                        </div>
                        <div><label>Image: </label>
                            <input 
                                key = "img"
                                className='input'
                                placeholder="Insert URL image"
                                type="text"
                                name="img"
                                value={input.img}
                                onChange={(e) => handleChange(e)}
                            />
                            {errors.img && <p className='error'>{errors.img}</p>}
                        </div>
                        <div className='temps'> <label>Select Types: </label>
                        <select className='templist' name="types" onChange={(e) => handleSelect(e)}  type="text" >
                                    <option value={null}></option>
                                    {types.map((temp, id)=>{    
                                    
                                    return (
                                        <option key={id} value={temp.name}>{temp.name}</option> 
                                        )
                                    })}
                                </select>
                                { temps.map((temp, id) =>{ 
                                    return ( 
                                        <React.Fragment key={id}>   
                                            
                                            <div className='tempSelect'>{temp}
                                            <button className='btnTemp' value={temp} onClick={(e) => handleDelete(e)}>x</button>
                                            </div>
                            
                                        </React.Fragment>
                                        )
                                    })    
                                } 
                                 </div>
                                 <div className='formFooter'>
                                 <button 
                            className='submitbutton' 
                            type= "submit" 
                           name= "submit" 
                             >Create Pokemon
                            </button>
                            </div>  
            </form>

            </div> 
            <Link className="btnBack" onClick={ e => handleBack(e)}>BACK</Link> 

    </div>
 )
}