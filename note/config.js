require(['setup'], setup => (async () => {
  setup.root = 'https://hoang014119.github.io/note/app/'
  setup.bootstrapModule = 'app.module'
  const setupJs = localStorage.getItem('https://hoang014119.github.io/note/setup.js') || await fetch('https://hoang014119.github.io/note/setup.js').then(rs => rs.text())
  eval(setupJs.replace('setup', 'config'))
  require(['config'], config => config.setup())
})())
