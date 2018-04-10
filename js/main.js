jQuery(document).ready(function() {$(document).ready(function() { //Calculate price on the fly
    var slider = $('#chance-slider'),
        output = $('#year'),
        price = $('#price'),
        chanceCard = $('#chance'),
        chanceMessage = $('#message'),
        cardTitle = chanceCard.children().first();

    //Click on Chance card to show a random card.

    chanceCard.on('click', function() {
        slider.val(2000); //initialise slider year to 2000

        $.getJSON("/student/acsf713/data/chance.json", function(data) {
            var l = data.length,
                currentCard = {},
                div,
                img,
                finalWrapper = $('#jquery-wrapper'),
                imgWrapper = $('#property-wrapper');

            //Select a random card
            randomNumber = Math.floor(Math.random() * l);
            currentCard = data[randomNumber];
            chanceCard.css('background-image', 'none');
            chanceMessage.text(currentCard.message);
            cardTitle.text("Chance");

            //First check to see if there is an image. Show image, else update exiting one.

            if (imgWrapper.children().length !== 1) {
                $('#property-img').attr({ "src": currentCard.img, "alt": currentCard.alt });
            } else {
                img = $('<img>');
                img.attr({ "src": currentCard.img, "alt": currentCard.alt, "id": "property-img" });
                imgWrapper.append(img);
            }

            //Show the property
            finalWrapper.slideDown('slow');


            //Update the card price using the Nationwide ratios

            function getPrice() {
                $.getJSON("/student/acsf713/data/nationwide.json", function(data) {
                    //console.log("accessed json data");
                    $.each(data, function(i, item) {
                        if (item.year == slider.val()) {
                            var newPrice = item.ratio * currentCard.price;
                            var roundPrice = Math.round(newPrice * 0.1) * 10;
                            console.log("ratio is " + item.ratio + " year is " + item.year + "slider value is " + slider.val() + 'card price is ' + currentCard.price);
                            price.text(roundPrice);
                            output.text(slider.val());
                            return false;
                        }

                    });
                });
            }

            getPrice();

            // Update the values when the slider moves.

            slider.on('change', function() {
                getPrice();
            });

        });

    });


});

// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeline', 'timelineEnd', 'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

// Place any jQuery/helper plugins in here.
});