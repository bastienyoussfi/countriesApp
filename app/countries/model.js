let id = 1;
const getId = () => id++;

const countries = [
    {id: getId(), name: 'France', continent: 'Europe', population: 70},
    {id: getId(), name: 'Japan', continent: 'Asia', population: 170},
    {id: getId(), name: 'Netherlands', continent: 'Europe', population: 17}
];

export function getAll() {
    return Promise.resolve(countries);
}

export function getById(id) {
    const country = countries.find(c => c.id === id);
    return Promise.resolve(country);
}

export function getByContinent(continent) {
    const found = countries.filter(c => c.continent.toLowerCase() === continent.toLowerCase());
    return Promise.resolve(found);
}

export function addCountry(continent, name) {
    const country = {
        id: getId(),
        name: name,
        continent: continent,
        population: 0
    };

    countries.push(country);

    return Promise.resolve(country);
}

export function saveCountry(country) {
    return Promise.resolve(true);
}

export function removeCountry(country) {
    const index = countries.indexOf(country);

    countries.splice(index, 1);

    return Promise.resolve(true);
}