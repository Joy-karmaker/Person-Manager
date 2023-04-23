import React, { Component } from 'react';
import classes from './App.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
import withClass from '../hoc/withClass';
import Auxiliary from '../hoc/Auxiliary';
import AuthContext from '../context/auth-context';

class App extends Component {
  constructor(props) {
    super(props);
    console.log("[App.js] constructor");
  }
  state = {
    persons: [
      { id:'1', name: 'Max', age: 28 },
      { id:'2', name: 'Manu', age: 29 },
      { id:'3', name: 'Stephanie', age: 26 }
    ],
    otherState: 'some other value',
    showPersons: false,
    showCockpit: true,
    changeCount: 0,
    isLoggedIn: false
  }

  static getDerivedStateFromProps(props,state) {
    console.log("[App.js] getDerivedStateFromProps", props);
    return state;
  }

  componentDidMount() {
    console.log("[App.js] componentDidMount");
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('[App.js] shouldComponentUpdate');
    return true; 
  }

  componentDidUpdate() {
    console.log('[App.js] componentDidUpdate');
  }

  switchNameHandler = (newName) => {
    
    this.setState( {
      persons: [
        { name: newName, age: 28 },
        { name: 'Manu', age: 29 },
        { name: 'Stephanie', age: 27 }
      ]
    } )
  }

  nameChangedHandler = (event,id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });

    const person = {
      ...this.state.persons[personIndex]
    };

    //const person = Object.assign({}, this.state.persons[personIndex]);

    person.name = event.target.value;

    const persons = [...this.state.persons];

    persons[personIndex]=person;

    this.setState((prevState, props) => {
      return {
        persons:persons,
        changeCount: this.state.changeCount+1
      };
    });
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({showPersons: !doesShow});
  }

  isLoggedInfunc = () => {
    this.setState({ isLoggedIn: true });
  }

  deletePersonsHandler = (personIndex) => {
    //const persons = this.state.persons.slice();
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({persons:persons});
  }

  render () {
    console.log("[App.js] render");
    let persons = null;

    if(this.state.showPersons) {
      persons = <Persons
            persons_new={this.state.persons}
            clicked={this.deletePersonsHandler}
            changed={this.nameChangedHandler}
            isLogged={this.state.isLoggedIn}
        />;
    }

    //let classes = ['red','bold'].join(' ');
    
    return (
      <Auxiliary>
        <button onClick={()=>{
          this.setState({showCockpit:false})
          }}>Remove Cockpit</button>
       
        <AuthContext.Provider value={{
          isLoggedIn: this.state.isLoggedIn,
          login: this.isLoggedInfunc
          }}>
        {this.state.showCockpit?(
          <Cockpit
          showPersons={this.state.showPersons}
          personsLength={this.state.persons.length}
          clicked={this.togglePersonsHandler}
          title={this.props.appTitle}/>):null}
          {persons}
        </AuthContext.Provider>
      </Auxiliary>
    );
    // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Does this work now?'));
  }
}

export default withClass(App,classes.App);
