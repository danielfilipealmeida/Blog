# Array Methods: map, reduce, filter and forEach

Software eats data for breakfast, lunch, dinner and during all those snack breaks.
In JS, food... I mean, data, comes on the form of arrays or objects. We'll have to traverse it so we can display it, gather information out of it or transform it into some new data.

A classic way of doing this is with:

    for ( var index in records ) {
        var record = records[index];
        ...
    }

But Javascript's Arrays have four methods that you can use instead to write a cleaner code.

To process each element of the Array and produce a new one with the same dimension you use `map`; to traverse all the elements and calculate one single resulting value, you can use `reduce`; to select which elements to keep, `filter` comes to the rescue, and finally, to do the same has the code block above, but in a cleaner way: `forEach`.

To help us understand each method, I'll use a minuscule subset of my record collection:

    data = [
        {
            type: 'lp',
            title: 'Jeopardy',
            band: 'The Sound',
            country: 'UK',
            value: 2090
        },
        {
            type: 'cd',
            title: 'Goo',
            band: 'Sonic Youth',
            country: 'US',
            value: 2000
        },
        {
            type: 'lp',
            title: 'Unknown Pleasures',
            band: 'Joy Division',
            country: 'UK',
            value: 2000
        },
        {
            type: 'lp',
            title: 'Mutantes S.21',
            band: 'Mão Morta',
            country: 'Portugal',
            value: 2050
        }
    ];

## map

This method traverses the array and applies a callback to every single element. The callback gives access to the said element, its index, and the context the element is in. The callback returns the transformation operated on the element data and the result of the `map` function is a new array where every new element is the result of the callback operated on the related element on the original array.

    Array.map (function (element, index, context) {...} [, thisArg]);

Imagine we wish to obtain an array with the main information of every album condensed in a string following the format `[band] - [album title] ([format])`. We could do it like this:

    function albumString(element) {
        return element.band+" - "+element.title + " ("+element.type+")";
    }

    var mapResult = data.map(function(element, index, context) {
        return albumString(element);
    });

    console.log(mapResult);


Running this simple code on our test data will produce the following results:

    [ 'The Sound - Jeopardy (lp)',
      'Sonic Youth - Goo (cd)',
      'Joy Division - Unknown Pleasures (lp)',
      'Mão Morta - Mutantes S.21 (lp)' ]

## reduce

Reduce is another useful Array method that is used to calculate one value out of all elements of the Array (thus reduce). You use it like this:

    Array.reduce( function (previousValue, currentValue, index, context){...} [, initialValue]);

To have a mental image of how it works, imagine you're traversing the array. In each iteration you'll have available the current element and the previous calculated value. If you have `n` size array, reduce will have `(n-1)` iterations. The first iteration is special, you'll have available the first and the second element of the array. From the second iteration on, the previous value is always the result of the previous iteration. Sounds confusing? It's not, just try it.

On our record collection we've got a `value` field that we haven't used yet. It represents a currency value in integer counting the cents. This means the The Sounds's Jeopardy Lp is valued at 20.90 at whatever currency you wish (I'm going for Euros!).

To calculate the value of my record collection I could do something like this:

    function getCurrencyString(value) {
       var result;
       checkData();
       handleFloat();
       print();
       return result;

       function checkData() {
           if (typeof value !== 'number') throw('value needs to be a number');
       }

       function handleFloat() {
           if (value % 1 == 0) return;

           value = Math.round(value * 100);
       }

       function print() {
            result = "€ "+Math.floor(value / 100)+"."+(value%100);
       }

    }

    var reduceResult = data.reduce( function (previousValue, currentValue, index, context){
        if (typeof previousValue === 'object') previousValue = previousValue.value;
        return currentValue.value + previousValue;;
    });

    console.log("Record collection value", getCurrencyString(reduceResult));

The result will be:

    Record collection value € 81.40


## filter

To select what elements of an element to keep we can use the `filter` method. It also traverse an array and in each iteration waits for a boolean response declaring if the current array element will be preset on the resulting array. Like `map` it return an array. It's usage is:

    Array.filter (function (element, index, context) { ... }  [, thisArg]);

As an example, imagine we want to get a list of all the records in 12" Vinyl (lp). We could do it with something like this:

    var vinylRecords = data.filter(function(element, index, context) {
        return (element.type == 'lp') ? true:false;
    });
    console.log("Vinyl records:", vinylRecords);

And the results would be:

    Vinyl records: [ { type: 'lp',
        title: 'Jeopardy',
        band: 'The Sound',
        country: 'UK',
        value: 2090 },
      { type: 'lp',
        title: 'Unknown Pleasures',
        band: 'Joy Division',
        country: 'UK',
        value: 2000 },
      { type: 'lp',
        title: 'Mutantes S.21',
        band: 'Mão Morta',
        country: 'Portugal',
        value: 2050 } ]

## forEach

Finally, the clean way of writing our `for(var i in <array>)` is with the forEach Array method. It's usage is as follows:

    Array.forEach (function (element, index, context) { ... }, [, thisArg]);

You use it in whatever reason where you're not filtering, choosing what elements of the array to output or reducing all elements into one value. And of course you could use it on those previous three situations, but whats the point in that? It won't be the cleanest implementation.

You can check the examples on my github at: https://github.com/danielfilipealmeida/Blog/tree/master/001_Javascript_ObjectMethods and run them with node.js...


## References

- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array

- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce

- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map

- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter

- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach

- http://jcla1.com/blog/javascript-mapreduce/
