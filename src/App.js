import React, { Component } from "react";
import "./App.css";
import Person from "./Person/Person";


class App extends Component {
  state = {
    persons: [
      { id:"dhol", name: "Max", age: 30 },
      { id:"rtsd", name: "Tran", age: 22 },
      { id:"hjdd", name: "Quan", age: 21 }
    ],
    otherState: "some other value",
    showPerson: false
  };

  deletePersonHandler = (personIndex) => {
    //const persons=this.state.persons; => have to take a copy of the array before manipulaing it like  "const persons=this.state.persons.slice()"
                                          //use slice() without any argument that  means taking the full array
    const persons = [...this.state.persons]; //the better practice to take the copy of the array, It is not the old array itself
    persons.splice(personIndex, 1);   //remove 1 element in the array
    this.setState({persons});   //setState is used to update the state 
                               // since the name of the array updated is the same with the initial, just need to write once
  }

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex( p => {
      return p.id === id;
    });
      const person = {
        ...this.state.persons[personIndex] //spreac operator is also available for object, and it takes all the property of the object
      };
      //the other approach to get
      //const person = Object.assign({}, this.state.persons[personIndex]);  //we pass the empty obj as firast arg, and the second is the obj you want to assign

      person.name = event.target.value;

      const persons = [...this.state.persons];
      persons[personIndex] = person;

    //this event para will take the vlaue of the input area
    this.setState({ persons });
  };
  togglePersonHandler = () => {
    const doesShow = this.state.showPerson;
    this.setState({ showPerson: !doesShow });
  };
  render() {
    const style = {
      backgroundColor: "green",
      color: "white",
      font: "inherit",
      border: "1px solid blue",
      padding: "8px",
      cursor: "pointer",


    };
    let persons = null;

    if (this.state.showPerson) {
      persons = (
        <div>
          {this.state.persons.map( (person, index) => {
            return <Person 
              click={() => this.deletePersonHandler(index)} //use arrow func to pass argument for delete func
              name={person.name}  
              age={person.age}
              key={person.id} 
              changed={(event) => this.nameChangedHandler(event, person.id)} />
          })}
        </div>
      );
      style.backgroundColor = 'red';
      
    }
    let classes = [];
    if(this.state.persons.length <= 2){
      classes.push('red'); // classes = ['red']
    }
    if(this.state.persons.length <=1){
      classes.push('bold'); // classes = ['red', 'bold'];
    }
    return (
      <div className="App">
        <h1>Hi, I'm React app</h1>
        <p className={classes}>This is really working!</p>
        <button style={style} onClick={this.togglePersonHandler}>
          Toggle Persons
        </button>   {/* Dont recommend to use this way with switchNameHandler */}
        {persons}
      </div>
    );
    //the other way to create a React element. It is the same with the above lines
    //return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'checked'));
  }
}
export default App;
