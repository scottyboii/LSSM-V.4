/* eslint-disable no-console */
import type { ConsoleActionStoreParams } from '../../typings/store/console/Actions';
import type { RootState } from '../../typings/store/RootState';
import type { ActionTree, Module } from 'vuex';

export default {
    namespaced: true,
    getters: {
        prefixed: (_s, _g, rootState) => (params: unknown[]) =>
            [
                `%cLSSM V.${rootState.version}%c:`,
                'font-weight: bold;',
                'font-weight: normal;',
                ...params,
            ],
    },
    actions: {
        warn({ getters }: ConsoleActionStoreParams, params: unknown[]) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            console.warn(...getters.prefixed(params));
        },
        error({ getters }: ConsoleActionStoreParams, params: unknown[]) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            console.error(...getters.prefixed(params));
        },
    } as ActionTree<RootState, RootState>,
} as Module<RootState, RootState>;
