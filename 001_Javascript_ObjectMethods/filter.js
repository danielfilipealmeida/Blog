dataObject = require('./data');

var vinylRecords = dataObject.data.filter(function(element, index, context) {
    return (element.type == 'lp') ? true:false;
});

console.log("Vinyl records:", vinylRecords);
