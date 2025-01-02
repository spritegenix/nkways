$(document).ready(function () {
  var row = 0;
  var taxrow = 0;
  var product_js_id = 0;
  var last_inserted_row = 0;
  var proqty = 2;
  var last_bar_code = 0;
  var foucc = 0;
  var is_split = false;
  var focus_element = 0;

  if ($('#split_tax').val() == 1) {
    is_split = true;
  }

  if ($('#focus_element').val() == 1) {
    focus_element = 1;
  }

  if ($('#focus_element').val() == 2) {
    focus_element = 2;
  }

  if (focus_element == 1) {
    $('#product_code').focus();
  } else if (focus_element == 2) {
    $('#productbarcodesearch').focus();
  } else {
    $('#typeandsearch').focus();
  }

  $(document).on('click', '.close_receipt', function () {
    $('#receipt_show').modal('hide');
    location.reload();
  });

  $(document).on('input paste', '#pmrp,#p_margin,#s_margin', function () {
    var p_mrp = 0;
    var p_margin = 0;
    var s_margin = 0;

    if ($('#pmrp').val() != '') {
      p_mrp = $('#pmrp').val();
    }

    if ($('#p_margin').val() != '') {
      p_margin = $('#p_margin').val();
    }

    if ($('#s_margin').val() != '') {
      s_margin = $('#s_margin').val();
    }

    var purchase_price = p_mrp - (p_mrp * p_margin) / 100;
    var sell_price = p_mrp - (p_mrp * s_margin) / 100;

    $('#pprice').val(purchase_price);
    $('#psellprice').val(sell_price);
  });

  $(document).on('input paste', '.pmrp,.p_margin,.s_margin', function () {
    var rowid = $(this).data('rowin');
    var p_mrp = 0;
    var p_margin = 0;
    var s_margin = 0;

    if ($('#pmrp' + rowid).val() != '') {
      p_mrp = $('#pmrp' + rowid).val();
    }

    if ($('#p_margin' + rowid).val() != '') {
      p_margin = $('#p_margin' + rowid).val();
    }

    if ($('#s_margin' + rowid).val() != '') {
      s_margin = $('#s_margin' + rowid).val();
    }

    var purchase_price = p_mrp - (p_mrp * p_margin) / 100;
    var sell_price = p_mrp - (p_mrp * s_margin) / 100;

    $('#purchase_price_text' + rowid).val(purchase_price);
    $('#selling_price_text' + rowid).val(sell_price);
  });

  var indian_states = {
    1: 'Jammu & Kashmir',
    2: 'Himachal Pradesh',
    3: 'Punjab',
    4: 'Chandigarh',
    5: 'Uttarakhand',
    6: 'Haryana',
    7: 'Delhi',
    8: 'Rajasthan',
    9: 'Uttar Pradesh',
    10: 'Bihar',
    11: 'Sikkim',
    12: 'Arunachal Pradesh',
    13: 'Nagaland',
    14: 'Manipur',
    15: 'Mizoram',
    16: 'Tripura',
    17: 'Meghalaya',
    18: 'Assam ',
    19: 'West Bengal',
    20: 'Jharkhand',
    21: 'Orissa',
    22: 'Chhattisgarh',
    23: 'Madhya Pradesh',
    24: 'Gujarat',
    25: 'Daman & Diu',
    26: 'Dadra & Nagar Haveli',
    27: 'Maharashtra',
    28: 'Andhra Pradesh (Old)',
    29: 'Karnataka',
    30: 'Goa',
    31: 'Lakshadweep',
    32: 'Kerala',
    33: 'Tamil Nadu',
    34: 'Puducherry',
    35: 'Andaman & Nicobar Islands',
    36: 'Telengana',
    37: 'Andhra Pradesh (New)',
  };

  var staval = $('#state_select_box').val();
  $(document).on('input click keypress', '#gst_input', function () {
    var gst_val = $.trim($(this).val());
    $('.disable_layer').remove();

    $('#state_select_box').val(staval).trigger('change');
    if (gst_val != '' && gst_val.length > 1) {
      var state_code = gst_val.substr(0, 2);

      if (typeof indian_states[state_code] == 'undefined') {
        $('#state_select_box').val(staval).trigger('change');
      } else {
        $('#state_select_box').val(indian_states[state_code]).trigger('change');
        $('#layerer').prepend('<div class="disable_layer"></div>');
      }
    }
    // state_select_box
  });

  $(document).on('click', '#pro_selector_btn', function () {
    $('#pro_selector').modal('show');

    display_products('', '', '');

    setTimeout(function () {
      $('#productsearch').filter(':visible').focus();
    }, 500);
  });

  $(document).on('click', '.category_box', function () {
    var catid = $(this).data('catid');
    display_products('', catid, '');
  });

  $(document).on('click', '.sub_category_box', function () {
    var subcatid = $(this).data('subcatid');
    display_products('', '', subcatid);
  });

  $(document).on('append input change paste', '#productsearch', function () {
    var input = $(this).data('input');
    var search_text = $.trim($('#productsearch').val());
    if (search_text.length >= 3) {
      display_products(search_text, '', '', input);
    } else {
      display_products('', '', '');
    }
  });

  $('#down_pro').click(function () {
    $('#products').animate({ scrollTop: '+=180px' }, 100);
  });

  $('#up_pro').click(function () {
    $('#products').animate({ scrollTop: '-=180px' }, 100);
  });

  $('#down_pro_table').click(function () {
    $('.pos_tableWrap').animate({ scrollTop: '+=180px' }, 100);
  });

  $('#up_pro_table').click(function () {
    $('.pos_tableWrap').animate({ scrollTop: '-=180px' }, 100);
  });

  $(document).on('click', '#cat_back', function () {
    display_products('', '', '');
  });

  $(document).on('click', '.go_back_or_close', function () {
    if (1 < history.length) {
      history.back();
    } else {
      window.close();
    }
  });

  $(document).on('click', '#addnewproductbutton', function () {
    $('#addnewproduct').modal('show');
    $.ajax({
      url: base_url() + '/products/get_form',
      success: function (response) {
        $('#add_product_form_container_createinvoice').html(response);
      },
    });
  });

  var row = 1;
  $(document).on('click', '.add_pro_unit', function () {
    $('#unit_container_product').toggle();
  });

  $(document).on('click', '.addd_unit', function () {
    var unit_name = $.trim($('#unit_name').val());
    if (unit_name != '') {
      var csrfName = $('#csrf_token').attr('name'); // CSRF Token name
      var csrfHash = $('#csrf_token').val(); // CSRF hash

      $.ajax({
        url: base_url() + '/settings/add_unit_from_ajax',
        type: 'POST',
        data: {
          unit_name: unit_name,
          [csrfName]: csrfHash,
        },
        success: function (response) {
          if ($.trim(response) != 0) {
            $('#unit_name').val('');
            $('#unit_container_product').toggle();
            $('#unit').append(
              '<option value="' +
                response +
                '" selected>' +
                unit_name +
                '</option>'
            );
          }
        },
        error: function () {
          alert('error');
        },
      });
    }
  });

  var row = 1;
  $(document).on('click', '.add_pro_cat', function () {
    $('#cat_container_product').toggle();
  });

  $(document).on('click', '.addd_cate', function () {
    var cat_name = $.trim($('#cat_name').val());
    if (cat_name != '') {
      var csrfName = $('#csrf_token').attr('name'); // CSRF Token name
      var csrfHash = $('#csrf_token').val(); // CSRF hash

      $.ajax({
        url: base_url() + '/settings/add_cate_from_ajax',
        type: 'POST',
        data: {
          cat_name: cat_name,
          [csrfName]: csrfHash,
        },
        success: function (response) {
          if ($.trim(response) != 0) {
            $('#cat_name').val('');
            $('#cat_container_product').toggle();
            $('#category').append(
              '<option value="' +
                response +
                '" selected>' +
                cat_name +
                '</option>'
            );
          }
        },
        error: function () {
          alert('error');
        },
      });
    }
  });

  var row = 1;
  $(document).on('click', '.add_pro_subcat', function () {
    var elem = $(this).data('proid');
    $('#subcat_container_product' + elem).toggle();
  });

  $(document).on('click', '.addd_subcate', function () {
    $('#subcater').html('');
    var elem = $(this).data('proid');
    var subcat_name = $.trim($('#subcat_name' + elem).val());

    var pcategory = $.trim($('#category' + elem).val());
    if (subcat_name != '') {
      var csrfName = $('#csrf_token').attr('name'); // CSRF Token name
      var csrfHash = $('#csrf_token').val(); // CSRF hash

      $.ajax({
        url: base_url() + '/settings/add_subcate_from_ajax',
        type: 'POST',
        data: {
          subcat_name: subcat_name,
          pcategory: pcategory,
          [csrfName]: csrfHash,
        },
        success: function (response) {
          if ($.trim(response) != 0) {
            $('#subcat_name' + elem).val('');
            $('#subcat_container_product' + elem).toggle();
            $('#sub_category' + elem).append(
              '<option value="' +
                response +
                '" selected>' +
                subcat_name +
                '</option>'
            );
          } else {
            $('#subcater').html(
              '<span class="text-danger" style="font-size: 12px;">Select parent category</span>'
            );
          }
        },
        error: function () {
          alert('error');
        },
      });
    }
  });

  $(document).on('change', '.parc', function () {
    var parent = $(this).val();
    var elem = $(this).data('proid');

    $.ajax({
      url: base_url() + '/products/get_sub_select/' + parent,
      success: function (response) {
        $('#sub_category' + elem).html(response);
        $('#secondary_category' + elem).html(
          '<option value="">Select Secondary Category</option>'
        );
      },
      error: function () {
        alert('error');
      },
    });
  });

  $(document).on('change', '.subu', function () {
    var unit = $.trim($('#unit').val());
    var sub_unit = $.trim($('#sub_unit').val());
    var elem = $(this).data('proid');

    if (unit == '') {
      $('#subuer').html('Select primary unit');
      // $('#sub_unit').val('').trigger('change');
    } else if (unit == sub_unit) {
      $('#subuer').html('Unit & Sub unit are same');
      $('#sub_unit').val('').trigger('change');
    } else {
      // $('#subuer').html('');
    }

    if (unit != '' && sub_unit != '' && unit != sub_unit) {
      $('.add_conversion').removeClass('d-none');
      $('#subuer').html('');
    } else {
      $('.add_conversion').addClass('d-none');
    }
  });

  $(document).on('change', '#unit', function () {
    var unit = $.trim($('#unit').val());
    var sub_unit = $.trim($('#sub_unit').val());
    if (unit == '') {
      $('#subuer').html('Select primary unit');
      $('#sub_unit').val('').trigger('change');
    } else if (unit == sub_unit) {
      $('#subuer').html('Unit & Sub unit are same');
      $('#sub_unit').val('').trigger('change');
    } else {
      $('#subuer').html('');
    }
    if (unit != '' && sub_unit != '' && unit != sub_unit) {
      $('.add_conversion').removeClass('d-none');
      $('#subuer').html('');
    } else {
      $('.add_conversion').addClass('d-none');
      $('#subuer').html('');
    }
  });

  var row = 1;
  $(document).on('click', '.add_pro_seccat', function () {
    var elem = $(this).data('proid');
    $('#seccat_container_product' + elem).toggle();
  });

  $(document).on('click', '.addd_seccate', function () {
    $('#seccater').html('');
    var elem = $(this).data('proid');
    var seccat_name = $.trim($('#seccat_name' + elem).val());
    var pcategory = $.trim($('#sub_category' + elem).val());
    var csrfName = $('#csrf_token').attr('name'); // CSRF Token name
    var csrfHash = $('#csrf_token').val(); // CSRF hash

    if (seccat_name != '') {
      $.ajax({
        url: base_url() + '/settings/add_seccate_from_ajax',
        type: 'POST',
        data: {
          seccat_name: seccat_name,
          pcategory: pcategory,
          [csrfName]: csrfHash,
        },
        success: function (response) {
          if ($.trim(response) != 0) {
            $('#seccat_name' + elem).val('');
            $('#seccat_container_product' + elem).toggle();
            $('#secondary_category' + elem).append(
              '<option value="' +
                response +
                '" selected>' +
                seccat_name +
                '</option>'
            );
          } else {
            $('#seccater').html(
              '<span class="text-danger" style="font-size: 12px;">Select parent category</span>'
            );
          }
        },
        error: function () {
          alert('error');
        },
      });
    }
  });

  var row = 1;
  $(document).on('click', '.add_pro_brand', function () {
    $('#brand_container_product').toggle();
  });

  $(document).on('click', '.addd_brand', function () {
    var brand_name = $.trim($('#brand_name').val());
    if (brand_name != '') {
      var csrfName = $('#csrf_token').attr('name'); // CSRF Token name
      var csrfHash = $('#csrf_token').val(); // CSRF hash

      $.ajax({
        url: base_url() + '/settings/add_brand_from_ajax',
        type: 'POST',
        data: {
          brand_name: brand_name,
          [csrfName]: csrfHash,
        },
        success: function (response) {
          if ($.trim(response) != 0) {
            $('#brand_name').val('');
            $('#brand_container_product').toggle();
            $('#brand').append(
              '<option value="' +
                response +
                '" selected>' +
                brand_name +
                '</option>'
            );
          }
        },
        error: function () {
          alert('error');
        },
      });
    }
  });

  $(document).on('input', '.SpriteGenix_select input[type=text]', function () {
    var this_elem = $(this);
    var search_text = $.trim($(this).val());
    var select_url = $.trim($(this).data('select_url'));
    $(this_elem).siblings('.SpriteGenix_select_suggest').html('');
    if (search_text.length > 0) {
      $.ajax({
        type: 'GET',
        url: select_url + '/' + search_text,
        beforeSend: function () {},
        success: function (response) {
          $(this_elem).siblings('.SpriteGenix_select_suggest').html(response);
        },
      });
    }
  });

  $(document).on('click', '.select_li', function () {
    var this_elem = $(this);
    var text = $.trim($(this).data('text'));
    var value = $.trim($(this).data('value'));
    var credit_limit = $.trim($(this).data('credit_limit'));
    var closing_balance = $.trim($(this).data('closing_balance'));

    $(this_elem)
      .parents()
      .siblings('.SpriteGenix_select select')
      .html(
        '<option value="' +
          value +
          '" data-credit_limit="' +
          credit_limit +
          '" data-closing_balance="' +
          closing_balance +
          '" selected>' +
          text +
          '</option>'
      );

    $(this_elem)
      .parents()
      .siblings('.SpriteGenix_select select')
      .removeClass('d-none');
    $(this_elem)
      .parents()
      .siblings('.SpriteGenix_select select')
      .addClass('d-block');

    $(this_elem)
      .parents()
      .siblings('.SpriteGenix_select input')
      .addClass('d-none');
    $(this_elem)
      .parents()
      .siblings('.SpriteGenix_select input')
      .removeClass('d-block');
    $(this_elem).parents().siblings('.select_close').addClass('d-none');
    $(this_elem).parents().siblings('.select_close').removeClass('d-block');

    $(this_elem).parents('.SpriteGenix_select_suggest').html('');
  });

  $(document).on('click', '.SpriteGenix_select select', function () {
    var this_elem = $(this);
    $(this).css('display', 'none');
    $(this_elem).siblings('input').removeClass('d-none');
    $(this_elem).siblings('input').addClass('d-block').focus();
    $(this_elem).siblings('.select_close').removeClass('d-none');
    $(this_elem).siblings('.select_close').addClass('d-block').focus();

    $(this_elem).removeClass('d-block');
    $(this_elem).addClass('d-none');
  });

  $(document).on('click', '.select_close', function () {
    var this_elem = $(this);
    $(this_elem).siblings('select').removeClass('d-none');
    $(this_elem).siblings('select').addClass('d-block');

    $(this_elem).siblings('input').addClass('d-none');
    $(this_elem).siblings('input').removeClass('d-block');
    $(this_elem).addClass('d-none');
    $(this_elem).removeClass('d-block');

    $(this_elem).siblings('.SpriteGenix_select_suggest').html('');
  });

  $(document).on('click', '#submit_invoice', function (e) {
    var st = $('#subtotal').val();
    var grand_total = $('#grand_total').val();
    var view_method = $('#view_method').val();

    if (view_method == 'create') {
      var total_cash = $('#cash_input').val();
    } else {
      var total_cash = $('#paid_amt').val();
    }

    var party_box = $('#party_box').val();
    var due_amount = $('#due_amount').val();

    var credit_limit = $('#party_box').find(':selected').data('credit_limit');
    var closing_balance = $('#party_box')
      .find(':selected')
      .data('closing_balance');

    var inid = $(this).data('inid');
    if ($.trim(party_box) != '' && $.trim(party_box) != 0) {
      if (st != 0) {
        if (parseFloat(total_cash) > parseFloat(grand_total)) {
          if (view_method == 'create') {
            $('#mess').html(
              '<span class="my-2">Please enter an amount less than or equal to the total amount!</div>'
            );
          } else {
            $('#mess').html(
              '<span class="my-2">Cannot updated the invoice with lower amount than current payment made.<br> <a href="' +
                base_url() +
                'fees_and_payments/payments/' +
                inid +
                '">Delete vouchers</a></div>'
            );
          }
        } else {
          $('#submit_invoice').prop('disabled', true);
          var status = navigator.onLine;
          if (status) {
            var allow_submit = true;
            var due_close =
              parseFloat(closing_balance) + parseFloat(due_amount);

            if (credit_limit > 0) {
              if (due_amount > 0) {
                if (credit_limit < due_close) {
                  Swal.fire({
                    title: 'Are you sure?',
                    text:
                      'Credit limit ' +
                      credit_limit +
                      ' of this party has been exceeded.',
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonClass: 'btn-danger',
                    confirmButtonText: 'Yes, Complete!',
                    cancelButtonText: 'No, Cancel!',
                    closeOnConfirm: false,
                    closeOnCancel: false,
                  }).then((result) => {
                    if (result.isConfirmed) {
                      sinv(inid);
                    } else {
                      $('#submit_invoice').prop('disabled', false);
                    }
                  });
                } else {
                  sinv(inid);
                }
              } else {
                sinv(inid);
              }
            } else {
              sinv(inid);
            }
          } else {
            $('#submit_invoice').prop('disabled', false);
            $('#mess').html('<span class="my-2">No internet</div>');
          }
        }
      } else {
        $('#mess').html('<span class="my-2">Item is empty!</div>');
      }
    } else {
      $('#mess').html('<span class="my-2">Please select party!</div>');
    }
  });

  function sinv(inid) {
    $.ajax({
      type: 'POST',
      url: $('#invoice_form').attr('action'),
      data: $('#invoice_form').serialize(),
      beforeSend: function () {
        $('#submit_invoice').html(
          '<span class="spinner-grow spinner-grow-sm mr-1" role="status" aria-hidden="true"></span> Loading...'
        );
      },
      success: function (response) {
        // alert(response);
        $('#submit_invoice').prop('disabled', false);
        $('#submit_invoice').html('<i class="mdi mdi-plus mr-1"></i> Complete');
        $('#mess').html('');
        $('#receiptmodal').modal('show');
        display_invoice($.trim(response));
        $('#invoice_form')[0].reset();
        reset_invoice();
        display_products('', '', '');

        if ($('#view_method').val() == 'convert') {
          try {
            var valNew = inid.split(',');

            for (var i = 0; i < valNew.length; i++) {
              convert_invoice(valNew[i]);
            }
          } catch {
            convert_invoice(inid);
          }
        }
      },
      error: function (response) {
        alert(JSON.stringify(response));
      },
    });
  }

  $(document).on('click', '.tranname', function () {
    var p_name = $(this).data('tranname');
    var view_type = $(this).data('view_type');

    if (view_type != 'sales') {
      $('#party_type').val('vendor');
    }

    $('#display_name').val(p_name);
  });

  function convert_invoice(invoice) {
    var csrfName = $('#csrf_token').attr('name'); // CSRF Token name
    var csrfHash = $('#csrf_token').val(); // CSRF hash
    $.ajax({
      url: base_url() + 'invoices/convert_invoice/' + invoice,
      data: {
        [csrfName]: csrfHash,
      },
      success: function (response) {},
      error: function () {
        alert('error');
      },
    });
  }

  function reset_invoice() {
    $('#products_table').html('');
    $('#tax_table').html('');
    calculate_invoice();
    calculate_due_amount();
    calculate_due_amount();
    calculate_tax_amount();
    if (focus_element == 1) {
      $('#product_code').focus();
    } else {
      $('#productbarcodesearch').focus();
    }
  }

  function display_invoice(invoice) {
    var csrfName = $('#csrf_token').attr('name'); // CSRF Token name
    var csrfHash = $('#csrf_token').val(); // CSRF hash
    var thermalcheck = 0;

    if ($('#thermalcheck').val() == 1) {
      thermalcheck = 1;
    }
    if (thermalcheck == 0) {
      $('#receipt_show').html(
        '<iframe src="' +
          base_url() +
          'invoices/get_invoice_pdf/' +
          invoice +
          '/view" class="erp_iframe" id="erp_iframe"></iframe>'
      );

      const iframe = document.getElementById('erp_iframe');
      iframe.srcdoc =
        '<!DOCTYPE html><div style="color: green; width: 100%;height: 90vh;display: flex;"><div style="margin:auto; font-family: system-ui;">Rendering Content...</div></div>';
      iframe.addEventListener('load', () =>
        setTimeout(function () {
          iframe.removeAttribute('srcdoc');
        }, 2500)
      );

      // $.ajax({
      //     url: base_url()+"invoices/get_invoice/"+invoice,
      //     data:{
      // 			[csrfName]: csrfHash
      // 		},
      //     success:function(response) {

      //     	$('#receipt_show').html(response);
      //     	var hhref=base_url()+'invoices/get_invoice_pdf/'+invoice;
      //     	$('#pdf_button').data('href',hhref);

      //    },
      //    error:function(){
      //     alert("error");
      //    }
      //  });
    } else {
      $.ajax({
        url: base_url() + 'invoices/get_thermal_script/' + invoice,
        data: {
          [csrfName]: csrfHash,
        },
        success: function (response) {
          $('#remove_style').removeAttr('style');
          $('#pdfthermalthis').html(response);

          var hhref = base_url() + 'invoices/get_invoice_pdf/' + invoice;
          $('#pdf_button').data('href', hhref);

          var btnnn =
            '<button type="button" data-inv="' +
            invoice +
            '"  class="thermal_print btn btn-primary" ><i class="fa fa-print"></i> <span>Print Thermal Receipt</span></button>';

          // $('#thermal_btn').html(btnnn);
        },
        error: function () {
          alert('error');
        },
      });
      // $.ajax({
      //   url:  base_url()+"invoices/get_thermal_invoice/"+invoice,
      //     data:{
      // 			[csrfName]: csrfHash
      // 		},
      //   success:function(response) {

      //     	 $('#pdfthermalthis').html(response);

      //     var btnnn='<button type="button" data-inv="'+invoice+'"  class="thermal_print btn btn-primary" ><i class="fa fa-print"></i> <span>Print Thermal Receipt</span></button>';

      //     // $('#thermal_btn').html(btnnn);

      //  },
      //  error:function(){
      //   alert("error");
      //  }
      // });
    }
  }

  $(document).on('click', '.pdf_open', function () {
    var href = $(this).data('href');
    var last_height = $('#last_height').val();
    // $('#pdf_modal').modal('show');

    $('#pdf_show_div').html(
      '<iframe src="' +
        href +
        '/' +
        last_height +
        '" class="erp_iframe" id="erp_iframe"></iframe>'
    );

    const iframe = document.getElementById('erp_iframe');
    iframe.srcdoc =
      '<!DOCTYPE html><div style="color: green; width: 100%;height: 90vh;display: flex;"><div style="margin:auto; font-family: system-ui;">Rendering PDF...</div></div>';
    iframe.addEventListener('load', () =>
      setTimeout(function () {
        iframe.removeAttribute('srcdoc');
      }, 2500)
    );
  });

  $(document).on('input', '#title', function () {
    var prreslugg = $.trim($('#title').val());
    slugg = prreslugg.replace(/\./g, '');
    var slugtext = slugg
      .split(' ')
      .join('-')
      .split('?')
      .join('-')
      .split('=')
      .join('-')
      .split('&')
      .join('-')
      .split('#')
      .join('');
    $('#slug').val(slugtext);
  });

  function display_products(search, category, subcategory, input = 'name') {
    var view_type = $('#view_type').val();
    var view_type = $('#view_type').val();
    var csrfName = $('#csrf_token').attr('name'); // CSRF Token name
    var csrfHash = $('#csrf_token').val(); // CSRF hash

    $.ajax({
      url:
        base_url() +
        'sales/display_products?product_name=' +
        search +
        '&category=' +
        category +
        '&subcategory=' +
        subcategory +
        '&view_type=' +
        view_type +
        '&product_type=' +
        input,
      data: {
        [csrfName]: csrfHash,
      },
      success: function (response) {
        $('#products').html(response);
      },
      error: function () {
        alert('error');
      },
    });
  }

  $(document).on('change', '#cusselct', function () {
    var thisval = $(this).val();
    var cus_name = $('#cusselct option:selected').text();
    $('#alternate_name').val(cus_name);
    if (thisval != 'CASH') {
      $('#alternate_name').prop('readonly', true);
    } else {
      $('#alternate_name').prop('readonly', false);
    }
  });

  $(document).on('click', '#new_window', function () {
    var currentURL =
      location.protocol + '//' + location.host + location.pathname;
    var cururl = currentURL + '?win=new_window';
    window.open(cururl, '_blank');
  });

  $(document).on('click', '#open_calculator', function () {
    window.open('Calculator:///');
  });

  $(document).on('click', '#fullscreen', function () {
    if (
      !document.fullscreenElement && // alternative standard method
      !document.mozFullScreenElement &&
      !document.webkitFullscreenElement &&
      !document.msFullscreenElement
    ) {
      // current working methods
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.msRequestFullscreen) {
        document.documentElement.msRequestFullscreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen(
          Element.ALLOW_KEYBOARD_INPUT
        );
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

  $(document).on('click', '#add_customer_ajax', function () {
    var display_name = $.trim($('#display_name').val());
    var email = $.trim($('#email').val());
    var contact_name = $.trim($('#contact_name').val());
    var party_type = $.trim($('#party_type').val());
    var phone = $.trim($('#phone').val());
    var website = $.trim($('#website').val());
    var country_code = $.trim($('#country_code').val());
    var credit_limit = $.trim($('#credit_limit').val());

    var gstno = $.trim($('#gst_input').val());
    var opening_balance = $.trim($('#opening_balance').val());
    var opening_type = $.trim($('#opening_type').val());
    var billing_address = $.trim($('#billing_address').val());
    var state_select_box = $.trim($('#state_select_box').val());

    var withajax = $.trim($('#withajax').val());

    $('#display_name').css('border-color', '#ced4da');
    $('#email').css('border-color', '#ced4da');

    if (display_name == '') {
      $('#display_name').css('border-color', 'red');
    } else {
      var csrfName = $('#csrf_token').attr('name'); // CSRF Token name
      var csrfHash = $('#csrf_token').val(); // CSRF hash

      var gstinformat = new RegExp(
        '/^([0-9]){2}([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}([0-9]){1}([a-zA-Z]){1}([0-9]){1}?$/'
      );

      var valid_gst = true;

      var reggst =
        /^([0-9]){2}([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}([0-9]){1}([a-zA-Z]){1}([0-9]){1}?$/;
      if (!reggst.test(gstno) && gstno != '') {
        valid_gst = true;
      }

      if (valid_gst == false) {
        $('#error_mes').html(
          '<div class="alert alert-danger mb-3 mb-3">Please Enter Valid GSTIN Number</div>'
        );
        // $("#gst_input").val('');
        $('#gst_input').focus();
        $('#gst_input').css('border-color', 'red');
      } else {
        $('#add_customer_ajax').prop('disabled', true);
        $.ajax({
          type: 'POST',
          url: $('#add_customer_ajax').data('action'),
          data: {
            display_name: display_name,
            email: email,
            contact_name: contact_name,
            country_code: country_code,
            credit_limit: credit_limit,
            party_type: party_type,
            phone: phone,
            website: website,
            gstno: gstno,
            opening_balance: opening_balance,
            opening_type: opening_type,
            billing_address: billing_address,
            billing_state: state_select_box,
            withajax: withajax,
            [csrfName]: csrfHash,
          },
          beforeSend: function () {},
          success: function (response) {
            var cuid = $.trim(response);
            if (cuid == 'failed') {
              $('#errrr').html('<div class="py-3">Failed to save!</div>');
            } else {
              $('#addcus').modal('hide');
              $('#alternate_name').val(display_name);
              $('#alternate_name').prop('readonly', true);
              $('#cusselct').append(
                '<option value="' +
                  cuid +
                  '" selected>' +
                  display_name +
                  '</option>'
              );

              var this_elem = $('#tranname');
              var text = display_name;
              var value = cuid;
              $(this_elem)
                .parents()
                .siblings('.SpriteGenix_select select')
                .html('<option value="' + value + '">' + text + '</option>');

              $(this_elem)
                .parents()
                .siblings('.SpriteGenix_select select')
                .removeClass('d-none');
              $(this_elem)
                .parents()
                .siblings('.SpriteGenix_select select')
                .addClass('d-block');

              $(this_elem)
                .parents()
                .siblings('.SpriteGenix_select input')
                .addClass('d-none');
              $(this_elem)
                .parents()
                .siblings('.SpriteGenix_select input')
                .removeClass('d-block');
              $(this_elem)
                .parents()
                .siblings('.select_close')
                .addClass('d-none');
              $(this_elem)
                .parents()
                .siblings('.select_close')
                .removeClass('d-block');

              $(this_elem).parents('.SpriteGenix_select_suggest').html('');
            }
            $('#add_customer_ajax').prop('disabled', false);
          },
          error: function () {
            alert('error');
          },
        });
      }
    }
  });

  function base_url() {
    var baseurl = $('#base_url').val();
    return baseurl;
  }

  $(document).on('change', '#invoice_date', function () {
    var csrfName = $('#csrf_token').attr('name'); // CSRF Token name
    var csrfHash = $('#csrf_token').val(); // CSRF hash
    var indate = $(this).val();

    $.ajax({
      url: base_url() + 'sales/get_date_format?date=' + indate,
      data: {
        [csrfName]: csrfHash,
      },
      success: function (response) {
        $('#invoice_date_label').html($.trim(response));
      },
    });
  });

  $(document).on(
    'append paste keyup keydown',
    '#typeandsearch,#typeandsearch_category,#product_code',
    function (e) {
      var search_text = $.trim($('#typeandsearch').val());
      var input = $(this).data('input');

      foucc = 0;
      var pro_start = 0;
      $('#loadbox_code').html('');
      $('#loadbox_name').html('');

      var view_type = $('#view_type').val();

      var typeandsearch_category = $.trim($('#typeandsearch_category').val());
      var search_code = $.trim($('#product_code').val());
      var csrfName = $('#csrf_token').attr('name'); // CSRF Token name
      var csrfHash = $('#csrf_token').val(); // CSRF hash

      if (input == 'code') {
        if (search_code != '' && search_code.length == 3) {
          $.ajax({
            url:
              base_url() +
              'sales/display_products?product_name=' +
              search_code +
              '&category=' +
              typeandsearch_category +
              '&subcategory=&view_type=' +
              view_type +
              '&product_type=' +
              input +
              '&start=' +
              pro_start,
            data: {
              [csrfName]: csrfHash,
            },
            beforeSend: function () {
              $('#loadbox_' + input).html(
                '<i class="bx bx-loader-alt bx-spin"></i>'
              );
            },
            success: function (response) {
              $('#loadbox_' + input).html('');
              $('#tandsproducts').html(response);
            },
            error: function () {
              alert('error');
            },
          });
        } else {
          $('#tandsproducts').html('');
        }
      } else {
        if ($.trim(search_text) != '') {
          if (
            e.keyCode != 8 &&
            e.keyCode != 37 &&
            e.keyCode != 38 &&
            e.keyCode != 39 &&
            e.keyCode != 40 &&
            e.keyCode == 13
          ) {
            typeandsearch_category = '';
            $('#typeandsearch_category').val('');

            $.ajax({
              url:
                base_url() +
                'sales/display_products?product_name=' +
                search_text +
                '&category=' +
                typeandsearch_category +
                '&subcategory=&view_type=' +
                view_type +
                '&product_type=' +
                input +
                '&start=' +
                pro_start,
              data: {
                [csrfName]: csrfHash,
              },
              beforeSend: function () {
                $('#loadbox_' + input).html(
                  '<i class="bx bx-loader-alt bx-spin"></i>'
                );
              },
              success: function (response) {
                $('#loadbox_' + input).html('');
                $('#tandsproducts').html(response);
              },
              error: function () {
                alert('error');
              },
            });
          }
        } else if ($.trim(typeandsearch_category) != '') {
          search_text = '';
          $('#typeandsearch').val('');
          $.ajax({
            url:
              base_url() +
              'sales/display_products?product_name=' +
              search_text +
              '&category=' +
              typeandsearch_category +
              '&subcategory=&view_type=' +
              view_type +
              '&product_type=' +
              input,
            data: {
              [csrfName]: csrfHash,
            },
            beforeSend: function () {
              $('#loadbox_' + input).html(
                '<i class="bx bx-loader-alt bx-spin"></i>'
              );
            },
            success: function (response) {
              $('#loadbox_' + input).html('');
              $('#tandsproducts').html(response);
            },
            error: function () {
              alert('error');
            },
          });
        } else {
          $('#tandsproducts').html('');
        }
      }
    }
  );

  $(document).on('click', '.load_more_box', function () {
    var thisssip = $(this);
    var csrfName = $('#csrf_token').attr('name'); // CSRF Token name
    var csrfHash = $('#csrf_token').val(); // CSRF hash
    var ostart = $(this).data('start');
    var search = $(this).data('search');
    var view_type = $(this).data('view_type');
    var input = $(this).data('input');
    var pro_start_new = parseInt(ostart) + 8;

    $.ajax({
      url:
        base_url() +
        'sales/display_products?product_name=' +
        search +
        '&category=&subcategory=&view_type=' +
        view_type +
        '&product_type=' +
        input +
        '&start=' +
        pro_start_new,
      data: {
        [csrfName]: csrfHash,
      },
      beforeSend: function () {
        $('#loadbox_' + input).html('<i class="bx bx-loader-alt bx-spin"></i>');
        $(thisssip).html('<i class="bx bx-loader-alt bx-spin"></i>');
      },
      success: function (response) {
        $('#loadbox_' + input).html('');
        $('#tandsproducts').html(response);
      },
      error: function () {
        alert('error');
      },
    });
  });

  $(document).keydown(function (e) {
    if (e.keyCode == 40) {
      // $(".item_box:focus").next().focus();

      if (foucc == 1) {
        $('.item_box:focus').next().focus();
      } else {
        $('.item_box:first').focus();
        foucc = 1;
      }
    }
    if (e.keyCode == 38) {
      $('.item_box:focus').prev().focus();
    }
  });

  $(document).on('change', '.in_unit', function () {
    var inu = $(this).val();
    var rowno = $(this).data('row');
    var proconversion_unit_rate = $(this).data('proconversion_unit_rate');
    var n_tax_percent = $('#tax_text' + rowno)
      .find(':selected')
      .data('perc');
    var view_type = $('#view_type').val();
    var is_subunit_divide = $('#is_subunit_divide').val();

    if (proconversion_unit_rate > 0) {
      if (is_subunit_divide == 1) {
        if (view_type == 'sales') {
          if ($('#sale_tax_text' + rowno).val() == 0) {
            var finprice = $('#selling_price_text' + rowno).val();
          } else {
            var finprice = $('#selling_price_text' + rowno).val();
            var tz = '1.' + n_tax_percent;
            var finprice = (finprice / tz).toFixed(2);
          }
        } else {
          if ($('#purchase_tax_text' + rowno).val() == 0) {
            var finprice = $('#purchase_price_text' + rowno).val();
          } else {
            var finprice = $('#purchase_price_text' + rowno).val();
            var tz = '1.' + n_tax_percent;
            var finprice = (finprice / tz).toFixed(2);
          }
        }

        if ($(this).children('option:first-child').is(':selected')) {
        } else {
          finprice = finprice / proconversion_unit_rate;
        }

        finprice = parseFloat(finprice);

        $('#price_bx' + rowno).val(finprice.toFixed(round_of_value()));
        $('#quantity_input' + rowno).data('price', finprice);
        $('#qty_minus' + rowno).data('price', finprice);
        $('#qty_plus' + rowno).data('price', finprice);
        $('#discountbox' + rowno).data('price', finprice);
        $('#discount_percentbox' + rowno).data('price', finprice);

        $('#quantity_input' + rowno).click();
      }
    }
  });

  $(document).on('click', '.item_box', function () {
    var productid = $(this).data('productid');
    var product_name = $(this).data('product_name');
    product_name = product_name.replace('"', '&#x22;');
    var unit = $(this).data('unit');

    var description = $(this).data('description');
    var stock = $(this).data('stock');
    var product_type = $(this).data('product_type');
    var selling_price = $(this).data('selling_price');
    var purchaseprice = $(this).data('purchased_price');
    var tax = $(this).data('tax');
    var tax_percent = $(this).data('tax_percent');
    var tax_name = $(this).data('tax_name');
    var barcode = $(this).data('barcode');
    var prounit = $(this).data('prounit');
    var prosubunit = $(this).data('prosubunit');
    var proconversion_unit_rate = $(this).data('proconversion_unit_rate');
    var protax = $(this).data('protax');
    var purchase_tax = $(this).data('purchase_tax');
    var sale_tax = $(this).data('sale_tax');
    var mrp = $(this).data('mrp');
    var purchase_margin = $(this).data('purchase_margin');
    var sale_margin = $(this).data('sale_margin');
    var unit_disabled = $(this).data('unit_disabled');
    var in_unit_options = $(this).data('in_unit_options');
    var batch_number = $(this).data('batch_number');

    add_sale_item(
      productid,
      product_name,
      unit,
      description,
      stock,
      product_type,
      selling_price,
      purchaseprice,
      tax,
      tax_percent,
      tax_name,
      barcode,
      prounit,
      prosubunit,
      proconversion_unit_rate,
      protax,
      purchase_tax,
      sale_tax,
      mrp,
      purchase_margin,
      sale_margin,
      unit_disabled,
      in_unit_options,
      batch_number
    );
  });

  function split_from(value, index) {
    return value.substring(0, index) + ',' + value.substring(index);
  }

  $(document).on('keypress', '#productbarcodesearch', function (e) {
    if (e.keyCode == 13) {
      var barcode = $.trim($('#productbarcodesearch').val());
      var view_type = $('#view_type').val();
      var csrfName = $('#csrf_token').attr('name'); // CSRF Token name
      var csrfHash = $('#csrf_token').val();

      var barcode_type = $('#barcode_type').val();
      var final_barcode = barcode;
      var unit = '';
      var sub_unit = '';
      if (barcode != '') {
        // if (barcode_type==1) {
        final_barcode = barcode.substring(0, 6);
        var get_from_last = barcode.substr(barcode.length - 6);
        var after_split = split_from(get_from_last, 3);
        var p_b_data = after_split.split(',');
        var unit = p_b_data[0];
        var sub_unit = p_b_data[1];

        // }

        if (final_barcode.length > 0) {
          $.ajax({
            url:
              base_url() +
              'sales/get_barcode_product/' +
              view_type +
              '?barcode=' +
              final_barcode +
              '&row=' +
              row +
              '&i_unit=' +
              unit +
              '&i_subunit=' +
              sub_unit +
              '&full_barcode=' +
              barcode,
            data: {
              [csrfName]: csrfHash,
            },
            success: function (response) {
              var objJSON = JSON.parse(response);

              if (objJSON != '') {
                var productid = objJSON.productid;
                var product_name = objJSON.product_name;
                var unit = objJSON.unit;
                var description = objJSON.description;
                var stock = objJSON.stock;
                var product_type = objJSON.product_type;
                var selling_price = objJSON.selling_price;
                var purchaseprice = objJSON.purchased_price;
                var tax = objJSON.tax;
                var tax_percent = objJSON.tax_percent;
                var tax_name = objJSON.tax_name;
                var barcode = objJSON.barcode;
                var prounit = objJSON.prounit;
                var prosubunit = objJSON.prosubunit;
                var proconversion_unit_rate = objJSON.proconversion_unit_rate;
                var protax = objJSON.protax;
                var purchase_tax = objJSON.purchase_tax;
                var sale_tax = objJSON.sale_tax;
                var mrp = objJSON.mrp;
                var purchase_margin = objJSON.purchase_margin;
                var sale_margin = objJSON.sale_margin;
                var unit_disabled = objJSON.unit_disabled;
                var in_unit_options = objJSON.in_unit_options;
                var batch_number = objJSON.batch_number;
                var fi_unit = objJSON.i_unit;
                var fi_subunit = objJSON.i_subunit;
                var custom_barcode = objJSON.custom_barcode;

                if (custom_barcode == 1) {
                  fi_unit = 1;
                  fi_subunit = 0;
                }

                add_sale_item(
                  productid,
                  product_name,
                  unit,
                  description,
                  stock,
                  product_type,
                  selling_price,
                  purchaseprice,
                  tax,
                  tax_percent,
                  tax_name,
                  barcode,
                  prounit,
                  prosubunit,
                  proconversion_unit_rate,
                  protax,
                  purchase_tax,
                  sale_tax,
                  mrp,
                  purchase_margin,
                  sale_margin,
                  unit_disabled,
                  in_unit_options,
                  batch_number,
                  fi_unit,
                  fi_subunit
                );
              }
            },
            error: function () {
              alert('error');
            },
          });
        }
      }

      $('#productbarcodesearch').val('');
    }
  });

  function add_sale_item(
    productid,
    product_name,
    unit,
    description,
    stock,
    product_type,
    selling_price,
    purchaseprice,
    tax,
    tax_percent,
    tax_name,
    barcode,
    prounit,
    prosubunit,
    proconversion_unit_rate,
    protax,
    purchase_tax,
    sale_tax,
    mrp,
    purchase_margin,
    sale_margin,
    unit_disabled,
    in_unit_options,
    batch_number,
    fi_unit,
    fi_subunit
  ) {
    row++;

    selling_price = parseFloat(selling_price);
    purchaseprice = parseFloat(purchaseprice);

    var unit_disabled_message = '';
    if (unit_disabled == 'readonly') {
      unit_disabled_message =
        '<span style="display: block; color:red; font-size: 11px;">You are unable to alter the primary unit because this item has transactions.</span> <div class="form-control bg-light-transparent">' +
        unit +
        '</div>';
    }

    var box_class = 'd-none';
    if (prounit != '' && prosubunit != '' && prounit != prosubunit) {
      box_class = '';
    }

    var sale_withtax_selected = '';
    var sale_withouttax_selected = '';
    var purchase_withtax_selected = '';
    var purchase_withouttax_selected = '';

    var view_type = $('#view_type').val();
    if (view_type == 'sales') {
      if (sale_tax == 1) {
        var tz = (parseFloat(tax_percent) + 100) / 100;
        var price = (selling_price / tz).toFixed(round_of_value());
      } else {
        var price = selling_price.toFixed(round_of_value());
      }
    } else {
      if (purchase_tax == 1) {
        var pz = (parseFloat(tax_percent) + 100) / 100;
        var price = (purchaseprice / pz).toFixed(round_of_value());
      } else {
        var price = purchaseprice.toFixed(round_of_value());
      }
    }

    if (sale_tax == 1) {
      sale_withtax_selected = 'selected';
    } else {
      sale_withouttax_selected = 'selected';
    }

    if (purchase_tax == 1) {
      purchase_withtax_selected = 'selected';
    } else {
      purchase_withouttax_selected = 'selected';
    }

    var isplit_tax = 0;

    if (is_split) {
      isplit_tax = 1;
    }

    var input_quatity = 1;

    if (typeof fi_unit != 'undefined') {
      fi_unit = fi_unit;
    } else {
      fi_unit = 0;
    }

    if (typeof fi_subunit != 'undefined') {
      fi_subunit = fi_subunit;
    } else {
      fi_subunit = 0;
    }

    if (fi_unit > 0 || fi_subunit > 0) {
      input_quatity = fi_unit + '.' + fi_subunit;
    } else {
      input_quatity = 1;
    }

    if ($('.productidforcheck' + productid).length) {
      last_inserted_row = $('.productidforcheck' + productid).data('thisrow');

      proqty++;

      var get_qty_value = $(
        '#row' + last_inserted_row + ' .quantity_input'
      ).val();
      var rep_quantity = parseFloat(get_qty_value) + 1;
      $('#row' + last_inserted_row + ' .quantity_input').val(rep_quantity);
    } else {
      proqty = 2;
      $('#products_table').removeClass('tb');

      var append_data =
        '<li class="probox mb-2 position-relative productidforcheck' +
        productid +
        ' barcode' +
        barcode +
        '" id="row' +
        row +
        '" data-thisrow="' +
        row +
        '">' +
        '<h6 class="product_name">' +
        product_name +
        '</h6>' +
        '<input type="hidden" name="p_tax[]" id="pptax' +
        row +
        '" value="' +
        tax +
        '"><input type="hidden" name="product_name[]" value="' +
        product_name +
        '"><input type="hidden" name="product_id[]" value="' +
        productid +
        '">' +
        '<input type="hidden" name="batch_number[]" value="' +
        batch_number +
        '">' +
        '<input type="hidden" name="p_purchase_tax[]" value="' +
        sale_tax +
        '" id="id_purchase_tax_pptax' +
        row +
        '">' +
        '<input type="hidden" name="p_sale_tax[]" value="' +
        purchase_tax +
        '" id="id_sale_tax_pptax' +
        row +
        '">' +
        '<input type="hidden" name="i_id[]" value="0">' +
        '<input type="hidden" name="old_quantity[]" value="0">' +
        '<input type="hidden" name="old_p_unit[]" value="">' +
        '<input type="hidden" name="old_in_unit[]" value="">' +
        '<input type="hidden" name="old_p_conversion_unit_rate[]" value="0">' +
        '<div class="d-flex justify-content-between">' +
        '<div class="my-auto">' +
        '<div> <input type="hidden" name="split_taxx[]" value="' +
        isplit_tax +
        '"> ' +
        '<a data-proid="' +
        row +
        '" class="open_popup" data-bs-toggle="modal" data-bs-target="#price_edit_popup' +
        row +
        '"><i class="bx bx-pencil"></i></a>' +
        'Price: ' +
        currency_symbol() +
        '<input type="number" step="any" class=" price mb-0 control_ro"  name="price[]" value="' +
        price +
        '" id="price_bx' +
        row +
        '" readonly >' +
        '</div>' +
        '<div><span id="tax_hider' +
        row +
        '">Tax: ' +
        tax_name +
        ' (' +
        tax_percent +
        '%)</span> ' +
        currency_symbol() +
        '<input type="hidden" name="p_tax_amount[]" value="' +
        ((price * tax_percent) / 100).toFixed(round_of_value()) +
        '" id="p_tax_box' +
        row +
        '"><span class="tbox" id="taxboxlabel' +
        row +
        '">' +
        ((price * tax_percent) / 100).toFixed(round_of_value()) +
        '</span> <a class="delete_tax text-danger" data-rowid="' +
        row +
        '" data-pricesss="' +
        price +
        '"><i class="bx bxs-x-circle"></i></a>' +
        '<input type="hidden" step="any" class="numpad control_ro" data-row="' +
        row +
        '" data-product="' +
        productid +
        '" id="taxbox' +
        row +
        '" name="p_tax_percent[]" min="" value="' +
        tax_percent +
        '" readonly></div> ' +
        '</div>' +
        '<div class="modal fade" id="price_edit_popup' +
        row +
        '"  tabindex="-1" aria-hidden="true">' +
        '<div class="modal-dialog modal-sm modal-dialog-centered">' +
        '<div class="modal-content">' +
        '<div class="modal-header">' +
        '<h5 class="modal-title">Edit item</h5>' +
        '<button type="button" class="btn-close close_popup" data-proid="' +
        row +
        '" data-bs-dismiss="modal" aria-label="Close"></button>' +
        '</div>' +
        '<div class="modal-body">' +
        '<div class="form-group">' +
        '<label for="inputProductTitle" class="form-label">MRP <small class="font-weight-bold text-danger">*</small></label>' +
        '<div class="">' +
        '<input type="number" min="0" step="any" class="form-control pmrp" data-rowin="' +
        row +
        '" id="pmrp' +
        row +
        '" name="mrp[]" placeholder="Max Retail Price" value="' +
        mrp +
        '">' +
        '<div class="d-flex mt-2 w-100">' +
        '<div class="w-100">' +
        '<label>Pur. margin (%)</label>' +
        '<input type="number" min="0" step="any" class="form-control me-1 p_margin" data-rowin="' +
        row +
        '" id="p_margin' +
        row +
        '" name="purchase_margin[]" value="' +
        purchase_margin +
        '" placeholder="Pur. Disc %">' +
        '</div>' +
        '<div class="w-100">' +
        '<label>Sale margin (%)</label>' +
        '<input type="number" min="0" step="any" class="form-control ms-1 s_margin" data-rowin="' +
        row +
        '" id="s_margin' +
        row +
        '" name="sale_margin[]" value="' +
        sale_margin +
        '" placeholder="Sale. Disc %">' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<div class="form-group">' +
        '<label class="text-dark">Purchase price</label>' +
        '<div class="d-flex">' +
        '<input type="number" id="purchase_price_text' +
        row +
        '" value="' +
        purchaseprice.toFixed(round_of_value()) +
        '" class="form-control">' +
        '<div style="width: 134px;">' +
        '<select class="form-control" id="purchase_tax_text' +
        row +
        '" name="purchase_tax">' +
        '<option value="1" ' +
        purchase_withtax_selected +
        '>With Tax</option>' +
        '<option value="0" ' +
        purchase_withouttax_selected +
        '>Without Tax</option>' +
        '</select>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<div class="form-group mt-2">' +
        '<label class="text-dark">Selling price</label>' +
        '<div class="d-flex">' +
        '<input type="number" id="selling_price_text' +
        row +
        '" value="' +
        selling_price.toFixed(round_of_value()) +
        '" class="form-control">' +
        '<div style="width: 134px;">' +
        '<select class="form-control" id="sale_tax_text' +
        row +
        '" name="sale_tax">' +
        '<option value="1" ' +
        sale_withtax_selected +
        '>With Tax</option>' +
        '<option value="0" ' +
        sale_withouttax_selected +
        '>Without Tax</option>' +
        '</select>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<div class="form-group mt-2">' +
        '<label class="text-dark">Unit</label>' +
        unit_disabled_message +
        '<select id="unit_text' +
        row +
        '" class="form-control box_unit_input ' +
        unit_disabled +
        '_select box_unit' +
        row +
        '" name="p_unit[]" data-rowid="' +
        row +
        '" ' +
        unit_disabled +
        '>' +
        prounit +
        '</select>' +
        '</div>' +
        '<div class="form-group mt-2">' +
        '<label class="text-dark">Sub Unit <small class=" text-danger box_subuer' +
        row +
        '"></small></label>' +
        '<select id="subunit_text' +
        row +
        '" class="form-control box_subu box_sub_unit' +
        row +
        '" name="subunit[]" data-rowid="' +
        row +
        '">' +
        prosubunit +
        '</select>' +
        '</div>' +
        '<div class="form-group mt-2 ' +
        box_class +
        ' box_add_conversion' +
        row +
        '" id="box_add_conversion' +
        row +
        '">' +
        '<label class="text-dark">Conversion unit rate</label>' +
        '<input type="number" min="0" step="any" class="form-control"  id="conversion_unit_text' +
        row +
        '" name="conversion_unit[]" placeholder="Conversion unit rate" value="' +
        proconversion_unit_rate +
        '">' +
        '</div>' +
        '<div class="form-group mt-2">' +
        '<label class="text-dark">Tax</label>' +
        '<select id="tax_text' +
        row +
        '" class="form-control">' +
        protax +
        '</select>' +
        '</div>' +
        '<div class="form-group">' +
        '<button type="button" class="btn btn-primary btn-sm mt-2 edit_purchase_price" id="edit_purchase_price' +
        row +
        '" data-proid="' +
        productid +
        '" data-rowid="' +
        row +
        '">Save</button>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<div class="my-auto">' +
        '<a class="cursor-pointer" data-bs-toggle="collapse" data-bs-target="#prodesc' +
        row +
        '">More</a> ' +
        '</div>' +
        '</div>' +
        '<div id="prodesc' +
        row +
        '" class="collapse">' +
        '<div class="accordion-body px-0 py-1">' +
        '<textarea name="product_desc[]" class="keypad textarea_border form-control prodesc" style="border: 1px solid #0000002e;">' +
        description +
        '</textarea>' +
        '</div>' +
        '</div>' +
        '<div class="d-flex justify-content-between">' +
        '<div class="my-auto d-flex">' +
        '<div class="my-auto">' +
        '<div>' +
        '<label style="color: #ff1010;">Discount</label>' +
        '<div class="d-flex">' +
        '<label style=" margin-top: auto;margin-bottom: auto;margin-right: 5px;margin-left: 5px;">%</label>' +
        '<input type="number" step="any" class="form-control dis_inp form-control-sm mr-5 numpad discount_percent_input" data-type="percent" data-row="' +
        row +
        '" data-product="' +
        productid +
        '" data-price="' +
        price +
        '" id="discount_percentbox' +
        row +
        '" name="discount_percent[]" placeholder="Discount %" min="0" max="100" value="">' +
        '<input type="number" step="any" class="form-control dis_inp form-control-sm mr-5 numpad discount_input" data-row="' +
        row +
        '" data-product="' +
        productid +
        '" data-price="' +
        price +
        '" id="discountbox' +
        row +
        '" name="p_discount[]" placeholder="Discount" min="0" value="">' +
        '</div>' +
        ' </div>' +
        '</div>' +
        '<div class="my-auto">' +
        '<label style="color: #257e00;">Quantity</label>' +
        '<div class="d-flex" style="min-width: 145px;">' +
        '<div class="input-group-btn">' +
        '<button type="button" class="btn border btn-sm qbtn qty_minus" id="qty_minus' +
        row +
        '" data-row="' +
        row +
        '" data-price="' +
        price +
        '" data-product="' +
        productid +
        '"> ' +
        '<span class="bx bx-minus"></span>' +
        '</button>' +
        '</div>' +
        '<input type="number" class="form-control text-center form-control-sm mb-0 quantity_input numpad"  name="quantity[]" data-row="' +
        row +
        '" data-stock="' +
        stock +
        '" data-price="' +
        price +
        '" data-product="' +
        productid +
        '" id="quantity_input' +
        row +
        '"  min="1" value="' +
        input_quatity +
        '">' +
        '<select class="in_unit form-control p-0 text-center form-control-sm mb-0" name="in_unit[]" data-row="' +
        row +
        '" data-proconversion_unit_rate="' +
        proconversion_unit_rate +
        '"  id="in_unit' +
        row +
        '">' +
        in_unit_options +
        '</select>' +
        '<div class="input-group-btn">' +
        '<button type="button" class="btn border btn-sm qbtn qty_plus" id="qty_plus' +
        row +
        '" data-row="' +
        row +
        '" data-price="' +
        price +
        '" data-product="' +
        productid +
        '" data-stock="' +
        stock +
        '">' +
        '<span class="bx bx-plus"></span>' +
        '</button>' +
        '</div>' +
        '<button class="btn btn-sm border get_weight"  type="button" data-inpid="quantity_input' +
        row +
        '">' +
        '<i class="bx bx-sync get_weight_icon" title="Get quantity from machine" id="gtbt_quantity_input' +
        row +
        '"></i>' +
        '</button>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<div class="my-auto">' +
        '<label style="opacity: 0;">Tot</label>' +
        '<h5 class="m-0 "><span class="text-success">' +
        currency_symbol() +
        '</span><span id="propricelabel' +
        row +
        '">' +
        price +
        '</span></h5>' +
        '<input type="hidden" step="any" class="item_total form-control mb-0 control_ro"  name="amount[]" value="' +
        price +
        '" id="proprice' +
        row +
        '" readonly>' +
        '</div>' +
        '</div>' +
        '<a id="' +
        row +
        '" class="btn text-white pro_btn_remove"><span>+</span></a>' +
        '</li>';
      $('#products_table').append(append_data);

      product_js_id = productid;
      last_inserted_row = row;
    }

    var x = 0;
    var intervalID = setInterval(function () {
      calculate_item_table(last_inserted_row, price);

      calculate_tax_amount();
      calculate_due_amount();
      calculate_invoice();
      $('#typeandsearch').val('');
      $('#tandsproducts').html('');
      if (focus_element == 1) {
        $('#product_code').focus();
        $('#product_code').val('');
      } else if (focus_element == 2) {
        $('#productbarcodesearch').focus();
      } else {
        $('#typeandsearch').focus();
      }
      foucc = 0;

      if (++x === 5) {
        window.clearInterval(intervalID);
      }
    }, 100);
  }

  $(document).on('change', '.box_subu', function () {
    var elem = $(this).data('proid');
    var br_id = $(this).data('rowid');
    var box_unit = $.trim($('.box_unit' + br_id).val());
    var box_sub_unit = $.trim($('.box_sub_unit' + br_id).val());

    if (box_unit == '') {
      $('.box_subuer' + br_id).html('Select primary unit');
      // $('#sub_unit').val('').trigger('change');
    } else if (box_unit == box_sub_unit) {
      $('.box_subuer' + br_id).html('Unit & Sub unit are same');
      $('.box_sub_unit' + br_id)
        .val('')
        .trigger('change');
    } else {
      // $('#subuer').html('');
    }

    if (box_unit != '' && box_sub_unit != '' && box_unit != box_sub_unit) {
      $('.box_add_conversion' + br_id).removeClass('d-none');
      $('.box_subuer' + br_id).html('');
    } else {
      $('.box_add_conversion' + br_id).addClass('d-none');
    }
  });

  $(document).on('change', '.box_unit_input', function () {
    var elem = $(this).data('proid');
    var ubr_id = $(this).data('rowid');
    var ubox_unit = $.trim($('.box_unit' + ubr_id).val());
    var ubox_sub_unit = $.trim($('.box_sub_unit' + ubr_id).val());
    if (ubox_unit == '') {
      $('.box_subuer' + ubr_id).html('Select primary unit');
      $('.box_sub_unit' + ubr_id)
        .val('')
        .trigger('change');
    } else if (ubox_unit == ubox_sub_unit) {
      $('.box_subuer' + ubr_id).html('Unit & Sub unit are same');
      $('.box_sub_unit' + ubr_id)
        .val('')
        .trigger('change');
    } else {
      $('.box_subuer' + ubr_id).html('');
    }
    if (ubox_unit != '' && ubox_sub_unit != '' && ubox_unit != ubox_sub_unit) {
      $('.box_add_conversion' + ubr_id).removeClass('d-none');
      $('.box_subuer' + ubr_id).html('');
    } else {
      $('.box_add_conversion' + ubr_id).addClass('d-none');
      $('.box_subuer' + ubr_id).html('');
    }
  });

  $(document).on('click', '.delete_tax', function () {
    var trowid = $(this).data('rowid');
    var pricesss = $(this).data('pricesss');
    $('#tax_hider' + trowid).html('Tax: None');
    $('#taxboxlabel' + trowid).html(0);
    $('#p_tax_box' + trowid).val(0);

    $('#taxbox' + trowid).val(0);
    $('#pptax' + trowid).val(0);

    var dx = 0;
    var intervalID = setInterval(function () {
      calculate_item_table(trowid, pricesss);
      calculate_invoice();
      calculate_due_amount();
      calculate_due_amount();
      calculate_tax_amount();

      if (++dx === 5) {
        window.clearInterval(intervalID);
      }
    }, 100);
  });

  function currency_symbol() {
    var crsy = $('#currency_symbol').val();
    return crsy;
  }

  $(document).on('click', '.pro_btn_remove', function () {
    var button_id = $(this).attr('id');
    $('#row' + button_id + '').remove();
    product_js_id = 0;
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

  $(document).on('click', '.tax_item', function () {
    taxrow++;
    var taxid = $(this).data('taxid');
    var taxname = $(this).data('taxname');
    var percent = $(this).data('percent');

    var append_tax_data =
      '<tr class="tax_tr" data-taxidentifier="' +
      taxrow +
      '" id="taxrow' +
      taxrow +
      '"><td >' +
      taxname +
      '(' +
      percent +
      '%)' +
      '<input type="hidden" name="tax_id[]" value="' +
      taxid +
      '">' +
      '<input type="hidden" name="tax_name[]" value="' +
      taxname +
      '">' +
      '<input type="hidden" name="taxamount[]" id="taxamount' +
      taxrow +
      '" value="0">' +
      '<input type="hidden" name="tax_percent[]" id="taxpercent' +
      taxrow +
      '" value="' +
      percent +
      '">' +
      '</td>' +
      '<td><span id="taxamountlabel' +
      taxrow +
      '">0</span></td>' +
      '<td> <a id="' +
      taxrow +
      '" class="tax_btn_remove">X</a></td>' +
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

  $(document).on('click', '.tax_btn_remove', function () {
    var button_id = $(this).attr('id');
    $('#taxrow' + button_id + '').remove();
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

  $('#payment_type').change(function () {
    var catname = $(this).val();
    var catname_text = $(this).find('option:selected').text();
    d_n_all_form();
    // $('#payment_label').html(catname_text);
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

  function d_n_all_form() {
    // $('#payment_label').html("CASH");
    // $('#cash_options').addClass("d-none");
    $('#cheque_options').addClass('d-none');
    $('#bank_transfer_options').addClass('d-none');
  }

  $(document).on('click input change', '#disc_val', function () {
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

  $(document).on('click', '.qty_minus', function () {
    var this_row = $(this).data('row');
    var this_product = $(this).data('product');
    var price = $(this).data('price');

    var qnumber4 = $('#quantity_input' + this_row).val();
    if (qnumber4 != 0) {
      var upval = parseFloat(qnumber4) - 1;
      $('#quantity_input' + this_row).val(upval);

      var this_val = $('#discount_percentbox' + this_row).val();
      $('#discountbox' + this_row).val(
        ((price * upval * this_val) / 100).toFixed(round_of_value())
      );

      var x = 0;
      var intervalID = setInterval(function () {
        calculate_item_table(this_row, price);
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

  $(document).on('click', '.qty_plus', function () {
    var this_row = $(this).data('row');
    var this_product = $(this).data('product');
    var qnumber4 = $('#quantity_input' + this_row).val();
    var price = $(this).data('price');
    var upval = parseFloat(qnumber4) + 1;
    $('#quantity_input' + this_row).val(upval);

    var this_val = $('#discount_percentbox' + this_row).val();
    $('#discountbox' + this_row).val(
      ((price * upval * this_val) / 100).toFixed(round_of_value())
    );

    var x = 0;
    var intervalID = setInterval(function () {
      calculate_item_table(this_row, price);
      calculate_invoice();
      calculate_due_amount();
      calculate_due_amount();
      calculate_tax_amount();

      if (++x === 5) {
        window.clearInterval(intervalID);
      }
    }, 100);
  });

  $(document).on('click change input', '.quantity_input', function () {
    var this_row = $(this).data('row');
    var this_product = $(this).data('product');
    var stock = $(this).data('stock');
    var price = $(this).data('price');
    var qnumber4 = $(this).val();
    var x = 0;

    var this_val = $('#discount_percentbox' + this_row).val();
    $('#discountbox' + this_row).val(
      ((price * qnumber4 * this_val) / 100).toFixed(round_of_value())
    );

    var intervalID = setInterval(function () {
      calculate_item_table(this_row, price);
      calculate_invoice();
      calculate_due_amount();
      calculate_due_amount();
      calculate_tax_amount();

      if (++x === 5) {
        window.clearInterval(intervalID);
      }
    }, 100);
  });

  $(document).on(
    'click input',
    '.discount_input,.discount_percent_input',
    function () {
      var this_row = $(this).data('row');
      var this_val = $(this).val();
      var type = $(this).data('type');
      var this_product = $(this).data('product');
      var price = $(this).data('price');
      var p_price = $('#price_bx' + this_row).val();
      var p_qty = $('#quantity_input' + this_row).val();

      if (type == 'percent') {
        $('#discountbox' + this_row).val(
          ((p_price * p_qty * this_val) / 100).toFixed(round_of_value())
        );
      } else {
        $('#discount_percentbox' + this_row).val(
          ((this_val / (p_price * p_qty)) * 100).toFixed(round_of_value())
        );
      }

      var qty = $('#quantity_input' + this_row).val();
      var discount = $('#discountbox' + this_row).val();

      if (qty == '') {
        qty = 1;
      }
      if (discount == '') {
        discount = 0;
      }

      var calc_amt = parseFloat(price) * parseFloat(qty) - parseFloat(discount);
      var tax = $('#taxbox' + this_row).val();
      if (tax != '') {
        var taxamt = (calc_amt * tax) / 100;

        if (1) {
        } else {
          calc_amt += parseFloat(taxamt);
        }
      }
      $('#proprice' + this_row).val(calc_amt + taxamt);

      $('#propricelabel' + this_row).html(
        (calc_amt + taxamt).toFixed(round_of_value())
      );

      $('#taxboxlabel' + this_row).html(taxamt.toFixed(round_of_value()));
      $('#p_tax_box' + this_row).val(taxamt);

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
    }
  );

  $(document).on('click', '.edit_purchase_price', function () {
    var this_product = $(this).data('proid');
    var rowid = $(this).data('rowid');

    $('#erbx' + rowid).remove();

    var purchased_price = $('#purchase_price_text' + rowid).val();
    var selling_price = $('#selling_price_text' + rowid).val();
    var purchase_tax = $('#purchase_tax_text' + rowid).val();
    var sale_tax = $('#sale_tax_text' + rowid).val();
    var unit = $('#unit_text' + rowid).val();
    var subunit = $('#subunit_text' + rowid).val();
    var conversion_unit = $('#conversion_unit_text' + rowid).val();

    var tax = $('#tax_text' + rowid).val();
    var pmrp = $('#pmrp' + rowid).val();
    var p_margin = $('#p_margin' + rowid).val();
    var s_margin = $('#s_margin' + rowid).val();

    var tax_percent = $('#tax_text' + rowid)
      .find(':selected')
      .data('perc');
    var tax_name = $('#tax_text' + rowid)
      .find(':selected')
      .data('tname');

    var view_type = $('#view_type').val();
    if (view_type == 'sales') {
      if (sale_tax == 1) {
        var tz = (parseFloat(tax_percent) + 100) / 100;

        var price = (selling_price / tz).toFixed(round_of_value());
      } else {
        // alert(selling_price)
        var price = selling_price;
      }
    } else {
      if (purchase_tax == 1) {
        var pz = (parseFloat(tax_percent) + 100) / 100;
        var price = (purchased_price / pz).toFixed(round_of_value());
      } else {
        var price = purchased_price;
      }
    }

    var approve = true;

    if (subunit != '') {
      if (subunit != null) {
        if (conversion_unit == '') {
          $('#error_display').html('Conversion rate is required!');
          approve = false;
        } else if (conversion_unit < 1) {
          $('#error_display').html('Value must be greater than 0');
          approve = false;
        }
      } else {
        subunit = '';
      }
    } else {
      subunit = '';
    }

    if (approve == true) {
      $(this).find(':selected').data('id');

      var csrfName = $('#csrf_token').attr('name'); // CSRF Token name
      var csrfHash = $('#csrf_token').val(); // CSRF hash

      $.ajax({
        type: 'POST',
        url: base_url() + 'products/update_price/' + this_product,
        data: {
          purchased_price: purchased_price,
          price: selling_price,
          unit: unit,
          tax: tax,
          purchase_tax: purchase_tax,
          sale_tax: sale_tax,
          mrp: pmrp,
          purchase_margin: p_margin,
          sale_margin: s_margin,
          subunit: subunit,
          conversion_unit: conversion_unit,
          [csrfName]: csrfHash,
        },
        beforeSend: function () {
          $('#edit_purchase_price' + rowid).html('Saving...');
        },
        success: function (response) {
          var final_price = 0;
          if (view_type == 'sales') {
            final_price = selling_price;
          } else {
            final_price = purchased_price;
          }

          var unit_option =
            '<option value="' + unit + '">' + unit + '</option>';
          var subunit_option = '';
          if (subunit != '') {
            subunit_option =
              '<option value="' + subunit + '">' + subunit + '</option>';
          }

          $('#in_unit' + rowid).html(unit_option + subunit_option);
          $('#in_unit' + rowid).data(
            'proconversion_unit_rate',
            conversion_unit
          );

          $('#id_purchase_tax_pptax' + rowid).val(purchase_tax);
          $('#id_sale_tax_pptax' + rowid).val(sale_tax);

          $('#price_bx' + rowid).val(
            parseFloat(price).toFixed(round_of_value())
          );
          $('#p_unitbox' + rowid).val(unit);

          var tax_val = (final_price * tax_percent) / 100;

          $('#tax_hider' + rowid).html('Tax: ' + tax_name);
          $('#taxboxlabel' + rowid).html(tax_val.toFixed(round_of_value()));
          $('#p_tax_box' + rowid).val(tax_val);

          $('#taxbox' + rowid).val(tax_percent);
          $('#pptax' + rowid).val(tax);

          $('#quantity_input' + rowid).data('price', price);
          $('#discountbox' + rowid).data('price', price);
          $('#discount_percentbox' + rowid).data('price', price);
          $('#qty_plus' + rowid).data('price', price);
          $('#qty_minus' + rowid).data('price', price);

          $(this).siblings('.qty_plus').data('price', price);

          var x = 0;
          var intervalID = setInterval(function () {
            calculate_invoice();
            calculate_due_amount();
            calculate_due_amount();
            calculate_tax_amount();
            calculate_item_table(rowid, price);

            if (++x === 5) {
              window.clearInterval(intervalID);
            }
          }, 100);

          $('#price_edit_popup' + rowid).removeClass('d-block');
          $('#edit_purchase_price' + rowid).html('Save');
        },
        error: function () {
          alert('error');
        },
      });
    } else {
      $('#box_add_conversion' + rowid).append(
        '<small id="erbx' +
          rowid +
          '" style="display: block; color:red; font-size: 11px;">Conversion rate is must be greater than 1</small>'
      );
    }
  });

  $(document).on(
    'click change input',
    '#cash_input,#cheque_input,#bt_input',
    function () {
      var grand_total_amount = $('#grand_total_label').html();
      var payment_type = $('#payment_type').val();
      var pay_amount = 0;

      pay_amount = $('#cash_input').val();

      if (pay_amount == '') {
        var pay_amount = 0;
      }

      var due_amount = parseFloat(grand_total_amount) - parseFloat(pay_amount);

      $('#due_amount').val(due_amount.toFixed(round_of_value()));
      $('#due_amount_label').html(due_amount.toFixed(round_of_value()));
    }
  );

  //////////////////////////// CALCULATIONS //////////////////////////////////
  function calculate_item_table(this_row, product_price) {
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

    var qty = $('#quantity_input' + this_row).val();
    var discount = $('#discountbox' + this_row).val();
    var discount_percentbox = $('#discount_percentbox' + this_row).val();

    $('#discount_percentbox' + this_row).val(
      ((discount / (product_price * qty)) * 100).toFixed(round_of_value())
    );

    if (qty == '') {
      qty = 1;
    }
    if (discount == '') {
      discount = 0;
    }

    var calc_amt =
      parseFloat(product_price) * parseFloat(qty) - parseFloat(discount);
    var tax = $('#taxbox' + this_row).val();
    if (tax != '') {
      var taxamt = (calc_amt * tax) / 100;

      if (1) {
      } else {
        calc_amt += parseFloat(taxamt);
      }
    }
    $('#proprice' + this_row).val(calc_amt + taxamt);

    $('#propricelabel' + this_row).html(
      (calc_amt + taxamt).toFixed(round_of_value())
    );

    $('#taxboxlabel' + this_row).html(taxamt.toFixed(round_of_value()));
    $('#p_tax_box' + this_row).val(taxamt);

    // alert(this_row+this_product);
  }

  function calculate_due_amount() {
    var grand_total_amount = $('#grand_total_label').html();
    var payment_type = $('#payment_type').val();
    var pay_amount = 0;

    pay_amount = $('#cash_input').val();

    var due_amount = parseFloat(grand_total_amount) - parseFloat(pay_amount);

    $('#due_amount').val(due_amount.toFixed(round_of_value()));
    $('#due_amount_label').html(due_amount.toFixed(round_of_value()));
  }

  function calculate_tax_amount() {
    var taxsum = 0;
    var sub_total = 0;
    $('.item_total').each(function () {
      if (!isNaN(this.value) && this.value.length != 0) {
        sub_total += parseFloat(this.value);
      }
    });
    var disc = $('#discountval').val();
    var sub_total = parseFloat(sub_total) - parseFloat(disc);

    $('.tax_tr').each(function () {
      var ti = $(this).data('taxidentifier');
      var tax_percent = $('#taxpercent' + ti).val();
      var taxamount = (parseFloat(sub_total) * parseFloat(tax_percent)) / 100;
      $('#taxamount' + ti).val(taxamount);
      $('#taxamountlabel' + ti).html(taxamount);
      taxsum += parseFloat(taxamount);
    });

    var total_taxamt_label_main = 0;
    $('.tbox').each(function () {
      var taxmt = $(this).html();
      total_taxamt_label_main += parseFloat(taxmt);
    });

    $('#total_taxamt_label_main').html(
      total_taxamt_label_main.toFixed(round_of_value())
    );
    $('#total_taxamt').val(total_taxamt_label_main);
    $('#total_taxamt_label').html(total_taxamt_label_main);
  }

  $(document).on('change', '#round_type', function () {
    calculate_invoice();
    calculate_due_amount();
  });

  $(document).on('input', '#additional_discount', function () {
    var round_off = $(this).val();
    var dsubtotal = $('#subtotal_label').html();
    var ddtax = $('#total_taxamt_label_main').html();
    var dprice = parseFloat(dsubtotal) + parseFloat(ddtax);
    $('#additional_discount_percent').val(
      ((round_off / dprice) * 100).toFixed(round_of_value())
    );
    calculate_invoice();
    calculate_due_amount();
  });

  $(document).on('input', '#additional_discount_percent', function () {
    var this_val = $(this).val();
    var dsubtotal = $('#subtotal_label').html();
    var ddtax = $('#total_taxamt_label_main').html();
    var dprice = parseFloat(dsubtotal) + parseFloat(ddtax);
    $('#additional_discount').val(
      ((dprice.toFixed() * this_val) / 100).toFixed(round_of_value())
    );
    calculate_invoice();
    calculate_due_amount();
  });

  $(document).on('input', '#round_off', function () {
    var round_off = $(this).val();
    var dsubtotal = $('#subtotal_label').html();
    var ddtax = $('#total_taxamt_label_main').html();
    var dprice = parseFloat(dsubtotal) + parseFloat(ddtax);
    $('#cash_discount_percent').val(
      ((round_off / dprice) * 100).toFixed(round_of_value())
    );
    calculate_invoice();
    calculate_due_amount();
  });

  $(document).on('input', '#cash_discount_percent', function () {
    var this_val = $(this).val();
    var dsubtotal = $('#subtotal_label').html();
    var ddtax = $('#total_taxamt_label_main').html();
    var dprice = parseFloat(dsubtotal) + parseFloat(ddtax);
    $('#round_off').val(
      ((dprice.toFixed() * this_val) / 100).toFixed(round_of_value())
    );
    calculate_invoice();
    calculate_due_amount();
  });

  function calculate_invoice() {
    var sum = 0;
    $('.item_total').each(function () {
      if (!isNaN(this.value) && this.value.length != 0) {
        sum += parseFloat(this.value);
      }
    });

    if ($('#disc_val').val() == '') {
      entire_discount = 0;
    } else {
      var entire_discount = parseFloat($('#disc_val').val());
    }
    var taxamount = $('#total_taxamt').val();
    var round_type = $('#round_type').val();
    var round_off = $.trim($('#round_off').val());

    var additional_discount = $.trim($('#additional_discount').val());

    var sub_total = parseFloat(sum);

    var grand_total = parseFloat(sum);

    if (additional_discount != '') {
      grand_total = grand_total - parseFloat(additional_discount);
    }

    var fin_grand_total = 0;

    if (round_off != '') {
      if (round_type == 'add') {
        fin_grand_total = parseFloat(grand_total) + parseFloat(round_off);
      } else {
        fin_grand_total = parseFloat(grand_total) - parseFloat(round_off);
      }
    } else {
      round_off = 0;
      fin_grand_total = grand_total;
    }

    var txxmt = $('#total_taxamt_label_main').html();

    //displayinmg value
    $('#discountval').val(entire_discount.toFixed(round_of_value()));
    $('#discountval_label').html(entire_discount.toFixed(round_of_value()));
    $('#subtotal').val(sub_total.toFixed(round_of_value()));
    $('#subtotal_label').html(
      (sub_total - parseFloat(txxmt)).toFixed(round_of_value())
    );

    $('#grand_total').val(fin_grand_total.toFixed(round_of_value()));
    $('#grand_total_label').html(fin_grand_total.toFixed(round_of_value()));

    $('#cash_input').val(fin_grand_total.toFixed(round_of_value()));
    $('#cheque_input').val(fin_grand_total);
    $('#bt_input').val(fin_grand_total);
  }

  function loc() {
    var loc = $('#loc').val();
    if (loc == 0) {
      return 4;
    } else {
      return loc;
    }
  }

  function round_of_value() {
    var round_of_value = $('#round_of_value').val();
    return round_of_value;
  }
});
