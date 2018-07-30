var fs = require("fs");
let writeStream = fs.createWriteStream("products_after_30_days.txt");
writeStream.write(`OMGHAI!\n`);

const Product = require('./src/models/productModel');
const CarInsurance = require('./src/controllers/CarInsuranceController');
const globals = require('./src/globals');
const Coverage = globals.productTypes;

const productsAtDayZero = [
    new Product(Coverage.medium, 10, 20),
    new Product(Coverage.full, 2, 0),
    new Product(Coverage.low, 5, 7),
    new Product(Coverage.mega, 0, 80),
    new Product(Coverage.mega, -1, 80),
    new Product(Coverage.special, 15, 20),
    new Product(Coverage.special, 10, 49),
    new Product(Coverage.special, 5, 49),
    new Product(Coverage.superSale, 3, 6),
];
const carInsurance = new CarInsurance(productsAtDayZero);

const printInitalValues = function() {
    let product = new Product();
    writeStream.write(`-------- day 0 --------\n`);
    writeStream.write('name, sellIn, price\n');

    carInsurance.products.forEach(function(item) {
        product = new Product(item.name, item.sellIn, item.price);
        writeStream.write(`${product.name}, ${product.sellIn}, ${product.price}\n`);
    });

    writeStream.write('\n');
};

const createReport = function (days = 30) {
    printInitalValues();

    for (let i = 1; i <= days; i += 1) {
        writeStream.write(`-------- day ${i} --------\n`);
        writeStream.write('name, sellIn, price\n');
        carInsurance.updatePrice().forEach(function (product) {
            writeStream.write(`${product.name}, ${product.sellIn}, ${product.price}\n`);
        });
        writeStream.write('\n');
    }
    writeStream.end();
};

createReport();