import React from 'react';
import 'react-native';
import 'react-vr';
import renderer from 'react-test-renderer';

import Index from '../index.vr';
// Note: test renderer must be required after react-native.

it('renders correctly', () => {
  renderer.create(<Index />);
});
