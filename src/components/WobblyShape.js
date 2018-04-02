import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { VrButton, View, SpotLight, Cylinder, Box, Animated } from 'react-vr';
import Wobbly from 'wobbly';

const AnimatedCylinder = Animated.createAnimatedComponent(Cylinder);
const AnimatedBox = Animated.createAnimatedComponent(Box);

const SHAPES = [
  function WobblySphere(props) {
    return (
      <AnimatedCylinder
        {...props}
        key="cylinder"
        radiusTop={0.5}
        radiusBottom={0.5}
        dimHeight={2}
        segments={12}
      />
    );
  },
  function WobblyBox(props) {
    return (
      <AnimatedBox
        {...props}
        key="box"
        dimWidth={1}
        dimDepth={2}
        dimHeight={1}
      />
    );
  },
];

class WobblyShapes extends Component {
  static propTypes = {
    position: PropTypes.array,
    rotateY: PropTypes.number,
  };
  static defaultProps = {
    position: [0, 0, -3],
    rotateY: 0,
  };
  static *getShape() {
    let i = 0;
    for (;;) {
      i += 1;
      yield SHAPES[i % SHAPES.length];
    }
  }
  shapeIterator = this.constructor.getShape();
  state = {
    shape: this.shapeIterator.next().value,
  };
  handleClick = () => {
    this.setState(() => ({ shape: this.shapeIterator.next().value }));
  };
  render() {
    const { rotateY, position } = this.props;
    const Shape = this.state.shape;
    return (
      <View
        style={{
          layoutOrigin: [0.5, 0.5],
          position: 'absolute',
          transform: [{ rotateY }, { translate: position }],
        }}
      >
        <SpotLight
          intensity={1}
          style={{ transform: [{ translate: [1, 4, 4] }] }}
        />
        <Wobbly flipX>
          {({ getMoveTargetProps, getWobblyTransformStyle }) => (
            <VrButton onClick={this.handleClick}>
              <Shape
                lit
                style={{ color: 'blue', transform: getWobblyTransformStyle() }}
                {...getMoveTargetProps()}
              />
            </VrButton>
          )}
        </Wobbly>
      </View>
    );
  }
}

export default WobblyShapes;
