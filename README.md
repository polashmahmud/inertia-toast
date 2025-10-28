# Inertia Toast

Simple, zero-boilerplate toast notifications for Laravel + Inertia.js (Vue) using vue-sonner.

It ships with:

- Laravel middleware that exposes flash messages to Inertia
- A tiny Vue plugin that auto-mounts the Toaster and listens to Inertia navigations
- A publishable config to customize position, theme, and behavior

---

## Installation

1. Install the package

```bash
composer require polashmahmud/inertia-toast:^2.0
```

2. Install the client dependency

```bash
npm install vue-sonner
```

3. Add the plugin in your Vue app (auto-mounts Toaster)

`resources/js/app.ts`

```ts
import 'vue-sonner/style.css';
import notification from '@inertia-toast/plugins';

createInertiaApp({
    // ...
    setup({ el, App, props, plugin }) {
        createApp({ render: () => h(App, props) })
            .use(plugin)
            .use(notification)
            .mount(el);
    },
});
```

You do NOT need to render <Toaster /> yourself—the plugin does it for you.

4. Vite alias (local dev vs. installed via Composer)

`vite.config.ts`

```ts
import path from 'path';

export default defineConfig({
    resolve: {
        alias: {
            '@inertia-toast': path.resolve(
                __dirname,
                'vendor/polashmahmud/inertia-toast/resources/js',
            ),
        },
    },
});
```

Optionally, add a TypeScript path mapping for better editor DX in `tsconfig.json`:

```jsonc
{
    "compilerOptions": {
        "paths": {
            "@inertia-toast/*": [
                "./packages/PolashMahmud/InertiaToast/resources/js/*",
            ],
        },
    },
}
```

5. (Optional) Publish the config

```bash
php artisan vendor:publish --tag="inertia-toast-config"
```

This creates `config/inertia-toast.php` where you can tweak:

```php
return [
        'position' => 'bottom-right', // top-left | top-center | top-right | bottom-left | bottom-center | bottom-right
        'closeButton' => true,
        'expand' => false,
        'theme' => 'system',          // light | dark | system
        'richColors' => true,
];
```

---

## Usage

From your controller or route, flash to the session. The plugin automatically shows a toast after the Inertia visit finishes.

Minimal (string body):

```php
return back()->with('success', 'That worked nicely');
```

With description (indexed array):

```php
return back()->with('warning', ['That worked nicely', 'Please check again']);
```

With description (associative array):

```php
return back()->with('error', [
        'message' => 'Something went wrong!',
        'description' => 'Please try again after 5 seconds.',
]);
```

Supported types: `success`, `error`, `warning`, `info`.

---

## Troubleshooting

- Changed config but UI didn’t update?
    - Run: `php artisan optimize:clear`
    - Hard refresh the browser (Disable cache in DevTools)
    - Ensure the provider is registered and alias resolves

---

## License

MIT
