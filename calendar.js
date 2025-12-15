// Calendar Data
const events = [
    {
        id: 1,
        day: 0, // Monday (21)
        startTime: 8,
        duration: 1.5,
        title: "Quiz AM 📝\nMODE Partiel",
        color: "blue",
        icon: "📝"
    },
    {
        id: 2,
        day: 0,
        startTime: 8,
        duration: 1.5,
        title: "8:00 AM\nInformatique...",
        color: "teal",
        icon: "💻"
    },
    {
        id: 3,
        day: 1, // Tuesday (22)
        startTime: 11,
        duration: 2,
        title: "11:00 AM 📝\nEntrepreneuriat et Innovation_revision",
        color: "orange",
        icon: "📝"
    },
    {
        id: 4,
        day: 1,
        startTime: 12.5,
        duration: 1.5,
        title: "12:30 AM 📝\nEntreprenariat et Innovation_revision",
        color: "orange",
        icon: "📝"
    },
    {
        id: 5,
        day: 1,
        startTime: 15,
        duration: 2,
        title: "15:00 PM 📝\nCommunication, Culture et Humanités",
        color: "blue",
        icon: "📝"
    },
    {
        id: 6,
        day: 2, // Wednesday (23)
        startTime: 10,
        duration: 2,
        title: "10:02 PM 📌\n2_Conception et Réalisation",
        color: "pink",
        icon: "📌"
    },
    {
        id: 7,
        day: 3, // Thursday (24)
        startTime: 11,
        duration: 1.5,
        title: "11:00 AM\nJavaScript côté Serveur",
        color: "purple",
        icon: "💻"
    },
    {
        id: 8,
        day: 3,
        startTime: 12.5,
        duration: 2,
        title: "12:00 PM 📌\n2_DEVOPS",
        color: "pink",
        icon: "📌"
    },
    {
        id: 9,
        day: 3,
        startTime: 15.5,
        duration: 2,
        title: "15:30 PM 📌\nConception et Réalisation",
        color: "blue",
        icon: "📌"
    },
    {
        id: 10,
        day: 4, // Friday (25)
        startTime: 8.5,
        duration: 1,
        title: "8:30 AM\nInformatique...",
        color: "teal",
        icon: "💻"
    },
    {
        id: 11,
        day: 5, // Saturday (26)
        startTime: 12,
        duration: 2,
        title: "12:00 AM\nJavaScript côté Serveur",
        color: "purple",
        icon: "💻"
    }
];

// Calendar State
let currentDate = new Date(2025, 10, 25); // Nov 25, 2025
const daysOfWeek = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
const monthNames = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'];

// Initialize Calendar
function initCalendar() {
    renderCalendar();
    setupEventListeners();
}

// Render Calendar
function renderCalendar() {
    const daysGrid = document.getElementById('daysGrid');
    daysGrid.innerHTML = '';
    
    const startOfWeek = getStartOfWeek(currentDate);
    
    // Update current date display
    document.getElementById('currentDate').textContent = formatDateHeader(currentDate);
    
    // Create 7 day columns
    for (let i = 0; i < 7; i++) {
        const date = new Date(startOfWeek);
        date.setDate(startOfWeek.getDate() + i);
        
        const dayColumn = createDayColumn(date, i);
        daysGrid.appendChild(dayColumn);
    }
    
    // Add events
    renderEvents();
}

// Create Day Column
function createDayColumn(date, dayIndex) {
    const dayColumn = document.createElement('div');
    dayColumn.className = 'day-column';
    
    // Day Header
    const header = document.createElement('div');
    header.className = 'day-header';
    
    const dayName = document.createElement('div');
    dayName.className = 'day-name';
    dayName.textContent = daysOfWeek[dayIndex];
    
    const dayNumber = document.createElement('div');
    dayNumber.className = 'day-number';
    
    // Check if today
    const today = new Date();
    if (date.getDate() === today.getDate() && 
        date.getMonth() === today.getMonth() && 
        date.getFullYear() === today.getFullYear()) {
        dayNumber.classList.add('today');
    }
    
    dayNumber.textContent = date.getDate();
    
    header.appendChild(dayName);
    header.appendChild(dayNumber);
    dayColumn.appendChild(header);
    
    // Time cells (11 hours from 7:00 to 17:00)
    for (let i = 0; i < 11; i++) {
        const timeCell = document.createElement('div');
        timeCell.className = 'time-cell';
        timeCell.dataset.day = dayIndex;
        timeCell.dataset.hour = 7 + i;
        dayColumn.appendChild(timeCell);
    }
    
    return dayColumn;
}

