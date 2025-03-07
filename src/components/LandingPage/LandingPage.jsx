import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import landingImage from "../../images/landingImage.png";
import { Container, Grid, Typography, Button, Box } from "@mui/material";
import "./LandingPage.css";


// CUSTOM COMPONENTS
import RegisterForm from "../RegisterForm/RegisterForm";

function LandingPage() {
  const [heading, setHeading] = useState("");
  const history = useHistory();

  const onLogin = (event) => {
    history.push("/login");
  };

  return (
    <Box
    sx={{
      height: "100vh", 
      display: "flex",
      flexDirection: "column",
    }}
  >
    {/* Heading Section */}
    <Box
        // sx={{
        //   position: "absolute",
        //   top: 0,
        //   left: 0,
        //   right: 0,
        //   backgroundColor: "rgba(0, 128, 0, 0.8)", 
        //   padding: "1px",
        //   textAlign: "center",
        //   color: "white",
        //   zIndex: 2,
        // }}
      >
        <Typography variant="h2">{heading}</Typography>
      </Box>

    {/* Background Image Section */}
    <Box
      sx={{
        flex: 1, 
        position: "relative",
        backgroundImage: `url(${landingImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        paddingTop: "900px"
        
      }}
    >
      {/* Overlay Content */}
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "50%",
          alignItems: "flex-start",
          backgroundColor: "rgba(0, 0, 0, 0)",  
          padding: "0px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Container sx={{
        mt: 0,
      }}
    >
          <Grid container spacing={0}>
            <Grid item xs={12} md={8}>
              {/* Optional additional content */}
            </Grid>
            <Grid item xs={12} md={4}>
              <RegisterForm />
              <Box textAlign="center" mt={.2}>
                <Typography variant="h6" color="white" sx={{
                  textShadow: '1px 1px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000',
                }} >
                  Already a Member?
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={onLogin}
                  sx={{ mt: 0.1, mb: 5}}
                >
                  Login
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  </Box>
);
}

export default LandingPage;
