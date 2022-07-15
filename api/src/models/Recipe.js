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
      type:DataTypes.STRING,
      // validate:{
      //   esMayor(value){
      //     let a =parseInt(value);
      //     if(a<0){
      //       throw new Error("Health score can not be less than 0")
      //     }
      //     if(a>100){
      //       throw new Error ("Health score can not be more than 100")
      //     }
      //   }
      // }
    },
    Instructions:{
      type:DataTypes.STRING
    },
    Image:{
      type:DataTypes.TEXT
    },
    Dish_types:{
      type:DataTypes.STRING
    }
  },{timestamps:false});
};
