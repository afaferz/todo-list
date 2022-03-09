<template lang="pug">
.bg-violet-50.min-h-screen.mx-auto.p-4.flex.justify-center.align-center
    CardList
</template>
<script lang="ts">
import CardList from '@/components/Cards/CardList.vue';
import { defineComponent } from 'vue';

export default defineComponent({
    components: {
        CardList,
    },
});
</script>
