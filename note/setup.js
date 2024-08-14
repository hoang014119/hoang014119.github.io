define('setup', {
  root: (root => root ? `${root}/` : '')(document.currentScript && document.currentScript.getAttribute("root")),
  bootstrapModule: document.currentScript && document.currentScript.getAttribute("bootstrapModule"),
  setup: () => require(['@angular/core', 'setup'], (AngularCore, { root, bootstrapModule }) => {
    const { Component, ɵɵdirectiveInject } = AngularCore
    window.import_require = name => new Promise(res => {
      if (name.startsWith('@') && !require.specified(name)) {
        name = 'es6!' + name.substr(1)
      }
      require([name], mod => res(mod))
    })
    const builtin_define = define
    window.define = (name, deps, callback) => {
      const new_deps = typeof name !== 'string' ? name : deps
      new_deps.forEach && new_deps.forEach((name, i) => {
        if (name.startsWith('@') && !require.specified(name)) {
          new_deps[i] = 'es6!' + name.substr(1)
        }
        if (name.startsWith('./')) {
          new_deps[i] = 'es6!' + name
        }
      })
      return builtin_define(name, deps, callback)
    }
    define('text', {
      load: async (name, req, onLoad) => {
        const text = await (fetch(`${root}${name}`).then(rs => rs.text()))
        define(`text!${name.split('/').pop()}`, text)
        require([`text!${name.split('/').pop()}`])
        onLoad(text)
      }
    })
    require.undef('@angular/core')
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
    define('es6', {
      load: async (name, req, onLoad) => {
        var code = await new Promise(res => require([`text!${name}.ts`], res))
        code = code.replace(/([^a-zA-Z0-9_])import\(/g, '$1import_require(')
        code = Babel.transform(code, {
          sourceMap: 'inline',
          sourceFileName: `${root}/${name}.ts`,
          plugins: [
            'transform-modules-amd',
            'transform-typescript',
            ['proposal-decorators', { "version": "legacy" }],
            'transform-class-properties'
          ],
        }).code
        new RegExp(`templateUrl:.+${name.split('/').pop()}.html`).test(code) && await new Promise(
          res => require([`text!${name}.html`], res)
        )
        onLoad.fromText(code)
      }
    })
    require([`es6!${bootstrapModule}`])
  })
})
