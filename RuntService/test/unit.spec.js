var jest = require('jest');
const getDataTestMotorcycle = require('../readjson');
const validate = require('../validate');
const searcPlate = require('../searchplate');
const ValidationError = require('../validationErrors');

describe('read motorcycle data', () => {

    test('should return an array of motorcycles', async() => {
        const response = await getDataTestMotorcycle();
        const motorcycle =     {
            "placa": "QBW59D",
            "marca": "BOXER",
            "linea": "CT100",
            "modelo": "2018",
            "cilindraje": "100",
            "propietario": {
                "nombres": "Maria josé",
                "apellidos": "Benitez de Hoyos",
                "tipo_documento": "CC",
                "numero_documento": "1103210123"
            }
        }
        const arrayData = Object.values(JSON.parse(response.toString()));
        expect(arrayData[0].placa).toBe('BGD19F')
        expect(arrayData.length).toBe(5)
        expect(arrayData[4]).toEqual(motorcycle)

    })

     test('should return error when the parameter is not sent with the board', () => {
        const placa = undefined
        const t = () => {
            validate(placa);
        }
        expect(t).toThrow(ValidationError);
        expect(t).toThrow("La placa es requerida");
    })  
   
     test('should return error when the plate is not valid', () => {
        const placa = "BGD19FHHH"
        const t = () => {
            validate(placa);
        }
        expect(t).toThrow(ValidationError);
        expect(t).toThrow(`La placa ${placa.toUpperCase()} no es valida`);
    })  

    test('It should return an error when the license plate does not find the motorcycle license plate', async () => {
        const placa = "DDD56D";
        try {
            await searcPlate(placa);
        } catch (error) {
            expect(error.message).toBe(`La placa ${placa.toUpperCase()} no fue encontrada`)
            expect(error.status).toBe(404)
            expect(error.name).toBe('ValidationErrorRequest')
        }
    
    }) 
/*     test('test------------------------------', async () => {
        const placa = "DDD56D";
        await expect(searcPlate(placa)).rejects.toMatch('ValidationErrorRequest: La placa DDD56D no fue encontrada')
    }) */
})