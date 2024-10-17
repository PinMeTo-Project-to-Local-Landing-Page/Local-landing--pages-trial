const { convertArrayToCSV } = require('convert-array-to-csv');
const fs = require ('fs');


const header = ['number', 'first', 'last', 'handle'];
const stores = [
    {
        name: "LAKRIDS BY BÜLOW Frankfurt Airport",
        address: "FRA Terminal 1, Bereich B, Ebene 2, Gates ...",
        city: "Frankfurt",
        postalCode: "60549",
        hours: "Open now 08:00 - 18:00",
        lat: 50.0379,
        lng: 8.5622
    },
    {
        name: "LAKRIDS BY BÜLOW Bikini Berlin",
        address: "Budapester Straße 38-50",
        city: "Berlin",
        postalCode: "10787",
        hours: "Closed now - Opens at 11:00",
        lat: 52.5055,
        lng: 13.3376
    },
    {
        name: "LAKRIDS BY BÜLOW KaDeWe",
        address: "Tauentzienstraße 21-24",
        city: "Berlin",
        postalCode: "10789",
        hours: "Open now 10:00 - 20:00",
        lat: 52.5014,
        lng: 13.3411
    },
    {
        name: "LAKRIDS BY BÜLOW Carlsplatz",
        address: "Carlsplatz",
        city: "Düsseldorf",
        postalCode: "40213",
        hours: "Open now 10:00 - 18:00",
        lat: 51.2254,
        lng: 6.7763
    }
];
const csvFromArrayOfArrays = convertArrayToCSV(stores, {
    header,
    separator: ','
  });


  fs.writeFile('output.csv', csvFromArrayOfArrays, err => {
    if (err) {
        console.log(18,err);
    }
    console.log('csv file saved successfuly!');
    
  })