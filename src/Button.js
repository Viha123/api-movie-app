import React from "react"

export default function Button(props){
    return(
        <div >
            <button className = "button" onClick = {()=>props.handleChange(props.id)}>{props.name}</button>
        </div>
    )
}