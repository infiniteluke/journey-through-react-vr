import React from 'react';
import { AppRegistry, asset, Pano, View } from 'react-vr';
import Router from 'react-router/MemoryRouter';
import Route from 'react-router/Route';

import Dropdown from './src/components/Dropdown';
import Chart from './src/components/Chart';
import Link from './src/components/Link';

const ITEMS = ['donuts', 'pizza', 'kale', 'carrots'];
const DATA = [
  {
    x: 1,
    y: 10,
  },
  {
    x: 2,
    y: 5,
  },
  {
    x: 3,
    y: 2,
  },
  {
    x: 4,
    y: 15,
  },
  {
    x: 5,
    y: 1,
  },
];

export default function Journey() {
  return (
    <Router>
      <View>
        <Pano source={asset('chess-world.jpg')} />
        <Link to="/victory" rotateY={-90} />
        <Link to="/downshift" rotateY={90} />
        <Route path="/victory" render={() => <Chart data={DATA} />} />
        <Route
          path="/downshift"
          render={() => <Dropdown placeholder="Select an item" items={ITEMS} />}
        />
      </View>
    </Router>
  );
}

AppRegistry.registerComponent('Journey', () => Journey);
