// Sélection de tous les éléments avec data-tab-target
const tabs = document.querySelectorAll('[data-tab-target]');
const tabContent = document.querySelectorAll('[data-tab-content]');

// Animation du titre: effet machine à écrire
const jobTitle = document.querySelector('.home-job-title');
const words = ["Front-End Developer", "Discord Bot Developer", "Network Administrator"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
    const currentWord = words[wordIndex];
    const currentChar = currentWord.substring(0, charIndex);
    jobTitle.textContent = currentChar;

    if (!isDeleting && charIndex < currentWord.length) {
        charIndex++;
        setTimeout(type, 100); // Vitesse de frappe
    } else if (isDeleting && charIndex > 0) {
        charIndex--;
        setTimeout(type, 50); // Vitesse de suppression
    } else {
        isDeleting = !isDeleting;
        if (!isDeleting) {
            wordIndex = (wordIndex + 1) % words.length;
        }
        setTimeout(type, 1000); // Pause entre les mots
    }
}

// Démarre l'animation de la machine à écrire
window.addEventListener('load', () => {
    const loader = document.getElementById('loading-screen');
    setTimeout(() => {
        loader.classList.add('hidden');
        type(); // Démarre l'animation une fois la page chargée
    }, 1000);
});

// Gestion des onglets
tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const targetTabId = tab.dataset.tabTarget;
        const targetContent = document.querySelector(targetTabId);

        if (!targetContent) return;

        // Masquer tout le contenu
        tabContent.forEach(content => {
            content.classList.remove('active');
        });

        // Retirer l'état actif de tous les éléments de navigation
        tabs.forEach(t => {
            t.classList.remove('active');

            // Pour les conteneurs sidebar-icon-container, retirer aussi l'état actif de l'icône
            if (t.classList.contains('sidebar-icon-container')) {
                t.querySelector('.sidebar-icon')?.classList.remove('active');
            }
        });

        // Activer l'élément cliqué et tous les éléments correspondants
        tabs.forEach(t => {
            if (t.dataset.tabTarget === targetTabId) {
                t.classList.add('active');

                // Pour les conteneurs sidebar-icon-container, activer aussi l'icône
                if (t.classList.contains('sidebar-icon-container')) {
                    t.querySelector('.sidebar-icon')?.classList.add('active');
                }
            }
        });

        // Afficher uniquement le contenu correspondant
        targetContent.classList.add('active');
    });
});

// Fonction pour copier dans le presse-papiers
function CopyToClipboard(text, id) {
    navigator.clipboard.writeText(text);
    const alert = document.getElementById(id);
    alert.style.display = "inline";

    setTimeout(function () {
        alert.style.display = "none";
    }, 2000);
}

// Gestion du formulaire de contact
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('user_email').value;
    const message = document.getElementById('message').value;
    const status = document.getElementById('form-status');

    status.style.display = 'block';
    status.innerText = "Chargement...";
    status.style.color = "var(--tab-hover-border)";

    setTimeout(() => {
        status.innerText = "Message envoyé avec succès !";
        status.style.color = "var(--tab-hover-border)";
        // Ouvre le mail de l'utilisateur par défaut
        window.location.href = `mailto:haikoo.333@gmail.com?subject=Contact de ${name}&body=${message} (Répondre à: ${email})`;
        this.reset();
    }, 1500);
});