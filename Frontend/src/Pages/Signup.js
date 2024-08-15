import * as React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";

import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import { createuser } from '../Services/service';

import axios from "axios";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import bg from "../Images/Background/signupbg.png";
import logo from '../Images/Logo/Logobook.jpg';
import "../Css/Signup.css";

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignUp(/*{onLogin} { toggleAuthMode }*/) {
  const [formData, setFormData] = useState({
    names: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [dis, setdis] = useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    // Collecting form data
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  
    // Validate form fields
    const validationErrors = validateForm(formData);
    setErrors(validationErrors);
  
    // If there are no errors, submit the form
    if (Object.keys(validationErrors).length === 0) {
      try {
        // Disabling the button while the request is being processed
        setdis(true);
  
        // Perform form submission logic here (e.g., calling createuser service)
        await createuser(formData);
  
        // Update user state in local storage
        const user = {
          name: formData.names,
          email: formData.email,
        };
        localStorage.setItem("user", JSON.stringify(user));
  
        // Redirect the user to the home page after successful sign-up
        nav("/home");
  
        console.log("Form submitted successfully!");
      } catch (error) {
        console.error("Error during form submission:", error);
        // Handle the error (e.g., show an error message to the user)
      } finally {
        // Re-enable the button after the request is done
        setdis(false);
      }
    }
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;

    //Update the form data state
    setFormData({
      ...formData,
      [name]: value,
    });

    //Clear the error for the current field
    setErrors({
      ...errors,
    });
  };

  const validateForm = (data) => {
    let errors = {};

    const regex = /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/;
    
    if(data.names.length<1)
      errors.names="Name required";
    //Validate email
    if (!data.email.trim()) {
      errors.email = "Email is required";
    }

    if (!regex.test(data.email)) {
      errors.email = "This is not a valid email format!";
    }

    //Validate password
    if (!data.password.trim()) {
      errors.password = "Password is required";
    }
    if (data.password.length < 4 && data.password.length > 0) {
      errors.password = "Password must be more than 4 characters";
    }
    if (data.password.length > 16) {
      errors.password = "Password cannot be more than 16 characters";
    }
    return errors;
  };
  const nav= useNavigate();

  

  return (
    <div className="signup"  style={{height:"100vh",
      backgroundColor: "#486a59",}}>
      <br></br>

      <div id="ad">
      <div className="Logoimg">
            <img
              src={logo}
              height={"220px"}
              width={"250px"}
              style={{ marginLeft: "20px" }}
            />
          </div>
      <ThemeProvider theme={defaultTheme}>
        <Container
          component="main"
          maxWidth="xs"
        >
          <CssBaseline />
            <center style={{marginLeft:"-30px"}}>
              <h1 style={{fontFamily:"serif"}}>Sign Up</h1>
            </center>
            <Box
              sx={{
                marginTop: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 1 }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="name"
                      label="Name"
                      style={{ fontWeight: "600" }}
                      name="names"
                      value={formData.names}
                      onChange={handleChange}
                      sx={{
                        input: { color: "black" },
                        label: { color: "black" },
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderColor: "white",
                            borderRadius: "50px",
                            borderWidth: "2px", // Customize the border color here
                          },
                          "&:hover fieldset": {
                            borderColor: "grey", // Customize the hover border color here
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "black", // Customize the focused border color here
                          },
                        },
                      }}
                    />
                    {errors.names && <p className="error" style={{color:"red",textAlign:"center"}}>{errors.names}</p>}
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      sx={{
                        input: { color: "black" },
                        label: { color: "black" },
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderRadius: "50px",
                            borderColor: "white",
                            borderWidth: "2px", // Customize the border color here
                          },
                          "&:hover fieldset": {
                            borderColor: "grey", // Customize the hover border color here
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "black", // Customize the focused border color here
                          },
                        },
                      }}
                    />
                    {errors.email && <p className="error" style={{color:"red",textAlign:"center"}}>{errors.email}</p>}
                  </Grid>
                  <Grid item xs={12} >
                    <TextField
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      value={formData.password}
                      onChange={handleChange}
                      sx={{
                        input: { color: "black" },
                        label: { color: "black" },
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderRadius: "50px",
                            borderColor: "white",
                            borderWidth: "2px", // Customize the border color here
                          },
                          "&:hover fieldset": {
                            borderColor: "grey",
                          },
                          "&:hover label": {
                            fontSize: "100px", // Customize the hover border color here
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "black", // Customize the focused border color here
                          },
                        },
                      }}
                    />
                    {errors.password && (
                      <p className="error" style={{color:"red",textAlign:"center"}}>{errors.password}</p>
                    )}
                  </Grid>
                </Grid>

                
                  <Button
                    type="submit"
                    variant="contained"
                    color="inherit"
                    style={{background:"transparent",fontWeight:"700",marginLeft:"50px"}}
                    sx={{ mt: 5, mb: 3, width: "50%"}}
                  >
                    SignUp
                  </Button>
                
                <Grid container justifyContent="flex-start">
                  <Grid item>
                    <Link href="/" variant="body2">
                      Already have an account? Sign in
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
            </Container>
            </ThemeProvider>
            </div>
    </div>
  );
}
