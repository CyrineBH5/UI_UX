// Fichier : ../js/load-components.js

function loadComponent(targetId, filePath) {
    // La fonction 'fetch' récupère le contenu du fichier (ex: header.html)
    fetch(filePath)
        .then(response => {
            if (!response.ok) {
                // Gestion d'erreur au cas où le fichier n'est pas trouvé (erreur 404)
                throw new Error(`Erreur de chargement de ${filePath} : ${response.status}`);
            }
            return response.text();
        })
        .then(data => {
            // Insère le contenu HTML récupéré dans l'élément cible
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.innerHTML = data;
                
                // OPTIONNEL : Si vous devez initialiser des scripts ou des styles après l'injection, faites-le ici.
                // Par exemple, pour mettre en évidence le lien 'Calendrier' dans la sidebar :
                if (targetId === 'sidebar-placeholder') {
                    highlightActiveLink('Calendrier'); 
                }
            }
        })
        .catch(error => console.error('Erreur lors du chargement des composants:', error));
}

// Fonction pour mettre en évidence le lien actif (spécifique à votre design)
function highlightActiveLink(textToFind) {
    const links = document.querySelectorAll('#sidebar-placeholder a');
    links.forEach(link => {
        // Remplacez 'link.textContent.trim() === textToFind' par la logique 
        // qui correspond à votre structure HTML dans sidebar.html
        if (link.textContent.trim().startsWith(textToFind)) {
            // Supposons que votre classe active est 'active-link' ou similaire
            link.classList.add('active-sidebar-link'); 
            // Vous devrez définir cette classe dans votre CSS pour le style actif (couleur, background, etc.)
        }
    });
}


// Exécute le chargement dès que la structure HTML de base est prête
document.addEventListener('DOMContentLoaded', () => {
    // 1. Charger le Header dans le placeholder 'header-placeholder'
    // Le chemin est relatif à votre fichier HTML (calendar.html)
    loadComponent('header-placeholder', '../shared/header.html');
    
    // 2. Charger la Sidebar dans le placeholder 'sidebar-placeholder'
    loadComponent('sidebar-placeholder', '../shared/sidebar.html');
});