(function() {
    if (typeof gsap === 'undefined') {
        console.error('GSAP no está cargado');
        return;
    }

    function createStars() {
        const btn = document.getElementById('fransBtn');
        if (!btn) return;
        
        const btnRect = btn.getBoundingClientRect();
        
        for (let i = 0; i < 15; i++) {
            const star = document.createElement('div');
            star.classList.add('frans-star');
            
            const size = Math.random() * 1 + 1;
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;
            
            const left = Math.random() * (btnRect.width - 10) + 5;
            const top = Math.random() * (btnRect.height - 10) + 5;
            star.style.left = `${left}px`;
            star.style.top = `${top}px`;
            
            gsap.to(star, {
                duration: Math.random() * 2 + 1,
                opacity: 0,
                repeat: -1,
                yoyo: true,
                ease: "power1.inOut"
            });
            
            btn.appendChild(star);
        }
    }
    
    function animateText() {
        const text = document.getElementById('fransBtnText');
        if (!text) return;
        
        const letters = text.textContent.split('');
        
        text.innerHTML = '';
        
        letters.forEach((letter, index) => {
            const span = document.createElement('span');
            span.textContent = letter;
            span.classList.add('frans-letter');
            span.style.opacity = '0';
            span.style.transform = 'translateY(20px)';
            text.appendChild(span);
            
            gsap.to(span, {
                duration: 0.8,
                opacity: 1,
                y: 0,
                delay: index * 0.05,
                ease: "back.out(1.7)"
            });
        });
    }
    
    function setupParticleEffects() {
        const btn = document.getElementById('fransBtn');
        if (!btn) return;
        
        btn.addEventListener('mouseenter', function(e) {
            gsap.to(btn, {
                duration: 0.3,
                boxShadow: "0 0 40px rgba(120, 219, 255, 0.6)",
                borderColor: "rgba(120, 219, 255, 0.8)"
            });
            
            const letters = document.querySelectorAll('#fransBtn .frans-letter');
            gsap.to(letters, {
                duration: 0.5,
                color: "#78dbff",
                stagger: 0.03,
                ease: "power2.out"
            });
            
            createParticles(e, 10);
        });
        
        btn.addEventListener('mouseleave', function() {
            gsap.to(btn, {
                duration: 0.5,
                boxShadow: "0 0 20px rgba(120, 219, 255, 0.2)",
                borderColor: "rgba(120, 219, 255, 0.3)"
            });
            
            const letters = document.querySelectorAll('#fransBtn .frans-letter');
            gsap.to(letters, {
                duration: 0.5,
                color: "#ffffff",
                stagger: 0.02,
                ease: "power2.out"
            });
        });
        
        btn.addEventListener('mousemove', function(e) {
            if (Math.random() > 0.7) {
                createParticles(e, 1);
            }
        });
    }
    
    function createParticles(e, count) {
        const btn = document.getElementById('fransBtn');
        if (!btn) return;
        
        const rect = btn.getBoundingClientRect();
        
        for (let i = 0; i < count; i++) {
            const particle = document.createElement('div');
            particle.classList.add('frans-particle');
            
            const size = Math.random() * 3 + 1;
            const colors = ["#78dbff", "#ffffff", "#ff78c8", "#78ff8c"];
            const color = colors[Math.floor(Math.random() * colors.length)];
            
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.backgroundColor = color;
            
            const x = e.clientX - rect.left + (Math.random() - 0.5) * 50;
            const y = e.clientY - rect.top + (Math.random() - 0.5) * 50;
            
            particle.style.left = `${x}px`;
            particle.style.top = `${y}px`;
            
            btn.appendChild(particle);
            
            gsap.to(particle, {
                duration: Math.random() * 1 + 0.5,
                x: (Math.random() - 0.5) * 100,
                y: (Math.random() - 0.5) * 100,
                opacity: 0,
                scale: 0,
                ease: "power2.out",
                onComplete: () => {
                    particle.remove();
                }
            });
        }
    }
    
    function setupClickEffect() {
        const btn = document.getElementById('fransBtn');
        if (!btn) return;
        
        btn.addEventListener('click', function() {
            gsap.to(btn, {
                duration: 0.1,
                scale: 0.95,
                y: 2,
                ease: "power2.inOut",
                onComplete: () => {
                    gsap.to(btn, {
                        duration: 0.2,
                        scale: 1,
                        y: 0,
                        ease: "back.out(1.7)"
                    });
                }
            });
            
            createRippleEffect();
            
            const letters = document.querySelectorAll('#fransBtn .frans-letter');
            gsap.to(letters, {
                duration: 0.1,
                y: -5,
                stagger: 0.03,
                ease: "power2.out",
                onComplete: () => {
                    gsap.to(letters, {
                        duration: 0.3,
                        y: 0,
                        stagger: 0.03,
                        ease: "bounce.out"
                    });
                }
            });
        });
    }
    
    function createRippleEffect() {
        const btn = document.getElementById('fransBtn');
        if (!btn) return;
        
        const ripple = document.createElement('div');
        ripple.classList.add('frans-particle');
        
        ripple.style.width = '10px';
        ripple.style.height = '10px';
        ripple.style.backgroundColor = 'transparent';
        ripple.style.border = '2px solid #78dbff';
        ripple.style.borderRadius = '50%';
        ripple.style.left = '50%';
        ripple.style.top = '50%';
        ripple.style.transform = 'translate(-50%, -50%)';
        
        btn.appendChild(ripple);
        
        gsap.to(ripple, {
            duration: 0.8,
            width: '200px',
            height: '200px',
            opacity: 0,
            borderWidth: '1px',
            ease: "power2.out",
            onComplete: () => {
                ripple.remove();
            }
        });
    }
    
    document.addEventListener('DOMContentLoaded', function() {
        // Esperar a que GSAP esté cargado
        if (typeof gsap !== 'undefined') {
            createStars();
            animateText();
            setupParticleEffects();
            setupClickEffect();
        } else {
            console.error('GSAP no está disponible');
        }
    });
    
})();