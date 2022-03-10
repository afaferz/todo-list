<template lang="pug">
div
    transition(name='modal', :duration='400')
        .modal-overlay(v-show='showModal', @click='clickOutside')
            .modal.bg-white
                span.inline-block.text-center.text-2xl.font-bold.text-violet-400.mb-10 {{ actionTaskType === 'add' ? 'ADD' : 'EDIT' }} TASK
                FormMiscTask
                .flex.flex-row.justify-end.mt-7.mb-2
                    button.px-6.py-1.mr-2.bg-rose-600(
                        :class='[...classes.button]',
                        @click='closeTask'
                    ) CANCEL
                    button.px-6.py-1.bg-violet-500(
                        :class='[...classes.button]',
                        @click='modifyTask'
                    ) SAVE
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue';
import FormMiscTask from '@/components/Task/FormMiscTask.vue';
import { useStore } from '@/store';

export default defineComponent({
    components: {
        FormMiscTask,
    },
    setup() {
        const store = useStore();

        const singleTask = computed(() => store.getters['task/GET_SINGLE_TASK']);
        const actionTaskType = computed(() => store.getters['task/GET_ACTION_TASK_TYPE']);
        const showModal = computed(() => store.getters['task/GET_SHOW_MODAL']);
        const controlModal = (status: boolean) => store.commit('task/SET_SHOW_MODAL', status);
        const resetTask = () => store.commit('task/RESET_TASK');

        return {
            singleTask,
            actionTaskType,
            showModal,
            controlModal,
            resetTask,
        };
    },
    data() {
        return {
            classes: {
                button: ['block', 'rounded-md', 'text-lg', 'font-semibold', 'text-neutral-50'],
            },
        };
    },
    methods: {
        clickOutside({ target, currentTarget }: any) {
            if (target === currentTarget) {
                this.closeTask();
            }
        },
        async modifyTask() {
            try {
                if (this.actionTaskType === 'add') {
                    await this.$store.dispatch('task/SAVE_NEW_TASK', this.singleTask);
                }
                if (this.actionTaskType === 'edit') {
                    await this.$store.dispatch('task/SAVE_EDIT_TASK', this.singleTask);
                }
                this.$emit('close', false);
                // eslint-disable-next-line no-empty
            } catch (error) {}
        },
        closeTask() {
            this.controlModal(false);
            this.resetTask();
        },
    },
});
</script>
<style lang="stylus">
.modal-overlay
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(124 58 237, 0.75);
    overflow-y: hidden;
    cursor: pointer;
    z-index: 998;

.modal
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    text-align: center;
    width: fit-content;
    height: fit-content;
    max-width: 50em;
    padding: 2rem;
    border-radius: 1rem;
    box-shadow: 0 5px 5px rgba(0, 0, 0, 0.2);
    z-index: 999;

.modal-enter,
.modal-leave-to
    opacity: 0;

.modal-enter-active,
.modal-leave-to
    transition: opacity .4s;

.modal-enter-to .modal
    animation: jump-to .4s;

.modal-leave-to .modal
    animation: jump-to .4s reverse;

@keyframes jump-to {
    from {
        transform: scale(0.3) translateY(-50%);
    }
    to {
        transform: scale(1) translateY(0);
    }
}
</style>
