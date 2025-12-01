<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Default Toaster Options
    |--------------------------------------------------------------------------
    */

    // Toast position
    'position' => 'bottom-right', // top-left, top-center, top-right, bottom-left, bottom-center, bottom-right

    // Show close button?
    'closeButton' => true,

    // Where to place the close button
    'closeButtonPosition' => 'top-right', // top-left, top-right, bottom-left, bottom-right

    // Expand stacked toasts?
    'expand' => false,

    // Theme mode
    'theme' => 'system', // light | dark | system

    // Use vue-sonner rich colors
    'richColors' => true,

    /*
    |--------------------------------------------------------------------------
    | Custom Styles
    |--------------------------------------------------------------------------
    |
    | Here you can define custom styles for the toast component.
    | You can use 'style' for inline styles or 'class' for CSS classes.
    |
    */
    'toastOptions' => [
        'style' => [], // e.g. ['background' => '#fda4af']
        'class' => '', // e.g. 'my-toast'
        'descriptionClass' => '', // e.g. 'my-toast-description'
    ],
];
