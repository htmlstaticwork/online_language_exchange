/**
 * LinguaBridge - Dashboard Logic
 * Handles tab switching and session-specific states for the Dashboard (dashboard.html).
 */

document.addEventListener('DOMContentLoaded', () => {

    /**
     * Tab Switching Manager
     * Toggles visibility between different dashboard sections (Overview, Profile, etc.).
     */
    const tabs = document.querySelectorAll('.sidebar-link[data-tab]');
    const sections = document.querySelectorAll('.dashboard-section');

    /**
     * Sidebar Mobile Toggle
     */
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const wrapper = document.querySelector('.dashboard-wrapper');
    const sidebar = document.querySelector('.sidebar');
    
    if (sidebarToggle && wrapper && sidebar) {
        sidebarToggle.addEventListener('click', () => {
            wrapper.classList.toggle('sidebar-open');
            sidebar.classList.toggle('mobile-open');
            
            // Update icon based on state
            const icon = sidebarToggle.querySelector('i');
            if (sidebar.classList.contains('mobile-open')) {
                icon.classList.remove('bi-list');
                icon.classList.add('bi-x-lg');
            } else {
                icon.classList.remove('bi-x-lg');
                icon.classList.add('bi-list');
            }
        });
    }

    tabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = tab.getAttribute('data-tab');

            // Toggle active state on tabs
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // Toggle active state on sections
            sections.forEach(section => {
                section.classList.remove('active');
                if (section.id === targetId) {
                    section.classList.add('active');
                }
            });

            // On mobile, close sidebar after selection and reset icon
            if (wrapper && sidebar) {
                wrapper.classList.remove('sidebar-open');
                sidebar.classList.remove('mobile-open');
                const icon = sidebarToggle.querySelector('i');
                if (icon) {
                    icon.classList.remove('bi-x-lg');
                    icon.classList.add('bi-list');
                }
            }
        });
    });

    /**
     * Session Join Logic
     * Simulates entering a live session.
     */
    const joinBtn = document.querySelector('.btn-primary[data-action="join"]');
    if (joinBtn) {
        joinBtn.addEventListener('click', () => {
            alert('Connecting to global classroom... Please wait.');
        });
    }

});
