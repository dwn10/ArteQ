// Cookie Banner Functionality
document.addEventListener('DOMContentLoaded', function() {
    const cookieBanner = document.getElementById('cookie-banner');
    const cookieSettings = document.getElementById('cookie-settings');
    const acceptAllBtn = document.getElementById('accept-all-cookies');
    const saveSettingsBtn = document.getElementById('save-cookie-settings');
    const customizeBtn = document.getElementById('customize-cookies');
    const backToBannerBtn = document.getElementById('back-to-banner');
    const cookieCheckboxes = document.querySelectorAll('.cookie-option input[type="checkbox"]');
    
    // Asegurarse de que los elementos existen
    if (!cookieBanner || !cookieSettings || !customizeBtn) {
        console.error('No se encontraron los elementos necesarios para el banner de cookies');
        return;
    }
    
    // Mostrar el banner si no hay preferencia guardada
    if (!getCookie('cookie_consent')) {
        cookieBanner.style.display = 'block';
    }

    // Accept all cookies
    acceptAllBtn.addEventListener('click', function() {
        setCookie('cookie_consent', 'all', 365);
        setCookie('necessary_cookies', 'true', 365);
        setCookie('analytics_cookies', 'true', 365);
        setCookie('marketing_cookies', 'true', 365);
        cookieBanner.style.display = 'none';
        loadCookies();
    });

    // Reject all non-essential cookies
    const rejectCookiesBtn = document.getElementById('reject-cookies');
    if (rejectCookiesBtn) {
        rejectCookiesBtn.addEventListener('click', function() {
            setCookie('cookie_consent', 'necessary', 365);
            setCookie('necessary_cookies', 'true', 365); // Necessary cookies are always enabled
            setCookie('analytics_cookies', 'false', 365);
            setCookie('marketing_cookies', 'false', 365);
            cookieBanner.style.display = 'none';
            loadCookies();
            
            // Update checkboxes in settings if open
            cookieCheckboxes.forEach(checkbox => {
                if (checkbox.id === 'necessary_cookies') {
                    checkbox.checked = true;
                } else {
                    checkbox.checked = false;
                }
            });
        });
    }

    // Customize cookies
    customizeBtn.addEventListener('click', function() {
        console.log('Botón Einstellungen clickeado');
        // Ocultar el banner
        cookieBanner.style.display = 'none';
        
        // Mostrar el modal de configuración
        cookieSettings.style.display = 'block';
        cookieSettings.classList.add('visible');
        
        // Inicializar los checkboxes con los valores guardados
        if (typeof initCheckboxes === 'function') {
            initCheckboxes();
        } else {
            console.error('La función initCheckboxes no está definida');
        }
        
        console.log('Modal de configuración mostrado');
    });

    // Back to banner
    backToBannerBtn.addEventListener('click', function() {
        cookieSettings.style.display = 'none';
        cookieSettings.classList.remove('visible');
        cookieBanner.style.display = 'block';
    });

    // Save settings
    saveSettingsBtn.addEventListener('click', function() {
        cookieCheckboxes.forEach(checkbox => {
            setCookie(checkbox.id, checkbox.checked, 365);
        });
        setCookie('cookie_consent', 'custom', 365);
        cookieSettings.style.display = 'none';
        cookieSettings.classList.remove('visible');
        loadCookies();
    });

    // Set cookie
    function setCookie(name, value, days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        const expires = 'expires=' + date.toUTCString();
        document.cookie = name + '=' + value + ';' + expires + ';path=/';
    }

    // Get cookie
    function getCookie(name) {
        const nameEQ = name + '=';
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    // Load cookies based on user preferences
    function loadCookies() {
        // Load necessary cookies (always loaded as they're essential)
        if (getCookie('necessary_cookies') === 'true') {
            // Load necessary cookies
        }

        // Load analytics cookies if accepted
        if (getCookie('analytics_cookies') === 'true') {
            // Load Google Analytics or other analytics tools
            console.log('Loading analytics cookies');
        }

        // Load marketing cookies if accepted
        if (getCookie('marketing_cookies') === 'true') {
            // Load marketing cookies (e.g., Facebook Pixel, Google Ads)
            console.log('Loading marketing cookies');
        }
    }

    // Initialize checkboxes based on previous choices
    const initCheckboxes = () => {
        cookieCheckboxes.forEach(checkbox => {
            const cookieValue = getCookie(checkbox.id);
            if (cookieValue !== null) {
                checkbox.checked = cookieValue === 'true';
            }
        });
    };

    // Necessary cookies are always checked and disabled
    document.getElementById('necessary_cookies').disabled = true;
    document.getElementById('necessary_cookies').checked = true;
    
    // Initialize checkboxes
    initCheckboxes();
});
