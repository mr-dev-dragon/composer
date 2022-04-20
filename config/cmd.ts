const { spawn } = require('child_process');
const { platform } = require('process');

const proc = (cmd, args) =>
    new Promise((resolve, reject) => {
        const p = createSpawn(cmd, args);
        p.on('exit', (code, signal) => code === 0 ? resolve() : reject(signal));
    });

const npmScript = (name) => (...args) =>
    proc('npm', ['run', name, '--', ...args]);

const npmAction = (name) => (...args) =>
    proc('npm', [name, ...args]);

function createSpawn(cmd, args) {
    return platform === 'win32' ? spawn(cmd, args, { shell: true, stdio: 'inherit' }) : spawn(cmd, args, { stdio: 'inherit' });
}

module.exports = {
    ng: npmScript('ng'),
    version: npmAction('version')
};
