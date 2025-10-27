import { createApp, h } from 'vue';
import { Toaster } from '@/components/ui/sonner';
import { toast } from 'vue-sonner';
import { router, usePage } from '@inertiajs/vue3';

export default {
    install(_app: any) { // eslint-disable-line @typescript-eslint/no-unused-vars
        /**
         * Mount global <Toaster /> once
         */
        if (!document.getElementById('inertia-toast-container')) {
            const toasterContainer = document.createElement('div');
            toasterContainer.id = 'inertia-toast-container';
            document.body.appendChild(toasterContainer);

            // Dynamically mount Toaster component globally
            const toasterApp = createApp({
                render: () => h(Toaster),
            });

            toasterApp.mount('#inertia-toast-container');
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
