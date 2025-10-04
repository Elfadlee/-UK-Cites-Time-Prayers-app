




function getTimePrayersBySelected(){
let citiesList = [
   {
    name: "Liverpool",
    code: "LIV",
  },
  {
    name: "Bangor",
    code: "GWN",
  },
  {
    name: "Belfast",
    code: "BFS",
  },
  {
    name: "Birmingham",
    code: "BIR",
  },
  {
    name: "Bristol",
    code: "BST",
  },
  {
    name: "Cardiff",
    code: "CRF",
  },
  {
    name: "Derry",
    code: "DRS",
  },
  {
    name: "Edinburgh",
    code: "EDH",
  },
  {
    name: "Glasgow",
    code: "GLG",
  },
  {
    name: "Leeds",
    code: "LDS",
  },
 
  {
    name: "London",
    code: "LND",
  },
  {
    name: "Manchester",
    code: "MAN",
  },
  {
    name: "Newcastle",
    code: "NET",
  },
  {
    name: "Nottingham",
    code: "NGM",
  },
  {
    name: "Sheffield",
    code: "SHF",
  },
  {
    name: "Swansea",
    code: "SWA",
  },
];


for (let city of citiesList) {
  let contact = `<option class="optId">${city.name}</option>`;
  document.getElementById("selectlist").innerHTML += contact;
}
document.getElementById("selectlist").addEventListener("change", function () {
  let cityName = "";

  for (let city of citiesList) {
    if (city.name == this.value) {
      cityName = city.code;
      document.getElementById("titleId").innerHTML = city.name;
    }
  }

  getPrayersTimeBycity(cityName);
});

}

function getPrayersTimeBycity(city) {
  let params = {
    country: "GB",
    city: city,
  };

  axios
    .get("https://api.aladhan.com/v1/timingsByCity", {
      params: params,
    })
    .then(function (response) {
      let prayersTime = response.data.data.timings;
      let dateOfPrayer = response.data.data.date.readable;
      let weekDay = response.data.data.date.gregorian.weekday.en;

      let mapping = {
        "sunrise-ID": "Sunrise",
        "fajar-Id": "Fajr",
        "Dhuhr-Id": "Dhuhr",
        "Asr-id": "Asr",
        "Maghrib-Id": "Maghrib",
        "Isha-Id": "Isha",
      };

      for (let id in mapping) {
        document.getElementById(id).innerHTML = prayersTime[mapping[id]];
      }

      document.getElementById("date-Id").innerHTML = weekDay + ",";
      document.getElementById("day-Id").innerHTML = dateOfPrayer;
    })
    .catch(function (error) {
      console.log(error);
    });
}

getPrayersTimeBycity("LIV");
getTimePrayersBySelected()



