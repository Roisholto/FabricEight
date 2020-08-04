<template>
  <div>

    <v-row>
      <v-col cols="6" lg="3" sm="4" v-for="(item, index) in items" :key="index">
        <v-card :to="item.route" elevation="2" rounded hover>
          <v-list-item>
            <v-list-item-avatar tile size="80">
              <v-img :src="item.image" ></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>
                {{item.name}}
              </v-list-item-title>
              <v-list-item-subtitle>
                {{item.description}}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name:"Actions",

  data(){
    return {

      items:[
        {
          name:'Sell',
          description:'Select from the list of sellable services and product',
          image:'/svg/add_cart.svg',
          icon:null,
          route:{name:'sell'}
        },
        {
          name:'Create Profile',
          description:'Create a new user profile with specific authorizations',
          image:'/svg/add_user.svg',
          icon:null,
          route:{name:'create-user'}
        },
      ]
    }
  }
}
</script>

<style lang="css" scoped>
</style>
