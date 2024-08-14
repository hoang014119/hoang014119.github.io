require(['setup'], setup => (async () => {
  const { cache } = setup
  setup.root = 'https://hoang014119.github.io/note/app/'
  setup.bootstrapModule = 'app.module'
  define('text', {
    load: async (name, req, onLoad) => {
      const text = await cache(`${setup.root}${name}`)
      define(`text!${name.split('/').pop()}`, text)
      require([`text!${name.split('/').pop()}`])
      onLoad(text)
    }
  })
  const setupJs = await cache('https://hoang014119.github.io/note/setup.js')
  eval(setupJs.replace('setup', 'config'))
  require(['config'], config => config.setup())
})())
