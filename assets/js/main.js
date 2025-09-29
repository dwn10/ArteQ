// Mobile Navigation Toggle
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    if (navMenu) navMenu.classList.remove('active');
}));

// FAQ Accordion - Simple Implementation
document.addEventListener('DOMContentLoaded', function() {
    // Get all FAQ questions
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    // Add click event to each question
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            // Toggle the active class on the answer
            const answer = this.nextElementSibling;
            const icon = this.querySelector('i');
            
            // Close all other answers
            document.querySelectorAll('.faq-answer').forEach(item => {
                if (item !== answer) {
                    item.classList.remove('active');
                    const otherIcon = item.previousElementSibling.querySelector('i');
                    if (otherIcon) otherIcon.style.transform = 'rotate(0deg)';
                }
            });
            
            // Toggle current answer
            answer.classList.toggle('active');
            
            // Rotate icon
            if (icon) {
                if (answer.classList.contains('active')) {
                    icon.style.transform = 'rotate(180deg)';
                } else {
                    icon.style.transform = 'rotate(0deg)';
                }
            }
        });
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add scroll effect to navbar
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    } else {
        navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    }
});

// Contact Form Functionality
function updateCharCounter(textarea) {
    const charCounter = document.getElementById('char-counter');
    const charCountElement = document.getElementById('char-count');
    const charCount = textarea.value.length;
    
    if (charCountElement) charCountElement.textContent = charCount;
    
    // Update styling based on character count
    if (charCount >= 600) {
        charCounter.className = 'char-counter error';
        textarea.classList.add('char-limit-reached');
        textarea.setCustomValidity('Die Nachricht darf 600 Zeichen nicht überschreiten');
    } else if (charCount > 500) {
        charCounter.className = 'char-counter warning';
        textarea.classList.remove('char-limit-reached');
        textarea.setCustomValidity('');
    } else {
        charCounter.className = 'char-counter normal';
        textarea.classList.remove('char-limit-reached');
        textarea.setCustomValidity('');
    }
}

// Validate form and terms checkbox
function validateForm() {
    const checkbox = document.getElementById('termsCheckbox');
    const termsError = document.getElementById('terms-error');
    
    if (!checkbox.checked) {
        termsError.style.display = 'block';
        checkbox.focus();
        return false;
    }
    
    termsError.style.display = 'none';
    return true;
}

// Handle form submission
function handleFormSubmit(event) {
    event.preventDefault();
    
    // Reset previous errors
    const serviceError = document.getElementById('service-error');
    const serviceSelect = document.getElementById('service');
    
    if (serviceError) serviceError.style.display = 'none';
    if (serviceSelect) serviceSelect.classList.remove('field-error');
    
    // Validate service selection
    if (serviceSelect && !serviceSelect.value) {
        if (serviceError) {
            serviceError.style.display = 'block';
            serviceSelect.classList.add('field-error');
            serviceSelect.focus();
        }
        return false;
    }
    
    // Validate message length
    const message = document.getElementById('message');
    if (message) {
        const charCount = message.value.length;
        
        if (charCount > 600) {
            alert('Die Nachricht darf 600 Zeichen nicht überschreiten');
            return false;
        }
    }
    
    // If validation passes, submit the form
    alert('Nachricht erfolgreich gesendet! Wir werden uns in Kürze mit Ihnen in Verbindung setzen.');
    event.target.reset();
    
    // Reset character counter
    const charCountElement = document.getElementById('char-count');
    const charCounter = document.getElementById('char-counter');
    if (charCountElement) charCountElement.textContent = '0';
    if (charCounter) charCounter.className = 'char-counter normal';
    
    return true;
}

