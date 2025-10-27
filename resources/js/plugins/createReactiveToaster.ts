import { createApp, h, reactive } from 'vue';
import { Toaster } from 'vue-sonner';

/**
 * Create reactive toaster and mount once
 */
export function createReactiveToaster(config: Record<string, any>) {
    if (document.getElementById('inertia-toast-container')) return;

    const el = document.createElement('div');
    el.id = 'inertia-toast-container';
    document.body.appendChild(el);

    const props = reactive({
        position: (config.position as any) || 'bottom-right',
        closeButton: config.closeButton ?? true,
        expand: config.expand ?? false,
        theme: (config.theme as any) || 'system',
        richColors: config.richColors ?? true,
    });

    const applyConfig = (cfg: Record<string, any> | undefined) => {
        if (!cfg || typeof cfg !== 'object') return;
        if (cfg.position) props.position = cfg.position as any;
        if (typeof cfg.closeButton === 'boolean') props.closeButton = cfg.closeButton;
        if (typeof cfg.expand === 'boolean') props.expand = cfg.expand;
        if (cfg.theme) props.theme = cfg.theme as any;
        if (typeof cfg.richColors === 'boolean') props.richColors = cfg.richColors;
    };

    // Mount toaster
    createApp({
        render: () => h(Toaster, props),
    }).mount('#inertia-toast-container');

    return { props, applyConfig };
}