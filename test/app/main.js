Babel.transform(text.split("\n").filter((x, i) => i).join("\n"), { sourceMap: 'inline', sourceFileName: 'app.module.js', plugins: ['transform-object-rest-spread'] }).code
new Promise(async res => {
  const { Component } = AngularCore

  const builtin_define = define
  window.define = (name, deps, callback) => {
    const new_deps = typeof name !== 'string' ? name : deps
    new_deps.forEach && new_deps.forEach((name, i) => {
      console.log('name', name)
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
      initializer: () => MainModule.inject(name)
    }),
  })
  define('@angular/router', AngularRouter)
  define('@angular/platform-browser', PlatformBrowser)
  define('@angular/platform-browser-dynamic', PlatformBrowserDynamic)
  define('@angular/forms', () => AngularForms)
  define('es6!main', () => MainModule)
  require(['@angular/core', '@angular/router', '@angular/platform-browser', '@angular/platform-browser-dynamic', '@angular/forms', 'es6!main'])
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
      //      name.endsWith('app.module') && console.log('name', name)
      const dir = `${name}/`.split('/').filter((x, i, ar) => ar.length > 2 && i != ar.length - 2).join('/')
      const code =
        Babel.transform(
          //        Babel7.transform(
          await (fetch(`app/${name}.ts`).then(rs => rs.text())),
          //          {
          //            plugins: [
          //              'transform-modules-amd',
          //              'transform-typescript',
          //              ['proposal-decorators', { "version": "legacy" }]
          //            ],
          //          }
          //        ).code
          //              ,
          {
            //        sourceMap: 'inline',
            //        sourceFileName: `${name}.ts`,
            plugins: [
              'transform-es2015-modules-amd',
              'transform-decorators-legacy',
              'transform-class-properties'
            ],
            //        plugins: ['transform-typescript', ['proposal-decorators', { "version": "legacy" }]],
            resolveModuleSource: importName => {
              if (importName.startsWith('@')) {
                return importName
              }
              return `es6!${dir}${importName}`
            },
          }
        ).code
      //      name.endsWith('header.component') && console.log('header.component', code)
      new RegExp(`templateUrl:.+${name.split('/').pop()}.html`).test(code) && await new Promise(
        res => require([`text!${name}.html`], res)
      )
      //      console.log(name, code)
      onLoad.fromText(code)
    }
  })

  require(['es6!AppModule'], AppModule => {
    //    console.log('AppModule', AppModule.default)
    AppModule.default.__annotations__[0].imports.push(MainModule)
    res(AppModule.default)
  })
})
