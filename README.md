## Optimizations

### Forced synchronous layout

In the updatePositions function in main.js, there is a loop that changes the
position of the pizzas. In that loop, there was this line of code:

`var phase = Math.sin((document.body.scrollTop / 1250) + (i % 5));`

Since there is no need to calculate `document.body.scrollTop` during every loop
iteration, since that value does not change in the function, I moved it out of
the loop:

`var scrollTop = document.body.scrollTop;`

Then, I used this variable in the original line of code:

`var phase = Math.sin((scrollTop / 1250) + (i % 5));`
