import { Games } from './Game';
import { RegisterSettings } from './Setting';
import VueI18n from 'vue-i18n';

export type Module = { location: RegExp | string } & Partial<{
    active: boolean;
    alpha: boolean;
    dev: boolean;
    github: number;
    locales: null | (keyof Games)[];
    collisions: null | (keyof Modules)[];
    noapp: boolean;
    noMapkit: boolean;
    settings: boolean;

    // being generated in AppStore
    description: string;
}>;

export interface Modules {
    [moduleId: string]: Module;
}

export type $m = (
    key: string,
    args?: { [key: string]: unknown }
) => VueI18n.TranslateResult;

export type $mc = (
    key: string,
    amount?: number,
    args?: { [key: string]: unknown }
) => string;

export type ModuleMainFunction = (
    LSSM: Vue,
    MODULE_ID: string,
    $m: $m,
    $mc: $mc
) => void | Promise<void>;

export type ModuleSettingFunction =
    | ((MODULE_ID: string) => RegisterSettings | Promise<RegisterSettings>)
    | ((
          MODULE_ID: string,
          LSSM: Vue
      ) => RegisterSettings | Promise<RegisterSettings>)
    | ((
          MODULE_ID: string,
          LSSM: Vue,
          $m: $m
      ) => RegisterSettings | Promise<RegisterSettings>);
