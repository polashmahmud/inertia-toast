<?php

namespace PolashMahmud\InertiaToast\Middleware;

use Closure;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HandleInertiaToast
{
    /**
     * The supported notification types.
     */
    protected array $toastTypes = [
        'success', 'error', 'warning', 'info',
    ];

    /**
     * Handle an incoming request.
     *
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        Inertia::share('notification', fn () => $this->extractNotification($request));

        return $next($request);
    }

    /**
     * Extract the first available notification from the session.
     *
     * @return array<string, mixed>|null
     */
    protected function extractNotification(Request $request): ?array
    {
        foreach ($this->toastTypes as $type) {
            $sessionValue = $request->session()->get($type);

            if (! $sessionValue) {
                continue;
            }

            [$message, $description] = $this->parseValue($sessionValue);

            return [
                'type' => $type,
                'body' => $message,
                'description' => $description,
            ];
        }

        return null;
    }

    /**
     * Parse the session value into message and description.
     *
     * @return array{0: string|null, 1: string|null}
     */
    protected function parseValue(mixed $value): array
    {
        // Case 1: simple string
        if (is_string($value)) {
            return [$value, null];
        }

        // Case 2: numeric array => [message, description]
        if (is_array($value) && isset($value[0])) {
            return [$value[0], $value[1] ?? null];
        }

        // Case 3: associative array => ['message' => ..., 'description' => ...]
        if (is_array($value)) {
            return [
                $value['message'] ?? null,
                $value['description'] ?? null,
            ];
        }

        return [null, null];
    }
}
