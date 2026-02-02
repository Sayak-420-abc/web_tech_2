// Small demo script for Q6: show which link was clicked and handle bg toggles with animation + persistence
document.addEventListener('DOMContentLoaded', () => {
    const message = document.getElementById('message');
    document.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', e => {
            e.preventDefault();
            message.textContent = `You clicked: "${a.textContent.trim()}" (href: ${a.getAttribute('href')})`;
            a.classList.add('clicked');
            setTimeout(() => a.classList.remove('clicked'), 300);
        })
    })

    const tileUrl = "https://via.placeholder.com/64";
    const largeUrl = "https://via.placeholder.com/420x160";
    const TRANS_MS = 360; // matches CSS transition

    function setBgImmediate(el, mode) {
        if (mode === 'repeat') {
            el.style.backgroundImage = `url('${tileUrl}')`;
            el.style.backgroundRepeat = 'repeat';
            el.style.backgroundSize = '64px 64px';
            el.style.backgroundPosition = '';
            el.classList.remove('no-repeat');
            el.classList.add('repeat');
        } else {
            el.style.backgroundImage = `url('${largeUrl}')`;
            el.style.backgroundRepeat = 'no-repeat';
            el.style.backgroundSize = 'contain';
            el.style.backgroundPosition = 'center';
            el.classList.remove('repeat');
            el.classList.add('no-repeat');
        }
    }

    function animateBgChange(el, mode) {
        const fader = el.querySelector('.bg-fader');
        if (!fader) { setBgImmediate(el, mode); return; }

        if (mode === 'repeat') {
            fader.style.backgroundImage = `url('${tileUrl}')`;
            fader.style.backgroundRepeat = 'repeat';
            fader.style.backgroundSize = '64px 64px';
            fader.style.backgroundPosition = '';
        } else {
            fader.style.backgroundImage = `url('${largeUrl}')`;
            fader.style.backgroundRepeat = 'no-repeat';
            fader.style.backgroundSize = 'contain';
            fader.style.backgroundPosition = 'center';
        }

        // show fader
        fader.style.opacity = '1';
        // after the fade, commit the background to the element and hide fader
        setTimeout(() => {
            setBgImmediate(el, mode);
            fader.style.opacity = '0';
        }, TRANS_MS);
    }

    // Initialize demos from localStorage or default classes
    const demoIds = ['demo1', 'demo2'];
    demoIds.forEach(id => {
        const el = document.getElementById(id);
        if (!el) return;
        const stored = localStorage.getItem('q6:bg:' + id);
        const initMode = stored || (el.classList.contains('repeat') ? 'repeat' : 'no-repeat');
        setBgImmediate(el, initMode);
        // reflect UI
        document.querySelectorAll(`.bg-toggle[data-target="${id}"]`).forEach(b => b.setAttribute('aria-pressed', b.dataset.mode === initMode ? 'true' : 'false'));
        const status = document.getElementById(`${id}-status`);
        if (status) status.innerHTML = `Current: <strong>${initMode}</strong>`;
    })

    // Button listeners
    document.querySelectorAll('.bg-toggle').forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.dataset.target;
            const mode = btn.dataset.mode; // 'repeat' or 'no-repeat'
            const el = document.getElementById(targetId);
            if (!el) return;

            animateBgChange(el, mode);
            // persist
            try { localStorage.setItem('q6:bg:' + targetId, mode); } catch (e) { /* ignore */ }

            // update UI
            document.querySelectorAll(`.bg-toggle[data-target="${targetId}"]`).forEach(b => {
                b.setAttribute('aria-pressed', b.dataset.mode === mode ? 'true' : 'false');
            });

            const status = document.getElementById(`${targetId}-status`);
            if (status) status.innerHTML = `Current: <strong>${mode}</strong>`;

            message.textContent = `Set ${targetId} background to ${mode}`;
        })
    })
})