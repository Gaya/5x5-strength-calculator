import React, { Component } from 'react';

import calc from './calc';

import './App.css';

function Field({ name, label, value, onChange }) {
  return (
    <div className="App__field">
      <label htmlFor={name}>{label}</label>
      <input
          name={name}
          id={name}
          value={value}
          onChange={onChange}
          type="number"
      />
    </div>
  );
}

class App extends Component {
  constructor() {
    super();

    this.state = {
      max: 0,
      ratio: 0.8,
      sets: 5,
      smallestIncrement: 2.5,
      calced: [],
    };
  }

  componentDidMount() {}

  recalc() {
    const { max, ratio, sets, smallestIncrement } = this.state;

    this.setState({ calced: calc(max, ratio, sets, smallestIncrement) });
  }

  update(key, value) {
    this.setState({
      [key]: value,
    }, this.recalc.bind(this));
  }

  render() {
    const { max, ratio, sets, smallestIncrement, calced } = this.state;

    return (
      <div className="App">
        <Field
            name="max"
            label="Max"
            value={max}
            onChange={(e) => this.update('max', e.target.value)}
        />
        <Field
            name="ratio"
            label="Start ratio"
            value={ratio}
            onChange={(e) => this.update('ratio', e.target.value)}
        />
        <Field
            name="sets"
            label="# of sets"
            value={sets}
            onChange={(e) => this.update('sets', e.target.value)}
        />
        <Field
            name="smallestIncrement"
            label="Smallest increment"
            value={smallestIncrement}
            onChange={(e) => this.update('smallestIncrement', e.target.value)}
        />

        <div>{calced.join(', ')}</div>
      </div>
    );
  }
}

export default App;
