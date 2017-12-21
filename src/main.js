import Vue from 'vue';
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import Resource from 'vue-resource';
import quillEditor from 'vue-quill-editor';
// require styles
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
import App from './App';
import router from './router';
import './assets/fonts/iconfont.css';

Vue.config.productionTip = false;
Vue.use(Resource);
Vue.use(iView);
Vue.use(quillEditor);
/* eslint-disable no-new */

new Vue({
  el: '#app',
  router,
  render: h => h(App),
});
