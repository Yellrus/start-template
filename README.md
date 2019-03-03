## Как начать?

```
$ git clone git@gitlab.codezavod.ru:Codezavod-Projects/template-frontend.git myProject
$ cd myProject
$ git checkout front-template-v2
$ rm -r .git    # Remove the link to the git repo
$ npm i         # Install dependencies

```

## Dependencies / Installation

Gulp-plate depends on the following technologies:

-   [node.js](http://nodejs.org) as local host environment for gulp (v. 8.6.0 or higher) [1]
-   [gulp](http://gulpjs.com/) as task-runner
-   [webpack](https://webpack.js.org/) as module bundler for modern JavaScript applications
-   [npm](https://npm.com) as dependency manager

[1] It is recommended to install node trough [nvm](https://github.com/creationix/nvm) (Node Version Manager).

## Комманды

```bash
npm start       #start watch
npm run build   #start build
npm run prod    #start for prod with minifications
```

## BrowserSync

```bash
После запука npm start
Будет запущени статический сервер loacalhost:9000
```

## Структура папок

```bash
myProject/
  gulpfile.js/  # gulp tasks
  src/
    icons/      # SVG files to be included in he the sprite
    images/     # other images
    js/         # js code
    sass/       # Sass code, SCSS and Sass indented syntax possible
    html/       # html templates
      data/     # data in json format
      layouts/  # reusable layout templates
      macros/   # Nunjucks macros
      shared/   # reusable snippets
```

## Postcss process

```
1. postcss-object-fit-images(https://github.com/ronik-design/postcss-object-fit-images) - # можете использовать css свойство `object-fit` c авто поддержкой IE11.

```

```
2. postcss-inline-svg(https://github.com/TrySound/postcss-inline-svg) - # использование svg в background-image

Использование:

before:
    .item {
        background: svg-load('/img/myicon.svg')

        или можно использовать с изменением цвета

        background: svg-load('/img/myicon.svg', fill=#000)
    }

after:
    .item {
        background: url("data:image/svg+xml;charset=utf-8,%3Csvg");
    }

```

```
3. Использование svg-sprite

Закидываем в папку icons - все иконки из этой папки генерируются в спрайт.

Подключение:

{{ icon("test", "mybemclass") }}

# test - название файла test.svg
# mybemclass - передаем свой class на для данной иконки

По умолчанию, у svg подставляется class="i i-названиеиконки"

```

```
4. postcss-custom-media(https://github.com/postcss/postcss-custom-media) - #Кастомные название медиа @media

Установка:
@custom-media --small-viewport (max-width: 767px);

Использование:
@media (--small-viewport) {
  /* мои стили */
}

```

## HTML Templates

Шаблонизатор используется Nunjucks.

Читай документацию(https://mozilla.github.io/nunjucks/)

## Используется git hooks precommit

Перед коммитом:

-   проверяет ошибки в scss, js
-   причесывает ваш scss и js в соответствии prettier

В случае ошибки не даст закоммитеть и укажет где была допущена ошибка.
