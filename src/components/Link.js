import React from 'react';
import PropTypes from 'prop-types';
import { Text, VrButton } from 'react-vr';
import { withRouter } from 'react-router';

function Link({ history, to, position, rotateY }) {
  return (
    <VrButton
      onEnter={() => {
        this.gazeTimeout = setTimeout(() => history.push(to), 1000);
      }}
      onClick={() => {
        clearTimeout(this.gazeTimeout);
        history.push(to);
      }}
      onExit={() => clearTimeout(this.gazeTimeout)}
      style={{
        layoutOrigin: [0.5, 0.5],
        transform: [{ rotateY }, { translate: position }],
      }}
    >
      <Text
        style={{
          backgroundColor: 'blue',
          fontSize: 0.2,
          textAlign: 'center',
        }}
      >
        {`Go to ${to}`}
      </Text>
    </VrButton>
  );
}

Link.propTypes = {
  history: PropTypes.object.isRequired,
  to: PropTypes.string.isRequired,
  position: PropTypes.array,
  rotateY: PropTypes.number,
};

Link.defaultProps = {
  position: [0, 0, -3],
  rotateY: 0,
};

export default withRouter(Link);
