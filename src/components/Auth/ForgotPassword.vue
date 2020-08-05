<template>
  <v-card elevation="2" rounded>
    <v-card-title class="text">Forgot password</v-card-title>
    <v-card-subtitle v-if="!respStatus">
      Enter your email address to locate your account
    </v-card-subtitle>
    <v-card-text class="">
      <p v-if="respStatus">
          A link to reset your password has been sent to your mail box
      </p>
      <form action="api/forgot-password" ref="form01" method="POST" v-on:submit.prevent="submit_form" v-else>

        <v-alert dense dismissible v-model="alert.show" :type="alert.type" class="body-2">
          {{alert.message}}
        </v-alert>
        <div class="mb-2">
          <v-text-field
            type="email"
            class="form-control"
            name="email"
            id="email"
            label="Email address"
            placeholder="Enter your email"
            v-model="form.email"
            required/>
        </div>
        <div class="text-right">
          <v-btn
            type="submit"
            :loading="requesting"
            color="primary"
            id="f-submit">
            Find account
          </v-btn>
        </div>
      </form>
    </v-card-text>
  </v-card>
</template>
<script>
import {API_ENDPOINT} from '@/constants.js' ;

export default {
    name:"forgotPassword",
    data:function(){
      return {
        respStatus:false,
        requesting: false,
        form:{
          email:null,
        },
        alert:{
          show:false,
          type:'error',
          message:''
        }
      }
    },

    methods:{
      submit_form:function()
        {
        let vm = this ;
        let data= this.form ;

        let url = API_ENDPOINT+'/password/forgot'
        vm.requesting = true ;

        fetch(url, {
          method:"POST",
          body: data,
          headers:{
            'Content-Type': 'application/x-www-form-urlencoded',
          }
        })
        .then(function(r){
          return r.json() ;
        })
        .then(function(json){
          if (json.succ)
            {
            vm.respStatus = true ;
            }
          else
            {
            // DISPLAY THE ERROR
            vm.alert = {
              message:json.description,
              show:true,
              type:'error'
              }
            }
        })
        .catch(function(e){
          console.log('Error encountered', e)
        })
        .finally(function(){
          vm.requesting = false ;
        });
      }
    }
}
</script>
