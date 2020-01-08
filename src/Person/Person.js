import React from 'react'; //do not need to import Compponent bcs not using class, just creating a function 
import './Person.css';

const person = (props) => {
    
    return (
        <div className='Person' >
            <p onClick={props.click}>I'm {props.name} and I am {props.age} years old!</p> {/*need to wrap (using {}) the dynamic content*/}
            <p>{props.children}</p> {/* to display all the text of the element */}
            <input type='text' onChange={props.changed} value={props.name}/>
        </div>
    )
}

export default person;