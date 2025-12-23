 // ========== PRELOADER CODE (ADD THIS FIRST) ==========
    
    const splitTextIntoLines = (selector) => {
        const elements = document.querySelectorAll(selector);
        
        elements.forEach(element => {
            const originalHTML = element.innerHTML;
            const paragraphs = originalHTML.split('<br>');
            element.innerHTML = '';
            
            paragraphs.forEach((text, index) => {
                const lineWrapper = document.createElement('div');
                lineWrapper.className = 'line-wrapper';
                lineWrapper.style.overflow = 'hidden';
                lineWrapper.style.display = 'block';
                
                const line = document.createElement('div');
                line.className = 'line';
                line.innerHTML = text.trim();
                line.style.display = 'block';
                line.style.transform = 'translateY(100%)';
                line.style.willChange = 'transform';
                
                lineWrapper.appendChild(line);
                element.appendChild(lineWrapper);
                
                if (index < paragraphs.length - 1) {
                    const spacer = document.createElement('div');
                    spacer.style.height = '0';
                    element.appendChild(spacer);
                }
            });
        });
    };

    splitTextIntoLines(".preloader-copy p");
    splitTextIntoLines(".preloader-counter p");

    const animateCounter = (selector, duration = 5, delay = 0) => {
        const counterElement = document.querySelector(selector);
        if (!counterElement) return;
        
        let currentValue = 0;
        const updateInterval = 200;
        const maxDuration = duration * 1000;
        const startTime = Date.now();

        setTimeout(() => {
            const updateCounter = () => {
                const elapsedTime = Date.now() - startTime;
                const progress = elapsedTime / maxDuration;

                if (currentValue < 100 && elapsedTime < maxDuration) {
                    const target = Math.floor(progress * 100);
                    const jump = Math.floor(Math.random() * 25) + 5;
                    currentValue = Math.min(currentValue + jump, target, 100);

                    const lineElement = counterElement.querySelector('.line');
                    if (lineElement) {
                        lineElement.textContent = currentValue.toString().padStart(2, "0");
                    }
                    
                    setTimeout(updateCounter, updateInterval + Math.random() * 100);
                } else {
                    const lineElement = counterElement.querySelector('.line');
                    if (lineElement) {
                        lineElement.textContent = "100";
                    }
                }
            };

            updateCounter();
        }, delay * 1000);
    };
    
    animateCounter(".preloader-counter p", 4.5, 2);

    // Preloader timeline
    const preloaderTl = gsap.timeline({
        onComplete: () => {
            // Initialize scroll animations after preloader
            initializeScrollAnimations();
        }
    });

    preloaderTl.to([".preloader-copy p .line", ".preloader-counter p .line"], {
        y: "0%",
        duration: 1,
        stagger: 0.075,
        ease: "power3.out",
        delay: 1,
    })
    .to(
        ".preloader-revealer", 
        {
            scale: 0.1,
            duration: 0.75,
            ease: "power2.out",
        },
        "<"
    )
    .to(".preloader-revealer", {
        scale: 0.25,
        duration: 1,
        ease: "power3.out"
    })
    .to(".preloader-revealer", {
        scale: 0.5,
        duration: 0.75,
        ease: "power3.out"
    })
    .to(".preloader-revealer", {
        scale: 0.75,
        duration: 0.5,
        ease: "power2.out"
    })
    .to(".preloader-revealer", {
        scale: 1,
        duration: 1,
        ease: "power3.out"
    })
    .to(".preloader", {
        clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
        duration: 1.25,
        ease: "power3.out",
    }, "-=1");