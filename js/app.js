// testimonials rotate in and out on a timer
var quote1 = "<p>Yi has one of the strongest work ethics of anyone that's ever worked for me. He is passionate about technology and sought multiple opportunities to improve as a professional. <br> -Stevon Cook</p>";
var quote2 = "<p>Yi has strong technical knowledge, with experience in the field and it really shows when I need help on a problem because I can count on him for a solid answer. <br> -Francisco Sandoval</p>";
var quote3 = "<p>Yi is a passionate web developer who applies many useful techniques in developing his applications. Having been exposed to the tech field for 8 years, his experience tied with his curiosity for solving problems is what makes him a necessity in this growing field. <br> -Luke Engle</p>";
var quote4 = "<p>Sergeant Liu is always on time, is a reliable soldier and always accomplishes his missions and tasks on time. <br> -Enrique Rosario</p>";
var quote5 = "<p>Yi is thoughtful, motivated, determined, and enthusiastic about coding. He is a creative problem solver with an incredible work ethic. He works very hard to thoroughly understand content and explains CS concepts well to others. He is patient, intelligent, and easy to work with because he listens and provides meaningful contributions towards ideas in group work. <br> -Andrea Piazza</p>";
var quote6 = "<p>Yi is a reliable volunteer and emerging carpenter with a desire to do quality work. <br> -Erin Colton</p>";
var quote7 = "<p>Yi is hard working, and dependable. His great professionalism makes him an absolute pleasure to work with. Overall he’s a great colleague to have! <br> -Raj Mahal</p>";

var quotes = [quote1,quote2,quote3,quote4,quote5,quote6,quote7];

var counter = 0;
function displayClass() {
    $('#testimonials p').fadeTo(2000, 0, function(){
        $(this).html(quotes[counter]);
        counter = ++counter % quotes.length;
        $(this).fadeTo(2000, 1, displayClass);
    });
};
displayClass();

// https://getbootstrap.com/docs/4.1/components/carousel/
$('#myCarousel').carousel({
    interval: 2000
})
// Enable Carousel Indicators
$(".item1").click(function(){
    $("#myCarousel").carousel(0);
});
$(".item2").click(function(){
    $("#myCarousel").carousel(1);
});
$(".item3").click(function(){
    $("#myCarousel").carousel(2);
});
$(".item4").click(function(){
    $("#myCarousel").carousel(3);
});
$(".item5").click(function(){
    $("#myCarousel").carousel(4);
});
$(".item6").click(function(){
    $("#myCarousel").carousel(5);
});
// $("#myCarousel").swiperight(function() {  
//     $("#myCarousel").carousel('prev');  
//   });  
//  $("#myCarousel").swipeleft(function() {  
//     $("#myCarousel").carousel('next');  
//  });


var stockDatePrice = [1, 2];
var stock_search_endpoint = "https://api.iextrading.com/1.0/stock/";
var stock_symbol = 'aapl';
var year_range = 1;

$('input.btn-primary').on('click', function (e) {
    e.preventDefault();
    stock_symbol = $('input.stock-input').val();
    console.log(stock_symbol);
    makeStockRequest();
});
// ajax request
function makeStockRequest(){
    $.ajax({
        method: "GET",
        url: `${stock_search_endpoint}${stock_symbol}/chart/${year_range}y`,
        success: onStockSuccess,
        error: onStockError
    });
}
makeStockRequest();
function onStockSuccess(response) {
    stockDatePrice = response.map(dailyData => {
        var miniDailyData = {};
        miniDailyData['date'] = dailyData.date;
        miniDailyData['close'] = dailyData.close;
        // $('#stockMarket').append(`<p>${miniDailyData.date}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;$${miniDailyData.close}</p>`);
        return miniDailyData;
    });
    makeChart();
}
function onStockError(xhr, status, errorThrown) {
    alert("stock, Sorry, there was a problem!");
    console.log("stock, Error: " + errorThrown);
    console.log("stock, Status: " + status);
    console.dir(xhr);
}

