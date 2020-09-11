import React,{useState} from "react";
import axios from "axios";
import * as yup from "yup";

// - [ ] Name
// - [ ] Email
// - [ ] Password
// - [ ] Terms of Service (checkbox)
// - [ ] A Submit button to send our form data to the server.

//formSchema for validation
const formSchema = yup.object().shape({
    name: yup
    .string().required("Input name!"),
    email: yup
    .string()
    .email("Input valid email")
    .required("Required email field"),
    password: yup
    .string()
    .min(6, "Password input must be 6 or more characters")
    .required("Required input password"),
    // terms: yup.boolean().oneOf([true],"Please agree to terms")
    terms: yup.boolean().oneOf([true], "Please agree to terms of use")
});

export default function Form() {
    const [users, setUsers] = useState({
        name:"",
        email:"",
        password:"",
        terms: false
    });

    // const [terms,setTerms] = useState(false);
    //to contain errors
    const [errors, setErrors] = useState({
        name:"",
        email:"",
        password:"",
        terms:""
    });

    const validate = e => {
        let value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    yup
    .reach(formSchema, e.target.name)
    .validate(value)
    .then(valid => {
        setErrors({...errors, [e.target.name]: ""});
    })
    .catch(err => {
        setErrors({...errors, [e.target.name]: err.errors[0]});
    });
    }
    

    const inputChange = e => {
        e.persist();
        console.log(e.target.value, e.target.checked);
        console.log("users : ", users);
        validate(e); 
        // let value = e.target.type ==="checkbox"?e.target.checked:e.target.value;
        // setUsers({...users, [e.target.name]:value});
        let value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setUsers({ ...users, [e.target.name]: value });
    };

    const formSubmit = e => {
        e.preventDefault();
        console.log("Form Submitted !");
        axios
        .post("https://reqres.in/api/users", users)
        .then(res => {
            console.log("res data: ", res);
        })
        .catch(err => {
            console.log("err data: ", err);
        });
    };

    return (
        <form onSubmit = {formSubmit}>
            <label htmlFor = "name">Name </label>
            <input 
            type = "text"
            name = "name"
            id = "name"
            value = {users.name}
            onChange = {inputChange}
            />
            {errors.name.length > 0 ? (
            <p className = "error">{errors.name}</p>)
             : null}
            
            <label htmlFor = "email">Email</label>
            <input 
            type = "text"
            name = "email"
            id = "email"
            value = {users.email}
            onChange = {inputChange}
            />
            {errors.email.length > 0 ? (
                <p className="error">{errors.email}</p>
              ) : null}
      

            <label htmlFor = "password">Password</label>
            <input 
            type = "text"
            name = "password"
            id = "password"
            value = {users.password}
            onChange = {inputChange}
            />
            {errors.password.length > 0 ? (
                <p className="error">{errors.password}</p>
              ) : null}
            
            <label htmlFor = "terms">Terms & Condition</label>
            <input 
            type = "checkbox"
            name = "terms"
            id = "terms"
            checked = {users.terms}
            // onChange = {(event) =>setTerms(!terms)}
            onChange = {inputChange}
            />
            {errors.terms.length > 0 ? (
                <p className="error">{errors.terms}</p>
              ) : null}

            <button type = "submit">Submit</button>
        </form>
    )
}