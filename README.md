# Inertia Toast

Simple InertiaJS + Vue + Laravel toast notification system using vue-sonner.

## Installation

1. Install the package via composer:

```bash
composer require polashmahmud/inertia-toast
```

2. Install vue-sonner:

```bash
npm install vue-sonner
```

3. Register the service provider in `bootstrap/providers.php`:

```php
return [
    // ... other providers
    PolashMahmud\InertiaToast\InertiaToastServiceProvider::class,
];
```

4. Add the notification plugin to your Vue app in `resources/js/app.ts`:

```typescript
import notification from '@inertia-toast/plugins/notification';
import 'vue-sonner/style.css';

createInertiaApp({
    // ... other config
    setup({ el, App, props, plugin }) {
        createApp({ render: () => h(App, props) })
            .use(plugin)
            .use(notification)
            .mount(el);
    },
});
```

5. Add the Toaster component to your main layout:

```vue
<script setup lang="ts">
import { Toaster } from 'vue-sonner';
</script>

<template>
    <div>
        <!-- Your layout content -->
        <Toaster />
    </div>
</template>
```

6. Update your `vite.config.ts` to add the alias:

```typescript
export default defineConfig({
    resolve: {
        alias: {
            '@inertia-toast': path.resolve(
                __dirname,
                'packages/PolashMahmud/InertiaToast/resources/js',
            ),
        },
    },
});
```

## Usage

In your controller or route, flash messages to the session:

```php
// Success message
return redirect()->back()->with('success', 'Operation completed successfully!');

// Error message
return redirect()->back()->with('error', 'Something went wrong!');

// Warning message
return redirect()->back()->with('warning', 'Please be careful!');

// Info message
return redirect()->back()->with('info', 'Here is some information.');
```

The toast notifications will appear automatically after the page transition!

## How it works

The package automatically:

- Registers a middleware that shares notification data from session to Inertia
- Listens to Inertia navigation events
- Shows toast notifications based on session flash messages
- Clears the notifications after displaying

No additional configuration needed in your HandleInertiaRequests middleware!

## License

MIT
