const { spawn } = require('child_process');
const process = require('process');

// 1. Start gulp watch
console.log('> gulp watch &');
const gulp = spawn('gulp', ['watch'], { stdio: 'inherit', shell: true });

// 2. Parse args
// Note: when run via "npm run script -- args", the args are passed.
// serve.sh used "$@" which captures them.
const args = process.argv.slice(2);
const newArgs = [];
let angularTarget = 'serve';

for (const arg of args) {
    if (arg.startsWith('--project=')) {
        continue;
    }
    if (arg.startsWith('--platform=')) {
        angularTarget = 'ionic-cordova-serve';
    }
    newArgs.push(arg);
}

// 3. Set environment variable
const env = { ...process.env, NODE_OPTIONS: '--max-old-space-size=4096' };

// 4. Run ng
console.log(`> NODE_OPTIONS=--max-old-space-size=4096 ng run app:${angularTarget} ${newArgs.join(' ')}`);

const ng = spawn('ng', ['run', `app:${angularTarget}`, ...newArgs], {
    stdio: 'inherit',
    shell: true,
    env: env
});

ng.on('close', (code) => {
    console.log(`ng process exited with code ${code}`);
    // Kill gulp when ng exits
    try {
        gulp.kill();
        // On Windows, tree-kill might be needed for shell subprocs, but standard kill signal usually works for 'spawn' object?
        // With shell:true, the pid refers to the shell, not gulp.
        // But let's try basic exit.
    } catch (e) {
        console.error('Error killing gulp', e);
    }
    process.exit(code);
});

// Handle termination signals to cleanup
['SIGINT', 'SIGTERM'].forEach(signal => {
    process.on(signal, () => {
        ng.kill();
        gulp.kill();
        process.exit();
    });
});
