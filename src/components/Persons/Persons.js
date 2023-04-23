import React, { PureComponent } from 'react';
import Person from './Person/Person';

class Persons extends PureComponent {
    // static getDerivedStateFromProps(props, state) {
    //   console.log('[Persons.js] getDerivedStateFromProps');
    //   return state;
    // }
    // componentWillReceiveProps(props){
    //   console.log('[Persons.js] componentWillReceiveProps', props);
    // }

    // shouldComponentUpdate(nextProps, nextState) {
    //   if(
    //     nextProps.persons_new!==this.props.persons_new ||
    //     nextProps.clicked!==this.props.clicked ||
    //     nextProps.changed!==this.props.changed
    //     ) {
    //     console.log('[Person.js] shouldComponentUpdate');
    //     return true; 
    //   }else {
    //     return false;
    //   }
    // }

    getSnapshotBeforeUpdate(prevProps, prevState) {
      console.log('[Person.js] getSnapshotBeforeUpdate');
      return { message: 'Snapshot'};
    }

    
    componentDidUpdate(prevProps, prevState, snapshot) {
      console.log('[Person.js] componentDidUpdate');
      console.log(snapshot);
    }

    componentWillUnmount() {
      console.log('[Persons.js] componentWillUnmount');
    }

    render() {
      console.log("[Person.js] rendering......");
      return this.props.persons_new.map((person, index) => {
              return <Person
                click={() =>this.props.clicked(index)}
                name={person.name}
                age={person.age}
                key={person.id}
                changed={(event) =>this.props.changed(event,person.id)}
                islogged={this.props.isLogged}/>
      })
    }
}
export default Persons;