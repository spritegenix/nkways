$(document).ready(function(){
	$(document).on('click','#add_customer_ajax',function(){
        var form_data = new FormData($('#add_cust_form')[0]);
           
        $("#add_cust_form").validate({
	        // Specify validation rules
	        rules: {
	          display_name: "required", 
	          
	          email:{ 
	            email: true
	          }
	    	},
	        // Specify validation error messages
	        messages: {
	          display_name: "Please enter name!", 
	          email:{ 
	            email: "Please enter a valid email-id!"
	          } 
	        }
        }); 


        var valid = $('#add_cust_form').valid();  

           if (valid == true) {
            $('#add_customer_ajax').prop('disabled', true);
               $.ajax({
                    type: 'POST',
                    url: $('#add_cust_form').prop('action'),
                    data: form_data,
                    processData: false,
                    contentType: false,
                     beforeSend: function() {
                        // setting a timeout
                        $('#add_customer_ajax').html('Saving...<i class="bx bx-loader bx-spin"></i>');
                        
                    },
                    success: function(response) {

                        if ($.trim(response)==1) {
                            $('#add_customer_ajax').html('Save');
                            show_success_msg('success','','Saved!'); 
                           $('#add_cust_form')[0].reset();
                        }else if($.trim(response)==0){
                            // show_toast('fail','File must be less than 500kb');
                            $('#add_customer_ajax').html('Save');
                            show_failed_msg('error','','Email already exists!');
                        }else if($.trim(response)==3){
                            // show_toast('fail','File must be less than 500kb');
                            $('#add_customer_ajax').html('Save');
                            show_failed_msg('error','File must be less than 500kb','Failed');
                        }else{
                         // $('#add_customer_ajax').prop('disabled', false);
                            show_failed_msg('error','','Failed to save!');
                        }
                        $('#add_customer_ajax').prop('disabled', false);
                     
                    }
                });
           }
           
            
        });



	function show_success_msg(type,message,title) {
         Lobibox.notify(type, {
            size: 'mini',
            title: title,
            position: 'top right',
            width: 300,
            icon: 'bx bxs-check-circle',
            sound: false,
            // delay: false,
            delay: 2000,
            delayIndicator: false,
            showClass: 'zoomIn',
            hideClass: 'zoomOut',
            msg: message
        });
    }

    function show_failed_msg(type,message,title) {
        Lobibox.notify(type, {
            size: 'mini',
            title: title,
            position: 'top right',
            width: 300,
            icon: 'bx bxs-x-circle',
            sound: false,
            // delay: false,
            delay: 2000,
            delayIndicator: false,
            showClass: 'zoomIn',
            hideClass: 'zoomOut',
            msg: message
        });
    }


}); 

