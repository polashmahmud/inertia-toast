import { router, usePage } from '@inertiajs/vue3';
import { toast } from 'vue-sonner';

/**
 * Listen for toast notifications from Laravel
 */
export function setupToastListener() {
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