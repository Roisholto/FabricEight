<template>
    <v-card elevation="2" rounded :min-width="$vuetify.breakpoint.xs ? undefined : 450">
      <v-card-title>Reset Password</v-card-title>
      <v-card-subtitle v-if="refValid">Enter your new password below</v-card-subtitle>
      <v-card-text v-if="!refValid">
        <div v-if="verificationState == 0">
          <h5>
            The link seems invalid , try generate another one  <router-link :to="{name:'forgot-password'}">here</router-link>
          </h5>
        </div>
        <div v-else>
          Link verification running . . .
        </div>
      </v-card-text>
      <template v-else>
        <v-card-text class="py-4">
          <template v-if="! respSucc">
            <div :key="1">

              <form @submit.prevent="submitForm" ref="theForm" method="POST" >
                <v-alert dismissible dense :type="alert.type" v-model="alert.show" class="body-2">
                  {{alert.message}}
                </v-alert>
                <div class="">
                  <v-text-field
                    type="password"
                    name="password"
                    id="npass"
                    label="New password"
                    placeholder="Password"
                    hint="Input your password"
                    v-model="form_data.password"
                    required />

                    <input type="hidden" name="ref" v-model="form_data.ref">
                </div>
                <div class="text-right">
                  <v-btn type="submit" color="primary" :loading="resetting" id="f-submit">Reset</v-btn>
                </div>
              </form>
            </div>
          </template>
          <template v-else>
            <div class="text-center" :key="2">

            <v-icon color="primary" size="80">
              mdi-check-circle
            </v-icon>

            <p>Password updated, proceed to <router-link v-bind:to="{name:'sign-in'}">Login</router-link></p>
          </div>
        </template>
      </v-card-text>
    </template>
  </v-card>
</template>

<script>
import {API_ENDPOINT} from '@/constants.js' ;

export default {
    name:"resetPassword",
    data:function (){
        return {
            form_data:{
                password: '',
                ref: '',
                },
            respSucc: false,
            refValid: false,
            verificationState : 0,
            resetting:false,
            alert:{
              message:'',
              show:false,
              type:'error'
              }
            }
        },
    components:{

    },
    beforeMount:function()
        {
        if(this.$route.query.ref)
          {
          this.check_ref() ;
          }
      },

    methods:{
      check_ref:function(){
        let vm = this ;
        let the_url = API_ENDPOINT+'/password/reset' ;
        this.verificationState = 1 ;
        fetch(the_url+'?ref='+this.$route.query.ref)
          .then(function(resp){return resp.json()})
          .then(function(json){
            if(json.succ)
              {
              vm.refValid = true ;
              vm.form_data.ref = vm.$route.query.ref
              }
            else
              {
              vm.alert.message = json.description ;
              vm.alert.show = true ;
              }
          })
        .catch(function(e){
          console.log('ref validation error', e)
        })
        .finally(function(){
          vm.verificationState = 0 ;
        })
      },

    submitForm:function(){
      if(this.resetting)
        {
        return
        }
      this.resetting = true ;
      const vm = this ;
      let url = `${API_ENDPOINT}/password/reset?ref=${this.$route.query.ref}` ;
      vm.form_data.ref = this.$route.query.ref ;
      let data = this.form_data ;
      fetch(url,
        {
          method:"POST",
          body:data,
          headers:{
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
        .then(function(r){
          return r.json()
        })
        .then(function(json){
          if (json.succ)
            {
            vm.respSucc = true ;
            }
          else
            {
            // DISPLAY THE ERROR
            vm.alert.message = json.description ;
            vm.alert.type = 'error',
            vm.alert.show = true ;
            }
        })
        .catch(function(e){
          console.log('Error resetting', e)
        })
        .finally(function(){
          vm.resetting = false
        })
    },
  }
}

</script>
