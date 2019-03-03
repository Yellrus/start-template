// Pass webpack `reslove.aliases` & `reslove.extensions`
// to prevent `import/resolver` errors.
const resolve = require('./gulpfile.js/config').webpack.resolve || {};

module.exports = {
    parser: 'babel-eslint',
    env: {
        browser: true,
        es6: true,
    },
    plugins: ['prettier', 'standard'],
    extends: ['standard', 'prettier', 'prettier/standard'],
    rules: {
        'prettier/prettier': 1,
        'no-unused-vars': 1,
        indent: ['error', 4, { SwitchCase: 1 }],
        'linebreak-style': ['error', 'unix'],
        quotes: [
            'error',
            'single',
            {
                allowTemplateLiterals: true,
            },
        ],
        semi: ['error', 'always'],
        'no-console': ['warn', { allow: ['warn', 'error'] }],
        'no-var': 'error',
        'no-cond-assign': ['error', 'except-parens'],
        'no-case-declarations': 0,
        'padding-line-between-statements': [
            'error',
            {
                blankLine: 'always',
                prev: ['const', 'let', 'var', 'import'],
                next: '*',
            },
            {
                blankLine: 'any',
                prev: ['const', 'let', 'var', 'import'],
                next: ['const', 'let', 'var'],
            },
            { blankLine: 'any', prev: ['import'], next: 'import' },
            { blankLine: 'always', prev: '*', next: 'return' },
            {
                blankLine: 'always',
                prev: 'expression',
                next: ['if', 'for', 'const', 'let', 'var'],
            },
            { blankLine: 'always', prev: ['if', 'for'], next: 'expression' },
        ],
        'comma-dangle': ['error', 'always-multiline'],
        'brace-style': ['error', '1tbs', { allowSingleLine: true }],
        'space-before-blocks': ['error', 'always'],
        'keyword-spacing': ['error', { before: true, after: true }],
        'one-var': [
            'error',
            {
                var: 'consecutive',
                let: 'consecutive',
                const: 'consecutive',
                separateRequires: true,
            },
        ],
        eqeqeq: ['warn', 'always', { null: 'ignore' }],
    },
    parserOptions: {
        sourceType: 'module',
    },
    settings: {
        'import/resolver': {
            webpack: {
                config: {
                    resolve,
                },
            },
        },
    },
};
