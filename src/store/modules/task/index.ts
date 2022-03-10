import { Module } from 'vuex';
import $axios from 'axios';
import { ITask } from './types';

const TaskModule: Module<any, any> = {
    namespaced: true,
    state: {
        tasks: [] as ITask[],
        task: {
            name: '',
            status: false,
            type: '',
            priority: 0,
            description: '',
            created_at: new Date(),
        } as ITask,
        actionType: 'add',
        showModal: false,
    },

    mutations: {
        SET_TASKS(state, payload) {
            state.tasks = payload;
        },
        EDIT_TASK(state, payload) {
            const taskToEdit = state.tasks.find(({ id }: any) => id === payload);
            state.task = taskToEdit;
        },
        DELETE_TASK(state, payload) {
            const index = state.tasks.indexOf(payload);
            state.tasks.splice(index, 1);
        },
        RESET_TASK(state) {
            state.task = {
                name: '',
                status: false,
                type: '',
                priority: 1,
                description: '',
                created_at: new Date(),
            };
        },
        UPDATE_TASK_FIELD(state, payload: string[]): void {
            const [field, value] = payload;
            state.task[field] = value;
        },
        SET_ACTION_TASK_TYPE(state, payload: string) {
            state.actionType = payload;
        },
        SET_SHOW_MODAL(state, payload: boolean) {
            state.showModal = payload;
        },
    },

    actions: {
        async GET_TASKS({ commit }) {
            try {
                const { data } = await $axios.get('http://localhost:3030/api/tasks/');
                commit('SET_TASKS', data);
            } catch (error) {
                console.log(error);
            }
        },
        async SAVE_NEW_TASK({ commit, dispatch }, payload) {
            try {
                await $axios.post('http://localhost:3030/api/tasks/', payload);
            } catch (error) {
                console.log(error);
            }
            await dispatch('GET_TASKS');
            commit('RESET_TASK');
            commit('SET_SHOW_MODAL', false);
        },
        async SAVE_EDIT_TASK({ commit }, payload) {
            try {
                await $axios.patch(`http://localhost:3030/api/tasks/${payload.id}/`, payload);
            } catch (error) {
                console.log(error);
            }
            commit('SET_SHOW_MODAL', false);
        },
        async DELETE_TASK({ state, commit }, payload) {
            try {
                await $axios.delete(`http://localhost:3030/api/tasks/${payload}/`);
                const taskToDelete = state.tasks.find(({ id }: any) => id === payload);
                commit('DELETE_TASK', taskToDelete);
            } catch (error) {
                console.log(error);
            }
        },
        async COMPLETE_TASK({ state }, { id, done }) {
            try {
                const taskToComplete = state.tasks.find((task: { id: number }) => task.id === id);
                taskToComplete.status = done;
                await $axios.patch(`http://localhost:3030/api/tasks/${id}/`, taskToComplete);
            } catch (error) {
                console.log(error);
            }
        },
    },

    getters: {
        // Form add task ---- init
        GET_TASK_NAME: (state) => state.task.name,
        GET_TASK_STATUS: (state) => state.task.status,
        GET_TASK_TYPE: (state) => state.task.type,
        GET_TASK_PRIORITY: (state) => state.task.priority,
        GET_TASK_DESCRIPTION: (state) => state.task.description,
        // Form add task ---- end
        GET_SINGLE_TASK: (state) => state.task,
        // Get tasks by priority ---- init
        GET_ALL_TASKS: (state) => state.tasks.sort((taskOne: ITask, taskTwo: ITask) => taskOne.id - taskTwo.id),
        GET_TASKS_BY_PRIORITY: (state, getters) => (priorityLevel: number) => {
            const allTasks = getters.GET_ALL_TASKS;

            return allTasks.filter(({ priority }: { priority: number }) => priority === priorityLevel);
        },
        // Get tasks by priority ---- end
        GET_TASKS_BY_STATUS: (state) => (done: boolean) => state.tasks.filter(({ status }: any) => status === done),
        GET_ACTION_TASK_TYPE: (state) => state.actionType,
        GET_SHOW_MODAL: (state) => state.showModal,
    },
};

export default TaskModule;
