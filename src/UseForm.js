import {useState} from 'react';


const useForm = validate => {
    const [values, setValues]= useState({
        email: '',
        phone: '',
        fname: '',
        lname: '',
        password: ''

    })

    const [errors, setErrors] = useState({})

    const handleChange = e => {

        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
        console.log(values)
    }

    const handleSubmit = e => {

        setErrors(validate(values));
        console.log(values)
    }

    return {handleChange, values, handleSubmit, errors}
}

export default useForm;