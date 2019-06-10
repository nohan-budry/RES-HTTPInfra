$(() => {
    console.log('Showing keeper');

    var cookie = $.cookie('STICKY');
    if (cookie) {
        var keeperID = Number(
            cookie
                .replace('http://', '')
                .replace(/:.*/, '')
                .replace(/\./g, '')
        );
        console.log('Keeper: ' + keeperID);

        $.getJSON('/api/adventurers/' + keeperID, keeper => {
            $('#labo_keeper').text(
                `Server keeper: ${keeper.name}, Lvl: ${keeper.level}`
            );
        });
    }
});
