// plugins/fontawesome.js

import Vue from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons/faAngleLeft'; // Update this import as needed

// Add the specific icon to the library
library.add(faAngleLeft);

// Register the component globally
Vue.component('font-awesome-icon', FontAwesomeIcon);

// Import the Font Awesome styles
import '@fortawesome/fontawesome-free/css/all.css'; // Ensure the correct path
