import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import { preset } from 'vue-cli-plugin-vuetify-preset-reply/preset'

Vue.use(Vuetify);

export default new Vuetify({
  preset,
  theme: {
    themes: {
      light: {
        primary: '#ef7d28',
      },
      dark: {
        // primary: 'green',
        //secondary: '#b0bec5',
        // accent: '#8c9eff',
        //error: '#b71c1c',
      },
    },
  },
});
