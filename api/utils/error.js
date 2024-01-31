export const errorHandler = (statusCode, message) => {
    console.log("error inocming")
    const error = new Error()
    error.message = message
    error.statusCode =statusCode
    console.log(error.message, error.statusCode)
    return error
}