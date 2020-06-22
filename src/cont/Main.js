import React, {useState,useEffect}from "react"
import Content from "./Content"
import Filter from './Filter.js'

function Main (){

    const [data,setData] = useState([]) 
    const [value,setValue] = useState('')
    const [filterData,setFilterData] = useState('')
    const [name,setName] = useState('search')
    const [type,setType] = useState('')
    const [isLoading, setIsLoading] = useState(false) 

    useEffect(()=>{
        setIsLoading(true)
        fetch("https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json")  
            .then(response => response.json())      
            .then(res => {	                	
                setData(res.pokemon)
                setIsLoading(false)		
            })
    },[])     //run once on render

    const handleChange =(e)=> {
        setName(e.target.name)
        setValue(e.target.value) 
    }
    const handleFilter =(e)=> {
        setFilterData(Array.from(e.target.selectedOptions, option => option.value)) 
        setName(e.target.name)
        setType(e.target.type)
    }     
    const makeFilterList=(type)=> {
        let arr = []
        data.filter(obj => {
            obj[type].map((ty,key) => { // collect the filter criteria
                return arr.push(ty)
            })
            return null
        })
        return Array.from(new Set(arr));//remove the extras!
    }
    const buildResults =()=>{
        return data.map((poke,key) =>  {
            let v=value.toLowerCase(),n=poke.name.toLowerCase()                
            
            if(name ==="search" ){          //basic name search
                if( v !=="" && n.indexOf(v)===-1) {return null}  
                return <Content key={poke.id} data={poke} />
            }
           if(name ==="filter1" || name ==="filter2"){  //start crazy filters
                
                let ii = (name ==="filter1") ? poke.type : poke.weaknesses
                let filterLen = filterData.length
                let isListed = ii.map((item,key)=>{
                    let filters = filterData.some((filter)=>{
                        if(filter === "0"){
                            return true
                        }
                        return item.toLowerCase() === filter.toLowerCase()
                    })
                    return filters
                }) 
                let trueLen = isListed.filter(function(value){
                    return value === true;
                }).length
                
                let isPresent = (trueLen === filterLen) ? true : false
                return isPresent ?  <Content key={poke.id} data={poke} /> : null 
            }

            return null  
        })
    }
        
    const typeList = makeFilterList("type")
    const weakList = makeFilterList("weaknesses")   
    const content = buildResults()
            
    return (
        <div>
            <form>
                <input 
                    name="search" 
                    type="text"placeholder="Search on name..." 
                    onChange={handleChange}>
                </input>
                <Filter 
                    name="filter1" 
                    type="Type :" 
                    list={typeList} 
                    onChange={handleFilter} 
                />
                <Filter 
                    name="filter2" 
                    type="Weaknesses :" 
                    list={weakList} 
                    onChange={handleFilter} 
                />
            </form>
            <div className="container">
                {content}
            </div>

        </div>
    )
}
export default Main