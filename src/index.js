// Ensure a #root element exists and then load the app's main module
if (typeof document !== 'undefined') {
  if (!document.getElementById('root')) {
    // Create basic HTML structure if body is empty
    if (!document.body) {
      document.write('<body></body>');
    }
    const root = document.createElement('div');
    root.id = 'root';
    document.body.appendChild(root);
  }
  // Import the app entry
  import('./main.js');
}
