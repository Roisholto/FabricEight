<template>
  <v-list ref="theNavs" style="" dense>
    <v-list-item-group color="primary">
      <template v-for="(item, i) in items">
        <v-row
          v-if="item.heading"
          :key="i"
          align="center"
          >
          <v-col cols="6">
            <v-subheader v-if="item.heading" class="text-uppercase">
              {{ item.heading }}
            </v-subheader>
          </v-col>

        </v-row>
        <v-divider
          v-else-if="item.divider"
          :key="i"
          dark
          class="my-2"
        ></v-divider>

        <v-list-group
          v-else-if="item.children"
          :key="item.text"
          v-model="item.model"
          :prepend-icon="item.model ? item.icon : item['icon-alt']"
          append-icon=""
          >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>
                {{ item.text }}
              </v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item
            v-for="(child, i) in item.children"
            :key="i"
            :to="child.to"
            >
            <v-list-item-action v-if="child.icon">
              <v-icon>{{ child.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                {{ child.text }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>

        <v-list-item
          v-else
          :key="i"
          @click=" item.click ? item.click() : null"
          :to="item.to ? item.to : null"
          >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="grey--text">
              {{ item.text }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list-item-group>
  </v-list>
</template>
<script>

export default{
    name:"LeftNav",
    data:function(){
      return {
        items: [
          { icon: 'mdi-home', text: 'Home' , to:{name:'home', exact:true}},
          { heading: 'SELL' },
          { icon: 'mdi-circle-outline', text: 'Embroidery' , to:{name:'sell', exact:true}},
          ]
        }
    },
    computed:{

    },
    components:{

    },
    mounted:function(){

    },
    methods:{

    }

}
</script>
