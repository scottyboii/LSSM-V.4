import { createI18n, I18n } from 'vue-i18n';

export default async (): Promise<I18n> => {
    const { locale } = window.I18n;
    return createI18n({
        locale,
        messages: {
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            [locale]: (
                    await import(
                            /* webpackChunkName: "i18n/[request]" */
                            /* webpackInclude: /[\\/]+i18n[\\/]+[^\\/]*?$/ */
                            `./i18n/${locale}`
                            )
            ).default,
        },
    });;
};
