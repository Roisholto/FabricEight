<template>
  <LeftNavLayout>
    <router-view />
  </LeftNavLayout>
</template>

<script>
import LeftNavLayout from './layouts/LeftNavLayout.vue'
export default {
  name: 'App',

  components: {
    LeftNavLayout
  },

  data: () => ({
    //
  }),
};
</script>
