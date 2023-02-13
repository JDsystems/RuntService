module.exports = class ValidationErrorRequest  extends Error{
    constructor(message, status){
        super(message)
        this.name = 'ValidationErrorRequest'
        this.status = status
    }
}