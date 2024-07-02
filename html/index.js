var prefix = "html__"
var subfix_html = '_htmlVal'
var subfix_js = '_jsVal'
var href = location.href.replace(/\?.*/, '')
var params = new URLSearchParams(location.search.replace("?", ""))
var delete_name = params.get('delete')
if (delete_name) {
  localStorage.removeItem(prefix + delete_name + subfix_html)
  localStorage.removeItem(prefix + delete_name + subfix_js)
  location = href + '?data=' + 'default'
}
var data_name = params.get("data") || 'default'
var $ = document.querySelector.bind(document);
function showIframe() {
  var htmlVal = html.getValue();
  var jsVal = js.getValue();
  (window.WebPortal || localStorage).setItem(prefix + data_name + subfix_html, htmlVal);
  (window.WebPortal || localStorage).setItem(prefix + data_name + subfix_js, jsVal);
  $("#iframe").src = "data:text/html;charset=utf-8," + escape(htmlVal + "<script>" + jsVal + "</" + "script>");
  window.on_save && window.on_save({ htmlVal, jsVal })
}

require.config({
  baseUrl: "https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.23.0/min/"
});
require(["vs/editor/editor.main"], function() {
  $('#data').innerHTML = ['default'].concat(Array.from(Array(localStorage.length), (x, i) => localStorage.key(i))
    .filter(key => key.startsWith(prefix) && key.endsWith(subfix_js))
    .map(key => key.replace(prefix, "").replace(subfix_js, ""))
    .filter(name => name != 'default'))
    .map(name => '<a href="' + href + '?data=' + name + '" style="padding: 3px' + (name == data_name ? '; background: green; color: white' : '') + '">' + name + '</a>').join(" | ")
  const saved = window.load_save && window.load_save()
  window.html = monaco.editor.create($("#html"), {
    model: monaco.editor.createModel(saved ? saved.htmlVal : (window.WebPortal || localStorage).getItem(prefix + data_name + subfix_html), "html"),
    theme: "vs-dark",
    automaticLayout: true
  });
  html.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_S, showIframe);
  window.js = monaco.editor.create($("#js"), {
    model: monaco.editor.createModel(saved ? saved.jsVal : (window.WebPortal || localStorage).getItem(prefix + data_name + "_jsVal"), "javascript"),
    theme: "vs-dark",
    automaticLayout: true
  });
  js.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_S, showIframe);
});
