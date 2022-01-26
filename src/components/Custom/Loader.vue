<template lang="pug">
.bg-violet-400.w-screen.h-screen.fixed.top-0.left-0
    .relative.absolute.bg-violet-400.rounded.h-96.w-96.flex(
        class='top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2'
    )
        .justify-center.align-center.p-10.h-4.relative.w-full.h-full
            .square.square-one.rounded.w-32.h-32.mx-2.my-2.bg-white.absolute
            .square.square-two.rounded.w-32.h-32.mx-2.my-2.absolute.bg-white(class='left-1/2')
            .square.square-three.rounded.w-32.h-32.mx-2.my-2.bg-white.absolute(class='top-1/2')
            .square.square-four.rounded.w-32.h-32.mx-2.my-2.bg-white.absolute(class='top-1/2 left-1/2')
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'LoaderDefault',
});
</script>

<style lang="stylus" scoped>
.square
    animation: background 1.5s infinite
.square-one
    animation-delay: .3s
.square-two
    animation-delay: .4s
.square-three
    animation-delay: .5s
.square-four
    animation-delay: .6s

@keyframes background {
    from {
        background-color: rgb(237 233 254);
    }
    to {
        background-color: rgb(124 58 237);
    }
}
</style>
