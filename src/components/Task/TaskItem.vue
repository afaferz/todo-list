<template lang="pug">
.h-fit.min-h-full.p-2.bg-white.rounded.relative.flex.flex-col.group.shadow-md(class='md:flex-row')
    .task-content.flex.flex-col
        .task-content__category.flex.flex-row
            span.py-1.px-3.font-bold.text-neutral-50.rounded-md(
                :class='{ "bg-emerald-300": task.status === "done" ? true : false, "bg-indigo-400": task.status === "pending" ? true : false }'
            ) {{ setStatus()[task.status] }}
            span {{ task.type }}
            span {{ task.id }}
        span {{ task.name }}
        span(v-if='task.description') {{ task.description }}
        span {{ task.createdAt }}
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
        button.bg-violet-500.rounded-md.p-1.transition.duration-200.ease-in-out(
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
</template>
<script lang="ts">
import { useStore } from '@/store';
import { defineComponent, PropType } from 'vue';

interface Task {
    id: number | null;
    name: string;
    status: string;
    type?: string;
    relevance: number;
    description?: string;
    createdAt: Date | string;
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
                status: 'planning',
                type: 'study',
                relevance: 0,
                description: 'A example description',
                createdAt: new Date().getDate(),
            }),
        },
    },
    setup() {
        const store = useStore();
        const CONTROL_MODAL = (status: boolean) => store.commit('task/SET_SHOW_MODAL', status);
        const SET_EDIT = () => store.commit('task/SET_ACTION_TASK_TYPE', 'edit');
        const SET_TASK = (id: number) => store.commit('task/EDIT_TASK', id);
        const DELETE_TASK = (id: number) => store.dispatch('task/DELETE_TASK', id);

        return {
            CONTROL_MODAL,
            SET_EDIT,
            SET_TASK,
            DELETE_TASK,
        };
    },
    methods: {
        editTask(id: number) {
            this.CONTROL_MODAL(true);
            this.SET_EDIT();
            this.SET_TASK(id);
        },
        deleteTask(id: number) {
            console.log(id);
            this.DELETE_TASK(id);
        },
        setStatus(status: string) {
            return {
                done: 'Feito',
                pending: 'A fazer',
            };
        },
    },
});
</script>