// Initialize contact form event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Get all FAQ questions
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    // Add click event to each question
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            // Toggle the active class on the answer
            const answer = this.nextElementSibling;
            const icon = this.querySelector('i');
            
            // Close all other answers
            document.querySelectorAll('.faq-answer').forEach(item => {
                if (item !== answer) {
                    item.classList.remove('active');
                    const otherIcon = item.previousElementSibling.querySelector('i');
                    if (otherIcon) otherIcon.style.transform = 'rotate(0deg)';
                }
            });
            
            // Toggle current answer
            answer.classList.toggle('active');
            
            // Rotate icon
            if (icon) {
                if (answer.classList.contains('active')) {
                    icon.style.transform = 'rotate(180deg)';
                } else {
                    icon.style.transform = 'rotate(0deg)';
                }
            }
        });
    });

    // Contact form initialization
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
        
        // Add input event to clear error when user selects an option
        const serviceSelect = document.getElementById('service');
        if (serviceSelect) {
            serviceSelect.addEventListener('change', function() {
                if (this.value) {
                    this.classList.remove('field-error');
                    const serviceError = document.getElementById('service-error');
                    if (serviceError) serviceError.style.display = 'none';
                }
            });
        }
        
        // Initialize character counter if on contact page
        const messageTextarea = document.getElementById('message');
        if (messageTextarea) {
            messageTextarea.addEventListener('input', function() {
                updateCharCounter(this);
            });
        }
    }

    const animatedElements = document.querySelectorAll('.service-card, .testimonial-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => {
        observer.observe(el);
    });

    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const answer = item.querySelector('.faq-answer');
            answer.classList.toggle('active');
        });
    });

    // Scroll to Top Button
    const scrollToTopBtn = document.querySelector('.scroll-to-top');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 2800) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });

    // Text-to-Speech Functionality
    const readAloudBtn = document.getElementById('readAloudBtn');
    const stopReadingBtn = document.getElementById('stopReadingBtn');
    
    if (!readAloudBtn || !stopReadingBtn) return; // Exit if buttons don't exist
    
    let speechSynthesis = window.speechSynthesis;
    let speechUtterance = null;
    let isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    // Get all text content from main sections
    function getPageText() {
        const sections = [
            document.querySelector('.hero'),
            document.querySelector('.about-us'),
            document.querySelector('.services'),
            document.querySelector('.testimonials'),
            document.querySelector('.faq')
        ];
        
        return sections
            .filter(section => section !== null)
            .map(section => {
                // Clone to avoid modifying the original
                const clone = section.cloneNode(true);
                // Remove buttons and other interactive elements
                const elementsToRemove = clone.querySelectorAll('button, a, .btn, .service-cta, .nav-menu, .nav-toggle, .language-notice, .footer');
                elementsToRemove.forEach(el => el.remove());
                return clone.textContent;
            })
            .join('\n\n')
            .replace(/\s+/g, ' ')
            .trim();
    }
    
    // Speak the text
    function speak(text) {
        // Check if speech synthesis is supported
        if (!('speechSynthesis' in window)) {
            alert('The text-to-speech feature is not supported by your browser.');
            return;
        }

        // Request audio context on user interaction for mobile devices
        if (isMobile) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            const audioContext = new AudioContext();
            // Resume audio context on user interaction
            if (audioContext.state === 'suspended') {
                audioContext.resume().catch(e => console.error('Error starting audio:', e));
            }
        }

        if (speechSynthesis.speaking) {
            speechSynthesis.cancel();
        }
        
        speechUtterance = new SpeechSynthesisUtterance(text);
        speechUtterance.lang = 'de-DE';
        speechUtterance.rate = 1.0;
        speechUtterance.pitch = 1.0;
        
        speechUtterance.onstart = function() {
            if (readAloudBtn) readAloudBtn.style.display = 'none';
            if (stopReadingBtn) stopReadingBtn.style.display = 'flex';
            
            // Vibrate on mobile when speech starts
            if (isMobile && navigator.vibrate) {
                navigator.vibrate(100);
            }
        };
        
        speechUtterance.onend = function() {
            if (readAloudBtn) readAloudBtn.style.display = 'flex';
            if (stopReadingBtn) stopReadingBtn.style.display = 'none';
        };
        
        speechUtterance.onerror = function(event) {
            console.error('Error en la síntesis de voz:', event);
            if (readAloudBtn) readAloudBtn.style.display = 'flex';
            if (stopReadingBtn) stopReadingBtn.style.display = 'none';
            
            // Mostrar mensaje de error en dispositivos móviles
            if (isMobile) {
                alert('Error playing audio. Make sure the sound is on and try again.');
            }
        };
        
        try {
            speechSynthesis.speak(speechUtterance);
        } catch (e) {
            console.error('Error starting speech synthesis:', e);
            if (isMobile) {
                alert('Playback failed. Please try again.');
            }
        }
    }
    
    // Event listeners mejorados para móviles
    function setupSpeechButton(button, action) {
        if (!button) return;
        
        const eventType = isMobile ? 'touchend' : 'click';
        
        // Remover listeners previos para evitar duplicados
        button.removeEventListener('click', action);
        button.removeEventListener('touchend', action);
        
        // Prevenir el comportamiento por defecto del touch para evitar el doble disparo
        button.addEventListener('touchstart', function(e) {
            e.preventDefault();
        }, { passive: false });
        
        // Agregar el listener apropiado
        button.addEventListener(eventType, function(e) {
            e.preventDefault();
            e.stopPropagation();
            action();
            return false;
        }, { passive: false });
        
        // Feedback táctil en móviles
        if (isMobile) {
            button.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.95)';
            });
            
            button.addEventListener('touchend', function() {
                this.style.transform = '';
            });
        }
    }
    
    // Configurar los botones
    setupSpeechButton(readAloudBtn, function() {
        const text = getPageText();
        if (text.trim() === '') {
            alert('No text found to read.');
            return;
        }
        speak(text);
    });
    
    setupSpeechButton(stopReadingBtn, function() {
        speechSynthesis.cancel();
        if (readAloudBtn) readAloudBtn.style.display = 'flex';
        if (stopReadingBtn) stopReadingBtn.style.display = 'none';
    });
    
    // Pause/Resume on page visibility change
    document.addEventListener('visibilitychange', function() {
        if (document.hidden && speechSynthesis.speaking) {
            speechSynthesis.pause();
        } else if (speechSynthesis.paused) {
            speechSynthesis.resume();
        }
    });
    
    // Detener la reproducción al cambiar de página
    window.addEventListener('beforeunload', function() {
        if (speechSynthesis.speaking) {
            speechSynthesis.cancel();
        }
    });
});

