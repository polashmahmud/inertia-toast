import { getInitialConfig } from './getInitialConfig';
import { createReactiveToaster } from './createReactiveToaster';
import { setupConfigUpdater } from './setupConfigUpdater';
import { setupToastListener } from './setupToastListener';

/**
 * Main Vue Plugin
 */
export default {
    install(_app: any) { // eslint-disable-line @typescript-eslint/no-unused-vars
        const initialConfig = getInitialConfig();
        const toaster = createReactiveToaster(initialConfig);

        if (toaster) {
            setupConfigUpdater(toaster.applyConfig);
        }

        setupToastListener();
    },
};