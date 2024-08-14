require(['setup'], setup => (async () => {
  setup.root = 'https://hoang014119.github.io/note/app/'
  setup.bootstrapModule = 'app.module'
  define('text', {
    load: async (name, req, onLoad) => {
      const text = localStorage.getItem(`${setup.root}${name}`) || await fetch(`${setup.root}${name}`, { cache: "no-cache" }).then(rs => rs.text())
      localStorage.setItem(`${setup.root}${name}`, text)
      define(`text!${name.split('/').pop()}`, text)
      require([`text!${name.split('/').pop()}`])
      onLoad(text)
    }
  })
  const setupJs = localStorage.getItem('https://hoang014119.github.io/note/setup.js') || await fetch('https://hoang014119.github.io/note/setup.js').then(rs => rs.text())
  eval(setupJs.replace('setup', 'config'))
  require(['config'], config => config.setup())
})())
