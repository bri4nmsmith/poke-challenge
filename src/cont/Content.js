import React from "react"


function Content (props) {
    const {id,name,type,weaknesses} = props.data
    const types = type.map((t,key) =>{
        return <li key={key}>{t}</li>
    })
    const weak = weaknesses.map((weakness,key) =>{
        return <li key={key}>{weakness}</li>
    })
    return (
        <div className="pokes" id={id}>
            <h5>Name: {name}</h5>
            <label >Type: 
                <ul>
                    {types}
                </ul>
            </label>                
            <label >Weaknesses:
                <ul>
                    {weak}
                </ul>
            </label>
        </div>
    )
}

export default Content