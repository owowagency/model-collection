module.exports = {
    clearMocks: true,
    // TODO: Check if still requried
    // globals: {
    //     'ts-jest': {
    //         tsconfig: './tsconfig.json',
    //     },
    // },
    moduleFileExtensions: [
        'js',
        'ts',
        'json',
    ],
    moduleNameMapper: {
        '^@/tests/(.*)$': '<rootDir>/tests/$1',
        '^@/(.*)$': '<rootDir>/src/$1',
    },
    testEnvironment: 'jsdom',
    transform: {
        '.*\\.(js)$': 'babel-jest',
        '.*\\.(ts)$': 'babel-jest',
    },
};
