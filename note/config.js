require(['setup'], setup => (async () => {
  const { get } = setup
  setup.root = 'https://hoang014119.github.io/note/app/'
  setup.bootstrapModule = 'app.module'
  define('text', {
    load: async (name, req, onLoad) => {
      const url = `${setup.root}${name}`
      const text = localStorage.getItem(url) || localStorage.setItem(url, await get(url)) || localStorage.getItem(url)
      define(`text!${name.split('/').pop()}`, text)
      require([`text!${name.split('/').pop()}`])
      onLoad(text)
    }
  })
  const url = 'https://hoang014119.github.io/note/setup.js'
  const setupJs = localStorage.getItem(url) || localStorage.setItem(url, await get(url)) || localStorage.getItem(url)
  eval(setupJs.replace('setup', 'config'))
  require(['config'], config => config.setup())
})())
