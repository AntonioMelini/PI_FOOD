const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('diet', {
    ID: {
        type: DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4,
        allowNull: false,
        primaryKey:true
        
      },
    Name: {
      type: DataTypes.STRING(30),
      allowNull: false,
    }
  },{timestamps:false});
};