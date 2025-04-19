// src/app/head.tsx

export default function Head() {
    return (
      <>
        {/* PWA manifest */}
        <link rel="manifest" href="/manifest.json" />
        {/* Theme colour for status bar and splash screen */}
        <meta name="theme-color" content="#20bfa0" />
  
        {/* Standard favicon */}
        <link rel="icon" href="/icons/icon-192.png" sizes="192x192" />
  
        {/* Apple touch icon (for iOS home screen) */}
        <link
          rel="apple-touch-icon"
          href="/icons/icon-512.png"
          sizes="512x512"
        />
  
        {/* Ensure proper mobile scaling */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </>
    );
  }
  