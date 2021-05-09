export default function validateInfo(values) {

    let errors ={}

    
    if (!values.email) {
        errors.email = "Email required"


    } else if (!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(values.email)) {
        errors.email = "Invalid email"

    }

    if (!values.password) {
        errors.password = "Password required"


    } else if  (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/.test(values.password)){
        errors.password = "Password must be at minimum 8 characters long and contain at least one lowercase character, one uppercase character, one numeric character and one special character"
    }

    if (!values.password2) {
        errors.password = "Password required"


    } else if  (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/.test(values.password)){
        errors.password2 = "Password must be at minimum 8 characters long and contain at least one lowercase character, one uppercase character, one numeric character and one special character"
    }

    if (values.password !== values.password2) {
        errors.password2 = "Passwords do not match"
    }

    if (!values.fname) {
        errors.fname = "First name required"


    } else if (!/^[\s\p{L}]+$/u.test(values.fname)) {
        errors.fname = "Invalid first name"
    }

    if (!values.lname) {
        errors.lname = "Last name required"


    } else if (!/^[\s\p{L}]+$/u.test(values.lname)) {
        errors.lname = "Invalid last name"
    }


    return errors;
}