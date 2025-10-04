import { useState, useEffect, useCallback } from 'react'
import { Container, Box, Typography, FormControl, InputLabel, Select, MenuItem, Grid, Paper, CircularProgress } from '@mui/material'
import axios from 'axios'
import dayjs from 'dayjs'
import './App.css'

const UK_CITIES = [
  { name: 'London', lat: 51.5074, lng: -0.1278 },
  { name: 'Birmingham', lat: 52.4862, lng: -1.8904 },
  { name: 'Manchester', lat: 53.4808, lng: -2.2426 },
  { name: 'Leeds', lat: 53.8008, lng: -1.5491 },
  { name: 'Glasgow', lat: 55.8642, lng: -4.2518 },
  { name: 'Liverpool', lat: 53.4084, lng: -2.9916 },
  { name: 'Edinburgh', lat: 55.9533, lng: -3.1883 },
  { name: 'Bradford', lat: 53.7960, lng: -1.7594 },
  { name: 'Sheffield', lat: 53.3811, lng: -1.4701 },
  { name: 'Leicester', lat: 52.6369, lng: -1.1398 }
]

function App() {
  const [selectedCity, setSelectedCity] = useState(UK_CITIES[0])
  const [prayerTimes, setPrayerTimes] = useState(null)
  const [loading, setLoading] = useState(false)
  const currentDate = dayjs()

  const fetchPrayerTimes = useCallback(async () => {
    setLoading(true)
    try {
      const response = await axios.get(
        `https://api.aladhan.com/v1/timings`,
        {
          params: {
            latitude: selectedCity.lat,
            longitude: selectedCity.lng,
            method: 2
          }
        }
      )
      setPrayerTimes(response.data.data.timings)
    } catch (error) {
      console.error('Error fetching prayer times:', error)
    } finally {
      setLoading(false)
    }
  }, [selectedCity])

  useEffect(() => {
    fetchPrayerTimes()
  }, [fetchPrayerTimes])

  const handleCityChange = (event) => {
    const city = UK_CITIES.find(c => c.name === event.target.value)
    setSelectedCity(city)
  }

  const formatTime = (time) => {
    return dayjs(`2000-01-01 ${time}`).format('h:mm A')
  }

  const prayerNames = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha']

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          UK Prayer Times
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          {currentDate.format('dddd, MMMM D, YYYY')}
        </Typography>
      </Box>

      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'center' }}>
        <FormControl sx={{ minWidth: 300 }}>
          <InputLabel id="city-select-label">Select City</InputLabel>
          <Select
            labelId="city-select-label"
            value={selectedCity.name}
            label="Select City"
            onChange={handleCityChange}
          >
            {UK_CITIES.map((city) => (
              <MenuItem key={city.name} value={city.name}>
                {city.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress />
        </Box>
      ) : prayerTimes ? (
        <Grid container spacing={3}>
          {prayerNames.map((prayer) => (
            <Grid item xs={12} sm={6} md={4} key={prayer}>
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  textAlign: 'center',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                  }
                }}
              >
                <Typography variant="h6" color="primary" gutterBottom>
                  {prayer}
                </Typography>
                <Typography variant="h4">
                  {formatTime(prayerTimes[prayer])}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      ) : null}
    </Container>
  )
}

export default App
