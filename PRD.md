<!-- 3. Login/Register Screen -->
<!DOCTYPE html>

<html lang="vi"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Đăng nhập / Đăng ký</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;600&amp;family=Manrope:wght@600;700;800&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    "colors": {
                        "error": "#ba1a1a",
                        "surface-bright": "#f8f9ff",
                        "on-primary-container": "#b7c5ff",
                        "on-error-container": "#93000a",
                        "surface-tint": "#3357bf",
                        "on-tertiary-fixed": "#2a1700",
                        "primary-fixed-dim": "#b5c4ff",
                        "surface-container-high": "#dce9ff",
                        "secondary": "#006c49",
                        "outline-variant": "#c4c5d5",
                        "secondary-fixed": "#6ffbbe",
                        "surface-container-low": "#eff4ff",
                        "on-secondary-container": "#00714d",
                        "on-primary-fixed-variant": "#113da6",
                        "tertiary-fixed": "#ffddb8",
                        "inverse-on-surface": "#eaf1ff",
                        "surface-container": "#e5eeff",
                        "tertiary-fixed-dim": "#ffb95f",
                        "primary": "#003297",
                        "tertiary": "#563400",
                        "on-primary": "#ffffff",
                        "surface": "#f8f9ff",
                        "on-tertiary-fixed-variant": "#653e00",
                        "secondary-container": "#6cf8bb",
                        "on-secondary": "#ffffff",
                        "on-tertiary-container": "#ffb960",
                        "secondary-fixed-dim": "#4edea3",
                        "on-secondary-fixed-variant": "#005236",
                        "primary-fixed": "#dce1ff",
                        "on-secondary-fixed": "#002113",
                        "surface-container-lowest": "#ffffff",
                        "on-surface": "#0b1c30",
                        "on-background": "#0b1c30",
                        "surface-dim": "#cbdbf5",
                        "inverse-surface": "#213145",
                        "surface-container-highest": "#d3e4fe",
                        "background": "#f8f9ff",
                        "on-surface-variant": "#444653",
                        "inverse-primary": "#b5c4ff",
                        "error-container": "#ffdad6",
                        "on-primary-fixed": "#00164e",
                        "on-tertiary": "#ffffff",
                        "surface-variant": "#d3e4fe",
                        "primary-container": "#254bb3",
                        "tertiary-container": "#764900",
                        "on-error": "#ffffff",
                        "outline": "#747684"
                    },
                    "borderRadius": {
                        "DEFAULT": "0.25rem",
                        "lg": "0.5rem",
                        "xl": "0.75rem",
                        "full": "9999px"
                    },
                    "spacing": {
                        "stack-sm": "8px",
                        "gutter": "16px",
                        "stack-md": "16px",
                        "unit": "4px",
                        "tap-target-min": "48px",
                        "stack-lg": "24px",
                        "container-padding": "20px"
                    },
                    "fontFamily": {
                        "body-sm": ["Be Vietnam Pro"],
                        "label-md": ["Be Vietnam Pro"],
                        "body-md": ["Be Vietnam Pro"],
                        "h2": ["Manrope"],
                        "currency-display": ["Manrope"],
                        "h3": ["Manrope"],
                        "body-lg": ["Be Vietnam Pro"],
                        "h1": ["Manrope"]
                    },
                    "fontSize": {
                        "body-sm": ["14px", { "lineHeight": "20px", "fontWeight": "400" }],
                        "label-md": ["14px", { "lineHeight": "16px", "letterSpacing": "0.02em", "fontWeight": "600" }],
                        "body-md": ["16px", { "lineHeight": "24px", "fontWeight": "400" }],
                        "h2": ["24px", { "lineHeight": "32px", "fontWeight": "600" }],
                        "currency-display": ["36px", { "lineHeight": "44px", "fontWeight": "800" }],
                        "h3": ["20px", { "lineHeight": "28px", "fontWeight": "600" }],
                        "body-lg": ["18px", { "lineHeight": "28px", "fontWeight": "400" }],
                        "h1": ["32px", { "lineHeight": "40px", "fontWeight": "700" }]
                    }
                }
            }
        }
    </script>
<style>
    body {
      min-height: max(884px, 100dvh);
    }
  </style>
  </head>
<body class="bg-background text-on-background font-body-md min-h-screen flex flex-col antialiased">
<main class="flex-1 flex items-center justify-center p-container-padding">
<div class="w-full max-w-md bg-surface-container-lowest rounded-xl shadow-[0_10px_30px_0px_rgba(37,75,179,0.08)] overflow-hidden">
<div class="p-8 pb-6 text-center">
<div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-container/10 mb-6 text-primary-container">
<span class="material-symbols-outlined text-4xl" data-icon="account_balance_wallet" style="font-variation-settings: 'FILL' 1;">account_balance_wallet</span>
</div>
<h1 class="font-h2 text-h2 text-on-surface mb-2">Chào mừng trở lại</h1>
<p class="font-body-md text-body-md text-on-surface-variant">Đăng nhập để quản lý chi tiêu của bạn</p>
</div>
<div class="px-8 pb-8 space-y-stack-lg">
<form class="space-y-stack-md">
<div class="relative">
<label class="sr-only" for="email">Email hoặc Số điện thoại</label>
<div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-outline">
<span class="material-symbols-outlined text-xl" data-icon="person">person</span>
</div>
<input class="block w-full pl-12 pr-4 py-4 rounded-lg border-none bg-surface-container-low text-on-surface font-body-md text-body-md placeholder-outline focus:ring-2 focus:ring-primary-container focus:bg-surface-container-lowest transition-colors" id="email" name="email" placeholder="Email hoặc Số điện thoại" type="text"/>
</div>
<div class="relative">
<label class="sr-only" for="password">Mật khẩu</label>
<div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-outline">
<span class="material-symbols-outlined text-xl" data-icon="lock">lock</span>
</div>
<input class="block w-full pl-12 pr-12 py-4 rounded-lg border-none bg-surface-container-low text-on-surface font-body-md text-body-md placeholder-outline focus:ring-2 focus:ring-primary-container focus:bg-surface-container-lowest transition-colors" id="password" name="password" placeholder="Mật khẩu" type="password"/>
<button class="absolute inset-y-0 right-0 pr-4 flex items-center text-outline hover:text-on-surface transition-colors" type="button">
<span class="material-symbols-outlined text-xl" data-icon="visibility_off">visibility_off</span>
</button>
</div>
<div class="flex items-center justify-between pt-2">
<div class="flex items-center">
<input class="h-4 w-4 text-primary-container focus:ring-primary-container border-outline-variant rounded bg-surface-container-low" id="remember-me" name="remember-me" type="checkbox"/>
<label class="ml-2 block font-body-sm text-body-sm text-on-surface-variant" for="remember-me">
                                Ghi nhớ
                            </label>
</div>
<div class="text-sm">
<a class="font-label-md text-label-md text-primary-container hover:text-primary transition-colors" href="#">Quên mật khẩu?</a>
</div>
</div>
<button class="w-full flex justify-center py-4 px-4 border border-transparent rounded-lg shadow-sm font-label-md text-label-md text-on-primary bg-primary-container hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-container min-h-[56px] items-center transition-colors" type="button">
                        Đăng nhập
                    </button>
</form>
<div class="mt-8">
<div class="relative">
<div class="absolute inset-0 flex items-center">
<div class="w-full border-t border-outline-variant"></div>
</div>
<div class="relative flex justify-center text-sm">
<span class="px-2 bg-surface-container-lowest text-on-surface-variant font-body-sm text-body-sm">Hoặc đăng nhập bằng</span>
</div>
</div>
<div class="mt-6 grid grid-cols-2 gap-4">
<button class="w-full inline-flex justify-center py-3 px-4 border border-outline-variant rounded-lg bg-surface-container-lowest font-label-md text-label-md text-on-surface hover:bg-surface-container-low focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-container transition-colors items-center gap-2" type="button">
<svg class="h-5 w-5" fill="currentColor" viewbox="0 0 24 24">
<path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
<path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
<path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"></path>
<path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
</svg>
                            Google
                        </button>
<button class="w-full inline-flex justify-center py-3 px-4 border border-outline-variant rounded-lg bg-surface-container-lowest font-label-md text-label-md text-on-surface hover:bg-surface-container-low focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-container transition-colors items-center gap-2" type="button">
<svg class="h-5 w-5 text-[#1877F2]" fill="currentColor" viewbox="0 0 24 24">
<path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"></path>
</svg>
                            Facebook
                        </button>
</div>
</div>
<div class="mt-8 text-center">
<p class="font-body-md text-body-md text-on-surface-variant">
                        Chưa có tài khoản? 
                        <a class="font-label-md text-label-md text-primary-container hover:text-primary transition-colors ml-1" href="#">Đăng ký ngay</a>
</p>
</div>
</div>
</div>
</main>
</body></html>

<!-- 2. Onboarding Screen -->
<!DOCTYPE html>

<html lang="vi"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Onboarding - Quản lý chi tiêu</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;600&amp;family=Manrope:wght@600;700;800&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    colors: {
                        "error": "#ba1a1a",
                        "surface-bright": "#f8f9ff",
                        "on-primary-container": "#b7c5ff",
                        "on-error-container": "#93000a",
                        "surface-tint": "#3357bf",
                        "on-tertiary-fixed": "#2a1700",
                        "primary-fixed-dim": "#b5c4ff",
                        "surface-container-high": "#dce9ff",
                        "secondary": "#006c49",
                        "outline-variant": "#c4c5d5",
                        "secondary-fixed": "#6ffbbe",
                        "surface-container-low": "#eff4ff",
                        "on-secondary-container": "#00714d",
                        "on-primary-fixed-variant": "#113da6",
                        "tertiary-fixed": "#ffddb8",
                        "inverse-on-surface": "#eaf1ff",
                        "surface-container": "#e5eeff",
                        "tertiary-fixed-dim": "#ffb95f",
                        "primary": "#003297",
                        "tertiary": "#563400",
                        "on-primary": "#ffffff",
                        "surface": "#f8f9ff",
                        "on-tertiary-fixed-variant": "#653e00",
                        "secondary-container": "#6cf8bb",
                        "on-secondary": "#ffffff",
                        "on-tertiary-container": "#ffb960",
                        "secondary-fixed-dim": "#4edea3",
                        "on-secondary-fixed-variant": "#005236",
                        "primary-fixed": "#dce1ff",
                        "on-secondary-fixed": "#002113",
                        "surface-container-lowest": "#ffffff",
                        "on-surface": "#0b1c30",
                        "on-background": "#0b1c30",
                        "surface-dim": "#cbdbf5",
                        "inverse-surface": "#213145",
                        "surface-container-highest": "#d3e4fe",
                        "background": "#f8f9ff",
                        "on-surface-variant": "#444653",
                        "inverse-primary": "#b5c4ff",
                        "error-container": "#ffdad6",
                        "on-primary-fixed": "#00164e",
                        "on-tertiary": "#ffffff",
                        "surface-variant": "#d3e4fe",
                        "primary-container": "#254bb3",
                        "tertiary-container": "#764900",
                        "on-error": "#ffffff",
                        "outline": "#747684"
                    },
                    borderRadius: {
                        "DEFAULT": "0.25rem",
                        "lg": "0.5rem",
                        "xl": "0.75rem",
                        "full": "9999px"
                    },
                    spacing: {
                        "stack-sm": "8px",
                        "gutter": "16px",
                        "stack-md": "16px",
                        "unit": "4px",
                        "tap-target-min": "48px",
                        "stack-lg": "24px",
                        "container-padding": "20px"
                    },
                    fontFamily: {
                        "body-sm": ["Be Vietnam Pro"],
                        "label-md": ["Be Vietnam Pro"],
                        "body-md": ["Be Vietnam Pro"],
                        "h2": ["Manrope"],
                        "currency-display": ["Manrope"],
                        "h3": ["Manrope"],
                        "body-lg": ["Be Vietnam Pro"],
                        "h1": ["Manrope"]
                    },
                    fontSize: {
                        "body-sm": ["14px", {"lineHeight": "20px", "fontWeight": "400"}],
                        "label-md": ["14px", {"lineHeight": "16px", "letterSpacing": "0.02em", "fontWeight": "600"}],
                        "body-md": ["16px", {"lineHeight": "24px", "fontWeight": "400"}],
                        "h2": ["24px", {"lineHeight": "32px", "fontWeight": "600"}],
                        "currency-display": ["36px", {"lineHeight": "44px", "fontWeight": "800"}],
                        "h3": ["20px", {"lineHeight": "28px", "fontWeight": "600"}],
                        "body-lg": ["18px", {"lineHeight": "28px", "fontWeight": "400"}],
                        "h1": ["32px", {"lineHeight": "40px", "fontWeight": "700"}]
                    }
                }
            }
        }
    </script>
<style>
    body {
      min-height: max(884px, 100dvh);
    }
  </style>
  </head>
<body class="bg-background text-on-background min-h-screen flex flex-col justify-between overflow-hidden relative">
<!-- Ambient background blobs -->
<div class="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
<div class="absolute -top-32 -left-32 w-96 h-96 bg-primary-fixed rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
<div class="absolute top-1/4 -right-32 w-80 h-80 bg-secondary-container rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
<div class="absolute -bottom-32 left-1/4 w-96 h-96 bg-surface-variant rounded-full mix-blend-multiply filter blur-3xl opacity-80"></div>
</div>
<!-- Header Actions -->
<header class="flex justify-end p-container-padding z-10 pt-8">
<button class="font-label-md text-label-md text-primary px-4 py-2 hover:bg-surface-container rounded-full transition-colors">
            Bỏ qua
        </button>
</header>
<!-- Main Content Canvas - Carousel simulated -->
<main class="flex-grow flex flex-col justify-center items-center px-container-padding z-10 pb-8">
<!-- Illustration Area - Step 1: Ghi chép nhanh -->
<div class="relative w-full max-w-sm mb-stack-lg flex justify-center items-center aspect-square">
<img alt="Illustration of quick transaction recording" class="w-full h-full object-cover rounded-3xl shadow-[0_10px_30px_0px_rgba(37,75,179,0.08)]" data-alt="Minimalist abstract 3D illustration of a floating receipt, coins, and a green plus sign in soft pastel blue and green colors against a clean light background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCQGaXo_2VQleGdDyDnHwP77dlVRJCD9RU9Xsu6nufKH3VL42nh1bVWFZkHzvR1caOpD4rVtPKO1COIyviKIChwoySiWCjIeJ59bsCbC-6CyV7t1KH4lVFRROEztx34G-7OfWsZHqv5QdfP1PTMAbmh6QSRFbpLDGKskMQaCl3WMNBXf60VaeTz4hh1eMX3xCXCuGjlFp4C7mAg6LdaHbFNaecKHJb2avz9MMT4DAP3Kr6L9yx6oh1mMafOeW69LjhiOLjRBJzBrYs"/>
<!-- Decorative floating element -->
<div class="absolute -bottom-4 right-8 bg-white p-4 rounded-2xl shadow-[0_10px_30px_0px_rgba(37,75,179,0.12)] border border-surface-container">
<span class="material-symbols-outlined text-secondary text-3xl" style="font-variation-settings: 'FILL' 1;">add_circle</span>
</div>
</div>
<!-- Text Content -->
<div class="text-center max-w-sm w-full">
<h1 class="font-h1 text-h1 text-primary mb-stack-sm">Ghi chép nhanh</h1>
<p class="font-body-lg text-body-lg text-on-surface-variant mb-stack-lg">
                Chỉ mất vài giây để ghi lại mọi khoản thu chi. Không còn nỗi lo quên hay thiếu sót.
            </p>
</div>
<!-- Pagination Indicators -->
<div class="flex gap-2 justify-center mt-stack-md">
<div class="w-8 h-2 rounded-full bg-primary transition-all duration-300"></div>
<div class="w-2 h-2 rounded-full bg-primary-fixed-dim transition-all duration-300"></div>
<div class="w-2 h-2 rounded-full bg-primary-fixed-dim transition-all duration-300"></div>
</div>
</main>
<!-- Bottom Actions -->
<footer class="p-container-padding pb-safe mb-8 w-full max-w-sm mx-auto z-10">
<button class="w-full bg-primary text-on-primary font-label-md text-label-md h-[56px] rounded-xl flex justify-center items-center gap-2 shadow-[0_4px_20px_0px_rgba(37,75,179,0.2)] hover:bg-surface-tint transition-colors">
<span>Tiếp theo</span>
<span class="material-symbols-outlined">arrow_forward</span>
</button>
</footer>
</body></html>

<!-- 1. Splash Screen -->
<!DOCTYPE html>

<html lang="vi"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Ví Thông Minh - Splash Screen</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;600&amp;family=Manrope:wght@600;700;800&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
      tailwind.config = {
        darkMode: "class",
        theme: {
          extend: {
            "colors": {
                    "error": "#ba1a1a",
                    "surface-bright": "#f8f9ff",
                    "on-primary-container": "#b7c5ff",
                    "on-error-container": "#93000a",
                    "surface-tint": "#3357bf",
                    "on-tertiary-fixed": "#2a1700",
                    "primary-fixed-dim": "#b5c4ff",
                    "surface-container-high": "#dce9ff",
                    "secondary": "#006c49",
                    "outline-variant": "#c4c5d5",
                    "secondary-fixed": "#6ffbbe",
                    "surface-container-low": "#eff4ff",
                    "on-secondary-container": "#00714d",
                    "on-primary-fixed-variant": "#113da6",
                    "tertiary-fixed": "#ffddb8",
                    "inverse-on-surface": "#eaf1ff",
                    "surface-container": "#e5eeff",
                    "tertiary-fixed-dim": "#ffb95f",
                    "primary": "#003297",
                    "tertiary": "#563400",
                    "on-primary": "#ffffff",
                    "surface": "#f8f9ff",
                    "on-tertiary-fixed-variant": "#653e00",
                    "secondary-container": "#6cf8bb",
                    "on-secondary": "#ffffff",
                    "on-tertiary-container": "#ffb960",
                    "secondary-fixed-dim": "#4edea3",
                    "on-secondary-fixed-variant": "#005236",
                    "primary-fixed": "#dce1ff",
                    "on-secondary-fixed": "#002113",
                    "surface-container-lowest": "#ffffff",
                    "on-surface": "#0b1c30",
                    "on-background": "#0b1c30",
                    "surface-dim": "#cbdbf5",
                    "inverse-surface": "#213145",
                    "surface-container-highest": "#d3e4fe",
                    "background": "#f8f9ff",
                    "on-surface-variant": "#444653",
                    "inverse-primary": "#b5c4ff",
                    "error-container": "#ffdad6",
                    "on-primary-fixed": "#00164e",
                    "on-tertiary": "#ffffff",
                    "surface-variant": "#d3e4fe",
                    "primary-container": "#254bb3",
                    "tertiary-container": "#764900",
                    "on-error": "#ffffff",
                    "outline": "#747684"
            },
            "borderRadius": {
                    "DEFAULT": "0.25rem",
                    "lg": "0.5rem",
                    "xl": "0.75rem",
                    "full": "9999px"
            },
            "spacing": {
                    "stack-sm": "8px",
                    "gutter": "16px",
                    "stack-md": "16px",
                    "unit": "4px",
                    "tap-target-min": "48px",
                    "stack-lg": "24px",
                    "container-padding": "20px"
            },
            "fontFamily": {
                    "body-sm": [
                            "Be Vietnam Pro"
                    ],
                    "label-md": [
                            "Be Vietnam Pro"
                    ],
                    "body-md": [
                            "Be Vietnam Pro"
                    ],
                    "h2": [
                            "Manrope"
                    ],
                    "currency-display": [
                            "Manrope"
                    ],
                    "h3": [
                            "Manrope"
                    ],
                    "body-lg": [
                            "Be Vietnam Pro"
                    ],
                    "h1": [
                            "Manrope"
                    ]
            },
            "fontSize": {
                    "body-sm": [
                            "14px",
                            {
                                    "lineHeight": "20px",
                                    "fontWeight": "400"
                            }
                    ],
                    "label-md": [
                            "14px",
                            {
                                    "lineHeight": "16px",
                                    "letterSpacing": "0.02em",
                                    "fontWeight": "600"
                            }
                    ],
                    "body-md": [
                            "16px",
                            {
                                    "lineHeight": "24px",
                                    "fontWeight": "400"
                            }
                    ],
                    "h2": [
                            "24px",
                            {
                                    "lineHeight": "32px",
                                    "fontWeight": "600"
                            }
                    ],
                    "currency-display": [
                            "36px",
                            {
                                    "lineHeight": "44px",
                                    "fontWeight": "800"
                            }
                    ],
                    "h3": [
                            "20px",
                            {
                                    "lineHeight": "28px",
                                    "fontWeight": "600"
                            }
                    ],
                    "body-lg": [
                            "18px",
                            {
                                    "lineHeight": "28px",
                                    "fontWeight": "400"
                            }
                    ],
                    "h1": [
                            "32px",
                            {
                                    "lineHeight": "40px",
                                    "fontWeight": "700"
                            }
                    ]
            }
    },
        },
      }
    </script>
