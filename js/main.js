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

// ==================== 
// 视频背景控制
// ==================== 
const heroVideo = document.getElementById('heroVideo');

if (heroVideo) {
    // 尝试播放视频
    const playVideo = () => {
        heroVideo.play().then(() => {
            console.log('✅ 视频背景播放成功');
        }).catch(error => {
            console.warn('⚠️ 视频自动播放失败:', error);
            console.log('💡 可能的原因：浏览器策略、视频格式不支持或网络问题');
            console.log('📹 视频文件:', heroVideo.src);
            
            // 如果自动播放失败，尝试静音播放
            heroVideo.muted = true;
            heroVideo.play().catch(e => {
                console.error('❌ 即使静音也无法播放:', e);
            });
        });
    };

    // 页面加载完成后尝试播放
    window.addEventListener('load', () => {
        // 确保视频已加载
        if (heroVideo.readyState >= 2) {
            playVideo();
        } else {
            heroVideo.addEventListener('canplay', playVideo, { once: true });
        }
    });

    // 监听视频事件
    heroVideo.addEventListener('error', (e) => {
        console.error('❌ 视频加载错误:', e);
        console.error('错误代码:', heroVideo.error?.code);
        console.error('错误信息:', heroVideo.error?.message);
    });

    heroVideo.addEventListener('loadeddata', () => {
        console.log('✅ 视频数据已加载');
        console.log('📹 视频时长:', heroVideo.duration, '秒');
        console.log('📹 视频尺寸:', heroVideo.videoWidth, 'x', heroVideo.videoHeight);
    });

    // 监听播放状态
    heroVideo.addEventListener('play', () => {
        console.log('▶️ 视频开始播放');
    });

    heroVideo.addEventListener('pause', () => {
        console.log('⏸️ 视频暂停');
    });

    heroVideo.addEventListener('ended', () => {
        console.log('🔄 视频播放结束，循环播放');
    });
} else {
    console.warn('⚠️ 未找到视频元素 #heroVideo');
}
