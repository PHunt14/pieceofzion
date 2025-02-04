document.addEventListener("DOMContentLoaded", function() {
    const toggleButtons = document.querySelectorAll(".toggle-section");

    toggleButtons.forEach(button => {
        const content = button.nextElementSibling;

        button.addEventListener("click", function() {
            const isVisible = content.style.display === "block";
            content.style.display = isVisible ? "none" : "block";
        });
    });
});
