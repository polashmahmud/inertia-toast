<?php

namespace PolashMahmud\InertiaToast;

use Illuminate\Support\ServiceProvider;
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
        // Register the middleware
        $this->app['router']->pushMiddlewareToGroup('web', HandleInertiaToast::class);
    }
}
