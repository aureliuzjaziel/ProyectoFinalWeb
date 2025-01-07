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
    if (!validarPassword(password)) {
        alert('La contraseña debe tener al menos 8 caracteres, incluyendo una letra mayúscula, una letra minúscula y un número.');
        return;
    }

    // Verificación de que las contraseñas coinciden
    if (password !== confirmPassword) {
        alert('Las contraseñas no coinciden. Por favor, inténtalo de nuevo.');
        return;
    }

    alert('Registro exitoso');
    enviarFormulario({nombre, email, password});
});
    //Validador de email
function validarEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validarPassword(password) {
    // validador de contraseña con maximo 8 caracteres, letras mayusculas y numeros
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return re.test(password);
}

async function enviarFormulario(data) {
    try {
        const response = await fetch('http://localhost:3000/registro', { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();
        console.log('Success:', result);
    } catch (error) {
        console.error('Error:', error);
    }
}
