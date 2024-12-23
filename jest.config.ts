import type {Config} from 'jest';
import {defaults} from 'jest-config';

const config: Config = {
    transform: {
        "^.+\\.svelte$": [
            "svelte-jester",
            { preprocess: "./svelte.config.test.js" },
        ],
        "^.+\\.ts$": [ "ts-jest", { "useESM": true }],
        "^.+\\.js$": [ "ts-jest", { "useESM": true }],
    },
    moduleFileExtensions: ["js", "ts", "svelte"],
    extensionsToTreatAsEsm: [".svelte", ".ts"],
    moduleNameMapper: {
        "^\\$lib(.*)$": "<rootDir>/src/lib$1",
        "^\\$app(.*)$": [
            "<rootDir>/.svelte-kit/dev/runtime/app$1",
            "<rootDir>/.svelte-kit/build/runtime/app$1",
        ],
        "\\.(css|sass)$": "identity-obj-proxy",
    },
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ["<rootDir>/jest-setup.ts"],
    collectCoverageFrom: ["src/**/*.{ts,tsx,svelte,js,jsx}"],
};

export default config;