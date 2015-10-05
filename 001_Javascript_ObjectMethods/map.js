dataObject = require('./data');

function albumString(element) {
    return element.band+" - "+element.title + " ("+element.type+")";
}

var mapResult = dataObject.data.map(function(element, index, context) {
    return albumString(element);
});

console.log(mapResult);
