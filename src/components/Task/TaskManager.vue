<template lang="pug">
.font-sans(class='md:container md:mx-auto')
    .grid.grid-cols-7.my-2
    .flex-1.flex-col
        button.bg-violet-500.text-white.font-bold.py-2.px-4.rounded-t-md.min-w-full.transition.duration-300(
            class='hover:bg-violet-900',
            @click='addTask'
        ) Adicionar Tarefa
        .flex-1.flex-col.bg-violet-300.rounded-b-md
            transition-group.flex.flex-col(
                v-if='taskList.length > 0',
                enter-active-class='transform-gpu',
                enter-class='opacity-0 -translate-x-full',
                enter-to-class='opacity-100 translate-x-0',
                leave-active-class='absolute transform-gpu',
                leave-class='opacity-100 translate-x-0',
                leave-to-class='opacity-0 -translate-x-full',
                tag='div',
                @before-leave='beforeLeave'
            )
                .task-list__box.rounded-lg.p-2.transition-all.duration-300(
                    v-for='(task, key, index) in taskList',
                    v-bind:key='task.id'
                )
                    TaskItem(:task='task')
            .bg-violet-500.p-2.text-center.text-md.font-black Add one task
    ModalAddTask
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue';
import { useStore } from '@/store';
import TaskItem from '@/components/Task/TaskItem.vue';
import ModalAddTask from '@/components/Task/ModalAddTask.vue';

export default defineComponent({
    name: 'TaskManager',
    components: {
        TaskItem,
        ModalAddTask,
    },
    async setup() {
        const store = useStore();
        const taskList = computed(() => store.getters['task/GET_ALL_TASKS']);
        const CONTROL_MODAL = (status: boolean) => store.commit('task/SET_SHOW_MODAL', status);
        const SET_ADD = () => store.commit('task/SET_ACTION_TASK_TYPE', 'add');

        await store.dispatch('task/GET_TASKS');

        return {
            taskList,
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
        beforeLeave(el: any) {
            const { marginLeft, marginTop, width, height } = window.getComputedStyle(el);

            console.log(window.getComputedStyle(el));
            // eslint-disable-next-line no-param-reassign
            el.style.left = `${el.offsetLeft - parseFloat(marginLeft)}px`;
            // eslint-disable-next-line no-param-reassign
            el.style.top = `${el.offsetTop - parseFloat(marginTop)}px`;
            // console.log(marginLeft)
            // eslint-disable-next-line no-param-reassign
            el.style.width = width;
            // eslint-disable-next-line no-param-reassign
            el.style.height = height;
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
