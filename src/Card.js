import React from "react"
export default function Card(props){
    return(
        <div className = "card">
            <h1>{props.title}</h1>
            <h2>{props.bond} plays James bond</h2>
            <h3>{props.penny} plays Moneypenny</h3>
        </div>
    )
}