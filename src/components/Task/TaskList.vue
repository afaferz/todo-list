<template lang="pug">
.font-sans(class='md:container md:mx-auto')
    .grid.grid-cols-7.my-2
        h1 Task Priority {{ tasksPriority }}
    .flex-1.flex-col.bg-violet-300.rounded-b-md
        transition-group.flex.flex-col(
            v-if='tasksList.length > 0',
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
                v-for='(task, key, index) in tasksList',
                v-bind:key='task.id'
            )
                SingleTask(:task='task')
        .bg-violet-400.p-2.text-center.text-lg.font-black.h-44.flex.items-center.justify-center(
            v-else
        ) Congratulations! No task to do
            span.ml-2.text-3xl &#x1F973;
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SingleTask from '@/components/Task/SingleTask.vue';
import ModalAddTask from '@/components/Task/ModalAddTask.vue';

export default defineComponent({
    name: 'TaskManager',
    components: {
        SingleTask,
        ModalAddTask,
    },
    props: {
        tasksList: {
            type: Array,
            default: () => [],
        },
        tasksPriority: {
            type: String,
            default: 'HIGH',
        },
    },
    setup(props) {
        const tasksDone = props.tasksList.filter((item) => item.status === true);
        const tasksPending = props.tasksList.filter((item) => item.status === false);
        return {
            tasksDone,
            tasksPending,
        };
    },
    data() {
        return {
            classes: ['bg-indigo-500', 'bg-green-500', 'bg-rose-600'] as string[],
            showModalAddTask: false,
        };
    },
    methods: {
        beforeLeave(el: HTMLElement) {
            const { marginLeft, marginTop, width, height } = window.getComputedStyle(el);

            const element = el;

            element.style.left = `${el.offsetLeft - parseFloat(marginLeft)}px`;
            element.style.top = `${el.offsetTop - parseFloat(marginTop)}px`;
            element.style.width = width;
            element.style.height = height;
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
