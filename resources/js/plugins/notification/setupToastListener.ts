import { router, usePage } from '@inertiajs/vue3';
import { toast } from 'vue-sonner';

/**
 * Listen for toast notifications from Laravel
 */
export function setupToastListener() {
    router.on('finish', () => {
        const notification = usePage().props.notification as {
            type?: keyof typeof toast;
            body?: string;
            description?: string;
        };

        if (notification?.body && notification?.type) {
            const options = notification.description
                ? { description: notification.description }
                : {};

            const fn = toast[notification.type] || toast;
            (fn as (message: string, opts?: any) => void)(
                String(notification.body),
                options
            );
        }
    });
}