'use strict'

const Product = require('./../models/productModel');
const CarInsurance = require('./CarInsuranceController');
const globals = require('./../globals');
const Coverage = globals.productTypes;

const proccessProducts = (req, res) => {
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

    carInsurance.showOutputAt(10);

    res.status(200).send(carInsurance.products);
};

module.exports = {
    proccessProducts
};
