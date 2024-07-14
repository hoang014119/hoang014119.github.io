text => Babel.transform(text.split("\n").slice(1).join("\n"), { sourceMap: 'inline', sourceFileName: 'app/main.js' }).code
async ({ AngularCore, AngularRouter, AngularPlatformBrowser, AngularPlatformBrowserDynamic, AngularForms }) => {
  const { Component, ɵɵdirectiveInject } = AngularCore
  const tsconfig = await fetch('tsconfig.json').then(rs => rs.json())
  const paths = Object.keys(tsconfig.compilerOptions.paths).reduce((paths, path) => {
    paths[path.replace('*', '')] = path.replace('@', '').replace('*', '')
    return paths
  }, {})
  const builtin_define = define
  window.define = (name, deps, callback) => {
    const new_deps = typeof name !== 'string' ? name : deps
    new_deps.forEach && new_deps.forEach((name, i) => {
      Object.entries(paths).some(([path, value]) => {
        if (name.startsWith(path)) {
          new_deps[i] = name.replace(path, 'es6!' + value)
          return true
        }
      })
      if (name.startsWith('./')) {
        new_deps[i] = 'es6!' + name
      }
    })
    return builtin_define(name, deps, callback)
  }
  define('@angular/core', {
    ...AngularCore,
    Component: ({ templateUrl, ...args }) => component => Component({
      ...(templateUrl && { template: require(`text!${templateUrl.split('/').pop()}`), } || {}),
      ...args
    })(component),
    Inject: name => () => ({
      initializer: () => ɵɵdirectiveInject(name)
    }),
  })
  define('@angular/router', AngularRouter)
  define('@angular/platform-browser', AngularPlatformBrowser)
  define('@angular/platform-browser-dynamic', AngularPlatformBrowserDynamic)
  define('@angular/forms', () => AngularForms)
  require(['@angular/core', '@angular/router', '@angular/platform-browser', '@angular/platform-browser-dynamic', '@angular/forms'])
  define('text', {
    load: async (name, req, onLoad) => {
      const text = await (fetch(`app/${name}`).then(rs => rs.text()))
      define(`text!${name.split('/').pop()}`, text)
      require([`text!${name.split('/').pop()}`])
      onLoad(text)
    }
  })
  define('es6', {
    load: async (name, req, onLoad) => {
      const code =
        Babel.transform(
          await (fetch(`app/${name}.ts`).then(rs => rs.text())),
          {
            sourceMap: 'inline',
            sourceFileName: `app/${name}.ts`,
            plugins: [
              'transform-modules-amd',
              'transform-typescript',
              ['proposal-decorators', { "version": "legacy" }],
              'transform-class-properties'
            ],
          }
        ).code
      new RegExp(`templateUrl:.+${name.split('/').pop()}.html`).test(code) && await new Promise(
        res => require([`text!${name}.html`], res)
      )
      onLoad.fromText(code)
    }
  })
  return new Promise(res => require(['es6!AppModule'], AppModule => res(AppModule.default)))
}
