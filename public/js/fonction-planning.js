 // Initialisation du modal - Compatible avec le chargement dynamique
        (function() {
            // Fonction d'initialisation appelée après le chargement du DOM
            function initModalPlanification() {
                // Éléments du DOM
                const modal = document.getElementById('planningModal');
                const closeModalBtn = document.getElementById('closeModalBtn');
                const cancelBtn = document.getElementById('cancelBtn');
                const saveBtn = document.getElementById('saveBtn');
                const addTaskBtn = document.getElementById('addTaskBtn');
                const generateBtn = document.getElementById('generateBtn');
                const taskInput = document.getElementById('taskInput');
                const prioritySelect = document.getElementById('prioritySelect');
                const taskList = document.getElementById('taskList');

                // Vérification que tous les éléments existent
                if (!modal || !closeModalBtn || !cancelBtn || !saveBtn || !addTaskBtn) {
                    console.error('Certains éléments du modal sont manquants');
                    return;
                }

                // Fonction pour fermer le modal avec animation
                function closeModal() {
                    modal.classList.add('fade-out');
                    setTimeout(() => {
                        modal.classList.add('hidden');
                        modal.classList.remove('fade-out');
                        // Réinitialiser le formulaire
                        if (taskList) taskList.innerHTML = '';
                        if (taskInput) taskInput.value = '';
                        if (prioritySelect) prioritySelect.value = '';
                        if (document.getElementById('estimationInput')) {
                            document.getElementById('estimationInput').value = '';
                        }
                    }, 300);
                }

                // Fonction pour créer une carte de tâche
                function createTaskCard(taskName, priority) {
                    const priorityClass = {
                        'basse': 'priority-basse',
                        'moyenne': 'priority-moyenne',
                        'haute': 'priority-haute'
                    };

                    const priorityLabel = {
                        'basse': 'Basse',
                        'moyenne': 'Moyenne',
                        'haute': 'Haute'
                    };

                    const card = document.createElement('div');
                    card.className = 'task-card';
                    card.innerHTML = `
                        <div class="flex items-center gap-4 flex-1">
                            <span class="text-gray-900 font-medium text-lg">${taskName}</span>
                        </div>
                        
                        <div class="flex items-center gap-3">
                            <span class="priority-badge ${priorityClass[priority]}">
                                ${priorityLabel[priority]}
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                                </svg>
                            </span>
                            
                            <button class="icon-button edit-btn">
                                <svg class="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                                </svg>
                            </button>
                            
                            <button class="icon-button delete-btn">
                                <svg class="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                </svg>
                            </button>
                        </div>
                    `;

                    // Ajouter les événements pour les boutons
                    const deleteBtn = card.querySelector('.delete-btn');
                    deleteBtn.addEventListener('click', () => {
                        card.style.transform = 'translateX(100%)';
                        card.style.opacity = '0';
                        setTimeout(() => card.remove(), 300);
                    });

                    const editBtn = card.querySelector('.edit-btn');
                    editBtn.addEventListener('click', () => {
                        const taskNameEl = card.querySelector('span.text-gray-900');
                        const currentName = taskNameEl.textContent;
                        const newName = prompt('Modifier le nom de la tâche:', currentName);
                        if (newName && newName.trim()) {
                            taskNameEl.textContent = newName.trim();
                        }
                    });

                    return card;
                }

                // Bouton X pour fermer
                closeModalBtn.addEventListener('click', closeModal);

                // Bouton Annuler
                cancelBtn.addEventListener('click', closeModal);

                // Fermer en cliquant sur le fond
                modal.addEventListener('click', (e) => {
                    if (e.target === modal) {
                        closeModal();
                    }
                });

                // Ajouter une tâche
                addTaskBtn.addEventListener('click', () => {
                    const taskName = taskInput.value.trim();
                    const priority = prioritySelect.value;

                    if (!taskName) {
                        alert('Veuillez entrer un nom de tâche');
                        return;
                    }

                    if (!priority) {
                        alert('Veuillez sélectionner une priorité');
                        return;
                    }

                    const taskCard = createTaskCard(taskName, priority);
                    taskList.appendChild(taskCard);

                    // Réinitialiser les champs
                    taskInput.value = '';
                    prioritySelect.value = '';
                });

                // Générer une tâche automatiquement
                if (generateBtn) {
                    generateBtn.addEventListener('click', () => {
                        const tasks = [
                            'Réviser le chapitre 5',
                            'Faire les exercices supplémentaires',
                            'Préparer la présentation',
                            'Lire les notes de cours',
                            'Résoudre les problèmes complexes',
                            'Série d\'exercice 2',
                            'Série d\'exercice 3',
                            'Rédiger le rapport'
                        ];
                        const priorities = ['basse', 'moyenne', 'haute'];
                        
                        const randomTask = tasks[Math.floor(Math.random() * tasks.length)];
                        const randomPriority = priorities[Math.floor(Math.random() * priorities.length)];
                        
                        taskInput.value = randomTask;
                        prioritySelect.value = randomPriority;
                    });
                }

                // Bouton Enregistrer
                saveBtn.addEventListener('click', () => {
                    const matiere = document.getElementById('matiereSelect').value;
                    const date = document.getElementById('dateInput').value;
                    const estimation = document.getElementById('estimationInput').value;
                    const tasks = taskList.querySelectorAll('.task-card');

                    if (!matiere || matiere === 'Choisir une matière') {
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

                    alert('Plan enregistré avec succès!\n\n' +
                          `Matière: ${matiere}\n` +
                          `Date: ${date}\n` +
                          `Estimation: ${estimation}\n` +
                          `Nombre de tâches: ${tasks.length}`);
                    
                    closeModal();
                });

                // Support de la touche Entrée
                if (taskInput) {
                    taskInput.addEventListener('keypress', (e) => {
                        if (e.key === 'Enter') {
                            addTaskBtn.click();
                        }
                    });
                }

                // Support de la touche Echap
                document.addEventListener('keydown', (e) => {
                    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
                        closeModal();
                    }
                });

                console.log('✓ Modal de planification initialisé avec succès');
            }

            // Initialiser immédiatement ou attendre le chargement du DOM
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', initModalPlanification);
            } else {
                initModalPlanification();
            }
        })();