document.body.addEventListener('htmx:afterRequest', function(event) {
    if (event.detail.elt.getAttribute('hx-target') === '#code-display') {
        const codeDisplay = document.getElementById('code-display');
        codeDisplay.innerHTML = event.detail.xhr.responseText;
        codeDisplay.classList.add('show');
        
        // Apply syntax highlighting
        codeDisplay.querySelectorAll('pre code').forEach((block) => {
            hljs.highlightElement(block);
        });
    }
});

function copyCode() {
    const codeDisplay = document.getElementById('code-display');
    navigator.clipboard.writeText(codeDisplay.textContent).then(() => {
        const copyButton = document.getElementById('copy-button');
        const originalIcon = copyButton.innerHTML;
        copyButton.innerHTML = '<i class="fas fa-check"></i>';
        setTimeout(() => {
            copyButton.innerHTML = originalIcon;
        }, 2000);
    });
}
