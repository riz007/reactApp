import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Person from './Person/Person.js';

class App extends Component {
  state = {
    persons: [
        {id: '01', name: 'Riz', age: 26},
        {id: '02', name: 'Salman', age: 25},
        {id: '03', name: 'Namtan', age: 27}
    ],
    otherState: 'some other value',
    showPersons: false
  }

  nameChangeHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });

    const person = {
      ...this.state.persons[personIndex]
    };

    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState({persons: persons});

    // this.setState( {
    //   persons: [
    //     {name: 'Max', age: 26},
    //     {name: event.target.value, age: 25},
    //     {name: 'Namtan', age: 26}
    //   ]
    // } )
  }

  deletePersonHandler = (personIndex) => {
    // const persons = this.state.persons.slice();
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({persons: persons});
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({showPersons: !doesShow});
  }

  render() {
    const style = {
      backgroundColor: 'green',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer',
      ':hover':{
        backgroundColor: 'lightgreen',
        color: 'black'
      }
    };

    let persons = null;

    if(this.state.showPersons === true) {
      persons = (
        <div>
          {this.state.persons.map((person, index) => {
              return <Person 
              click= {()=>this.deletePersonHandler(index)}
              name={person.name}
              age={person.age}
              key={person.id}
              changed={(event) => this.nameChangeHandler(event, person.id)} />
           })
         }
      </div> 
      );
      style.backgroundColor = 'red';
      style[':hover'] = {
        backgroundColor: 'salmon',
        color: 'black'
      }
    }

    const classes = [];
    if(this.state.persons.length <= 2) {
      classes.push('red'); //classes='red'
    }
    if(this.state.persons.length <= 1) {
      classes.push('bold'); //classes=['red', 'bold']
    }


    return (
      <div className="App">
        <h1>Hi I am a react app</h1>
        <p className={classes.join(' ')}>This is really working</p>

        <button 
        style = {style}
        onClick={this.togglePersonsHandler }>Toggle Persons
        </button>

        {persons}

      </div>
    );
    // return React.createElement('div', {className: 'App'}, null, React.createElement('h1', null, 'Hi, I\'m a React app!!!'));
  }
}

export default App;
