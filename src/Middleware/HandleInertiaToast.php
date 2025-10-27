<?php

namespace PolashMahmud\InertiaToast\Middleware;

use Inertia\Middleware;

class HandleInertiaToast extends Middleware
{
    public function share($request)
    {
        return array_merge(parent::share($request), [
            'notification' => [
                'type' => session('success') ? 'success' :
                         (session('error') ? 'error' :
                         (session('warning') ? 'warning' :
                         (session('info') ? 'info' : null))),
                'body' => session('success')
                    ?? session('error')
                    ?? session('warning')
                    ?? session('info'),
            ],
        ]);
    }
}
