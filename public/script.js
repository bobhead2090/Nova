const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('searchInput');
const urlBar = document.getElementById('urlBar');
const iframe = document.getElementById('proxyFrame');
const devToolsBtn = document.getElementById('devToolsBtn');
const searchContainer = document.getElementById('searchContainer');

let historyStack = [];
let currentIndex = -1;

function navigate(url) {
  const encodedUrl = __uv$config.encodeUrl(url);
  iframe.src = __uv$config.prefix + encodedUrl;
  iframe.style.display = 'block';
  searchContainer.style.display = 'none';
  urlBar.value = url;

  // Push to history
  if (currentIndex === historyStack.length - 1) {
    historyStack.push(url);
    currentIndex++;
  }
}

searchBtn.onclick = () => {
  const val = searchInput.value.trim();
  if (!val) return;
  const url = val.startsWith('http') ? val : `https://www.google.com/search?q=${encodeURIComponent(val)}`;
  navigate(url);
};

urlBar.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    navigate(urlBar.value.trim());
  }
});

document.getElementById('backBtn').onclick = () => {
  if (currentIndex > 0) {
    currentIndex--;
    navigate(historyStack[currentIndex]);
  }
};

document.getElementById('forwardBtn').onclick = () => {
  if (currentIndex < historyStack.length - 1) {
    currentIndex++;
    navigate(historyStack[currentIndex]);
  }
};

devToolsBtn.onclick = () => {
  iframe.contentWindow.eval(`
    var script = document.createElement('script');
    script.src = '//cdn.jsdelivr.net/npm/eruda';
    document.body.appendChild(script);
    script.onload = () => eruda.init();
  `);
};
