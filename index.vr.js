import React from 'react';
import { AppRegistry, asset, Pano, Text, View } from 'react-vr';
import { Route, MemoryRouter } from 'react-router';

import Dropdown from './src/components/Dropdown';
import Chart from './src/components/Chart';
import Link from './src/components/Link';
import WobblyShape from './src/components/WobblyShape';

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
    <MemoryRouter>
      <View>
        <Pano source={asset('chess-world.jpg')} />
        <Link to="/downshift" rotateY={-90}>
          Dropdown
        </Link>
        <Link to="/victory" rotateY={90}>
          Graphing
        </Link>
        <Link to="/animated" rotateY={180}>
          Animated
        </Link>
        <Route
          path="/"
          exact
          render={() => (
            <Text
              style={{
                position: 'absolute',
                layoutOrigin: [0.5, 0.5],
                transform: [{ translate: [0, 0, -3] }],
                fontSize: 0.4,
                textAlign: 'center',
                backgroundColor: 'gray',
                color: 'white',
              }}
            >
              {'<-- Pick a library -->'}
            </Text>
          )}
        />
        <Route path="/victory" render={() => <Chart data={DATA} />} />
        <Route
          path="/downshift"
          render={() => <Dropdown placeholder="Select an item" items={ITEMS} />}
        />
        <Route path="/animated" render={() => <WobblyShape />} />
      </View>
    </MemoryRouter>
  );
}

AppRegistry.registerComponent('Journey', () => Journey);
