import React from "react"
import axios from 'axios'
import Card from './Card'
import {nanoid} from 'nanoid'
import Button from './Button'
export default function App(){
  const [data,setData] = React.useState([])
  const buttonContents = ["Sean Connery", "Roger Moore", "Director"]
  const [buttonHandler, setButtonHandler] = React.useState(createButtons())
  const getDataFromApi = () => { //process to get data from aateButtons(pi using axios
    axios.get('https://iznfqs92n3.execute-api.us-west-1.amazonaws.com/dev/api/v2/movies')
    .then(response => {
      setData(response.data) //useState is getting the data

    }).catch(err =>{
      console.log(err)
    })

  }
  React.useEffect(()=>{ // so that this program doesn't run too many times.
    getDataFromApi();
     
  },[])
  const movieCard = data.map(obj => { // setting up props and card component for the Movie titles 
      return(
        <Card 
          key = {obj.movie_uid} 
          title = {obj.movie_title} 
          bond = {obj.bond_actor} 
          penny = {obj.Moneypenny}
        />

      )
  })
  
  
  
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
  function handleChange(id){ //gets which button is pressed from the button component
    setButtonHandler(prev=>{ //this function updates the state so that the particular button is now clicked
      return prev.map(obj =>{
        return obj.id == id ? {...obj, isClicked : !obj.isClicked} : {...obj, isClicked: false}
      })
    }) 

  }

  
  function displayMoviesWithActor(){ // goes through the buttonHandler state 
    for(var i = 0; i < 3; i ++){
      if(buttonHandler[i].isClicked){
        if(buttonHandler[i].name == "Director"){
          var arr2 = new Array()
          var directorArray = new Array() //array to make sure we get one director only once and not multiple times

          data.forEach(movieDetail => {
            //if()
            if(directorArray.length == 0){
              directorArray.push(movieDetail.director)
            }
            else{
              var isThere = false
              for(var i = 0; i < directorArray.length; i ++){
                if(directorArray[i] == movieDetail.director){
                  isThere = true
                }
              }
              if(!isThere){
                directorArray.push(movieDetail.director)
              }
            }
            //by the end of this we should have a director array that is all unique
          })
          directorArray.forEach(director =>{
            arr2.push(<div><li className = "listName">{director}</li></div>)
          })
          //arr2.push(<div><li className = "listName">{movieDetail.director}</li></div>)
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

  if(typeof displayMoviesWithActor() !== undefined){
    var list = displayMoviesWithActor()
  }
  return(
    <div className = "main-section">
      <h1 className = "list-intro">James Bond Database</h1>
      {movieCard}

      <div className="button-container">{buttons}</div>
      
      {/* {typeof displayLists !== 'undefined' && displayLists} */}
      {buttonHandler[0].isClicked && <h2 className = "list-intro">Here is a list of movies in which Sean Connery was James Bond</h2>}
      {buttonHandler[1].isClicked && <h2 className = "list-intro">Here is a list of movies in which Roger Moore was James Bond</h2>}
      
      {buttonHandler[2].isClicked && <h2 className = "list-intro">Here is a unique list of directors of the James Bond movies</h2>}

      {list !== undefined && list}
      
    </div>
  )
}
