import React from "react"

function  Filter(props) {
    const listedListList = props.list
    const items = listedListList.map((item,key) =>{
        return  <option key={key} value={item}> {item} </option>
    })
    return (
        <div>
        <label className="dropDown">{props.type}</label>
            <select onChange={props.onChange} name={props.name} id={props.type} multiple>
            <option value="0"> ....  </option>
                {items }
            </select>
            </div>
    )
}
export default Filter