<?php

namespace PolashMahmud\InertiaToast;

use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;

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
        Inertia::share('notification', function () {
            return [
                'type' => session()->get('success') ? 'success' :
                         (session()->get('error') ? 'error' :
                         (session()->get('warning') ? 'warning' :
                         (session()->get('info') ? 'info' : null))),
                'body' => session()->get('success')
                    ?? session()->get('error')
                    ?? session()->get('warning')
                    ?? session()->get('info'),
            ];
        });
    }
}
