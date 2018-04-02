import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, VrButton, Animated } from 'react-vr';
import { withRouter } from 'react-router';
import Wobbly from 'wobbly';

const ParallaxButton = Animated.createAnimatedComponent(VrButton);

class Link extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    to: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    position: PropTypes.array,
    rotateY: PropTypes.number,
  };
  static defaultProps = {
    position: [0, 0, -3],
    rotateY: 0,
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
        <Wobbly>
          {({ getMoveTargetProps, getWobblyTransformStyle }) => (
            <ParallaxButton
              onClick={() => {
                clearTimeout(this.gazeTimeout);
                history.push(to);
              }}
              style={{
                transform: getWobblyTransformStyle(),
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
              {...getMoveTargetProps({
                onExit: () => clearTimeout(this.gazeTimeout),
              })}
            >
              <Text
                style={{
                  fontSize: 0.2,
                  width: 2,
                  textAlignVertical: 'center',
                  textAlign: 'center',
                  transform: [
                    {
                      translateZ: 0.05,
                    },
                  ],
                }}
              >
                {children}
              </Text>
            </ParallaxButton>
          )}
        </Wobbly>
      </View>
    );
  }
}

export default withRouter(Link);
