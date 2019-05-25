const express = require('express');
const Chance = require('chance');

class Pet {
    constructor(type) {
        const chance = new Chance(type);

        this.type = type;
        this.strength = chance.integer({ min: 0, max: 100 });
    }
}

class Adventurer {
    constructor(id) {
        const chance = new Chance(id);

        this.id = id;
        this.name = chance.name();
        this.level = chance.integer({ min: 1, max: 100 });
        this.health = chance.integer({ min: 1, max: 10 }) * this.level;
        this.strength = chance.integer({ min: 1, max: 5 }) * this.level;
        this.pet = new Pet(chance.animal());
    }
}

const app = express();

app.get('/adventurers', (req, res) => {
    const chance = new Chance();
    var adventurers = [];

    for (var i = 0; i < 10; ++i) {
        adventurers[i] = new Adventurer(chance.integer({ min: 0 }));
    }

    res.send(JSON.stringify(adventurers));
});

app.get('/adventurers/:id', (req, res) => {
    const id = Number(req.params.id);

    if (isNaN(id) || !Number.isInteger(id) || id < 0) {
        res.send('{}');
        return;
    }

    res.send(JSON.stringify(new Adventurer(id)));
});

app.listen(3000, () => {
    console.log('App listening on port 3000!');
});
