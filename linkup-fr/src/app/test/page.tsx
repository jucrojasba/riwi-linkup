"use client";
import MobileNavbar from "@/UI/components/molecules/MobileNavbar/MobileNavbar";
import { Box } from "@mui/material";


export default function TestView() {
  return (
    <Box sx={{backgroundColor:'black'}}>
      <MobileNavbar isDarkMode={false}/>
    </Box>
  );
}
