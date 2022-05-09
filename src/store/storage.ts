import localforage from 'localforage';

import type { RootState } from '../../typings/store/RootState';
import type { StorageState } from '../../typings/store/storage/State';
import type { ActionTree, Module } from 'vuex';
import type {
    StorageActionStoreParams,
    StorageGet,
    StorageSet,
} from '../../typings/store/storage/Actions';

localforage.config({
    name: PREFIX,
    storeName: `${PREFIX}Storage`,
});

export default {
    namespaced: true,
    state: {
        localforage,
    },
    actions: {
        get(
            { state }: StorageActionStoreParams,
            { key, defaultValue = null }: StorageGet
        ): Promise<unknown> {
            return new Promise<unknown>(resolve => {
                state.localforage
                    .getItem(key)
                    .then(value => resolve(value ?? defaultValue));
            });
        },
        set(
            { state }: StorageActionStoreParams,
            { key, value }: StorageSet
        ): Promise<typeof value> {
            if (typeof key === 'undefined' || typeof value === 'undefined') {
                throw new Error(
                    `Trying to store a value for LSSM but one of the following Parameters is not defined: key: ${key}, value: ${value}`
                );
            }
            return state.localforage.setItem(key, value);
        },
        getAllItems({
            state,
        }: StorageActionStoreParams): Promise<Record<string, unknown>> {
            return new Promise<Record<string, unknown>>(resolve => {
                const storage = {} as Record<string, unknown>;
                state.localforage
                    .iterate((value, key) => {
                        storage[key] = value;
                    })
                    .then(() => resolve(storage));
            });
        },
    } as ActionTree<StorageState, RootState>,
} as Module<StorageState, RootState>;
