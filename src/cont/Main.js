import React from "react"
import Content from "./Content"
import Filter from './Filter.js'

class Main extends  React.Component{
    constructor(props) { 
        super(props);
        this.state = { 
            data : [],
            value: '',
            filterdata: '',
            name:'search', //default...
            loading:false
        };
        this.handleChange = this.handleChange.bind(this)
        this.handleFilter = this.handleFilter.bind(this)
      }

    componentDidMount() {
        this.setState({loading: true})
        fetch("https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json")  
            .then(response => response.json())      
            .then(data => {			
                this.setState({
                    loading: false,
                    data: data.pokemon
                })
            })
    }
    handleChange(e) {
        this.setState({value:e.target.value, name:e.target.name})  
    }
    handleFilter(e) {
        this.setState({
            filterdata: Array.from(e.target.selectedOptions, option => option.value), 
            name: e.target.name,
            type: e.target.type
        })  
    }     
    makeFilterList(type) {
        const {data} = this.state 
        let arr = []
        data.filter(obj => {
            obj[type].map((ty,key) => { // collect the filter criteria
                return arr.push(ty)
            })
            return null
        })
        return Array.from(new Set(arr));//remove the extras!
    }
    buildResults(){
        const {value, data, name,filterdata } = this.state //destruct the stuff
        return data.map((poke,key) =>  {
            let v=value.toLowerCase(),n=poke.name.toLowerCase()                
            
            if(name ==="search" ){          //basic name search
                if( v !=="" && n.indexOf(v)===-1) {return null}  
                return <Content key={poke.id} data={poke} />
            }
           if(name ==="filter1" || name ==="filter2"){  //start crazy filters
                
                let ii = (name ==="filter1") ? poke.type : poke.weaknesses
                let filterLen = filterdata.length
                let isListed = ii.map((item,key)=>{
                    let filters = filterdata.some((filter)=>{
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
    render(){ 
        
        const typeList = this.makeFilterList("type")
        const weakList = this.makeFilterList("weaknesses")   
        const content = this.buildResults()
             
        return (
            <div>
                <form>
                    <input 
                        name="search" 
                        type="text"placeholder="Search on name..." 
                        onChange={this.handleChange}>
                    </input>
                    <Filter name="filter1" type="Type :" list={typeList} onChange={this.handleFilter} />
                    <Filter name="filter2" type="Weaknesses :" list={weakList} onChange={this.handleFilter} />
                </form>
                <div className="container">
                    {content}
                </div>

            </div>
        )
    }
}
export default Main