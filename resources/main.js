// Main JS - SPA Router
const content = document.getElementById('content');
const nav = document.querySelector('nav');
const footer = document.querySelector('footer');

console.log('Content element:', content);
console.log('Nav element:', nav);

let currentCssLink = null;
let currentScript = null;

function loadPage(page) {
    // Verificar autenticação para páginas protegidas
    const isLoggedIn = localStorage.getItem('loggedIn') === 'true';
    console.log('Loading page:', page, 'isLoggedIn:', isLoggedIn);
    if (!['login', 'register', 'forgot-password'].includes(page) && !isLoggedIn) {
        console.log('Redirecting to login');
        window.location.hash = 'login';
        return;
    }

    let path = 'features/pages/';
    if (['login', 'register', 'forgot-password'].includes(page)) {
        path = 'features/authentication/';
    }
    fetch(`${path}${page}/${page}.html`)
        .then(response => response.text())
        .then(html => {
            content.innerHTML = html;
           
            // Remove previous CSS
            if (currentCssLink) {
                document.head.removeChild(currentCssLink);
            }
            
            // Load CSS
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = `${path}${page}/${page}.css`;
            document.head.appendChild(link);
            currentCssLink = link;
            
            // Remove previous JS
            if (currentScript) {
                document.body.removeChild(currentScript);
            }
            
            // Load JS
            const script = document.createElement('script');
            script.src = `${path}${page}/${page}.js`;
            document.body.appendChild(script);
            currentScript = script;
            
            // Controlar visibilidade do menu e footer
            if (['login', 'register', 'forgot-password'].includes(page)) {
                nav.style.display = 'none';
                footer.style.display = 'none';
            } else {
                nav.style.display = 'block';
                footer.style.display = 'block';
            }
        })
        .catch(error => {
            content.innerHTML = '<h1>Page not found</h1>';
        });
}

window.addEventListener('hashchange', () => {
    const page = location.hash.substring(1) || 'login';
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
        nav.style.display = 'none';
        footer.style.display = 'none';
        window.location.hash = 'login';
    }
});