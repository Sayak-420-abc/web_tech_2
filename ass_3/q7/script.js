// Q7: Simple JS for responsive nav + form handling
document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.getElementById('nav-toggle');
    const siteNav = document.getElementById('site-nav');

    navToggle.addEventListener('click', () => {
        const expanded = navToggle.getAttribute('aria-expanded') === 'true';
        navToggle.setAttribute('aria-expanded', String(!expanded));
        siteNav.classList.toggle('open');
    });

    // Smooth scroll for internal links
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            const href = a.getAttribute('href');
            if (href.length > 1) {
                e.preventDefault();
                const el = document.querySelector(href);
                if (el) { el.scrollIntoView({ behavior: 'smooth' }); }
                // close mobile nav
                siteNav.classList.remove('open');
                navToggle.setAttribute('aria-expanded', 'false');
            }
        })
    })

    // Basic join form behaviour
    const form = document.getElementById('join-form');
    const result = document.getElementById('form-result');
    form.addEventListener('submit', e => {
        e.preventDefault();
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        if (!name || !email) { result.textContent = 'Please provide name and email.'; return; }
        result.textContent = 'Thanks! Your message has been sent (demo).';
        form.reset();
    });
});