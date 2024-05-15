const Sequelize = require('sequelize');
const conexaoBD  = require('../util/database');

const Produto = conexaoBD.define('produto',{
    id: {
      type: Sequelize.INTEGER,
      autoIncrement:  true,
      allowNull: false,
      primaryKey: true
    },
    title: Sequelize.STRING,
    price:{
      type: Sequelize.DOUBLE,
      allowNull: false
    },
    imageURL:{
      type: Sequelize.TEXT,
      allowNull: false
    },
    description:{
      type: Sequelize.STRING,
      allowNull: false
    }
},{
  timestamps: false
});
module.exports = Produto;