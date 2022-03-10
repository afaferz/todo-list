<template lang="pug">
.flex.flex-row.justify-center.align-center.my-5(class='md:container md:mx-auto md:justify-start')
    .font-mono.font-black.flex.flex-col.justify-center.mr-2.pt-5.tracking-tight.text-purple-900(
        class='md:justify-center'
    )
        span.text-4xl A simple
        span.text-7xl.line-through.decoration-6 To-Do
    .h-32.w-32
        img(src='@/assets/images/post-it.svg')
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'TodoLogo',
});
</script>
