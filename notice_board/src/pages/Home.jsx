import React from 'react'
import React, { useState, useEffect } from "react";
import { Typography, Box, Container, Paper, Grid, Card, CardContent } from "@mui/material";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Carousel CSS

const Home = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [quote, setQuote] = useState("Believe you can, and you're halfway there.");

  const posts = [
    { type: "Announcement", content: "Team meeting at 3 PM in Room A." },
    { type: "Job Posting", content: "We’re hiring a Frontend Developer!" },
    { type: "General Info", content: "Annual retreat planned for March 15." },
  ];

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f5f5f5", display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <Box sx={{ bgcolor: "#1976d2", color: "white", py: 2, px: 3 }}>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h6">
              Lunch: 12:00 PM - 1:00 PM | Dinner: 7:00 PM - 8:00 PM
            </Typography>
            <Typography variant="subtitle1">Work Hours: 9:00 AM - 6:00 PM</Typography>
          </Grid>
          <Grid item>
            <Typography variant="h3" align="right">
              {currentTime.toLocaleTimeString()}
            </Typography>
            <Typography variant="subtitle2" align="right">
              {currentTime.toLocaleDateString()}
            </Typography>
          </Grid>
        </Grid>
      </Box>

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        {/* Quote of the Day */}
        <Paper elevation={3} sx={{ p: 3, mb: 4, textAlign: "center", bgcolor: "#e3f2fd" }}>
          <Typography variant="h5" fontWeight="bold">
            Quote of the Day
          </Typography>
          <Typography variant="h6" sx={{ mt: 2, fontStyle: "italic" }}>
            "{quote}"
          </Typography>
        </Paper>

        {/* Rotational Display */}
        <Paper elevation={3} sx={{ p: 3, bgcolor: "white" }}>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Updates
          </Typography>
          <Carousel autoPlay infiniteLoop interval={10000} showThumbs={false} showStatus={false}>
            {posts.map((post, index) => (
              <Card key={index} variant="outlined" sx={{ mx: 3, p: 3 }}>
                <CardContent>
                  <Typography variant="h6" fontWeight="bold">
                    {post.type}
                  </Typography>
                  <Typography variant="body1" sx={{ mt: 1 }}>
                    {post.content}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Carousel>
        </Paper>
      </Container>

      {/* Footer */}
      <Box sx={{ py: 2, bgcolor: "#eeeeee", textAlign: "center" }}>
        <Typography variant="caption">© 2025 Notification Board. All rights reserved.</Typography>
      </Box>
    </Box>
  );
};

export default Home;