import React, { Fragment } from "react";
import { useState, useEffect } from "react";
import {useDispatch, useSelector} from 'react-redux'
import { getPokemons, getTypes, orderAlpha, filterTypes, filterAttack, filterCreated, getPokeStore } from '../action/index'
import {Link} from "react-router-dom"
import Card from './Card'
import Paginado from './Paginado'
import SearchBar from "./SearchBar";
import '../styles/Home.css'

export default function Home(){
    const allTypes = useSelector((state) => state.types)
const dispatch = useDispatch()
const [search, setSearch] = useState("");
const allPokemons = useSelector((state) => state.pokemons)
const pokeBackUp = useSelector((state) => state.allPokemons);
const filteredPokemons = useSelector((state) => state.filteredPokemons);
const [currentPage, setCurrentPage] = useState(1);
const [postsPerPage, setPostsPerPage] = useState(12);
const [ setOrder ] = useState('')
const [pageLimit, setPageLimit] = useState(10);
const [maxLimit, setMaxLimit] = useState(10);
const [minLimit, setMinLimit] = useState(0);

const lastPostIndex = currentPage * postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage;
    if (filteredPokemons.length > 0) allPokemons = filteredPokemons;
    let mainComponent = null
    const currentPokemons = allPokemons.slice(firstPostIndex, lastPostIndex);
    if (currentPokemons.length && currentPokemons[0] !== 'inexistent DB' && currentPokemons[0] !== 'inexistent type') { 
      mainComponent = 
          currentPokemons.map((el) => {
              return (         
                <div>
                <Link to={"/pokemons/" + el.id}>
          <Card 
          name={el.name} 
          image={el.img} 
          height={el.height}
          types={el.createdInDb ? el.types.map(el => el.name + " ") : el.type.map(p => p + " " )}
          key={el.id}
          weight={el.weight}
          
          />
          </Link>
          </div>
              );
          })
  } 
  else if (currentPokemons.length && currentPokemons[0] === 'inexistent DB')
      mainComponent = 
          <>
              <h1>There are no Pokemons in the Data Base </h1> 
             
          </>
  else if(currentPokemons.length && currentPokemons[0] === 'inexistent type') {
      mainComponent = 
          <>
              <h1>No Pokemon exist with that type</h1>
              
          </>
  }
  else{
      mainComponent = 
          <>
              <h1>No pokemon has '{search}' in their name</h1>
             
          </>
  }






useEffect(() => {
  pokeBackUp.length > 0 ? dispatch(getPokeStore()) : dispatch(getPokemons());
  dispatch(getTypes());
}, [dispatch]);


const [orden, setOrden] = useState("");


function handleFilterCreated(e) {
  dispatch(filterCreated(e.target.value));
}                                                 

const handleSelect = (e) => {
    e.preventDefault();
    dispatch(orderAlpha(e.target.value))
    setOrden(`Ordenado ${e.target.value}`);
  };

useEffect(() => {
    dispatch(getPokemons())
},[dispatch])
useEffect(()=>{
    dispatch(getTypes())
},[dispatch]);
const handleClick = (e) => {
    e.preventDefault()
    dispatch(getPokemons())
}
const handleWeight = (e) => {
    e.preventDefault();
    dispatch( filterAttack(e.target.value) );
    setOrden(`Ordenado ${e.target.value}`)
  }
  function handleFilterByTypes(e){
    e.preventDefault();
    dispatch(filterTypes(e.target.value))
    setCurrentPage(1);
   
  }

    return(
        <div className="containerHome">

         <div className="homeRefresh">
         <Link onClick={(e) => {handleClick(e)}} className="linkRefresh">Refresh</Link>
            </div>
            
            <div >
                <select onChange={(e) => {handleSelect(e)} } value='default' className="homeFiltros">
                    <option value='default' disabled hidden>Order alphabetical</option>
                    <option value="az" className="homeFiltros">A-Z</option>
                    <option value="za" className="homeFiltros">Z-A</option>
                </select>
                <select className="homeFiltros2"  value='default'  onChange={ handleWeight }>
                <option value='default' disabled hidden>Order by Weight</option>
              <option value="Weight 1">Small</option>
              <option value="Weight 2">Big</option>
        </select>
        <select className="homeFiltros2" onChange={(e) => handleFilterCreated(e)}>
            <option value="All">All</option>
            <option value="created">Created</option>
            <option value="api">Existing</option>
          </select>
        <select className="homeFiltros4" value='default' onChange={e => handleFilterByTypes(e)}>            
                    <option value='default' disabled hidden>Filter by types</option>
                    {allTypes.map((t) => (                               
                            <option value={t.name} key={t.name}>{t.name}</option>  
                        ))}
                </select>
          </div>
          <div className="homePaginado">               
<Paginado
                    totalPosts={allPokemons.length}
                    postsPerPage={postsPerPage}
                    setCurrentPage={setCurrentPage}
                    currentPage={currentPage}
                    maxLimit={maxLimit}
                    setMaxLimit={setMaxLimit}
                    minLimit={minLimit}
                    setMinLimit={setMinLimit}
                    pageLimit={pageLimit}
                    setPageLimit={setPageLimit}
                />
</div>
 <div className="homeCard">
{
allPokemons?.slice(firstPostIndex, lastPostIndex).map(el => {
  return (
    <div>
      <Link to={"/pokemons/" + el.id}>
<Card 
name={el.name} 
image={el.img} 
height={el.height}
types={el.createdInDb ? el.types.map(el => el.name + " ") : el.type.map(p => p + " " )}
key={el.id}
weight={el.weight}

/>
</Link>
</div>
);
})}
</div>

</div>

    )
}