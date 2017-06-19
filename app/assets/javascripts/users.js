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
var submitBtn = $("#form-signup-btn");
 
Stripe.setPublishableKey( $("meta[name="stripe.key"]").attr("content") );

submitBtn.click(function(event){
    event.preventDefault();
    submitBtn.val("Processing").prop("disabled", true);
    
    var ccNum = $("#card_number").val(),
        cvcNum = $("#card_code").val(),
        expMonth = $("#card_month").val(),
        expYear = $("#card_year").val();
        
    //Use Stripe js lib to check errors
    
    var error = false;
    
    //Validate card num
    if (!Stripe.card.validateCardNumber(ccNum)) {
        error = true;
        alert("The credit card number appears to be invalid");
    }
    //validate cvc
    if (!Stripe.card.validateCVC(cvcNum)) {
        error = true;
        alert("The CVC number appears to be invalid");
    }
    //validate expiration
    if (!Stripe.card.validateExpiry(expMonth, expYear)) {
        error = true;
        alert("The expiration date appears to be invalid");
    }
    
    
    if (error){
        //if errors, dont send
        submitBtn.prop("disabled", false).val("Sign Up");
    } else{
        Stripe.createToken({
           number: ccNum,
           cvc: cvcNum,
           exp_month: expMonth,
           exp_year: expYear
         }, stripeResponseHandler);
      
    }
    //send to stripe 
    

     
     return false; //after clickevent, good habit - exit out the function -- we are done with the func
});

function stripeResponseHandler(status, response) {
    //get token from the response        
    var token = response.id;
    
    //inject the card token in a hiddenfield
    theForm.append( $("<input type="hidden" name="user[stripe_card_token]">").val(token) );
    
    //submit to rails -- get(0), weil das erste 0 ist
    
    theForm.get(0).submit();
}




    
    
    
});
