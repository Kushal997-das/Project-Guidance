
document.addEventListener('DOMContentLoaded', function() {
  const markdownInput = document.getElementById('markdown-input');
  const preview = document.getElementById('preview');

  function updatePreview() {
    // Sanitize and render markdown
    const sanitizedHtml = DOMPurify.sanitize(marked.parse(markdownInput.value));
    preview.innerHTML = sanitizedHtml;
  }

  markdownInput.addEventListener('input', updatePreview);
});
