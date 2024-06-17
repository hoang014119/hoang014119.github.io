const div = document.createElement('div');
div.style = 'display: flex; resize: both; overflow: auto; position: fixed; top: 0; left: 0; z-index: 99999';
const iframe = document.createElement('iframe');
iframe.style = 'flex: 1';
iframe.src = location.origin;
div.prepend(iframe);
document.body.prepend(div);
setTimeout(async () => {
  iframe.contentDocument.head.innerHTML = '';
  iframe.contentDocument.body.innerHTML = '';
  setTimeout(async () => {
    iframe.contentDocument.head.innerHTML = '';
    iframe.contentDocument.body.innerHTML = '';
    iframe.contentWindow.on_save = (jsVal, log, contentEval) => {
      try {
        eval(jsVal);
      } catch (ex) {
        log(ex);
      }
    };
    const debugText = await fetch('https://minhhoang014119.github.io/debug/debug.html').then(rs => rs.text());
    iframe.contentDocument.head.innerHTML = '';
    iframe.contentDocument.body.innerHTML = '';
    iframe.contentDocument.body.innerHTML = debugText;
    iframe.contentDocument.querySelectorAll('script').forEach(node => {
      const script = iframe.contentDocument.createElement('script');
      if (node.src) {
        script.src = node.src;
      } else {
        script.innerHTML = node.innerHTML;
      }
      iframe.contentDocument.body.append(script);
    });
  }, 2000);
}, 2000);
