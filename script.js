// ==============================================
// ОСНОВНОЙ СКРИПТ ПОРТФОЛИО РОМАНА
// ==============================================

console.log("✅ Script.js загружен!");

// Ожидаем полную загрузку страницы
document.addEventListener('DOMContentLoaded', function() {
    console.log("🚀 DOM полностью загружен!");
    
    // ================================
    // 1. ПЕРЕКЛЮЧЕНИЕ ТЕМЫ (ГАРАНТИРОВАННО РАБОТАЕТ)
    // ================================
    const themeToggle = document.getElementById('themeToggle');
    
    if (themeToggle) {
        console.log("🎯 Кнопка переключения темы найдена");
        
        // Восстанавливаем сохранённую тему
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light') {
            document.body.classList.add('light-theme');
            const icon = themeToggle.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
                console.log("☀️ Восстановлена светлая тема");
            }
        }
        
        // Обработчик клика
        themeToggle.addEventListener('click', function() {
            console.log("🔄 Переключаем тему...");
            
            // Переключаем класс на body
            document.body.classList.toggle('light-theme');
            
            // Меняем иконку
            const icon = this.querySelector('i');
            if (icon) {
                if (document.body.classList.contains('light-theme')) {
                    icon.classList.remove('fa-moon');
                    icon.classList.add('fa-sun');
                    localStorage.setItem('theme', 'light');
                    console.log("✅ Включена светлая тема");
                } else {
                    icon.classList.remove('fa-sun');
                    icon.classList.add('fa-moon');
                    localStorage.setItem('theme', 'dark');
                    console.log("✅ Включена тёмная тема");
                }
            }
            
            // Анимация кнопки
            this.style.transform = 'scale(1.1)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
        });
    } else {
        console.error("❌ Кнопка переключения темы НЕ найдена!");
    }
    
    // ================================
    // 2. МОБИЛЬНОЕ МЕНЮ
    // ================================
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Закрываем меню при клике на ссылку
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
    
    // ================================
    // 3. ВАЛИДАЦИЯ ФОРМЫ КОНТАКТОВ
    // ================================
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        // Функции валидации
        function validateName() {
            const nameInput = document.getElementById('name');
            const errorElement = document.getElementById('nameError');
            const value = nameInput.value.trim();
            
            if (value.length < 2) {
                errorElement.textContent = 'Имя должно содержать минимум 2 символа';
                nameInput.style.borderColor = '#ff6b6b';
                return false;
            } else {
                errorElement.textContent = '';
                nameInput.style.borderColor = '';
                return true;
            }
        }
        
        function validateEmail() {
            const emailInput = document.getElementById('email');
            const errorElement = document.getElementById('emailError');
            const value = emailInput.value.trim();
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if (!emailRegex.test(value)) {
                errorElement.textContent = 'Введите корректный email адрес';
                emailInput.style.borderColor = '#ff6b6b';
                return false;
            } else {
                errorElement.textContent = '';
                emailInput.style.borderColor = '';
                return true;
            }
        }
        
        function validateMessage() {
            const messageInput = document.getElementById('message');
            const errorElement = document.getElementById('messageError');
            const value = messageInput.value.trim();
            
            if (value.length < 10) {
                errorElement.textContent = 'Сообщение должно содержать минимум 10 символов';
                messageInput.style.borderColor = '#ff6b6b';
                return false;
            } else {
                errorElement.textContent = '';
                messageInput.style.borderColor = '';
                return true;
            }
        }
        
        // События валидации в реальном времени
        document.getElementById('name').addEventListener('input', validateName);
        document.getElementById('email').addEventListener('input', validateEmail);
        document.getElementById('message').addEventListener('input', validateMessage);
        
        // Отправка формы
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const isNameValid = validateName();
            const isEmailValid = validateEmail();
            const isMessageValid = validateMessage();
            
            if (isNameValid && isEmailValid && isMessageValid) {
                console.log("📨 Форма валидна, отправляем...");
                
                // Показываем анимацию загрузки
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Отправка...';
                submitBtn.disabled = true;
                
                // Имитация отправки
                setTimeout(() => {
                    // Показываем модальное окно успеха
                    const successModal = document.getElementById('successModal');
                    if (successModal) {
                        successModal.style.display = 'flex';
                    }
                    
                    // Сбрасываем форму
                    contactForm.reset();
                    
                    // Возвращаем кнопку
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    
                    console.log("✅ Форма успешно отправлена (имитация)");
                }, 1500);
            } else {
                console.log("❌ Форма содержит ошибки");
            }
        });
    }
    
    // ================================
    // 4. МОДАЛЬНОЕ ОКНО
    // ================================
    const successModal = document.getElementById('successModal');
    const closeModal = document.querySelector('.close-modal');
    
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            successModal.style.display = 'none';
        });
        
        // Закрытие по клику вне окна
        window.addEventListener('click', function(e) {
            if (e.target === successModal) {
                successModal.style.display = 'none';
            }
        });
    }
    
    // ================================
    // 5. ПЛАВНАЯ ПРОКРУТКА
    // ================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ================================
    // 6. АНИМАЦИЯ НАВЫКОВ ПРИ ПРОКРУТКЕ
    // ================================
    const skillBars = document.querySelectorAll('.skill-level');
    
    function animateSkillBars() {
        skillBars.forEach(bar => {
            const rect = bar.getBoundingClientRect();
            if (rect.top < window.innerHeight - 100) {
                const width = bar.style.width;
                bar.style.width = '0%';
                setTimeout(() => {
                    bar.style.width = width;
                }, 300);
            }
        });
    }
    
    window.addEventListener('scroll', animateSkillBars);
    // Запускаем при загрузке
    setTimeout(animateSkillBars, 500);
    
    // ================================
    // 7. ТЕКУЩИЙ ГОД В ФУТЕРЕ
    // ================================
    const currentYearElement = document.getElementById('currentYear');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }
    
    // ================================
    // 8. ПОДСВЕТКА АКТИВНОГО РАЗДЕЛА
    // ================================
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    function highlightNavLink() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavLink);
    
    // ================================
    // ФИНАЛЬНАЯ ПРОВЕРКА
    // ================================
    console.log("🎉 Все скрипты инициализированы!");
    console.log("👉 Нажми на кнопку с луной в правом верхнем углу!");
});

// ==============================================
// ДОПОЛНИТЕЛЬНЫЕ ФУНКЦИИ
// ==============================================

// Автозаполнение формы для тестирования
function fillTestForm() {
    document.getElementById('name').value = 'Иван Иванов';
    document.getElementById('email').value = 'test@example.com';
    document.getElementById('message').value = 'Привет! Это тестовое сообщение для проверки формы.';
    console.log("📝 Форма заполнена тестовыми данными");
}

// Быстрое переключение темы (можно вызвать из консоли)
window.toggleTheme = function() {
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.click();
    }
};

// Проверка состояния темы
window.getThemeState = function() {
    const isLight = document.body.classList.contains('light-theme');
    console.log(`Текущая тема: ${isLight ? 'Светлая ☀️' : 'Тёмная 🌙'}`);
    return isLight ? 'light' : 'dark';
};
