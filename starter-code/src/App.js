import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import foodsJson from './foods.json'
import FoodBox from './FoodBox'
console.log(foodsJson)
class App extends Component {

  state = {
    foods: foodsJson,
    foodToAdd: '',
    calsToAdd: 0,
    showForm: false,
    search: ''
  }


  showFoods = () => {
    return this.state.foods.map((eachFood,i)=>{
      return < FoodBox changeQuantity={this.changeTheQuantity} key={i} {...eachFood}/>
    })
  }


  changeTheQuantity = (e) => {
    console.log('change ', e.target.value)
    console.log(e.target.name)
  }

  addFood = (e) => {
    e.preventDefault() //e.target.children[0].value -- alternative 


    let newFoods = [...this.state.foods] //Copy of all the previous food


    let newFood = {
      name: this.state.foodToAdd,
      calories: this.state.caloriesToAdd,
      quantity: 0,
      image: ''
    }

    newFoods.unshift(newFood) //I added my new food to the list.  

    this.setState({
      foods:newFoods,
      foodToAdd: '',
      calsToAdd: 0
    })

    this.setShowForm()
  }

  setInputOnChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value //food: 'pizza' 
    })
  }

  setShowForm = () => {
    this.setState({
      showForm:!this.state.showForm
    })
  }

  setSearch = (e) => {

    let filteredFoods = foodsJson.filter(eachFood=>{
      return eachFood.name.toLowerCase().includes(e.target.value.toLowerCase())
    })


    this.setState({
      'search': e.target.value, //search: 'pizza' 
      foods:filteredFoods
    })


    console.log(filteredFoods)
  }
 
  showTheForm = () => {
  
    if( this.state.showForm ) {
      return (
        <form onSubmit={this.addFood}>
          <input onChange={this.setInputOnChange} placeholder="add a food" name="foodToAdd" type="text"/>
          <input onChange={this.setInputOnChange} placeholder="how many cals" name="caloriesToAdd" type="number"/>

          <input type="submit" value="Add Food" />
        </form>
      )
    }
    else{
      return <button onClick={this.setShowForm}>Show Form</button>
    }
    
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React {Math.random()}</h1>
        </header>
      <input type="text" name="search" placeholder="Search for a food" onChange={this.setSearch}/>
      <br></br>
      {this.showTheForm()}

      {this.showFoods()}




      </div>
    );
  }
}

export default App;
