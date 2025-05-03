document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const animatedElement = document.getElementById('animated-element');
    const bounceCheckbox = document.getElementById('bounce-animation');
    const rotateCheckbox = document.getElementById('rotate-animation');
    const bgColorPicker = document.getElementById('bg-color');
    const saveBtn = document.getElementById('save-btn');
    const resetBtn = document.getElementById('reset-btn');
    const triggerBtn = document.getElementById('trigger-btn');
    const body = document.body;

    // Load saved preferences
    loadPreferences();

    // Save preferences to localStorage
    saveBtn.addEventListener('click', function() {
        const preferences = {
            bounce: bounceCheckbox.checked,
            rotate: rotateCheckbox.checked,
            bgColor: bgColorPicker.value
        };
        
        localStorage.setItem('animationPreferences', JSON.stringify(preferences));
        applyPreferences(preferences);
        alert('Preferences saved!');
    });

    // Reset preferences
    resetBtn.addEventListener('click', function() {
        localStorage.removeItem('animationPreferences');
        bounceCheckbox.checked = false;
        rotateCheckbox.checked = false;
        bgColorPicker.value = '#ffffff';
        applyPreferences({ bounce: false, rotate: false, bgColor: '#ffffff' });
        alert('Preferences reset!');
    });

    // Trigger pulse animation
    triggerBtn.addEventListener('click', function() {
        // Remove any existing pulse animation class
        animatedElement.classList.remove('pulse-animation');
        
        // Trigger reflow to restart animation
        void animatedElement.offsetWidth;
        
        // Add the pulse animation class
        animatedElement.classList.add('pulse-animation');
    });

    // Load preferences from localStorage
    function loadPreferences() {
        const savedPreferences = localStorage.getItem('animationPreferences');
        if (savedPreferences) {
            const preferences = JSON.parse(savedPreferences);
            bounceCheckbox.checked = preferences.bounce;
            rotateCheckbox.checked = preferences.rotate;
            bgColorPicker.value = preferences.bgColor || '#ffffff';
            applyPreferences(preferences);
        }
    }

    // Apply the preferences to the page
    function applyPreferences(preferences) {
        // Apply animations
        if (preferences.bounce) {
            animatedElement.classList.add('bounce-animation');
        } else {
            animatedElement.classList.remove('bounce-animation');
        }
        
        if (preferences.rotate) {
            animatedElement.classList.add('rotate-animation');
        } else {
            animatedElement.classList.remove('rotate-animation');
        }
        
        // Apply background color
        body.style.backgroundColor = preferences.bgColor;
    }
});