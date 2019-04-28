import React from 'react';
import ReactDOM from 'react-dom';
import {Main} from './ui/main'

import './data/items-rep'
import './data/timer-service'

ReactDOM.render(<div id="app" />, document.body);
const app = document.getElementById("app");

ReactDOM.render(<Main />, app);
