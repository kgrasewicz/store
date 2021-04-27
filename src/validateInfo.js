export default function validateInfo(values) {

    let errors ={}

    
    if (!values.email) {
        errors.email = "Email required"


    } else if (!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(values.email)) {
        errors.email = "Invalid email"

    }

    if (!values.password) {
        errors.password = "Password required"


    } 


    if (!values.name) {
        errors.name = "Name required"


    }

    if (!values.surname) {
        errors.surname = "Surname required"


    }


    return errors;
}