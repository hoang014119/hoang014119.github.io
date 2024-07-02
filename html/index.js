var data_name = new URLSearchParams(location.search.replace("?", "")).get("data") || 'default'
var prefix = "html__"
var $ = document.querySelector.bind(document);
function showIframe() {
  var htmlVal = html.getValue();
  var jsVal = js.getValue();
  (window.WebPortal || localStorage).setItem(prefix + data_name + "_htmlVal", htmlVal);
  (window.WebPortal || localStorage).setItem(prefix + data_name + "_jsVal", jsVal);
  $("#iframe").src = "data:text/html;charset=utf-8," + escape(htmlVal + "<script>" + jsVal + "</" + "script>");
  window.on_save && window.on_save({ htmlVal, jsVal })
}

require.config({
  baseUrl: "https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.23.0/min/"
});
require(["vs/editor/editor.main"], function() {
  var href = location.href.replace(/\?.*/, '')
  $('#data').innerHTML = ['default'].concat(Array.from(Array(localStorage.length), (x, i) => localStorage.key(i))
    .filter(key => key.startsWith(prefix) && key.endsWith("_jsVal"))
    .map(key => key.replace(prefix, "").replace("_jsVal", ""))
    .filter(name => name != 'default'))
    .map(name => '<a href="' + href + '?data=' + name + '" style="padding: 3px' + (name == data_name ? '; background: green; color: white' : '') + '">' + name + '</a>').join(" | ")
  const saved = window.load_save && window.load_save()
  window.html = monaco.editor.create($("#html"), {
    model: monaco.editor.createModel(saved ? saved.htmlVal : (window.WebPortal || localStorage).getItem(prefix + data_name + "_htmlVal"), "html"),
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
