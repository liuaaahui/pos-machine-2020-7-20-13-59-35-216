function printReceipt(barcodes) {
    var BarcodeInfo = CreatedItemByBarcodes(barcodes);
    var totalItems = CaculateItems(BarcodeInfo);
    var Receipt = FormattingPrint(totalItems);
    console.log(Receipt);
}

function CreatedItemByBarcodes(barcodes){
    var MargeSameBarcodes = MargeAndCountBarcodes(barcodes);
    return FindValidItemByBarcodes(MargeSameBarcodes);
}

function MargeAndCountBarcodes(barcodes){
    let BarcodeObject = {};
    barcodes.forEach((item)=>{
        if (item in BarcodeObject){
            BarcodeObject[item].count++;
        } else {
            BarcodeObject[item]={
                goodsInfo:{},
                count:1
            }
        }
    })
    return BarcodeObject;
}

function FindValidItemByBarcodes(MargeSameBarcodes){
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
     let BarcodeCollection = Object.keys(MargeSameBarcodes);
     BarcodeCollection.forEach((Barcodes)=>{
        allValidItem.forEach((item)=>{
            if(Barcodes == item.barcode) MargeSameBarcodes[Barcodes].goodsInfo = item;
        })
     })
     return MargeSameBarcodes;
}

function CaculateItems(BarcodeInfo){
    let totalItems = {};
    totalItems.subItem = SubItems(BarcodeInfo);
    totalItems.totalPrice = TotalPrice(BarcodeInfo);
    return totalItems;
}

function SubItems(BarcodeInfo){
    let SubItem = '';
    for(let info in BarcodeInfo){
        SubItem += `Name: ${BarcodeInfo[info].goodsInfo.name}, Quantity: ${BarcodeInfo[info].count}, Unit price: ${BarcodeInfo[info].goodsInfo.price} (yuan), Subtotal: ${BarcodeInfo[info].count*BarcodeInfo[info].goodsInfo.price} (yuan)\n`;
    }
    return SubItem.substring(0,SubItem.length-1);
}

function TotalPrice(BarcodeInfo){
    let totalPrice = 0;
    for(let info in BarcodeInfo){
        totalPrice += BarcodeInfo[info].count*BarcodeInfo[info].goodsInfo.price;
    }
    return totalPrice;
}

function FormattingPrint(totalItems){
    return '\n'+'***<store earning no money>Receipt ***' + '\n' + totalItems.subItem + '\n----------------------' + '\n' + 'Total: ' + totalItems.totalPrice + ' (yuan)\n' + '**********************';
}

module.exports = {
    printReceipt
};