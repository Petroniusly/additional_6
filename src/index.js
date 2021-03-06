module.exports = function zeros(expression) {
  var array = expression.split('*');                      //factorial array; 
  var sum2 = 0;
  var sum5 = 0;
  var number = array.map(a=>a.replace(/!+/,''));          //new array numbers;
  var factorialType = array.map(a=>a.replace(/\d+/,''));  //new array factorial types;

  function sumDef(sum, n, x) {
    if (n / (x * x) >= 1) {
      sum += sumDef(sum, n, x * x);
    }
    return sum += Math.floor(n / x); 
  }

  for (var i = 0; i < array.length; i++) {
    if (factorialType[i] == '!!') {
      if (number[i] % 2 == 0) {               //even factorial search only 2;
        sum2 += sumDef(0, number[i], 2);
        if (number[i] / 10 >= 1) {            //even factorial have 10, search 10 too and sum it to 5;
          sum5 += sumDef(0, number[i], 10);
          if (number[i] / 50 >= 1) {          //even factorial have 50, search numbers of 50 too and sum it too 5 exclude numbers of 100;
            sum5 += sumDef(0, number[i], 50) - sumDef(0, number[i], 100);
          }
        }  
      } else {                                //odd factorial, search only 5 exclude numbers of 10 and of 50;
        sum5 += sumDef(0, number[i], 5) - sumDef(0, number[i], 10) - sumDef(0, number[i], 50);
      }
    } else {                                  //standart factorial;
      sum2 += sumDef(0, number[i], 2);
      sum5 += sumDef(0, number[i], 5);
    }
  }

  return Math.min(sum2, sum5);
}