// var wiki_history_endpoint = "https://en.wikipedia.org/w/api.php?action=query&prop=revisions&rvprop=content&format=json&titles=";
// var wiki_history_year_search = 2018;//year_range;
// var wiki_history_url = `${wiki_history_endpoint}${wiki_history_year_search}`;
// function makeHistroyRequest(){
//     $.ajax({
//         method: "GET",
//         dataType: "jsonp",
//         url: wiki_history_url,
//         success: onWHistorySuccess,
//         error: onWHistoryError
//     });
// }
// makeHistroyRequest();
// function onWHistorySuccess(response) {
//     // console.log(response.query.pages['51390'].revisions[0]['*']);
//     var str = response.query.pages['51390'].revisions[0]['*'];
//     // console.log(str);
//     var arr = str.split(/[=]{3}[A-Za-z]{1,}[=]{3}/g);
//     arr.shift();
//     arr.splice(8);
//     console.log(arr);
//     // the next step map arr's each string, by split it with month, and then add year and month digit to the front of each subarray 
//     for(var i=0; i<arr.length; i++){
//         $('#worldNews').append(`<p>${arr[i]}</p>`);
//     }
// }
// function onWHistoryError(xhr, status, errorThrown) {
//     alert("wiki history, Sorry, there was a problem!");
//     // console.log("wiki history, Error: " + errorThrown);
//     // console.log("wiki history, Status: " + status); 
//     // console.dir(xhr); 
// }

function makeChart() {
    // var tempArr = Array.from(Array(253).keys());                                 //this later on should be array of events
    // console.log(stockDatePrice); 
    var price = stockDatePrice.map(data => data.close);
    var date = stockDatePrice.map(data => data.date);//.slice(0, 7));
    // date = date.filter((item, pos) => date.indexOf(item) === pos).sort();
    // console.log(date.length, price.length); 
    var myChart = $('#myChart')[0].getContext('2d');
    var massPopChart = new Chart(myChart, {
        type: 'bar',
        data: {
            labels: date,
            datasets: [{
                label: stock_symbol,
                data: price
            }
            // ,
            // {
            //     label: 'events',                         //the line chart on top of bar chart
            //     data: tempArr,
            //     type: 'line'
            // }
        ]
        },
        option: {}
    });
}

// $('form.contact button').on('click', function(e){
//     e.preventDefault();
//     $('form.contact input, textarea').each(function(e){
//         if($(this).val() === ''){
//             if($(this).attr('type') === 'email'){
//                 $(this).siblings().text("Please enter an email address.");
//                 $(this).addClass('error');
//                 $(this).siblings().fadeIn();
//             }else{
//                 $(this).addClass('error');
//                 $(this).siblings().fadeIn();
//             }
//         }else{
//             if(!validateEmail($(this).val()) && $(this).attr('type') === 'email'){
//                 $(this).addClass('error');
//                 $(this).siblings().text("Please enter a valid email address.");
//                 $(this).siblings().fadeIn();
//             }else{
//                 $(this).removeClass('error');
//                 $(this).siblings().hide();
//             }
//         }
//     });
// });

// function validateEmail(Email) {
//     var pattern = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
//     return $.trim(Email).match(pattern) ? true : false;
// }

$('header nav a').on('click', function(e) {
    // prevent the standard link operation on click
    e.preventDefault();
    // use the href of the link to identify what section to scroll to
    var thisTarget = $(this).attr('href');
    // get that section's top offset
    // use $(thisTarget).offset().top to get distance from top of screen to jump link location
    var targetOffset = $(thisTarget).offset().top;
    // use jQuery.animate() to animate the body's scrollTop to the targetOffest
    $('html, body').animate({
      scrollTop: targetOffset
    }, 2000);
    // return false;
});

// lightbox
$(document).on('click', '[data-toggle="lightbox"]', function(event) {
    event.preventDefault();
    $(this).ekkoLightbox();
});