<style>
    body {
      min-height: max(884px, 100dvh);
    }
  </style>
  </head>
<body class="bg-primary-container min-h-screen flex flex-col justify-center items-center relative overflow-hidden antialiased">
<!-- Decorative Background Elements -->
<div class="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
<div class="absolute -top-20 -right-20 w-96 h-96 bg-primary-fixed opacity-10 rounded-full blur-3xl"></div>
<div class="absolute bottom-10 -left-20 w-80 h-80 bg-secondary-fixed opacity-10 rounded-full blur-3xl"></div>
</div>
<!-- Main Content Container -->
<main class="relative z-10 flex flex-col items-center justify-center p-container-padding text-center">
<!-- Logo Area -->
<div class="mb-stack-lg relative">
<!-- Outer Ring -->
<div class="absolute inset-0 bg-white opacity-10 rounded-full scale-125 animate-pulse"></div>
<!-- Inner Circle / Logo Background -->
<div class="w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-lg relative z-10">
<span class="material-symbols-outlined text-[64px] text-primary-container" style="font-variation-settings: 'FILL' 1;">
                    account_balance_wallet
                </span>
</div>
</div>
<!-- App Name -->
<h1 class="font-h1 text-h1 text-on-primary mb-stack-sm tracking-tight">
            Ví Thông Minh
        </h1>
<!-- Tagline / Subtitle -->
<p class="font-body-lg text-body-lg text-on-primary-container opacity-90 max-w-xs">
            Quản lý tài chính cá nhân dễ dàng và hiệu quả.
        </p>
</main>
<!-- Bottom Indicator (Loading or Action) -->
<div class="absolute bottom-12 left-0 right-0 flex flex-col items-center justify-center px-container-padding">
<!-- Optional Loading Dots / Bar could go here, keeping it minimal for now -->
<div class="w-12 h-1 bg-white opacity-30 rounded-full"></div>
</div>
</body></html>

<!-- 4. Dashboard Home -->
<!DOCTYPE html>

<html lang="vi"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Dashboard Quản lý chi tiêu</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;600&amp;family=Manrope:wght@600;700;800&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
      tailwind.config = {
        darkMode: "class",
        theme: {
          extend: {
            "colors": {
                    "error": "#ba1a1a",
                    "surface-bright": "#f8f9ff",
                    "on-primary-container": "#b7c5ff",
                    "on-error-container": "#93000a",
                    "surface-tint": "#3357bf",
                    "on-tertiary-fixed": "#2a1700",
                    "primary-fixed-dim": "#b5c4ff",
                    "surface-container-high": "#dce9ff",
                    "secondary": "#006c49",
                    "outline-variant": "#c4c5d5",
                    "secondary-fixed": "#6ffbbe",
                    "surface-container-low": "#eff4ff",
                    "on-secondary-container": "#00714d",
                    "on-primary-fixed-variant": "#113da6",
                    "tertiary-fixed": "#ffddb8",
                    "inverse-on-surface": "#eaf1ff",
                    "surface-container": "#e5eeff",
                    "tertiary-fixed-dim": "#ffb95f",
                    "primary": "#003297",
                    "tertiary": "#563400",
                    "on-primary": "#ffffff",
                    "surface": "#f8f9ff",
                    "on-tertiary-fixed-variant": "#653e00",
                    "secondary-container": "#6cf8bb",
                    "on-secondary": "#ffffff",
                    "on-tertiary-container": "#ffb960",
                    "secondary-fixed-dim": "#4edea3",
                    "on-secondary-fixed-variant": "#005236",
                    "primary-fixed": "#dce1ff",
                    "on-secondary-fixed": "#002113",
                    "surface-container-lowest": "#ffffff",
                    "on-surface": "#0b1c30",
                    "on-background": "#0b1c30",
                    "surface-dim": "#cbdbf5",
                    "inverse-surface": "#213145",
                    "surface-container-highest": "#d3e4fe",
                    "background": "#f8f9ff",
                    "on-surface-variant": "#444653",
                    "inverse-primary": "#b5c4ff",
                    "error-container": "#ffdad6",
                    "on-primary-fixed": "#00164e",
                    "on-tertiary": "#ffffff",
                    "surface-variant": "#d3e4fe",
                    "primary-container": "#254bb3",
                    "tertiary-container": "#764900",
                    "on-error": "#ffffff",
                    "outline": "#747684"
            },
            "borderRadius": {
                    "DEFAULT": "0.25rem",
                    "lg": "0.5rem",
                    "xl": "0.75rem",
                    "full": "9999px"
            },
            "spacing": {
                    "stack-sm": "8px",
                    "gutter": "16px",
                    "stack-md": "16px",
                    "unit": "4px",
                    "tap-target-min": "48px",
                    "stack-lg": "24px",
                    "container-padding": "20px"
            },
            "fontFamily": {
                    "body-sm": ["Be Vietnam Pro"],
                    "label-md": ["Be Vietnam Pro"],
                    "body-md": ["Be Vietnam Pro"],
                    "h2": ["Manrope"],
                    "currency-display": ["Manrope"],
                    "h3": ["Manrope"],
                    "body-lg": ["Be Vietnam Pro"],
                    "h1": ["Manrope"]
            },
            "fontSize": {
                    "body-sm": ["14px", {"lineHeight": "20px", "fontWeight": "400"}],
                    "label-md": ["14px", {"lineHeight": "16px", "letterSpacing": "0.02em", "fontWeight": "600"}],
                    "body-md": ["16px", {"lineHeight": "24px", "fontWeight": "400"}],
                    "h2": ["24px", {"lineHeight": "32px", "fontWeight": "600"}],
                    "currency-display": ["36px", {"lineHeight": "44px", "fontWeight": "800"}],
                    "h3": ["20px", {"lineHeight": "28px", "fontWeight": "600"}],
                    "body-lg": ["18px", {"lineHeight": "28px", "fontWeight": "400"}],
                    "h1": ["32px", {"lineHeight": "40px", "fontWeight": "700"}]
            }
          }
        }
      }
    </script>
<style>
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
    </style>
<style>
    body {
      min-height: max(884px, 100dvh);
    }
  </style>
  </head>
<body class="bg-background text-on-background font-body-md min-h-screen antialiased selection:bg-primary selection:text-on-primary">
<!-- TopAppBar (From JSON) -->
<header class="bg-slate-50 dark:bg-slate-950 flex justify-between items-center px-5 h-16 w-full fixed top-0 z-50 text-[#254BB3] dark:text-blue-400 font-manrope font-bold text-lg tracking-tight docked full-width top-0 flat no-shadows">
<button aria-label="Menu" class="flex items-center justify-center w-tap-target-min h-tap-target-min hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors rounded-full">
<span class="material-symbols-outlined">menu</span>
</button>
<span class="font-extrabold text-xl">Quản lý chi tiêu</span>
<div class="w-10 h-10 rounded-full overflow-hidden border-2 border-surface-container hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
<img alt="User Profile Avatar" class="w-full h-full object-cover" data-alt="close-up portrait of a smiling young man with short brown hair wearing a white t-shirt against a clean light background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB4m1XEFCyykV34BgTNVAR7i3MH0G8bFvsEZ34xXtHgZp4l4ux8Lfh7DgYAXx5rJRRJzjr8yi9y_YX_CiNjqHR1GhGUDHDQkTWIEF5EsKr1_xioijHL9jUj8OEFcpc-zNf_GCVt6ArW9upUxwPUI6Adt9-lSagjzXC1JMgco0Gv6tIpWcc2TV62uE8uNw3hK1d39pkHWHEsVoy6B_g3MVOlqBYLiOeJUAsxqtr8V5PvxTamsEJWv6XOLhQfwhM9v-dN8m6yNmkDd2Y"/>
</div>
</header>
<!-- Main Content Canvas -->
<main class="pt-[88px] pb-[120px] px-container-padding flex flex-col gap-stack-lg w-full max-w-3xl mx-auto">
<!-- Total Balance Highlight Card -->
<section class="bg-primary text-on-primary rounded-xl p-stack-lg flex flex-col gap-stack-sm relative overflow-hidden shadow-[0_10px_30px_rgba(0,50,151,0.2)]">
<div class="absolute -right-10 -top-10 w-48 h-48 bg-white opacity-5 rounded-full blur-2xl"></div>
<div class="absolute -left-10 -bottom-10 w-32 h-32 bg-white opacity-5 rounded-full blur-xl"></div>
<div class="flex items-center justify-between z-10">
<h2 class="font-label-md text-label-md opacity-80 uppercase tracking-wider">Tổng số dư</h2>
<button aria-label="Hide balance" class="opacity-80 hover:opacity-100 transition-opacity">
<span class="material-symbols-outlined text-[20px]">visibility</span>
</button>
</div>
<p class="font-currency-display text-currency-display z-10 tracking-tight mt-unit">24.500.000 <span class="text-h3 font-h3 opacity-80">₫</span></p>
</section>
<!-- Income & Expense Summary Bento Grid -->
<section class="grid grid-cols-2 gap-gutter">
<!-- Income Card -->
<div class="bg-surface-container-lowest p-stack-md rounded-xl flex flex-col gap-stack-sm shadow-[0_4px_20px_0px_rgba(37,75,179,0.04)] border border-surface-variant">
<div class="flex items-center gap-unit">
<div class="w-8 h-8 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container">
<span class="material-symbols-outlined text-[18px]">arrow_downward</span>
</div>
<span class="font-label-md text-label-md text-on-surface-variant">Tổng thu hôm nay</span>
</div>
<p class="font-h3 text-h3 text-secondary">+1.250.000 ₫</p>
</div>
<!-- Expense Card -->
<div class="bg-surface-container-lowest p-stack-md rounded-xl flex flex-col gap-stack-sm shadow-[0_4px_20px_0px_rgba(37,75,179,0.04)] border border-surface-variant">
<div class="flex items-center gap-unit">
<div class="w-8 h-8 rounded-full bg-error-container flex items-center justify-center text-on-error-container">
<span class="material-symbols-outlined text-[18px]">arrow_upward</span>
</div>
<span class="font-label-md text-label-md text-on-surface-variant">Tổng chi hôm nay</span>
</div>
<p class="font-h3 text-h3 text-error">-340.000 ₫</p>
</div>
</section>
<!-- Recent Transactions -->
<section class="flex flex-col gap-stack-md mt-stack-sm">
<div class="flex items-center justify-between">
<h3 class="font-h2 text-h2 text-on-surface">Giao dịch gần đây</h3>
<button class="font-label-md text-label-md text-primary hover:text-primary-container transition-colors">Xem tất cả</button>
</div>
<div class="flex flex-col gap-unit">
<!-- Transaction Item 1 -->
<div class="bg-surface-container-lowest p-stack-md rounded-xl flex items-center justify-between shadow-[0_2px_10px_0px_rgba(37,75,179,0.02)] hover:bg-surface-container transition-colors cursor-pointer">
<div class="flex items-center gap-gutter">
<div class="w-12 h-12 rounded-xl bg-tertiary-container/10 flex items-center justify-center text-tertiary-container border border-tertiary-container/20">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">restaurant</span>
</div>
<div class="flex flex-col">
<span class="font-body-md text-body-md text-on-surface font-medium">Ăn uống</span>
<span class="font-body-sm text-body-sm text-on-surface-variant">Hôm nay, 12:30</span>
</div>
</div>
<span class="font-h3 text-h3 text-on-surface">-120.000 ₫</span>
</div>
<!-- Transaction Item 2 -->
<div class="bg-surface-container-lowest p-stack-md rounded-xl flex items-center justify-between shadow-[0_2px_10px_0px_rgba(37,75,179,0.02)] hover:bg-surface-container transition-colors cursor-pointer">
<div class="flex items-center gap-gutter">
<div class="w-12 h-12 rounded-xl bg-primary-container/10 flex items-center justify-center text-primary-container border border-primary-container/20">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">directions_car</span>
</div>
<div class="flex flex-col">
<span class="font-body-md text-body-md text-on-surface font-medium">Di chuyển</span>
<span class="font-body-sm text-body-sm text-on-surface-variant">Hôm nay, 08:15</span>
</div>
</div>
<span class="font-h3 text-h3 text-on-surface">-50.000 ₫</span>
</div>
<!-- Transaction Item 3 -->
<div class="bg-surface-container-lowest p-stack-md rounded-xl flex items-center justify-between shadow-[0_2px_10px_0px_rgba(37,75,179,0.02)] hover:bg-surface-container transition-colors cursor-pointer">
<div class="flex items-center gap-gutter">
<div class="w-12 h-12 rounded-xl bg-secondary-container/20 flex items-center justify-center text-secondary border border-secondary/20">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">account_balance_wallet</span>
</div>
<div class="flex flex-col">
<span class="font-body-md text-body-md text-on-surface font-medium">Lương tháng</span>
<span class="font-body-sm text-body-sm text-on-surface-variant">Hôm qua, 15:00</span>
</div>
</div>
<span class="font-h3 text-h3 text-secondary">+15.000.000 ₫</span>
</div>
</div>
</section>
</main>
<!-- BottomNavBar (From JSON) -->
<nav class="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pt-3 pb-safe bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 shadow-[0_-4px_20px_0px_rgba(37,75,179,0.04)] docked full-width bottom-0 rounded-t-lg pb-6">
<!-- Active Tab: Trang chủ -->
<a aria-current="page" class="text-[#254BB3] dark:text-blue-400 flex flex-col items-center gap-1 hover:text-[#254BB3] transition-all font-manrope text-[11px] font-medium" href="#">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">home</span>
<span>Trang chủ</span>
</a>
<!-- Inactive Tab: Giao dịch -->
<a class="text-slate-400 dark:text-slate-500 flex flex-col items-center gap-1 hover:text-[#254BB3] transition-all font-manrope text-[11px] font-medium" href="#">
<span class="material-symbols-outlined">receipt_long</span>
<span>Giao dịch</span>
</a>
<!-- Inactive Tab: Thêm mới (Prominent action) -->
<a class="text-slate-400 dark:text-slate-500 flex flex-col items-center gap-1 hover:text-[#254BB3] transition-all font-manrope text-[11px] font-medium -mt-5" href="#">
<div class="bg-primary text-on-primary w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:bg-surface-tint transition-colors">
<span class="material-symbols-outlined text-[32px]">add</span>
</div>
<span>Thêm mới</span>
</a>
<!-- Inactive Tab: Báo cáo -->
<a class="text-slate-400 dark:text-slate-500 flex flex-col items-center gap-1 hover:text-[#254BB3] transition-all font-manrope text-[11px] font-medium" href="#">
<span class="material-symbols-outlined">leaderboard</span>
<span>Báo cáo</span>
</a>
<!-- Inactive Tab: Tài khoản -->
<a class="text-slate-400 dark:text-slate-500 flex flex-col items-center gap-1 hover:text-[#254BB3] transition-all font-manrope text-[11px] font-medium" href="#">
<span class="material-symbols-outlined">person</span>
<span>Tài khoản</span>
</a>
</nav>
</body></html>

<!-- 5. Add Transaction -->
<!DOCTYPE html>

<html lang="vi"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Thêm giao dịch</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com" rel="preconnect"/>
<link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"/>
<link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;600&amp;family=Manrope:wght@600;700;800&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    "colors": {
                        "error": "#ba1a1a",
                        "surface-bright": "#f8f9ff",
                        "on-primary-container": "#b7c5ff",
                        "on-error-container": "#93000a",
                        "surface-tint": "#3357bf",
                        "on-tertiary-fixed": "#2a1700",
                        "primary-fixed-dim": "#b5c4ff",
                        "surface-container-high": "#dce9ff",
                        "secondary": "#006c49",
                        "outline-variant": "#c4c5d5",
                        "secondary-fixed": "#6ffbbe",
                        "surface-container-low": "#eff4ff",
                        "on-secondary-container": "#00714d",
                        "on-primary-fixed-variant": "#113da6",
                        "tertiary-fixed": "#ffddb8",
                        "inverse-on-surface": "#eaf1ff",
                        "surface-container": "#e5eeff",
                        "tertiary-fixed-dim": "#ffb95f",
                        "primary": "#003297",
                        "tertiary": "#563400",
                        "on-primary": "#ffffff",
                        "surface": "#f8f9ff",
                        "on-tertiary-fixed-variant": "#653e00",
                        "secondary-container": "#6cf8bb",
                        "on-secondary": "#ffffff",
                        "on-tertiary-container": "#ffb960",
                        "secondary-fixed-dim": "#4edea3",
                        "on-secondary-fixed-variant": "#005236",
                        "primary-fixed": "#dce1ff",
                        "on-secondary-fixed": "#002113",
                        "surface-container-lowest": "#ffffff",
                        "on-surface": "#0b1c30",
                        "on-background": "#0b1c30",
                        "surface-dim": "#cbdbf5",
                        "inverse-surface": "#213145",
                        "surface-container-highest": "#d3e4fe",
                        "background": "#f8f9ff",
                        "on-surface-variant": "#444653",
                        "inverse-primary": "#b5c4ff",
                        "error-container": "#ffdad6",
                        "on-primary-fixed": "#00164e",
                        "on-tertiary": "#ffffff",
                        "surface-variant": "#d3e4fe",
                        "primary-container": "#254bb3",
                        "tertiary-container": "#764900",
                        "on-error": "#ffffff",
                        "outline": "#747684"
                    },
                    "borderRadius": {
                        "DEFAULT": "0.25rem",
                        "lg": "0.5rem",
                        "xl": "0.75rem",
                        "full": "9999px"
                    },
                    "spacing": {
                        "stack-sm": "8px",
                        "gutter": "16px",
                        "stack-md": "16px",
                        "unit": "4px",
                        "tap-target-min": "48px",
                        "stack-lg": "24px",
                        "container-padding": "20px"
                    },
                    "fontFamily": {
                        "body-sm": ["Be Vietnam Pro"],
                        "label-md": ["Be Vietnam Pro"],
                        "body-md": ["Be Vietnam Pro"],
                        "h2": ["Manrope"],
                        "currency-display": ["Manrope"],
                        "h3": ["Manrope"],
                        "body-lg": ["Be Vietnam Pro"],
                        "h1": ["Manrope"]
                    },
                    "fontSize": {
                        "body-sm": ["14px", { "lineHeight": "20px", "fontWeight": "400" }],
                        "label-md": ["14px", { "lineHeight": "16px", "letterSpacing": "0.02em", "fontWeight": "600" }],
                        "body-md": ["16px", { "lineHeight": "24px", "fontWeight": "400" }],
                        "h2": ["24px", { "lineHeight": "32px", "fontWeight": "600" }],
                        "currency-display": ["36px", { "lineHeight": "44px", "fontWeight": "800" }],
                        "h3": ["20px", { "lineHeight": "28px", "fontWeight": "600" }],
                        "body-lg": ["18px", { "lineHeight": "28px", "fontWeight": "400" }],
                        "h1": ["32px", { "lineHeight": "40px", "fontWeight": "700" }]
                    }
                }
            }
        }
    </script>