// Validar el formulario completo
function validateForm(event) {
    // Validar el checkbox de términos
    const termsCheckbox = document.getElementById('termsCheckbox');
    const termsError = document.getElementById('terms-error');
    
    if (!termsCheckbox.checked) {
        termsError.style.display = 'block';
        termsCheckbox.focus();
        event.preventDefault();
        return false;
    }
    
    // Si el checkbox está marcado, se envía el formulario
    return true;
}

//---------------------------------------------

// Campo de fecha y el menú desplegable de hora
const dateInput = document.getElementById('appointmentDate');
const timeSelect = document.getElementById('appointmentTime');

// Establece la fecha mínima a hoy para evitar selecciones en el pasado
const today = new Date();
const yyyy = today.getFullYear();
const mm = String(today.getMonth() + 1).padStart(2, '0');
const dd = String(today.getDate()).padStart(2, '0');
dateInput.min = `${yyyy}-${mm}-${dd}`;

// Horas de citas simuladas
const allTimeSlots = {
    weekday: ['09:00', '10:30', '12:00', '14:00', '15:30', '17:00'],
    saturday: ['09:00', '11:00', '12:00']
};

// Función para actualizar las horas disponibles
const updateAvailableTimes = (dateString) => {
    timeSelect.innerHTML = '';
    timeSelect.disabled = true;

    if (!dateString) {
        timeSelect.innerHTML = '<option value="">Wählen Sie zuerst ein Datum aus</option>';
        return;
    }

    const selectedDate = new Date(dateString + 'T00:00:00');
    const dayOfWeek = selectedDate.getDay(); // 0=Domingo, 6=Sábado

    let availableSlots = [];
    if (dayOfWeek > 0 && dayOfWeek < 6) { // Lunes a Viernes
        availableSlots = allTimeSlots.weekday;
    } else if (dayOfWeek === 6) { // Sábado
        availableSlots = allTimeSlots.saturday;
    }

    // Comprobar si la fecha seleccionada es hoy
    const isToday = selectedDate.toDateString() === new Date().toDateString();
    
    // Filtrar las horas si es el día de hoy
    if (isToday) {
        const now = new Date();
        const currentHour = now.getHours();
        const currentMinute = now.getMinutes();

        availableSlots = availableSlots.filter(slot => {
            const [hourStr, minuteStr] = slot.split(':');
            const slotHour = parseInt(hourStr, 10);
            const slotMinute = parseInt(minuteStr, 10);
            
            // Compara la hora del slot con la hora actual
            if (slotHour > currentHour) {
                return true;
            }
            // Si la hora es la misma, compara los minutos
            if (slotHour === currentHour && slotMinute > currentMinute) {
                return true;
            }
            return false;
        });
    }

    // Resto de la lógica (remoción aleatoria y renderizado)
    if (availableSlots.length > 0) {
        const dayOfMonth = selectedDate.getDate();
        const filteredSlots = availableSlots.filter((_, index) => (index + dayOfMonth) % 3 !== 0);
        
        if (filteredSlots.length > 0) {
            timeSelect.innerHTML = '<option value="">Wählen Sie eine Zeit</option>';
            filteredSlots.forEach(slot => {
                const option = document.createElement('option');
                option.value = slot;
                option.textContent = slot;
                timeSelect.appendChild(option);
            });
            timeSelect.disabled = false;
        } else {
             timeSelect.innerHTML = '<option value="">Vollständig reserviert</option>';
        }
    } else {
        timeSelect.innerHTML = '<option value="">Nicht verfügbar</option>';
    }
};

// Escucha el cambio de fecha para actualizar las horas disponibles
dateInput.addEventListener('change', (e) => {
    updateAvailableTimes(e.target.value);
});

//---------------------------------------------

// Asignar el manejador de eventos al formulario
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', validateForm);
    }
        
    // Actualizar el año actual en el footer
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.textContent = currentYear;
    }
        
    // Ocultar mensajes de error cuando el usuario interactúa con los campos
    const termsCheckbox = document.getElementById('termsCheckbox');
    if (termsCheckbox) {
        termsCheckbox.addEventListener('change', function() {
            if (this.checked) {
                document.getElementById('terms-error').style.display = 'none';
            }
        });
    }
});