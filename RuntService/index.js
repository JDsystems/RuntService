const validate = require('./validate')
const searchPlate = require('./searchplate')


module.exports = async function (context, req) {
    let data;
    const placa = req.query.placa;
    try {
        validate(placa);
        data = await  searchPlate(placa);
    } catch (error) {
        return {
            res: {
                body: {
                    error:{
                        status: error.status,
                        name:  error.name,
                        message:  error.message,
                    }
                },
                status: error.status
            } 
        }
    }

    return {
        res: {
            body: data,
            status: 200
        } 
    }

}