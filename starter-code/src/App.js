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
    search: '',
    listOfFoods: {
        // "Pizza":{
        //   quantity: 5,
        //   calories: 500
        // },
        // "Salad": {
        //   quantity: 3,
        //   calories: 20
        // },
        // "Kiwi" : {
        //   quantity: 6,
        //   calories: 99
        // }
      } 
  }

  showTodaysFood = () => {
    let foods = this.state.listOfFoods
    let array = [] 
    let total = 0; 
    for(let key in foods) {
       console.log( Number(foods[key].calories) )
       total += Number(foods[key].quantity) * Number(foods[key].calories)
        array.push (
            <li key={key}>
              name: {key} 
              -
              calories: {Number(foods[key].quantity) * Number(foods[key].calories)}
            </li>
        )
    }
    return <ul>TOTAL is {total}!!!!<br></br> {array}</ul>
  }







  showFoods = () => {
    return this.state.foods.map((eachFood,i)=>{
      return < FoodBox updateFoodList={this.updateFoodList} changeQuantity={this.changeTheQuantity} key={i} {...eachFood}/>
    })
  }


  updateFoodList = (foodBoxState) => {
    console.log(foodBoxState)
    let newListOfFoods = {...this.state.listOfFoods}
    newListOfFoods[foodBoxState.name] = foodBoxState //newListOfFoods['pizza'] = {  caloies: 5, qunatity: 7} 
    this.setState({
      listOfFoods: newListOfFoods
    })
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

      <React.Fragment>

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

      <div className="todaysFood">
            Todays Food
            {this.showTodaysFood()}
      </div>

      </React.Fragment>    );
  }
}

export default App;
