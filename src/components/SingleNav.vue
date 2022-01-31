<template lang="pug">
nav.flex.items-center.justify-between.flex-wrap.bg-violet-500.p-2.drop-shadow-md
    .flex.items-center.flex-shrink-0.text-white.mr-6
        span.font-semibold.text-xl.tracking-tight To-Do ||
    .block(class='lg:hidden')
        button.flex.items-center.px-3.py-2.border.rounded.text-violet-200.border-violet-400(
            class='hover:text-white hover:border-white'
        )
            svg.fill-current.h-3.w-3(viewbox='0 0 20 20', xmlns='http://www.w3.org/2000/svg')
                title Menu
                path(d='M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z')
    .w-full.block.flex-grow(class='lg:flex lg:items-center lg:w-auto')
        .text-md(class='lg:flex-grow')
            router-link.block.mt-4.text-neutral-50.font-medium.mr-4(
                :to='{ name: "Home" }',
                class='lg:inline-block lg:mt-0 hover:font-black'
            )
                | Home
            router-link.block.mt-4.text-neutral-50.font-medium.mr-4(
                :to='{ name: "Technologies" }',
                class='lg:inline-block lg:mt-0 hover:font-black'
            )
                | Technologies
        div
            a.flex.flex-row.justify-center.align-center.items-center.text-sm.px-4.py-2.leading-none.border.rounded.text-white.border-white.mt-4.transition.duration-500.font-bold(
                href='https://github.com/afaferz',
                target='_blank',
                class='hover:border-transparent hover:text-violet-500 hover:bg-white lg:mt-0'
            )
                span GitHub
                img.inline-block.w-5.ml-3(src='@/assets/images/github.svg')
</template>

<style lang="stylus" scoped>
.router-link-exact-active
    font-weight: 900 !important;
</style>
