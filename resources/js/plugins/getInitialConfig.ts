/**
 * Get initial config safely from window.Inertia or dataset.page
 */
export function getInitialConfig(): Record<string, any> {
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