// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class Orders extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   }
//   Orders.init({
//     userId: DataTypes.STRING,
//     productId: DataTypes.STRING,
//     quantity: DataTypes.STRING,
//     totalAmount: DataTypes.NUMBER
//   }, {
//     sequelize,
//     modelName: 'Orders',
//   });
//   return Orders;
// };


'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Orders extends Model {
    static associate(models) {
      Orders.belongsTo(models.Products, {
        foreignKey: 'productId',
        as: 'product',
      });
    }
  }

  Orders.init({
    userId: DataTypes.STRING,
    productId: DataTypes.STRING,
    quantity: DataTypes.STRING,
    totalAmount: DataTypes.NUMBER,
  }, {
    sequelize,
    modelName: 'Orders',
  });

  return Orders;
};
