// Main JS - SPA Router
const content = document.getElementById('content');

function loadPage(page) {
    fetch(`features/${page}/${page}.html`)
        .then(response => response.text())
        .then(html => {
            content.innerHTML = html;
            // Load CSS
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = `features/${page}/${page}.css`;
            document.head.appendChild(link);
            // Load JS
            const script = document.createElement('script');
            script.src = `features/${page}/${page}.js`;
            document.body.appendChild(script);
        })
        .catch(error => {
            content.innerHTML = '<h1>Page not found</h1>';
        });
}

window.addEventListener('hashchange', () => {
    const page = location.hash.substring(1) || 'home';
    loadPage(page);
});

// Load initial page
loadPage('home');