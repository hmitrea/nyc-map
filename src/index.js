import {render} from 'react-dom';
import React from 'react';

import App from './App'
/* global document */
render(<App />,
   document.body.appendChild(document.createElement('div')));
