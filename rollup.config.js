import commonjs from "@rollup/plugin-commonjs"
import json from "@rollup/plugin-json"
import resolve from "@rollup/plugin-node-resolve"
import replace from "@rollup/plugin-replace"
import sourcemaps from "rollup-plugin-sourcemaps"
import typescript from "rollup-plugin-typescript2"
import pkg from "./package.json"
import terser from "@rollup/plugin-terser"

export default [
    {
        input: 'src/index.ts',
        external: ['react'],
        treeshake: { propertyReadSideEffects: false },
        output: {
            file: 'dist/index.js',
            format: 'cjs',
            freeze: false,
            esModule: true,
            name: '@multibase/js',
            sourcemap: true,
            globals: { react: 'React' },
            exports: 'named'
        },
        plugins: [
            resolve({
                mainFields: ['module', 'main', 'browser'],
            }),
            replace({
                'process.env.NODE_ENV': () => {
                    const isDev = process.env.ROLLUP_ENV === 'development';
                    if (isDev) return JSON.stringify('development');
                    return JSON.stringify('production');
                },
                'PACKAGE_VERSION': pkg.version,
                'PACKAGE_NAME': pkg.name,
                preventAssignment: true
            }),
            commonjs(),
            json(),
            sourcemaps(),
            typescript(),
            terser(),
        ]
    },
    {
        input: 'src/index.ts',
        external: ['react'],
        treeshake: { propertyReadSideEffects: false },
        output: {
            file: 'dist/js.esm.js',
            format: 'esm',
            freeze: false,
            esModule: true,
            name: '@multibase/js',
            sourcemap: true,
            globals: {
                react: 'React',
            },
            exports: 'named'
        },
        plugins: [
            resolve({
                mainFields: ['module', 'main', 'browser'],
            }),
            replace({
                'process.env.NODE_ENV': () => {
                    const isDev = process.env.ROLLUP_ENV === 'development';
                    if (isDev) return JSON.stringify('development');
                    return JSON.stringify('production');
                },
                'PACKAGE_VERSION': pkg.version,
                'PACKAGE_NAME': pkg.name,
                preventAssignment: true
            }),
            commonjs(),
            json(),
            sourcemaps(),
            typescript(),
            terser(),
        ]
    }
]