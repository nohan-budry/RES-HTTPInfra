$(function() {
    console.log('Loading adventurers');

    function loadAdventurers() {
        $.getJSON('/api/adventurers/', function(adventurers) {
            console.log(adventurers);
            var message = 'Nobody is here';
            if (adventurers.length > 0) {
                message =
                    adventurers[0].name + ', Lvl: ' + adventurers[0].level;
            }
            $('#labo').text(message);
        });
    }

    loadAdventurers();
    setInterval(loadAdventurers, 2000);
});
