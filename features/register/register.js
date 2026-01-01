// Register JS
document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('regUsername').value;
    const email = document.getElementById('regEmail').value;
    const password = document.getElementById('regPassword').value;
    const confirmPassword = document.getElementById('regConfirmPassword').value;
    
    if (password !== confirmPassword) {
        alert('Senhas não coincidem');
        return;
    }
    
    // Simulação de cadastro (substitua por chamada real para backend)
    alert('Usuário cadastrado com sucesso! Faça login.');
    window.location.hash = 'login';
});