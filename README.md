 UK Cites Time Prayers app

A fast, responsive React app for checking Islamic prayer times across major UK cities.  
Built with Vite, React, Material UI (MUI v2 Grid), Axios, and Day.js.


 Features
- City selector for popular UK cities ( London, Manchester, Liverpool, etc.).
- Live Islamic prayer timings fetched from [AlAdhan API](https://aladhan.com/prayer-times-api).
- Clean Material UI layout with responsive Grid 
- Countdown timer to the next prayer (Fajr, Dhuhr, Asr, Maghrib, Isha).
- Local time and date displayed using Day.js.
- Accessible, keyboard-friendly UI with sensible aria labels.
- Error and loading states with helpful messages.


Tech Stack
- Frontend: React + Vite
- UI: Material UI (MUI v2 components & Grid v2)
- HTTP: Axios
- Date/Time: Day.js (+ plugins: isSameOrAfter, isSameOrBefore)
- Tooling: ESLint + Prettier (optional)


Getting Started

Prerequisites
- Node.js v18+ and npm or **yarn


- Install dependencies
npm install
or
yarn


- App runs on `http://localhost:5173` by default (Vite).


 Prayer Times API (AlAdhan)
Prayer times are fetched using [AlAdhan API](https://aladhan.com/prayer-times-api). Example:

--jsv--
import axios from "axios";

export async function getPrayerTimes(city) {
  const url = `https://api.aladhan.com/v1/timingsByCity?city=${city}&country=GB&method=2`;
  const { data } = await axios.get(url);
  return data.data.timings; // { Fajr, Dhuhr, Asr, Maghrib, Isha }
}



Material UI Grid v2 Notes
- Use `container` on the parent grid.
- Do _not_ use `item` or `xs`/`md` props in v2.
- Use `size` instead (single value or object):
```jsx
<Grid container spacing={3}>
  <Grid size={{ xs: 12, md: 6 }}>...</Grid>
  <Grid size={{ xs: 12, md: 6 }}>...</Grid>
</Grid>

- Valid `spacing` is typically `0–10`.


Localization (Optional)
- If you display Arabic dates, configure Day.js locale:
--js --
import dayjs from "dayjs";
import "dayjs/locale/ar";
dayjs.locale("ar");
```
- Consider RTL support in MUI if you target Arabic UI.


Screenshots
Add screenshots to `public/images/` and reference here:
![Home](public/images/screenshot-home.png)


 Roadmap
- Add monthly prayer calendar view
- Notification/reminder before each prayer
- Light/Dark theme toggle
- PWA offline support


 Contributing
PRs are welcome! Please open an issue to discuss major changes.


License
MIT — feel free to use this project as a starter.


Acknowledgements
- Prayer data by [AlAdhan API](https://aladhan.com/prayer-times-api)
- UI components by [MUI](https://mui.com/)
- Bundled with [Vite](https://vitejs.dev/)
