<template lang="pug">
SingleNav
RouterView
</template>

<script lang="ts">
import SingleNav from '@/components/SingleNav.vue';

import { defineComponent } from 'vue';

export default defineComponent({
    components: {
        SingleNav,
    },
});
</script>

<style lang="stylus">
#app
  color #2c3e50
</style>
