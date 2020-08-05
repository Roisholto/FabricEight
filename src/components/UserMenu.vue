<template>
  <v-menu offset-y>
    <template v-slot:activator="{on, attrs}">
      <v-avatar
        v-bind="attrs"
        color="primary"
        size="32"
        v-on="on">
        <v-icon color="white">mdi-account</v-icon>
      </v-avatar>
    </template>

    <v-list dense>
      <v-list-item class="" :to="menu.to" v-for="(menu, index) in menus" :key="index">
        <v-list-item-icon class="mr-3">
          <v-icon color="">{{menu.icon}}</v-icon>
        </v-list-item-icon>
        <v-list-item-title>{{ menu.text }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  name:"UserMenu",

  data(){
    return {
      menus:[
        { icon: 'mdi-login', text: 'Login' , to:{name:'sign-in', exact:true}},
        { icon: 'mdi-logout', text: 'Logout' , to:{name:'sign-out', exact:true}},
      ]
    }
  }
}
</script>

<style lang="css" scoped>
</style>
