dataObject = require('./data');

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


var reduceResult = dataObject.data.reduce( function (previousValue, currentValue, index, context){
    if (typeof previousValue === 'object') previousValue = previousValue.value;
    return currentValue.value + previousValue;;
});

console.log("Record collection value", getCurrencyString(reduceResult));
