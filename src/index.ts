import appMain from "./app/app";
import initServiceWorker from "./app/serviceWorker"; // Importieren Sie Ihren Haupt-CSS-Style

// Register service worker
initServiceWorker();

// Main App logic after DOM loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initializing
    appMain().then(r => {});
});
