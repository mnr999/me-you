// ============================================
// OUR LOVE PORTFOLIO - JavaScript
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS Animation
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });

    // ============================================
    // LOVE COUNTER - Tanggal Jadian
    // ============================================
    const startDate = new Date('2025-05-05T00:00:00'); // Ganti dengan tanggal jadian
    
    // Tampilkan tanggal jadian
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = startDate.toLocaleDateString('id-ID', options);
    document.getElementById('anniversaryDate').textContent = formattedDate;
    
    function updateLoveCounter() {
        const now = new Date();
        const diff = now - startDate;
        
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        document.getElementById('days').textContent = days;
        document.getElementById('hours').textContent = hours;
        document.getElementById('minutes').textContent = minutes;
        document.getElementById('seconds').textContent = seconds;
    }
    
    updateLoveCounter();
    setInterval(updateLoveCounter, 1000);

    // ============================================
    // MUSIC PLAYER - HERO SECTION
    // ============================================
    const playMusicBtn = document.getElementById('playMusicBtn');
    const loveAudio = document.getElementById('loveAudio');
    let isPlaying = false;

    // Set audio source - using a royalty-free love song
    loveAudio.src = 'music/lagu.mp3';

    playMusicBtn.addEventListener('click', function() {
        if (isPlaying) {
            loveAudio.pause();
            playMusicBtn.innerHTML = '<i class="bi bi-play-fill me-2"></i>Mulai Perjalanan';
            isPlaying = false;
        } else {
            loveAudio.play().catch(function(error) {
                console.log('Audio autoplay blocked. User interaction required.');
            });
            playMusicBtn.innerHTML = '<i class="bi bi-pause-fill me-2"></i>Jeda';
            isPlaying = true;
        }
    });

    // ============================================
    // MUSIC PLAYER - MUSIC SECTION (3 Songs)
    // ============================================
    
    // Music data - using the local MP3 file for all songs
    const songs = [
        { id: 1, title: 'Spontan', src: 'music/SPONTAN  tanpa  UHUY! – DEABDIL  Official Performance  _ Alah Alah ... Kok Bisa Ya.mp3' },
        { id: 2, title: 'Adaptasi', src: 'music/TULUS - Adaptasi Official Lyric Video.mp3' },
        { id: 3, title: 'About You', src: 'music/The 1975 - About You (Official) (256).mp3' }
    ];
    
    // Create audio elements for each song
    const audioElements = [];
    
    for (let i = 0; i < songs.length; i++) {
        const audio = new Audio(songs[i].src);
        audioElements.push(audio);
    }
    
    let currentPlaying = null;
    let musicPlaying1 = false;
    let musicPlaying2 = false;
    let musicPlaying3 = false;
    
    // Player 1 - Spontan
    setupMusicPlayer(1, audioElements[0]);
    
    // Player 2 - Adaptasi
    setupMusicPlayer(2, audioElements[1]);
    
    // Player 3 - About You
    setupMusicPlayer(3, audioElements[2]);
    
    function setupMusicPlayer(playerNum, audio) {
        const playPauseBtn = document.getElementById('playPauseBtn' + playerNum);
        const playPauseIcon = document.getElementById('playPauseIcon' + playerNum);
        const musicProgress = document.getElementById('musicProgress' + playerNum);
        const currentTimeEl = document.getElementById('currentTime' + playerNum);
        const durationEl = document.getElementById('duration' + playerNum);
        const equalizer = document.getElementById('equalizer' + playerNum);
        
        playPauseBtn.addEventListener('click', function() {
            const isPlaying = playerNum === 1 ? musicPlaying1 : (playerNum === 2 ? musicPlaying2 : musicPlaying3);
            
            // Stop other players if playing
            if (currentPlaying !== null && currentPlaying !== playerNum) {
                stopPlayer(currentPlaying);
            }
            
            if (isPlaying) {
                audio.pause();
                playPauseIcon.classList.remove('bi-pause-fill');
                playPauseIcon.classList.add('bi-play-fill');
                equalizer.style.animationPlayState = 'paused';
                
                if (playerNum === 1) musicPlaying1 = false;
                else if (playerNum === 2) musicPlaying2 = false;
                else musicPlaying3 = false;
                
                currentPlaying = null;
            } else {
                audio.play().catch(function(error) {
                    console.log('Audio autoplay blocked.');
                });
                playPauseIcon.classList.remove('bi-play-fill');
                playPauseIcon.classList.add('bi-pause-fill');
                equalizer.style.animationPlayState = 'running';
                
                if (playerNum === 1) musicPlaying1 = true;
                else if (playerNum === 2) musicPlaying2 = true;
                else musicPlaying3 = true;
                
                currentPlaying = playerNum;
            }
        });
        
        // Update progress bar
        audio.addEventListener('timeupdate', function() {
            const progress = (audio.currentTime / audio.duration) * 100;
            musicProgress.style.width = progress + '%';
            currentTimeEl.textContent = formatTime(audio.currentTime);
        });
        
        audio.addEventListener('loadedmetadata', function() {
            durationEl.textContent = formatTime(audio.duration);
        });
        
        audio.addEventListener('ended', function() {
            playPauseIcon.classList.remove('bi-pause-fill');
            playPauseIcon.classList.add('bi-play-fill');
            equalizer.style.animationPlayState = 'paused';
            
            if (playerNum === 1) musicPlaying1 = false;
            else if (playerNum === 2) musicPlaying2 = false;
            else musicPlaying3 = false;
            
            musicProgress.style.width = '0%';
            currentPlaying = null;
        });
    }
    
    function stopPlayer(playerNum) {
        const playPauseIcon = document.getElementById('playPauseIcon' + playerNum);
        const equalizer = document.getElementById('equalizer' + playerNum);
        
        audioElements[playerNum - 1].pause();
        audioElements[playerNum - 1].currentTime = 0;
        playPauseIcon.classList.remove('bi-pause-fill');
        playPauseIcon.classList.add('bi-play-fill');
        equalizer.style.animationPlayState = 'paused';
        
        document.getElementById('musicProgress' + playerNum).style.width = '0%';
        
        if (playerNum === 1) musicPlaying1 = false;
        else if (playerNum === 2) musicPlaying2 = false;
        else musicPlaying3 = false;
    }
    
    function formatTime(seconds) {
        if (isNaN(seconds)) return '0:00';
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return mins + ':' + (secs < 10 ? '0' : '') + secs;
    }

    // ============================================
    // GALLERY MODAL
    // ============================================
    const galleryItems = document.querySelectorAll('.gallery-item');
    const modalImage = document.getElementById('modalImage');

    galleryItems.forEach(function(item) {
        item.addEventListener('click', function() {
            const imgSrc = this.querySelector('img').src;
            modalImage.src = imgSrc;
        });
    });

    // ============================================
    // FUTURE SECTION - YES/NO BUTTONS
    // ============================================
    const yesBtn = document.getElementById('yesBtn');
    const noBtn = document.getElementById('noBtn');
    const romanticMessage = document.getElementById('romanticMessage');
    let noClickCount = 0;

    yesBtn.addEventListener('click', function() {
        // Show romantic message
        romanticMessage.style.display = 'block';
        
        // Trigger confetti
        triggerConfetti();
        
        // Scroll to message
        romanticMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Update button state
        yesBtn.innerHTML = '<i class="bi bi-check-lg me-2"></i>Terima Kasih! 💖';
        yesBtn.disabled = true;
        noBtn.style.display = 'none';
    });

    noBtn.addEventListener('click', function() {
        noClickCount++;
        
        // Move button randomly
        const x = Math.random() * 200 - 100;
        const y = Math.random() * 100 - 50;
        
        noBtn.style.transform = `translate(${x}px, ${y}px)`;
        
        // Change text based on click count
        if (noClickCount === 1) {
            noBtn.textContent = 'Yakin? 😢';
        } else if (noClickCount === 2) {
            noBtn.textContent = 'Dipikir lagi dong 😢';
        } else if (noClickCount === 3) {
            noBtn.textContent = 'Jangan gitu dong 😢';
        } else {
            noBtn.textContent = 'Click Iya dong 😍';
        }
    });

    // Reset button position when mouse leaves
    noBtn.addEventListener('mouseleave', function() {
        noBtn.style.transform = 'translate(0, 0)';
    });

    // ============================================
    // CONFETTI EFFECT
    // ============================================
    function triggerConfetti() {
        const canvas = document.getElementById('confettiCanvas');
        const ctx = canvas.getContext('2d');
        
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        const confetti = [];
        const colors = ['#ff6b9d', '#e8b4b8', '#ff4757', '#ffd700', '#ff69b4'];
        
        // Create confetti particles
        for (let i = 0; i < 150; i++) {
            confetti.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height - canvas.height,
                color: colors[Math.floor(Math.random() * colors.length)],
                size: Math.random() * 10 + 5,
                speed: Math.random() * 3 + 2,
                angle: Math.random() * Math.PI * 2,
                spin: Math.random() * 0.2 - 0.1
            });
        }
        
        let animationFrame;
        
        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            let stillAnimating = false;
            
            confetti.forEach(function(p) {
                if (p.y < canvas.height) {
                    stillAnimating = true;
                    
                    p.y += p.speed;
                    p.x += Math.sin(p.angle) * 0.5;
                    p.angle += p.spin;
                    
                    ctx.save();
                    ctx.translate(p.x, p.y);
                    ctx.rotate(p.angle);
                    ctx.fillStyle = p.color;
                    ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
                    ctx.restore();
                }
            });
            
            if (stillAnimating) {
                animationFrame = requestAnimationFrame(animate);
            } else {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            }
        }
        
        animate();
        
        // Stop after 5 seconds
        setTimeout(function() {
            cancelAnimationFrame(animationFrame);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }, 5000);
    }

    // ============================================
    // SMOOTH SCROLL NAVIGATION
    // ============================================
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetSection.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
            
            // Update active link
            navLinks.forEach(function(l) {
                l.classList.remove('active');
            });
            this.classList.add('active');
            
            // Close navbar on mobile
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse.classList.contains('show')) {
                navbarCollapse.classList.remove('show');
            }
        });
    });

    // ============================================
    // UPDATE ACTIVE LINK ON SCROLL
    // ============================================
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(function(section) {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(function(link) {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });

    // ============================================
    // PARALLAX EFFECT FOR HERO
    // ============================================
    window.addEventListener('scroll', function() {
        const hero = document.querySelector('.hero-section');
        const scrolled = window.pageYOffset;
        
        if (hero) {
            hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
        }
    });

    // ============================================
    // NAVBAR BACKGROUND ON SCROLL
    // ============================================
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(10, 14, 23, 0.95)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.background = '#0a0e17';
            navbar.style.boxShadow = 'none';
        }
    });
});

// ============================================
// ADDITIONAL CSS EQUALIZER ANIMATION
// ============================================
const style = document.createElement('style');
style.textContent = `
    .equalizer.paused span {
        animation-play-state: paused;
    }
`;
document.head.appendChild(style);
