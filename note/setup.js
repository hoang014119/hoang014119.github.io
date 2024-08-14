define('setup', {
  root: 'https://hoang014119.github.io/note/app/',
  bootstrapModule: 'app.module',
  setup: async () => {
    eval(localStorage.getItem('https://hoang014119.github.io/note/config.js') || await fetch('https://hoang014119.github.io/note/config.js').then(rs => rs.text()))
    require(['config'], config => config.setup())
  }
})