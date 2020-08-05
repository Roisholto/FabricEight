<template>
  <v-app id="">
    <v-app-bar
    app
    color="white"
    light
      >
      <div class="d-flex align-center">
        <router-link :to="{name:'home'}">
          <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="/img/f8logo.png"
          transition="scale-transition"
          width="140"
          />
        </router-link>

        <!--<v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="/img/f8-2.png"
          width="100"
        />-->
      </div>

      <v-spacer></v-spacer>

      <!-- Contains the menu -->
      <slot name="header"></slot>

      <template v-slot:extension v-if="usingExtension">
        <!--<v-container class="">-->
          <slot name="extension">
            <span class="text-capitalize">
              {{title ? title : appName}}
            </span>
          </slot>
        <!--</v-container>-->
      </template>
    </v-app-bar>
    <v-main>
      <v-container
        class="fill-height"
        fluid
        >
          <slot />
      </v-container >
    </v-main>
  </v-app>
</template>

<script>
import {APP_NAME} from '@/constants.js' ;

export default {
  name:"HeaderLayout",
  props: {
    title: {
      type: String,
      default:()=>''
    }
  },

  data: () => ({
   drawer: null,
   appName:APP_NAME,

  }),

  computed: {
    usingExtension(){
      if(this.$slots.extension)
        {
        return true ;
        }
      return false ;
    }
  },

  components:{

  },

  methods:{

    }
  }
</script>
