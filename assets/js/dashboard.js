/**
 * LinguaBridge - Dashboard Logic
 * Handles tab switching and session-specific states for the Portal (dashboard.html).
 */

document.addEventListener('DOMContentLoaded', () => {

    /**
     * Tab Switching Manager
     * Toggles visibility between different dashboard sections (Overview, Profile, etc.).
     */
    const tabs = document.querySelectorAll('.sidebar-link[data-tab]');
    const sections = document.querySelectorAll('.dashboard-section');

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

            // On mobile, close sidebar after selection
            const sidebar = document.querySelector('.sidebar');
            if (sidebar) {
                sidebar.classList.remove('mobile-open');
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
