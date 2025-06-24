<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@yield('title', 'Afet Koordinasyon Sistemi')</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://unpkg.com/alpinejs@3.x.x/dist/cdn.min.js" defer></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        emergency: {
                            50: '#fef2f2',
                            500: '#ef4444',
                            600: '#dc2626',
                            700: '#b91c1c',
                        }
                    }
                }
            }
        }
    </script>
</head>
<body class="bg-gray-50 min-h-screen">
    @include('partials.sidebar')
    
    <div class="ml-64 transition-all duration-300">
        @include('partials.header')
        
        <main class="p-6 pt-20">
            @yield('content')
        </main>
    </div>

    <script>
        // Auto refresh every 30 seconds
        setInterval(() => {
            if (document.hidden) return;
            window.location.reload();
        }, 30000);
    </script>
</body>
</html>