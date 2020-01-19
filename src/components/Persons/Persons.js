import React, { Component } from "react";
import Person from "./Person/Person";

class Persons extends Component {

    //static getDerivedStateFromProps(props, state){
      //  console.log('[Persons.js] getDerivedStateFromProps');
        //return state;
    //}

    //componentWillReceiveProps(props){
        //console.log('[Persons.js] componentWillReceiveProps', props);
    //}

    shouldComponentUpdate(nextProps, nextState){
        console.log('[Persons.js] shouldComponentUpdate');
        if (nextProps.persons !== this.props.persons) return true;
        else return false; //if the person doesnt change we dont need to re-render it
       //return true if REact should continue updating and false if shouldnt
    }

    getSnapshotBeforeUpdate(prevProps, prevState){
        console.log('[Persons.js] getSnapshotBeforeUpdate'); 
        return {message: 'Snapshot'};       
    }

    //componentWillUpdate(){

    //}

    componentDidUpdate(prevProps, prevState, snapshot){
        console.log('[Persons.js] compponentDidUpdate');
        console.log(snapshot);
        
    }

    componentWillUnmount(){
        console.log('[Persons.js] componentWillUnmount');
        
    }

    render() {
        console.log("[Persons.js] rendering....");
        console.log(this.props);
        
        return this.props.persons.map((person, index) => {
            //Props.person.map is just a normal js, not jsx
            return (
                <Person
                    click={() => this.props.clicked(index)} //use arrow func to pass argument for delete func
                    name={person.name}
                    age={person.age}
                    key={person.id}
                    changed={event => this.props.changed(event, person.id)}
                    //isAuth={this.props.isAuthenticated}
                />

            );
        });
    }
}
export default Persons;
