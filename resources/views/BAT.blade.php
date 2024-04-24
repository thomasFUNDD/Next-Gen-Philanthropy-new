<!DOCTYPE html>
<html>
<head>
    <!-- Other head content... -->
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="preconnect" href="https://fonts.gstatic.com">

    <meta name="csrf-token" content="{{ csrf_token() }}">

    @viteReactRefresh
    @vite(['resources/js/app/BATAPP.jsx'])
</head>
<body>
    <div id="root"></div>
</body>
</html>