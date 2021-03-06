// Auto-generated content.
// This file contains the boilerplate to set up your React app.
// If you want to modify your application, start in "index.vr.js"

// Auto-generated content.
import { VRInstance } from 'react-vr-web';
// import * as SimpleRaycaster from 'simple-raycaster';

function init(bundle, parent, options) {
  const vr = new VRInstance(bundle, 'Journey', parent, {
    // Add custom options here
    // raycasters: [SimpleRaycaster],
    cursorVisibility: 'visible',
    ...options,
    enableHotReload: true,
  });

  // Begin the animation loop
  vr.start();
  return vr;
}

window.ReactVR = { init };
