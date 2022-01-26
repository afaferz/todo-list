<template lang="pug">
.bg-violet-50.min-h-screen.mx-auto.py-4
    TodoLogo
    Suspense
        template(#default)
            TaskManager
        template(#fallback)
            teleport(to='body')
                LoaderDefault
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TaskManager from '@/components/Task/TaskManager.vue';
import LoaderDefault from '@/components/Custom/Loader.vue';
import TodoLogo from '@/components/Custom/TodoLogo.vue';

export default defineComponent({
    components: {
        TaskManager,
        LoaderDefault,
        TodoLogo,
    },
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    // setup() {},
});
</script>
