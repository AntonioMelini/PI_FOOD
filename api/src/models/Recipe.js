const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    ID: {
      type: DataTypes.UUID,
      defaultValue:DataTypes.UUIDV4,
      allowNull: false,
      primaryKey:true,
    },
    Name:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    Resume_plate:{
      type:DataTypes.TEXT,
    },
    Health_score:{
      type:DataTypes.INTEGER
    },
    Instructions:{
      type:DataTypes.TEXT
    },
    Image:{
      type:DataTypes.STRING
    },
    Created_by_user:{
      type:DataTypes.STRING
    },
    Dish_types:{
      type:DataTypes.STRING,
      defaultValue:false
    }
  },{timestamps:false});
};
