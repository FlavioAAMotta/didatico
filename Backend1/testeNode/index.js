import {countries} from './countries.js';

const query = process.argv[2];

const result = countries.filter((country) =>
  country.name.toLowerCase().includes(query.toLowerCase())
);

console.table(result);