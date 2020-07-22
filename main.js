function printReceipt(barcodes) {
    let barcodeInfo = createdItemByBarcodes(barcodes);
    let totalItems = caculateItems(barcodeInfo);
    let receipt = formattingPrint(totalItems);
    console.log(receipt);
}

function createdItemByBarcodes(barcodes){
    var groupByBarcode = groupByBarcodes(barcodes);
    return findValidItemByBarcodes(groupByBarcode);
}

function groupByBarcodes(barcodes){
    let barcodeObject = {};
    barcodes.forEach((item)=>{
        if (item in barcodeObject){
            barcodeObject[item].count++;
        } else {
            barcodeObject[item]={
                goodsInfo:{},
                count:1
            }
        }
    })
    return barcodeObject;
}

function findValidItemByBarcodes(groupByBarcode){
    let allValidItem = [
        {
           barcode: 'ITEM000000',
           name: 'Coca-Cola',
           price: 3
         },
         {
           barcode: 'ITEM000001',
           name: 'Sprite',
           price: 3
         },
         {
           barcode: 'ITEM000002',
           name: 'Apple',
           price: 5
         },
         {
           barcode: 'ITEM000003',
           name: 'Litchi',
           price: 15
         },
         {
           barcode: 'ITEM000004',
           name: 'Battery',
           price: 2
         },
         {
           barcode: 'ITEM000005',
           name: 'Instant Noodles',
           price: 4
         }
     ]
     let barcodeCollection = Object.keys(groupByBarcode);
     barcodeCollection.forEach((barcodes)=>{
        allValidItem.forEach((item)=>{
            if(barcodes == item.barcode) groupByBarcode[barcodes].goodsInfo = item;
        })
     })
     return groupByBarcode;
}

function caculateItems(barcodeInfo){
    let totalItems = {};
    totalItems.createSubItems = createSubItems(barcodeInfo);
    totalItems.caculateTotalPrice = caculateTotalPrice(barcodeInfo);
    return totalItems;
}

function createSubItems(barcodeInfo){
    let subItem = '';
    for(let info in barcodeInfo){
        subItem += `Name: ${barcodeInfo[info].goodsInfo.name}, Quantity: ${barcodeInfo[info].count}, Unit price: ${barcodeInfo[info].goodsInfo.price} (yuan), Subtotal: ${barcodeInfo[info].count*barcodeInfo[info].goodsInfo.price} (yuan)\n`;
    }
    return subItem.substring(0,subItem.length-1);
}

function caculateTotalPrice(barcodeInfo){
    let totalPrice = 0;
    for(let info in barcodeInfo){
        totalPrice += barcodeInfo[info].count*barcodeInfo[info].goodsInfo.price;
    }
    return totalPrice;
}

function formattingPrint(totalItems){
    return '\n'+'***<store earning no money>Receipt ***' + '\n' + totalItems.createSubItems + '\n----------------------' + '\n' + 'Total: ' + totalItems.caculateTotalPrice + ' (yuan)\n' + '**********************';
}

module.exports = {
    printReceipt
};