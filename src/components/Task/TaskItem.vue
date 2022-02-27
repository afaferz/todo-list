<template lang="pug">
.h-fit.min-h-full.p-2.bg-white.rounded.relative.flex.flex-col.group.shadow-md(class='md:flex-row')
    .task-content.flex.flex-col
        .task-content__category.flex.flex-row
            span(
                :class='[{ "bg-emerald-300": task.status, "bg-indigo-400": !task.status }, classes.chip]'
            ) {{ task.status ? 'Feito' : 'A fazer' }}
            span(:class='[classes.chip, "bg-indigo-300", "ml-2"]') {{ task.type }}
            span {{ task.id }}
        span.font-bold.my-3 {{ task.name }}
        span(v-if='task.description') {{ task.description }}
        .flex.flex-col.mt-5
            span.uppercase.font-semibold.text-sm Tarefa criada em:
            span.text-sm {{ formatDate(task.created_at) }}
    .flex.justify-end.mt-4.align-self-end.transition.duration-700(
        class='md:mt-0 md:absolute md:top-1/2 md:-translate-y-1/2 md:right-4'
    )
        button.bg-violet-500.rounded-md.mr-3.p-1.transition.duration-200.ease-in-out(
            @click='editTask(task.id)',
            class='md:opacity-0 group-hover:opacity-100'
        )
            svg.h-5.w-5.fill-white(
                xmlns='http://www.w3.org/2000/svg',
                viewbox='0 0 20 20',
                fill='currentColor'
            )
                path(
                    d='M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z'
                )
        button.bg-violet-500.rounded-md.mr-3.p-1.transition.duration-200.ease-in-out(
            @click='deleteTask(task.id)',
            class='md:opacity-0 group-hover:opacity-100'
        )
            svg.h-5.w-5.fill-white(
                xmlns='http://www.w3.org/2000/svg',
                viewbox='0 0 20 20',
                fill='currentColor'
            )
                path(
                    fill-rule='evenodd',
                    d='M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z',
                    clip-rule='evenodd'
                )
        button.bg-violet-500.rounded-md.p-1.transition.duration-200.ease-in-out(
            @click='finishTask(task.id, task.status)',
            class='md:opacity-0 group-hover:opacity-100'
        ) DONE
</template>
<script lang="ts">
import { useStore } from '@/store';
import { computed, defineComponent, PropType } from 'vue';

interface Task {
    id: number | null;
    name: string;
    status: boolean;
    type?: string;
    relevance: number;
    description?: string;
}

export default defineComponent({
    name: 'TaskItem',
    props: {
        task: {
            type: Object as PropType<Task>,
            required: false,
            default: () => ({
                id: 1,
                name: 'One task',
                status: false,
                type: 'study',
                relevance: 0,
                description: 'A example description',
            }),
        },
    },
    setup() {
        const store = useStore();
        const CONTROL_MODAL = (status: boolean) => store.commit('task/SET_SHOW_MODAL', status);
        const SET_EDIT = () => store.commit('task/SET_ACTION_TASK_TYPE', 'edit');
        const SET_TASK = (id: number) => store.commit('task/EDIT_TASK', id);
        const SET_TASK_STATUS = (status: { id: number; done: boolean }) => store.commit('task/SET_TASK_STATUS', status);
        const DELETE_TASK = (id: number) => store.dispatch('task/DELETE_TASK', id);

        return {
            CONTROL_MODAL,
            SET_EDIT,
            SET_TASK,
            SET_TASK_STATUS,
            DELETE_TASK,
        };
    },
    data() {
        return {
            classes: {
                chip: 'py-1 px-3 font-bold text-neutral-50 rounded-md',
            },
        };
    },
    methods: {
        editTask(id: number) {
            this.CONTROL_MODAL(true);
            this.SET_EDIT();
            this.SET_TASK(id);
        },
        deleteTask(id: number) {
            this.DELETE_TASK(id);
        },
        finishTask(id: number, taskStatus: string) {
            this.SET_TASK_STATUS({ id, done: !taskStatus });
        },
        formatDate(date: string) {
            console.log(date);
        },
    },
});
</script>
