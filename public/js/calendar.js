        const events = {
            1: {
                id: 1,
                title: "Quiz Art et Maths",
                date: "2025-11-21",
                startTime: "08:00",
                endTime: "09:00",
                type: "exam",
                color: "blue",
                description: "Quiz combiné sur l'histoire de l'art et les mathématiques avancées. Durée: 1 heure.",
                location: "Salle A12"
            },
            2: {
                id: 2,
                title: "Révision Mathématiques",
                date: "2025-11-21",
                startTime: "11:00",
                endTime: "12:00",
                type: "revision",
                color: "green",
                description: "Révision des concepts clés en algèbre linéaire et calcul différentiel.",
                location: "Bibliothèque"
            },
            9: {
                id: 9,
                title: "Anglais technique",
                date: "2025-11-23",
                startTime: "09:00",
                endTime: "10:00",
                type: "course",
                color: "purple",
                description: "Cours d'anglais technique avec focus sur le vocabulaire informatique et les présentations professionnelles.",
                location: "Salle B7"
            },
            10: {
                id: 10,
                title: "Conception et Réalisation d'Applications",
                date: "2025-11-23",
                startTime: "11:00",
                endTime: "13:00",
                type: "course",
                color: "yellow",
                description: "Cours sur les méthodologies de conception d'applications. Travaux pratiques sur les diagrammes UML et les cas d'utilisation.",
                location: "Labo Informatique 3"
            },
            18: {
                id: 18,
                title: "Informatique avancée",
                date: "2025-11-25",
                startTime: "08:30",
                endTime: "10:00",
                type: "course",
                color: "cyan",
                description: "Cours sur les structures de données avancées et les algorithmes de recherche. Préparation pour le projet final.",
                location: "Amphithéâtre C"
            },
            20: {
                id: 20,
                title: "Web Design",
                date: "2025-11-25",
                startTime: "13:00",
                endTime: "14:00",
                type: "course",
                color: "yellow",
                description: "Principes du design d'interfaces utilisateur. Atelier pratique sur Figma.",
                location: "Salle Multimédia"
            }
        };

        // DOM Elements
        const eventModal = document.getElementById('eventModal');
        const eventDetails = document.getElementById('eventDetails');
        const closeModalBtn = document.getElementById('closeModalBtn');
        const addEventBtn = document.getElementById('addEventBtn');
        const fab = document.getElementById('fab');
        const todayBtn = document.getElementById('todayBtn');
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const currentWeek = document.getElementById('currentWeek');
        const viewButtons = {
            day: document.getElementById('dayViewBtn'),
            week: document.getElementById('weekViewBtn'),
            month: document.getElementById('monthViewBtn'),
            year: document.getElementById('yearViewBtn')
        };
        
        // Current date tracking
        let currentDate = new Date(2025, 10, 25); // November 25, 2025
        
        // Event Listeners
        document.addEventListener('DOMContentLoaded', function() {
            // Set up event listeners for calendar events
            const calendarEvents = document.querySelectorAll('.calendar-event');
            calendarEvents.forEach(eventElement => {
                eventElement.addEventListener('click', function() {
                    const eventId = this.getAttribute('data-event');
                    showEventDetails(eventId);
                });
            });
            
            // Set up today button
            todayBtn.addEventListener('click', function() {
                currentDate = new Date();
                updateWeekDisplay();
                highlightToday();
            });
            
            // Set up navigation buttons
            prevBtn.addEventListener('click', function() {
                currentDate.setDate(currentDate.getDate() - 7);
                updateWeekDisplay();
            });
            
            nextBtn.addEventListener('click', function() {
                currentDate.setDate(currentDate.getDate() + 7);
                updateWeekDisplay();
            });
            
            // Set up view buttons
            Object.keys(viewButtons).forEach(view => {
                viewButtons[view].addEventListener('click', function() {
                    switchView(view);
                });
            });
            
            // Set up modal close button
            closeModalBtn.addEventListener('click', function() {
                eventModal.classList.remove('active');
            });
            
            // Set up FAB and add event button
            fab.addEventListener('click', showAddEventForm);
            addEventBtn.addEventListener('click', showAddEventForm);
            
            // Close modal when clicking outside
            window.addEventListener('click', function(e) {
                if (e.target === eventModal) {
                    eventModal.classList.remove('active');
                }
            });
            
            // Initialize display
            updateWeekDisplay();
            highlightToday();
        });
        
        // Functions
        function showEventDetails(eventId) {
            const event = events[eventId];
            if (!event) {
                eventDetails.innerHTML = `
                    <div class="text-center py-8">
                        <i class="fas fa-exclamation-triangle text-3xl text-yellow-500 mb-4"></i>
                        <p class="text-gray-600">Informations non disponibles pour cet événement.</p>
                    </div>
                `;
            } else {
                // Format date
                const eventDate = new Date(event.date);
                const formattedDate = eventDate.toLocaleDateString('fr-FR', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                });
                
                // Map type to French label
                const typeLabels = {
                    'course': 'Cours',
                    'exam': 'Examen',
                    'revision': 'Révision',
                    'project': 'Projet',
                    'meeting': 'Réunion'
                };
                
                // Populate event details
                eventDetails.innerHTML = `
                    <div class="space-y-4">
                        <div class="flex items-start justify-between">
                            <div>
                                <h4 class="text-lg font-bold text-gray-800">${event.title}</h4>
                                <div class="flex items-center mt-1">
                                    <span class="inline-block w-3 h-3 rounded-full mr-2" style="background-color: ${getColorCode(event.color)}"></span>
                                    <span class="text-sm text-gray-600">${typeLabels[event.type] || event.type}</span>
                                </div>
                            </div>
                            <span class="px-3 py-1 bg-${event.color}-100 text-${event.color}-800 text-xs font-medium rounded-full">${event.startTime} - ${event.endTime}</span>
                        </div>
                        
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <p class="text-sm font-medium text-gray-700">Date</p>
                                <p class="text-gray-800">${formattedDate}</p>
                            </div>
                            <div>
                                <p class="text-sm font-medium text-gray-700">Lieu</p>
                                <p class="text-gray-800">${event.location || "Non spécifié"}</p>
                            </div>
                        </div>
                        
                        <div>
                            <p class="text-sm font-medium text-gray-700">Description</p>
                            <p class="text-gray-800 mt-1">${event.description || "Aucune description fournie."}</p>
                        </div>
                    </div>
                `;
                
                // Set up edit and delete buttons
                document.getElementById('editEventBtn').onclick = function() {
                    editEvent(eventId);
                };
                
                document.getElementById('deleteEventBtn').onclick = function() {
                    deleteEvent(eventId);
                };
            }
            
            // Show modal
            eventModal.classList.add('active');
        }
        
        function getColorCode(colorName) {
            const colorMap = {
                'cyan': '#06b6d4',
                'purple': '#a855f7',
                'yellow': '#eab308',
                'pink': '#ec4899',
                'blue': '#3b82f6',
                'green': '#22c55e',
                'orange': '#f97316',
                'red': '#ef4444',
                'teal': '#14b8a6',
                'indigo': '#6366f1',
                'emerald': '#10b981',
                'rose': '#f43f5e',
                'amber': '#f59e0b',
                'sky': '#0ea5e9',
                'violet': '#8b5cf6',
                'fuchsia': '#d946ef',
                'lime': '#84cc16'
            };
            
            return colorMap[colorName] || '#06b6d4';
        }
        
        function editEvent(eventId) {
            alert(`Modification de l'événement #${eventId} - Cette fonctionnalité sera bientôt disponible!`);
            eventModal.classList.remove('active');
        }
        
        function deleteEvent(eventId) {
            if (confirm("Êtes-vous sûr de vouloir supprimer cet événement ?")) {
                // In a real application, this would delete from backend
                delete events[eventId];
                eventModal.classList.remove('active');
                alert("Événement supprimé avec succès!");
                
                // In a real application, you would refresh the calendar view
                const eventElement = document.querySelector(`.calendar-event[data-event="${eventId}"]`);
                if (eventElement) {
                    eventElement.remove();
                }
            }
        }
        
        function showAddEventForm() {
            alert("Ajout d'un nouvel événement - Cette fonctionnalité sera bientôt disponible!");
            // In a real application, this would show a form modal
        }
        
        function switchView(view) {
            // Update active button
            Object.keys(viewButtons).forEach(v => {
                if (v === view) {
                    viewButtons[v].classList.remove('text-gray-600', 'hover:bg-gray-100');
                    viewButtons[v].classList.add('bg-cyan-600', 'text-white');
                } else {
                    viewButtons[v].classList.remove('bg-cyan-600', 'text-white');
                    viewButtons[v].classList.add('text-gray-600', 'hover:bg-gray-100');
                }
            });
            
            // In a real application, this would switch calendar views
            alert(`Passage à la vue ${view} - Cette fonctionnalité sera bientôt disponible!`);
        }
        
        function updateWeekDisplay() {
            // Calculate week number
            const weekNumber = getWeekNumber(currentDate);
            currentWeek.textContent = `Semaine ${weekNumber}`;
            
            // Update the date display in the header
            const startOfWeek = new Date(currentDate);
            startOfWeek.setDate(currentDate.getDate() - currentDate.getDay()); // Start on Sunday
            
            const endOfWeek = new Date(startOfWeek);
            endOfWeek.setDate(startOfWeek.getDate() + 6);
            
            const options = { day: 'numeric', month: 'long', year: 'numeric' };
            const dateDisplay = document.querySelector('main p.text-gray-600.mt-1');
            if (dateDisplay) {
                dateDisplay.textContent = `${startOfWeek.toLocaleDateString('fr-FR', options)} - ${endOfWeek.toLocaleDateString('fr-FR', options)}`;
            }
        }
        
        function getWeekNumber(date) {
            // Calculate ISO week number
            const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
            const dayNum = d.getUTCDay() || 7;
            d.setUTCDate(d.getUTCDate() + 4 - dayNum);
            const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
            return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
        }
        
        function highlightToday() {
            // Remove today class from all columns
            document.querySelectorAll('.day-column').forEach(col => {
                col.classList.remove('today-column');
            });
            
            document.querySelectorAll('.day-header').forEach(header => {
                header.classList.remove('today-column');
                const dayNum = header.querySelector('.text-lg, .current-day');
                if (dayNum) {
                    dayNum.classList.remove('current-day');
                    dayNum.classList.add('text-lg', 'font-semibold');
                }
            });
            
            // Find today's column (25th) and highlight it
            const todayColumn = document.querySelector('.day-column:nth-child(6)'); // 6th column is Thursday
            if (todayColumn) {
                todayColumn.classList.add('today-column');
            }
            
            const todayHeader = document.querySelector('.day-header:nth-child(6)'); // 6th header is Thursday
            if (todayHeader) {
                todayHeader.classList.add('today-column');
                const dayNum = todayHeader.querySelector('div:nth-child(2)');
                if (dayNum) {
                    dayNum.classList.remove('text-lg', 'font-semibold');
                    dayNum.classList.add('current-day');
                }
            }
        }
