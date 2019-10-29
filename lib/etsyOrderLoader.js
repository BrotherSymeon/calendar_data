class Enumeration {
  constructor(enumLabels) {
    var i = 0, LBL = "";
    this.MAX = enumLabels.length;
    this.labels = enumLabels;
    // generate the enum literals as capitalized keys/properties
    for (i; i <= enumLabels.length - 1; i++) {
      LBL = enumLabels[i].toUpperCase();
      this[LBL] = i;
    }
    // prevent any runtime change to the enumeration
    Object.freeze(this);
  }
}



let OrderColumns = new Enumeration([
  'SaleDate',
  'OrderId',
  'BuyerUserId',
  'FullName',
  'FirstName',
  'LastName',
  'NumberOfItems',
  'PaymentMethod',
  'DateShipped',
  'Street1',
  'Street2',
  'ShipCity',
  'ShipState',
  'ShipZipCode',
  'ShipCountry',
  'Currency',
  'OrderValue',
  'CouponCode',
  'CouponDetails',
  'DiscountAmount',
  'ShippingDiscount',
  'Shipping',
  'SalesTax',
  'OrderTotal',
  'Status',
  'CardProcessingFees',
  'OrderNet',
  'AdjustedOrderTotal',
  'AdjustedCardProcessingFees',
  'AdjustedNetOrderAmount',
  'Buyer',
  'OrderType',
  'PaymentType',
  'InPersonDiscount',
  'InPersonLocation']);


module.exports = function (error, lines) {
  if (error) {
    return console.error('huston we have a problem...', error.message);
  }
  let retval = [];

  lines.forEach((val, i, array) => {
    //val is a comma seperated line
    val = replaceCommasInDoubleQuotes(val)
    if (i > 0) {
      let lineData = val.split(',');
     
      lineData.forEach((elem, index) => {

        if ([OrderColumns.ADJUSTEDCARDPROCESSINGFEES,
        OrderColumns.ADJUSTEDNETORDERAMOUNT,
        OrderColumns.CARDPROCESSINGFEES,
        OrderColumns.INPERSONDISCOUNT,
        OrderColumns.ADJUSTEDORDERTOTAL,
        OrderColumns.ORDERTOTAL,
        OrderColumns.SHIPPING,
        OrderColumns.SHIPPINGDISCOUNT,
        OrderColumns.SALESTAX,
        OrderColumns.DISCOUNTAMOUNT,
        OrderColumns.ORDERVALUE,
        OrderColumns.ORDERNET].includes(index)) {
          console.log(removeCharacters( elem, '"' ))
          lineData[index] = Number(removeCharacters( elem, '"' ))
        }else{
          lineData[index] = removeCharacters( elem, '"' )
        }

      })

      retval.push( lineData.join('\t') );
      /*
      if(lineData[OrderColumns.PAYMENTMETHOD] !== 'Other'){
        console.log(`line number=${i} column count= ${lineData.length}`)
        if(lineData.length > 35){
          console.log(lineData.join(','))
        }
        retval.push( lineData.join('\t') );
      }
      */

    }else{
      //retval.push( lineData.join('\t') );
    }


  })

  return retval;

}
var removeCharacters = function(str, remove){
  var out = ''
  
  Array.from(str).forEach((i) =>{
    if(i !== remove){
      out += i
    }else{
      out += ''
    }
  })
  return out;
}
var replaceCommasInDoubleQuotes = function(str){
  var isBetweenQuotes = false
  var out = ''
  Array.from(str).forEach((i) => {
    if(i === '"' && isBetweenQuotes === false){
      isBetweenQuotes = true
    }else if(i === '"' && isBetweenQuotes === true){
      isBetweenQuotes = false
    }

    if(i === ',' && isBetweenQuotes){
      out += ''
    }else{
      out += i
    }
  });

  return out;
}

