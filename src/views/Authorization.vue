<template>
  <!--contains reset password, login .-->
  <HeaderLayout>
    <div class="mx-auto" style="max-width:600px">
      <router-view />
    </div>
  </HeaderLayout>
</template>

<script>
import HeaderLayout from '@/layouts/HeaderLayout.vue' ;

export default {
  name:"Authorization",

  components:{
    HeaderLayout
  }
}
</script>


number
