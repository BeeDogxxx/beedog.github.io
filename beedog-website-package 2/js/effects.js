// ============================================
// 高知风格动效系统 JavaScript
// Elegant Effects JavaScript Controller
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // 初始化所有特效
    initScrollEffects();
    initNavbarEffect();
    initParallaxEffect();
    initParticleSystem();
    initCountUpEffect();
    initTextTypewriter();
    initSmoothScroll();

    // 备用机制：确保所有动效元素在3秒后显示（防止Intersection Observer失效）
    setTimeout(() => {
        const animatedElements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right, .scale-in');
        animatedElements.forEach(el => {
            if (!el.classList.contains('visible')) {
                el.classList.add('visible');
            }
        });
    }, 3000);
});

// ============================================
// 滚动特效
// ============================================

function initScrollEffects() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // 添加延迟，实现交错淡入效果
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 100);

                // 如果是数字统计，启动计数动画
                if (entry.target.classList.contains('stat-number')) {
                    animateNumber(entry.target);
                }

                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // 观察所有需要动画的元素
    const elements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right, .scale-in');
    elements.forEach(el => {
        observer.observe(el);
    });
}

// ============================================
// 导航栏滚动特效
// ============================================

function initNavbarEffect() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        // 添加滚动样式
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });
}

// ============================================
// 视差滚动效果
// ============================================

function initParallaxEffect() {
    const heroContent = document.querySelector('.hero-content');
    if (!heroContent) return;

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.5;

        heroContent.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        heroContent.style.opacity = 1 - (scrolled / 700);
    });
}

// ============================================
// 背景粒子系统
// ============================================

function initParticleSystem() {
    const particles = ['✨', '💫', '⭐', '🌟'];
    const particleContainer = document.body;

    // 创建粒子
    for (let i = 0; i < 5; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.textContent = particles[i % particles.length];
        particle.style.top = Math.random() * 100 + '%';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 5 + 's';
        particleContainer.appendChild(particle);
    }
}

// ============================================
// 数字增长动画
// ============================================

function animateNumber(element) {
    const target = parseInt(element.textContent);
    const duration = 2000; // 2秒
    const start = 0;
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // 使用缓动函数
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = Math.floor(start + (target - start) * easeOutQuart);

        element.textContent = current + (element.textContent.includes('%') ? '%' : '');

        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            element.textContent = target + (element.textContent.includes('%') ? '%' : '');
        }
    }

    requestAnimationFrame(update);
}

// 初始化所有统计数字
function initCountUpEffect() {
    const statNumbers = document.querySelectorAll('.stat-number');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    statNumbers.forEach(el => observer.observe(el));
}

// ============================================
// 文字打字机效果
// ============================================

function initTextTypewriter() {
    const typewriterElements = document.querySelectorAll('[data-typewriter]');

    typewriterElements.forEach(element => {
        const text = element.textContent;
        element.textContent = '';
        let index = 0;
        const speed = 100; // 打字速度

        function type() {
            if (index < text.length) {
                element.textContent += text.charAt(index);
                index++;
                setTimeout(type, speed);
            }
        }

        // 当元素进入视口时开始打字
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    type();
                    observer.unobserve(entry.target);
                }
            });
        });

        observer.observe(element);
    });
}

// ============================================
// 平滑滚动
// ============================================

function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            if (href === '#') return;

            e.preventDefault();
            const target = document.querySelector(href);

            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============================================
// 鼠标跟随效果
// ============================================

let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// 为卡片添加3D倾斜效果
function init3DTilt() {
    const cards = document.querySelectorAll('.card-hover, .book-card, .project-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });
}

// 初始化3D倾斜效果
init3DTilt();

// ============================================
// 页面加载完成特效
// ============================================

window.addEventListener('load', () => {
    document.body.classList.add('loaded');

    // 触发Hero区域的动画
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        heroTitle.style.opacity = '1';
    }
});

// ============================================
// 工具函数：节流
// ============================================

function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ============================================
// 工具函数：防抖
// ============================================

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ============================================
// 性能优化：减少重绘
// ============================================

// 使用 requestAnimationFrame 优化滚动事件
const optimizedScroll = throttle(() => {
    // 滚动事件处理
}, 16); // 约60fps

window.addEventListener('scroll', optimizedScroll);
