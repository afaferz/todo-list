<template lang="pug">
.font-sans(class='md:container md:mx-auto')
    .grid.grid-cols-7.my-2
    .flex-1.flex-col
        button.bg-violet-500.text-white.font-bold.py-2.px-4.rounded-t-md.min-w-full.transition.duration-300(
            class='hover:bg-violet-900',
            @click='addTask'
        ) Adicionar Tarefa
        .flex-1.flex-col.bg-violet-300.rounded-b-md
            TaskList(:tasks-list='highPriorityTasks', :tasks-priority='"HIGH"')
        .flex-1.flex-col.bg-violet-300.rounded-b-md
            TaskList(:tasks-list='mediumPriorityTasks', :tasks-priority='"MEDIUM"')
        .flex-1.flex-col.bg-violet-300.rounded-b-md
            TaskList(:tasks-list='lowPriorityTasks', :tasks-priority='"LOW"')
    ModalAddTask
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useStore } from '@/store';
import TaskList from '@/components/Task/TaskList.vue';
import ModalAddTask from '@/components/Task/ModalAddTask.vue';

export default defineComponent({
    name: 'TaskManager',
    components: {
        TaskList,
        ModalAddTask,
    },
    async setup() {
        const store = useStore();
        await store.dispatch('task/GET_TASKS');
        const highPriorityTasks = computed(() => store.getters['task/GET_TASKS_BY_PRIORITY'](3));
        const mediumPriorityTasks = computed(() => store.getters['task/GET_TASKS_BY_PRIORITY'](2));
        const lowPriorityTasks = computed(() => store.getters['task/GET_TASKS_BY_PRIORITY'](1));
        const CONTROL_MODAL = (status: boolean) => store.commit('task/SET_SHOW_MODAL', status);
        const SET_ADD = () => store.commit('task/SET_ACTION_TASK_TYPE', 'add');

        return {
            highPriorityTasks,
            mediumPriorityTasks,
            lowPriorityTasks,
            CONTROL_MODAL,
            SET_ADD,
        };
    },
    data() {
        return {
            classes: ['bg-indigo-500', 'bg-green-500', 'bg-rose-600'] as string[],
            showModalAddTask: false,
        };
    },
    methods: {
        addTask() {
            this.CONTROL_MODAL(true);
            this.SET_ADD();
        },
    },
});
</script>
<style lang="stylus" scoped>
.fade-enter-active,
.fade-leave-active
  transition: opacity .4s linear;

.fade-enter,
.fade-leave-to
  opacity: 0;
</style>
