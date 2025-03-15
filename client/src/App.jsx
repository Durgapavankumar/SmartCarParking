import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  AppBar, Toolbar, Typography, Container, Grid, Paper, 
  Button, Card, CardContent, Chip, Box, Alert 
} from '@mui/material';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import LocalParkingIcon from '@mui/icons-material/LocalParking';

const MOCK_SLOTS = [
  { id: 1, slotNumber: "A-101", isOccupied: false, type: "COMPACT", pricePerHour: 5.0 },
  { id: 2, slotNumber: "A-102", isOccupied: true, type: "REGULAR", pricePerHour: 7.0 },
  { id: 3, slotNumber: "A-103", isOccupied: false, type: "REGULAR", pricePerHour: 7.0 },
  { id: 4, slotNumber: "B-101", isOccupied: false, type: "DISABLED", pricePerHour: 4.0 },
  { id: 5, slotNumber: "B-102", isOccupied: true, type: "REGULAR", pricePerHour: 7.0 },
  { id: 6, slotNumber: "B-103", isOccupied: false, type: "COMPACT", pricePerHour: 5.0 },
];

function App() {
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    // Attempt fetch, fallback to mock
    axios.get('http://localhost:8080/api/slots')
      .then(res => {
        setSlots(res.data);
        setLoading(false);
      })
      .catch(() => {
        console.log("Using mock data");
        setSlots(MOCK_SLOTS);
        setLoading(false);
      });
  }, []);

  const handleBook = (id) => {
    // Optimistic update for demo
    setSlots(prev => prev.map(s => s.id === id ? { ...s, isOccupied: true } : s));
    setNotification("Slot booked successfully!");
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <Box sx={{ flexGrow: 1, bgcolor: '#f5f5f5', minHeight: '100vh' }}>
      <AppBar position="static">
        <Toolbar>
          <LocalParkingIcon sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Smart Parking System
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 4 }}>
        {notification && <Alert severity="success" sx={{ mb: 2 }}>{notification}</Alert>}
        
        <Typography variant="h4" gutterBottom>
          Live Parking Availablity
        </Typography>

        <Grid container spacing={3}>
          {slots.map((slot) => (
            <Grid item xs={12} sm={6} md={4} key={slot.id}>
              <Card sx={{ 
                borderLeft: slot.isOccupied ? '6px solid #f44336' : '6px solid #4caf50',
                transition: '0.3s',
                '&:hover': { transform: 'scale(1.02)' }
              }}>
                <CardContent>
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="h5" component="div">
                      {slot.slotNumber}
                    </Typography>
                    <Chip 
                      label={slot.isOccupied ? "OCCUPIED" : "AVAILABLE"} 
                      color={slot.isOccupied ? "error" : "success"} 
                      size="small" 
                    />
                  </Box>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {slot.type} • ${slot.pricePerHour}/hr
                  </Typography>
                  
                  <Box display="flex" justifyContent="center" my={2}>
                    <DirectionsCarIcon sx={{ fontSize: 60, color: slot.isOccupied ? '#f44336' : '#bdbdbd' }} />
                  </Box>

                  <Button 
                    variant="contained" 
                    fullWidth 
                    disabled={slot.isOccupied}
                    onClick={() => handleBook(slot.id)}
                  >
                    {slot.isOccupied ? "Booked" : "Book Slot"}
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default App;
