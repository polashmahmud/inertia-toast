import { createApp, h } from 'vue';
import { Toaster } from '@/components/ui/sonner';
import { toast } from 'vue-sonner';
import { router, usePage } from '@inertiajs/vue3';

export default {
    install(_app: any) { // eslint-disable-line @typescript-eslint/no-unused-vars
        // Toaster auto-mount
        if (!document.getElementById('inertia-toast-container')) {
            const el = document.createElement('div');
            el.id = 'inertia-toast-container';
            document.body.appendChild(el);

            // Get config dynamically on mount
            const getConfig = () => {
                const page = usePage();
                return page?.props?.toastConfig || {};
            };

            const initialConfig = getConfig();
            console.log('Toast Config:', initialConfig);

            createApp({
                render: () =>
                    h(Toaster, {
                        position: initialConfig.position || 'bottom-right',
                        closeButton: initialConfig.closeButton ?? true,
                        closeButtonPosition: initialConfig.closeButtonPosition || 'top-right',
                        expand: initialConfig.expand ?? false,
                        theme: initialConfig.theme || 'system',
                        richColors: initialConfig.richColors ?? true,
                    }),
            }).mount('#inertia-toast-container');
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
