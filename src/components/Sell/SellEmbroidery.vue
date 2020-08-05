<template>
  <div>
    <v-stepper v-model="step">
      <v-stepper-header>
        <v-stepper-step :complete="step > 1" step="1">Basic Info</v-stepper-step>
        <v-divider></v-divider>

        <v-stepper-step :complete="step > 2" step="2">Product Params</v-stepper-step>
        <v-divider></v-divider>

        <v-stepper-step :complete="form_valid" step="3">Pricing</v-stepper-step>
      </v-stepper-header>

      <v-form ref="form" v-model="form_valid">
        <v-stepper-items>
          <v-stepper-content step="1">
            <v-card>
              <v-text-field
                v-model="form.name"
                name="name"
                placeholder="Name"
                label="Name"
                :rules="[rules.required]"
                />

              <v-text-field v-model="form.description" name="description" placeholder="Description" label="Description"/>

              <v-text-field
                style="width:50%"
                v-model.number="form.quantity"
                name="quantity"
                placeholder="Quantity"
                label="Quantity"
                type="number"
                min="1"
                :rules="[rules.required]"
                />

              <v-text-field
                v-model="form.collection_date"
                name="collection_date"
                placeholder="Collection date"
                label="Collection date"
                type="date"/>
              <v-card-actions class="justify-end">
                <v-btn color="primary" class="" @click="validate_part_1">
                  Continue
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-stepper-content>

          <v-stepper-content step="2">
            <v-card>
              <div class="text-right">
                <div class="caption mb-n2">Unit price</div>
                <div class="text-h6">{{naija_currency(unit_price)}}</div>
              </div>
              <div class="row">
                <div class="col-6 py-1" v-for="(param, index) in params" :key="index">
                  <v-text-field
                    :label="param.name"
                    :placeholder="param.name"
                    readonly
                    v-model.number="form[param.depends]"
                    :rules="[rules.required]"
                    class=""
                    v-if="param.depends">
                  </v-text-field>
                  <v-text-field
                    :label="param.name"
                    :placeholder="param.name"
                    v-model.number="input_params[index]"
                    :rules="[rules.required]"
                    class=""
                    v-else>
                  </v-text-field>
                </div>
              </div>

              <v-card-actions class="justify-end">
                <v-btn @click="step=1">PREVIOUS</v-btn>
                <v-btn color="primary" class="" @click="step=3">
                  Continue
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-stepper-content>

          <v-stepper-content step="3">
            <v-card>
              <div class="d-flex justify-space-between">
                <div class="text-right">
                  <div class="caption mb-n2">Sub-Total</div>
                  <div class="text-h6">{{naija_currency(order_price)}}</div>
                </div>

                <div class="">
                  <div class="text-right">
                    <div class="caption mb-n2">Grand Total</div>
                    <div class="text-h4">{{naija_currency(grand_total)}}</div>
                  </div>
                </div>
              </div>

              <div class="d-flex justify-start">
                <div style="max-width:140px">
                  <v-text-field
                    v-model.number="form.discount"
                    type="number"
                    name="discount"
                    placeholder="Discount"
                    label="Discount" />
                </div>
              </div>

              <div class="d-flex justify-start">
                <v-text-field
                  style="max-width:140px"
                  name="amount_paid"
                  placeholder="Amount paid"
                  label="Amount paid"
                  type="number"
                  v-model.number="form.amount_paid"
                  />
              </div>

              <div class="d-flex justify-start">
                <div class="text-right">
                  <div class="caption mb-n2">Balance Due</div>
                <div class="text-h6">{{naija_currency(balance_due)}}</div>
                </div>
              </div>





              <!--<v-text-field name="total" placeholder="Total" label="Total" readonly />-->


              <v-card-actions class="justify-end">
                <v-btn @click="step=2">PREVIOUS</v-btn>
                <v-btn color="primary" class="" :disabled="!form_valid" @click="finish">
                  Finish
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-stepper-content>
        </v-stepper-items>
      </v-form>
    </v-stepper>
  </div>
</template>

<script>
import {required} from '@/utils/rules.js' ;
import {naija_currency} from '@/utils/to_currency.js' ;

