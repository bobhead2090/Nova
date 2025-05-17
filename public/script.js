const iframeWindow = document.getElementById('iframeWindow');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const erudaBtn = document.getElementById('erudaBtn');
const urlBar = document.getElementById('urlBar');
const backBtn = document.getElementById('back');
const forwardBtn = document.getElementById('forward');

let historyStack = [];
let historyIndex = -1;

function encodeUrl(url) {
  if(!window.__uv$config) return url;
  return window.__uv$config.prefix + window.__uv$config.encodeUrl(url);
}

function navigateTo(url) {
  if (!url) return;
  iframeWindow.src = encodeUrl(url);
  urlBar.value = url;
  if(historyIndex === -1 || historyStack[historyIndex] !== url) {
    historyStack = historyStack.slice(0, historyIndex+1);
    historyStack.push(url);
    historyIndex++;
  }
  updateButtons();
  searchInput.classList.add('hidden');
  searchBtn.classList.add('hidden');
  erudaBtn.classList.remove('hidden');
}

function updateButtons() {
  backBtn.disabled = historyIndex <= 0;
  forwardBtn.disabled = historyIndex >= historyStack.length -1;
}

backBtn.onclick = () => {
  if(historyIndex > 0) {
    historyIndex--;
    const url = historyStack[historyIndex];
    iframeWindow.src = encodeUrl(url);
    urlBar.value = url;
    updateButtons();
  }
};

forwardBtn.onclick = () => {
  if(historyIndex < historyStack.length -1) {
    historyIndex++;
    const url = historyStack[historyIndex];
    iframeWindow.src = encodeUrl(url);
    urlBar.value = url;
    updateButtons();
  }
};

urlBar.addEventListener('keydown', (e) => {
  if(e.key === 'Enter') {
    let url = urlBar.value.trim();
    if (!url) return;
    if(!url.includes('.') && !url.startsWith('http')) {
      url = 'https://www.google.com/search?q=' + encodeURIComponent(url);
    } else if(!url.startsWith('http://') && !url.startsWith('https://')) {
      url = 'https://' + url;
    }
    navigateTo(url);
  }
});

searchBtn.onclick = () => {
  let val = searchInput.value.trim();
  if(!val) return;
  if(!val.includes('.') && !val.startsWith('http')) {
    val = 'https://www.google.com/search?q=' + encodeURIComponent(val);
  } else if(!val.startsWith('http://') && !val.startsWith('https://')) {
    val = 'https://' + val;
  }
  navigateTo(val);
};

erudaBtn.onclick = () => {
  iframeWindow.contentWindow.eval(`
    (function(){
      if(window.eruda) {eruda.show(); return;}
      var script = document.createElement('script');
      script.src = "https://cdn.jsdelivr.net/npm/eruda";
      script.onload = function() { eruda.init(); eruda.show(); };
      document.body.appendChild(script);
    })();
  `);
};

// Initially hide eruda button
erudaBtn.classList.add('hidden');
updateButtons();
