const tabs = document.querySelectorAll('[data-tab-target]');
const tabContent = document.querySelectorAll('[data-tab-content]');

const jobTitle = document.querySelector('.home-job-title');
const words = ["Front-End Developer", "Discord Bot Developer", "Network Administrator"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
    if (!jobTitle) return;

    const currentWord = words[wordIndex];
    const currentChar = currentWord.substring(0, charIndex);
    jobTitle.textContent = currentChar;

    if (!isDeleting && charIndex < currentWord.length) {
        charIndex++;
        setTimeout(type, 100);
    } else if (isDeleting && charIndex > 0) {
        charIndex--;
        setTimeout(type, 50);
    } else {
        isDeleting = !isDeleting;
        if (!isDeleting) {
            wordIndex = (wordIndex + 1) % words.length;
        }
        setTimeout(type, 1000);
    }
}

function setActiveTab(targetTabId) {
    const targetContent = document.querySelector(targetTabId);
    if (!targetContent) return;

    tabContent.forEach((content) => {
        const isActive = `#${content.id}` === targetTabId;
        content.classList.toggle('active', isActive);
        content.hidden = !isActive;
    });

    tabs.forEach((tab) => {
        const isTarget = tab.dataset.tabTarget === targetTabId;
        tab.classList.toggle('active', isTarget);

        if (tab.getAttribute('role') === 'tab') {
            tab.setAttribute('aria-selected', String(isTarget));
            tab.tabIndex = isTarget ? 0 : -1;
        }

        if (tab.classList.contains('sidebar-icon-container')) {
            tab.querySelector('.sidebar-icon')?.classList.toggle('active', isTarget);
        }
    });
}

async function copyToClipboard(text, alertId) {
    const alert = document.getElementById(alertId);
    if (!text || !alert) return;

    try {
        if (navigator.clipboard?.writeText) {
            await navigator.clipboard.writeText(text);
        } else {
            const textarea = document.createElement('textarea');
            textarea.value = text;
            textarea.setAttribute('readonly', '');
            textarea.style.position = 'absolute';
            textarea.style.left = '-9999px';
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
        }

        alert.style.display = 'inline';
        setTimeout(() => {
            alert.style.display = 'none';
        }, 2000);
    } catch {
        alert.textContent = 'Copy failed';
        alert.style.display = 'inline';
        setTimeout(() => {
            alert.style.display = 'none';
            alert.textContent = 'Copied!';
        }, 2000);
    }
}

window.addEventListener('load', () => {
    const loader = document.getElementById('loading-screen');

    setTimeout(() => {
        loader?.classList.add('hidden');
        type();
    }, 1000);

    tabs.forEach((tab) => {
        const isInteractive =
            tab.tagName === 'A' || tab.tagName === 'BUTTON' || tab.getAttribute('role') === 'tab';

        if (!isInteractive && tab.dataset.tabTarget) {
            tab.tabIndex = 0;
        }

        tab.addEventListener('click', () => {
            const targetTabId = tab.dataset.tabTarget;
            if (!targetTabId) return;
            setActiveTab(targetTabId);
        });

        tab.addEventListener('keydown', (event) => {
            if (event.key !== 'Enter' && event.key !== ' ') return;
            const targetTabId = tab.dataset.tabTarget;
            if (!targetTabId) return;
            event.preventDefault();
            setActiveTab(targetTabId);
        });
    });

    const initialTab = document.querySelector('.tab-item.active')?.dataset.tabTarget || '#home';
    setActiveTab(initialTab);
});

const copyEmailBtn = document.getElementById('copy-email-btn');
if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', async (event) => {
        event.preventDefault();
        const text = copyEmailBtn.dataset.copyText;
        const alertId = copyEmailBtn.dataset.alertId;
        if (!text || !alertId) return;
        await copyToClipboard(text, alertId);
    });
}

const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const name = document.getElementById('name')?.value?.trim() || '';
        const email = document.getElementById('user_email')?.value?.trim() || '';
        const message = document.getElementById('message')?.value?.trim() || '';
        const status = document.getElementById('form-status');

        if (!status) return;

        status.style.display = 'block';
        status.innerText = 'Chargement...';
        status.style.color = 'var(--tab-hover-border)';

        setTimeout(() => {
            status.innerText = 'Ouverture du client mail...';

            const subject = encodeURIComponent(`Contact de ${name}`);
            const body = encodeURIComponent(`${message}\n\nRépondre à: ${email}`);
            window.location.href = `mailto:haikoo.333@gmail.com?subject=${subject}&body=${body}`;

            status.innerText = 'Message préparé avec succès !';
            this.reset();
        }, 900);
    });
}