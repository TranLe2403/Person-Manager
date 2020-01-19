import React, { Component } from "react"; //do not need to import Compponent bcs not using class, just creating a function
import "./Person.css";
import Aux from "../../../hoc/Aux";
import withClass from "../../../hoc/withClass";
//import PropTypes from 'prop-types';
import AuthContext from "../../../context/auth-context";

class Person extends Component {

    constructor(props){
        super(props);   //must call super when usng constructor
        this.inputElementRef = React.createRef()
    }

    componentDidMount(){
        //document.querySelector('input').focus(); //this case, just focus on first one, 
                                                //because querySelector select the first input find here 
        //this.inputElement.focus(); //one of the way to use refs
        this.inputElementRef.current.focus(); //it will focus on what we are choosing and typing
    }

  render() {
    console.log("[Person.js] rendering....");

    return (
      <Aux>
          <AuthContext.Consumer>
              {(context) => context.isAuth ? <p>Authenticated!</p> : <p>Please, Log in!!!</p>}
          </AuthContext.Consumer>
          
        <p onClick={this.props.click}>
          I'm {this.props.name} and I am {this.props.age} years old!
        </p>
        {/*need to wrap (using {}) the dynamic content*/}
        <p key="i2">{this.props.children}</p>{" "}
        {/* to display all the text of the element */}
        <input
          key="i3"
          //way 1 using Refs
          //ref={inputEl => { //ref is used for selecting element
            //this.inputElement = inputEl; 
          //}}
          //way 2 using Refs
          ref={this.inputElementRef}
          type="text"
          onChange={this.props.changed}
          value={this.props.name}
        />
      </Aux>
    );
  }
}
/* Person.PropTypes = {
    click: PropTypes.func,
    name: PropTypes.string,
    age: PropTypes.number,
    changed: PropTypes.func
}; */
export default withClass(Person, "Person");
