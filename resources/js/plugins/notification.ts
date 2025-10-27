import { router, usePage } from "@inertiajs/vue3";
import { toast } from "vue-sonner";

export default {
    install() {
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