<style>
        .material-symbols-outlined {
            font-family: 'Material Symbols Outlined';
            font-weight: normal;
            font-style: normal;
            font-size: 24px;
            line-height: 1;
            letter-spacing: normal;
            text-transform: none;
            display: inline-block;
            white-space: nowrap;
            word-wrap: normal;
            direction: ltr;
            -webkit-font-feature-settings: 'liga';
            -webkit-font-smoothing: antialiased;
        }
        .ambient-shadow-level-1 {
            box-shadow: 0 4px 20px 0 rgba(37, 75, 179, 0.04);
        }
        .ambient-shadow-level-2 {
            box-shadow: 0 10px 30px 0 rgba(37, 75, 179, 0.08);
        }
        /* Custom input clear styles for raw numeric entry */
        input[type="number"]::-webkit-inner-spin-button,
        input[type="number"]::-webkit-outer-spin-button {
            -webkit-appearance: none;
            margin: 0;
        }
        input[type="number"] {
            -moz-appearance: textfield;
        }
    </style>
<style>
    body {
      min-height: max(884px, 100dvh);
    }
  </style>
  </head>
<body class="bg-background text-on-background antialiased">
<!-- TopAppBar -->
<header class="bg-slate-50 dark:bg-slate-950 flex justify-between items-center px-5 h-16 w-full fixed top-0 z-50 docked full-width top-0 flat no-shadows">
<button class="text-[#254BB3] dark:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors Active: opacity-80 scale-95 transition-all p-2 rounded-full flex items-center justify-center">
<span class="material-symbols-outlined" data-icon="menu">menu</span>
</button>
<h1 class="text-[#254BB3] dark:text-blue-400 font-manrope font-bold text-lg tracking-tight">Quản lý chi tiêu</h1>
<div class="w-10 h-10 rounded-full overflow-hidden bg-surface-variant flex items-center justify-center">
<img alt="User Profile Avatar" class="w-full h-full object-cover" data-alt="close-up portrait of a smiling young professional man with short dark hair wearing a casual blue shirt against a light studio background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAVf5Q0xJ0BWf-Fg9jDtyyLJMyDzRyGdQXQqu7jR6z7Qn4vkyfyXjNIw-hpl3SN4bTlAajMo5UdnYvFlzCDe8o7GAiCde9oBcuGcjAFQa1UA8yNNEaEc_BbLvicVoCbf89adS20nDp3n_bFYP0OZmz4leNK9qebiFdHV6M2s03P0DHsbCDHe2k1DMkDEjIbShd1i4kd9903d4TA-DKyfWE8fepgHSZtr0fH8MKiKRdMPr8R6co0wfF2uaDPQkOddB6MyaTpf3Mi5cM"/>
</div>
</header>
<!-- Main Content Canvas -->
<main class="pt-[80px] pb-[100px] px-container-padding flex flex-col gap-stack-lg max-w-lg mx-auto">
<!-- Amount Input Area -->
<section class="bg-surface-container-lowest rounded-xl p-gutter ambient-shadow-level-1 flex flex-col items-center justify-center text-center">
<label class="font-label-md text-label-md text-on-surface-variant mb-stack-sm">Số tiền</label>
<div class="flex items-center justify-center w-full">
<input class="w-full bg-transparent border-none text-center font-currency-display text-currency-display text-primary placeholder:text-surface-variant focus:ring-0 p-0" placeholder="0" type="number" value=""/>
<span class="font-h2 text-h2 text-on-surface-variant ml-unit">đ</span>
</div>
</section>
<!-- Transaction Type Toggle -->
<section class="flex bg-surface-container-low rounded-lg p-unit">
<button class="flex-1 py-3 rounded bg-surface-container-lowest ambient-shadow-level-1 font-label-md text-label-md text-primary text-center">
                Chi tiêu
            </button>
<button class="flex-1 py-3 rounded font-label-md text-label-md text-on-surface-variant text-center hover:bg-surface-container-lowest transition-colors">
                Thu nhập
            </button>
</section>
<!-- Category Selection -->
<section class="flex flex-col gap-stack-sm">
<h2 class="font-label-md text-label-md text-on-surface">Danh mục</h2>
<div class="grid grid-cols-4 gap-stack-md">
<!-- Category Item: Food -->
<div class="flex flex-col items-center gap-unit cursor-pointer">
<div class="w-14 h-14 rounded-full bg-surface-container-high flex items-center justify-center text-primary-container">
<span class="material-symbols-outlined" data-icon="restaurant" style="font-variation-settings: 'FILL' 1;">restaurant</span>
</div>
<span class="font-body-sm text-body-sm text-on-surface text-center">Ăn uống</span>
</div>
<!-- Category Item: Shopping -->
<div class="flex flex-col items-center gap-unit cursor-pointer opacity-50">
<div class="w-14 h-14 rounded-full bg-surface-container-low flex items-center justify-center text-on-surface-variant">
<span class="material-symbols-outlined" data-icon="shopping_bag">shopping_bag</span>
</div>
<span class="font-body-sm text-body-sm text-on-surface-variant text-center">Mua sắm</span>
</div>
<!-- Category Item: Transport -->
<div class="flex flex-col items-center gap-unit cursor-pointer opacity-50">
<div class="w-14 h-14 rounded-full bg-surface-container-low flex items-center justify-center text-on-surface-variant">
<span class="material-symbols-outlined" data-icon="commute">commute</span>
</div>
<span class="font-body-sm text-body-sm text-on-surface-variant text-center">Di chuyển</span>
</div>
<!-- Category Item: More -->
<div class="flex flex-col items-center gap-unit cursor-pointer opacity-50">
<div class="w-14 h-14 rounded-full bg-surface-container-low flex items-center justify-center text-on-surface-variant border border-dashed border-outline-variant">
<span class="material-symbols-outlined" data-icon="more_horiz">more_horiz</span>
</div>
<span class="font-body-sm text-body-sm text-on-surface-variant text-center">Thêm</span>
</div>
</div>
</section>
<!-- Form Inputs (Date, Note) -->
<section class="flex flex-col gap-stack-md">
<!-- Date Input -->
<div class="bg-surface-container-low rounded-lg p-3 px-4 flex items-center gap-gutter border-b-2 border-transparent focus-within:border-primary-container transition-colors">
<span class="material-symbols-outlined text-primary-container" data-icon="calendar_month">calendar_month</span>
<div class="flex flex-col flex-1">
<label class="font-body-sm text-body-sm text-on-surface-variant text-[11px] uppercase tracking-wider">Ngày giao dịch</label>
<input class="bg-transparent border-none p-0 font-body-md text-body-md text-on-surface focus:ring-0 w-full" readonly="" type="text" value="Hôm nay, 24/10/2023"/>
</div>
</div>
<!-- Note Input -->
<div class="bg-surface-container-low rounded-lg p-3 px-4 flex items-start gap-gutter border-b-2 border-transparent focus-within:border-primary-container transition-colors min-h-[100px]">
<span class="material-symbols-outlined text-on-surface-variant mt-1" data-icon="notes">notes</span>
<div class="flex flex-col flex-1 h-full">
<label class="font-body-sm text-body-sm text-on-surface-variant text-[11px] uppercase tracking-wider">Ghi chú</label>
<textarea class="bg-transparent border-none p-0 mt-1 font-body-md text-body-md text-on-surface focus:ring-0 w-full resize-none outline-none" placeholder="Thêm mô tả cho giao dịch này..."></textarea>
</div>
</div>
</section>
<!-- Save Button -->
<div class="mt-auto pt-stack-md">
<button class="w-full h-[56px] bg-primary-container text-[#ffffff] rounded-full font-label-md text-label-md ambient-shadow-level-1 flex items-center justify-center gap-unit hover:opacity-90 transition-opacity">
                Lưu giao dịch
            </button>
</div>
</main>
<!-- BottomNavBar -->
<nav class="bg-white dark:bg-slate-900 fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pt-3 pb-safe docked full-width bottom-0 rounded-t-lg border-t border-slate-100 dark:border-slate-800 shadow-[0_-4px_20px_0px_rgba(37,75,179,0.04)]">
<!-- Trang chủ -->
<a class="text-slate-400 dark:text-slate-500 flex flex-col items-center gap-1 hover:text-[#254BB3] transition-all font-manrope text-[11px] font-medium" href="#">
<span class="material-symbols-outlined" data-icon="home">home</span>
<span>Trang chủ</span>
</a>
<!-- Giao dịch -->
<a class="text-slate-400 dark:text-slate-500 flex flex-col items-center gap-1 hover:text-[#254BB3] transition-all font-manrope text-[11px] font-medium" href="#">
<span class="material-symbols-outlined" data-icon="receipt_long">receipt_long</span>
<span>Giao dịch</span>
</a>
<!-- Thêm mới (Active) -->
<a class="text-[#254BB3] dark:text-blue-400 flex flex-col items-center gap-1 hover:text-[#254BB3] transition-all Active: scale-90 duration-150 font-manrope text-[11px] font-medium" href="#">
<span class="material-symbols-outlined" data-icon="add_circle" style="font-variation-settings: 'FILL' 1;">add_circle</span>
<span>Thêm mới</span>
</a>
<!-- Báo cáo -->
<a class="text-slate-400 dark:text-slate-500 flex flex-col items-center gap-1 hover:text-[#254BB3] transition-all font-manrope text-[11px] font-medium" href="#">
<span class="material-symbols-outlined" data-icon="leaderboard">leaderboard</span>
<span>Báo cáo</span>
</a>
<!-- Tài khoản -->
<a class="text-slate-400 dark:text-slate-500 flex flex-col items-center gap-1 hover:text-[#254BB3] transition-all font-manrope text-[11px] font-medium" href="#">
<span class="material-symbols-outlined" data-icon="person">person</span>
<span>Tài khoản</span>
</a>
</nav>
</body></html>

<!-- 6. Transaction List -->
<!DOCTYPE html>

<html lang="vi"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover" name="viewport"/>
<title>Giao dịch</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;600&amp;family=Manrope:wght@600;700;800&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    colors: {
                        "error": "#ba1a1a",
                        "surface-bright": "#f8f9ff",
                        "on-primary-container": "#b7c5ff",
                        "on-error-container": "#93000a",
                        "surface-tint": "#3357bf",
                        "on-tertiary-fixed": "#2a1700",
                        "primary-fixed-dim": "#b5c4ff",
                        "surface-container-high": "#dce9ff",
                        "secondary": "#006c49",
                        "outline-variant": "#c4c5d5",
                        "secondary-fixed": "#6ffbbe",
                        "surface-container-low": "#eff4ff",
                        "on-secondary-container": "#00714d",
                        "on-primary-fixed-variant": "#113da6",
                        "tertiary-fixed": "#ffddb8",
                        "inverse-on-surface": "#eaf1ff",
                        "surface-container": "#e5eeff",
                        "tertiary-fixed-dim": "#ffb95f",
                        "primary": "#003297",
                        "tertiary": "#563400",
                        "on-primary": "#ffffff",
                        "surface": "#f8f9ff",
                        "on-tertiary-fixed-variant": "#653e00",
                        "secondary-container": "#6cf8bb",
                        "on-secondary": "#ffffff",
                        "on-tertiary-container": "#ffb960",
                        "secondary-fixed-dim": "#4edea3",
                        "on-secondary-fixed-variant": "#005236",
                        "primary-fixed": "#dce1ff",
                        "on-secondary-fixed": "#002113",
                        "surface-container-lowest": "#ffffff",
                        "on-surface": "#0b1c30",
                        "on-background": "#0b1c30",
                        "surface-dim": "#cbdbf5",
                        "inverse-surface": "#213145",
                        "surface-container-highest": "#d3e4fe",
                        "background": "#f8f9ff",
                        "on-surface-variant": "#444653",
                        "inverse-primary": "#b5c4ff",
                        "error-container": "#ffdad6",
                        "on-primary-fixed": "#00164e",
                        "on-tertiary": "#ffffff",
                        "surface-variant": "#d3e4fe",
                        "primary-container": "#254bb3",
                        "tertiary-container": "#764900",
                        "on-error": "#ffffff",
                        "outline": "#747684"
                    },
                    borderRadius: {
                        "DEFAULT": "0.25rem",
                        "lg": "0.5rem",
                        "xl": "0.75rem",
                        "full": "9999px"
                    },
                    spacing: {
                        "stack-sm": "8px",
                        "gutter": "16px",
                        "stack-md": "16px",
                        "unit": "4px",
                        "tap-target-min": "48px",
                        "stack-lg": "24px",
                        "container-padding": "20px"
                    },
                    fontFamily: {
                        "body-sm": ["Be Vietnam Pro"],
                        "label-md": ["Be Vietnam Pro"],
                        "body-md": ["Be Vietnam Pro"],
                        "h2": ["Manrope"],
                        "currency-display": ["Manrope"],
                        "h3": ["Manrope"],
                        "body-lg": ["Be Vietnam Pro"],
                        "h1": ["Manrope"]
                    },
                    fontSize: {
                        "body-sm": ["14px", { lineHeight: "20px", fontWeight: "400" }],
                        "label-md": ["14px", { lineHeight: "16px", letterSpacing: "0.02em", fontWeight: "600" }],
                        "body-md": ["16px", { lineHeight: "24px", fontWeight: "400" }],
                        "h2": ["24px", { lineHeight: "32px", fontWeight: "600" }],
                        "currency-display": ["36px", { lineHeight: "44px", fontWeight: "800" }],
                        "h3": ["20px", { lineHeight: "28px", fontWeight: "600" }],
                        "body-lg": ["18px", { lineHeight: "28px", fontWeight: "400" }],
                        "h1": ["32px", { lineHeight: "40px", fontWeight: "700" }]
                    }
                }
            }
        }
    </script>
<style>
        body {
            background-color: theme('colors.background');
            color: theme('colors.on-background');
            -webkit-tap-highlight-color: transparent;
        }
        .glass-card {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
        }
        .icon-duotone {
            color: theme('colors.primary-container');
            background-color: theme('colors.surface-container-high');
        }
        /* Custom scrollbar for webkit */
        ::-webkit-scrollbar {
            width: 0px;
            background: transparent;
        }
        .safe-bottom {
            padding-bottom: env(safe-area-inset-bottom, 20px);
        }
        .pb-safe {
            padding-bottom: max(env(safe-area-inset-bottom), 12px);
        }
    </style>
<style>
    body {
      min-height: max(884px, 100dvh);
    }
  </style>
  </head>
