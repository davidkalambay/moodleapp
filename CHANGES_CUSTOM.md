# Custom Moodle App Modifications

This document tracks changes made to the official Moodle App codebase to support specific customization requirements and development environment fixes (specifically for Windows).

## 1. Development Environment Fixes (Windows Compatibility)

### `config.xml`
- **Change:** Updated the `before_plugin_add` hook to point to a JavaScript file instead of a Bash script.
- **Reason:** Bash scripts (`.sh`) do not execute natively on Windows Command Prompt/PowerShell without specific setups like WSL or Git Bash being forced. A Node.js script is cross-platform.

### `scripts/cordova-hooks/before_plugin_add.js`
- **Change:** Created a new Node.js script to replace `before_plugin_add.sh`.
- **Functionality:** Checks for `cordova-plugin-moodleapp` in `CORDOVA_PLUGINS` and runs `npm run prod` within the plugin directory if found.

### `cordova-plugin-moodleapp/package.json`
- **Change:** Updated `scripts` to explicitly invoke `node`.
    - `dev:ts`: `"node scripts/build.js --watch"`
    - `dev:cordova`: `"chokidar www/index.js -c \"node scripts/copy-javascript.js\""`
    - `prod`: `"NODE_ENV=production node scripts/build.js"`
- **Reason:** Direct execution of scripts without the `node` prefix can fail on Windows.

## 2. Configuration & Security

### `src/index.html`
- **Change:** Updated `Content-Security-Policy` (CSP) meta tag.
- **Details:** Added `connect-src * 'self' ...` and relaxed other directives.
- **Reason:** To fix "violates Content Security Policy directive: 'default-src 'none'" errors which prevented the app from loading `localhost:8100` and other resources during local development (`ionic serve`).

## 3. Deployment Notes
- **Android Runtime:** Requires `native-run` to be installed globally (`npm install -g native-run`).
- **Environment Variables:** `JAVA_HOME` (JDK 17) and `ANDROID_HOME` must be correctly set in the system Path for `ionic cordova run android` to work.
