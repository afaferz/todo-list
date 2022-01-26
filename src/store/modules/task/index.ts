import { Module } from 'vuex';
import $axios from 'axios';
import { ITask } from './types';

const TaskModule: Module<any, any> = {
    namespaced: true,
    state: {
        tasks: [] as ITask[],
        singleTask: {
            name: '',
            status: 'pending',
            type: '',
            priority: 0,
            description: '',
            createdAt: new Date(),
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
                status: 'pending',
                type: '',
                priority: 0,
                description: '',
                createdAt: new Date(),
            };
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
            const task = [
                {
                    id: 1,
                    name: 'Teste 1 Save',
                    status: 'pending',
                    type: 'shop',
                    priority: 1,
                    description: '',
                    createdAt: new Date(),
                },
                {
                    id: 2,
                    name: 'Teste 2 Edit',
                    status: 'done',
                    type: 'buy',
                    priority: 1,
                    description: 'lero lero lero',
                    createdAt: new Date(),
                },
                {
                    id: 3,
                    name: 'Teste 2 Edit',
                    status: 'done',
                    type: 'buy',
                    priority: 1,
                    description: 'lero lero lero',
                    createdAt: new Date(),
                },
            ];
            const { data } = await $axios.get('https://viacep.com.br/ws/01001000/json/');
            console.log(data, 'STORE');
            commit('SET_TASKS', task);
        },
        async SAVE_NEW_TASK({ commit }, payload) {
            commit('ADD_TASK', payload);
            commit('RESET_TASK');
            commit('SET_SHOW_MODAL', false);
        },
        async SAVE_EDIT_TASK({ commit }, payload) {
            commit('SET_SHOW_MODAL', false);
        },
        async DELETE_TASK({ state, commit }, payload) {
            const taskToDelete = state.tasks.find(({ id }: any) => id === payload);
            commit('DELETE_TASK', taskToDelete);
        },
    },

    getters: {
        GET_TASK_NAME: (state) => state.singleTask.name,
        GET_TASK_STATUS: (state) => state.singleTask.status,
        GET_TASK_TYPE: (state) => state.singleTask.type,
        GET_TASK_PRIORITY: (state) => state.singleTask.priority,
        GET_TASK_DESCRIPTION: (state) => state.singleTask.description,
        GET_SINGLE_TASK: (state) => state.singleTask,
        GET_ALL_TASKS: (state) => state.tasks.reverse(),
        GET_PENDING_TASKS: (state) => state.tasks.filter(({ status }: any) => status === 'pending'),
        GET_DONE_TASKS: (state) => state.tasks.filter(({ status }: any) => status === 'done'),
        GET_ACTION_TASK_TYPE: (state) => state.actionType,
        GET_SHOW_MODAL: (state) => state.showModal,
    },
};

export default TaskModule;
