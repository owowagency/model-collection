import copy from 'rollup-plugin-copy';
import json from '@rollup/plugin-json';
import pkg from './package.json';
import ttypescript from 'ttypescript';
import typescript from 'rollup-plugin-typescript2';

const createEntry = (options) => ({
    file: `dist/${options.file}`,
    format: options.format,
    name: 'ModelCollection',
});

export default {
    external: [
        'axios',
        'collect.js',
        'lodash.clonedeep',
    ],
    input: 'src/index.ts',
    output: [
        createEntry({format: 'es', file: pkg.module}),
        createEntry({format: 'cjs', file: pkg.main}),
    ],
    plugins: [
        json(),
        typescript({typescript: ttypescript}),
        copy({
            targets: [
                {src: 'package.json', dest: 'dist'},
                {src: 'README.md', dest: 'dist'},
            ],
        }),
    ],
};
