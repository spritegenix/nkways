$(document).on('click','#login_submit',function(){

    var username=$.trim($('#login_username').val());
    var typepassword=$.trim($('#typepassword').val());
    var password=$.trim($('#password').val());

    let string = $('#typepassword').val();
    let rounds = parseInt($('#rounds').val());

    $('#password').val(typepassword);


    if (username!='') {
        if (typepassword!='') {
            $('#login-form').submit();
            $('#login_submit').html('<div class="spinner-grow text-sky-light" role="status"> <span class="visually-hidden">Loading...</span></div>');
        }
    }
    
});
