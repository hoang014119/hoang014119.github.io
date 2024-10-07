// 4

!require.defined("paths") && require.config({
  paths: {
    "crypto-js": "https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min",
    "babel": "https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.26.0/babel.min",
  }
})
require(["text"], text => Object.assign(text, {
  load: (name, req, onLoad) => text(name, name).then(text =>
    /[\?&]no-cache/.test(name) && (window.WebPortal || localStorage).setItem(name.split("?")[0], text) || onLoad(text)
  ).catch(onLoad.error)
}))
define("cache", {
  load: (name, req, onLoad) => {
    require(["cache!" + name], module => define(name, module))
    require(["text!" + (require.jsExtRegExp.test(name) ? name : require.toUrl(name) + ".js")], onLoad.fromText, onLoad.error)
  }
})
define("index", ["cache!crypto-js"], CryptoJS => {
  const prompt = () => {
    const input = document.createElement("input")
    input.name = "app"
    input.type = "password"
    input.autofocus = true;
    input.onkeydown = event => {
      if (event.key == 'Enter') {
        login(btoa(CryptoJS.AES.decrypt('U2FsdGVkX190fYbmLhbaoOYjci5p4+79aht+4fjGa+G3eQaIqhOFf9KrMvW44Swsmcn9jtlMxJ1/d6jhEgZ6xQ==', input.value).toString(CryptoJS.enc.Utf8)))
        input.remove()
        div.remove()
        button.remove()
      }
    }
    document.body.append(input)
    const token = String(Math.random()).substr(2, 6)
    const div = document.createElement("div")
    div.innerHTML = token
    document.body.append(div)
    const button = document.createElement("button")
    button.innerHTML = 'Clean cache'
    button.onclick = () => {
      localStorage.clear()
      location.reload()
    }
    document.body.append(button)
    const accept = async () => {
      try {
        const cache = await fetch("./accept", { cache: "no-cache" })
          .then(rs => rs.text()).then(content => new Promise((res, rej) => require(["cache!crypto-js"], CryptoJS =>
            res(CryptoJS.AES.decrypt(content, token).toString(CryptoJS.enc.Utf8)),
            rej
          )))
        if (cache) {
          login(cache)
          input.remove()
          div.remove()
          button.remove()
        }
      } catch (er) {
      }
      setTimeout(() => !(window.WebPortal || localStorage).getItem("cache") && accept(), 1000)
    };
    accept()
  }
  var a, b, c
  const login = async cache => {
    try {
      [a, b, c] = [atob(cache), 'https://api.github.com/repos/hoang014119/hoang014119/contents/']

      const [{ transform }, app] = await Promise.all([
        new Promise((res, rej) => require(["cache!babel"], res, rej)),
        !/[\?&]no-cache/.test(window.WebPortal && WebPortal.getItem('index.html_search') || window.location.search) && (window.WebPortal || localStorage).getItem("app.js")
          ? (window.WebPortal || localStorage).getItem("app.js")
          : fetch(b + "app.js", {
            headers: {
              "authorization": "Bearer " + a,
            },
            cache: "no-cache",
          })
            .then(rs => rs.json()).then(json => atob(json.content))
            // DEBUG .then(text => text.replaceAll("//" + " DEBUG ", ""))
            .then(text => !/[\?&]no-cache/.test(window.WebPortal && WebPortal.getItem('index.html_search') || window.location.search) && (window.WebPortal || localStorage).setItem("app.js", text) || text)
      ])

      eval(transform(app, {
        // DEBUG sourceMap: 'inline',
        // DEBUG sourceFileName: 'app.js',
      }).code);
      (window.WebPortal || localStorage).setItem("cache", cache)
    } catch (er) {
      (window.WebPortal || localStorage).clear() || alert("Login failed !") || location.reload()
    }
  }
  const cache = (window.WebPortal || localStorage).getItem("cache")
  if (cache) {
    login(cache)
  } else {
    prompt()
  }
  return {
    get: get => get ? get({ a, b, c }) : { a, b, c }
  }
})
require(["index"])
