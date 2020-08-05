<template>
  <LeftNavLayout>
    <router-view />
  </LeftNavLayout>
</template>

<script>
import LeftNavLayout from '@/layouts/LeftNavLayout.vue'

export default {
  name: 'In',

  components: {
    LeftNavLayout
  },

  data: () => ({
    //
  }),
};
</script>
