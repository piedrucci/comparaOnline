const Printer = require('../models/printerModel');
const Product = require('../models/productModel');
const globals = require('../globals');
const Coverage = globals.productTypes;

class CarInsuranceController {

    constructor(products = []) {
        this.products = products;
    }

    updatePrice() {
        for (let i = 0; i < this.products.length; i++) {
            if (this.products[i].name !== Coverage.full && this.products[i].name !== Coverage.special) {
                if (this.products[i].price > 0) {
                    if (this.products[i].name !== Coverage.mega) {
                        this.products[i].price = this.products[i].price - 1;
                    }
                    if (this.products[i].name === Coverage.superSale && this.products[i].price > 0) {
                        this.products[i].price = this.products[i].price - 1;
                    }
                }
            } else {
                if (this.products[i].price < 50) {
                    this.products[i].price = this.products[i].price + 1;
                    if (this.products[i].name === Coverage.special) {
                        if (this.products[i].sellIn < 12) {
                            if (this.products[i].price < 50) {
                                this.products[i].price = this.products[i].price + 1;
                            }
                        }
                        if (this.products[i].sellIn < 7) {
                            if (this.products[i].price < 50) {
                                this.products[i].price = this.products[i].price + 1;
                            }
                        }
                    }
                }
            }
            if (this.products[i].name !== Coverage.mega) {
                this.products[i].sellIn = this.products[i].sellIn - 1;
            }
            if (this.products[i].sellIn < 0) {
                if (this.products[i].name !== Coverage.full) {
                    if (this.products[i].name !== Coverage.special) {
                        if (this.products[i].price > 0) {
                            if (this.products[i].name !== Coverage.mega) {
                                this.products[i].price = this.products[i].price - 1;
                            }
                        }
                    } else {
                        this.products[i].price = this.products[i].price - this.products[i].price;
                    }
                } else {
                    if (this.products[i].price < 50) {
                        this.products[i].price = this.products[i].price + 1;
                    }
                }
            }
            if (this.products[i].name === Coverage.special && this.products[i].sellIn === 0) {
                this.products[i].price = 0;
            }
            if (this.products[i].name === Coverage.mega) {
                this.products[i].price = globals.MEGA_COVERAGE_PRICE;
            }
        }

        return this.products;
    }

    showOutputAt(days = 1) {
        console.log('OMGHAI!');
        this.printInitalValues();

        for (let i = 1; i <= days; i += 1) {
            console.log(`-------- day ${i} --------`);
            console.log('name, sellIn, price');
            this.updatePrice().forEach(function(item) {
                let product = new Product(item.name, item.sellIn, item.price);
                Printer.product(product);
            });
            console.log('');
        }
    }

    printInitalValues() {
        let product = new Product();
        console.log(`-------- day 0 --------`);
        console.log('name, sellIn, price');

        this.products.forEach(function(item) {
            product = new Product(item.name, item.sellIn, item.price);
            Printer.product(product);
        });
        console.log('');
    }
}

module.exports = CarInsuranceController;
