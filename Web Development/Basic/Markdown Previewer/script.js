document.addEventListener('DOMContentLoaded', function() {
  const markdownInput = document.getElementById('markdown-input');
  const preview = document.getElementById('preview');
  marked.setOptions({
    gfm: true,
    breaks: false 
  });

  function preprocessMarkdown(input) {
    return input.replace(/(^|\n)(#+)([^\s#])/g, '$1$2 $3');
  }

  function updatePreview() {
    const inputText = markdownInput.value;

    const preprocessedText = preprocessMarkdown(inputText);

    let html = marked.parse(preprocessedText);
    const sanitizedHtml = DOMPurify.sanitize(html);

    preview.innerHTML = sanitizedHtml;
  }

  markdownInput.addEventListener('input', updatePreview);
  updatePreview();
});
