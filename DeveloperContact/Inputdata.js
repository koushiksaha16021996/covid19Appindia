export const onSubmit = values => {
    alert("submitted")
};

export const initialValues = {
    name: "",
    email: "",
    message: "",
}
export const validate = values => {
    // should return a object having errors
    // values.username values.email values.password
    // error.username error.email error.password
    const { username, email, password } = values
    const emailRegex = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i
    let error = {}

    if (!username) {
        error.username = "username is required"
    }

    if (!email) {
        error.email = "email is required"
    } else if (!emailRegex.test(values.email)) {
        error.email = "enter a valid email"
    }

    if (!password) {
        error.password = "password is required"
    }

    console.log(error)
    return error
}
