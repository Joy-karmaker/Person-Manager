import React, {useEffect, useRef, useContext }from 'react';
import classes from './Cockpit.css';
import AuthContext from '../../context/auth-context';

const cockpit =(props)=> {
    const toggleBtnRef = useRef(null);
    const contextAuth = useContext(AuthContext);
    useEffect(()=>{
      console.log('[Cockpi.js] useEffect');
      //HTTP Request
      // setTimeout(()=>{
      //   alert('Saved data to cloud!');
      // }, 1000);
      toggleBtnRef.current.click();
      return () => {
        console.log('[Cockpit.js] cleanup work in useEffect');
      };
    }, []);

    useEffect(()=>{
      console.log('[Cockpit.js] 2nd useEffect');
      return () => {
        console.log('[Cockpit.js] clean up work in 2nd useEffect');
      }
    });
    const assingedClasses = [];
    let btnClass='';
    if(props.showPersons) {
        btnClass=classes.Red;
    }
    
    if(props.personsLength<=2) {
      assingedClasses.push(classes.red);
    }
    if(props.personsLength<=1) {
      assingedClasses.push(classes.bold);
    }

    return (
        <div className={classes.Cockpit}>
        <h1>{props.title}</h1>
        <p className={assingedClasses.join(' ')}>This is really working!</p>
        <button ref={toggleBtnRef} className={btnClass} onClick={props.clicked}>Switch Name</button>
        <button onClick={contextAuth.login}>Log In</button>
      </div>
    );
};

export default React.memo(cockpit);