const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Novo Produto',
    path: '/admin/add-product',
    editing: false
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  /*em vez de: const product = new Product(null, title, imageUrl, description, price);
product.save();
✔ devem chamar o método create com o Modelo Product.*/
  Product.create({
    title: title,
    imageUrl: imageUrl,
    description: description,
  })
  /*✔ Lembram-se que os métodos de Sequelize vão retornar um Promise. Então a seguir ao create
devem ter os dois ramos do programa .then() e .catch() que devem completar. */
  .then((resultado) =>{
    console.log('Produto adicionado!')
    res.redirect('/admin/products');
  })
  .catch((erro) => {
    console.log(erro.message);

});
};
/*Devem modificar todos os restantes middlewares dos controllers admin.js para que se
possa usar métodos Sequelize. */
exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const prodId = req.params.productId;
  Product.findById(prodId)
   .then((product) => {
    if (!product) {
      return res.redirect('/');
    }
    res.render('admin/edit-product', {
      pageTitle: 'Modificar Produto',
      path: '/admin/edit-product',
      editing: editMode,
      product: product
    });
  })
  .catch((erro) => {
    console.log(erro.message);

});
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;
  
  Product.findByPk(prodId)
  .then((product) => {
    if (!product) {
      return res.redirect('/');
  }
    product.title = updatedTitle;
    product.price = updatedPrice;
    product.imageUrl = updatedImageUrl;
    product.description = updatedDesc;
    return product.save();
  })
  .then((resultado) => {
    console.log('Produto atualizado!');
    res.redirect('/admin/products');
  })
  .catch((erro) => {
    console.log(erro.message);

});
};

exports.getProducts = (req, res, next) => {
  Product.findAll
  .then((products) => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Gerir Produtos',
      path: '/admin/products'
    });
  })
  .catch((erro) => {
    console.log(erro.message);

});
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;

  Product.findByPk(prodId)
  .then((product) => {
    if (!product) {
      return res.redirect('/admin/products');
    }
    return product.destroy();
  })
  .then((resulto) => {
    console.log('Produto deletado!');
    res.redirect('/admin/products');
  })
  .catch((erro) => {
    console.log(erro.message);

});
};