import { router, usePage } from '@inertiajs/vue3';

/**
 * Keep config in sync on each Inertia navigation
 */
export function setupConfigUpdater(applyConfig: (cfg: Record<string, any>) => void) {
    router.on('finish', () => {
        const cfg = (usePage().props as any)?.toastConfig;
        applyConfig(cfg);
    });
}