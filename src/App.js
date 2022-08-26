import React from "react"
import axios from 'axios'
import Card from './Card'
import {nanoid} from 'nanoid'
import Button from './Button'
export default function App(){
  const [data,setData] = React.useState([])
  const [seanButton, setSeanButton] = React.useState(false)
  const getDataFromApi = () => { //process to get data from api using axios!
    axios.get('https://iznfqs92n3.execute-api.us-west-1.amazonaws.com/dev/api/v2/movies')
    .then(response => {
      setData(response.data)

    }).catch(err =>{
      console.log(err)
    })

  }
  React.useEffect(()=>{
    getDataFromApi();
    
  },[])
  const movieCard = data.map(obj => {
      return(
        <Card 
          key = {obj.movie_uid} 
          title = {obj.movie_title} 
          bond = {obj.bond_actor} 
          penny = {obj.Moneypenny}
        />

      )
  })
  
  var actorMovies = data.map(obj =>{
    if(obj.bond_actor == "Sean Connery"){
      return(
        obj.movie_title
      )
    }
  })
  //make another component
  const buttonContents = ["Sean Connery", "Roger Moore", "Director"]
  const [buttonHandler, setButtonHandler] = React.useState(createButtons())
  function createButtons(){
    const arr = new Array();
    for(var i = 0; i < 3; i ++){
        const obj = {
          name : buttonContents[i],
          isClicked : false,
          id: nanoid()
        }
        arr.push(obj)
    }
    return arr
  }
  //idea for tomorrow: make button component, in the button component, onClick will send back a nanoid, match nanoid, and then if nanoid matches then you can use that to filter the list

  var buttons = buttonHandler.map(person =>{
    return(
      <Button 
        isClicked = {person.isClicked}
        id = {person.id}
        name = {person.name}
        handleChange = {handleChange}
      />
    )
  })
  //another function called handle change
  function handleChange(id){
    setButtonHandler(prev=>{ //this function updates the state so that the particular button is now clicked
      return prev.map(obj =>{
        return obj.id == id ? {...obj, isClicked : !obj.isClicked} : {...obj, isClicked: false}
      })
    }) 

  }

  
  function displayMoviesWithActor(){
    for(var i = 0; i < 3; i ++){
      if(buttonHandler[i].isClicked){
        if(buttonHandler[i].name == "Director"){
          var arr2 = new Array()
          data.forEach(movieDetail => {
            //if()
            
            arr2.push(<div><li className = "listName">{movieDetail.director}</li></div>)
          })
          return arr2
        }
        
        else{
          var arr = new Array()
          data.forEach(movieDetail => {
            if(movieDetail.bond_actor == buttonHandler[i].name){
              arr.push(
                <div><li className = "listName">{movieDetail.movie_title}</li></div>
              ) 
            }
          })
          return arr //try mapping it here
        }
      }
    }
  }
  // const list = displayMoviesWithActor()
  // if(typeof list !== 'undefined'){
  //   const displayLists = list.map(item =>{
  //     return(
  //       <li>{item}</li>
  //     )
  //   })  
  // }
  if(typeof displayMoviesWithActor() !== undefined){
    var list = displayMoviesWithActor()
  }
  return(
    <div className = "main-section">
      <h1 className = "list-intro">James Bond Database</h1>
      {movieCard}
      {/* <button onClick = {displayMoviesWithActor}>Sean Connery</button>
      {seanButton && <p className = "movie-list">{actorMovies}<br/></p>} */}
      <div className="button-container">{buttons}</div>
      
      {/* {typeof displayLists !== 'undefined' && displayLists} */}
      {buttonHandler[0].isClicked && <h2 className = "list-intro">Here is a list of movies in which Sean Connery was James Bond</h2>}
      {buttonHandler[1].isClicked && <h2 className = "list-intro">Here is a list of movies in which Roger Moore was James Bond</h2>}
      
      {buttonHandler[2].isClicked && <h2 className = "list-intro">Here is a complete list of directors of the James Bond movies</h2>}

      {list !== undefined && list}
      
    </div>
  )
}