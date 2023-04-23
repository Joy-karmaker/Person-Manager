import React, { Component } from 'react';
import classes from './Person.css';
import Auxiliary from '../../../hoc/Auxiliary';
import withClass from '../../../hoc/withClass';
import PropsTypes from 'prop-types';
import AuthContext from '../../../context/auth-context';

class Person extends Component {
    constructor(props) {
        super(props);
        this.inputElementRef = React.createRef();
    }

    static contextType = AuthContext;

    componentDidMount() {
        this.inputElementRef.current.focus();
    }
    render() {
        console.log("[Person.js] rendering...");
        return (
            <Auxiliary>
                {this.context.isLoggedIn ? <p>Authenticated</p> : <p>Please login!</p>}
                <p key="l1" onClick={this.props.click}>I am {this.props.name} and I am {this.props.age} years old!!</p>
                <p key="l2" >{this.props.children}</p>
                <input 
                key="l3" 
                type="text"
                ref={this.inputElementRef} 
                onChange={this.props.changed} 
                value={this.props.name}
                />
            </Auxiliary>
        );
    }
}

Person.PropsTypes = {
    click: PropsTypes.func,
    name: PropsTypes.string,
    age: PropsTypes.number,
    changed: PropsTypes.func
};

export default withClass(Person,classes.Person);