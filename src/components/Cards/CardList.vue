<template lang="pug">
.bg-white.p-5.rounded-lg.relative.h-full.w-full.shadow-lg.divide-y.divide-y-4.divide-violet-400(
    class='md:w-1/2'
)
    div
        h1.pb-4.text-2xl.font-semibold.text-violet-400.drop-shadow.lg Front-end
            span.text-violet-800.ml-4.font-black &#60; &#47; &#62;

        .my-5
            .flex.items-center.pb-4.w-full.divide.divide-x-2.divide-violet-400(
                class='dark:border-gray-700',
                v-for='tech in technologies.frontend',
                :key='tech.name'
            )
                .w-14.h-14.p-2.mr-4.flex.justify-center.align-center
                    img(:src='tech.iconPath')
                h4.text-md.text-violet-500.pl-4.font-bold(class='dark:text-violet-100') {{ tech.name }}
    div
        h1.pb-4.text-2xl.font-semibold.text-violet-400.drop-shadow.lg.mt-4 Back-end
            span.text-violet-800.ml-4.font-black &#123; &#125;

        .my-5
            .flex.items-center.pb-4.w-full.divide.divide-x-2.divide-violet-400(
                class='dark:border-gray-700',
                v-for='tech in technologies.backend',
                :key='tech.name'
            )
                .w-14.h-14.p-2.mr-4.flex.justify-center.align-center
                    img(
                        :src='tech.iconPath',
                        :style='{ "padding-top": tech.name === "PHP" ? "10px" : "" }'
                    )
                h4.text-md.text-gray-900.pl-4(class='dark:text-gray-100') {{ tech.name }}
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    data() {
        return {
            technologies: {
                frontend: [
                    {
                        name: 'Vue 3',
                        // eslint-disable-next-line global-require
                        iconPath: require('@/assets/images/logos/vue-logo.svg'),
                    },
                    {
                        name: 'Vuex 4',
                        // eslint-disable-next-line global-require
                        iconPath: require('@/assets/images/logos/vuex-logo.svg'),
                    },
                    {
                        name: 'Vue Router 4',
                        // eslint-disable-next-line global-require
                        iconPath: require('@/assets/images/logos/vue-router-logo.png'),
                    },
                    {
                        name: 'Pug',
                        // eslint-disable-next-line global-require
                        iconPath: require('@/assets/images/logos/pug-logo.svg'),
                    },
                    {
                        name: 'Stylus',
                        // eslint-disable-next-line global-require
                        iconPath: require('@/assets/images/logos/stylus-logo.svg'),
                    },
                    {
                        name: 'Tailwind CSS',
                        // eslint-disable-next-line global-require
                        iconPath: require('@/assets/images/logos/tailwind-css-logo.svg'),
                    },
                ],
                backend: [
                    {
                        name: 'PHP',
                        // eslint-disable-next-line global-require
                        iconPath: require('@/assets/images/logos/php-logo.svg'),
                    },
                    {
                        name: 'MySQL',
                        // eslint-disable-next-line global-require
                        iconPath: require('@/assets/images/logos/my-sql-logo.svg'),
                    },
                ],
            },
        };
    },
});
</script>
