import { useState, useEffect } from "react";


const useForm = (validate) => {
    const [ details] = useState({});
    var [data,setData]=useState()
    const [formValues, setFormValues] = useState(details);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
  

    const handleChange = (e,name) => {
    // const { name, value } = e.target;
    console.log(formValues);
    setFormValues({ ...formValues, [name]:e});

  };

  const handleSubmit = (e, type) => {
    e.preventDefault();
    switch (type) {
      case 1: console.log("Login Page");
        if (formValues.emailorusername && formValues.loginpassword) {
          setFormErrors(validate(formValues))
        }
        else {
          if (!formValues.emailorusername && !formValues.loginpassword) {
            let Error = { "loginundef": "Please fill all the fields!" }
            setFormErrors(Error)
          } else if (formValues.emailorusername && !formValues.loginpassword) {
            let Error = { "loginundef": "Please fill the valid password to proceed" }
            setFormErrors(Error)
          } else if (!formValues.emailorusername && formValues.loginpassword) {
            let Error = { "loginundef": "Please fill the valid email or username to proceed" }
            setFormErrors(Error)
          }
        }
        break;
      case 2: console.log("Sign Page");
        if (formValues.firstName && formValues.lastName && formValues.email && formValues.password && formValues.password2 && formValues.phonenumber) {
          setFormErrors(validate(formValues));
        }
        else {
          if (!formValues.firstName && formValues.lastName && formValues.email && formValues.password && formValues.password2 && formValues.phonenumber) {
            let Error = { "signundef": "First Name is required!" }
            setFormErrors(Error);
          }
          else if (!formValues.lastName && formValues.firstName && formValues.email && formValues.password && formValues.password2 && formValues.phonenumber) {
            let Error = { "signundef": "Last Name is required!" }
            setFormErrors(Error);
          }
          else if (!formValues.email && formValues.lastName && formValues.firstName && formValues.password && formValues.password2 && formValues.phonenumber) {
            let Error = { "signundef": "Email is required!" }
            setFormErrors(Error);
          }
          else if (!formValues.password && formValues.lastName && formValues.email && formValues.firstName && formValues.password2 && formValues.phonenumber) {
            let Error = { "signundef": "Password is required!" }
            setFormErrors(Error);
          }
          else if (!formValues.password2 && formValues.lastName && formValues.email && formValues.password && formValues.firstName && formValues.phonenumber) {
            let Error = { "signundef": "Confirm password is required!" }
            setFormErrors(Error);
          }
          // else if (!formValues.userName && formValues.lastName && formValues.email && formValues.password && formValues.password2 && formValues.firstName && formValues.phonenumber) {
          //   let Error = { "signundef": "User Name is required!" }
          //   setFormErrors(Error);
          // }
          else if (!formValues.phonenumber && formValues.lastName && formValues.email && formValues.password && formValues.password2 && formValues.firstName) {
            let Error = { "signundef": "Mobile Number is required!" }
            setFormErrors(Error);
          }
          else {
            let Error = { "signundef": "Please fill all the fields!" }
            setFormErrors(Error);
          }
        }
        break;
      case 3: console.log("Forgot Password");
        if (formValues.forgotemail !== undefined) {
          setFormErrors(validate(formValues));
        }
        else {
          let Error = { "forgotemail": "Email is required!" }
          setFormErrors(Error);
        }
        break;
    }
    console.log('formValues handlesubmit', formValues);
    //setFormErrors(validate(formValues));
    setIsSubmit(true);
    console.log("hello");
  };

    useEffect(() => {
    console.log(formErrors),"errors";
    if (Object.keys(formErrors).length === 0 && isSubmit) {
        console.log(formValues,'formValues'); 
      setData(formValues);
      console.log(data);
    }
  },[formErrors]);
  

   return { handleChange, details, handleSubmit,formErrors,data,formValues}

}
export default useForm;