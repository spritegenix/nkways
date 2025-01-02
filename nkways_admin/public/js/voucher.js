$(document).ready(function(){

	var row=0;
	var taxrow=0;
	var product_js_id=0;
	var last_inserted_row=0;
	var proqty=2;
	var last_bar_code=0;
	var foucc=0;
	var is_split=false;
	var focus_element=0;

	if ($('#split_tax').val()==1) {
		is_split=true;
	}

	if ($('#focus_element').val()==1) {
		focus_element=1;
	}

	if (focus_element==1) {
		$('#product_code').focus();

	}else{
		$('#productbarcodesearch').focus();
	}

$(document).on('click','.close_receipt',function(){
	$('#receipt_show').modal('hide');
	location.reload();
});

display_add_ledger_form('');


function display_add_ledger_form(entype){	
        $.ajax({
          url: base_url()+"/accounts/get_ledger_ac_form/"+entype,
          success:function(response) {
            $('#add_ledger_form_container'+entype).html(response);
         }
       });
    }

    



    $(document).on('click','.add_ledger_data',function(){
            var thisbb=$(this);
            var thisva=$(this).data('ide');
            var urll=$(this).data('actionurl');

            var group_head=$('#group_head').val();
            var opening_balance=$('#opening_balance').val();
            var opening_type=$('#opening_type').val();
            var ledger_name=$.trim($('#ledger_name'+thisva).val());

            $('#error_mes').html('');

            if(ledger_name=='') {
							$('#error_mes').html('<div class="alert alert-danger mb-3 mb-3">Please enter ledger name</div>');
						}else{

							var csrfName = $('#csrf_token').attr('name'); // CSRF Token name
    					var csrfHash = $('#csrf_token').val(); // CSRF hash

							$.ajax({
                    type: 'POST',
                    url: urll,
                    data: {
                    	group_head:group_head,
											ledger_name:ledger_name,
											opening_balance:opening_balance,
											opening_type:opening_type,
											[csrfName]: csrfHash	
                    }, 
                    beforeSend: function() {  
                        $('#add_ledger_data').html('Saving  <i class="fa fa-loading d-inline-block"></i> ');  
                    },

                    success: function(response) {   
                      $(thisbb).html('Saved');

                      $('#group_head').val('');
            					$('#opening_balance').val('');
            					$('#opening_type').val('');
            					$.trim($('#ledger_name'+thisva).val(''));

            					$(".close").click();
                      $('.modal-backdrop').remove();

            					Swal.fire(
									      'Saved!',
									      '',
									      'success'
									    )

                    }
                });
						}
        });



$(document).on('input paste','#pmrp,#p_margin,#s_margin',function(){
		var p_mrp=0;
		var p_margin=0;
		var s_margin=0;
		
		if ($('#pmrp').val()!='') {
			p_mrp=$('#pmrp').val();
		}

		if ($('#p_margin').val()!='') {
			p_margin=$('#p_margin').val();
		}

		if ($('#s_margin').val()!='') {
			s_margin=$('#s_margin').val();
		} 
		
		var purchase_price=p_mrp-(p_mrp*p_margin/100);
		var sell_price=p_mrp-(p_mrp*s_margin/100);

		$('#pprice').val(purchase_price);
		$('#psellprice').val(sell_price);

	});

$(document).on('input paste','.pmrp,.p_margin,.s_margin',function(){
		var rowid=$(this).data('rowin');
		var p_mrp=0;
		var p_margin=0;
		var s_margin=0;
		
		if ($('#pmrp'+rowid).val()!='') {
			p_mrp=$('#pmrp'+rowid).val();
		}

		if ($('#p_margin'+rowid).val()!='') {
			p_margin=$('#p_margin'+rowid).val();
		}

		if ($('#s_margin'+rowid).val()!='') {
			s_margin=$('#s_margin'+rowid).val();
		} 
		
		var purchase_price=p_mrp-(p_mrp*p_margin/100);
		var sell_price=p_mrp-(p_mrp*s_margin/100);

		$('#purchase_price_text'+rowid).val(purchase_price);
		$('#selling_price_text'+rowid).val(sell_price);

	});


var indian_states={
    '1':'Jammu & Kashmir',
    '2':'Himachal Pradesh',
    '3':'Punjab',
    '4':'Chandigarh',
    '5':'Uttarakhand',
    '6':'Haryana',
    '7':'Delhi',
    '8':'Rajasthan',
    '9':'Uttar Pradesh',
    '10':'Bihar',
    '11':'Sikkim',
    '12':'Arunachal Pradesh',
    '13':'Nagaland',
    '14':'Manipur',
    '15':'Mizoram',
    '16':'Tripura',
    '17':'Meghalaya',
    '18':'Assam ',
    '19':'West Bengal',
    '20':'Jharkhand',
    '21':'Orissa',
    '22':'Chhattisgarh',
    '23':'Madhya Pradesh',
    '24':'Gujarat',
    '25':'Daman & Diu',
    '26':'Dadra & Nagar Haveli',
    '27':'Maharashtra',
    '28':'Andhra Pradesh (Old)',
    '29':'Karnataka',
    '30':'Goa',
    '31':'Lakshadweep',
    '32':'Kerala',
    '33':'Tamil Nadu',
    '34':'Puducherry',
    '35':'Andaman & Nicobar Islands',
    '36':'Telengana',
    '37':'Andhra Pradesh (New)'
};


var staval=$('#state_select_box').val();
$(document).on('input click keypress','#gst_input',function(){
	var gst_val=$.trim($(this).val()); 
	$('.disable_layer').remove();
	
	$('#state_select_box').val(staval).trigger('change');
	if (gst_val!='' && gst_val.length>1) {
		var state_code=gst_val.substr(0, 2); 

    if (typeof indian_states[state_code]=='undefined') {
    	$('#state_select_box').val(staval).trigger('change');
    }else{
    	$('#state_select_box').val(indian_states[state_code]).trigger('change');
			$('#layerer').prepend('<div class="disable_layer"></div>');
    }

		
	}
	// state_select_box
})

	 
	
	$(document).on('click','#pro_selector_btn',function(){
		$('#pro_selector').modal('show');
		
		
		display_products('','','');

		setTimeout(function(){
		    $("#productsearch").filter(':visible').focus();
		}, 500); 
        

	});

	$(document).on('click','.category_box', function(){
		var catid=$(this).data('catid');
		display_products('',catid,'');
	});

	$(document).on('click','.sub_category_box', function(){
		var subcatid=$(this).data('subcatid');
		display_products('','',subcatid);
	});

	$(document).on('append input change paste','#productsearch',function(){
		var input=$(this).data('input');
		var search_text= $.trim($('#productsearch').val());
		if (search_text.length>=3) {
			display_products(search_text,'','',input);
		}else{
			display_products('','','');
		}
	});

	$("#down_pro").click(function() {
    $('#products').animate({scrollTop: '+=180px'}, 100);
	});

	$("#up_pro").click(function() {
    $('#products').animate({scrollTop: '-=180px'}, 100);
	});

	$("#down_pro_table").click(function() {
    $('.pos_tableWrap').animate({scrollTop: '+=180px'}, 100);
	});

	$("#up_pro_table").click(function() {
    $('.pos_tableWrap').animate({scrollTop: '-=180px'}, 100);
	});

	$(document).on('click','#cat_back', function(){
		display_products('','','');
	});

	$(document).on('click','.go_back_or_close',function(){
		if(1 < history.length) {
	    history.back();
		}
		else {
		    window.close();
		}
	});
 

	$(document).on('click','#addnewproductbutton',function(){
		$('#addnewproduct').modal('show');
		 $.ajax({
	       url: base_url()+"/products/get_form",
	       success:function(response) {
	        $('#add_product_form_container_createinvoice').html(response);
	     }
	    });
	});



	var row=1;
      $(document).on('click','.add_pro_unit',function(){
        $('#unit_container_product').toggle();
      });

       $(document).on('click','.addd_unit',function(){
        var unit_name=$.trim($('#unit_name').val());
        if (unit_name!='') {

        	var csrfName = $('#csrf_token').attr('name'); // CSRF Token name
          var csrfHash = $('#csrf_token').val(); // CSRF hash


          $.ajax({
            url: base_url()+"/settings/add_unit_from_ajax",
            type:'POST',
					data:{
						unit_name:unit_name,
						[csrfName]: csrfHash
					},
            success:function(response) {

              if ($.trim(response)!=0) {
                $('#unit_name').val('');
                 $('#unit_container_product').toggle();
                $('#unit').append('<option value="'+response+'" selected>'+unit_name+'</option>');
              }
           },
           error:function(){
            alert("error");
           }
          });
        }
      });




      var row=1;
      $(document).on('click','.add_pro_cat',function(){
        $('#cat_container_product').toggle();
      });

       $(document).on('click','.addd_cate',function(){
        var cat_name=$.trim($('#cat_name').val());
        if (cat_name!='') {

        	var csrfName = $('#csrf_token').attr('name'); // CSRF Token name
          var csrfHash = $('#csrf_token').val(); // CSRF hash

          $.ajax({
            url: base_url()+"/settings/add_cate_from_ajax",
            type:'POST',
					data:{
						cat_name:cat_name,
						[csrfName]: csrfHash
					},
            success:function(response) {
              if ($.trim(response)!=0) {
                $('#cat_name').val('');
                 $('#cat_container_product').toggle();
                $('#category').append('<option value="'+response+'" selected>'+cat_name+'</option>');
              }
           },
           error:function(){
            alert("error");
           }
          });
        }
      });



       var row=1;
      $(document).on('click','.add_pro_subcat',function(){
        var elem=$(this).data('proid');
        $('#subcat_container_product'+elem).toggle();
      });

       $(document).on('click','.addd_subcate',function(){
       	$('#subcater').html('');
        var elem=$(this).data('proid');
        var subcat_name=$.trim($('#subcat_name'+elem).val());
        
        var pcategory=$.trim($('#category'+elem).val());
        if (subcat_name!='') {
        	var csrfName = $('#csrf_token').attr('name'); // CSRF Token name
          var csrfHash = $('#csrf_token').val(); // CSRF hash

          $.ajax({
            url: base_url()+"/settings/add_subcate_from_ajax",
            type:'POST',
            data:{
              subcat_name:subcat_name,
              pcategory:pcategory,
              [csrfName]: csrfHash
            },
            success:function(response) {
              if ($.trim(response)!=0) {
                $('#subcat_name'+elem).val('');
                 $('#subcat_container_product'+elem).toggle();
                $('#sub_category'+elem).append('<option value="'+response+'" selected>'+subcat_name+'</option>');
              }else{
              	$('#subcater').html('<span class="text-danger" style="font-size: 12px;">Select parent category</span>');
              }
           },
           error:function(){
            alert("error");
           }
          });
        }
      });


      //  $(document).on('change','.parc',function(){
      //   var parent=$(this).val();
      //   var elem=$(this).data('proid');

      //   $.ajax({
      //     url: base_url()+"/products/get_sub_select/"+parent,
      //     success:function(response) {

      //       $('#sub_category'+elem).html(response);
      //       $('#secondary_category'+elem).html('<option value="">Select Secondary Category</option>');
            
      //    },
      //    error:function(){
      //     alert("error");
      //    }
      //   });
      // });

      // $(document).on('change','.subc',function(){
      //   var parent=$(this).val();
      //   var elem=$(this).data('proid');

      //   $.ajax({
      //     url: base_url()+"/products/get_sec_select/"+parent,
      //     success:function(response) {

      //       $('#secondary_category'+elem).html(response);
            
      //    },
      //    error:function(){
      //     alert("error");
      //    }
      //   });
      // });


       var row=1;
      $(document).on('click','.add_pro_seccat',function(){
        var elem=$(this).data('proid');
        $('#seccat_container_product'+elem).toggle();
      });

       $(document).on('click','.addd_seccate',function(){
       	$('#seccater').html('');
        var elem=$(this).data('proid');
        var seccat_name=$.trim($('#seccat_name'+elem).val());
        var pcategory=$.trim($('#sub_category'+elem).val());
        var csrfName = $('#csrf_token').attr('name'); // CSRF Token name
         var csrfHash = $('#csrf_token').val(); // CSRF hash

        if (seccat_name!='') {
          $.ajax({
            url: base_url()+"/settings/add_seccate_from_ajax",
            type:'POST',
            data:{
              seccat_name:seccat_name,
              pcategory:pcategory,
              [csrfName]: csrfHash
            },
            success:function(response) {
              if ($.trim(response)!=0) {
                $('#seccat_name'+elem).val('');
                 $('#seccat_container_product'+elem).toggle();
                $('#secondary_category'+elem).append('<option value="'+response+'" selected>'+seccat_name+'</option>');
              }else{
              	$('#seccater').html('<span class="text-danger" style="font-size: 12px;">Select parent category</span>');
              }
           },
           error:function(){
            alert("error");
           }
          });
        }
      });




        var row=1;
      $(document).on('click','.add_pro_brand',function(){
        $('#brand_container_product').toggle();
      });

       $(document).on('click','.addd_brand',function(){
        var brand_name=$.trim($('#brand_name').val());
        if (brand_name!='') {

        	var csrfName = $('#csrf_token').attr('name'); // CSRF Token name
    			var csrfHash = $('#csrf_token').val(); // CSRF hash

          $.ajax({
            url: base_url()+"/settings/add_brand_from_ajax",
            type:'POST',
					data:{
						brand_name:brand_name,
						[csrfName]: csrfHash
					},
            success:function(response) {
              if ($.trim(response)!=0) {
                $('#brand_name').val('');
                 $('#brand_container_product').toggle();
                $('#brand').append('<option value="'+response+'" selected>'+brand_name+'</option>');
              }
           },
           error:function(){
            alert("error");
           }
          });
        }
      });

	// $(document).on('click','.open_popup', function(){
	// 	var this_row=$(this).data('proid');
	// 	$('#price_edit_popup'+this_row).addClass('d-block');
	// });

	// $(document).on('click','.close_popup', function(){
	// 	var this_row=$(this).data('proid');
	// 	$('#price_edit_popup'+this_row).removeClass('d-block');
	// });


	$(document).on('click','#submit_invoice',function(){

		var st=$('#subtotal').val();
		var inid=$(this).data('inid');
		if (st!=0) {
			$('#submit_invoice').prop('disabled', true);
			var status = navigator.onLine;
            if (status) {
					$.ajax({
						type: "POST", 
			            url: $('#invoice_form').attr('action'),
			            data: $('#invoice_form').serialize(),
			            beforeSend:function(){  
				            $('#submit_invoice').html('<span class="spinner-grow spinner-grow-sm mr-1" role="status" aria-hidden="true"></span> Loading...');  
				         },
			            success:function(response) {
			           
			            	
			            	$('#submit_invoice').prop('disabled', false);
							$('#submit_invoice').html('<i class="mdi mdi-plus mr-1"></i> Complete');
							$('#mess').html('');
							$('#receiptmodal').modal('show');
							display_invoice($.trim(response));
							$('#invoice_form')[0].reset();
							reset_invoice();
							 
							 

				         },
				         error:function(response){
				          alert(JSON.stringify(response));
				         }
				    });
			    } else {
			    			$('#submit_invoice').prop('disabled', false);
                $('#mess').html('<span class="my-2">No internet</div>');
            }

		}else{
			$('#mess').html('<span class="my-2">Item is empty!</div>');
		}
		
	});

	function convert_invoice(invoice){
		var csrfName = $('#csrf_token').attr('name'); // CSRF Token name
    var csrfHash = $('#csrf_token').val(); // CSRF hash
		$.ajax({
          url: base_url()+"invoices/convert_invoice/"+invoice,
          data:{
						[csrfName]: csrfHash
					},
          success:function(response) {
            
         },
         error:function(){
          alert("error");
         }
        });
	}

	function reset_invoice(){
		$('#products_table').html('');
		$('#tax_table').html('');
		calculate_invoice(); 
		calculate_due_amount();  
		calculate_due_amount(); 
		calculate_tax_amount(); 
		if (focus_element==1) {
			$('#product_code').focus();
		}else{
			
			$('#productbarcodesearch').focus();
		}
	}


	function display_invoice(invoice){
		var csrfName = $('#csrf_token').attr('name'); // CSRF Token name
    var csrfHash = $('#csrf_token').val(); // CSRF hash
    var thermalcheck=0;

 

    if ($('#thermalcheck').val()==1) {
			thermalcheck=1;
		}
		if (thermalcheck==0) {

			$('#receipt_show').html('<iframe src="'+base_url()+'voucher_entries/get_voucher/'+invoice+'/view" class="erp_iframe" id="erp_iframe"></iframe>');
			 const iframe = document.getElementById('erp_iframe');
	  iframe.srcdoc = '<!DOCTYPE html><div style="color: green; width: 100%;height: 90vh;display: flex;"><div style="margin:auto; font-family: system-ui;">Rendering Content...</div></div>';
	   iframe.addEventListener('load', () => setTimeout(function(){iframe.removeAttribute('srcdoc')}, 2500));

	}else{

		$.ajax({
	      url:  base_url()+"voucher_entries/get_thermal_script/"+invoice,
          data:{
				[csrfName]: csrfHash
			},
	      success:function(response) {

	      		 $("#remove_style").removeAttr("style")
          	 $('#pdfthermalthis').html(response);
          
	       
	        var btnnn='<button type="button" data-inv="'+invoice+'"  class="thermal_print btn btn-primary" ><i class="fa fa-print"></i> <span>Print Thermal Receipt</span></button>';
	        

	        // $('#thermal_btn').html(btnnn);
	    
	        
	     },
	     error:function(){
	      alert("error");
	     }
	    }); 
	}
         

        
	}

 

	$(document).on('input','#title',function(){
	        var prreslugg=$.trim($('#title').val());
	        slugg = prreslugg.replace(/\./g, "");
	        var slugtext = slugg.split(" ").join("-").split("?").join("-").split("=").join("-").split("&").join("-").split("#").join("");
	        $('#slug').val(slugtext);
	    });

	function display_products(search,category,subcategory,input='name'){
		var view_type=$("#view_type").val();
		var view_type=$("#view_type").val();
		var csrfName = $('#csrf_token').attr('name'); // CSRF Token name
    var csrfHash = $('#csrf_token').val(); // CSRF hash

		$.ajax({
          url: base_url()+"sales/display_products?product_name="+search+"&category="+category+"&subcategory="+subcategory+"&view_type="+view_type+"&product_type="+input,
          data:{
						[csrfName]: csrfHash
					},
          success:function(response) {
            $('#products').html(response);
         },
         error:function(){
          alert("error");
         }
        });
	}
	
	$(document).on('change','#cusselct',function(){
		var thisval=$(this).val();
		var cus_name=$('#cusselct option:selected').text();
		$('#alternate_name').val(cus_name);
		if (thisval!='CASH') {
			$('#alternate_name').prop('readonly',true);
		}else{
			$('#alternate_name').prop('readonly',false);
		}
	});

	$(document).on("click", "#new_window", function(){
		var currentURL=location.protocol + '//' + location.host + location.pathname;
		var cururl = currentURL+'?win=new_window';
		window.open(cururl, "_blank");
	});

	$(document).on("click", "#open_calculator", function(){
		window.open('Calculator:///');
	});

	$(document).on("click", "#fullscreen", function() {
	  if (!document.fullscreenElement &&    // alternative standard method
	      !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement ) {  // current working methods
	    if (document.documentElement.requestFullscreen) {
	      document.documentElement.requestFullscreen();
	    } else if (document.documentElement.msRequestFullscreen) {
	      document.documentElement.msRequestFullscreen();
	    } else if (document.documentElement.mozRequestFullScreen) {
	      document.documentElement.mozRequestFullScreen();
	    } else if (document.documentElement.webkitRequestFullscreen) {
	      document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
	    }
	    $('#fullscreen_icon').removeClass('mdi-fullscreen');
	    $('#fullscreen_icon').addClass('mdi-fullscreen-exit');
	  } else {
	    if (document.exitFullscreen) {
	      document.exitFullscreen();
	    } else if (document.msExitFullscreen) {
	      document.msExitFullscreen();
	    } else if (document.mozCancelFullScreen) {
	      document.mozCancelFullScreen();
	    } else if (document.webkitExitFullscreen) {
	      document.webkitExitFullscreen();
	    }
	    $('#fullscreen_icon').addClass('mdi-fullscreen');
	    $('#fullscreen_icon').removeClass('mdi-fullscreen-exit');
	  }
	});



	$(document).on('click','#add_customer_ajax',function(){

		var display_name=$.trim($('#display_name').val());
		var email=$.trim($('#email').val());
		var contact_name=$.trim($('#contact_name').val());
		var party_type=$.trim($('#party_type').val());
		var phone=$.trim($('#phone').val());
		var website=$.trim($('#website').val());
		var gstno=$.trim($('#gst_input').val());
		var opening_balance=$.trim($('#opening_balance').val());
		var opening_type=$.trim($('#opening_type').val());
		var billing_address=$.trim($('#billing_address').val());
		var state_select_box=$.trim($('#state_select_box').val());

		var withajax=$.trim($('#withajax').val());

		$('#display_name').css("border-color","#ced4da");
		$('#email').css("border-color","#ced4da");

		if (display_name=='') {
			$('#display_name').css("border-color","red");
		}else if(email==''){
			$('#email').css("border-color","red");
		}else{

			var csrfName = $('#csrf_token').attr('name'); // CSRF Token name
      var csrfHash = $('#csrf_token').val(); // CSRF hash
 			
			var gstinformat = new RegExp('/^([0-9]){2}([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}([0-9]){1}([a-zA-Z]){1}([0-9]){1}?$/');

			var valid_gst=true;

			var reggst = /^([0-9]){2}([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}([0-9]){1}([a-zA-Z]){1}([0-9]){1}?$/;
			if(!reggst.test(gstno) && gstno!=''){
			        valid_gst=false;
			}								

			
 
			  

			if (valid_gst==false) {    
           
	          $('#error_mes').html('<div class="alert alert-danger mb-3 mb-3">Please Enter Valid GSTIN Number</div>');    
	          // $("#gst_input").val('');    
	          $("#gst_input").focus(); 
	          $('#gst_input').css("border-color","red");
	      } else {
	      	$('#add_customer_ajax').prop('disabled', true); 
					$.ajax({
						type: "POST", 
				        url: $('#add_customer_ajax').data('action'),
				        data:{
				        	display_name:display_name,
									email:email,
									contact_name:contact_name,
									party_type:party_type,
									phone:phone,
									website:website,
									gstno:gstno,
									opening_balance:opening_balance,
									opening_type:opening_type,
									billing_address:billing_address,
									billing_state:state_select_box, 
									withajax:withajax,
									[csrfName]: csrfHash
				        },
				        beforeSend:function(){  
				        },
				        success:function(response) {
				        	var cuid=$.trim(response);
				        	if (cuid=='failed') {
				        		$('#errrr').html('<div class="py-3">Failed to save!</div>');
				        	}else if(cuid=='exists'){
				        		$('#errrr').html('<div class="py-3">Email/Username exists!</div>');
				        	}else{
				        		$("#addcus").modal('hide');
				        		$('#alternate_name').val(display_name);
								$('#alternate_name').prop('readonly',true);
				        	    $('#cusselct').append('<option value="'+cuid+'" selected>'+display_name+'</option>');
				        	}
				        	$('#add_customer_ajax').prop('disabled', false); 
				        },
				        error:function(){
				          alert("error");
				        }
				    });
				}
		}
		

	});

	function base_url(){
		var baseurl=$('#base_url').val();
		return baseurl;
	}


	$(document).on("keypress", "#productbarcodesearch", function() {
		var barcode=$.trim($('#productbarcodesearch').val());
		
		row++;
		
		var view_type=$('#view_type').val();
		// var lloc=loc();
		var lloc=4;

		if (barcode.length>lloc && barcode.length<15) {
			console.log(barcode);
			if ($(".barcode"+barcode).length) {
				proqty++;
				var get_qty_value=$('.barcode'+barcode+' .quantity_input').val();
				var price=$('.barcode'+barcode+' .quantity_input').data('price');
				var rep_quantity=parseFloat(get_qty_value)+1;
				$('.barcode'+barcode+' .quantity_input').val(rep_quantity);	
				$('#productbarcodesearch').val('');
				
				var this_row=$('.barcode'+barcode).data('thisrow');
				var x = 0;
				var intervalID = setInterval(function () {

				calculate_item_table(this_row,price);
				calculate_invoice();
				calculate_tax_amount();
				calculate_due_amount();

				   if (++x === 3) {
				       window.clearInterval(intervalID);
				   }
				}, 100);

			}else{
				console.log(barcode);
				var csrfName = $('#csrf_token').attr('name'); // CSRF Token name
        var csrfHash = $('#csrf_token').val(); // CSRF hash

				$.ajax({
          url: base_url()+"sales/get_barcode_product/"+view_type+"?barcode="+barcode+"&row="+row,
          data:{
						[csrfName]: csrfHash
					},
          success:function(response) {
			      $('#products_table').removeClass('tb');
			      if($.trim(response)!=''){
			      	$('#products_table').append(response);
							$('#productbarcodesearch').val(''); 
			      } 
			      last_bar_code=barcode;
						last_inserted_row=row;
		      },
	         error:function(){
	          alert("error");
	         }
	        });
			}

			var x = 0;
			var intervalID = setInterval(function () {

			calculate_invoice();
			calculate_tax_amount();
			calculate_due_amount();

			   if (++x === 5) {
			       window.clearInterval(intervalID);
			   }
			}, 100);

		}
		
		
	});

	$(document).on('change','#invoice_date',function(){
		var csrfName = $('#csrf_token').attr('name'); // CSRF Token name
    var csrfHash = $('#csrf_token').val(); // CSRF hash
		var indate=$(this).val();

		$.ajax({
      url: base_url()+"sales/get_date_format?date="+indate,
	    data:{
				[csrfName]: csrfHash
			},
      success:function(response) {
        $('#invoice_date_label').html($.trim(response));
     }
   
    });
	});


	$(document).on('append input paste','#typeandsearch,#product_code',function(){
		foucc=0;

		$('#loadbox_code').html('');
		$('#loadbox_name').html('');
		var input=$(this).data('input');
		var view_type=$("#view_type").val();
		var search_text= $.trim($('#typeandsearch').val());
		var search_code= $.trim($('#product_code').val());
    var csrfName = $('#csrf_token').attr('name'); // CSRF Token name
	  var csrfHash = $('#csrf_token').val(); // CSRF hash
	  		if (input=='code') {
			if (search_code!='' && search_code.length==3) {

				

				$.ajax({
		          url: base_url()+"voucher_entries/display_particulars?product_name="+search_code+"&category=&subcategory=&view_type="+view_type+"&product_type="+input,
	          data:{
							[csrfName]: csrfHash
						},
						beforeSend:function(){ 
						$('#loadbox_'+input).html('<i class="bx bx-loader-alt bx-spin"></i>'); 
		        },
		          success:function(response) {
		          	$('#loadbox_'+input).html('');
		            $('#tandsproducts').html(response);
		         },
		         error:function(){
		          alert("error");
		         }
		        });
			} else {
				$('#tandsproducts').html('');
			}
		}else{
			if ($.trim(search_text)!='') {
				$.ajax({
		          url: base_url()+"voucher_entries/display_particulars?product_name="+search_text+"&category=&subcategory=&view_type="+view_type+"&product_type="+input,
	          data:{
							[csrfName]: csrfHash
						},
						beforeSend:function(){  
							$('#loadbox_'+input).html('<i class="bx bx-loader-alt bx-spin"></i>');
		        },
		          success:function(response) {
		          	$('#loadbox_'+input).html('');
		            $('#tandsproducts').html(response);
		         },
		         error:function(){
		          alert("error");
		         }
		        });
			} else {
				$('#tandsproducts').html('');
			}
		}	
	});

	$(document).keydown(

          function(e)
          {    


              if (e.keyCode == 40) {      
                  // $(".item_box:focus").next().focus();
               
                    if (foucc==1) {
					    $(".item_box:focus").next().focus();
					}else{
						$('.item_box:first').focus();
						foucc=1;
					}

              }
              if (e.keyCode == 38) {      
                  $(".item_box:focus").prev().focus();

              }
          }
      );



	
	




	$(document).on('click','.item_box',function(){

		row++;
		var productid=$(this).data('productid');
		var product_name=$(this).data('product_name');
		var unit=$(this).data('unit');
		
		var description=$(this).data('description');
		var stock=$(this).data('stock');
		var product_type=$(this).data('product_type');
		var selling_price=$(this).data('selling_price');
		var purchaseprice=$(this).data('purchased_price');
		var tax=$(this).data('tax');
		var tax_percent=$(this).data('tax_percent');
		var tax_name=$(this).data('tax_name');
		var barcode=$(this).data('barcode');
		var prounit=$(this).data('prounit');
		var protax=$(this).data('protax');
		var purchase_tax=$(this).data('purchase_tax');
		var sale_tax=$(this).data('sale_tax');
		var mrp=$(this).data('mrp');
		var purchase_margin=$(this).data('purchase_margin');
		var sale_margin=$(this).data('sale_margin'); 

		var sale_withtax_selected='';
		var sale_withouttax_selected='';
		var purchase_withtax_selected='';
		var purchase_withouttax_selected='';

		var view_type=$('#view_type').val();
		var price=0; 
		var isplit_tax=0; 



	
		
			proqty=2;
			$('#products_table').removeClass('tb');
			
			var append_data='<li class="probox mb-2 position-relative productidforcheck'+productid+' barcode'+barcode+'" id="row'+row+'" data-thisrow="'+row+'">'+

                '<h6 class="product_name">'+product_name+'</h6>'+
                
                '<input type="hidden" name="p_tax[]" id="pptax'+row+'" value="'+tax+'"><input type="hidden" name="product_name[]" value="'+product_name+'"><input type="hidden" name="product_id[]" value="'+productid+'">'+

                '<input type="hidden" name="p_purchase_tax[]" value="'+sale_tax+'" id="id_purchase_tax_pptax'+row+'">'+
                '<input type="hidden" name="p_sale_tax[]" value="'+purchase_tax+'" id="id_sale_tax_pptax'+row+'">'+

                '<input type="hidden" name="i_id[]" value="0">'+

                '<div class="d-flex justify-content-between">'+ 

                '<div class="d-flex justify-content-between">'+

                '<div class="my-auto">'+
                    	


                    '<div> <input type="hidden" name="split_taxx[]" value="'+isplit_tax+'"> '+  
                      'Amount: <div class="d-flex"><span class="my-auto me-2">'+currency_symbol()+'</span><input type="number" step="any" class=" price mb-0 form-control form-control-sm"  name="price[]" value="'+price+'" id="price_bx'+row+'"  data-row="'+row+'"></div>'+
                    '</div>'+
                    '<div class="d-none"><span id="tax_hider'+row+'">'+tax_name+' ('+tax_percent+'%)</span> '+currency_symbol()+'<input type="hidden" name="p_tax_amount[]" value="'+price*tax_percent/100+'" id="p_tax_box'+row+'"><span class="tbox" id="taxboxlabel'+row+'">'+price*tax_percent/100+'</span> <a class="delete_tax text-danger" data-rowid="'+row+'" data-pricesss="'+price+'"><i class="bx bxs-x-circle"></i></a>'+

                    '<input type="hidden" step="any" class="numpad control_ro" data-row="'+row+'" data-product="'+productid+'" id="taxbox'+row+'" name="p_tax_percent[]" min="" value="'+tax_percent+'" readonly></div> '+
                  '</div>'+ 
                '</div>'+
                  '<div class="my-auto">'+
                    '<div class="my-auto d-none">'+

                    		'<div >'+
                        '<label style="color: #ff1010;">Discount</label>'+
                        '<div class="d-flex">'+
                          '<label style=" margin-top: auto;margin-bottom: auto;margin-right: 5px;margin-left: 5px;">%</label>'+
                          '<input type="number" step="any" class="form-control dis_inp form-control-sm mr-5 numpad discount_percent_input" data-type="percent" data-row="'+row+'" data-product="'+productid+'" data-price="'+price+'" id="discount_percentbox'+row+'" name="discount_percent[]" placeholder="Discount %" min="0" max="100" value="">'+

                      '<input type="number" step="any" class="form-control dis_inp form-control-sm mr-5 numpad discount_input" data-row="'+row+'" data-product="'+productid+'" data-price="'+price+'" id="discountbox'+row+'" name="p_discount[]" placeholder="Discount" min="0" value="">'+

                      '</div>'+
                     ' </div>'+
                    '</div>'+

                    '<div class="my-auto">'+
                    '<label style="color: #257e00;">Quantity</label>'+
                      '<div class="d-flex" style="min-width: 145px;">'+

                        '<div class="input-group-btn">'+
                          '<button type="button" class="btn border btn-sm qbtn qty_minus" id="qty_minus'+row+'" data-row="'+row+'" data-price="'+price+'" data-product="'+productid+'"> '+
                            '<span class="bx bx-minus"></span>'+
                          '</button>'+
                        '</div>'+

                        '<input type="number" class="form-control text-center form-control-sm mb-0 quantity_input numpad"  name="quantity[]" data-row="'+row+'" data-stock="'+stock+'" data-price="'+price+'" data-product="'+productid+'" id="quantity_input'+row+'"  min="1" value="1">'+

                        '<div class="input-group-btn">'+
                          '<button type="button" class="btn border btn-sm qbtn qty_plus" id="qty_plus'+row+'" data-row="'+row+'" data-price="'+price+'" data-product="'+productid+'" data-stock="'+stock+'">'+
                            '<span class="bx bx-plus"></span>'+
                          '</button>'+
                        '</div>'+

                      '</div>'+
                    '</div>'+ 

                  '</div>'+


                 

                  '<div class="my-auto">'+
                  '<label style="opacity: 0;">Tot</label>'+
                      '<h5 class="m-0 "><span class="text-success">'+currency_symbol()+'</span><span id="propricelabel'+row+'">'+price+'</span></h5>'+
                      '<input type="hidden" step="any" class="item_total form-control mb-0 control_ro"  name="amount[]" value="'+price+'" id="proprice'+row+'" readonly>'+
                  '</div>'+
                '</div>'+

                '<div class="mt-1">'+
                    '<div class="my-auto">'+
                       '<a class="cursor-pointer" data-bs-toggle="collapse" data-bs-target="#prodesc'+row+'">Add note +</a> '+

                    '</div>'+

                    '<div id="prodesc'+row+'" class="collapse">'+
	                  '<div class="accordion-body px-0 py-1">'+
	                    '<textarea name="product_desc[]" class="keypad textarea_border form-control prodesc" style="border: 1px solid #0000002e;">'+description+'</textarea>'+
	                  '</div>'+
	                '</div>'+
	            '</div>'+

                '<a id="'+row+'" class="btn text-white pro_btn_remove"><span>+</span></a>'+

            '</li>';
			$('#products_table').append(append_data);
		 
					product_js_id=productid;
					last_inserted_row=row;

				
		

		
		var x = 0;
		var intervalID = setInterval(function () {

		    calculate_item_table(last_inserted_row,price);
			
			calculate_tax_amount();
			calculate_due_amount();
			calculate_invoice();
			$('#typeandsearch').val('');
			$('#tandsproducts').html('');
			if (focus_element==1) {
				$('#product_code').focus();
				$('#product_code').val('');
			}else{
				$('#typeandsearch').focus();
			}
			foucc=0;

		   if (++x === 5) {
		       window.clearInterval(intervalID);
		   }
		}, 100);
	
		
	});

$(document).on('click','.delete_tax',function(){
	var trowid=$(this).data('rowid'); 
	var pricesss=$(this).data('pricesss'); 
	$('#tax_hider'+trowid).html('Tax: None');
	$('#taxboxlabel'+trowid).html(0);
	$('#p_tax_box'+trowid).val(0);

  $('#taxbox'+trowid).val(0);
  $('#pptax'+trowid).val(0);  

	var dx = 0;
	var intervalID = setInterval(function () {

		calculate_item_table(trowid,pricesss);
		calculate_invoice(); 
		calculate_due_amount();  
		calculate_due_amount(); 
		calculate_tax_amount();

	if (++dx === 5) {
	       window.clearInterval(intervalID);
	   }
	}, 100);

});

	function currency_symbol(){
		var crsy=$('#currency_symbol').val();
		return crsy;
	}


	

	$(document).on('click', '.pro_btn_remove', function(){  
       var button_id = $(this).attr("id");   
       $('#row'+button_id+'').remove(); 
       product_js_id=0;
       var x = 0;
		var intervalID = setInterval(function () {
			calculate_invoice();
           calculate_tax_amount();
           calculate_due_amount();
			
		if (++x === 5) {
		       window.clearInterval(intervalID);
		   }
		}, 100);
     });


	$(document).on('click','.tax_item',function(){
			taxrow++;
			var taxid=$(this).data('taxid');
			var taxname=$(this).data('taxname');
			var percent=$(this).data('percent');




			var append_tax_data='<tr class="tax_tr" data-taxidentifier="'+taxrow+'" id="taxrow'+taxrow+'"><td >'+taxname+'('+percent+'%)'+
									'<input type="hidden" name="tax_id[]" value="'+taxid+'">'+
									'<input type="hidden" name="tax_name[]" value="'+taxname+'">'+
									'<input type="hidden" name="taxamount[]" id="taxamount'+taxrow+'" value="0">'+
									'<input type="hidden" name="tax_percent[]" id="taxpercent'+taxrow+'" value="'+percent+'">'+
		                            '</td>'+
		                            '<td><span id="taxamountlabel'+taxrow+'">0</span></td>'+
		                            '<td> <a id="'+taxrow+'" class="tax_btn_remove">X</a></td>'+
		                        '</tr>';
			$('#tax_table').append(append_tax_data);
			    
				var x = 0;
				var intervalID = setInterval(function () {

				    calculate_invoice(); 
					calculate_due_amount();  
					calculate_due_amount(); 
					calculate_tax_amount(); 

				   if (++x === 5) {
				       window.clearInterval(intervalID);
				   }
				}, 100);
		});

		$(document).on('click', '.tax_btn_remove', function(){  
	        var button_id = $(this).attr("id");   
	        $('#taxrow'+button_id+'').remove(); 
		    var x = 0;
			var intervalID = setInterval(function () {

				calculate_invoice(); 
				calculate_due_amount();  
				calculate_due_amount(); 
				calculate_tax_amount();
				
			if (++x === 5) {
			       window.clearInterval(intervalID);
			   }
			}, 100);

		});


		$("#payment_type").change(function(){
	        var catname = $(this).val(); 
	        var catname_text = $(this).find('option:selected').text();
	        d_n_all_form();
	        $('#payment_label').html(catname_text);
	        // if (catname=='cash') {
	        //   d_n_all_form();
	        //   $('#cash_options').removeClass("d-none");
	        //   $('#payment_label').html("CASH");
	        // } 
	        // if (catname=='cheque') {
	        //   d_n_all_form();
	        //   $('#cheque_options').removeClass("d-none");
	        //   $('#payment_label').html("Cheque");
	        // } 
	        // if (catname=='bank_transfer') {
	        //   d_n_all_form();
	        //   $('#bank_transfer_options').removeClass("d-none");
	        //   $('#payment_label').html("Bank transfer");
	        // } 
	        // if (catname=='credit') {
	        //   d_n_all_form();
	        //   $('#payment_label').html("Credit");
	        // }   
	    });

		function d_n_all_form(){
			
	        // $('#payment_label').html("CASH");
	        // $('#cash_options').addClass("d-none");
	        $('#cheque_options').addClass("d-none");
	        $('#bank_transfer_options').addClass("d-none");
	    }

	    $(document).on('click input change', '#disc_val', function(){  
	        var x = 0;
		    var intervalID = setInterval(function () {
			      calculate_invoice();  
		        calculate_tax_amount();
		        calculate_due_amount();
			       if (++x === 5) {
				       window.clearInterval(intervalID);
				   }
			}, 100);
	    });

	
	$(document).on('click','.qty_minus', function(){
		var this_row=$(this).data('row');
		var this_product=$(this).data('product');
		var price=$('#price_bx'+this_row).val();

		var qnumber4=$('#quantity_input'+this_row).val();
		if (qnumber4 != 0) {
			var upval=parseFloat(qnumber4)-1;
			$('#quantity_input'+this_row).val(upval);

			var this_val=$('#discount_percentbox'+this_row).val(); 
			$('#discountbox'+this_row).val((price*upval)*this_val/100);

			var x = 0;
			var intervalID = setInterval(function () {

				calculate_item_table(this_row,price);
				calculate_invoice(); 
				calculate_due_amount();  
				calculate_due_amount(); 
				calculate_tax_amount();

			if (++x === 5) {
			       window.clearInterval(intervalID);
			   }
			}, 100);
		 

		}
	});

	$(document).on('click','.qty_plus', function(){
		var this_row=$(this).data('row');
		var this_product=$(this).data('product');
		var qnumber4=$('#quantity_input'+this_row).val();
		var price=$('#price_bx'+this_row).val();
			var upval=parseFloat(qnumber4)+1;
			$('#quantity_input'+this_row).val(upval);

			var this_val=$('#discount_percentbox'+this_row).val(); 
			$('#discountbox'+this_row).val((price*upval)*this_val/100);

			var x = 0;
			var intervalID = setInterval(function () {

				calculate_item_table(this_row,price);
				calculate_invoice(); 
				calculate_due_amount();  
				calculate_due_amount(); 
				calculate_tax_amount();

			if (++x === 5) {
			       window.clearInterval(intervalID);
			   }
			}, 100);
	});

	$(document).on('click change input','.price', function(){
		var this_row=$(this).data('row');
		var this_product=$(this).data('product');
		var stock=$(this).data('stock');
		var price=$(this).val();
		var qnumber4=1;
		var x = 0;

		 if (price<1) {
		 	price=0;
		 }

		var this_val=$('#discount_percentbox'+this_row).val(); 
			$('#discountbox'+this_row).val((price*qnumber4)*this_val/100);

		var intervalID = setInterval(function () {

			calculate_item_table(this_row,price);
			calculate_invoice(); 
			calculate_due_amount();  
			calculate_due_amount(); 
			calculate_tax_amount();

		if (++x === 2) {
		       window.clearInterval(intervalID);
		   }
		}, 100);

	});


	$(document).on('click change input','.quantity_input', function(){
		var this_row=$(this).data('row');
		var this_product=$(this).data('product');
		var stock=$(this).data('stock');
		var price=$('#price_bx'+this_row).val();
		var qnumber4=$(this).val();
		var x = 0;

		var this_val=$('#discount_percentbox'+this_row).val(); 
			$('#discountbox'+this_row).val((price*qnumber4)*this_val/100);

		var intervalID = setInterval(function () {

			calculate_item_table(this_row,price);
			calculate_invoice(); 
			calculate_due_amount();  
			calculate_due_amount(); 
			calculate_tax_amount();

		if (++x === 5) {
		       window.clearInterval(intervalID);
		   }
		}, 100);

	});

	

	$(document).on('click input','.discount_input,.discount_percent_input', function(){
		var this_row=$(this).data('row');
		var this_val=$(this).val();
		var type=$(this).data('type');
		var this_product=$(this).data('product');
		var price=$('#price_bx'+this_row).val();
		var p_price=$('#price_bx'+this_row).val(); 
		var p_qty=$('#quantity_input'+this_row).val(); 

		

		if (type=='percent') {
			$('#discountbox'+this_row).val((p_price*p_qty)*this_val/100);
		}else{
			$('#discount_percentbox'+this_row).val(this_val/(p_price*p_qty)*100);
		}



			var qty = $('#quantity_input'+this_row).val();
	  var discount = $('#discountbox'+this_row).val(); 
 

	        if (qty=='') {
	        	qty=1;
	        }
	        if (discount=='') {
	        	discount=0;
	        }

	        
				            
	    var calc_amt=(parseFloat(price)*parseFloat(qty))-parseFloat(discount);
	    var tax = $('#taxbox'+this_row).val();
			if (tax!='') {
      	var taxamt=calc_amt*tax/100;

      	if (1) {

      	}else{
      		calc_amt+=parseFloat(taxamt);
      	}
      	
      }
	    $('#proprice'+this_row).val(calc_amt+taxamt);

	    $('#propricelabel'+this_row).html(calc_amt+taxamt);

	    $('#taxboxlabel'+this_row).html(taxamt);
	    $('#p_tax_box'+this_row).val(taxamt);


		
		var x = 0;
		var intervalID = setInterval(function () {

			// calculate_item_table(this_row,price);
			calculate_invoice(); 
			calculate_due_amount();  
			calculate_due_amount(); 
			calculate_tax_amount();

		if (++x === 5) {
		       window.clearInterval(intervalID);
		   }
		}, 100);


	});






	$(document).on('click','.edit_purchase_price', function(){
		var this_product=$(this).data('proid');
		var rowid=$(this).data('rowid');
		var purchased_price=$('#purchase_price_text'+rowid).val();
		var selling_price=$('#selling_price_text'+rowid).val();
		var purchase_tax=$('#purchase_tax_text'+rowid).val();
		var sale_tax=$('#sale_tax_text'+rowid).val();
		var unit=$('#unit_text'+rowid).val();
		var tax=$('#tax_text'+rowid).val();
		var pmrp=$('#pmrp'+rowid).val();
		var p_margin=$('#p_margin'+rowid).val();
		var s_margin=$('#s_margin'+rowid).val();

		var tax_percent=$('#tax_text'+rowid).find(':selected').data('perc');
		var tax_name=$('#tax_text'+rowid).find(':selected').data('tname');


		var view_type=$('#view_type').val();
		if (view_type=='sales') {
			if (sale_tax==1) {
				var tz='1.'+tax_percent;

				var price=(selling_price/tz).toFixed(2);
			}else{
				// alert(selling_price)
				var price=selling_price;
			}
			 
		}else{
			if (purchase_tax==1) {
					var pz='1.'+tax_percent;
					var price=(purchased_price/pz).toFixed(2); 
				}else{
					var price=purchased_price;
				}
		}

		

		
		

		$(this).find(':selected').data('id')

		var csrfName = $('#csrf_token').attr('name'); // CSRF Token name
    var csrfHash = $('#csrf_token').val(); // CSRF hash

		$.ajax({
			type:'POST',
	        url: base_url()+"products/update_price/"+this_product,
	        data:{
	        	purchased_price:purchased_price,
						price:selling_price,
						unit:unit,
						tax:tax,
						purchase_tax:purchase_tax,
						sale_tax:sale_tax,
						mrp:pmrp,
						purchase_margin:p_margin,
						sale_margin:s_margin,
						[csrfName]: csrfHash
	        },
	        beforeSend: function() {
	        	$('#edit_purchase_price'+rowid).html('Saving...');
		    },
	        success:function(response) {
	        	var final_price=0;
	        	if (view_type=='sales') {
							final_price=selling_price;
						}else{
							final_price=purchased_price;
						}

				


				$('#id_purchase_tax_pptax'+rowid).val(purchase_tax);
				$('#id_sale_tax_pptax'+rowid).val(sale_tax);

				$('#price_bx'+rowid).val(price);
				$('#p_unitbox'+rowid).val(unit);

				var tax_val=final_price*tax_percent/100;

				$('#tax_hider'+rowid).html('Tax: '+tax_name);
				$('#taxboxlabel'+rowid).html(tax_val);
				$('#p_tax_box'+rowid).val(tax_val);

			  $('#taxbox'+rowid).val(tax_percent);
			  $('#pptax'+rowid).val(tax);

				$('#quantity_input'+rowid).data('price',price);
				$('#discountbox'+rowid).data('price',price);
				$('#discount_percentbox'+rowid).data('price',price);
				$('#qty_plus'+rowid).data('price',price);
				$('#qty_minus'+rowid).data('price',price);


				
				$(this).siblings('.qty_plus').data('price',price);

				var x = 0;
				var intervalID = setInterval(function () {

					calculate_invoice(); 
					calculate_due_amount();  
					calculate_due_amount(); 
					calculate_tax_amount();
					calculate_item_table(rowid,price);
					
				if (++x === 5) {
				       window.clearInterval(intervalID);
				   }
				}, 100);

				
				
				$('#price_edit_popup'+rowid).removeClass('d-block');
				$('#edit_purchase_price'+rowid).html('Save');
	         },
	         error:function(){
	          alert("error");
	         }
	    });
		
	});

	$(document).on('click change input','#cash_input,#cheque_input,#bt_input', function(){
		var grand_total_amount=$('#grand_total_label').html();
		var payment_type = $('#payment_type').val();
		var pay_amount=0;
		
		pay_amount=$('#cash_input').val();

		if (pay_amount=='') {
			var pay_amount=0;
		}

	    var due_amount = parseFloat(grand_total_amount)-parseFloat(pay_amount);

		$("#due_amount").val(due_amount);
        $("#due_amount_label").html(due_amount);
	});
        



	//////////////////////////// CALCULATIONS //////////////////////////////////
	function calculate_item_table(this_row,product_price){
		console.log('hi')
		// var product_price=0;
		// $.ajax({
  //           url: base_url()+"sales/get_price?prod="+this_product,
  //           success:function(response) {
  //           	product_price=$.trim(response);

            	
            	

  //           },
	 //         error:function(){
	 //          alert("error");
	 //         }
	 //    });

	    // $('#price_bx'+this_row).val(response);

		var qty = $('#quantity_input'+this_row).val();
	  var discount = $('#discountbox'+this_row).val();
	  var discount_percentbox = $('#discount_percentbox'+this_row).val();

	  $('#discount_percentbox'+this_row).val(discount/(product_price*qty)*100);

	        if (qty=='') {
	        	qty=1;
	        }
	        if (discount=='') {
	        	discount=0;
	        }

	        
				            
	    var calc_amt=(parseFloat(product_price)*parseFloat(qty))-parseFloat(discount);
	    var tax = $('#taxbox'+this_row).val();
			if (tax!='') {
      	var taxamt=calc_amt*tax/100;

      	if (1) {

      	}else{
      		calc_amt+=parseFloat(taxamt);
      	}
      	
      }
	    $('#proprice'+this_row).val(calc_amt+taxamt);

	    $('#propricelabel'+this_row).html(calc_amt+taxamt);

	    $('#taxboxlabel'+this_row).html(taxamt);
	    $('#p_tax_box'+this_row).val(taxamt);

	            
	            

	            // alert(this_row+this_product);

				
		
		
	}

	function calculate_due_amount(){
		var grand_total_amount=$('#grand_total_label').html();
		var payment_type = $('#payment_type').val();
		var pay_amount=0;
		
			pay_amount=$('#cash_input').val();

	    var due_amount = parseFloat(grand_total_amount)-parseFloat(pay_amount);

		  $("#due_amount").val(due_amount.toFixed());
      $("#due_amount_label").html(due_amount.toFixed());
	}

	function calculate_tax_amount(){
		var taxsum = 0;
		var sub_total=0;
		$(".item_total").each(function() {          
          if (!isNaN(this.value) && this.value.length != 0) {
            sub_total += parseFloat(this.value);
          }    
        });
        var disc= $("#discountval").val();
        var sub_total = parseFloat(sub_total)-parseFloat(disc);

		    $(".tax_tr").each(function() {          
          var ti=$(this).data('taxidentifier'); 
          var tax_percent=$('#taxpercent'+ti).val();
          var taxamount = parseFloat(sub_total)*parseFloat(tax_percent)/100;
          $("#taxamount"+ti).val(taxamount);
          $("#taxamountlabel"+ti).html(taxamount);
          taxsum += parseFloat(taxamount);
        });



        

        var total_taxamt_label_main=0;
        $(".tbox").each(function() {          
          var taxmt=$(this).html(); 
           total_taxamt_label_main+= parseFloat(taxmt)
        });

        
        $("#total_taxamt_label_main").html(total_taxamt_label_main);
        $("#total_taxamt").val(total_taxamt_label_main);
        $("#total_taxamt_label").html(total_taxamt_label_main);

	}


	
	

	$(document).on('change','#round_type',function(){
		calculate_invoice();
	});

	$(document).on('input','#round_off',function(){
		calculate_invoice();
	});

	function calculate_invoice(){
		var sum = 0;        
        $(".item_total").each(function() {          
          if (!isNaN(this.value) && this.value.length != 0) {
            sum += parseFloat(this.value);
          }    
        });
		
		if ($('#disc_val').val()=='' ) {
			entire_discount = 0;
		}else{
			var entire_discount = parseFloat($('#disc_val').val());
		}
		var taxamount = $("#total_taxamt").val();
		var round_type = $("#round_type").val();
		var round_off = $.trim($("#round_off").val());

        var sub_total = parseFloat(sum);

        var grand_total =parseFloat(sum);

        
				var fin_grand_total=0;

        if (round_off!='') {
        	if (round_type=='add') {
        		fin_grand_total=parseFloat(grand_total)+parseFloat(round_off);
        	}else{
        		fin_grand_total=parseFloat(grand_total)-parseFloat(round_off);
        	}
        }else{
        	round_off=0;
        	fin_grand_total=grand_total;
        }

        var txxmt=$("#total_taxamt_label_main").html();

		
        //displayinmg value
        $("#discountval").val(entire_discount);
        $("#discountval_label").html(entire_discount);
        $("#subtotal").val(sub_total);
        $("#subtotal_label").html(sub_total-parseFloat(txxmt));

        $("#grand_total").val(fin_grand_total);
        $("#grand_total_label").html(fin_grand_total.toFixed(round_of_value()));

        $("#cash_input").val(fin_grand_total.toFixed());
        $("#cheque_input").val(fin_grand_total);
        $("#bt_input").val(fin_grand_total);




	}




	function loc(){
		var loc=$('#loc').val();
		if (loc==0) {
			return 4;
		}else{
			return loc;
		}
		
	}

	function round_of_value(){
		var round_of_value=$('#round_of_value').val();
		return round_of_value;
	}

});