document.addEventListener('DOMContentLoaded', function() {
    const menuButtons = document.querySelectorAll('.menu-nav-btn');
    const menuSections = document.querySelectorAll('.menu-section');

    menuButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            menuButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const menuType = button.getAttribute('data-menu');

            // Hide all menu sections
            menuSections.forEach(section => {
                section.style.display = 'none';
            });

            // Show selected menu section
            document.querySelector(`.menu-section[data-menu="${menuType}"]`).style.display = 'block';
        });
    });
}); 