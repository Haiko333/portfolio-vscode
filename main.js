// Sélection de tous les éléments avec data-tab-target
const tabs = document.querySelectorAll('[data-tab-target]')
const tabContent = document.querySelectorAll('[data-tab-content]')

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const targetTabId = tab.dataset.tabTarget
        const targetContent = document.querySelector(targetTabId)
        
        if (!targetContent) return
        
        // Masquer tout le contenu
        tabContent.forEach(content => {
            content.classList.remove('active')
        })
        
        // Retirer l'état actif de tous les éléments de navigation
        tabs.forEach(t => {
            t.classList.remove('active')
            
            // Pour les conteneurs sidebar-icon-container, retirer aussi l'état actif de l'icône
            if (t.classList.contains('sidebar-icon-container')) {
                t.querySelector('.sidebar-icon')?.classList.remove('active')
            }
        })
        
        // Activer l'élément cliqué et tous les éléments correspondants
        tabs.forEach(t => {
            if (t.dataset.tabTarget === targetTabId) {
                t.classList.add('active')
                
                // Pour les conteneurs sidebar-icon-container, activer aussi l'icône
                if (t.classList.contains('sidebar-icon-container')) {
                    t.querySelector('.sidebar-icon')?.classList.add('active')
                }
            }
        })
        
        // Afficher uniquement le contenu correspondant
        targetContent.classList.add('active')
    })
})

function CopyToClipboard(text, id) {
    navigator.clipboard.writeText(text);
    const alert = document.getElementById(id).style.display = "inline";

    setTimeout(function () {
        document.getElementById(id).style.display = "none";
    }, 2000);
}

window.addEventListener('load', () => {
    const loader = document.getElementById('loading-screen');

    setTimeout(() => {
        loader.classList.add('hidden');
    }, 1000); 
});