// Render Events
function renderEvents() {
    events.forEach(event => {
        const dayColumn = document.querySelectorAll('.day-column')[event.day];
        if (!dayColumn) return;
        
        const eventElement = createEventElement(event);
        
        // Position event
        const startRow = event.startTime - 7; // 7 is the first hour
        const topPosition = 60 + (startRow * 80); // 60px header + row height
        const height = event.duration * 80;
        
        eventElement.style.top = `${topPosition}px`;
        eventElement.style.height = `${height - 8}px`;
        
        dayColumn.appendChild(eventElement);
    });
}

// Create Event Element
function createEventElement(event) {
    const eventDiv = document.createElement('div');
    eventDiv.className = `event ${event.color}`;
    eventDiv.dataset.id = event.id;
    
    const lines = event.title.split('\n');
    let html = '';
    
    lines.forEach((line, index) => {
        if (index === 0) {
            html += `<div class="event-time">${line}</div>`;
        } else {
            html += `<div class="event-title">${line}</div>`;
        }
    });
    
    eventDiv.innerHTML = html;
    
    // Add click event
    eventDiv.addEventListener('click', () => {
        showEventDetails(event);
    });
    
    return eventDiv;
}

// Show Event Details
function showEventDetails(event) {
    alert(`Événement: ${event.title.replace(/\n/g, ' ')}\nCouleur: ${event.color}`);
}

// Get Start of Week (Monday)
function getStartOfWeek(date) {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
    return new Date(d.setDate(diff));
}

// Format Date Header
function formatDateHeader(date) {
    return `${date.getDate()} ${monthNames[date.getMonth()]} ${date.getFullYear()}`;
}

// Setup Event Listeners
function setupEventListeners() {
    // Previous Week
    document.getElementById('prevWeek').addEventListener('click', () => {
        currentDate.setDate(currentDate.getDate() - 7);
        renderCalendar();
    });
    
    // Next Week
    document.getElementById('nextWeek').addEventListener('click', () => {
        currentDate.setDate(currentDate.getDate() + 7);
        renderCalendar();
    });
    
    // Today Button
    const todayBtn = document.querySelector('button.bg-teal-500.text-white');
    if (todayBtn) {
        todayBtn.addEventListener('click', () => {
            currentDate = new Date();
            renderCalendar();
        });
    }
    
    // View Mode Buttons
    const viewButtons = document.querySelectorAll('.flex.gap-2 button');
    viewButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            viewButtons.forEach(b => {
                b.classList.remove('bg-teal-500', 'text-white');
                b.classList.add('border', 'border-gray-300');
            });
            this.classList.add('bg-teal-500', 'text-white');
            this.classList.remove('border', 'border-gray-300');
        });
    });
    
    // Sidebar Navigation
    const sidebarItems = document.querySelectorAll('aside > div');
    sidebarItems.forEach(item => {
        item.addEventListener('click', function() {
            sidebarItems.forEach(i => {
                i.classList.remove('bg-teal-50');
                i.querySelector('span').classList.remove('text-teal-600', 'font-semibold');
                i.querySelector('span').classList.add('text-gray-600');
            });
            this.classList.add('bg-teal-50', 'py-3', 'px-4', 'rounded-lg');
            this.querySelector('span').classList.add('text-teal-600', 'font-semibold');
            this.querySelector('span').classList.remove('text-gray-600');
        });
    });
    
    // Floating Action Button
    const fab = document.querySelector('.fixed.bottom-8');
    if (fab) {
        fab.addEventListener('click', () => {
            alert('Ajouter un nouvel événement');
        });
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', initCalendar);