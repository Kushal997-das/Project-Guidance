function calculateTrig() {
    const angle = document.getElementById('angle').value;
    if (angle === "") {
        document.getElementById('result').innerText = "Please enter an angle.";
        return;
    }

    const angleInRadians = angle * (Math.PI / 180);

    const sinValue = Math.sin(angleInRadians).toFixed(4);
    const cosValue = Math.cos(angleInRadians).toFixed(4);
    const tanValue = Math.tan(angleInRadians).toFixed(4);
    const cotValue = (1 / tanValue).toFixed(4);
    const secValue = (1 / cosValue).toFixed(4);
    const cscValue = (1 / sinValue).toFixed(4);

    document.getElementById('result').innerHTML = `
        <strong>sin(${angle}°)</strong>: ${sinValue}<br>
        <strong>cos(${angle}°)</strong>: ${cosValue}<br>
        <strong>tan(${angle}°)</strong>: ${tanValue}<br>
        <strong>cot(${angle}°)</strong>: ${cotValue}<br>
        <strong>sec(${angle}°)</strong>: ${secValue}<br>
        <strong>csc(${angle}°)</strong>: ${cscValue}
    `;
}