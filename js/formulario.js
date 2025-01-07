document.getElementById('registroForm').addEventListener('submit', function(event) {
    event.preventDefault();

    let nombre = document.getElementById('nombre').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let confirmPassword = document.getElementById('confirmPassword').value;

    // Validación del correo electrónico
    if (!validarEmail(email)) {
        alert('Por favor, introduce un correo electrónico válido.');
        return;
    }

    // Validación de la contraseña
    if (password !== confirmPassword) {
        alert('Las contraseñas no coinciden. Por favor, inténtalo de nuevo.');
        return;
    }

    alert('Registro exitoso');
    // Aquí puedes añadir la lógica para enviar el formulario al servidor
    enviarFormulario({nombre, email, password});
});

function validarEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

async function enviarFormulario(data) {
    try {
        const response = await fetch('http://localhost:3000/registro', { // Asegúrate de usar la URL correcta del endpoint
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();
        console.log('Success:', result);
        // Aquí puedes manejar lo que sucede después de un registro exitoso
    } catch (error) {
        console.error('Error:', error);
    }
}
