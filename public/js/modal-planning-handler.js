document.addEventListener('DOMContentLoaded', function() {
    // Sélectionner tous les slots de temps vides (ceux sans événement)
    const timeSlots = document.querySelectorAll('.time-slot:not(:has(.calendar-event))');
    const MODAL_ID = 'planningModalContainer'; // ID du conteneur parent qui sera chargé

    // Fonction pour charger et afficher le contenu du modal
    const loadAndOpenModal = async (slot) => {
        let modalContainer = document.getElementById(MODAL_ID);

        // 1. Charger le contenu si ce n'est pas déjà fait
        if (!modalContainer) {
            try {
                // Créer le conteneur principal du modal
                modalContainer = document.createElement('div');
                modalContainer.id = MODAL_ID;
                document.body.appendChild(modalContainer);

                // Charger le HTML du formulaire depuis form_planning.html
                const response = await fetch('form_planning.html');
                if (!response.ok) {
                    throw new Error(`Erreur HTTP! Statut: ${response.status}`);
                }
                const modalContentHTML = await response.text();
                modalContainer.innerHTML = modalContentHTML;
                
                // Le contenu du modal doit maintenant avoir l'ID 'planningModal'
                // et contenir tous les boutons (closeModalBtn, cancelBtn, addTaskBtn, saveBtn, etc.)
                
            } catch (error) {
                console.error('Erreur lors du chargement du modal:', error);
                return; // Arrêter si le chargement échoue
            }
        }

        // 2. Pré-remplir la date (fonctionne uniquement si #dateInput est dans le contenu chargé)
        const dateInput = document.getElementById('dateInput');
        if (dateInput) {
            const today = new Date();
            // Utiliser toISOString().substring(0, 10) pour le format 'YYYY-MM-DD'
            dateInput.value = today.toISOString().substring(0, 10);
        }

        // 3. Afficher le modal (en supposant que 'planningModal' est le div caché)
        const modal = document.getElementById('planningModal');
        if (modal) {
            modal.classList.remove('hidden');
        }

        // 4. Focus sur le premier champ
        setTimeout(() => {
            const matiereSelect = document.getElementById('matiereSelect');
            if (matiereSelect) {
                matiereSelect.focus();
            }
        }, 100);
    };

    // Fonction pour fermer le modal
    const closeModal = () => {
        const modal = document.getElementById('planningModal');
        if (modal) {
            modal.classList.add('hidden');
            // Réinitialiser le formulaire
            const taskList = document.getElementById('taskList');
            const taskInput = document.getElementById('taskInput');
            const estimationInput = document.getElementById('estimationInput');

            if (taskList) taskList.innerHTML = '';
            if (taskInput) taskInput.value = '';
            if (estimationInput) estimationInput.value = '';
        }
    };
    
    // Fonction pour créer une carte de tâche (gardée pour addTaskBtn)
    const createTaskCard = (taskName, priority) => {
        const priorityColors = {
            basse: 'bg-green-100 text-green-800',
            moyenne: 'bg-yellow-100 text-yellow-800',
            haute: 'bg-red-100 text-red-800'
        };
        const priorityClass = priorityColors[priority] || priorityColors.basse;
        
        // ATTENTION: La modification et suppression de tâche est implémentée en JS natif (onclick="...")
        // car le gestionnaire d'événement global est plus complexe pour les éléments dynamiques.
        return `
            <div class="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition">
                <div class="flex items-center gap-4 flex-1">
                    <span class="text-gray-900 font-medium text-lg">${taskName}</span>
                </div>
                
                <div class="flex items-center gap-3">
                    <span class="px-3 py-1 rounded-full text-sm font-medium ${priorityClass} capitalize">
                        ${priority}
                    </span>
                    
                    <button class="p-2 hover:bg-gray-100 rounded-lg transition" onclick="this.closest('.flex').querySelector('span').textContent = prompt('Nouveau nom:') || this.closest('.flex').querySelector('span').textContent">
                        <svg class="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                        </svg>
                    </button>
                    
                    <button class="p-2 hover:bg-gray-100 rounded-lg transition" onclick="this.closest('.flex.items-center.justify-between').remove()">
                        <svg class="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                        </svg>
                    </button>
                </div>
            </div>
        `;
    };

    // 5. Ajouter les écouteurs d'événements sur les slots vides (déclencheur)
    timeSlots.forEach(slot => {
        slot.style.cursor = 'pointer';
        slot.addEventListener('click', function(e) {
            // Ne pas ouvrir le modal si on clique sur un événement existant
            if (!e.target.closest('.calendar-event')) {
                loadAndOpenModal(this);
            }
        });
        
        // Effet hover sur les slots vides
        slot.addEventListener('mouseenter', function() {
            this.style.backgroundColor = '#f0f9ff';
        });
        
        slot.addEventListener('mouseleave', function() {
            this.style.backgroundColor = '';
        });
    });
    
    // 6. Gestionnaires d'événements globaux pour les boutons du modal (qui est chargé dynamiquement)
    document.addEventListener('click', function(e) {
        const modal = document.getElementById('planningModal');
        if (!modal) return;
        
        // Fermeture
        if (e.target.id === 'closeModalBtn' || e.target.id === 'cancelBtn' || e.target.id === 'planningModal') {
            closeModal();
            return;
        }

        // Ajout de tâche
        if (e.target.id === 'addTaskBtn' || e.target.closest('#addTaskBtn')) {
            const taskInput = document.getElementById('taskInput');
            const prioritySelect = document.getElementById('prioritySelect');
            const taskList = document.getElementById('taskList');
            
            if (taskInput && taskList && taskInput.value.trim()) {
                const priority = prioritySelect ? prioritySelect.value : 'basse';
                const taskHTML = createTaskCard(taskInput.value, priority);
                taskList.insertAdjacentHTML('beforeend', taskHTML);
                
                // Réinitialiser les champs
                taskInput.value = '';
                if (prioritySelect) prioritySelect.value = 'Priorité';
            }
            return;
        }
        
        // Sauvegarde du plan
        if (e.target.id === 'saveBtn') {
            const matiere = document.getElementById('matiereSelect').value;
            const date = document.getElementById('dateInput').value;
            const estimation = document.getElementById('estimationInput').value;
            const tasks = document.querySelectorAll('#taskList > div');
            
            if (matiere === 'Choisir une matière') {
                alert('Veuillez choisir une matière');
                return;
            }
            
            if (!date) {
                alert('Veuillez sélectionner une date');
                return;
            }
            
            if (tasks.length === 0) {
                alert('Veuillez ajouter au moins une tâche');
                return;
            }
            
            console.log('Sauvegarde du plan:', {
                matiere,
                date,
                estimation,
                tasksCount: tasks.length
            });
            
            alert('Plan enregistré avec succès !');
            closeModal();
            return;
        }
    });
    
    // 7. Permettre d'ajouter une tâche avec la touche Entrée et fermer avec Echap
    document.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && e.target.id === 'taskInput') {
            document.getElementById('addTaskBtn')?.click();
        }
    });
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
    
    console.log('Gestionnaire de modal de planification initialisé avec chargement externe ✓');
    console.log(`${timeSlots.length} slots vides détectés`);
});