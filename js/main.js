// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 平滑滚动效果
    const smoothScroll = function(target, duration) {
        const targetElement = document.querySelector(target);
        const targetPosition = targetElement.getBoundingClientRect().top;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - 80; // 减去导航栏高度
        let startTime = null;

        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = ease(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }

        // 缓动函数
        function ease(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }

        requestAnimationFrame(animation);
    };

    // 为所有导航链接添加平滑滚动效果
    const navLinks = document.querySelectorAll('nav a, .cta-buttons a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            smoothScroll(targetId, 1000);
        });
    });

    // 滚动时导航栏效果
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            header.style.background = 'rgba(255, 255, 255, 0.95)';
        } else {
            header.style.boxShadow = 'none';
            header.style.background = 'white';
        }
    });

    // 视频播放控制
    const videoPlaceholder = document.getElementById('video-placeholder');
    const videoContainer = document.getElementById('video-container');
    
    if (videoPlaceholder && videoContainer) {
        videoPlaceholder.addEventListener('click', function() {
            // 创建视频元素
            const videoElement = document.createElement('video');
            videoElement.src = 'https://outin-8cece9a5d6f611efbc4100163e32a995.oss-cn-shanghai.aliyuncs.com/sv/240a5da-1955c4996d5/240a5da-1955c4996d5.mp4?Expires=1741052651&OSSAccessKeyId=LTAIxSaOfEzCnBOj&Signature=ogRe48JS9jsSbBkZRel1JXjt90A%3D';
            videoElement.controls = true;
            videoElement.autoplay = true;
            videoElement.className = 'course-video';
            
            // 替换占位符为视频
            videoContainer.innerHTML = '';
            videoContainer.appendChild(videoElement);
        });
    }
});
