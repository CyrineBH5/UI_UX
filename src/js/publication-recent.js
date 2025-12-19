 (function () {
        const tabButtons = Array.from(document.querySelectorAll('.tabs [data-tab]'))
        const listEl = document.getElementById('publicationsList')

        if (tabButtons.length === 0 || !listEl) return

        let currentTab = 'recents'

        function getCards() {
          return Array.from(listEl.querySelectorAll('.card'))
        }

        function applyFilter() {
          const cards = getCards()
          for (const card of cards) {
            const categories = (card.getAttribute('data-categories') || '')
              .split(/\s+/)
              .filter(Boolean)
            const shouldShow = categories.includes(currentTab)
            card.style.display = shouldShow ? '' : 'none'
          }
        }

        function setActiveTab(tabKey) {
          currentTab = tabKey
          for (const btn of tabButtons) {
            const isActive = btn.dataset.tab === tabKey
            btn.classList.toggle('active', isActive)
            btn.setAttribute('aria-selected', String(isActive))
          }
          applyFilter()
        }

        tabButtons.forEach((btn) => {
          btn.addEventListener('click', () => setActiveTab(btn.dataset.tab))
        })

        // Expose for other scripts (publish form)
        window.dmPublications = {
          setActiveTab,
          applyFilter,
          getCurrentTab: () => currentTab,
        }

        // Initial state
        setActiveTab('recents')
      })()