export default {
  name:"SellEmbroidery",

  data(){
    return {
      step:1,
      input_params:[],

      rules:{
        required
      },

      form_valid:false,

      form:{
        name: null,
        description: null,
        quantity: null,
        discount: null,
        total: null,
        amount_paid: null,
        collection_date: null
      },

      // balance_due:null,
      params:[
        // operator ['<', '>', '=', 'range']
        // action ['increment', 'decrement']
        // by ['value', 'percentage'] ;
        {
          name:'size',
          depends:null,
          options:[
            {operator:'<', value:3, action:{operation:'increment', by:150, 'is_percentage':false}},
            {operator:'=', value:3, action:{operation:'increment', by:200, 'is_percentage':false}},
            {operator:'range', value:[3,5], action:{operation:'increment', by:250, 'is_percentage':false}},
            {operator:'range', value:[6,7], action:{operation:'increment', by:300, 'is_percentage':false}},
            {operator:'>', value:7, action:{operation:'increment', by:500, 'is_percentage':false}}
          ]
        },
        {
          name:'no of colors',
          depends:null,
          options:[
            {operator:'=', value:2, action:{operation:'increment', by:0, 'is_percentage':false}},
            {operator:'=', value:3, action:{operation:'increment', by:0, 'is_percentage':false}},
            {operator:'=', value:4, action:{operation:'increment', by:10, 'is_percentage':false}},
            {operator:'range', value:[5,6], action:{operation:'increment', by:20, 'is_percentage':false}},
            {operator:'>', value:7, action:{operation:'increment', by:30, 'is_percentage':false}}
          ]
        },
        {
          name:'no of stitches',
          depends:null,
          options:[
            {operator:'<', value:5000, action:{operation:'increment', by:0, 'is_percentage':false}},
            {operator:'range', value:[5000,12000], action:{operation:'increment', by:0, 'is_percentage':false}},
            {operator:'range', value:[12001,20000], action:{operation:'increment', by:10, 'is_percentage':false}},
            {operator:'>', value:20000, action:{operation:'increment', by:20, 'is_percentage':false}}
          ]
        },
        {
          name:'time(minutes)',
          depends:null,
          options:[
            {operator:'<', value:3, action:{operation:'increment', by:0, 'is_percentage':false}},
            {operator:'range', value:[3,7], action:{operation:'increment', by:0, 'is_percentage':false}},
            {operator:'range', value:[8,15], action:{operation:'increment', by:10, 'is_percentage':false}},
            {operator:'>', value:15, action:{operation:'increment', by:20, 'is_percentage':false}}
          ]
        },
        {
          name:'quantity',
          depends:'quantity',
          options:[
            {operator:'range', value:[10,20], action:{operation:'increment', by:10, 'is_percentage':false}},
            {operator:'range', value:[21,50], action:{operation:'increment', by:0, 'is_percentage':false}},
            {operator:'range', value:[51,100], action:{operation:'decrement', by:10, 'is_percentage':false}},
            {operator:'>', value:100, action:{operation:'decrement', by:20, 'is_percentage':false}},
            {operator:'<', value:10, action:{operation:'increment', by:20, 'is_percentage':false}},
          ]
        }
      ]
    }
  },

  computed:{
    "balance_due":function(){
      return  this.form.amount_paid - this.grand_total;
    },

    unit_price:function(){
      return this.calculateParams(this.input_params)
    },

    order_price(){
      return this.unit_price * this.form.quantity
    },

    grand_total(){
      return this.order_price - this.form.discount
    }
  },

  watch:{

  },

  methods:{
    naija_currency,

    calculateParams(input){
      let amt = 0 ;
      let vm = this ;

      const action = function (action){
        if(action.operation == 'increment')
          {
          amt+= action.by ;
          }
        else
          {
          // decrement ;
          amt-=action.by ;
          }
        }

      vm.params.forEach(function(v,i){
        let value = v.depends ? vm.form[v.depends] : input[i] ? input[i] : 0;

        for(let j = 0; j<v.options.length ; j++){
          let opt = v.options[j] ;

          if(opt.operator == '=')
            {
            if(value == opt.value){
                action(opt.action) ;
                break ;
              }
            }
          else if(opt.operator == 'range')
            {
            if(value >= opt.value[0] && value <= opt.value[1] )
              {
                action(opt.action) ;
                break ;
              }
            }
          else if(opt.operator == '<')
            {
            if(value < opt.value)
              {
              action(opt.action)
              break ;
              }
            }
          else if(opt.operator == '>')
            {
            if(value > opt.value)
              {
              action(opt.action)
              break ;
              }
            }


        }
      })

      return amt ;
    },

    finish(){

    },

    validate_part_1(){
      this.step = 2
    }
  }
}
</script>
