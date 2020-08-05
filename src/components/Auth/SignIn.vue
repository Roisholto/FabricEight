<template lang="html">
  <v-form v-model="form_valid">
    <v-card elevation="2" rounded :min-width="$vuetify.breakpoint.xs ? undefined : 450">
      <v-card-title>Sign-In</v-card-title>
      <v-card-text class=" pb-2">
        <v-text-field name="username" label="username" placeholder="username" v-model="form.username" />
        <v-text-field name="password" type="password" label="password" placeholder="password" v-model="form.password" />
      </v-card-text>
      <v-card-actions class="justify-end flex-column pb-6 px-4 ">
        <v-btn color="primary" block>Sign in</v-btn>

        <v-divider class="my-6" style="width:100%;"/>

        <div class="d-flex jusitfy-space-between">
          <router-link :to="{ name: 'forgot-password'}" class="px-2 body-2">Forgot password</router-link>
          <v-divider vertical />
          <router-link :to="{ name: 'reset-password'}" class="px-2 body-2">Reset password</router-link>
        </div>
      </v-card-actions>

    </v-card>
  </v-form>
</template>

<script>
export default {
  name:"SignIn",

  data(){
    return {
      form_valid: false,
      form:{
        username:null,
        password:null,
      }
    }
  }
}
</script>

<style lang="css" scoped>
</style>
