import { createApp, h } from 'vue';
import { Toaster } from '@/components/ui/sonner';
import { toast } from 'vue-sonner';
import { router, usePage } from '@inertiajs/vue3';

export default {
    install(_app: any) { // eslint-disable-line @typescript-eslint/no-unused-vars
        /**
         *  Fetch toast config safely
         */
        const inertiaPage = (window as any)?.Inertia?.page;
        const config = inertiaPage?.props?.toastConfig || {};

        /**
         *  Mount Toaster dynamically (once)
         */
        if (!document.getElementById("inertia-toast-container")) {
            const el = document.createElement("div");
            el.id = "inertia-toast-container";
            document.body.appendChild(el);

            createApp({
                render: () =>
                    h(Toaster, {
                        position: config.position || "top-right",
                        closeButton: config.closeButton ?? true,
                        closeButtonPosition:
                            config.closeButtonPosition || "top-right",
                        expand: config.expand ?? false,
                        theme: config.theme || "system",
                        richColors: config.richColors ?? true,
                    }),
            }).mount("#inertia-toast-container");
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
