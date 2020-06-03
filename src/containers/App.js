import React, { Component } from 'react';
import classes from './App.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
import WithClass from '../hoc/WithClass';

class App extends Component {
  constructor(props) {
    super(props);
    console.log('[App.js] constructor');
    this.state = {
      persons: [
        {
          id: 1,
          name: 'Max',
          age: 28,
        },
        {
          id: 2,
          name: 'Manu',
          age: 29,
        },
        {
          id: 3,
          name: 'Stephanie',
          age: 26,
        },
      ],
      otherState: 'some other value',
      showPerson: false,
      showCockpit: true,
    };
  }

  static getDerivedStateFromProps(props, state) {
    console.log('[App.js] getDerivedStateFromProps', props);
    return state;
  }

  componentDidMount() {
    console.log('[App.js] Component did mount');
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('[App.js] shouldComponentUpdate');
    return true;
  }

  componentDidUpdate() {
    console.log('[App.js] componentDidUpdate');
  }

  togglePersonsHandler = () => {
    const dontShow = this.state.showPerson;
    this.setState({ showPerson: !dontShow });
  };

  handleDeletePerson = (personIndex) => {
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({ persons: persons });
  };

  handleNameChange = (event, personId) => {
    const personIndex = this.state.persons.findIndex((p) => p.id === personId);
    const person = { ...this.state.persons[personIndex] };
    person.name = event.target.value;
    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState({ persons: persons });
  };

  render() {
    console.log('[App.js] render');
    let persons = null;

    if (this.state.showPerson) {
      persons = (
        <Persons
          persons={this.state.persons}
          clicked={this.handleDeletePerson}
          changed={this.handleNameChange}
        />
      );
    }

    return (
      <WithClass classes={classes.App}>
        <button
          onClick={() => {
            let test = this.state.showCockpit;
            this.setState({ showCockpit: !test });
          }}>
          Cockpit toggle
        </button>
        {this.state.showCockpit && (
          <Cockpit
            title={this.props.title}
            showPerson={this.state.showPerson}
            personsLength={this.state.persons.length}
            clicked={this.togglePersonsHandler}
          />
        )}
        {persons}
      </WithClass>
    );
    // React.createElement(
    //   'disv',
    //   {
    //     className: 'App',
    //   },
    //   React.createElement('h1', null, 'Hi I am a react app')
    // )
  }
}

export default App;
