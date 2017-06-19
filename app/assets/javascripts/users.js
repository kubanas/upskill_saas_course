/* global $, Stripe */

//Document ready
//set stripe public key
//When user clicks form submit btn
//prevent default submission behavior

//Create the credit card fields.
//send the cardinfo to Stripe
//Stripe will return a card token
//Inject it inside the form as hidden
//Submit form to our rails app

$(document).on("turbolinks:load", function(){
var theForm = $("#pro_form");
var submitBtn = $("#form-signup-btn")
 
Stripe.setPublishableKey( $("meta[name="stripe.key"]").attr("content") );

submitBtn.click(function(event){
    event.preventDefault();
    var ccNum = $("#card_number").val(),
        cvcNum = $("#card_code").val(),
        expMonth = $("#card_month").val(),
        expYear = $("#card_year").val();
        
    Stripe.createToken({
       number: ccNum,
       cvc: cvcNum,
       exp_month: expMonth,
       exp_year: expYear
     }, stripeResponseHandler);
});



    
    
    
});
