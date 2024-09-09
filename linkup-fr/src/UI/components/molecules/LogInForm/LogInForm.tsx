import { Box, Typography, styled } from "@mui/material";
import TextInput from "../../atoms/TextInput";
import MainButton from "../../atoms/MainButton";
import CustomLink from "../../atoms/CustomLink";

const LogInForm:React.FC=()=>{
    return(
        <Box component='form' onSubmit={()=>{}} sx={{display:'flex',flexDirection:'column',gap:'20px', alignItems:'center'}}>
            <Typography variant="h2" sx={{color:'var(--main-color)',fontFamily:'var(--main-font)',fontSize:'2rem', fontWeight:'500' }}>Welcome back</Typography>
            <TextInput label="Email" required onChange={()=>{}}></TextInput>
            <TextInput label="Password" type="password" required onChange={()=>{}}></TextInput>
            <CustomLink text="Forgot Password?" href="/recover-password"></CustomLink>
            <MainButton text="Log In" onClick={()=>{}}></MainButton>
            <Box component={'span'}>
                <Typography variant="body1" sx={{color:'var(--secondary-color)',fontFamily:'var(--main-font)'}}>Don't have an account? <CustomLink text="Sign up" href="/signup"></CustomLink></Typography>
            </Box>
        </Box>
    );
  };
  
  export default LogInForm;