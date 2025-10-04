import * as React from 'react';
import { useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import MediaCard from './CardPrayer.jsx';
import Stack from '@mui/material/Stack';
import { Divider } from '@mui/material';
import axios from 'axios';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";


// times plugins

dayjs.extend(isSameOrAfter);


export default function MainPage() {

  const [timings, setTimings] = React.useState(
    {
      Fajr: "--:--",
      Dhuhr: "--:--",
      Asr: "--:--",
      Maghrib: "--:--",
      Isha: "--:--",
    }
  );



  const [selectedCity, setSelectedCity] = React.useState({
    displayName: "Liverpool",
    apiName: "Liverpool",
  });

  const [date, setDate] = React.useState({ date: "", time: "" });
  const [nextPrayerObj, setNextPrayerObj] = React.useState({
    nextPrayerName: "",
    countdown: ""
  });

  let citiesList = [
    {
      displayName: "Liverpool",
      apiName: "Liverpool",
    },
    {
      displayName: "Bangor",
      apiName: "Bangor",
    },
    {
      displayName: "Belfast",
      apiName: "Belfast",
    },
    {
      displayName: "Birmingham",
      apiName: "Birmingham",
    },
    {
      displayName: "Bristol",
      apiName: "Bristol",
    },
    {
      displayName: "Cardiff",
      apiName: "Cardiff",
    },
    {
      displayName: "Derry",
      apiName: "Derry",
    },
    {
      displayName: "Edinburgh",
      apiName: "Edinburgh",
    },
    {
      displayName: "Glasgow",
      apiName: "Glasgow",
    },
    {
      displayName: "Leeds",
      apiName: "Leeds",
    },

    {
      displayName: "London",
      apiName: "London",
    },
    {
      displayName: "Manchester",
      apiName: "Manchester",
    },
    {
      displayName: "Newcastle",
      apiName: "Newcastle",
    },
    {
      displayName: "Nottingham",
      apiName: "Nottingham",
    },
    {
      displayName: "Sheffield",
      apiName: "Sheffield",
    },
    {
      displayName: "Swansea",
      apiName: "Swansea",
    },
  ];


  const GetData = React.useCallback(async () => {
    try {
      const response = await axios.get(`https://api.aladhan.com/v1/timingsByCity?city=${selectedCity.apiName}&country=GB&method=2`);
      setTimings(response.data.data.timings);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, [selectedCity]);

  useEffect(() => {
    GetData();
  }, [selectedCity, GetData]);

  useEffect(() => {
    const timer = setInterval(() => {
      setupDowntime(timings);
    }, 1000);
    const NowDate = dayjs();
    setDate({ date: NowDate.format("DD MMMM YYYY"), time: NowDate.format("HH:mm") });

    return () => clearInterval(timer);
  }, [timings]);



  const setupDowntime = (timings) => {
    const now = dayjs();
    let nextPrayerTime = null;
    let nextPrayerName = null;

    const prayerNames = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];

    // Check today's prayers
    prayerNames.forEach((prayer) => {
      const prayerTime = dayjs(`${now.format("YYYY-MM-DD")} ${timings[prayer]}`);
      if (
        prayerTime.isSameOrAfter(now) &&
        (!nextPrayerTime || prayerTime.isBefore(nextPrayerTime))
      ) {
        nextPrayerTime = prayerTime;
        nextPrayerName = prayer;
      }
    });

    // If no prayer left today - fallback to tomorrow's Fajr

    if (!nextPrayerTime) {
      const tomorrow = now.add(1, "day").format("YYYY-MM-DD");
      nextPrayerTime = dayjs(`${tomorrow} ${timings["Fajr"]}`);
      nextPrayerName = "Fajr";
    }

    const totalSeconds = nextPrayerTime.diff(now, "seconds");

    const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
    const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
    const seconds = String(totalSeconds % 60).padStart(2, "0");

    const countdown = `${hours}:${minutes}:${seconds}`;


    setNextPrayerObj({ nextPrayerName, countdown });



  };

  const handleCityChange = (event) => {

    const CityObjct = citiesList.find((city) => city.apiName === event.target.value);

    setSelectedCity(CityObjct);
  };


  return (
    
    <>

    
      <Grid container spacing={80} >

          <Grid size={{ xs: 12, md: 6 }}>
          <div >
            <Typography variant="h5" component="div" gutterBottom sx={{ color: `white`, fontSize: '15px', textAlign: 'left' }}>
              {date.date} | {date.time}
            </Typography>

            <Typography variant="h3" component="div" gutterBottom sx={{
              color: `white`,
              fontWeight: 'bold', textAlign: 'left'
            }}>
              {selectedCity.displayName}
            </Typography>
          </div>
        </Grid>


          <Grid size={{ xs: 12, md: 6 }}>

          <div style={{ flexDirection: 'column', width: '100%', textAlign: 'center', color: 'white' }}>

            <Typography variant="h5" component="div" gutterBottom sx={{ fontSize: '15px' }}>
              Time left for {nextPrayerObj.nextPrayerName} prayer
            </Typography>

            <Typography variant="h3" component="div" gutterBottom sx={{ color: `white`, fontWeight: 'bold' }}>
              {nextPrayerObj.countdown}
            </Typography>

          </div>
        </Grid>


      </Grid>

      <Divider sx={{ backgroundColor: '#29b6f6', marginBottom: '20px' }} />

      <Stack spacing={3} direction="row" >
        
        <MediaCard name="Fajr" time={timings.Fajr} image="/images/Fajr.png" />
        <MediaCard name="Dhuhr" time={timings.Dhuhr} image="/images/Dhuhr.png" />
        <MediaCard name="Asr" time={timings.Asr} image="/images/Asr.png" />
        <MediaCard name="Maghrib" time={timings.Maghrib} image="/images/Maghrib.png" />
        <MediaCard name="Isha" time={timings.Isha} image="/images/Isha.png" />


      </Stack>

      <div>
        <FormControl sx={{ minWidth: 200, color: "#fdfbfbff", fontFamily: 'Mozilla Headline', marginTop: 6 }}>
          <InputLabel id="demo-simple-select-helper-label" style={{ color: 'white', fontSize: '15px' }}>City</InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={selectedCity.displayName}
            label="City"
            onChange={handleCityChange}
            sx={{ color: 'white' }}
          >
            {citiesList.map((city) => (
              <MenuItem value={city.apiName} >{city.displayName}</MenuItem>

            ))}

          </Select>
        </FormControl>

      </div>


    </>
  );
}