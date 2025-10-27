// notification.ts
import { router, usePage } from "@inertiajs/vue3";
import { toast } from "vue-sonner";

export default {
    install() {
        router.on('finish', () => {
            const notification = usePage().props.notification as { type?: string; body?: string };

            if (notification?.body && notification?.type) {
                switch (notification.type) {
                    case 'success': toast.success(notification.body); break;
                    case 'error': toast.error(notification.body); break;
                    case 'warning': toast.warning(notification.body); break;
                    case 'info': toast.info(notification.body); break;
                    default: toast(notification.body);
                }
            }
        });
    },
};
