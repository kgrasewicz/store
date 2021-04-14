export default function validateInfo(values) {

    let errors ={}

    
    if (!values.email) {
        errors.email = "Email required"


    } else if (!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(values.email)) {
        errors.email = "Invalid email"

    }


    return errors;
}