// Login JS
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // Simulação de autenticação (substitua por chamada real para backend)
    if (username && password) {
        localStorage.setItem('loggedIn', 'true');
        localStorage.setItem('username', username);
        window.location.hash = 'home';
    } else {
        alert('Usuário e senha obrigatórios');
    }
});