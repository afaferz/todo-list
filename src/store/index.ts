import { InjectionKey } from 'vue';
import { createStore, useStore as baseUseStore, Store } from 'vuex';
import task from './modules/task';

export interface State {
    model: string;
}

export const key: InjectionKey<Store<State>> = Symbol('Vuex Symbol');

export const store = createStore<State>({
    state: {
        model: '',
    },
    mutations: {},
    actions: {},
    getters: {},
    modules: {
        task,
    },
});

// defina sua própria função de composição `useStore`
export function useStore() {
    return baseUseStore(key);
}
