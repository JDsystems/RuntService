const getDataMotorcycle = require('./readjson')
const ValidationError = require('./validationErrors')
module.exports = async (placa) => {

    const data = await getDataMotorcycle()
    const arrayData = Object.values((JSON.parse(data.toString())));
    const placaFilter =  arrayData.filter(filter => filter.placa === placa.toUpperCase())

    if(placaFilter.length <= 0) {
        throw new ValidationError(`La placa ${placa.toUpperCase()} no fue encontrada`, 404);
    }
    
    return placaFilter[0];

}