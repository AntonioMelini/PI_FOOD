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
      type: DataTypes.STRING(60),
      allowNull: false,
    },
    Resume_plate:{
      type:DataTypes.STRING,
    },
    Health_score:{
      type:DataTypes.INTEGER
    },
    Instructions:{
      type:DataTypes.STRING
    },
    Image:{
      type:DataTypes.STRING
    }
  },{timestamps:false});
};
