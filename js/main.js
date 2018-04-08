$(document).ready(function() { //Calculate price on the fly
var slider = $('#chance-slider'),
    output = $('#year'),
    price = $('#price'),
    chanceCard = $('#chance'),
    chanceMessage = $('#message');




console.log(chanceCard);

//Click on Chance card to show a random card.

chanceCard.on('click', function() {
    slider.val(2000); //initialise slider year to 2000

    $.getJSON("/student/acsf713/data/chance.json", function(data) {
        console.log("accessed monop  data");

        //pick a random card
        var l = data.length;
        randomNumber = Math.floor(Math.random() * l);
        console.log("random is " + randomNumber);
        var currentCard = data[randomNumber];
        chanceMessage.text(currentCard.message);

        //Update the card price using the Nationwide ratios

        function getPrice() {
            $.getJSON("/student/acsf713/data/nationwide.json", function(data) {
                console.log("accessed json data");
                $.each(data, function(i, item) {

                    if (item.year == slider.val()) {
                        var newPrice = item.ratio * currentCard.price;
                        var roundPrice = Math.round(newPrice * .1) * 10;
                        console.log(newPrice);
                        console.log(roundPrice);
                        console.log("ratio is " + item.ratio + " year is " + item.year + "slider value is " + slider.val() + 'card price is ' + currentCard.price);
                        price.text(roundPrice);
                        output.text(slider.val());
                        return false;
                    }

                });
            });
        };

        getPrice();

        slider.on('change', function() {
            getPrice();

            console.log('slider output' + slider.val());

        });

    });




});






});


