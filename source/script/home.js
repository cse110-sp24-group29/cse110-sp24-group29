// home.js

// Hides Big-Add-Button after it has been clicked
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('big-add-button').addEventListener('click', function() {
        // Hide the big-add-button
        this.style.display = 'none';

        // Show the small-add-button
        document.getElementById('small-add-button').style.display = 'inline-block';
    });
});