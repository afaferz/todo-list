import { Module } from 'vuex';
import $axios from 'axios';
import { ITask } from './types';

const TaskModule: Module<any, any> = {
    namespaced: true,
    state: {
        tasks: [] as ITask[],
        singleTask: {
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
        ADD_TASK(state, payload) {
            state.tasks.push(payload);
        },
        EDIT_TASK(state, payload) {
            const taskToEdit = state.tasks.find(({ id }: any) => id === payload);
            state.singleTask = taskToEdit;
        },
        DELETE_TASK(state, payload) {
            const index = state.tasks.indexOf(payload);
            state.tasks.splice(index, 1);
        },
        RESET_TASK(state) {
            state.singleTask = {
                name: '',
                status: false,
                type: '',
                priority: 1,
                description: '',
                created_at: new Date(),
            };
        },
        SET_TASK_STATUS(state, { id, done }) {
            const taskToChange = state.tasks.find((task: { id: number }) => task.id === id);

            const index = state.tasks.indexOf(taskToChange);
            state.tasks[index].status = done;
        },
        UPDATE_TASK_FIELD(state, payload: string[]): void {
            const [field, value] = payload;
            state.singleTask[field] = value;
        },
        SET_ACTION_TASK_TYPE(state, payload: string) {
            console.log(payload);
            state.actionType = payload;
        },
        SET_SHOW_MODAL(state, payload: boolean) {
            state.showModal = payload;
        },
    },

    actions: {
        async GET_TASKS({ commit }) {
            try {
                const { data } = await $axios.get('http://localhost:8080/api/tasks/');
                commit('SET_TASKS', data);
            } catch (error) {
                console.log(error);
            }
        },
        async SAVE_NEW_TASK({ commit, dispatch }, payload) {
            try {
                await $axios.post('http://localhost:8080/api/tasks/', payload);
                // commit('SET_TASKS', data);
            } catch (error) {
                console.log(error);
            }
            await dispatch('GET_TASKS');
            commit('ADD_TASK', payload);
            commit('RESET_TASK');
            commit('SET_SHOW_MODAL', false);
        },
        async SAVE_EDIT_TASK({ commit }, payload) {
            try {
                await $axios.patch(`http://localhost:8080/api/tasks/${payload.id}`, payload);
            } catch (error) {
                console.log(error);
            }
            commit('SET_SHOW_MODAL', false);
        },
        async DELETE_TASK({ state, commit }, payload) {
            try {
                await $axios.delete(`http://localhost:8080/api/tasks/${payload}`);
                const taskToDelete = state.tasks.find(({ id }: any) => id === payload);
                commit('DELETE_TASK', taskToDelete);
            } catch (error) {
                console.log(error);
            }
        },
    },

    getters: {
        GET_TASK_NAME: (state) => state.singleTask.name,
        GET_TASK_STATUS: (state) => state.singleTask.status,
        GET_TASK_TYPE: (state) => state.singleTask.type,
        GET_TASK_PRIORITY: (state) => state.singleTask.priority,
        GET_TASK_DESCRIPTION: (state) => state.singleTask.description,
        GET_SINGLE_TASK: (state) => state.singleTask,
        GET_ALL_TASKS: (state) => state.tasks.sort((taskOne: ITask, taskTwo: ITask) => taskTwo.priority - taskOne.priority),
        GET_PENDING_TASKS: (state) => state.tasks.filter(({ status }: any) => status === false),
        GET_DONE_TASKS: (state) => state.tasks.filter(({ status }: any) => status === true),
        GET_ACTION_TASK_TYPE: (state) => state.actionType,
        GET_SHOW_MODAL: (state) => state.showModal,
    },
};

export default TaskModule;
