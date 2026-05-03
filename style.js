// Custom cursor
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursorRing');
let mx = 0,
    my = 0,
    rx = 0,
    ry = 0;

document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
    cursor.style.left = mx - 5 + 'px';
    cursor.style.top = my - 5 + 'px';
});

function animRing() {
    rx += (mx - rx - 18) * 0.12;
    ry += (my - ry - 18) * 0.12;
    ring.style.left = rx + 'px';
    ring.style.top = ry + 'px';
    requestAnimationFrame(animRing);
}
animRing();

document.querySelectorAll('a, button, input, textarea, select').forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(2.5)';
        ring.style.transform = 'scale(1.5)';
    });
    el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
        ring.style.transform = 'scale(1)';
    });
});

// Counter animation
function animateCounters() {
    document.querySelectorAll('[data-target]').forEach(el => {
        const target = +el.dataset.target;
        let count = 0;
        const step = target / 40;
        const t = setInterval(() => {
            count = Math.min(count + step, target);
            el.textContent = Math.floor(count) + (el.dataset.suffix || '+');
            if (count >= target) clearInterval(t);
        }, 40);
    });
}

// Intersection observer for fade-in
const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.1
});

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// Hero section observer for counters
const heroObserver = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) animateCounters();
}, {
    threshold: 0.5
});
heroObserver.observe(document.getElementById('home'));

// Form submit
function handleSubmit(e) {
    e.preventDefault();
    const btn = e.target.querySelector('.btn-submit');
    btn.textContent = 'Sending...';
    setTimeout(() => {
        btn.style.display = 'none';
        document.getElementById('formSuccess').style.display = 'block';
    }, 1200);
}

// CV download
function downloadCV(e) {
    e.preventDefault();
    const btn = e.currentTarget;
    const orig = btn.innerHTML;
    btn.innerHTML = '✓ Downloaded!';
    setTimeout(() => btn.innerHTML = orig, 2500);
}

// Mobile menu
function toggleMenu() {
    const links = document.querySelector('.nav-links');
    const cta = document.querySelector('.nav-cta');
    if (!links) return;
    const open = links.style.display === 'flex';
    links.style.cssText = open ? '' : 'display:flex;flex-direction:column;position:fixed;top:64px;left:0;right:0;background:rgba(10,10,15,0.97);padding:24px;gap:20px;border-bottom:1px solid var(--border)';
    if (cta) cta.style.display = open ? '' : 'none';
}

// Smooth active link highlight on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(s => {
        if (window.scrollY >= s.offsetTop - 100) current = s.id;
    });
    navLinks.forEach(a => {
        a.style.color = a.getAttribute('href') === '#' + current ? 'var(--accent)' : '';
    });
});