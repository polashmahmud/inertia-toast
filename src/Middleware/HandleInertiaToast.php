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
        Inertia::share('notification', function () use ($request) {
            $types = ['success', 'error', 'warning', 'info'];

            foreach ($types as $type) {
                if ($request->session()->has($type)) {
                    $value = $request->session()->get($type);

                    // default
                    $message = null;
                    $description = null;

                    // Case 1: string message
                    if (is_string($value)) {
                        $message = $value;
                    }
                    // Case 2: array [message, description]
                    elseif (is_array($value)) {
                        if (isset($value[0])) {
                            $message = $value[0];
                            $description = $value[1] ?? null;
                        } else {
                            $message = $value['message'] ?? null;
                            $description = $value['description'] ?? null;
                        }
                    }

                    return [
                        'type' => $type,
                        'body' => $message,
                        'description' => $description,
                    ];
                }
            }

            return null;
        });

        return $next($request);
    }
}
