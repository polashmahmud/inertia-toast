import { createApp, h, reactive } from 'vue';
import { Toaster, toast } from 'vue-sonner';
import { router, usePage } from '@inertiajs/vue3';

export default {
    install(_app: any) { // eslint-disable-line @typescript-eslint/no-unused-vars
        /**
         *  Fetch toast config safely
         */
        const inertiaPage = (window as any)?.Inertia?.page;
        let initialConfig = inertiaPage?.props?.toastConfig || {};
        if (!initialConfig || Object.keys(initialConfig).length === 0) {
            const root = document.getElementById('app') as HTMLElement | null;
            if (root?.dataset?.page) {
                try {
                    const page = JSON.parse(root.dataset.page);
                    initialConfig = page?.props?.toastConfig || {};
                } catch {
                    // ignore JSON parse errors
                }
            }
        }

        /**
         *  Mount Toaster dynamically (once)
         */
        if (!document.getElementById('inertia-toast-container')) {
            const el = document.createElement('div');
            el.id = 'inertia-toast-container';
            document.body.appendChild(el);

            // reactive props so config can update on subsequent navigations
            const toasterProps = reactive({
                position: (initialConfig.position as any) || 'bottom-right',
                closeButton: initialConfig.closeButton ?? true,
                expand: initialConfig.expand ?? false,
                theme: (initialConfig.theme as any) || 'system',
                richColors: initialConfig.richColors ?? true,
            });

            // helper to safely apply config from page props
            const applyConfig = (cfg: Record<string, any> | undefined) => {
                if (!cfg || typeof cfg !== 'object') return;
                if (cfg.position) toasterProps.position = cfg.position as any;
                if (typeof cfg.closeButton === 'boolean') toasterProps.closeButton = cfg.closeButton;
                if (typeof cfg.expand === 'boolean') toasterProps.expand = cfg.expand;
                if (cfg.theme) toasterProps.theme = cfg.theme as any;
                if (typeof cfg.richColors === 'boolean') toasterProps.richColors = cfg.richColors;
            };

            // mount toaster with reactive props
            createApp({
                render: () => h(Toaster, toasterProps),
            }).mount('#inertia-toast-container');

            // Update config on every finished navigation
            router.on('finish', () => {
                const cfg = (usePage().props as any)?.toastConfig;
                applyConfig(cfg);
            });
        }

        /**
         * Listen for Inertia finish events
         */
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

                switch (notification.type) {
                    case 'success':
                        toast.success(notification.body, options);
                        break;
                    case 'error':
                        toast.error(notification.body, options);
                        break;
                    case 'warning':
                        toast.warning(notification.body, options);
                        break;
                    case 'info':
                        toast.info(notification.body, options);
                        break;
                    default:
                        toast(notification.body, options);
                }
            }
        });
    },
};
