<?php

namespace PolashMahmud\InertiaToast;

use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;
use PolashMahmud\InertiaToast\Middleware\HandleInertiaToast;

class InertiaToastServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        // Publish config
        $this->publishes([
            __DIR__.'/../config/inertia-toast.php' => config_path('inertia-toast.php'),
        ], 'inertia-toast-config');

        // Merge default config with user's config
        $this->mergeConfigFrom(__DIR__.'/../config/inertia-toast.php', 'inertia-toast');

        // Share config with Inertia props
        Inertia::share('toastConfig', config('inertia-toast'));

        // Register the middleware
        $this->app['router']->pushMiddlewareToGroup('web', HandleInertiaToast::class);
    }
}
