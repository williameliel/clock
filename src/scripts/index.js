/* Main entry point for alarm clock app. Initiates AlarmClock function and adds styles */

'use strict';

import AlarmClock from './modules/alarm_clock';

import '../styles/index.scss';

const clock = new AlarmClock();
clock.renderClock();