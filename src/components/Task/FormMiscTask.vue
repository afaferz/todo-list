<template lang="pug">
form.form-content
    .space-y-4
        .flex.flex-col
            label(:class='[...classes.label]', for='title') Title:
            input#title(
                v-model='taskName'
                :class='[...classes.input]',
                type='text',
                placeholder='Task title',
            )
        .flex.flex-col
            label(:class='[...classes.label]', for='status') Status:
            select#status.bg-white(:class='[...classes.input]', v-model='taskStatus')
                option(value='false') To-Do
                option(value='true') Done
        .flex.flex-col
            label(:class='[...classes.label]', for='type') Tipo:
            input#type(
                v-model='taskType'
                :class='[...classes.input]',
                type='text',
                placeholder='Task type',
            )
        .flex.flex-col
            label(:class='[...classes.label]', for='priority') Grau de Prioridade:
            input#priority.form-range.appearance-none.outline-none.w-full.text-md.bg-transparent(
                v-model.number='taskPriority'
                class='focus:outline-none focus:ring-0 focus:shadow-none',
                type='range',
                min='1',
                max='3',
                step='1',
            )
            ul.flex.flex-row.justify-between.w-full(class='px-[10px]')
                li.flex.justify-center.relative(
                    v-for='({ label, value }, index) in rangeOptions',
                    :key='value'
                )
                    .flex.flex-col.absolute.text-violet-400.font-sans.font-bold.level-priority(
                        :style='{ left: rangeSpace[index].left, right: rangeSpace[index].right }'
                    )
                        span.marker-priority
                        span {{ label }}
        .flex.flex-col.pt-7
            label(:class='[...classes.label]', for='description') Description:
            textarea#description.w-full.font-serif.p-4.text-gray-600.bg-violet-100.outline-none.rounded-md.resize-none(
                v-model='taskDescription'
                class='focus:ring focus:ring-violet-500',
                placeholder='write about task here..',
                cols='30',
                rows='4',
            )
</template>
<script lang="ts">
import { defineComponent, computed, WritableComputedRef } from 'vue';
import { useStore } from '@/store';

export default defineComponent({
    name: 'FormMiscTask',
    setup() {
        const store = useStore();

        const taskName: WritableComputedRef<string> = computed({
            get(): string {
                return store.getters['task/GET_TASK_NAME'];
            },
            set(val: string): void {
                store.commit('task/UPDATE_TASK_FIELD', ['name', val]);
            },
        });
        const taskStatus: WritableComputedRef<string> = computed({
            get(): string {
                return store.getters['task/GET_TASK_STATUS'];
            },
            set(val: string): void {
                store.commit('task/UPDATE_TASK_FIELD', ['status', val]);
            },
        });
        const taskType: WritableComputedRef<string> = computed({
            get(): string {
                return store.getters['task/GET_TASK_TYPE'];
            },
            set(val: string): void {
                store.commit('task/UPDATE_TASK_FIELD', ['type', val]);
            },
        });
        const taskPriority: WritableComputedRef<string> = computed({
            get(): string {
                return store.getters['task/GET_TASK_PRIORITY'];
            },
            set(val: string): void {
                store.commit('task/UPDATE_TASK_FIELD', ['priority', val]);
            },
        });
        const taskDescription: WritableComputedRef<string> = computed({
            get(): string {
                return store.getters['task/GET_TASK_DESCRIPTION'];
            },
            set(val: string): void {
                store.commit('task/UPDATE_TASK_FIELD', ['description', val]);
            },
        });
        return {
            taskName,
            taskStatus,
            taskType,
            taskPriority,
            taskDescription,
        };
    },
    data() {
        return {
            classes: {
                label: [
                    'text-left',
                    'text-lx',
                    'font-mono',
                    'pl-1',
                    'pb-2',
                    'uppercase',
                    'font-bold',
                ],
                input: [
                    'rounded-md',
                    'outline-none',
                    'py-1',
                    'px-2',
                    'text-md',
                    'border-2',
                    'focus:ring',
                    'focus:ring-violet-500',
                ],
            },
            rangeOptions: [
                {
                    label: 'LOW',
                    value: 1,
                },
                {
                    label: 'MEDIUM',
                    value: 2,
                },
                {
                    label: 'HIGH',
                    value: 3,
                },
            ],
            rangeSpace: [
                { left: '-9px', right: '' },
                { left: '1px', right: '0' },
                { left: '-28px', right: '' },
            ],
        };
    },
});
</script>
<style lang="stylus" scoped>
.form-content
    width: 550px;
.level-priority
    justify-content: center
    align-content: center
    align-items: center
    .marker-priority
        display: inline-block
        background: rgb(167 139 250);
        width: 2px
        height: 10px

input[type=range]
    -webkit-appearance: none;
    margin: 10px 0;
    width: 100%;

input[type=range]:focus
    outline: none;

input[type=range]::-webkit-slider-runnable-track
    width: 100%;
    height: 10px;
    cursor: pointer;
    animate: 0.2s;
    box-shadow: 0px 0px 0px #000000, 0px 0px 0px #0d0d0d;
    background: #ac51b5;
    border-radius: 25px;
    border: 0px solid #000101;

input[type=range]::-webkit-slider-thumb
    box-shadow: 0px 0px 0px #000000, 0px 0px 0px #0d0d0d;
    border: 0px solid #000000;
    height: 20px;
    width: 39px;
    border-radius: 7px;
    background: #65001c;
    cursor: pointer;
    -webkit-appearance: none;
    margin-top: -3.6px;

input[type=range]:focus::-webkit-slider-runnable-track
  background: #ac51b5;

input[type=range]::-moz-range-track
    width: 100%;
    height: 12.8px;
    cursor: pointer;
    animate: 0.2s;
    box-shadow: 0px 0px 0px #000000, 0px 0px 0px #0d0d0d;
    background: rgb(139 92 246);
    border-radius: 25px;
    border: 0px solid #000101;

input[type=range]::-moz-range-thumb
    box-shadow: 0px 0px 0px #000000, 0px 0px 0px #0d0d0d;
    border: 0px solid #000000;
    height: 20px;
    width: 39px;
    border-radius: 7px;
    background: rgb(76 29 149);
    cursor: pointer;

input[type=range]::-ms-track
    width: 100%;
    height: 12.8px;
    cursor: pointer;
    animate: 0.2s;
    background: transparent;
    border-color: transparent;
    border-width: 39px 0;
    color: transparent;

input[type=range]::-ms-fill-lower
    background: #ac51b5;
    border: 0px solid #000101;
    border-radius: 50px;
    box-shadow: 0px 0px 0px #000000, 0px 0px 0px #0d0d0d;

input[type=range]::-ms-fill-upper
    background: #ac51b5;
    border: 0px solid #000101;
    border-radius: 50px;
    box-shadow: 0px 0px 0px #000000, 0px 0px 0px #0d0d0d;

input[type=range]::-ms-thumb
    box-shadow: 0px 0px 0px #000000, 0px 0px 0px #0d0d0d;
    border: 0px solid #000000;
    height: 20px;
    width: 39px;
    border-radius: 7px;
    background: #65001c;
    cursor: pointer;

input[type=range]:focus::-ms-fill-lower
    background: #ac51b5;

input[type=range]:focus::-ms-fill-upper
    background: #ac51b5;
</style>
