const Product  = require('./productModel');

class Printer {
    static product(product) {
        if (product instanceof Product) {
            console.log(`${product.name}, ${product.sellIn}, ${product.price}`);
        } else {
            console.log(`invalid product`);
        }
    }
}

module.exports = Printer;
