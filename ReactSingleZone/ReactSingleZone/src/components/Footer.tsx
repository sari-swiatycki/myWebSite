import React from "react";
import { Box, Container, Grid, Typography, IconButton, Divider, Link } from "@mui/material";
import { Facebook, Instagram, Twitter, YouTube, LocationOn, Phone, Email } from "@mui/icons-material";

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#000",
        color: "#fff",
        py: 4,
        mt: 4,
      }}
    >
      <Container>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              My Music App
            </Typography>
            <Typography variant="body2" color="gray">
              &copy; {new Date().getFullYear()} All rights reserved.
            </Typography>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Contact Us
            </Typography>
            <Box display="flex" alignItems="center" gap={1}>
              <LocationOn />
              <Typography variant="body2">123 Music Street, Tel Aviv, Israel</Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={1}>
              <Phone />
              <Typography variant="body2">+972-50-1234567</Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={1}>
              <Email />
              <Typography variant="body2">support@mymusicapp.com</Typography>
            </Box>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Follow Us
            </Typography>
            <Box>
              <IconButton href="#" sx={{ color: "#fff" }}>
                <Facebook />
              </IconButton>
              <IconButton href="#" sx={{ color: "#fff" }}>
                <Instagram />
              </IconButton>
              <IconButton href="#" sx={{ color: "#fff" }}>
                <Twitter />
              </IconButton>
              <IconButton href="#" sx={{ color: "#fff" }}>
                <YouTube />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
        
        <Divider sx={{ backgroundColor: "gray", my: 3 }} />
        
        <Box textAlign="center">
          <Typography variant="body2" color="gray">
            <Link href="#" color="inherit" underline="hover">Privacy Policy</Link> | 
            <Link href="#" color="inherit" underline="hover"> Terms of Service</Link>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
