# Optimized Web Pages

## Building the project

The project contains src and dist directories. Gulp tasks perform a number of
optimizations to the code in the src directory to prepare the code for production use.

Before running the gulp tasks to build the project, install the modules located
in the package.json file:

`npm install`

Next, install the gulp-cli tools:

`npm install gulp-cli`

Finally, run the gulp task:

`gulp`

Once this is done, the dist directory will contain the files for production use.

To view the project, open dist/index.html in a web browser.

## PageSpeed Task

To achieve a PageSpeed Insights score greater than 90 for both mobile and desktop
platforms, I created a number of gulp tasks to do the following:

- minifiy css
- minify html
- resize and compress images
- inline css (to remove render blocking)

In addition, I configured a web server to:

- gzip content
- cache static content for 1 week

## Janky Pizzas Task

I made the following modifications to main.js to achieve 60 fps:

### Non-optimal loop in updatePositions function

In the updatePositions function in main.js, there is a loop that changes the
position of the pizzas. In that loop, there was this line of code:

`var phase = Math.sin((document.body.scrollTop / 1250) + (i % 5));`

There is no need to calculate the value for `document.body.scrollTop` during
every loop iteration, so I moved it to the outside of the loop:

`var scrollTop = document.body.scrollTop;`

and then rewrote the original code as:

`var phase = Math.sin((scrollTop / 1250) + (i % 5));`

### Too Many Pizzas!

The original code used a for loop to create more pizzas than could be seen on a screen:

`for (var i = 0; i < 200; i++)`

These additional pizzas had to be modified during every scroll event, yet they served
no purpose since the user could not see them.

I found that 20 pizzas was sufficient to create the desired effect:

`for (var i = 0; i < 20; i++)`

### Better pizza resizing

The original code for the chanagePizzaSizes function was:

```
function changePizzaSizes(size) {
  for (var i = 0; i < document.querySelectorAll(".randomPizzaContainer").length; i++) {
    var dx = determineDx(document.querySelectorAll(".randomPizzaContainer")[i], size);
    var newwidth = (document.querySelectorAll(".randomPizzaContainer")[i].offsetWidth + dx) + 'px';
    document.querySelectorAll(".randomPizzaContainer")[i].style.width = newwidth;
  }
}
```
There were a number of lines in the loop that forced the browser to recalculate layout.
Since these modifications and calculations only needed to be done once for the entire
function, I moved them out of the loop:

```
function changePizzaSizes(size) {
  var pizzas = document.querySelectorAll(".randomPizzaContainer");
  var pizza = pizzas[0];
  var pizzaOffset = pizza.offsetWidth;
  var dx = determineDx(pizza, size);
  for (var i = 0; i < pizzas.length; i++) {
    var newwidth = (pizzaOffset + dx) + 'px';
    pizzas[i].style.width = newwidth;
  }
}
```

Now the loop only contains a single line of code that forces the browser to recalculate
layout.
