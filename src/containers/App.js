import React, { Component } from "react";
import "./App.css";
import Persons from "../components/Persons/Persons";
import Cockpit from "../components/Cockpit/Cockpit";
import withClass from "../hoc/withClass";
import Aux from "../hoc/Aux";
import AuthContext from "../context/auth-context";

class App extends Component {
  constructor(props) {
    super(props);
    console.log("[App.js] constructor");
  }
  state = {
    persons: [
      { id: "dhol", name: "Max", age: 30 },
      { id: "rtsd", name: "Tran", age: 22 },
      { id: "hjdd", name: "Quan", age: 21 }
    ],
    otherState: "some other value",
    showPerson: false,
    showCockpit: true,
    changeCounter: 0,
    authenticated: false
  };

  static getDerivedStateFromProps(props, state) {
    console.log("[App.js] getDerivedStateFromProps", props);
    return state;
  }
  //componentWillMount(){
  //console.log('[App.js] componentWillMount');
  //}

  componentDidMount() {
    console.log("[App.js] componentDidMount");
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log("[App.js] shouldComponentUpdate");
    return true;
  }

  componentDidUpdate() {
    console.log("[App.js] componentDidUpdate");
  }

  deletePersonHandler = personIndex => {
    //const persons=this.state.persons; => have to take a copy of the array before manipulaing it like  "const persons=this.state.persons.slice()"
    //use slice() without any argument that  means taking the full array
    const persons = [...this.state.persons]; //the better practice to take the copy of the array, It is not the old array itself
    persons.splice(personIndex, 1); //remove 1 element in the array
    this.setState({ persons }); //setState is used to update the state
    // since the name of the array updated is the same with the initial, just need to write once
  };

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
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
    this.setState((prevState, props) => {
      //However, It is completely perfect if only update persons in this case
      return {
        persons,
        changeCounter: prevState.changeCounter + 1 // Not understand yet?????
      };
    });
  };
  togglePersonHandler = () => {
    const doesShow = this.state.showPerson;
    this.setState({ showPerson: !doesShow });
  };
  loginHandler = () => {
    this.setState({ authenticated: true });
  };

  render() {
    console.log("[App.js] render");

    const style = {
      backgroundColor: "green",
      color: "white",
      font: "inherit",
      border: "1px solid blue",
      padding: "8px",
      cursor: "pointer"
    };
    let persons = null;

    if (this.state.showPerson) {
      persons = (
        <div>
          <Persons
            persons={this.state.persons}
            clicked={this.deletePersonHandler}
            changed={this.nameChangedHandler}
            isAuthenticated={this.state.authenticated}
          />
        </div>
      );
      style.backgroundColor = "red";
    }

    return (
      <Aux>
        <button
          onClick={() => {
            this.setState({ showCockpit: false });
          }}
        >
          Remove Cockpit
        </button>
        <AuthContext.Provider value={{
          authenticated: this.state.isAuthenticated, 
          login: this.loginHandler}}>
          {this.state.showCockpit ? (
            <Cockpit
              title={this.props.appTitle}
              showPerson={this.state.showPerson}
              personsLength={this.state.persons.length}
              clicked={this.togglePersonHandler}
              style={style}
            />
          ) : null}
          {persons}
        </AuthContext.Provider>
      </Aux>
    );
    //the other way to create a React element. It is the same with the above lines
    //return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'checked'));
  }
}
export default withClass(App, "App");
