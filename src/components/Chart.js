import React from 'react';
import { Box, SpotLight, View } from 'react-vr';
import { VictoryBar } from 'victory';
import PropTypes from 'prop-types';

const BASEW = 450;
const BASEH = 300;

function Container({ children }) {
  return (
    <View
      style={{
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
      }}
    >
      {children}
    </View>
  );
}

Container.propTypes = {
  children: PropTypes.node,
};

class Bar extends React.Component {
  static propTypes = {
    x: PropTypes.number,
    y: PropTypes.number,
  };
  static getProportion(y) {
    const pct = y / BASEH;
    return pct * 2;
  }
  getDimensions(x, y) {
    return {
      w: 0.25,
      h: this.constructor.getProportion(BASEH - y),
    };
  }
  static getLeft(x) {
    const pct = x / BASEW;
    return pct * 3.3;
  }
  render() {
    const { x, y } = this.props;
    const { w, h } = this.getDimensions(x, y);
    const left = this.constructor.getLeft(x) - 1.66;
    return (
      <Box
        dimWidth={w}
        dimDepth={0.25}
        dimHeight={h}
        lit={true}
        style={{
          color: '#a0da90',
          top: 1 - h / 2,
          transform: [{ translate: [left, 0, 0] }],
        }}
      />
    );
  }
}

function Chart({ data }) {
  return (
    <View
      style={{
        layoutOrigin: [0.5, 0.5],
        transform: [{ translate: [0.5, 0, -3] }],
      }}
    >
      <SpotLight
        intensity={1}
        style={{ transform: [{ translate: [1, 4, 4] }] }}
      />
      <VictoryBar
        data={data}
        padding={0}
        groupComponent={<View />}
        containerComponent={<Container />}
        dataComponent={<Bar />}
      />
    </View>
  );
}

Chart.propTypes = {
  data: PropTypes.array,
};

export default Chart;
