const path = require('path');

module.exports = function (config) {
    config.set({
        basePath: path.resolve(__dirname),
        plugins: ['karma-*'],
        frameworks: ['mocha', 'chai',  'karma-typescript'],
        files: [
            {
                pattern: 'src/**/*.ts',
                watched: true,
                included: true,
                served: true
            },
            {
                pattern: 'test/**/*.ts',
                watched: true,
                included: true,
                served: true
            }
        ],
        preprocessors: {
            '**/*.ts': ['karma-typescript', 'coverage']
        },
        karmaTypescriptConfig: {
            tsconfig: './tsconfig.json',
            compilerOptions: {
                module: "CommonJS"
            },
            bundlerOptions: {
                entrypoints: /\.spec\.ts$/
            }
        },
        port: 9123,
        browserNoActivityTimeout: 30000,
        colors: true,
        logLevel: config.LOG_DEBUG,
        autoWatch: true,
        browsers: ['PhantomJS'],
        singleRun: false,
        failOnEmptyTestSuite: false,
        client: {
            captureConsole: true
        },
        reporters: ['mocha'],
    });
};