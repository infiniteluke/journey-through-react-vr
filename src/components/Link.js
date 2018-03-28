import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, VrButton } from 'react-vr';
import { withRouter } from 'react-router';
import { throttle } from 'lodash';

const MOVE_OFFSET_LOWER = 0;
const MOVE_OFFSET_UPPER = 1;
const PARALLAX_DEGREE_SHIFT_LOWER = -15;
const PARALLAX_DEGREE_SHIFT_UPPER = 15;

// 0, 0 = -10, -10
// 0,1 = -10, 10
// 1, 0 = 10, -10
// 1, 1 = 10, 10
function linearTransform(num) {
  return (
    (num - MOVE_OFFSET_LOWER) /
      (MOVE_OFFSET_UPPER - MOVE_OFFSET_LOWER) *
      (PARALLAX_DEGREE_SHIFT_UPPER - PARALLAX_DEGREE_SHIFT_LOWER) +
    PARALLAX_DEGREE_SHIFT_LOWER
  );
}

class Link extends Component {
  state = {
    rotation: {
      x: 0,
      y: 0,
    },
  };
  updateParallax = throttle(offsets => {
    this.setState(() => ({
      rotation: {
        x: linearTransform(offsets[1]),
        y: linearTransform(offsets[0]),
      },
    }));
  }, 10);
  handleMove = event => {
    event.persist();
    this.updateParallax(event.nativeEvent.offset);
  };
  render() {
    const { history, to, position, rotateY, children } = this.props;
    return (
      <View
        style={{
          layoutOrigin: [0.5, 0.5],
          position: 'absolute',
          transform: [{ rotateY }, { translate: position }],
        }}
      >
        <VrButton
          onClick={() => {
            clearTimeout(this.gazeTimeout);
            history.push(to);
          }}
          style={{
            layoutOrigin: [0.5, 0.5],
            transform: [
              { rotateX: this.state.rotation.x },
              { rotateY: this.state.rotation.y },
            ],
            paddingTop: 0.15,
            paddingBottom: 0.15,
            paddingLeft: 0.15,
            paddingRight: 0.15,
            backgroundColor: 'blue',
            borderTopLeftRadius: 0.02,
            borderTopRightRadius: 0.02,
            borderBottomRightRadius: 0.02,
            borderBottomLeftRadius: 0.02,
          }}
          onEnter={() => {
            this.gazeTimeout = setTimeout(() => history.push(to), 1000);
          }}
          onExit={() => {
            clearTimeout(this.gazeTimeout);
            this.setState(() => ({
              rotation: {
                x: 0,
                y: 0,
              },
            }));
          }}
          onMove={this.handleMove}
          hitSlop={{ top: 0.1, bottom: 0.1, left: 0.1, right: 0.1 }}
        >
          <Text
            style={{
              fontSize: 0.2,
              textAlignVertical: 'center',
              textAlign: 'center',
              transform: [{ translateZ: 0.05 }],
            }}
          >
            {children}
          </Text>
        </VrButton>
      </View>
    );
  }
}

Link.propTypes = {
  history: PropTypes.object.isRequired,
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  position: PropTypes.array,
  rotateY: PropTypes.number,
};

Link.defaultProps = {
  position: [0, 0, -3],
  rotateY: 0,
};

export default withRouter(Link);
