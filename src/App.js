import React, { Component } from 'react';
import { Container, Menu, Header, Input, Grid, Form } from 'semantic-ui-react';

import calc from './calc';

import './App.css';

function setsWeight(max, sets, weightPerSet) {
  return new Array(sets).fill(0).map((i, index) => max - (((sets - 1) - index) * weightPerSet));
}

function Field({ name, label, value, rightLabel, onChange }) {
  const inputLabel = rightLabel ? {
    label: { basic: true, content: rightLabel },
    labelPosition: 'right',
  } : {};

  return (
    <div className="App__field">
      <Header as="h4" style={{ margin: 0 }}>{label}</Header>
      <Input
          name={name}
          id={name}
          value={value}
          onChange={onChange}
          {...inputLabel}
          type="number"
          style={{ width: '100%' }}
      />
    </div>
  );
}

class App extends Component {
  constructor() {
    super();

    this.state = {
      max: 0,
      ratio: 80,
      sets: 5,
      smallestIncrement: 2.5,
      weightPerSet: 0,
    };
  }

  componentDidMount() {
    window.scrollTo(0, 1);
  }

  recalc() {
    const { max, ratio, sets, smallestIncrement } = this.state;

    this.setState({ weightPerSet: calc(max, ratio / 100, sets, smallestIncrement) });
  }

  update(key, value) {
    this.setState({
      [key]: value,
    }, this.recalc.bind(this));
  }

  render() {
    const { max, ratio, sets, smallestIncrement, weightPerSet } = this.state;

    const setWeights = setsWeight(max, sets, weightPerSet);

    return (
      <div className="App">
        <Menu inverted className="App__top">
          <Container text style={{ justifyContent: 'center' }}>
            <Header inverted>5X5 STRENGTH CALC</Header>
          </Container>
        </Menu>
        <Container text>
          <div className="Fields">
            <Field
                name="max"
                label="Max"
                value={max}
                onChange={(e) => this.update('max', e.target.value)}
                rightLabel="kg"
            />
            <Field
                name="ratio"
                label="Start ratio"
                value={ratio}
                onChange={(e) => this.update('ratio', e.target.value)}
                rightLabel="%"
            />
          </div>

          <div className="Fields">
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
                rightLabel="kg"
            />
          </div>

          <div className="Sets">
            {setWeights.map((weight, index) => (
                <div key={index} className="Set">
                  <Header as="h4">Set #{index + 1}</Header>
                  <div>{weight} kg</div>
                </div>
            ))}
          </div>

          <Header as="h4">Add each round</Header>
          <div>{weightPerSet} kg</div>
        </Container>
      </div>
    );
  }
}

export default App;
