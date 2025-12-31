// High-level logic for Random Color Generator
class ColorGenerator {
    constructor() {
        this.button = document.querySelector("button");
        this.title = document.querySelector("h1");
        this.colorDisplay = document.getElementById("colorDisplay");
        this.colorValueInput = document.getElementById("colorValue");
        this.init();
    }

    init() {
        this.button.addEventListener("click", () => this.generateAndDisplayColor());
        // Generate initial color on load
        this.generateAndDisplayColor();
    }

    generateAndDisplayColor() {
        const color = this.generateRandomColor();
        this.updateUI(color);
    }

    generateRandomColor() {
        const red = Math.floor(Math.random() * 256);
        const green = Math.floor(Math.random() * 256);
        const blue = Math.floor(Math.random() * 256);
        return { red, green, blue };
    }

    rgbToHex(r, g, b) {
        return "#" + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('');
    }

    isLightColor(r, g, b) {
        // Simple luminance calculation
        const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
        return luminance > 0.5;
    }

    updateUI({ red, green, blue }) {
        const rgbString = `rgb(${red}, ${green}, ${blue})`;
        const hexString = this.rgbToHex(red, green, blue);

        this.title.textContent = rgbString;
        this.colorDisplay.style.backgroundColor = rgbString;
        this.colorValueInput.value = hexString;

        // Adjust text color for readability
        if (this.isLightColor(red, green, blue)) {
            this.colorDisplay.classList.remove('light-text');
            this.colorDisplay.classList.add('dark-text');
        } else {
            this.colorDisplay.classList.remove('dark-text');
            this.colorDisplay.classList.add('light-text');
        }

        this.button.style.borderColor = rgbString;
    }
}

// Initialize the app
new ColorGenerator();