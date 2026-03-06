// ==================== 
// 导航栏交互
// ==================== 
const navbar = document.querySelector('.navbar');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

// 滚动时导航栏样式变化
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(10, 10, 10, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(212, 175, 55, 0.2)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// 移动端菜单切换
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// ==================== 
// 滚动动画
// ==================== 
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// 观察所有需要动画的元素
document.querySelectorAll('.project-card, .skill-item').forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});

// ==================== 
// 平滑滚动
// ==================== 
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

// ==================== 
// 页面加载完成
// ==================== 
window.addEventListener('load', () => {
    console.log('🐝 蜜蜂狗BeeDog的说明书 已加载完成！');
    
    // 添加页面加载动画
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ==================== 
// 数字动画
// ==================== 
function animateNumber(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const updateNumber = () => {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateNumber);
        } else {
            element.textContent = target;
        }
    };
    
    updateNumber();
}

// 当统计数字进入视野时触发动画
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const text = stat.textContent;
                const number = parseInt(text);
                if (!isNaN(number)) {
                    animateNumber(stat, number);
                }
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    statsObserver.observe(heroStats);
}
