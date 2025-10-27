<?php

namespace PolashMahmud\InertiaToast\Middleware;

use Closure;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HandleInertiaToast
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next)
    {
        Inertia::share('notification', function () {
            return [
                'type' => session('success') ? 'success' :
                         (session('error') ? 'error' :
                         (session('warning') ? 'warning' :
                         (session('info') ? 'info' : null))),
                'body' => session('success')
                    ?? session('error')
                    ?? session('warning')
                    ?? session('info'),
            ];
        });

        return $next($request);
    }
}
