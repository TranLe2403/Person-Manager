import React, {useEffect, useRef} from "react";
import './Cockpit.css';
import AuthContext from '../../context/auth-context';
const Cockpit = props => {

//    const toggleBtnRef = React.creactRef(); //it completely does not work, because we are working with functional comp
    //instead we use as the following way:
    const toggleBtnRef = useRef(null);
    //toggleBtnRef.current.click(); //Cannot be here, because the button have not rendered yet

    useEffect(() => {
        console.log('[Cockpit.js] useEffect');
        //http request...
        /* setTimeout(() => {
            alert('Saved data to cloud!')
        } , 1000); */
        toggleBtnRef.current.click();
        return () => {
            console.log('[Cockpit.js] cleanup work in useEffect');  
        }
    }, []);

    useEffect(() => {
        console.log('[Cockpit.js] 2nd useEffect');
        return () => {
            console.log('[Cockpit.js] cleanup work in 2nd useEffect');  
        }
    });

    let classes = [];
    if(props.personsLength <= 2){
      classes.push('red'); // classes = ['red']
    }
    if(props.personsLength <=1){
      classes.push('bold'); // classes = ['red', 'bold'];
    }
  return (
    <div>
      <h1>{props.title}</h1>
      <p className={classes.join(" ")}>This is really working!</p>
      <button 
        ref={toggleBtnRef}
        style={props.style} 
        onClick={props.clicked}>
        Toggle Persons
      </button>
      {/* Dont recommend to use this way with switchNameHandler */}
      <AuthContext.Consumer>
      {context => <button onClick={context.login}>Log in</button>}
      </AuthContext.Consumer>
    </div>
  );
};

export default React.memo(Cockpit);