<body class="font-body-md text-body-md antialiased min-h-screen flex flex-col">
<!-- TopAppBar -->
<header class="bg-slate-50 dark:bg-slate-950 flex justify-between items-center px-5 h-16 w-full fixed top-0 z-50 flat no-shadows">
<button aria-label="Menu" class="w-tap-target-min h-tap-target-min flex items-center justify-start hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors Active: opacity-80 scale-95 transition-all">
<span class="material-symbols-outlined text-[#254BB3] dark:text-blue-400">menu</span>
</button>
<h1 class="text-[#254BB3] dark:text-blue-400 font-extrabold text-xl font-manrope font-bold text-lg tracking-tight">Quản lý chi tiêu</h1>
<div class="w-10 h-10 rounded-full overflow-hidden bg-surface-container-high flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity">
<img alt="User Profile Avatar" class="w-full h-full object-cover" data-alt="Portrait of a young professional smiling naturally, bright lighting, soft focus background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDgdlONWjmi2s2QkwwU25r3PGBcM_92Gh8ZwLqT61CqbSnLLCAjB_PM9zhhYjS8j61Xx0HiYg-Gz6Hj9nKezLNWn9lBx8FiKoBEjMSOllsJTwJRu_t_qrLg570LcS2OlO6SeJthn7J-FDHHtSR72VggbE1TREEn0E3VCrgegl1Dr3a7dJ3kmbthTays5-gHrdYs9X7iPDwiPHKFSXGJjtWyUurhL6nh3RWkvqzNm77r-FmIBcGJlqsbbEIB7OnzoyJHq9vXsaCnRdM"/>
</div>
</header>
<!-- Main Content Canvas -->
<main class="flex-1 mt-16 mb-24 px-container-padding pt-stack-md overflow-y-auto">
<!-- Search & Filter Area -->
<div class="sticky top-16 z-40 bg-background/95 backdrop-blur-md pt-unit pb-stack-sm mx-[-20px] px-container-padding">
<div class="flex gap-gutter items-center">
<!-- Search Bar -->
<div class="relative flex-1">
<span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">search</span>
<input class="w-full h-tap-target-min pl-10 pr-4 rounded-xl bg-[#F1F5F9] border-none focus:ring-2 focus:ring-primary-container text-on-surface placeholder:text-outline font-body-sm text-body-sm transition-all shadow-sm" placeholder="Tìm giao dịch..." type="text"/>
</div>
<!-- Date Filter -->
<button class="h-tap-target-min px-4 rounded-xl bg-white border border-outline-variant shadow-sm flex items-center gap-2 hover:bg-surface-container-lowest transition-colors flex-shrink-0">
<span class="font-label-md text-label-md text-on-surface">Tháng 10, 2023</span>
<span class="material-symbols-outlined text-outline">calendar_month</span>
</button>
</div>
<!-- Quick Stats Summary (Optional high-end UI element) -->
<div class="mt-stack-sm flex gap-gutter">
<div class="flex-1 glass-card p-3 rounded-lg shadow-[0_4px_20px_rgba(37,75,179,0.04)] border border-white/50">
<p class="font-body-sm text-body-sm text-outline">Thu</p>
<p class="font-h3 text-h3 text-secondary">25.000.000</p>
</div>
<div class="flex-1 glass-card p-3 rounded-lg shadow-[0_4px_20px_rgba(37,75,179,0.04)] border border-white/50">
<p class="font-body-sm text-body-sm text-outline">Chi</p>
<p class="font-h3 text-h3 text-on-surface">-12.450.000</p>
</div>
</div>
</div>
<!-- Transaction List -->
<div class="mt-stack-md flex flex-col gap-stack-lg">
<!-- Group: Hôm nay -->
<section>
<div class="flex justify-between items-end mb-stack-sm border-b border-surface-container-highest pb-2 mx-[-8px] px-2">
<h2 class="font-label-md text-label-md text-outline">Hôm nay, 24 Th10</h2>
<span class="font-label-md text-label-md text-on-surface">-450.000</span>
</div>
<div class="flex flex-col gap-unit">
<!-- Item 1 -->
<div class="glass-card flex items-center p-3 rounded-xl shadow-[0_4px_20px_rgba(37,75,179,0.04)] hover:shadow-md transition-shadow cursor-pointer active:scale-[0.98]">
<div class="w-12 h-12 rounded-full icon-duotone flex items-center justify-center flex-shrink-0">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">restaurant</span>
</div>
<div class="ml-3 flex-1 min-w-0">
<p class="font-body-md text-body-md text-on-surface font-medium truncate">Ăn trưa</p>
<p class="font-body-sm text-body-sm text-outline">12:30 • Tiền mặt</p>
</div>
<div class="ml-3 text-right flex-shrink-0">
<p class="font-h3 text-h3 text-on-surface">-150.000</p>
</div>
</div>
<!-- Item 2 -->
<div class="glass-card flex items-center p-3 rounded-xl shadow-[0_4px_20px_rgba(37,75,179,0.04)] hover:shadow-md transition-shadow cursor-pointer active:scale-[0.98]">
<div class="w-12 h-12 rounded-full icon-duotone flex items-center justify-center flex-shrink-0">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">local_cafe</span>
</div>
<div class="ml-3 flex-1 min-w-0">
<p class="font-body-md text-body-md text-on-surface font-medium truncate">Cà phê Phúc Long</p>
<p class="font-body-sm text-body-sm text-outline">08:15 • Thẻ tín dụng</p>
</div>
<div class="ml-3 text-right flex-shrink-0">
<p class="font-h3 text-h3 text-on-surface">-65.000</p>
</div>
</div>
</div>
</section>
<!-- Group: Hôm qua -->
<section>
<div class="flex justify-between items-end mb-stack-sm border-b border-surface-container-highest pb-2 mx-[-8px] px-2">
<h2 class="font-label-md text-label-md text-outline">Hôm qua, 23 Th10</h2>
<span class="font-label-md text-label-md text-on-surface">-1.200.000</span>
</div>
<div class="flex flex-col gap-unit">
<!-- Item 3 -->
<div class="glass-card flex items-center p-3 rounded-xl shadow-[0_4px_20px_rgba(37,75,179,0.04)] hover:shadow-md transition-shadow cursor-pointer active:scale-[0.98]">
<div class="w-12 h-12 rounded-full icon-duotone flex items-center justify-center flex-shrink-0 bg-surface-container-high text-secondary">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">payments</span>
</div>
<div class="ml-3 flex-1 min-w-0">
<p class="font-body-md text-body-md text-on-surface font-medium truncate">Lương tháng 10</p>
<p class="font-body-sm text-body-sm text-outline">09:00 • Chuyển khoản</p>
</div>
<div class="ml-3 text-right flex-shrink-0">
<p class="font-h3 text-h3 text-secondary">+25.000.000</p>
</div>
</div>
<!-- Item 4 -->
<div class="glass-card flex items-center p-3 rounded-xl shadow-[0_4px_20px_rgba(37,75,179,0.04)] hover:shadow-md transition-shadow cursor-pointer active:scale-[0.98]">
<div class="w-12 h-12 rounded-full icon-duotone flex items-center justify-center flex-shrink-0">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">shopping_bag</span>
</div>
<div class="ml-3 flex-1 min-w-0">
<p class="font-body-md text-body-md text-on-surface font-medium truncate">Siêu thị</p>
<p class="font-body-sm text-body-sm text-outline">18:45 • Thẻ ghi nợ</p>
</div>
<div class="ml-3 text-right flex-shrink-0">
<p class="font-h3 text-h3 text-on-surface">-1.200.000</p>
</div>
</div>
</div>
</section>
<!-- Group: 20 Th10 -->
<section>
<div class="flex justify-between items-end mb-stack-sm border-b border-surface-container-highest pb-2 mx-[-8px] px-2">
<h2 class="font-label-md text-label-md text-outline">Thứ sáu, 20 Th10</h2>
<span class="font-label-md text-label-md text-on-surface">-500.000</span>
</div>
<div class="flex flex-col gap-unit">
<!-- Item 5 -->
<div class="glass-card flex items-center p-3 rounded-xl shadow-[0_4px_20px_rgba(37,75,179,0.04)] hover:shadow-md transition-shadow cursor-pointer active:scale-[0.98]">
<div class="w-12 h-12 rounded-full icon-duotone flex items-center justify-center flex-shrink-0">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">directions_car</span>
</div>
<div class="ml-3 flex-1 min-w-0">
<p class="font-body-md text-body-md text-on-surface font-medium truncate">Đổ xăng</p>
<p class="font-body-sm text-body-sm text-outline">07:30 • Tiền mặt</p>
</div>
<div class="ml-3 text-right flex-shrink-0">
<p class="font-h3 text-h3 text-on-surface">-500.000</p>
</div>
</div>
</div>
</section>
<!-- Padding for FAB -->
<div class="h-20"></div>
</div>
</main>
<!-- Floating Action Button (FAB) for adding transaction - Contextually relevant here but suppressed by instructions if we strictly follow JSON, wait JSON has "Thêm mới" tab, so FAB might be redundant, but Style Guide says "Floating Action Button (FAB): A large 64px circle for the 'Add Transaction'...". I will include it above the nav bar as per typical patterns, but wait, the BottomNavBar has an "Thêm mới" tab. I'll stick to the BottomNav. Actually, standard Material often puts FAB above bottom nav. I'll omit FAB to avoid conflict with "Thêm mới" tab. -->
<!-- BottomNavBar -->
<nav class="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pt-3 pb-safe bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 shadow-[0_-4px_20px_0px_rgba(37,75,179,0.04)] docked full-width bottom-0 rounded-t-lg md:hidden">
<a class="text-slate-400 dark:text-slate-500 flex flex-col items-center gap-1 font-manrope text-[11px] font-medium hover:text-[#254BB3] transition-all w-tap-target-min h-tap-target-min justify-center" href="#">
<span class="material-symbols-outlined text-[24px]">home</span>
<span>Trang chủ</span>
</a>
<!-- Active Tab: Giao dịch -->
<a class="text-[#254BB3] dark:text-blue-400 flex flex-col items-center gap-1 font-manrope text-[11px] font-medium hover:text-[#254BB3] transition-all w-tap-target-min h-tap-target-min justify-center Active: scale-90 duration-150" href="#">
<span class="material-symbols-outlined text-[24px]" style="font-variation-settings: 'FILL' 1;">receipt_long</span>
<span>Giao dịch</span>
</a>
<!-- Center Add Button - styled special as per JSON icons/labels -->
<a class="text-slate-400 dark:text-slate-500 flex flex-col items-center gap-1 font-manrope text-[11px] font-medium hover:text-[#254BB3] transition-all w-tap-target-min h-tap-target-min justify-center relative -top-2" href="#">
<span class="material-symbols-outlined text-[36px] text-primary-container" style="font-variation-settings: 'FILL' 1;">add_circle</span>
<span class="sr-only">Thêm mới</span>
</a>
<a class="text-slate-400 dark:text-slate-500 flex flex-col items-center gap-1 font-manrope text-[11px] font-medium hover:text-[#254BB3] transition-all w-tap-target-min h-tap-target-min justify-center" href="#">
<span class="material-symbols-outlined text-[24px]">leaderboard</span>
<span>Báo cáo</span>
</a>
<a class="text-slate-400 dark:text-slate-500 flex flex-col items-center gap-1 font-manrope text-[11px] font-medium hover:text-[#254BB3] transition-all w-tap-target-min h-tap-target-min justify-center" href="#">
<span class="material-symbols-outlined text-[24px]">person</span>
<span>Tài khoản</span>
</a>
</nav>
</body></html>

<!-- 7. Transaction Detail -->
<!DOCTYPE html>

<html lang="vi"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover" name="viewport"/>
<title>Chi tiết giao dịch</title>
<!-- Google Fonts: Manrope & Be Vietnam Pro -->
<link href="https://fonts.googleapis.com" rel="preconnect"/>
<link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"/>
<link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600;700&amp;family=Manrope:wght@400;600;700;800&amp;display=swap" rel="stylesheet"/>
<!-- Material Symbols -->
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<!-- Tailwind CSS -->
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<!-- Theme Configuration -->
<script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    colors: {
                        "error": "#ba1a1a",
                        "surface-bright": "#f8f9ff",
                        "on-primary-container": "#b7c5ff",
                        "on-error-container": "#93000a",
                        "surface-tint": "#3357bf",
                        "on-tertiary-fixed": "#2a1700",
                        "primary-fixed-dim": "#b5c4ff",
                        "surface-container-high": "#dce9ff",
                        "secondary": "#006c49",
                        "outline-variant": "#c4c5d5",
                        "secondary-fixed": "#6ffbbe",
                        "surface-container-low": "#eff4ff",
                        "on-secondary-container": "#00714d",
                        "on-primary-fixed-variant": "#113da6",
                        "tertiary-fixed": "#ffddb8",
                        "inverse-on-surface": "#eaf1ff",
                        "surface-container": "#e5eeff",
                        "tertiary-fixed-dim": "#ffb95f",
                        "primary": "#003297",
                        "tertiary": "#563400",
                        "on-primary": "#ffffff",
                        "surface": "#f8f9ff",
                        "on-tertiary-fixed-variant": "#653e00",
                        "secondary-container": "#6cf8bb",
                        "on-secondary": "#ffffff",
                        "on-tertiary-container": "#ffb960",
                        "secondary-fixed-dim": "#4edea3",
                        "on-secondary-fixed-variant": "#005236",
                        "primary-fixed": "#dce1ff",
                        "on-secondary-fixed": "#002113",
                        "surface-container-lowest": "#ffffff",
                        "on-surface": "#0b1c30",
                        "on-background": "#0b1c30",
                        "surface-dim": "#cbdbf5",
                        "inverse-surface": "#213145",
                        "surface-container-highest": "#d3e4fe",
                        "background": "#f8f9ff",
                        "on-surface-variant": "#444653",
                        "inverse-primary": "#b5c4ff",
                        "error-container": "#ffdad6",
                        "on-primary-fixed": "#00164e",
                        "on-tertiary": "#ffffff",
                        "surface-variant": "#d3e4fe",
                        "primary-container": "#254bb3",
                        "tertiary-container": "#764900",
                        "on-error": "#ffffff",
                        "outline": "#747684"
                    },
                    borderRadius: {
                        "DEFAULT": "0.25rem",
                        "lg": "0.5rem",
                        "xl": "0.75rem",
                        "2xl": "1rem",
                        "full": "9999px"
                    },
                    spacing: {
                        "stack-sm": "8px",
                        "gutter": "16px",
                        "stack-md": "16px",
                        "unit": "4px",
                        "tap-target-min": "56px",
                        "stack-lg": "24px",
                        "container-padding": "20px"
                    },
                    fontFamily: {
                        "body-sm": ["Be Vietnam Pro", "sans-serif"],
                        "label-md": ["Be Vietnam Pro", "sans-serif"],
                        "body-md": ["Be Vietnam Pro", "sans-serif"],
                        "h2": ["Manrope", "sans-serif"],
                        "currency-display": ["Manrope", "sans-serif"],
                        "h3": ["Manrope", "sans-serif"],
                        "body-lg": ["Be Vietnam Pro", "sans-serif"],
                        "h1": ["Manrope", "sans-serif"]
                    },
                    fontSize: {
                        "body-sm": ["14px", { "lineHeight": "20px", "fontWeight": "400" }],
                        "label-md": ["14px", { "lineHeight": "16px", "letterSpacing": "0.02em", "fontWeight": "600" }],
                        "body-md": ["16px", { "lineHeight": "24px", "fontWeight": "400" }],
                        "h2": ["24px", { "lineHeight": "32px", "fontWeight": "600" }],
                        "currency-display": ["36px", { "lineHeight": "44px", "fontWeight": "800" }],
                        "h3": ["20px", { "lineHeight": "28px", "fontWeight": "600" }],
                        "body-lg": ["18px", { "lineHeight": "28px", "fontWeight": "400" }],
                        "h1": ["32px", { "lineHeight": "40px", "fontWeight": "700" }]
                    }
                }
            }
        }
    </script>
<style>
    body {
      min-height: max(884px, 100dvh);
    }
  </style>
  </head>
<body class="bg-surface text-on-surface font-body-md min-h-screen flex flex-col relative selection:bg-primary-container selection:text-on-primary-container">
<!-- Ambient Background Decoration -->
<div class="fixed top-0 left-0 w-full h-[353px] bg-surface-variant/40 -z-10 rounded-b-[3rem]"></div>
<!-- Contextual TopAppBar (Sub-page Header) -->
<header class="flex justify-between items-center px-container-padding h-16 w-full sticky top-0 z-50 bg-surface/80 backdrop-blur-md">
<button aria-label="Go back" class="w-10 h-10 flex items-center justify-center rounded-full bg-surface-container hover:bg-surface-dim transition-colors active:scale-95">
<span class="material-symbols-outlined text-on-surface" style="font-variation-settings: 'FILL' 0;">arrow_back</span>
</button>
<h1 class="font-h3 text-h3 text-on-surface tracking-tight">Chi tiết</h1>
<div class="w-10 h-10"></div> <!-- Spacer for perfect centering -->
</header>
<!-- Main Content Canvas -->
<main class="flex-1 flex flex-col w-full max-w-md mx-auto pt-stack-md pb-[calc(20px+env(safe-area-inset-bottom))]">
<!-- Hero Section: Amount & Category -->
<section class="flex flex-col items-center justify-center py-stack-lg gap-stack-sm px-container-padding">
<div class="w-20 h-20 rounded-2xl bg-surface-container-highest flex items-center justify-center mb-2 shadow-sm">
<span class="material-symbols-outlined text-primary-container text-4xl" style="font-variation-settings: 'FILL' 1;">restaurant</span>
</div>
<p class="font-label-md text-label-md text-on-surface-variant">Ăn uống</p>
<h2 class="font-currency-display text-currency-display text-on-surface tracking-tight mt-1">- 250,000 ₫</h2>
<div class="mt-2 inline-flex items-center gap-1 bg-secondary-container/30 px-3 py-1 rounded-full">
<span class="w-2 h-2 rounded-full bg-secondary"></span>
<span class="font-body-sm text-body-sm text-on-surface-variant">Đã hoàn tất</span>
</div>
</section>
<!-- Bento Grid Details Container -->
<section class="px-container-padding mt-stack-md flex flex-col gap-stack-sm">
<!-- Main Info Card (Glassmorphism inspired) -->
<div class="bg-surface-container-lowest rounded-2xl shadow-[0_4px_20px_0px_rgba(37,75,179,0.04)] p-stack-md flex flex-col relative">
<!-- Time Row -->
<div class="flex items-start gap-4 py-3">
<div class="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center shrink-0">
<span class="material-symbols-outlined text-on-surface-variant" style="font-variation-settings: 'FILL' 0;">calendar_today</span>
</div>
<div class="flex flex-col gap-1 justify-center min-h-[40px]">
<p class="font-body-sm text-body-sm text-on-surface-variant">Thời gian</p>
<p class="font-body-md text-body-md text-on-surface font-medium">Thứ 7, 14 Tháng 10 2023 • 19:30</p>
</div>
</div>
<!-- Divider -->
<div class="h-[1px] w-[calc(100%-3.5rem)] bg-outline-variant/30 ml-auto my-1"></div>
<!-- Wallet Row -->
<div class="flex items-start gap-4 py-3">
<div class="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center shrink-0">
<span class="material-symbols-outlined text-on-surface-variant" style="font-variation-settings: 'FILL' 0;">account_balance_wallet</span>
</div>
<div class="flex flex-col gap-1 justify-center min-h-[40px]">
<p class="font-body-sm text-body-sm text-on-surface-variant">Tài khoản/Ví</p>
<p class="font-body-md text-body-md text-on-surface font-medium">Thẻ tín dụng VPBank</p>
</div>
</div>
<!-- Divider -->
<div class="h-[1px] w-[calc(100%-3.5rem)] bg-outline-variant/30 ml-auto my-1"></div>
<!-- Note Row -->
<div class="flex items-start gap-4 py-3">
<div class="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center shrink-0">
<span class="material-symbols-outlined text-on-surface-variant" style="font-variation-settings: 'FILL' 0;">notes</span>
</div>
<div class="flex flex-col gap-1 justify-center min-h-[40px]">
<p class="font-body-sm text-body-sm text-on-surface-variant">Ghi chú</p>
<p class="font-body-md text-body-md text-on-surface leading-relaxed">Ăn tối cuối tuần cùng hội bạn đại học tại nhà hàng Hải Sản Biển Đông. Chia bill 3 người.</p>
</div>
</div>
</div>
</section>
<!-- Spacer to push actions to bottom -->
<div class="flex-1"></div>
<!-- Sticky Footer Actions -->
<footer class="px-container-padding mt-stack-lg flex gap-stack-sm items-center justify-center">
<button aria-label="Xóa" class="h-tap-target-min w-[4.5rem] rounded-2xl bg-error-container text-on-error-container flex items-center justify-center hover:bg-error hover:text-on-error transition-colors active:scale-95 shadow-sm">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 0;">delete</span>
</button>
<button class="flex-1 h-tap-target-min rounded-2xl bg-primary-container text-on-primary font-label-md text-label-md flex items-center justify-center gap-2 shadow-[0_8px_16px_rgba(37,75,179,0.2)] hover:opacity-90 transition-all active:scale-95">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 0;">edit_square</span>
                Chỉnh sửa
            </button>
</footer>
</main>
</body></html>

<!-- 8. Spending Reports -->
<!DOCTYPE html>

