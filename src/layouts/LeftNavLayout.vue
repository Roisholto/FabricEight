<template>
    <v-app id="">
        <v-navigation-drawer
          v-model="drawer"
          app
          width="280"
          >
          <slot name="leftNav">
            <LeftNav/>
          </slot>
        </v-navigation-drawer>

        <v-app-bar
          app
          color="white"
          light
            >
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
            <div class="d-flex align-center">
              <v-img
                alt="Vuetify Logo"
                class="shrink mr-2"
                contain
                src="/img/f8logo.png"
                transition="scale-transition"
                width="140"
              />

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
            class=""
            fluid
            style="margin-bottom:80px"
            >
              <slot />
          </v-container >
        </v-main>
    </v-app>
</template>

<script>
import LeftNav from '@/components/LeftNav.vue' ;
import {APP_NAME} from '@/constants.js' ;

export default {
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
    LeftNav,
  },

  methods:{

    }
  }
</script>
