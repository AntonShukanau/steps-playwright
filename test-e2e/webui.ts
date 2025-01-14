import Memory from './memory';
import App from './page_object';
import localServer from './support/server';

const common = {
    paths: ['test-e2e/features/*.feature'],
    require: ['test-e2e/step-definitions/*.ts', 'src/*.ts'],
    browser: {
        logLevel: 'warn',
        timeout: {
            page: 5000
        },
        capabilities: {
            browserName: 'chromium'
        },
        trace: {
            event: ['onFail'],
            dir: 'traces',
            attach: true
        },
        video: {
            event: ['onFail'],
            dir: 'video',
            size: { width: 800, height: 600 },
            attach: true
        },
        screenshot: ['onFail']
    },
    format: [
        '@qavajs/console-formatter',
        'junit:test-e2e/report.xml',
        '@qavajs/html-formatter:test-e2e/report.html'
    ],
    formatOptions: {
        console: {
            showLogs: true
        }
    },
    memory: new Memory(),
    pageObject: new App(),
    parallel: 4,
    retry: 1,
    service: [localServer],
    tags: 'not @skip'
}

export default common;

export const debug = {
    ...common,
    retry: 0,
    tags: '@debug',
    browser: {
        logLevel: 'warn',
        timeout: {
            page: 5000
        },
        capabilities: {
            browserName: 'chromium',
            headless: false
        },
        trace: {
            event: ['onFail'],
            dir: 'traces',
            attach: true
        },
        video: {
            event: ['afterScenario'],
            dir: 'video',
            size: { width: 800, height: 600 },
            attach: true
        }
    },
    parallel: 1
}

export const electron = {
    ...common,
    paths: ['test-e2e/features/electron/*.feature'],
    retry: 0,
    // tags: '@debug',
    browser: {
        logLevel: 'warn',
        timeout: {
            page: 5000
        },
        capabilities: {
            browserName: 'electron',
            args: ['test-e2e/apps/electron/main.js'],
            headless: false
        }
    },
    parallel: 1
}
