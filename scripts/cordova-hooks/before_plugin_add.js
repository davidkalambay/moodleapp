const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

module.exports = function(context) {
    // Check if CORDOVA_PLUGINS env var contains 'cordova-plugin-moodleapp'
    // This mimics the bash script: if [[ $CORDOVA_PLUGINS == *cordova-plugin-moodleapp* ]]
    const plugins = process.env.CORDOVA_PLUGINS || '';

    if (plugins.includes('cordova-plugin-moodleapp')) {
        console.log("Building cordova-plugin-moodleapp");
        const pluginPath = path.resolve(context.opts.projectRoot, 'cordova-plugin-moodleapp');

        if (fs.existsSync(pluginPath)) {
            try {
                // Determine npm command (npm or npm.cmd on Windows)
                const npmCmd = process.platform === 'win32' ? 'npm.cmd' : 'npm';
                execSync(`${npmCmd} run prod`, { cwd: pluginPath, stdio: 'inherit', shell: true });
            } catch (e) {
                console.error("Failed to build cordova-plugin-moodleapp", e);
                throw e;
            }
        }
    }
};
