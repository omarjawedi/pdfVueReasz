// plugins/vue-pdf-app.js
import Vue from 'vue'
import PdfApp  from 'vue-pdf-app'
import "vue-pdf-app/dist/icons/main.css";

console.log('plugin render', PdfApp)

Vue.component('PdfApp', PdfApp);