// Main JS - SPA Router
const content = document.getElementById('content');
const nav = document.querySelector('nav');

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
            
            // Controlar visibilidade do menu
            if (['login', 'register', 'forgot-password'].includes(page)) {
                nav.style.display = 'none';
            } else {
                nav.style.display = 'block';
            }
        })
        .catch(error => {
            content.innerHTML = '<h1>Page not found</h1>';
        });
}

window.addEventListener('hashchange', () => {
    const page = location.hash.substring(1) || 'login'; // Default to login if not logged in
    loadPage(page);
});

// Load initial page
const isLoggedIn = localStorage.getItem('loggedIn') === 'true';
loadPage(isLoggedIn ? 'home' : 'login');

// Logout functionality
document.addEventListener('click', function(e) {
    if (e.target.id === 'logoutLink') {
        e.preventDefault();
        localStorage.removeItem('loggedIn');
        localStorage.removeItem('username');
        window.location.hash = 'login';
    }
});