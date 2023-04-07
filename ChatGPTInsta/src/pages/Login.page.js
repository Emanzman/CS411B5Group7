import { Button, TextField } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/user.context";
 
const Login = () => {
 const navigate = useNavigate();
 const location = useLocation();
 
 // Set user values here
 const { user, fetchUser, emailPasswordLogin } = useContext(UserContext);
 
 // This is to keep track of values in the form
 const [form, setForm] = useState({
   email: "",
   password: ""
 });
 
 // When the user edits the form, this gets called
 const onFormInputChange = (event) => {
   const { name, value } = event.target;
   setForm({ ...form, [name]: value });
 };
 
 // Redirection
 const redirectNow = () => {
   const redirectTo = location.search.replace("?redirectTo=", "");
   navigate(redirectTo ? redirectTo : "/");
 }
 
 // User login checker to make sure they go to the main page if they've already logged in
 const loadUser = async () => {
   if (!user) {
     const fetchedUser = await fetchUser();
     if (fetchedUser) {
        redirectNow();
     }
   }
 }
 
 // Verification if user is logged in or not
 useEffect(() => {
   loadUser();
 }, []);
 
 // Function that gets called once user logs in
 const onSubmit = async (event) => {
   try {
     // Validation of user credentials
     const user = await emailPasswordLogin(form.email, form.password);
     if (user) {
       redirectNow();
     }
   } catch (error) {
       if (error.statusCode === 401) {
          alert("Invalid username/password. Try again!");
      } else {
          alert(error);
      }
 
   }
 };
 
 return <form style={{ display: "flex", flexDirection: "column", maxWidth: "300px", margin: "auto"}}>
   <h1>Login to the GPT-IG Suggester</h1>
   <TextField
     label="Email address"
     type="email"
     variant="outlined"
     name="email"
     value={form.email}
     onChange={onFormInputChange}
     style={{ marginBottom: "1rem" }}
   />
   <TextField
     label="Password"
     type="password"
     variant="outlined"
     name="password"
     value={form.password}
     onChange={onFormInputChange}
     style={{ marginBottom: "1rem" }}
   />
   <Button variant="contained" color= "success" onClick={onSubmit}>
     Login
   </Button>
   <p>New user? <Link to="/signup">Signup</Link></p>
 </form>
}
 
export default Login;