import { createApp, h, reactive } from 'vue';
import { Toaster, toast } from 'vue-sonner';
import { router, usePage } from '@inertiajs/vue3';

/**
 * Get initial config safely from window.Inertia or dataset.page
 */
function getInitialConfig(): Record<string, any> {
    const inertiaPage = (window as any)?.Inertia?.page;
    let config = inertiaPage?.props?.toastConfig || {};

    if (!config || Object.keys(config).length === 0) {
        const root = document.getElementById('app') as HTMLElement | null;
        if (root?.dataset?.page) {
            try {
                const page = JSON.parse(root.dataset.page);
                config = page?.props?.toastConfig || {};
            } catch {
                // ignore JSON parse errors
            }
        }
    }

    return config;
}

/**
 * Create reactive toaster and mount once
 */
function createReactiveToaster(config: Record<string, any>) {
    if (document.getElementById('inertia-toast-container')) return;

    const el = document.createElement('div');
    el.id = 'inertia-toast-container';
    document.body.appendChild(el);

    const props = reactive({
        position: (config.position as any) || 'bottom-right',
        closeButton: config.closeButton ?? true,
        expand: config.expand ?? false,
        theme: (config.theme as any) || 'system',
        richColors: config.richColors ?? true,
    });

    const applyConfig = (cfg: Record<string, any> | undefined) => {
        if (!cfg || typeof cfg !== 'object') return;
        if (cfg.position) props.position = cfg.position as any;
        if (typeof cfg.closeButton === 'boolean') props.closeButton = cfg.closeButton;
        if (typeof cfg.expand === 'boolean') props.expand = cfg.expand;
        if (cfg.theme) props.theme = cfg.theme as any;
        if (typeof cfg.richColors === 'boolean') props.richColors = cfg.richColors;
    };

    // Mount toaster
    createApp({
        render: () => h(Toaster, props),
    }).mount('#inertia-toast-container');

    return { props, applyConfig };
}

/**
 * Keep config in sync on each Inertia navigation
 */
function setupConfigUpdater(applyConfig: (cfg: Record<string, any>) => void) {
    router.on('finish', () => {
        const cfg = (usePage().props as any)?.toastConfig;
        applyConfig(cfg);
    });
}

/**
 * Listen for toast notifications from Laravel
 */
function setupToastListener() {
    router.on('finish', () => {
        const notification = usePage().props.notification as {
            type?: string;
            body?: string;
            description?: string;
        };

        if (notification?.body && notification?.type) {
            const options = notification.description
                ? { description: notification.description }
                : {};

            const fn = toast[notification.type] || toast;
            fn(notification.body, options);
        }
    });
}

/**
 * Main Vue Plugin
 */
export default {
    install(_app: any) {
        const initialConfig = getInitialConfig();
        const toaster = createReactiveToaster(initialConfig);

        if (toaster) {
            setupConfigUpdater(toaster.applyConfig);
        }

        setupToastListener();
    },
};
