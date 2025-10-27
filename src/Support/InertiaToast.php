<?php

namespace Polashmahmud\InertiaToast\Support;

use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Collection;

class InertiaToast
{
    /**
     * Collect flash notifications from the session.
     */
    public static function collect(Request $request): Collection
    {
        return collect(Arr::only($request->session()->all(), ['success', 'error', 'warning', 'info']))
            ->map(fn ($message, $type) => [
                'type' => $type,
                'body' => $message,
            ])
            ->values();
    }

    /**
     * Return formatted notification array for Inertia share().
     */
    public static function share(Request $request): array
    {
        return [
            'notification' => self::collect($request),
        ];
    }
}
