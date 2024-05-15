const Product = require('../models/product');
const Cart = require('../models/cart');
/*Devem modificar todos os restantes middlewares dos controllers shop.js para que se
possa usar métodos Sequelize. */
exports.getProducts = (req, res, next) => {
  Product.findAll()
  .then(products => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'Todos Produtos',
      path: '/products'
    });
  })
  .catch((erro) => {
    console.log(erro.message);

});
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findByPk(prodId)
  .then((product) => {
    res.render('shop/product-detail', {
      product: product,
      pageTitle: product.title,
      path: '/products'
    });
  })
  .catch((erro) => {
    console.log(erro.message);

});
};
/*Objectivo é usar o método findAll do sequelize - Product.findAll() . Relembrar que findAll também
retorna um Promise. Portanto devemos ter o then e catch. */
exports.getIndex = (req, res, next) => {
  Product.findchAll()
  .then(products => {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/'
    });
  })
  .catch((erro) => {
    console.log(erro.message);

});
};
exports.getCart = (req, res, next) => {
  Cart.getCart()
  .then((cart) => {
    return cart.getProducts()
    .then((products) => {
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Seu carrinho',
        products: products
      });
    })
    .catch((erro) => {
      console.log(erro.message);
  
  });
  })
  .catch((erro) => {
    console.log(erro.message);
    process.exit(1);
});
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findByPk(prodId)
  .then(product => {
    return req.user.addToCart(product);
  })
  .then(result => {
    res.redirect('/cart');
  })
  .catch((erro) => {
    console.log(erro.message);

});
};

exports.getOrders = (req, res, next) => {
  req.user.getOrders({ include: ['products'] })
  .then((orders) => {
    res.render('shop/orders', {
      path: '/orders',
      pageTitle: 'Encomendas',
      orders: orders
    });
  })
  .catch((erro) => {
    console.log(erro.message);

});
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};
