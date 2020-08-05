<template>
  <v-tabs>
    <v-tab>
      Embroidery
    </v-tab>

    <v-tab-item>
      <div class="row">
        <div class="col-md-6 col-sm-8 col-12 mx-auto">
          <v-card>
            <SellEmbroidery />
          </v-card>
        </div>
      </div>
    </v-tab-item>
  </v-tabs>
</template>

<script>
import SellEmbroidery from '@/components/Sell/SellEmbroidery.vue' ;

export default {
  name:"Sell",

  data(){
    return {

    }
  },

  components:{
    SellEmbroidery
  }
}
</script>
