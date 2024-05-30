const views = {
    form(country) {
        let action = '/countries',
            continent = '',
            name = '';

        if (country) {
            action = `/countries/${country.id}`;
            continent = country.continent;
            name = country.name;
        }

        return this._layout(`
        <form method="post" action=${action}>
            <div>
                Continent: <input type="text" name="country_continent" value="${continent}" />
            </div>
            <div>
                Country: <input type="text" name="country_name" value="${name}" />
            </div>
            <div>
                <button type="submit">Save</button>
            </div>
        </form>
        `);
    },
    list({countries, title}) {
        const liElements = countries.map(({id, name, continent}) => 
            `<li><a href="/countries/${id}">${continent} ${name}</a></li>`);

        return this._layout(`
            <h2>${title}</h2>
            <ul>
                ${liElements.join('')}
            </ul>
        `);
    },
    show({country}) {
        return this._layout(`
            <h2>
                ${country.continent} ${country.name}
            </h2>
        `);
    },
    _layout(content) {
        return `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Countries</title>
            <link rel="stylesheet" href="/assets/css/style.css" />
        </head>
        <body>
            ${ content }
        </body>
        </html>`;
    }
}

export const view = (name, data) => views[name](data);