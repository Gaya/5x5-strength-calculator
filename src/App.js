import React, { Component } from 'react';
import { Container, Menu, Header, Input } from 'semantic-ui-react';

import calc from './calc';

import './App.css';

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
      ratio: 0.8,
      sets: 5,
      smallestIncrement: 2.5,
      weightPerSet: 0,
    };
  }

  componentDidMount() {}

  recalc() {
    const { max, ratio, sets, smallestIncrement } = this.state;

    this.setState({ weightPerSet: calc(max, ratio, sets, smallestIncrement) });
  }

  update(key, value) {
    this.setState({
      [key]: value,
    }, this.recalc.bind(this));
  }

  setsWeight(max, sets, weightPerSet) {
    return new Array(sets).fill(0).map((i, index) => max - (((sets - 1) - index) * weightPerSet));
  }

  render() {
    const { max, ratio, sets, smallestIncrement, weightPerSet } = this.state;

    return (
      <div className="App">
        <Menu inverted className="App__top">
          <Container text style={{ justifyContent: 'center' }}>
            <Header inverted>Test your might</Header>
          </Container>
        </Menu>
        <Container text>
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

          <div>{this.setsWeight(max, sets, weightPerSet).join(', ')}</div>
        </Container>
      </div>
    );
  }
}

export default App;
