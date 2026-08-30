import {formatCurrency} from "../script/utils/money.js";
console.log('Test suits: formateCurrency();');
console.log("Cents to dollar");
if(formatCurrency(2095)=== '20.95'){
  console.log("passed");
}
else{
  console.log("not passed");
}
console.log("Round up with nearest digit")
if(formatCurrency(2000.5)=== '20.01'){
  console.log("passed");
}
else{
  console.log("not passed");
}
