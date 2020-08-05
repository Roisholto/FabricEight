<template>
  <v-card elevation="2" rounded :min-width="$vuetify.breakpoint.xs ? undefined : 450">
    <v-card-title>Change Password</v-card-title>
    <v-card-text>
      <form method="post" v-on:submit.prevent="change_password" class="" v-if="isActive">
        <v-alert dismissible dense :type="respClass" v-model="alert.show" class="body-2">
          {{respMessage}}
          <router-link :to="{path:'/'}" v-show="resp.succ">Sign-in</router-link>
        </v-alert>
        <div class="mb-4">
          <v-text-field
            class=""
            type="password"
            name="oldpassword"
            v-model="form.current_password"
            required
            label="Current Password"
            placeholder="Current Password"/>
        </div>
        <div class="mb-4">
          <v-text-field
            class="form-control"
            type="password"
            name="newpassword"
            v-model="form.new_password"
            label="New password"
            required
            placeholder="New Password"
            />
        </div>
        <div class="mb-4">
          <v-btn
          block
          color="primary"
          type="submit"
          :loading="requesting">Change password</v-btn>
        </div>
      </form>
      <div v-else>
        No active session
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import {API_ENDPOINT} from '@/constants.js' ;

export default {
    name:"changePassword",
    data:function(){
        return {
            isActive:false,
            form:{
                current_password:'',
                new_password:''
            },
            resp:{

            },
            requesting:false,
            alert:{
              show:false
            }
        }
    },
    computed:{
        respLength:function(){
            return Object.keys(this.resp).length ;
        },
        respClass:function(){
            if(this.respLength)
                return this.resp.error ? "error" : "success"

            return 'notice' ;
        },
        respMessage:function(){
            if(this.respLength)
                {
                return this.resp.error ? this.resp.description : this.resp.message
                }
            return '';
        }
    },
    components:{

    },
    mounted:function(){
        this.isActive = this.isSessionActive() ;
    },
    methods:{
        isSessionActive:function(){
            return this.$store.getters['UserSession/isSessionActive'] ;
            },
        change_password:function(){
            let vm = this ;
            let url = `${API_ENDPOINT}/password/change` ;
            let options = {
                method:"POST",
                headers:
                    {
                    Authorization:"Bearer "+ this.$store.UserSession.token,
                    "Content-Type":"application/json",
                    },
                body:JSON.stringify(this.form)
            } ;

            this.requesting = true ;

            fetch(url, options)
                .then(function(resp){
                    return resp.json()
                })
                .then(function(json){
                    console.log('json is ',json)
                    vm.resp = json ;
                    vm.alert.show = true ;

                })
                .catch(function(e){
                    console.log('e', e);
                })
                .finally(function(){
                    vm.requesting= false ;
                })
        }
    }
}
</script>
