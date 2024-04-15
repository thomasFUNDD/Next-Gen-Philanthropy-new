<!DOCTYPE html>
<html>
<head>
    <!-- Other head content... -->
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="preconnect" href="https://fonts.gstatic.com">

    <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;600;700;800&display=swap" rel="stylesheet">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    @viteReactRefresh
    @vite(['resources/js/app/app.jsx','resources/css/app.css', 'resources/css/table.css', 'resources/css/OrderBooks.css', 'resources/css/ContactUs.css','resources/css/LandingPage.css','resources/css/standingOrder.css','resources/css/OrderCard.css'])

    @if (request()->is('/'))
        @vite('resources/css/LandingPage.css')
    @else
        @vite('resources/css/app.css')
    @endif
</head>
<body>
    <div id="app"></div>
</body>
</html>