<html lang="vi"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Báo cáo Chi tiêu</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;600&amp;family=Manrope:wght@600;700;800&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
        tailwind.config = {
          darkMode: "class",
          theme: {
            extend: {
              "colors": {
                      "error": "#ba1a1a",
                      "surface-bright": "#f8f9ff",
                      "on-primary-container": "#b7c5ff",
                      "on-error-container": "#93000a",
                      "surface-tint": "#3357bf",
                      "on-tertiary-fixed": "#2a1700",
                      "primary-fixed-dim": "#b5c4ff",
                      "surface-container-high": "#dce9ff",
                      "secondary": "#006c49",
                      "outline-variant": "#c4c5d5",
                      "secondary-fixed": "#6ffbbe",
                      "surface-container-low": "#eff4ff",
                      "on-secondary-container": "#00714d",
                      "on-primary-fixed-variant": "#113da6",
                      "tertiary-fixed": "#ffddb8",
                      "inverse-on-surface": "#eaf1ff",
                      "surface-container": "#e5eeff",
                      "tertiary-fixed-dim": "#ffb95f",
                      "primary": "#003297",
                      "tertiary": "#563400",
                      "on-primary": "#ffffff",
                      "surface": "#f8f9ff",
                      "on-tertiary-fixed-variant": "#653e00",
                      "secondary-container": "#6cf8bb",
                      "on-secondary": "#ffffff",
                      "on-tertiary-container": "#ffb960",
                      "secondary-fixed-dim": "#4edea3",
                      "on-secondary-fixed-variant": "#005236",
                      "primary-fixed": "#dce1ff",
                      "on-secondary-fixed": "#002113",
                      "surface-container-lowest": "#ffffff",
                      "on-surface": "#0b1c30",
                      "on-background": "#0b1c30",
                      "surface-dim": "#cbdbf5",
                      "inverse-surface": "#213145",
                      "surface-container-highest": "#d3e4fe",
                      "background": "#f8f9ff",
                      "on-surface-variant": "#444653",
                      "inverse-primary": "#b5c4ff",
                      "error-container": "#ffdad6",
                      "on-primary-fixed": "#00164e",
                      "on-tertiary": "#ffffff",
                      "surface-variant": "#d3e4fe",
                      "primary-container": "#254bb3",
                      "tertiary-container": "#764900",
                      "on-error": "#ffffff",
                      "outline": "#747684"
              },
              "borderRadius": {
                      "DEFAULT": "0.25rem",
                      "lg": "0.5rem",
                      "xl": "0.75rem",
                      "full": "9999px"
              },
              "spacing": {
                      "stack-sm": "8px",
                      "gutter": "16px",
                      "stack-md": "16px",
                      "unit": "4px",
                      "tap-target-min": "48px",
                      "stack-lg": "24px",
                      "container-padding": "20px"
              },
              "fontFamily": {
                      "body-sm": [
                              "Be Vietnam Pro"
                      ],
                      "label-md": [
                              "Be Vietnam Pro"
                      ],
                      "body-md": [
                              "Be Vietnam Pro"
                      ],
                      "h2": [
                              "Manrope"
                      ],
                      "currency-display": [
                              "Manrope"
                      ],
                      "h3": [
                              "Manrope"
                      ],
                      "body-lg": [
                              "Be Vietnam Pro"
                      ],
                      "h1": [
                              "Manrope"
                      ]
              },
              "fontSize": {
                      "body-sm": [
                              "14px",
                              {
                                      "lineHeight": "20px",
                                      "fontWeight": "400"
                              }
                      ],
                      "label-md": [
                              "14px",
                              {
                                      "lineHeight": "16px",
                                      "letterSpacing": "0.02em",
                                      "fontWeight": "600"
                              }
                      ],
                      "body-md": [
                              "16px",
                              {
                                      "lineHeight": "24px",
                                      "fontWeight": "400"
                              }
                      ],
                      "h2": [
                              "24px",
                              {
                                      "lineHeight": "32px",
                                      "fontWeight": "600"
                              }
                      ],
                      "currency-display": [
                              "36px",
                              {
                                      "lineHeight": "44px",
                                      "fontWeight": "800"
                              }
                      ],
                      "h3": [
                              "20px",
                              {
                                      "lineHeight": "28px",
                                      "fontWeight": "600"
                              }
                      ],
                      "body-lg": [
                              "18px",
                              {
                                      "lineHeight": "28px",
                                      "fontWeight": "400"
                              }
                      ],
                      "h1": [
                              "32px",
                              {
                                      "lineHeight": "40px",
                                      "fontWeight": "700"
                              }
                      ]
              }
      },
          },
        }
    </script>
<style>
    body {
      min-height: max(884px, 100dvh);
    }
  </style>
  </head>
<body class="bg-background text-on-background antialiased min-h-screen flex flex-col pb-24">
<!-- TopAppBar -->
<header class="bg-slate-50 dark:bg-slate-950 flex justify-between items-center px-5 h-16 w-full fixed top-0 z-50 flat no-shadows">
<button class="text-[#254BB3] dark:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors p-2 rounded-full flex items-center justify-center">
<span class="material-symbols-outlined" data-icon="menu">menu</span>
</button>
<h1 class="text-[#254BB3] dark:text-blue-400 font-extrabold text-xl tracking-tight">Quản lý chi tiêu</h1>
<div class="h-8 w-8 rounded-full overflow-hidden hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
<img alt="User Profile Avatar" class="w-full h-full object-cover" data-alt="Close up portrait of a young professional with a friendly smile, natural lighting, soft focus background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuClFF0E1gGKJZMGRIMTlqza5iADHZtYRDrWtOyE2t3qw9FeC5gvfnW-NgZeHxAPiFAyz6y7rLwIrR6mmYAThBlnpCSVDpuRVEN_yiX0TTULGpl6m18kZEN1--opG1NvjWfSzbXDYL_rvZjpoVboFp9mzklL0nMXUxYX2IG0mIJ7A4mdrwwTbLB4cl0HigyOVKgYWzh3ftSCbPd2FLUIpRahwfrm2gxYw_q7taXnfH5vay1epBLOmerefu4oRhcRvqdTsaaY6zvPeQA"/>
</div>
</header>
<main class="flex-grow pt-20 px-container-padding flex flex-col gap-stack-lg max-w-3xl mx-auto w-full">
<!-- Period Selection Tabs -->
<div class="bg-surface-container-low rounded-lg p-1 flex shadow-[0_4px_20px_0px_rgba(37,75,179,0.04)]">
<button class="flex-1 py-2 text-center rounded-md font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors">Ngày</button>
<button class="flex-1 py-2 text-center rounded-md font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors">Tuần</button>
<button class="flex-1 py-2 text-center rounded-md font-label-md text-label-md bg-surface-container-lowest text-primary shadow-sm transition-all">Tháng</button>
</div>
<!-- Date Navigator -->
<div class="flex justify-between items-center">
<button class="p-2 text-on-surface-variant hover:text-primary transition-colors rounded-full hover:bg-surface-container-low">
<span class="material-symbols-outlined">chevron_left</span>
</button>
<div class="flex flex-col items-center">
<span class="font-h3 text-h3 text-on-surface">Tháng 10, 2023</span>
<span class="font-body-sm text-body-sm text-outline">01/10 - 31/10</span>
</div>
<button class="p-2 text-on-surface-variant hover:text-primary transition-colors rounded-full hover:bg-surface-container-low">
<span class="material-symbols-outlined">chevron_right</span>
</button>
</div>
<!-- Summary Cards Bento -->
<div class="grid grid-cols-2 gap-gutter">
<div class="bg-surface-container-lowest p-4 rounded-xl shadow-[0_4px_20px_0px_rgba(37,75,179,0.04)] flex flex-col gap-2 relative overflow-hidden">
<div class="absolute -right-4 -top-4 w-16 h-16 bg-error/5 rounded-full blur-xl"></div>
<div class="flex items-center gap-2 text-on-surface-variant">
<div class="w-8 h-8 rounded-full bg-error/10 flex items-center justify-center text-error">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">arrow_downward</span>
</div>
<span class="font-label-md text-label-md">Tổng chi</span>
</div>
<div class="font-h2 text-h2 text-on-surface mt-1">14.500.000</div>
</div>
<div class="bg-surface-container-lowest p-4 rounded-xl shadow-[0_4px_20px_0px_rgba(37,75,179,0.04)] flex flex-col gap-2 relative overflow-hidden">
<div class="absolute -right-4 -top-4 w-16 h-16 bg-secondary/5 rounded-full blur-xl"></div>
<div class="flex items-center gap-2 text-on-surface-variant">
<div class="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">arrow_upward</span>
</div>
<span class="font-label-md text-label-md">Tổng thu</span>
</div>
<div class="font-h2 text-h2 text-on-surface mt-1">28.000.000</div>
</div>
</div>
<!-- Donut Chart Area (Simulated) -->
<div class="bg-surface-container-lowest rounded-xl p-6 shadow-[0_4px_20px_0px_rgba(37,75,179,0.04)] flex flex-col items-center">
<h2 class="font-h3 text-h3 text-on-surface w-full mb-6 text-left">Cơ cấu chi tiêu</h2>
<div class="relative w-48 h-48 flex items-center justify-center mb-6">
<!-- SVG Donut Chart Simulation -->
<svg class="w-full h-full transform -rotate-90" viewbox="0 0 100 100">
<circle cx="50" cy="50" fill="none" r="40" stroke="#f1f5f9" stroke-width="12"></circle>
<!-- Ăn uống (40%) -->
<circle class="origin-center rotate-0" cx="50" cy="50" fill="none" r="40" stroke="#254bb3" stroke-dasharray="251.2" stroke-dashoffset="150.72" stroke-width="12"></circle>
<!-- Mua sắm (25%) -->
<circle class="origin-center" cx="50" cy="50" fill="none" r="40" stroke="#6cf8bb" stroke-dasharray="251.2" stroke-dashoffset="188.4" stroke-width="12" style="transform: rotate(144deg);"></circle>
<!-- Di chuyển (20%) -->
<circle class="origin-center" cx="50" cy="50" fill="none" r="40" stroke="#ffb960" stroke-dasharray="251.2" stroke-dashoffset="200.96" stroke-width="12" style="transform: rotate(234deg);"></circle>
<!-- Khác (15%) -->
<circle class="origin-center" cx="50" cy="50" fill="none" r="40" stroke="#b7c5ff" stroke-dasharray="251.2" stroke-dashoffset="213.52" stroke-width="12" style="transform: rotate(306deg);"></circle>
</svg>
<div class="absolute flex flex-col items-center">
<span class="font-label-md text-label-md text-on-surface-variant">Tổng cộng</span>
<span class="font-h2 text-h2 text-on-surface">14.5M</span>
</div>
</div>
</div>
<!-- Detailed List -->
<div class="flex flex-col gap-stack-md">
<h3 class="font-h3 text-h3 text-on-surface">Chi tiết danh mục</h3>
<div class="flex flex-col gap-unit">
<!-- Item 1 -->
<div class="bg-surface-container-lowest p-4 rounded-lg flex items-center gap-4 shadow-[0_4px_20px_0px_rgba(37,75,179,0.04)]">
<div class="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">restaurant</span>
</div>
<div class="flex-grow">
<div class="flex justify-between items-center mb-1">
<span class="font-body-md text-body-md font-semibold text-on-surface">Ăn uống</span>
<span class="font-body-md text-body-md font-semibold text-on-surface">5.800.000</span>
</div>
<div class="flex justify-between items-center text-outline font-body-sm text-body-sm">
<span>40%</span>
<span>24 giao dịch</span>
</div>
</div>
</div>
<!-- Item 2 -->
<div class="bg-surface-container-lowest p-4 rounded-lg flex items-center gap-4 shadow-[0_4px_20px_0px_rgba(37,75,179,0.04)]">
<div class="w-12 h-12 rounded-full bg-secondary-container/30 flex items-center justify-center text-on-secondary-container shrink-0">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">shopping_bag</span>
</div>
<div class="flex-grow">
<div class="flex justify-between items-center mb-1">
<span class="font-body-md text-body-md font-semibold text-on-surface">Mua sắm</span>
<span class="font-body-md text-body-md font-semibold text-on-surface">3.625.000</span>
</div>
<div class="flex justify-between items-center text-outline font-body-sm text-body-sm">
<span>25%</span>
<span>8 giao dịch</span>
</div>
</div>
</div>
<!-- Item 3 -->
<div class="bg-surface-container-lowest p-4 rounded-lg flex items-center gap-4 shadow-[0_4px_20px_0px_rgba(37,75,179,0.04)]">
<div class="w-12 h-12 rounded-full bg-tertiary-container/10 flex items-center justify-center text-tertiary-container shrink-0">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">directions_car</span>
</div>
<div class="flex-grow">
<div class="flex justify-between items-center mb-1">
<span class="font-body-md text-body-md font-semibold text-on-surface">Di chuyển</span>
<span class="font-body-md text-body-md font-semibold text-on-surface">2.900.000</span>
</div>
<div class="flex justify-between items-center text-outline font-body-sm text-body-sm">
<span>20%</span>
<span>15 giao dịch</span>
</div>
</div>
</div>
</div>
</div>
</main>
<!-- BottomNavBar -->
<nav class="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pt-3 pb-safe bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 shadow-[0_-4px_20px_0px_rgba(37,75,179,0.04)] rounded-t-lg pb-4">
<a class="text-slate-400 dark:text-slate-500 flex flex-col items-center gap-1 hover:text-[#254BB3] transition-all" href="#">
<span class="material-symbols-outlined" data-icon="home">home</span>
<span class="font-manrope text-[11px] font-medium">Trang chủ</span>
</a>
<a class="text-slate-400 dark:text-slate-500 flex flex-col items-center gap-1 hover:text-[#254BB3] transition-all" href="#">
<span class="material-symbols-outlined" data-icon="receipt_long">receipt_long</span>
<span class="font-manrope text-[11px] font-medium">Giao dịch</span>
</a>
<a class="text-slate-400 dark:text-slate-500 flex flex-col items-center gap-1 hover:text-[#254BB3] transition-all" href="#">
<span class="material-symbols-outlined" data-icon="add_circle">add_circle</span>
<span class="font-manrope text-[11px] font-medium">Thêm mới</span>
</a>
<a class="text-[#254BB3] dark:text-blue-400 flex flex-col items-center gap-1 scale-90 duration-150" href="#">
<span class="material-symbols-outlined" data-icon="leaderboard" style="font-variation-settings: 'FILL' 1;">leaderboard</span>
<span class="font-manrope text-[11px] font-medium">Báo cáo</span>
</a>
<a class="text-slate-400 dark:text-slate-500 flex flex-col items-center gap-1 hover:text-[#254BB3] transition-all" href="#">
<span class="material-symbols-outlined" data-icon="person">person</span>
<span class="font-manrope text-[11px] font-medium">Tài khoản</span>
</a>
</nav>
</body></html>

<!-- 9. Budget Management -->
<!DOCTYPE html>

<html lang="vi"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Quản lý ngân sách</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@600;700;800&amp;family=Be+Vietnam+Pro:wght@400;600&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    "colors": {
                        "error": "#ba1a1a",
                        "surface-bright": "#f8f9ff",
                        "on-primary-container": "#b7c5ff",
                        "on-error-container": "#93000a",
                        "surface-tint": "#3357bf",
                        "on-tertiary-fixed": "#2a1700",
                        "primary-fixed-dim": "#b5c4ff",
                        "surface-container-high": "#dce9ff",
                        "secondary": "#006c49",
                        "outline-variant": "#c4c5d5",
                        "secondary-fixed": "#6ffbbe",
                        "surface-container-low": "#eff4ff",
                        "on-secondary-container": "#00714d",
                        "on-primary-fixed-variant": "#113da6",
                        "tertiary-fixed": "#ffddb8",
                        "inverse-on-surface": "#eaf1ff",
                        "surface-container": "#e5eeff",
                        "tertiary-fixed-dim": "#ffb95f",
                        "primary": "#003297",
                        "tertiary": "#563400",
                        "on-primary": "#ffffff",
                        "surface": "#f8f9ff",
                        "on-tertiary-fixed-variant": "#653e00",
                        "secondary-container": "#6cf8bb",
                        "on-secondary": "#ffffff",
                        "on-tertiary-container": "#ffb960",
                        "secondary-fixed-dim": "#4edea3",
                        "on-secondary-fixed-variant": "#005236",
                        "primary-fixed": "#dce1ff",
                        "on-secondary-fixed": "#002113",
                        "surface-container-lowest": "#ffffff",
                        "on-surface": "#0b1c30",
                        "on-background": "#0b1c30",
                        "surface-dim": "#cbdbf5",
                        "inverse-surface": "#213145",
                        "surface-container-highest": "#d3e4fe",
                        "background": "#f8f9ff",
                        "on-surface-variant": "#444653",
                        "inverse-primary": "#b5c4ff",
                        "error-container": "#ffdad6",
                        "on-primary-fixed": "#00164e",
                        "on-tertiary": "#ffffff",
                        "surface-variant": "#d3e4fe",
                        "primary-container": "#254bb3",
                        "tertiary-container": "#764900",
                        "on-error": "#ffffff",
                        "outline": "#747684",
                        "warning": "#f59e0b"
                    },
                    "borderRadius": {
                        "DEFAULT": "0.25rem",
                        "lg": "0.5rem",
                        "xl": "0.75rem",
                        "full": "9999px",
                        "2xl": "1rem",
                        "3xl": "1.5rem"
                    },
                    "spacing": {
                        "stack-sm": "8px",
                        "gutter": "16px",
                        "stack-md": "16px",
                        "unit": "4px",
                        "tap-target-min": "48px",
                        "stack-lg": "24px",
                        "container-padding": "20px",
                        "safe": "env(safe-area-inset-bottom)"
                    },
                    "fontFamily": {
                        "body-sm": ["Be Vietnam Pro"],
                        "label-md": ["Be Vietnam Pro"],
                        "body-md": ["Be Vietnam Pro"],
                        "h2": ["Manrope"],
                        "currency-display": ["Manrope"],
                        "h3": ["Manrope"],
                        "body-lg": ["Be Vietnam Pro"],
                        "h1": ["Manrope"]
                    },
                    "fontSize": {
                        "body-sm": ["14px", { "lineHeight": "20px", "fontWeight": "400" }],
                        "label-md": ["14px", { "lineHeight": "16px", "letterSpacing": "0.02em", "fontWeight": "600" }],
                        "body-md": ["16px", { "lineHeight": "24px", "fontWeight": "400" }],
                        "h2": ["24px", { "lineHeight": "32px", "fontWeight": "600" }],
                        "currency-display": ["36px", { "lineHeight": "44px", "fontWeight": "800" }],
                        "h3": ["20px", { "lineHeight": "28px", "fontWeight": "600" }],
                        "body-lg": ["18px", { "lineHeight": "28px", "fontWeight": "400" }],
                        "h1": ["32px", { "lineHeight": "40px", "fontWeight": "700" }]
                    },
                    "boxShadow": {
                        "card": "0 4px 20px 0 rgba(37, 75, 179, 0.04)",
                        "sheet": "0 10px 30px 0 rgba(37, 75, 179, 0.08)"
                    }
                }
            }
        }
    </script>
<style>
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        .material-symbols-outlined.fill {
            font-variation-settings: 'FILL' 1;
        }
    </style>
<style>
    body {
      min-height: max(884px, 100dvh);
    }
  </style>
  </head>
