const colourInput = document.getElementById("colour");
const modeSelector = document.getElementById("mode-selector");
const button = document.querySelector(".get-scheme-btn");

button.addEventListener("click", () => {
    const hexvalue = colourInput.value.slice(1);
    const mode = modeSelector.value;

    fetch(`https://www.thecolorapi.com/scheme?hex=${hexvalue}&mode=${mode}&count=5`)
        .then(response => response.json())
        .then(data => {
            const colorContainer = document.getElementById("color-container");

            // Clear out old colors
            colorContainer.innerHTML = "";

            // Loop through colors and create HTML
            data.colors.forEach(color => {
                const hexVal = color.hex.value;
                const colorHtml = `
                    <div class="color-column">
                        <div class="color-block" style="background-color: ${hexVal}"></div>
                        <div class="hex-value">${hexVal}</div>
                    </div>`;
                colorContainer.innerHTML += colorHtml;
            });

            // 1. Grab all the newly created hex-value elements
            const hexElements = document.querySelectorAll('.hex-value');

            // 2. Loop over each one and attach a click listener
            hexElements.forEach(hexEl => {
                hexEl.addEventListener("click", function () {

                    // 3. Get the text inside the div (e.g. "#F55A5A")
                    const textToCopy = this.textContent;

                    // 4. Use the Clipboard API to copy it
                    navigator.clipboard.writeText(textToCopy)
                        .then(() => {
                            alert(`Copied ${textToCopy} to clipboard!`);
                        });
                });
            });
        });
});
