# Bootstrap Color

## Gallery of color theme for Bootstrap 4

Each folder under `/dist/` is it's own 
theme including:

* `bs4-[theme].css` : built CSS
* `bs4-[theme].min.css` : built and minified css
* `_begin.scss` : customize settings
* `_end.scss` : modify structure

## Getting started

You can use the built CSS files under `/dist/`, 
or import SASS files `_begin.scss` `_end.scss` directly to your scripts to customize it. 

## Build steps

You can also checkout the project to local, modify the themes then build with: `yarn build`

## Usage

There are a few different ways you can integrate Bootswatch into your project.

### Via Pre-compiled Asset

Download the `bs4-[theme].min.css` file associated with a theme and replace
Bootstrap's default stylesheet.  You must still include Bootstrap's JavaScript
file to have functional dropdowns, modals, etc.

### Via Sass Imports

If you're using [Sass](https://sass-lang.com/) (SCSS) in your project, you can
import the `_begin.scss` and `_end.scss` files for a given theme.
This method allows you to override theme variables.

```scss
// Your variable overrides go here, e.g.:
// $h1-font-size: 3rem;

@import "~bootstrap-color/dist/[theme]/begin";
@import "~bootstrap/scss/bootstrap";
@import "~bootstrap-color/dist/[theme]/end";
```

Make sure to import Bootstrap's `bootstrap.scss` in between `_begin.scss` and `_end.scss`!

### Via NPM/YARN

You can install as a package with the command 

`npm install bootstrap-color` 

or 

`yarn add bootstrap-color`.

## Copyright

This project rebuilds color themes from 
[HackerThemes](https://github.com/HackerThemes/theme-machine), 
[Bootswatch](https://github.com/thomaspark/bootswatch), 
[BootstrapThemes](https://github.com/utkarshkukreti/bootstrap-themes), 
etc. Thanks for your sharings! <3