<body class="bg-background text-on-background min-h-screen pb-24 font-body-md">
<!-- TopAppBar -->
<header class="flex justify-between items-center px-5 h-16 w-full fixed top-0 z-50 bg-slate-50 dark:bg-slate-950 flat no-shadows docked full-width top-0">
<button class="h-10 w-10 flex items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors Active: opacity-80 scale-95 transition-all">
<span class="material-symbols-outlined text-[#254BB3] dark:text-blue-400">menu</span>
</button>
<h1 class="font-manrope font-bold text-lg tracking-tight text-[#254BB3] dark:text-blue-400">Quản lý ngân sách</h1>
<div class="h-10 w-10 rounded-full overflow-hidden hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors Active: opacity-80 scale-95 transition-all">
<img alt="User Profile Avatar" class="w-full h-full object-cover" data-alt="Portrait of a young professional smiling naturally with soft studio lighting and blurred background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCEqRyWiFG7pdZNZYd5GuJBRGtRp1uLdNF-owElaYJZi2T0jWAEWqN9mWMPrXKUmTGTs6CSj4i4dlNPOyzYVI8GJSQnCHVlbd-q8ow6kYNpO-7jRaX4OuRM-QXmcSBExGZMrC6dI8BlplGNiMO5whbyD3REmZ02ywTdW8E8kFseId-ryHXzCO5Yz7X_uge0_HH9-VPH7SDWAGTTsRIUjP7MDcfHhJvHDnCPg5ZM-tN3LoXlGZ_5UGfStNfIL5-u8sfMaxIEcD0LHmo"/>
</div>
</header>
<!-- Main Content Canvas -->
<main class="pt-20 px-container-padding flex flex-col gap-stack-lg max-w-3xl mx-auto">
<!-- Total Budget Summary Bento -->
<section class="bg-white rounded-3xl p-6 shadow-card border border-surface-container-low flex flex-col gap-stack-md">
<div class="flex justify-between items-start">
<div>
<h2 class="font-h3 text-h3 text-on-surface-variant">Tổng ngân sách tháng</h2>
<p class="font-currency-display text-currency-display text-primary mt-unit">15.000.000 đ</p>
</div>
<div class="bg-surface-container p-2 rounded-xl">
<span class="material-symbols-outlined text-primary fill">account_balance_wallet</span>
</div>
</div>
<div class="flex flex-col gap-unit mt-stack-sm">
<div class="flex justify-between font-body-sm text-body-sm text-on-surface-variant">
<span>Đã chi tiêu: <span class="font-label-md text-label-md text-on-surface">10.250.000 đ</span></span>
<span>Còn lại: <span class="font-label-md text-label-md text-secondary">4.750.000 đ</span></span>
</div>
<div class="h-3 w-full bg-surface-container rounded-full overflow-hidden relative">
<div class="absolute top-0 left-0 h-full bg-primary rounded-full transition-all duration-500" style="width: 68%;"></div>
</div>
<p class="font-body-sm text-body-sm text-outline text-right mt-1">68%</p>
</div>
</section>
<!-- Budgets List -->
<section class="flex flex-col gap-stack-md">
<div class="flex justify-between items-center mb-stack-sm">
<h3 class="font-h2 text-h2 text-on-surface">Chi tiết ngân sách</h3>
<button class="h-tap-target-min px-4 flex items-center justify-center bg-primary-container text-on-primary rounded-xl font-label-md text-label-md shadow-sm hover:opacity-90 transition-opacity gap-2">
<span class="material-symbols-outlined">add</span>
                    Thêm mới
                </button>
</div>
<!-- Budget Card: Healthy -->
<div class="bg-white rounded-2xl p-5 shadow-card border border-surface-container-lowest flex flex-col gap-stack-sm">
<div class="flex justify-between items-center">
<div class="flex items-center gap-3">
<div class="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center">
<span class="material-symbols-outlined text-primary">restaurant</span>
</div>
<div>
<h4 class="font-label-md text-label-md text-on-surface">Ăn uống</h4>
<p class="font-body-sm text-body-sm text-on-surface-variant">Tháng này</p>
</div>
</div>
<div class="text-right">
<p class="font-h3 text-h3 text-on-surface">3.500.000 đ</p>
<p class="font-body-sm text-body-sm text-outline">/ 5.000.000 đ</p>
</div>
</div>
<div class="mt-2">
<div class="flex justify-between font-body-sm text-body-sm mb-1">
<span class="text-on-surface-variant">Còn lại: 1.500.000 đ</span>
<span class="text-primary font-medium">70%</span>
</div>
<div class="h-2 w-full bg-surface-container rounded-full overflow-hidden">
<div class="h-full bg-primary rounded-full" style="width: 70%;"></div>
</div>
</div>
</div>
<!-- Budget Card: Warning -->
<div class="bg-white rounded-2xl p-5 shadow-card border border-warning/20 flex flex-col gap-stack-sm relative overflow-hidden">
<div class="absolute top-0 right-0 w-16 h-16 bg-warning/10 rounded-bl-3xl flex items-start justify-end p-2">
<span class="material-symbols-outlined text-warning text-sm fill">warning</span>
</div>
<div class="flex justify-between items-center">
<div class="flex items-center gap-3">
<div class="w-12 h-12 rounded-full bg-warning/10 flex items-center justify-center">
<span class="material-symbols-outlined text-warning">local_taxi</span>
</div>
<div>
<h4 class="font-label-md text-label-md text-on-surface">Di chuyển</h4>
<p class="font-body-sm text-body-sm text-on-surface-variant">Tháng này</p>
</div>
</div>
<div class="text-right z-10">
<p class="font-h3 text-h3 text-on-surface">1.800.000 đ</p>
<p class="font-body-sm text-body-sm text-outline">/ 2.000.000 đ</p>
</div>
</div>
<div class="mt-2">
<div class="flex justify-between font-body-sm text-body-sm mb-1">
<span class="text-warning font-medium">Sắp hết: 200.000 đ</span>
<span class="text-warning font-medium">90%</span>
</div>
<div class="h-2 w-full bg-surface-container rounded-full overflow-hidden">
<div class="h-full bg-warning rounded-full" style="width: 90%;"></div>
</div>
</div>
</div>
<!-- Budget Card: Over Budget -->
<div class="bg-white rounded-2xl p-5 shadow-card border border-error/20 flex flex-col gap-stack-sm relative overflow-hidden">
<div class="absolute top-0 right-0 w-16 h-16 bg-error/10 rounded-bl-3xl flex items-start justify-end p-2">
<span class="material-symbols-outlined text-error text-sm fill">error</span>
</div>
<div class="flex justify-between items-center">
<div class="flex items-center gap-3">
<div class="w-12 h-12 rounded-full bg-error/10 flex items-center justify-center">
<span class="material-symbols-outlined text-error">shopping_bag</span>
</div>
<div>
<h4 class="font-label-md text-label-md text-on-surface">Mua sắm</h4>
<p class="font-body-sm text-body-sm text-on-surface-variant">Tháng này</p>
</div>
</div>
<div class="text-right z-10">
<p class="font-h3 text-h3 text-error">3.200.000 đ</p>
<p class="font-body-sm text-body-sm text-outline">/ 3.000.000 đ</p>
</div>
</div>
<div class="mt-2">
<div class="flex justify-between font-body-sm text-body-sm mb-1">
<span class="text-error font-medium">Vượt mức: 200.000 đ</span>
<span class="text-error font-medium">106%</span>
</div>
<div class="h-2 w-full bg-surface-container rounded-full overflow-hidden relative">
<div class="absolute top-0 left-0 h-full bg-surface-variant rounded-full w-full"></div>
<div class="absolute top-0 left-0 h-full bg-error rounded-full" style="width: 100%;"></div>
</div>
</div>
</div>
</section>
</main>
<!-- BottomNavBar -->
<nav class="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pt-3 pb-safe bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 shadow-[0_-4px_20px_0px_rgba(37,75,179,0.04)] docked full-width bottom-0 rounded-t-lg md:hidden">
<a class="text-slate-400 dark:text-slate-500 flex flex-col items-center gap-1 font-manrope text-[11px] font-medium hover:text-[#254BB3] transition-all w-16 Active: scale-90 duration-150" href="#">
<span class="material-symbols-outlined" data-weight="fill">home</span>
<span>Trang chủ</span>
</a>
<a class="text-slate-400 dark:text-slate-500 flex flex-col items-center gap-1 font-manrope text-[11px] font-medium hover:text-[#254BB3] transition-all w-16 Active: scale-90 duration-150" href="#">
<span class="material-symbols-outlined">receipt_long</span>
<span>Giao dịch</span>
</a>
<a class="text-slate-400 dark:text-slate-500 flex flex-col items-center gap-1 font-manrope text-[11px] font-medium hover:text-[#254BB3] transition-all w-16 Active: scale-90 duration-150 relative -top-4" href="#">
<div class="bg-primary-container text-on-primary w-12 h-12 rounded-full flex items-center justify-center shadow-md">
<span class="material-symbols-outlined text-2xl">add_circle</span>
</div>
<span class="mt-1">Thêm mới</span>
</a>
<a class="text-[#254BB3] dark:text-blue-400 flex flex-col items-center gap-1 font-manrope text-[11px] font-medium hover:text-[#254BB3] transition-all w-16 Active: scale-90 duration-150" href="#">
<span class="material-symbols-outlined fill">leaderboard</span>
<span>Báo cáo</span>
</a>
<a class="text-slate-400 dark:text-slate-500 flex flex-col items-center gap-1 font-manrope text-[11px] font-medium hover:text-[#254BB3] transition-all w-16 Active: scale-90 duration-150" href="#">
<span class="material-symbols-outlined">person</span>
<span>Tài khoản</span>
</a>
</nav>
</body></html>

<!-- 10. Wallets & Accounts -->
<!DOCTYPE html>

<html lang="vi"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Tài khoản</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;600&amp;family=Manrope:wght@600;700;800&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    "colors": {
                        "error": "#ba1a1a",
                        "surface-bright": "#f8f9ff",
                        "on-primary-container": "#b7c5ff",
                        "on-error-container": "#93000a",
                        "surface-tint": "#3357bf",
                        "on-tertiary-fixed": "#2a1700",
                        "primary-fixed-dim": "#b5c4ff",
                        "surface-container-high": "#dce9ff",
                        "secondary": "#006c49",
                        "outline-variant": "#c4c5d5",
                        "secondary-fixed": "#6ffbbe",
                        "surface-container-low": "#eff4ff",
                        "on-secondary-container": "#00714d",
                        "on-primary-fixed-variant": "#113da6",
                        "tertiary-fixed": "#ffddb8",
                        "inverse-on-surface": "#eaf1ff",
                        "surface-container": "#e5eeff",
                        "tertiary-fixed-dim": "#ffb95f",
                        "primary": "#003297",
                        "tertiary": "#563400",
                        "on-primary": "#ffffff",
                        "surface": "#f8f9ff",
                        "on-tertiary-fixed-variant": "#653e00",
                        "secondary-container": "#6cf8bb",
                        "on-secondary": "#ffffff",
                        "on-tertiary-container": "#ffb960",
                        "secondary-fixed-dim": "#4edea3",
                        "on-secondary-fixed-variant": "#005236",
                        "primary-fixed": "#dce1ff",
                        "on-secondary-fixed": "#002113",
                        "surface-container-lowest": "#ffffff",
                        "on-surface": "#0b1c30",
                        "on-background": "#0b1c30",
                        "surface-dim": "#cbdbf5",
                        "inverse-surface": "#213145",
                        "surface-container-highest": "#d3e4fe",
                        "background": "#f8f9ff",
                        "on-surface-variant": "#444653",
                        "inverse-primary": "#b5c4ff",
                        "error-container": "#ffdad6",
                        "on-primary-fixed": "#00164e",
                        "on-tertiary": "#ffffff",
                        "surface-variant": "#d3e4fe",
                        "primary-container": "#254bb3",
                        "tertiary-container": "#764900",
                        "on-error": "#ffffff",
                        "outline": "#747684"
                    },
                    "borderRadius": {
                        "DEFAULT": "0.25rem",
                        "lg": "0.5rem",
                        "xl": "0.75rem",
                        "full": "9999px"
                    },
                    "spacing": {
                        "stack-sm": "8px",
                        "gutter": "16px",
                        "stack-md": "16px",
                        "unit": "4px",
                        "tap-target-min": "48px",
                        "stack-lg": "24px",
                        "container-padding": "20px"
                    },
                    "fontFamily": {
                        "body-sm": ["Be Vietnam Pro"],
                        "label-md": ["Be Vietnam Pro"],
                        "body-md": ["Be Vietnam Pro"],
                        "h2": ["Manrope"],
                        "currency-display": ["Manrope"],
                        "h3": ["Manrope"],
                        "body-lg": ["Be Vietnam Pro"],
                        "h1": ["Manrope"]
                    },
                    "fontSize": {
                        "body-sm": ["14px", { "lineHeight": "20px", "fontWeight": "400" }],
                        "label-md": ["14px", { "lineHeight": "16px", "letterSpacing": "0.02em", "fontWeight": "600" }],
                        "body-md": ["16px", { "lineHeight": "24px", "fontWeight": "400" }],
                        "h2": ["24px", { "lineHeight": "32px", "fontWeight": "600" }],
                        "currency-display": ["36px", { "lineHeight": "44px", "fontWeight": "800" }],
                        "h3": ["20px", { "lineHeight": "28px", "fontWeight": "600" }],
                        "body-lg": ["18px", { "lineHeight": "28px", "fontWeight": "400" }],
                        "h1": ["32px", { "lineHeight": "40px", "fontWeight": "700" }]
                    }
                }
            }
        }
    </script>
<style>
    body {
      min-height: max(884px, 100dvh);
    }
  </style>
  </head>
<body class="bg-background text-on-background antialiased pb-24 pt-16 font-body-md text-body-md">
<!-- TopAppBar -->
<header class="flex justify-between items-center px-5 h-16 w-full fixed top-0 z-50 bg-slate-50 dark:bg-slate-950 text-[#254BB3] dark:text-blue-400 font-manrope font-bold text-lg tracking-tight docked full-width top-0 flat no-shadows">
<button class="hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors rounded-full p-2 w-tap-target-min h-tap-target-min flex items-center justify-center Active: opacity-80 scale-95 transition-all">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 0;">menu</span>
</button>
<h1 class="text-[#254BB3] dark:text-blue-400 font-extrabold text-xl">Quản lý chi tiêu</h1>
<div class="hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors rounded-full p-2 w-tap-target-min h-tap-target-min flex items-center justify-center Active: opacity-80 scale-95 transition-all">
<img alt="User Profile Avatar" class="w-8 h-8 rounded-full object-cover" data-alt="close-up portrait of a young man with glasses and a blue shirt, smiling softly, neutral background, professional studio lighting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCMMr5V4WNAQ7mXNAXIsiBKWiG0IIdV-YI0LRKtVu-9GszvJYB8rn4uhv_dGR_GjAKjbnA1JC5ybDE8GHyfalAHv1yxRM4wDXRzn9ikh7ohlJbajRBptGmMNOgh7O25Qdrmr0Jb8Jkpw3xGa_y6nVY2kz1vhYKoUyx_KBFulBA3QFFNGrWCyIQXqLkwZlG7vutBnpgHNEB6NGB6hBx2f6fNU1kJXfyD20QGr3X-PjhaSEwj0Z4kcIuYYMFH5x8hjnEEtYKxL0g0ghg"/>
</div>
</header>
<main class="px-container-padding flex flex-col gap-stack-lg max-w-2xl mx-auto mt-stack-md">
<!-- Total Balance Header -->
<section class="flex flex-col items-center py-stack-md gap-stack-sm">
<h2 class="font-h3 text-h3 text-on-surface-variant">Tổng số dư</h2>
<p class="font-currency-display text-currency-display text-primary">125,500,000 ₫</p>
</section>
<!-- Accounts Grid -->
<section class="grid grid-cols-1 md:grid-cols-2 gap-stack-md">
<!-- Card 1: Bank Account -->
<div class="bg-surface-container-lowest rounded-xl p-stack-md flex flex-col gap-stack-md shadow-[0_4px_20px_0px_rgba(37,75,179,0.04)] relative overflow-hidden group hover:shadow-[0_8px_30px_0px_rgba(37,75,179,0.08)] transition-shadow duration-300">
<div class="absolute top-0 right-0 w-32 h-32 bg-primary-container opacity-5 rounded-full -translate-y-1/2 translate-x-1/3"></div>
<div class="flex justify-between items-center z-10">
<div class="flex items-center gap-stack-sm">
<div class="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-primary-container">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">account_balance</span>
</div>
<div>
<h3 class="font-h3 text-h3 text-on-surface">Vietcombank</h3>
<p class="font-body-sm text-body-sm text-on-surface-variant">*** 4567</p>
</div>
</div>
<button class="text-outline p-2 hover:bg-surface-container rounded-full transition-colors w-10 h-10 flex items-center justify-center">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 0;">more_vert</span>
</button>
</div>
<div class="mt-auto z-10">
<p class="font-body-sm text-body-sm text-on-surface-variant mb-unit">Số dư</p>
<p class="font-h2 text-h2 text-on-surface">85,000,000 ₫</p>
</div>
</div>
<!-- Card 2: E-Wallet -->
<div class="bg-surface-container-lowest rounded-xl p-stack-md flex flex-col gap-stack-md shadow-[0_4px_20px_0px_rgba(37,75,179,0.04)] relative overflow-hidden group hover:shadow-[0_8px_30px_0px_rgba(37,75,179,0.08)] transition-shadow duration-300">
<div class="absolute top-0 right-0 w-32 h-32 bg-secondary opacity-5 rounded-full -translate-y-1/2 translate-x-1/3"></div>
<div class="flex justify-between items-center z-10">
<div class="flex items-center gap-stack-sm">
<div class="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-secondary">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">wallet</span>
</div>
<div>
<h3 class="font-h3 text-h3 text-on-surface">Momo</h3>
<p class="font-body-sm text-body-sm text-on-surface-variant">Ví điện tử</p>
</div>
</div>
<button class="text-outline p-2 hover:bg-surface-container rounded-full transition-colors w-10 h-10 flex items-center justify-center">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 0;">more_vert</span>
</button>
</div>
<div class="mt-auto z-10">
<p class="font-body-sm text-body-sm text-on-surface-variant mb-unit">Số dư</p>
<p class="font-h2 text-h2 text-on-surface">25,500,000 ₫</p>
</div>
</div>
<!-- Card 3: Cash -->
<div class="bg-surface-container-lowest rounded-xl p-stack-md flex flex-col gap-stack-md shadow-[0_4px_20px_0px_rgba(37,75,179,0.04)] relative overflow-hidden group hover:shadow-[0_8px_30px_0px_rgba(37,75,179,0.08)] transition-shadow duration-300">
<div class="absolute top-0 right-0 w-32 h-32 bg-tertiary opacity-5 rounded-full -translate-y-1/2 translate-x-1/3"></div>
<div class="flex justify-between items-center z-10">
<div class="flex items-center gap-stack-sm">
<div class="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-tertiary">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">payments</span>
</div>
<div>
<h3 class="font-h3 text-h3 text-on-surface">Tiền mặt</h3>
<p class="font-body-sm text-body-sm text-on-surface-variant">Ví cá nhân</p>
</div>
</div>
<button class="text-outline p-2 hover:bg-surface-container rounded-full transition-colors w-10 h-10 flex items-center justify-center">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 0;">more_vert</span>
</button>
</div>
<div class="mt-auto z-10">
<p class="font-body-sm text-body-sm text-on-surface-variant mb-unit">Số dư</p>
<p class="font-h2 text-h2 text-on-surface">15,000,000 ₫</p>
</div>
</div>
<!-- Add New Account Button Card -->
<button class="bg-surface-container-low border-2 border-dashed border-outline-variant rounded-xl p-stack-md flex flex-col items-center justify-center gap-stack-sm min-h-[140px] hover:bg-surface-container hover:border-primary transition-all duration-300 group">
<div class="w-12 h-12 rounded-full bg-primary-container text-on-primary flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 0;">add</span>
</div>
<span class="font-label-md text-label-md text-primary">Thêm tài khoản mới</span>
</button>
</section>
</main>
<!-- BottomNavBar -->
<nav class="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pt-3 pb-safe bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 shadow-[0_-4px_20px_0px_rgba(37,75,179,0.04)] docked full-width bottom-0 rounded-t-lg md:hidden">
<a class="text-slate-400 dark:text-slate-500 flex flex-col items-center gap-1 hover:text-[#254BB3] transition-all Active: scale-90 duration-150 w-tap-target-min" href="#">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 0;">home</span>
<span class="font-manrope text-[11px] font-medium">Trang chủ</span>
</a>
<a class="text-slate-400 dark:text-slate-500 flex flex-col items-center gap-1 hover:text-[#254BB3] transition-all Active: scale-90 duration-150 w-tap-target-min" href="#">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 0;">receipt_long</span>
<span class="font-manrope text-[11px] font-medium">Giao dịch</span>
</a>
<a class="text-slate-400 dark:text-slate-500 flex flex-col items-center gap-1 hover:text-[#254BB3] transition-all Active: scale-90 duration-150 w-tap-target-min" href="#">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 0;">add_circle</span>
<span class="font-manrope text-[11px] font-medium">Thêm mới</span>
</a>
<a class="text-slate-400 dark:text-slate-500 flex flex-col items-center gap-1 hover:text-[#254BB3] transition-all Active: scale-90 duration-150 w-tap-target-min" href="#">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 0;">leaderboard</span>
<span class="font-manrope text-[11px] font-medium">Báo cáo</span>
</a>
<a class="text-[#254BB3] dark:text-blue-400 flex flex-col items-center gap-1 hover:text-[#254BB3] transition-all Active: scale-90 duration-150 w-tap-target-min" href="#">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">person</span>
<span class="font-manrope text-[11px] font-medium">Tài khoản</span>
</a>
</nav>
</body></html>

