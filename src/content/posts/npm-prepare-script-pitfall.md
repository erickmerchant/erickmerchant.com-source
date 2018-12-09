<p>Today I learned that if you run <code>npm publish</code> with sudo and have a prepare script that runs babel, that script will fail to actually run.

``` javascript
{
  "name": "@erickmerchant/example",
  "version": "1.0.0",
  "description": "An example",
  "main": "dist/main.js",
  "scripts": {
    "build": "babel --presets es2015 main.js -d dist/",
    "prepare": "npm run build"
  },
  "devDependencies": {
    "babel-cli": "^6.10.1",
    "babel-preset-es2015": "^6.9.0"
  }
}
```

<p>For instance trying to <code>sudo npm publish</code> a package with the above package.json you'd get the error <code>npm WARN lifecycle @erickmerchant/example@1.0.0~prepare: cannot run in wd %s %s (wd=%s) @erickmerchant/example@1.0.0 npm run build /Users/erickmerchant/Code/example</code>.

<p>Your package will publish correctly, essentially publishing a broken version. In my case it just published the last code that was actually transpiled with <code>npm run prepare</code>. You should never <code>npm publish</code> with sudo. You should also never really need to use sudo with npm.

<ul>
  <li><a href="https://docs.npmjs.com/misc/scripts">About scripts</a>
  <li><a href="https://www.npmjs.com/package/np">Highly recommended package to make publishing easier</a>
  <li><a href="https://docs.npmjs.com/getting-started/fixing-npm-permissions">A useful video about fixing npm permissions</a>
</ul>