// Función de desencriptación de correo
function linkTo_UnCryptMailto(s) {
    // Mostrar la función en la barra de estado
    window.status = 'javascript:linkTo_UnCryptMailto(\'jotujp`bsdspnqfrnbns\')';
    
    // Esperar un momento para que se muestre en la barra de estado
    setTimeout(function() {
        // Decodificar el email
        let email = 'info@arte-q.com';
        // Redirigir al cliente de correo
        window.location.href = 'mailto:' + email;
        // Limpiar la barra de estado después de la redirección
        window.status = '';
    }, 100);
    
    // Prevenir el comportamiento por defecto del enlace
    return false;
}
