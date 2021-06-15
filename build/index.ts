import DynamicImportQueryPlugin from './plugins/DynamicImportQueryPlugin';
import fs from 'fs';
import lodash from 'lodash';
import moment from 'moment';
import path from 'path';
import SpeedMeasurePlugin from 'speed-measure-webpack-plugin';

import addToBuildStats from './addToBuildStats';
import config from '../src/config';
import { version } from '../package.json';
import webpackConfig from '../webpack.config';

import webpack, { Configuration } from 'webpack';

console.time(`build`);

console.info(`Let's build that stuff in Version ${version}`);

const moduleDirs = fs.readdirSync(`./src/modules/`);

const locales = Object.keys(config.games).filter(game =>
    fs.existsSync(`./src/i18n/${game}.ts`)
);

const entry = {
    mode: process.argv[2] || 'development',
    entry: {
        core: path.resolve(__dirname, '../src/core.ts'),
    },
    output: {
        path: path.resolve(__dirname, `../dist`),
        filename: pathData =>
            `${pathData.chunk?.name?.replace(/^[a-z]{2}_[A-Z]{2}_/, '')}.js`,
        publicPath: `${config.server}`,
    },
    ...lodash.cloneDeep(webpackConfig),
} as Configuration;

const modules = moduleDirs.filter(
    module =>
        !(
            config.modules['core-modules'].includes(module) ||
            module === 'template'
        )
);

entry.plugins?.unshift(
    new webpack.DefinePlugin({
        PREFIX: JSON.stringify(config.prefix),
        VERSION: JSON.stringify(version),
        MODE: process.argv[2] === 'production' ? '"stable"' : '"beta"',
        MODULE_REGISTER_FILES: JSON.stringify(
            Object.fromEntries(
                modules.map(module => [
                    module,
                    require(`../src/modules/${module}/register`),
                ])
            )
        ),
    }),
    new webpack.ContextReplacementPlugin(
        /moment\/locale$/,
        new RegExp(
            `(${locales
                .map(l =>
                    l !== 'en_US'
                        ? // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                          // @ts-ignore
                          moment.localeData(l)._abbr
                        : 'en-gb'
                )
                .join('|')})$`
        )
    )
);
entry.plugins?.push(
    new DynamicImportQueryPlugin({
        v: {
            value: version,
        },
        uid: {
            value: `window.I18n.locale + "-" + window.user_id`, // must be valid JS Code stringified
            isDynamicKey: true, // false by default
        },
    })
);

console.log('Generated configurations. Building…');
webpack(
    new SpeedMeasurePlugin({
        disable: process.argv[2] !== 'development',
        outputFormat: 'humanVerbose',
    }).wrap(entry),
    (err, stats) => {
        if (err) {
            console.error(err.stack || err);
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            if (err.details) {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                console.error(err.details);
            }
        }

        if (!stats) {
            console.error('Build Error: stats is a falsy value!');
            return process.exit(-1);
        } else {
            fs.writeFileSync(
                `./dist/webpack.out.${
                    process.argv[2] === 'production' ? 'public' : 'beta'
                }.json`,
                JSON.stringify(stats.toJson(), null, '\t')
            );
            addToBuildStats({ version });
        }
        console.log('Stats:');
        console.log(stats?.toString({ colors: true }));
        console.timeEnd(`build`);
        console.log(`Build finished at ${new Date().toLocaleTimeString()}`);
        if (stats?.hasErrors()) process.exit(-1);
    }
);
