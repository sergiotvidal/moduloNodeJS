// *5. Una compañía de agua está implantando un nuevo sistema de cobro. Para cada vivienda se tiene en cuenta:*
// * Los primeros 50 litros son gratis
// * Entre 50 y 200 litros se cobra el libro a 0.1 EUR
// * A partir de 200 litros se cobra el litro a 0.3 EUR
// * El cobro mínimo son 10 EUR. Si los litros de agua a facturar son menor a 10 EUR, entonces la factura final será de 10 EUR.
// **Escribe un programa que calcule el gasto de agua en un mes dado la cantidad de litros gastada**

let billAmount = 0;

function waterBillCalculator(litres) {
    if ((litres - 50) * 0.1 < 10) {
        return console.log(`You consumed ${litres} l., but you didn't reach the minimum. Your water bill is 10 €.`);
    } else {
        if (litres <= 200) {
            billAmount = (litres - 50) * 0.1
            return console.log(`You consumed ${litres} l., your water bill is ${billAmount}€.`);
        } else {
            billAmount = (150 * 0.1) + ((litres - 200) * 0.3);
            return console.log(`You consumed ${litres} l., your water bill is ${billAmount}€.`);
        };
    };
};

waterBillCalculator(15);
waterBillCalculator(65);
waterBillCalculator(101);
waterBillCalculator(149);
waterBillCalculator(150);
waterBillCalculator(151);
waterBillCalculator(159);
waterBillCalculator(199);
waterBillCalculator(200);
waterBillCalculator(201);
waterBillCalculator(365);