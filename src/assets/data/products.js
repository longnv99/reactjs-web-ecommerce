const pd_01_img_01 = require('../images/product/product_01.jpg')
const pd_01_img_02 = require('../images/product/product_01 (2).jpg')

const pd_02_img_01 = require('../images/product/product_02.jpg')
const pd_02_img_02 = require('../images/product/product_02 (2).jpg')

const pd_03_img_01 = require('../images/product/product_03.jpg')
const pd_03_img_02 = require('../images/product/product_03 (2).jpg')

const pd_04_img_01 = require('../images/product/product_04.jpg')
const pd_04_img_02 = require('../images/product/product_04 (2).jpg')

const pd_05_img_01 = require('../images/product/product_05.jpg')
const pd_05_img_02 = require('../images/product/product_05 (2).jpg')

const pd_06_img_01 = require('../images/product/product_06.jpg')
const pd_06_img_02 = require('../images/product/product_06 (2).jpg')

const pd_07_img_01 = require('../images/product/product_07.jpg')
const pd_07_img_02 = require('../images/product/product_07 (2).jpg')

const pd_08_img_01 = require('../images/product/product_08.jpg')
const pd_08_img_02 = require('../images/product/product_08 (2).jpg')

const pd_09_img_01 = require('../images/product/product_09.jpg')
const pd_09_img_02 = require('../images/product/product_09 (2).jpg')

const pd_10_img_01 = require('../images/product/product_10.jpg')
const pd_10_img_02 = require('../images/product/product_10 (2).jpg')

const pd_11_img_01 = require('../images/product/product_11.jpg')
const pd_11_img_02 = require('../images/product/product_11 (2).jpg')

const pd_12_img_01 = require('../images/product/product_12.jpg')
const pd_12_img_02 = require('../images/product/product_12 (2).jpg')

const products = [
    {
        title: 'Áo Polo kẻ ngang',
        price: '295000',
        img1: pd_01_img_01,
        img2: pd_01_img_02,
        pathName: 'polo-shirt-01',
        categoryPath: 'polo-shirt',
        color: ["white", "red", "orange"],
        size: ["s", "m", "l", "xl"],
        discount: 33,
    },
    {
        title: 'Áo Polo cổ khóa',
        price: '315000',
        img1: pd_02_img_01,
        img2: pd_02_img_02,
        pathName: 'polo-shirt-02',
        categoryPath: 'polo-shirt',
        color: ["white", "pink"],
        size: ["m", "l", "xl"],
        discount: null,
    },
    {
        title: 'Áo sơ mi trắng',
        price: '295000',
        img1: pd_03_img_01,
        img2: pd_03_img_02,
        pathName: 'shirt-03',
        categoryPath: 'shirt',
        color: ["white"],
        size: ["m", "l"],
        discount: 23,
    },
    {
        title: 'Áo phông tay ngắn',
        price: '225000',
        img1: pd_04_img_01,
        img2: pd_04_img_02,
        pathName: 't-shirt-04',
        categoryPath: 't-shirt',
        color: ["red"],
        size: ["s", "m"],
        discount: null,
    },
    {
        title: 'Áo Polo kẻ ngang 2',
        price: '265000',
        img1: pd_05_img_01,
        img2: pd_05_img_02,
        pathName: 'polo-shirt-05',
        categoryPath: 'polo-shirt',
        color: ["white", "red", "orange", "blue"],
        size: ["l", "xl"],
        discount: null,
    },
    {
        title: 'Áo phông 2',
        price: '325000',
        img1: pd_06_img_01,
        img2: pd_06_img_02,
        pathName: 't-shirt-06',
        categoryPath: 't-shirt',
        color: ["white", "orange"],
        size: ["s", "m", "l", "xl"],
        discount: null,
    },
    {
        title: 'Quần short kaki',
        price: '275000',
        img1: pd_07_img_01,
        img2: pd_07_img_02,
        pathName: 'short-07',
        categoryPath: 'short',
        color: ["white", "black", "blue"],
        size: ["s", "m", "l", "xl"],
        discount: null,
    },
    {
        title: 'Quần jean short ',
        price: '325000',
        img1: pd_08_img_01,
        img2: pd_08_img_02,
        pathName: 'short-08',
        categoryPath: 'short',
        color: ["white", "black"],
        size: ["s", "m", "l"],
        discount: null,
    },
    {
        title: 'Quần jean 2',
        price: '375000',
        img1: pd_09_img_01,
        img2: pd_09_img_02,
        pathName: 'jean-09',
        categoryPath: 'jean',
        color: ["black", "blue"],
        size: ["m", "l", "xl"],
        discount: null,
    },
    {
        title: 'Quần short hoa',
        price: '255000',
        img1: pd_10_img_01,
        img2: pd_10_img_02,
        pathName: 'short-10',
        categoryPath: 'short',
        color: ["white", "black", "red"],
        size: ["s", "m"],
        discount: 45,
    },
    {
        title: 'Quần jean 3',
        price: '355000',
        img1: pd_11_img_01,
        img2: pd_11_img_02,
        pathName: 'jean-11',
        categoryPath: 'jean',
        color: ["black", "blue"],
        size: ["m", "l", "xl"],
        discount: null,
    },
    {
        title: 'Quần jean 4',
        price: '325000',
        img1: pd_12_img_01,
        img2: pd_12_img_02,
        pathName: 'jean-12',
        categoryPath: 'jean',
        color: ["black"],
        size: ["s", "m", "l", "xl"],
        discount: 46,
    },
]

const getAllProduct = () => products;

const getProductDiscount = () => {
    return products.filter(item => item.discount !== null)
}

const getProductPopular = (count) => {
    const productNew = products.filter(item => item.discount === null)
    const max = productNew.length - count
    const min = 0
    const start = Math.floor(Math.random() * (max - min) + min)
    return productNew.slice(start, start + count)
}

const getProductByPathName = (path) => products.find(e => e.pathName === path)

const getCartItems = (cartItems) => {
    let cart = []
    if(cartItems.length > 0) {
        cartItems.forEach(element => {
            cart.push({
                ...element,
                info: getProductByPathName(element.pathName)
            })
        });
    }
    return cart
}

const dataProducts = {
    getAllProduct,
    getProductDiscount,
    getProductPopular,
    getProductByPathName,
    getCartItems
}


export default dataProducts;