<!-- 11. Profile & Settings -->
<!DOCTYPE html>

<html lang="vi"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Hồ sơ và Cài đặt</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;600&amp;family=Manrope:wght@600;700;800&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    "colors": {
                        "error": "#ba1a1a",
                        "surface-bright": "#f8f9ff",
                        "on-primary-container": "#b7c5ff",
                        "on-error-container": "#93000a",
                        "surface-tint": "#3357bf",
                        "on-tertiary-fixed": "#2a1700",
                        "primary-fixed-dim": "#b5c4ff",
                        "surface-container-high": "#dce9ff",
                        "secondary": "#006c49",
                        "outline-variant": "#c4c5d5",
                        "secondary-fixed": "#6ffbbe",
                        "surface-container-low": "#eff4ff",
                        "on-secondary-container": "#00714d",
                        "on-primary-fixed-variant": "#113da6",
                        "tertiary-fixed": "#ffddb8",
                        "inverse-on-surface": "#eaf1ff",
                        "surface-container": "#e5eeff",
                        "tertiary-fixed-dim": "#ffb95f",
                        "primary": "#003297",
                        "tertiary": "#563400",
                        "on-primary": "#ffffff",
                        "surface": "#f8f9ff",
                        "on-tertiary-fixed-variant": "#653e00",
                        "secondary-container": "#6cf8bb",
                        "on-secondary": "#ffffff",
                        "on-tertiary-container": "#ffb960",
                        "secondary-fixed-dim": "#4edea3",
                        "on-secondary-fixed-variant": "#005236",
                        "primary-fixed": "#dce1ff",
                        "on-secondary-fixed": "#002113",
                        "surface-container-lowest": "#ffffff",
                        "on-surface": "#0b1c30",
                        "on-background": "#0b1c30",
                        "surface-dim": "#cbdbf5",
                        "inverse-surface": "#213145",
                        "surface-container-highest": "#d3e4fe",
                        "background": "#f8f9ff",
                        "on-surface-variant": "#444653",
                        "inverse-primary": "#b5c4ff",
                        "error-container": "#ffdad6",
                        "on-primary-fixed": "#00164e",
                        "on-tertiary": "#ffffff",
                        "surface-variant": "#d3e4fe",
                        "primary-container": "#254bb3",
                        "tertiary-container": "#764900",
                        "on-error": "#ffffff",
                        "outline": "#747684"
                    },
                    "borderRadius": {
                        "DEFAULT": "0.25rem",
                        "lg": "0.5rem",
                        "xl": "0.75rem",
                        "full": "9999px"
                    },
                    "spacing": {
                        "stack-sm": "8px",
                        "gutter": "16px",
                        "stack-md": "16px",
                        "unit": "4px",
                        "tap-target-min": "48px",
                        "stack-lg": "24px",
                        "container-padding": "20px"
                    },
                    "fontFamily": {
                        "body-sm": ["Be Vietnam Pro"],
                        "label-md": ["Be Vietnam Pro"],
                        "body-md": ["Be Vietnam Pro"],
                        "h2": ["Manrope"],
                        "currency-display": ["Manrope"],
                        "h3": ["Manrope"],
                        "body-lg": ["Be Vietnam Pro"],
                        "h1": ["Manrope"]
                    },
                    "fontSize": {
                        "body-sm": ["14px", { "lineHeight": "20px", "fontWeight": "400" }],
                        "label-md": ["14px", { "lineHeight": "16px", "letterSpacing": "0.02em", "fontWeight": "600" }],
                        "body-md": ["16px", { "lineHeight": "24px", "fontWeight": "400" }],
                        "h2": ["24px", { "lineHeight": "32px", "fontWeight": "600" }],
                        "currency-display": ["36px", { "lineHeight": "44px", "fontWeight": "800" }],
                        "h3": ["20px", { "lineHeight": "28px", "fontWeight": "600" }],
                        "body-lg": ["18px", { "lineHeight": "28px", "fontWeight": "400" }],
                        "h1": ["32px", { "lineHeight": "40px", "fontWeight": "700" }]
                    }
                }
            }
        }
    </script>
<style>
    body {
      min-height: max(884px, 100dvh);
    }
  </style>
  </head>
<body class="bg-background text-on-background min-h-screen pb-32">
<!-- TopAppBar -->
<header class="flex justify-between items-center px-5 h-16 w-full fixed top-0 z-50 bg-slate-50 dark:bg-slate-950 flat no-shadows">
<button class="text-[#254BB3] dark:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors w-10 h-10 flex items-center justify-center rounded-full">
<span class="material-symbols-outlined">menu</span>
</button>
<h1 class="font-manrope font-bold text-lg tracking-tight text-[#254BB3] dark:text-blue-400">Quản lý chi tiêu</h1>
<div class="w-10 h-10 rounded-full bg-primary-fixed overflow-hidden flex items-center justify-center">
<img alt="User Avatar" class="w-full h-full object-cover" data-alt="close up portrait of a young professional wearing casual shirt with neutral background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAYJHRSXZQ3n5GiE2J-IXQLNqpBCV2BeFYLV6QzjLqSibq7fANDudAlNTjpKHOAludtpXt9xbcO7EQGH0ktavyptFwxVtNik6_rj9vaBBZmvHcWaZELTRfX8q6Z_Hv2Fp00UBJz-2pCCzKq3UyLGbKdSRTButc_U7-C2P50imrY-U8YjKzR1-1oRhtjUlmq6wYHLX8WoOMWblLsHCViWmTNWDeCXE2Rdwsnrjst_JicnzvSVXcLLMAz8Cpo2FR4ddCrK7yJsU_fWrc"/>
</div>
</header>
<main class="pt-20 px-container-padding max-w-lg mx-auto">
<!-- Profile Header -->
<section class="flex flex-col items-center mt-stack-lg mb-stack-lg">
<div class="relative w-24 h-24 rounded-full overflow-hidden mb-stack-sm shadow-[0_10px_30px_0px_rgba(37,75,179,0.08)]">
<img alt="User Profile Avatar" class="w-full h-full object-cover" data-alt="close up portrait of a young professional wearing casual shirt with neutral background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD4NC0Dm5nCi14bR5MGMg5PyOYL4RvPENnHiILlPsOyPeZzzPxevlt8drvoLORDaerEONakMZzq1fmfGchUdE4XPhkAHaV23b4CaOOq0XvMevjGSc6aCXbLobE1GeE7p85nSfPr5PvrHwO-scNeed3CBhdV7jg4cdGKqtx-Xd5WGvUWv7GYHYUD4RLznKHuE9n5I5cstY966PRTT-ydS8gowdJp5hMNHgnO03CPLJlTl6XtTGu04JZrnFIA37DcR07HSDe2abLsZQ4"/>
<button class="absolute bottom-0 right-0 w-8 h-8 bg-surface-tint text-on-primary rounded-full flex items-center justify-center translate-x-1/4 translate-y-1/4">
<span class="material-symbols-outlined text-[16px]">edit</span>
</button>
</div>
<h2 class="font-h2 text-h2 text-on-surface">Nguyễn Văn A</h2>
<p class="font-body-md text-body-md text-on-surface-variant">nguyenvana@example.com</p>
</section>
<!-- Settings List -->
<section class="bg-surface-container-lowest rounded-xl shadow-[0_4px_20px_0px_rgba(37,75,179,0.04)] mb-stack-lg overflow-hidden">
<h3 class="font-label-md text-label-md text-on-surface-variant px-gutter py-stack-sm bg-surface-container-low border-b border-surface-container">Cài đặt tài khoản</h3>
<ul class="flex flex-col">
<li class="border-b border-surface-container last:border-none">
<button class="w-full flex items-center px-gutter py-stack-md hover:bg-surface-container-low transition-colors group">
<div class="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center text-primary mr-gutter">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">lock</span>
</div>
<span class="font-body-md text-body-md text-on-surface flex-1 text-left">Đổi mật khẩu</span>
<span class="material-symbols-outlined text-outline-variant group-hover:text-primary transition-colors">chevron_right</span>
</button>
</li>
<li class="border-b border-surface-container last:border-none">
<button class="w-full flex items-center px-gutter py-stack-md hover:bg-surface-container-low transition-colors group">
<div class="w-10 h-10 rounded-full bg-secondary-fixed flex items-center justify-center text-on-secondary-container mr-gutter">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">language</span>
</div>
<span class="font-body-md text-body-md text-on-surface flex-1 text-left">Ngôn ngữ</span>
<span class="font-body-sm text-body-sm text-on-surface-variant mr-unit">Tiếng Việt</span>
<span class="material-symbols-outlined text-outline-variant group-hover:text-primary transition-colors">chevron_right</span>
</button>
</li>
<li class="border-b border-surface-container last:border-none">
<button class="w-full flex items-center px-gutter py-stack-md hover:bg-surface-container-low transition-colors group">
<div class="w-10 h-10 rounded-full bg-tertiary-fixed flex items-center justify-center text-tertiary-container mr-gutter">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">payments</span>
</div>
<span class="font-body-md text-body-md text-on-surface flex-1 text-left">Đơn vị tiền tệ</span>
<span class="font-body-sm text-body-sm text-on-surface-variant mr-unit">VND</span>
<span class="material-symbols-outlined text-outline-variant group-hover:text-primary transition-colors">chevron_right</span>
</button>
</li>
<li class="border-b border-surface-container last:border-none">
<button class="w-full flex items-center px-gutter py-stack-md hover:bg-surface-container-low transition-colors group">
<div class="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-primary mr-gutter">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">notifications</span>
</div>
<span class="font-body-md text-body-md text-on-surface flex-1 text-left">Thông báo</span>
<span class="material-symbols-outlined text-outline-variant group-hover:text-primary transition-colors">chevron_right</span>
</button>
</li>
</ul>
</section>
<!-- Other Settings List -->
<section class="bg-surface-container-lowest rounded-xl shadow-[0_4px_20px_0px_rgba(37,75,179,0.04)] mb-stack-lg overflow-hidden">
<h3 class="font-label-md text-label-md text-on-surface-variant px-gutter py-stack-sm bg-surface-container-low border-b border-surface-container">Hỗ trợ &amp; Thông tin</h3>
<ul class="flex flex-col">
<li class="border-b border-surface-container last:border-none">
<button class="w-full flex items-center px-gutter py-stack-md hover:bg-surface-container-low transition-colors group">
<div class="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant mr-gutter">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">description</span>
</div>
<span class="font-body-md text-body-md text-on-surface flex-1 text-left">Điều khoản &amp; Chính sách</span>
<span class="material-symbols-outlined text-outline-variant group-hover:text-primary transition-colors">chevron_right</span>
</button>
</li>
</ul>
</section>
<!-- Logout Button -->
<button class="w-full min-h-tap-target-min bg-error text-on-error font-label-md text-label-md rounded-lg flex items-center justify-center shadow-[0_4px_20px_0px_rgba(186,26,26,0.1)] hover:bg-on-error-container transition-colors mb-stack-lg">
<span class="material-symbols-outlined mr-unit">logout</span>
            Đăng xuất
        </button>
</main>
<!-- BottomNavBar -->
<nav class="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pt-3 pb-safe bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 shadow-[0_-4px_20px_0px_rgba(37,75,179,0.04)] rounded-t-lg md:hidden">
<a class="text-slate-400 dark:text-slate-500 flex flex-col items-center gap-1 hover:text-[#254BB3] transition-all w-16" href="#">
<span class="material-symbols-outlined">home</span>
<span class="font-manrope text-[11px] font-medium">Trang chủ</span>
</a>
<a class="text-slate-400 dark:text-slate-500 flex flex-col items-center gap-1 hover:text-[#254BB3] transition-all w-16" href="#">
<span class="material-symbols-outlined">receipt_long</span>
<span class="font-manrope text-[11px] font-medium">Giao dịch</span>
</a>
<a class="text-slate-400 dark:text-slate-500 flex flex-col items-center gap-1 hover:text-[#254BB3] transition-all w-16" href="#">
<span class="material-symbols-outlined">add_circle</span>
<span class="font-manrope text-[11px] font-medium">Thêm mới</span>
</a>
<a class="text-slate-400 dark:text-slate-500 flex flex-col items-center gap-1 hover:text-[#254BB3] transition-all w-16" href="#">
<span class="material-symbols-outlined">leaderboard</span>
<span class="font-manrope text-[11px] font-medium">Báo cáo</span>
</a>
<a class="text-[#254BB3] dark:text-blue-400 flex flex-col items-center gap-1 hover:text-[#254BB3] transition-all scale-90 duration-150 w-16" href="#">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">person</span>
<span class="font-manrope text-[11px] font-medium text-[#254BB3]">Tài khoản</span>
</a>
</nav>
</body></html>

<!-- Design System -->
<!DOCTYPE html>

<html lang="vi"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Thêm giao dịch</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com" rel="preconnect"/>
<link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"/>
<link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;600&amp;family=Manrope:wght@600;700;800&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    "colors": {
                        "error": "#ba1a1a",
                        "surface-bright": "#f8f9ff",
                        "on-primary-container": "#b7c5ff",
                        "on-error-container": "#93000a",
                        "surface-tint": "#3357bf",
                        "on-tertiary-fixed": "#2a1700",
                        "primary-fixed-dim": "#b5c4ff",
                        "surface-container-high": "#dce9ff",
                        "secondary": "#006c49",
                        "outline-variant": "#c4c5d5",
                        "secondary-fixed": "#6ffbbe",
                        "surface-container-low": "#eff4ff",
                        "on-secondary-container": "#00714d",
                        "on-primary-fixed-variant": "#113da6",
                        "tertiary-fixed": "#ffddb8",
                        "inverse-on-surface": "#eaf1ff",
                        "surface-container": "#e5eeff",
                        "tertiary-fixed-dim": "#ffb95f",
                        "primary": "#003297",
                        "tertiary": "#563400",
                        "on-primary": "#ffffff",
                        "surface": "#f8f9ff",
                        "on-tertiary-fixed-variant": "#653e00",
                        "secondary-container": "#6cf8bb",
                        "on-secondary": "#ffffff",
                        "on-tertiary-container": "#ffb960",
                        "secondary-fixed-dim": "#4edea3",
                        "on-secondary-fixed-variant": "#005236",
                        "primary-fixed": "#dce1ff",
                        "on-secondary-fixed": "#002113",
                        "surface-container-lowest": "#ffffff",
                        "on-surface": "#0b1c30",
                        "on-background": "#0b1c30",
                        "surface-dim": "#cbdbf5",
                        "inverse-surface": "#213145",
                        "surface-container-highest": "#d3e4fe",
                        "background": "#f8f9ff",
                        "on-surface-variant": "#444653",
                        "inverse-primary": "#b5c4ff",
                        "error-container": "#ffdad6",
                        "on-primary-fixed": "#00164e",
                        "on-tertiary": "#ffffff",
                        "surface-variant": "#d3e4fe",
                        "primary-container": "#254bb3",
                        "tertiary-container": "#764900",
                        "on-error": "#ffffff",
                        "outline": "#747684"
                    },
                    "borderRadius": {
                        "DEFAULT": "0.25rem",
                        "lg": "0.5rem",
                        "xl": "0.75rem",
                        "full": "9999px"
                    },
                    "spacing": {
                        "stack-sm": "8px",
                        "gutter": "16px",
                        "stack-md": "16px",
                        "unit": "4px",
                        "tap-target-min": "48px",
                        "stack-lg": "24px",
                        "container-padding": "20px"
                    },
                    "fontFamily": {
                        "body-sm": ["Be Vietnam Pro"],
                        "label-md": ["Be Vietnam Pro"],
                        "body-md": ["Be Vietnam Pro"],
                        "h2": ["Manrope"],
                        "currency-display": ["Manrope"],
                        "h3": ["Manrope"],
                        "body-lg": ["Be Vietnam Pro"],
                        "h1": ["Manrope"]
                    },
                    "fontSize": {
                        "body-sm": ["14px", { "lineHeight": "20px", "fontWeight": "400" }],
                        "label-md": ["14px", { "lineHeight": "16px", "letterSpacing": "0.02em", "fontWeight": "600" }],
                        "body-md": ["16px", { "lineHeight": "24px", "fontWeight": "400" }],
                        "h2": ["24px", { "lineHeight": "32px", "fontWeight": "600" }],
                        "currency-display": ["36px", { "lineHeight": "44px", "fontWeight": "800" }],
                        "h3": ["20px", { "lineHeight": "28px", "fontWeight": "600" }],
                        "body-lg": ["18px", { "lineHeight": "28px", "fontWeight": "400" }],
                        "h1": ["32px", { "lineHeight": "40px", "fontWeight": "700" }]
                    }
                }
            }
        }
    </script>
