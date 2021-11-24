import pkg from './package.json';
import typescript from 'rollup-plugin-typescript';

const createEntry = (options) => {
    const config = {
        external: [
            'axios',
        ],
        input: 'src/index.ts',
        output: {
            file: options.file,
            format: options.format,
            name: 'ModelCollection',
        },
        plugins: [
            typescript({}),
        ],
    };

    return config;
};

export default [
    createEntry({format: 'iife', file: pkg.browser}),
    createEntry({format: 'es', file: pkg.module}),
    createEntry({format: 'cjs', file: pkg.main}),
];
