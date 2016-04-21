# Optimized Web Pages

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