<style>
        .material-symbols-outlined {
            font-family: 'Material Symbols Outlined';
            font-weight: normal;
            font-style: normal;
            font-size: 24px;
            line-height: 1;
            letter-spacing: normal;
            text-transform: none;
            display: inline-block;
            white-space: nowrap;
            word-wrap: normal;
            direction: ltr;
            -webkit-font-feature-settings: 'liga';
            -webkit-font-smoothing: antialiased;
        }
        .ambient-shadow-level-1 {
            box-shadow: 0 4px 20px 0 rgba(37, 75, 179, 0.04);
        }
        .ambient-shadow-level-2 {
            box-shadow: 0 10px 30px 0 rgba(37, 75, 179, 0.08);
        }
        /* Custom input clear styles for raw numeric entry */
        input[type="number"]::-webkit-inner-spin-button,
        input[type="number"]::-webkit-outer-spin-button {
            -webkit-appearance: none;
            margin: 0;
        }
        input[type="number"] {
            -moz-appearance: textfield;
        }
    </style>
<style>
    body {
      min-height: max(884px, 100dvh);
    }
  </style>
</head>
<body class="bg-background text-on-background antialiased">
<!-- TopAppBar -->
<header class="bg-slate-50 dark:bg-slate-950 flex justify-between items-center px-5 h-16 w-full fixed top-0 z-50 docked full-width top-0 flat no-shadows">
<button class="text-[#254BB3] dark:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors Active: opacity-80 scale-95 transition-all p-2 rounded-full flex items-center justify-center">
<span class="material-symbols-outlined" data-icon="menu">menu</span>
</button>
<h1 class="text-[#254BB3] dark:text-blue-400 font-manrope font-bold text-lg tracking-tight">Quản lý chi tiêu</h1>
<div class="w-10 h-10 rounded-full overflow-hidden bg-surface-variant flex items-center justify-center">
<img alt="User Profile Avatar" class="w-full h-full object-cover" data-alt="close-up portrait of a smiling young professional man with short dark hair wearing a casual blue shirt against a light studio background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAVf5Q0xJ0BWf-Fg9jDtyyLJMyDzRyGdQXQqu7jR6z7Qn4vkyfyXjNIw-hpl3SN4bTlAajMo5UdnYvFlzCDe8o7GAiCde9oBcuGcjAFQa1UA8yNNEaEc_BbLvicVoCbf89adS20nDp3n_bFYP0OZmz4leNK9qebiFdHV6M2s03P0DHsbCDHe2k1DMkDEjIbShd1i4kd9903d4TA-DKyfWE8fepgHSZtr0fH8MKiKRdMPr8R6co0wfF2uaDPQkOddB6MyaTpf3Mi5cM"/>
</div>
</header>
<!-- Main Content Canvas -->
<main class="pt-[80px] pb-[100px] px-container-padding flex flex-col gap-stack-lg max-w-lg mx-auto">
<!-- Amount Input Area -->
<section class="bg-surface-container-lowest rounded-xl p-gutter ambient-shadow-level-1 flex flex-col items-center justify-center text-center relative">
<label class="font-label-md text-label-md text-on-surface-variant mb-stack-sm">Số tiền</label>
<div class="flex items-center justify-center w-full">
<input class="w-full bg-transparent border-none text-center font-currency-display text-currency-display text-primary placeholder:text-surface-variant focus:ring-0 p-0" placeholder="0" type="number" value=""/>
<span class="font-h2 text-h2 text-on-surface-variant ml-unit">đ</span>
</div>
<button class="mt-4 flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full hover:bg-primary/20 transition-all border border-primary/20">
<span class="material-symbols-outlined text-[20px]" style="font-variation-settings: 'FILL' 1;">auto_awesome</span>
<span class="font-label-md text-xs">Quét hóa đơn AI</span>
</button></section>
<!-- Transaction Type Toggle -->
<section class="flex bg-surface-container-low rounded-lg p-unit">
<button class="flex-1 py-3 rounded bg-surface-container-lowest ambient-shadow-level-1 font-label-md text-label-md text-primary text-center">
                Chi tiêu
            </button>
<button class="flex-1 py-3 rounded font-label-md text-label-md text-on-surface-variant text-center hover:bg-surface-container-lowest transition-colors">
                Thu nhập
            </button>
</section>
<!-- Category Selection -->
<section class="flex flex-col gap-stack-sm">
<h2 class="font-label-md text-label-md text-on-surface">Danh mục</h2>
<div class="grid grid-cols-4 gap-stack-md">
<!-- Category Item: Food -->
<div class="flex flex-col items-center gap-unit cursor-pointer">
<div class="w-14 h-14 rounded-full bg-surface-container-high flex items-center justify-center text-primary-container">
<span class="material-symbols-outlined" data-icon="restaurant" style="font-variation-settings: 'FILL' 1;">restaurant</span>
</div>
<span class="font-body-sm text-body-sm text-on-surface text-center">Ăn uống</span>
</div>
<!-- Category Item: Shopping -->
<div class="flex flex-col items-center gap-unit cursor-pointer opacity-50">
<div class="w-14 h-14 rounded-full bg-surface-container-low flex items-center justify-center text-on-surface-variant">
<span class="material-symbols-outlined" data-icon="shopping_bag">shopping_bag</span>
</div>
<span class="font-body-sm text-body-sm text-on-surface-variant text-center">Mua sắm</span>
</div>
<!-- Category Item: Transport -->
<div class="flex flex-col items-center gap-unit cursor-pointer opacity-50">
<div class="w-14 h-14 rounded-full bg-surface-container-low flex items-center justify-center text-on-surface-variant">
<span class="material-symbols-outlined" data-icon="commute">commute</span>
</div>
<span class="font-body-sm text-body-sm text-on-surface-variant text-center">Di chuyển</span>
</div>
<!-- Category Item: More -->
<div class="flex flex-col items-center gap-unit cursor-pointer opacity-50">
<div class="w-14 h-14 rounded-full bg-surface-container-low flex items-center justify-center text-on-surface-variant border border-dashed border-outline-variant">
<span class="material-symbols-outlined" data-icon="more_horiz">more_horiz</span>
</div>
<span class="font-body-sm text-body-sm text-on-surface-variant text-center">Thêm</span>
</div>
</div>
</section>
<!-- Form Inputs (Date, Note) -->
<section class="flex flex-col gap-stack-md">
<!-- Date Input -->
<div class="bg-surface-container-low rounded-lg p-3 px-4 flex items-center gap-gutter border-b-2 border-transparent focus-within:border-primary-container transition-colors">
<span class="material-symbols-outlined text-primary-container" data-icon="calendar_month">calendar_month</span>
<div class="flex flex-col flex-1">
<label class="font-body-sm text-body-sm text-on-surface-variant text-[11px] uppercase tracking-wider">Ngày giao dịch</label>
<input class="bg-transparent border-none p-0 font-body-md text-body-md text-on-surface focus:ring-0 w-full" readonly="" type="text" value="Hôm nay, 24/10/2023"/>
</div>
</div>
<!-- Note Input -->
<div class="bg-surface-container-low rounded-lg p-3 px-4 flex items-start gap-gutter border-b-2 border-transparent focus-within:border-primary-container transition-colors min-h-[100px]">
<span class="material-symbols-outlined text-on-surface-variant mt-1" data-icon="notes">notes</span>
<div class="flex flex-col flex-1 h-full">
<label class="font-body-sm text-body-sm text-on-surface-variant text-[11px] uppercase tracking-wider">Ghi chú</label>
<textarea class="bg-transparent border-none p-0 mt-1 font-body-md text-body-md text-on-surface focus:ring-0 w-full resize-none outline-none" placeholder="Thêm mô tả cho giao dịch này..."></textarea>
</div>
</div>
</section>
<!-- Save Button -->
<div class="mt-auto pt-stack-md">
<button class="w-full h-[56px] bg-primary-container text-[#ffffff] rounded-full font-label-md text-label-md ambient-shadow-level-1 flex items-center justify-center gap-unit hover:opacity-90 transition-opacity">
                Lưu giao dịch
            </button>
</div>
</main>
<!-- BottomNavBar -->
<nav class="bg-white dark:bg-slate-900 fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pt-3 pb-safe docked full-width bottom-0 rounded-t-lg border-t border-slate-100 dark:border-slate-800 shadow-[0_-4px_20px_0px_rgba(37,75,179,0.04)]">
<!-- Trang chủ -->
<a class="text-slate-400 dark:text-slate-500 flex flex-col items-center gap-1 hover:text-[#254BB3] transition-all font-manrope text-[11px] font-medium" href="#">
<span class="material-symbols-outlined" data-icon="home">home</span>
<span>Trang chủ</span>
</a>
<!-- Giao dịch -->
<a class="text-slate-400 dark:text-slate-500 flex flex-col items-center gap-1 hover:text-[#254BB3] transition-all font-manrope text-[11px] font-medium" href="#">
<span class="material-symbols-outlined" data-icon="receipt_long">receipt_long</span>
<span>Giao dịch</span>
</a>
<!-- Thêm mới (Active) -->
<a class="text-[#254BB3] dark:text-blue-400 flex flex-col items-center gap-1 hover:text-[#254BB3] transition-all Active: scale-90 duration-150 font-manrope text-[11px] font-medium" href="#">
<span class="material-symbols-outlined" data-icon="add_circle" style="font-variation-settings: 'FILL' 1;">add_circle</span>
<span>Thêm mới</span>
</a>
<!-- Báo cáo -->
<a class="text-slate-400 dark:text-slate-500 flex flex-col items-center gap-1 hover:text-[#254BB3] transition-all font-manrope text-[11px] font-medium" href="#">
<span class="material-symbols-outlined" data-icon="leaderboard">leaderboard</span>
<span>Báo cáo</span>
</a>
<!-- Tài khoản -->
<a class="text-slate-400 dark:text-slate-500 flex flex-col items-center gap-1 hover:text-[#254BB3] transition-all font-manrope text-[11px] font-medium" href="#">
<span class="material-symbols-outlined" data-icon="person">person</span>
<span>Tài khoản</span>
</a>
</nav>
</body></html>

<!-- 5. Add Transaction -->
<!DOCTYPE html>

<html lang="vi"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>AI Invoice Scanner</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600;700&amp;family=Manrope:wght@400;500;600;700;800&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
      tailwind.config = {
        darkMode: "class",
        theme: {
          extend: {
            "colors": {
                    "tertiary-fixed": "#ffddb8",
                    "outline": "#747684",
                    "on-error-container": "#93000a",
                    "tertiary": "#563400",
                    "inverse-on-surface": "#eaf1ff",
                    "error-container": "#ffdad6",
                    "surface-container-highest": "#d3e4fe",
                    "surface-container-high": "#dce9ff",
                    "on-primary": "#ffffff",
                    "tertiary-fixed-dim": "#ffb95f",
                    "on-primary-container": "#b7c5ff",
                    "on-secondary-container": "#00714d",
                    "surface-container-lowest": "#ffffff",
                    "inverse-primary": "#b5c4ff",
                    "surface-variant": "#d3e4fe",
                    "secondary-fixed-dim": "#4edea3",
                    "on-tertiary-container": "#ffb960",
                    "surface-bright": "#f8f9ff",
                    "primary": "#003297",
                    "on-primary-fixed": "#00164e",
                    "on-background": "#0b1c30",
                    "background": "#f8f9ff",
                    "primary-fixed-dim": "#b5c4ff",
                    "outline-variant": "#c4c5d5",
                    "primary-fixed": "#dce1ff",
                    "on-surface": "#0b1c30",
                    "surface-container": "#e5eeff",
                    "on-surface-variant": "#444653",
                    "secondary-fixed": "#6ffbbe",
                    "on-tertiary-fixed": "#2a1700",
                    "on-primary-fixed-variant": "#113da6",
                    "secondary": "#006c49",
                    "on-tertiary": "#ffffff",
                    "on-error": "#ffffff",
                    "tertiary-container": "#764900",
                    "on-secondary": "#ffffff",
                    "on-secondary-fixed-variant": "#005236",
                    "inverse-surface": "#213145",
                    "surface-container-low": "#eff4ff",
                    "surface-tint": "#3357bf",
                    "surface": "#f8f9ff",
                    "on-tertiary-fixed-variant": "#653e00",
                    "surface-dim": "#cbdbf5",
                    "secondary-container": "#6cf8bb",
                    "primary-container": "#254bb3",
                    "on-secondary-fixed": "#002113",
                    "error": "#ba1a1a"
            },
            "borderRadius": {
                    "DEFAULT": "0.25rem",
                    "lg": "0.5rem",
                    "xl": "0.75rem",
                    "full": "9999px"
            },
            "spacing": {
                    "tap-target-min": "48px",
                    "stack-md": "16px",
                    "stack-lg": "24px",
                    "unit": "4px",
                    "stack-sm": "8px",
                    "container-padding": "20px",
                    "gutter": "16px"
            },
            "fontFamily": {
                    "body-lg": ["Be Vietnam Pro"],
                    "currency-display": ["Manrope"],
                    "label-md": ["Be Vietnam Pro"],
                    "h3": ["Manrope"],
                    "h2": ["Manrope"],
                    "body-sm": ["Be Vietnam Pro"],
                    "body-md": ["Be Vietnam Pro"],
                    "h1": ["Manrope"]
            },
            "fontSize": {
                    "body-lg": ["18px", {"lineHeight": "28px", "fontWeight": "400"}],
                    "currency-display": ["36px", {"lineHeight": "44px", "fontWeight": "800"}],
                    "label-md": ["14px", {"lineHeight": "16px", "letterSpacing": "0.02em", "fontWeight": "600"}],
                    "h3": ["20px", {"lineHeight": "28px", "fontWeight": "600"}],
                    "h2": ["24px", {"lineHeight": "32px", "fontWeight": "600"}],
                    "body-sm": ["14px", {"lineHeight": "20px", "fontWeight": "400"}],
                    "body-md": ["16px", {"lineHeight": "24px", "fontWeight": "400"}],
                    "h1": ["32px", {"lineHeight": "40px", "fontWeight": "700"}]
            }
          }
        }
      }
    </script>
<style>
    body {
      min-height: max(884px, 100dvh);
    }
  </style>
  </head>
<body class="bg-black text-on-surface antialiased h-screen w-screen overflow-hidden font-body-md text-body-md select-none">
<!-- Camera Viewport Container -->
<div class="relative w-full h-full flex flex-col justify-between bg-zinc-900">
<!-- Simulated Camera Feed Background -->
<div class="absolute inset-0 z-0 bg-cover bg-center opacity-60" data-alt="Close up view looking down at a printed paper receipt on a dark wooden table, soft natural lighting from the side, slightly blurred to simulate camera preview depth of field" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuDE-2R-iG2jruTXNmzlpBtdP0WurXvABd3YBTJUtK8yrIYmcUMJy3oAYcLXXIoU--ggtRgrDb3oR4FVA76JNOWxWJpjXS3eQ3ycUlN389msMgEHRWL9bZTx1RvU7FUffe3gIcPcH6EbPs-4V_i7cFct3B--nOyvbcdb3AoK17Pc037HHVyp47C0YRmnTpVkcGQ1OhFU-jrolLf3VPig_IAqUBFvuYofAhTJ8SY-kx8Q29Hwo8QhSx0QWqP1M0fYtw_CXozB3wWrgCc');">
</div>
<!-- Dimming Overlay (creates the hole-punch effect via CSS shadow on the viewfinder, so this is just a base if needed, but we'll use shadow below) -->
<div class="absolute inset-0 z-0 bg-black/40 backdrop-blur-[2px]"></div>
<!-- Top Actions Bar -->
<div class="w-full flex justify-between items-center px-container-padding py-stack-lg z-10 safe-top">
<button class="w-tap-target-min h-tap-target-min flex items-center justify-center rounded-full bg-black/20 backdrop-blur-md text-white hover:bg-black/40 transition-colors">
<span class="material-symbols-outlined text-2xl">close</span>
</button>
<button class="w-tap-target-min h-tap-target-min flex items-center justify-center rounded-full bg-black/20 backdrop-blur-md text-white hover:bg-black/40 transition-colors">
<span class="material-symbols-outlined text-2xl">flash_off</span>
</button>
</div>
<!-- Viewfinder Area -->
<div class="flex-1 w-full flex flex-col items-center justify-center z-10 px-8 relative">
<!-- Instruction Text -->
<div class="mb-stack-lg bg-black/60 backdrop-blur-md px-6 py-3 rounded-full text-white text-center shadow-lg">
<p class="font-body-md text-body-md">Căn chỉnh hóa đơn vào khung để quét tự động</p>
</div>
<!-- The Frame -->
<div class="relative w-full max-w-[320px] aspect-[3/4] rounded-xl ring-1 ring-white/20 shadow-[0_0_0_9999px_rgba(0,0,0,0.5)]">
<!-- Clear center -->
<div class="absolute inset-0 rounded-xl backdrop-blur-none"></div>
<!-- Corner Brackets -->
<div class="absolute -top-1 -left-1 w-10 h-10 border-t-4 border-l-4 border-secondary-fixed rounded-tl-xl"></div>
<div class="absolute -top-1 -right-1 w-10 h-10 border-t-4 border-r-4 border-secondary-fixed rounded-tr-xl"></div>
<div class="absolute -bottom-1 -left-1 w-10 h-10 border-b-4 border-l-4 border-secondary-fixed rounded-bl-xl"></div>
<div class="absolute -bottom-1 -right-1 w-10 h-10 border-b-4 border-r-4 border-secondary-fixed rounded-br-xl"></div>
<!-- Scanning Laser Line (Visual Effect) -->
<div class="absolute top-1/3 left-0 right-0 h-[2px] bg-secondary-fixed shadow-[0_0_12px_2px_rgba(111,251,190,0.6)]"></div>
</div>
</div>
<!-- Bottom Controls Bar -->
<div class="w-full flex justify-between items-center px-container-padding pb-10 pt-6 z-10 bg-gradient-to-t from-black/80 to-transparent">
<!-- Gallery Button -->
<button class="w-[56px] h-[56px] flex items-center justify-center rounded-full bg-black/30 backdrop-blur-md text-white border border-white/10 hover:bg-black/50 transition-colors">
<span class="material-symbols-outlined text-[28px]" style="font-variation-settings: 'FILL' 1;">photo_library</span>
</button>
<!-- Shutter Button -->
<div class="relative flex items-center justify-center">
<div class="w-[80px] h-[80px] rounded-full border-[4px] border-white/80 absolute"></div>
<button class="w-[64px] h-[64px] bg-white rounded-full active:scale-95 transition-transform duration-150 shadow-lg"></button>
</div>
<!-- Placeholder to balance layout (could be settings or mode switch in full app) -->
<div class="w-[56px] h-[56px]"></div>
</div>
</div>
</body></html>