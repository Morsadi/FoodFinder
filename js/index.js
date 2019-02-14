
var $= jQuery;

$(document).ready(function(){



$(window).load(function(){
  setTimeout(function () {
    $('#searchBell').click();
  }, 3500);
  var words = ['home', 'eggs', 'Beef', 'chicken', 'butter', 'honey', 'milk', 'vodka', 'bacon', 'toast']
  var randomNum = Math.floor((Math.random() * 10) + 1);

  $('.searcharea').val(''+words[randomNum]+'');
  $('.dairy').click();
  $('.searchBtn').click();
})


//click bell to open search area
$('#searchBell').click(function () {
  $('#FIND').css('display','block');
  $('.searcharea').val('');
  $('.searcharea').focus();
  $('.bodyFilter').css('display', 'block');
  $('#notice').css('display', 'none')

})

//close search area
$('.close1').click(function() {
  $('#FIND').css('display', 'none')
  $('.bodyFilter').css('display','none');
  $('#notice').css('display', 'none')
  $('#notice').text('x');
  $('.recipeSpace').remove();//in case the use opens a recipe before the search area initially pops up
})

//searching
$('.searchBtn').click(function(){
var text = $('.searcharea').val();

if (text == false){
$('#notice').text('x');
  $('#notice').css('display', 'block')


} else {

  //calling API

  //getting the true filter values

  $.ajax({
    url: 'https://cors-anywhere.herokuapp.com/https://api.edamam.com/search?q='+ text + '&app_id=c9925564&app_key=2516ed0fa29e7bf9ba5e4671e0382116&count=20&to=40',
    type: 'GET',
    success: function(data){
        var recipes = data.hits;

if (!data.count){
  //in case of negative condition
$('#notice').text('?');
$('#notice').css('display', 'block')

} else { //positive condition

  //if the typed word is correct, fetch through recipes
  $('#notice').css('display', 'none');
  $('#notice').text('x');
$('#FIND').css('display', 'none');
$('.bodyFilter').css('display','none');

    //itterate through recipes and get the wanted entities
  recipes.forEach(function(val, index){
    var allImage = val.recipe.image;
  var allTitle = val.recipe.label;
      allTitle = allTitle.toUpperCase();
  var calory = val.recipe.calories;

  //create divs + add bg and title to display recipe teaser
    $('.well'+index+'').remove();
    $('.wrapper').append('<div class="well'+index+'"></div>');
    $('.well'+index+'').css('background', 'url("'+allImage+'")')
    $('.well'+index+'').append('<div class="filter"></div>')
    $('.well'+index+' .filter').append('<h3> '+allTitle+' </h3>')
  })


    //open recipe
    $('.wrapper div div').click(function(){

      var recipeId = $(this).parent().attr("class");//get recipe selector
      recipeId = recipeId.substr(recipeId.length - 1);

      //retrieve values of the recipe
      var title = recipes[recipeId].recipe.label;
      var image = recipes[recipeId].recipe.image;
      var ingredients = recipes[recipeId].recipe.ingredientLines;
      var link = recipes[recipeId].recipe.url;


      //append results in the recipe box area
      $('.bodyFilter').css('display', 'flex');//show bodyFilter
      $('.bodyFilter').append('<div class="recipeSpace"><h3 class="title"> '+title+' </h3><ul><h3>Ingredients</h3></ul></div>');//create title & bulletin section
      $('.recipeSpace').append('<img class="close2" src="https://i.ibb.co/TPrkS7K/close1.png"/>')


      //append each ingredient in a bulletin
      ingredients.forEach(function(ing){ $('.recipeSpace ul').append('<li>'+ing+'</li>')})

      //open the full recipe link
      $('.recipeSpace').append('<a href="'+link+'" target="blank_"><img class="oven" src="https://i.ibb.co/wQhhDSx/Oven.png" /></a>')



        //closing the recipe
        $('.close2').click(function(){
          $('.recipeSpace').remove();
          $('.bodyFilter').css('display', 'none')
        })


    })//end of recipe click event

}// end of positive condition
    },
    //call error
    error: function(data) {
        alert('woops!');
    }
});//end of call
}
}) //end of btn click event
$('.searcharea').keydown(function(e) {
  if (e.keyCode == 13){
  $('.searchBtn').click();
}
})





}) //end of jQuery
