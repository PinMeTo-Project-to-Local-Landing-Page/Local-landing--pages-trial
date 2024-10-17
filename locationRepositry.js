'use strict';

// import { parse } from './node_modules/csv-parse/lib/sync.js';
//import { parse } from './node_modules/csv-parse/dist/esm/sync.js';
//import {readFileSync} from 'fs';

const {parse} = require('csv-parse/sync'), {readFileSync} = require('fs');
//export {getStores}

const inputFile = './acme_Locations_2024-10-10.csv';

async function getStores() {
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

    const content = readFileSync(inputFile);
    const records = parse(content, {
        columns: true,
        delimiter: ',',
        skip_empty_lines: true
      });
      console.log('records',records);
    
    const data = records.map(x=> {
        return {
            storeId: x['Store Id'],
            city: x.City,
            state:x.State,

        }
    })
    console.log('data',data);

      return data;
}


getStores().then(result => {
    console.log(`got ${result.length} stores`);
    setTimeout(process.exit,10,0)
}).catch(err => {
    console.error(err);
    setTimeout(process.exit,10,1)

});