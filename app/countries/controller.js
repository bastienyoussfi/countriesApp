import { getAll, getById, getByContinent, addCountry, saveCountry, removeCountry } from "./model.js";
import { view } from "./view.js";

export async function createCountry(req, res) {
    res.send(
        view('form')
    );
}

export async function listCountries(req, res) {
    const countries = await getAll();
    res.send(
        view('list', {
            countries,
            title: 'Every country'
        })
    );
}

export async function showCountry(req, res) {
    const id = parseInt(req.params.id, 10);

    if (id) {
        const country = await getById(id);
        if (!country) {
            res.send(404);
        } else {
            res.send(
                view('show', {country})
            );
        }
    } else {
        const found = await getByContinent(req.params.id);

        if (found.length === 0) {
            res.send(404);
        } else {
            res.send(
                view('list', {
                    countries: found,
                    title: `Countries in ${found[0].continent}`
                })
            );
        }
    }
}

export async function storeCountry(req, res) {
    const {country_continent, country_name} = req.body;

    if (country_continent && country_name) {
        await addCountry(country_continent, country_name);
        res.redirect('/countries');
    } else {
        res.redirect('/countries/create');
    }
}

export async function editCountry(req, res) {
    const id = parseInt(req.params.id, 10);

    if (!id) {
        res.send(404);
        return;
    }

    const country = await getById(id);

    if (!country) {
        res.send(404);
        return;
    }

    res.send(
        view('form', country)
    );
}

export async function updateCountry(req, res) {
    const id = parseInt(req.params.id, 10);

    if (!id) {
        res.send(404);
        return;
    }

    const country = await getById(id);

    if (!country) {
        res.send(404);
        return;
    }

    const {country_continent, country_name} = req.body;

    if (country_continent && country_name) {
        country.continent = country_continent;
        country.name = country_name;
        
        await saveCountry(country);
        res.redirect(`/countries/${id}`);
    } else {
        res.redirect(`/countries/${id}`);
    }
}

export async function deleteCountry(req, res) {
    const id = parseInt(req.params.id, 10);

    if (!id) {
        res.send(404);
        return;
    }

    const country = await getById(id);

    if (!country) {
        res.send(404);
        return;
    }

    await removeCountry(country);
    res.redirect('/countries');
}