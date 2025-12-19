// =============================================
// TASKS PAGE - JavaScript
// =============================================

class TasksPage {
  constructor() {
    this.taskList = document.getElementById('taskList');
    this.progressBar = document.querySelector('.progress-bar__fill');
    this.progressLabel = document.querySelector('.progress-bar__label');
    this.badgeCount = document.getElementById('badgeCount');
    
    this.init();
  }

  init() {
    this.setupFilters();
    this.setupTaskCheckboxes();
    this.setupActionButtons();
    this.updateProgress();
  }

  // ==========================================
  // FILTERS
  // ==========================================
  setupFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('filter-btn--active'));
        
        // Add active class to clicked button
        e.currentTarget.classList.add('filter-btn--active');
        
        // Get filter type
        const filter = e.currentTarget.dataset.filter;
        this.filterTasks(filter);
      });
    });
  }

  filterTasks(filter) {
    const tasks = document.querySelectorAll('.task-card');
    
    tasks.forEach(task => {
      const status = task.dataset.status;
      
      switch(filter) {
        case 'all':
          task.style.display = 'block';
          break;
        case 'in-progress':
          task.style.display = status === 'in-progress' ? 'block' : 'none';
          break;
        case 'completed':
          task.style.display = status === 'completed' ? 'block' : 'none';
          break;
        case 'late':
          task.style.display = status === 'late' ? 'block' : 'none';
          break;
      }
    });

    this.updateFilterCounts();
  }

  updateFilterCounts() {
    const tasks = document.querySelectorAll('.task-card');
    const visibleTasks = Array.from(tasks).filter(task => task.style.display !== 'none');
    
    const counts = {
      all: tasks.length,
      'in-progress': Array.from(tasks).filter(t => t.dataset.status === 'in-progress').length,
      completed: Array.from(tasks).filter(t => t.dataset.status === 'completed').length,
      late: Array.from(tasks).filter(t => t.dataset.status === 'late').length
    };

    // Update button labels
    document.querySelectorAll('.filter-btn').forEach(btn => {
      const filter = btn.dataset.filter;
      const text = btn.textContent.split('(')[0].trim();
      btn.textContent = `${text} (${counts[filter]})`;
    });
  }

  // ==========================================
  // TASK CHECKBOXES
  // ==========================================
  setupTaskCheckboxes() {
    const checkboxes = document.querySelectorAll('.task-card__checkbox');
    
    checkboxes.forEach(checkbox => {
      checkbox.addEventListener('change', (e) => {
        const taskCard = e.target.closest('.task-card');
        
        if (e.target.checked) {
          taskCard.dataset.status = 'completed';
          this.incrementBadges();
        } else {
          taskCard.dataset.status = 'in-progress';
        }
        
        this.updateProgress();
        this.updateFilterCounts();
      });
    });
  }

  // ==========================================
  // PROGRESS BAR
  // ==========================================
  updateProgress() {
    const checkboxes = document.querySelectorAll('.task-card__checkbox');
    const checkedCount = document.querySelectorAll('.task-card__checkbox:checked').length;
    const totalCount = checkboxes.length;
    const percentage = totalCount > 0 ? Math.round((checkedCount / totalCount) * 100) : 0;
    
    if (this.progressBar && this.progressLabel) {
      this.progressBar.style.width = `${percentage}%`;
      this.progressLabel.textContent = `${percentage}%`;
    }
  }

  // ==========================================
  // BADGES
  // ==========================================
  incrementBadges() {
    if (this.badgeCount) {
      const currentCount = parseInt(this.badgeCount.textContent);
      this.badgeCount.textContent = currentCount + 1;
      
      // Animation
      this.badgeCount.style.transform = 'scale(1.2)';
      setTimeout(() => {
        this.badgeCount.style.transform = 'scale(1)';
      }, 300);
    }
  }

  // ==========================================
  // ACTION BUTTONS (Edit & Delete)
  // ==========================================
  setupActionButtons() {
    // Edit buttons
    const editButtons = document.querySelectorAll('.action-btn--edit');
    editButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        const taskCard = e.target.closest('.task-card');
        const taskTitle = taskCard.querySelector('.task-card__title').textContent.trim();
        this.editTask(taskCard, taskTitle);
      });
    });

    // Delete buttons
    const deleteButtons = document.querySelectorAll('.action-btn--delete');
    deleteButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        const taskCard = e.target.closest('.task-card');
        const taskTitle = taskCard.querySelector('.task-card__title').textContent.trim();
        this.deleteTask(taskCard, taskTitle);
      });
    });

    // Add task button
    const addTaskBtn = document.getElementById('addTaskBtn');
    if (addTaskBtn) {
      addTaskBtn.addEventListener('click', () => {
        this.addTask();
      });
    }
  }

  editTask(taskCard, taskTitle) {
    const newTitle = prompt('Modifier la tâche:', taskTitle);
    
    if (newTitle && newTitle.trim() !== '') {
      taskCard.querySelector('.task-card__title').textContent = newTitle;
      
      // Show success message
      this.showNotification('Tâche modifiée avec succès', 'success');
    }
  }

  deleteTask(taskCard, taskTitle) {
    if (confirm(`Êtes-vous sûr de vouloir supprimer la tâche:\n"${taskTitle}" ?`)) {
      // Animate removal
      taskCard.style.transition = 'all 0.3s ease';
      taskCard.style.opacity = '0';
      taskCard.style.transform = 'translateX(-20px)';
      
      setTimeout(() => {
        taskCard.remove();
        this.updateProgress();
        this.updateFilterCounts();
        this.showNotification('Tâche supprimée', 'info');
      }, 300);
    }
  }

  addTask() {
    const taskTitle = prompt('Entrez le titre de la nouvelle tâche:');
    
    if (taskTitle && taskTitle.trim() !== '') {
      const taskId = Date.now();
      const taskHTML = this.createTaskHTML(taskId, taskTitle.trim());
      
      // Add to task list
      this.taskList.insertAdjacentHTML('afterbegin', taskHTML);
      
      // Re-initialize event listeners for the new task
      this.setupTaskCheckboxes();
      this.setupActionButtons();
      this.updateProgress();
      this.updateFilterCounts();
      
      // Show success message
      this.showNotification('Nouvelle tâche ajoutée', 'success');
      
      // Animate new task
      const newTask = this.taskList.firstElementChild;
      newTask.style.opacity = '0';
      newTask.style.transform = 'translateY(-10px)';
      
      setTimeout(() => {
        newTask.style.transition = 'all 0.3s ease';
        newTask.style.opacity = '1';
        newTask.style.transform = 'translateY(0)';
      }, 10);
    }
  }

  createTaskHTML(id, title) {
    const today = new Date();
    const dateStr = today.toLocaleDateString('fr-FR', { 
      day: '2-digit', 
      month: 'short', 
      year: 'numeric' 
    });

    return `
      <article class="task-card" data-status="in-progress">
        <div class="task-card__content">
          <input type="checkbox" class="task-card__checkbox" id="task${id}">
          
          <div class="task-card__info">
            <label for="task${id}" class="task-card__title">
              ${title}
            </label>
            <span class="badge badge--math">Mathématique</span>
          </div>
          
          <div class="task-card__date">
            <i class="far fa-calendar-alt"></i>
            <span>Date ${dateStr}</span>
          </div>
          
          <div class="task-card__actions">
            <button class="action-btn action-btn--edit" aria-label="Éditer" data-task-id="${id}">
              <i class="fas fa-pen"></i>
            </button>
            <button class="action-btn action-btn--delete" aria-label="Supprimer" data-task-id="${id}">
              <i class="fas fa-trash"></i>
            </button>
          </div>
        </div>
      </article>
    `;
  }

  // ==========================================
  // NOTIFICATIONS
  // ==========================================
  showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed;
      top: 90px;
      right: 20px;
      background: ${type === 'success' ? '#4caf50' : type === 'error' ? '#f44336' : '#2196f3'};
      color: white;
      padding: 16px 24px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      z-index: 10000;
      animation: slideIn 0.3s ease;
    `;

    document.body.appendChild(notification);

    // Remove after 3 seconds
    setTimeout(() => {
      notification.style.animation = 'slideOut 0.3s ease';
      setTimeout(() => {
        notification.remove();
      }, 300);
    }, 3000);
  }
}

// ==========================================
// INITIALIZE
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  if (document.querySelector('.task-list')) {
    new TasksPage();
    console.log('Tasks Page initialized');
  }
});

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(400px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOut {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(400px);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);