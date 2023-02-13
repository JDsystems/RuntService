const regex = /^[A-Z]{3}[0-9]{2}[A-Z]{1}$/;
const ValidationError = require('./validationErrors')
module.exports = (placa) => {
    if(!placa){
        throw new ValidationError(`La placa es requerida`, 422);
    }
    
    if( !regex.test(placa.toUpperCase())){
        throw new ValidationError(`La placa ${placa.toUpperCase()} no es valida`, 422);
    }
}