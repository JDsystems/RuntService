var jest = require('jest')
var request =  require('supertest')

const HOST = 'http://127.0.0.1:7071/api';
const MOTORCICLEPLATE200 = 'QBW59D';
const MOTORCICLEPLATE404 = 'QBW59Y';
const MOTORCICLEPLATEINVALID = 'QBW59Y777';
const MOTORCICLE =     {
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
const message404 = `La placa ${MOTORCICLEPLATE404} no fue encontrada`;
const messageInvalid = `La placa ${MOTORCICLEPLATEINVALID} no es valida`;

describe('GET /runtservice', () => {
    test('Should check for a motorcycle license plate successfully', async () => {
        const response =  await request(HOST).get(`/RuntService?placa=${MOTORCICLEPLATE200}`).send();
        const data = JSON.parse(response.text);
        expect(response.status).toBe(200);
        expect(data).toEqual(MOTORCICLE)
    })

    test('Should return a message when the motorcycle license plate does not exist', async () => {
        const response =  await request(HOST).get(`/RuntService?placa=${MOTORCICLEPLATE404}`).send();
        const data = JSON.parse(response.text);
        expect(response.status).toBe(404);
        expect(data.error.message).toEqual(message404)
    })
 
    test('Should return a message when the motorcycle license plate is not valid', async () => {
        const response =  await request(HOST).get(`/RuntService?placa=${MOTORCICLEPLATEINVALID}`).send();
        const data = JSON.parse(response.text);
        expect(response.status).toBe(422);
        expect(data.error.message).toEqual(messageInvalid)
    }) 
})