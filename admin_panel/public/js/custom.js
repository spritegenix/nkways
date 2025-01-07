$(document).ready(function () {
  url = window.location.href;
  onlyurl = window.location.href.replace(window.location.search, '');
  var segments = onlyurl.split('/');

  var app_state = $('#app_state').val();

  if (app_state == 'offline') {
    //offline
    var segment2 = segments[4];
    var segment3 = segments[5];
  } else {
    //online
    var segment2 = segments[4];
    var segment3 = segments[5];
  }

  if (segment2 == 'document_renew') {
    display_documentrenew();
  }

  if (segment3 == 'add_new') {
    display_add_product_form();
  }

  $(document).on('click', '.SpriteGenix_table_export', function () {
    var table_selector = $(this).data('table');
    var export_to = $(this).data('type');
    var filename = $(this).data('filename');
    $(table_selector).tableExport({
      type: export_to,
      fileName: filename,
    });
  });

  $(document).on('click', '.click-to-copy', function () {
    var selector = $(this).data('selector');
    var latext = $(selector).text();
    navigator.clipboard.writeText($.trim(latext));
    show_success_msg('success', 'Copied!');
  });

  $(document).on('click', '.SpriteGenix_table_print', function () {
    var table_selector = $(this).data('table');
    var export_to = $(this).data('type');
    var filename = $(this).data('filename');
    $(table_selector).printThis({
      debug: false,
      header: "<h5 style='text-align:center'>" + filename + '</h5>',
      loadCSS: base_url() + '/public/css/print.css',
    });
  });

  $(document).on('click', '.SpriteGenix_table_quick_search', function () {
    var table_selector = $(this).data('table');
    var thead = $(table_selector).find('tr.filters').eq(0);

    if (thead.length > 0) {
      $(table_selector).find('tr.filters').remove();
    } else {
      var search_row = '';
      search_row += '<tr class="filters" data-tableexport-display="none">';

      $(table_selector + ' thead tr th').each(function () {
        search_row += '<th data-tableexport-display="none">';
        search_row +=
          '<input type="text" class="row_search" placeholder="Search ' +
          $.trim($(this).text()) +
          '">';
        search_row += '</th>';
      });

      search_row += '</tr>';
      $(table_selector + ' thead').append(search_row);
    }
  });

  $(document).on('keyup', '.SpriteGenix_table .filters input', function (e) {
    /* Ignore tab key */
    var code = e.keyCode || e.which;
    if (code == '9') return;
    /* Useful DOM data and selectors */
    var $input = $(this),
      inputContent = $input.val().toLowerCase(),
      $panel = $input.parents('.SpriteGenix_table'),
      column = $panel.find('.filters th').index($input.parents('th')),
      $table = $panel.find('.erp_table'),
      $rows = $table.find('tbody tr');
    /* Dirtiest filter function ever ;) */
    var $filteredRows = $rows.filter(function () {
      var value = $(this).find('td').eq(column).text().toLowerCase();
      return value.indexOf(inputContent) === -1;
    });
    /* Clean previous no-result if exist */
    $table.find('tbody .no-result').remove();
    /* Show all rows, hide filtered ones (never do that outside of a demo ! xD) */
    $rows.show();
    $filteredRows.hide();
    /* Prepend no-result row if all rows are filtered */
    if ($filteredRows.length === $rows.length) {
      $table
        .find('tbody')
        .prepend(
          $(
            '<tr class="no-result text-center"><td colspan="' +
              $table.find('.filters th').length +
              '">No result found</td></tr>'
          )
        );
    }
  });

  $(document).on('click', '.sortable', function () {
    var table_selector = $(this).data('table');
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

  $(document).on('change', '#country_select', function () {
    var country = $(this).val();
    $.ajax({
      url: base_url() + '/get_states/' + country,
      success: function (result) {
        $('#state_select_box').html(result);
      },
    });
  });

  $(document).on('click', '.btnCancel', function () {
    var sesion_id = $(this).data('id');

    var csrfName = $('#csrf_token').attr('name'); // CSRF Token name
    var csrfHash = $('#csrf_token').val(); // CSRF hash

    $.ajax({
      url: base_url() + '/home/session_status/' + sesion_id,
      type: 'POST',
      data: {
        [csrfName]: csrfHash,
      },
      success: function (result) {
        if ($.trim(result) == 1) {
          $('.notDialog').remove();
        }
      },
    });
  });

  $(document).on('click', '.pdf_open', function () {
    var href = $(this).data('href');
    var last_height = $('#last_height').val();
    $('#pdf_modal').modal('show');
    $('#pdf_show').html('Loading');

    $('#pdf_show').html(
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

  $(document).on('click', '.student_fee_data', function () {
    var href = $(this).data('href');
    var download_href = $(this).data('download_href');
    $('#pdf_modal').modal('show');
    $('#pdf_show').html('Loading');

    $('#pdf_show').html(
      '<iframe src="' +
        href +
        '#toolbar=0&navpanes=0&scrollbar=0" class="erp_iframe" id="erp_iframe"></iframe>'
    );

    $('#do_btn').html(
      '<a data-url="' +
        href +
        '" class="btn btn-back-dark me-2 SpriteGenix-print">Print</a> <a href="' +
        download_href +
        '" class="btn btn-back me-4">Download</a>'
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

  $(document).on('change', '.save_payment_status', function () {
    var getid = $(this).data('cid');
    var statusname = $(this).val();

    var csrfName = $('#csrf_token').attr('name'); // CSRF Token name
    var csrfHash = $('#csrf_token').val(); // CSRF hash

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, change it!',
    }).then((result) => {
      if (result.isConfirmed) {
        $.ajax({
          url: base_url() + '/SpriteGenix_keys/payment_status/' + getid,
          type: 'POST',
          data: {
            statusname: statusname,
            [csrfName]: csrfHash,
          },
          success: function (result) {
            if ($.trim(result) == 1) {
              Swal.fire('Changed!', 'Your Status has been changed.', 'success');
            } else {
              Swal.fire('Failed!', '', 'error');
            }
          },
        });
      }
    });
  });

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

  $(document).on('click', '.whatsapp_share', function () {
    var invoice_id = $(this).data('invoice_id');
    $.ajax({
      url: base_url() + '/invoices/generate_short_link/' + invoice_id,
      success: function (response) {
        if ($.trim(response) != 'failed') {
          var anchor = document.createElement('a');
          anchor.href = response;
          anchor.target = '_blank';
          anchor.click();
        }
      },
    });
  });

  function display_documentrenew() {
    $.ajax({
      url: base_url() + '/document_renew/display_documentrenew',
      success: function (data) {
        $('#display_docurenew').html(data);
      },
    });
  }

  // $(document).on('input click','.add_box',function(){

  //  	var salary_id=$(this).data('salary_id');
  //  	var amtval=$(this).val();
  //   calculate_salary_table(salary_id);
  // });

  function calculate_salary_table(salary_id) {
    var basic_salary = 0;
    var extra_leave = 0;
    var total_salary = 0;
    var gross_salary = 0;
    var esic_amount = 0;
    var pf_amount = 0;
    var net_salary = 0;

    if ($('#basic_salary' + salary_id).val() > 0) {
      basic_salary = $('#basic_salary' + salary_id).val();
    }

    if ($('#extra_leave' + salary_id).val() > 0) {
      extra_leave = $('#extra_leave' + salary_id).val();
    }

    if ($('#gross_sal' + salary_id).val() > 0) {
      gross_salary = $('#gross_sal' + salary_id).val();
    }

    if ($('#pf_amount' + salary_id).val() > 0) {
      pf_amount = $('#pf_amount' + salary_id).val();
    }

    if ($('#esic_amount' + salary_id).val() > 0) {
      esic_amount = $('#esic_amount' + salary_id).val();
    }

    var total_salary = basic_salary - extra_leave;

    gross_salary = total_salary;

    $('.add_element' + salary_id).each(function () {
      if ($(this).data('calculation') == 'addition') {
        gross_salary = parseFloat(gross_salary) + parseFloat($(this).val());
      } else {
        gross_salary = parseFloat(gross_salary) - parseFloat($(this).val());
      }
    });

    gross_salary = gross_salary;
    // alert(gross_salary)

    esic_amount = (gross_salary * 0.75) / 100;
    pf_amount = (basic_salary * 12) / 100;

    net_salary = gross_salary - esic_amount - pf_amount;

    $('#esic_amount' + salary_id).val(esic_amount);
    $('#pf_amount' + salary_id).val(pf_amount);
    $('#gross_sal' + salary_id).val(gross_salary);
    $('#net_salary' + salary_id).val(net_salary);

    var total_sal = 0;
    $('.net_sal_box').each(function () {
      if (!isNaN(this.value) && this.value.length != 0) {
        total_sal += parseFloat(this.value);
      }
    });

    $('#total_salary').val(total_sal);
  }

  $(document).on('click', '.save_status_click', function () {
    var action_value = $(this).data('action');
    var chck_value = 0;

    if ($(this).prop('checked') == true) {
      chck_value = 1;
    } else {
      chck_value = 0;
    }

    $('#error_display').html('');

    var csrfName = $('#csrf_token').attr('name'); // CSRF Token name
    var csrfHash = $('#csrf_token').val(); // CSRF hash

    $.ajax({
      url: action_value,
      type: 'POST',
      data: {
        client_status: chck_value,
        [csrfName]: csrfHash,
      },
      success: function (result) {},
    });
  });

  $(document).on('blur', '.easy_pro_update', function () {
    var product_id = $(this).data('product_id');
    var p_element_val = $(this).val();
    var p_element = $(this).data('p_element');

    var csrfName = $('#csrf_token').attr('name'); // CSRF Token name
    var csrfHash = $('#csrf_token').val(); // CSRF hash

    $.ajax({
      type: 'POST',
      url: base_url() + '/easy_edit/update_product/' + product_id,
      data: {
        p_element_val: p_element_val,
        p_element: p_element,
        [csrfName]: csrfHash,
      },
      beforeSend: function () {},
      success: function (response) {
        if ($.trim(response) == 1) {
          $('.add_cls-' + p_element + '-' + product_id).addClass('is-valid');
          setTimeout(function () {
            $('.add_cls-' + p_element + '-' + product_id).removeClass(
              'is-valid'
            );
          }, 2000);

          // round_success_noti('Saved');
        } else {
          $('.add_cls-' + p_element + '-' + product_id).addClass('is-invalid');
          setTimeout(function () {
            $('.add_cls-' + p_element + '-' + product_id).removeClass(
              'is-invalid'
            );
          }, 2000);
        }
      },
    });
  });

  $(document).on('input', '.basic_salary_price', function () {
    var month = $(this).data('month');
    var employee_id = $(this).data('employee_id');
    var basic_salary = $(this).val();

    var csrfName = $('#csrf_token').attr('name'); // CSRF Token name
    var csrfHash = $('#csrf_token').val(); // CSRF hash

    if (basic_salary != '') {
      if (basic_salary < 0) {
        $(this).val(0);
      } else {
        $.ajax({
          url: base_url() + '/payroll/add_basic_salary',
          type: 'POST',
          data: {
            month: month,
            basic_salary: basic_salary,
            employee_id: employee_id,
            [csrfName]: csrfHash,
          },
          beforeSend: function () {},
          success: function (response) {
            if ($.trim(response) == 1) {
              show_success_msg('success', 'Saved!');
            } else {
            }
          },
        });
      }
    } else {
    }
  });

  function round_success_noti(message) {
    Lobibox.notify('success', {
      pauseDelayOnHover: true,
      size: 'mini',
      rounded: true,
      icon: 'bx bx-check-circle',
      delayIndicator: false,
      continueDelayOnInactiveTab: false,
      position: 'bottom left',
      msg: message,
    });
  }

  $(document).on('change', '.checkingrollbox', function () {
    if ($(this).prop('checked')) {
      $(this).siblings('.rollcheckinput').val(1);
    } else {
      $(this).siblings('.rollcheckinput').val(0);
    }
  });

  $(document).on('click', '#addcategory', function () {
    $.ajax({
      url: base_url() + '/document_renew/savecategory',
      type: 'POST',
      data: $('#categoryy_form').serialize(),
      success: function (data) {
        // $('#result').html(data);
        show_success_msg('success', 'Category saved!');
        $('#categoryy_form')[0].reset();

        $('.close').click();
        $('.modal-backdrop').remove();

        display_documentrenew();
      },
    });
  });

  $(document).on('click', '.go_back_or_close', function () {
    // alert(history.length)
    if (1 < history.length) {
      history.back();
    } else {
      window.close();
    }
  });

  $(document).on('click', '#use_custom_contain', function () {
    var checkbox = $(this).prop('checked');
    if (checkbox == true) {
      $('#grids_details').removeClass('d-none');
    } else {
      $('#grids_details').addClass('d-none');
    }
  });

  $(document).on('click', '.use_custom_slide', function () {
    var gridid = $(this).data('gridid');
    var checkbox = $(this).prop('checked');

    if (checkbox == true) {
      $('#slide_grids_details' + gridid).removeClass('d-none');
    } else {
      $('#slide_grids_details' + gridid).addClass('d-none');
    }
  });

  $(document).on('click', '.use_custom_grid1', function () {
    var grid1id = $(this).data('grid1id');
    var checkbox = $(this).prop('checked');

    if (checkbox == true) {
      $('#grid1_details' + grid1id).removeClass('d-none');
    } else {
      $('#grid1_details' + grid1id).addClass('d-none');
    }
  });

  $(document).on('click', '.use_custom_grid2', function () {
    var grid2id = $(this).data('grid2id');
    var checkbox = $(this).prop('checked');

    if (checkbox == true) {
      $('#grid2_details' + grid2id).removeClass('d-none');
    } else {
      $('#grid2_details' + grid2id).addClass('d-none');
    }
  });

  $(document).on('click', '.use_custom_sidebar', function () {
    var sidebarid = $(this).data('sidebarid');
    var checkbox = $(this).prop('checked');

    if (checkbox == true) {
      $('#sidebar_details' + sidebarid).removeClass('d-none');
    } else {
      $('#sidebar_details' + sidebarid).addClass('d-none');
    }
  });

  $(document).on('click', '.use_custom_ad_block', function () {
    var adid = $(this).data('adid');
    var checkbox = $(this).prop('checked');

    if (checkbox == true) {
      $('#ad_block_details' + adid).removeClass('d-none');
    } else {
      $('#ad_block_details' + adid).addClass('d-none');
    }
  });

  $(document).on('click', '.use_custom_shop_slider', function () {
    var shopid = $(this).data('shopid');
    var checkbox = $(this).prop('checked');

    if (checkbox == true) {
      $('#shop_slider_details' + shopid).removeClass('d-none');
    } else {
      $('#shop_slider_details' + shopid).addClass('d-none');
    }
  });

  $(document).on('click', '.delete_doc_category', function () {
    var urll = $(this).data('deleteurl');

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        $.ajax({
          url: urll,
          success: function (result) {
            display_documentrenew();

            if ($.trim(result) == 1) {
              Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
            } else {
              Swal.fire('Failed!', '', 'error');
            }
          },
        });
      }
    });
  });

  $(document).on('click', '.editcategory', function () {
    var catgryid = $(this).data('catgryid');
    var form_data = new FormData($('#edit_document_cat' + catgryid)[0]);

    $.ajax({
      url: $('#edit_document_cat' + catgryid).attr('action'),
      type: 'POST',

      data: form_data,
      processData: false,
      contentType: false,

      success: function (data) {
        show_success_msg('success', 'Category updated!');

        $('.close').click();
        $('.modal-backdrop').remove();
        display_documentrenew();
        setTimeout(function () {
          display_asms();
        }, 1000);
      },
    });
  });

  function display_add_product_form() {
    $.ajax({
      url: base_url() + 'products/get_form',
      success: function (response) {
        $('#add_product_form_container').html(response);

        $('.summernote').summernote({
          tabsize: 2,
          height: 100,
        });
      },
    });
  }

  $(document).on('click', '.addlatestproduct', function () {
    var favbtn = $(this);
    var pid = $(this).data('pid');
    var csrfName = $('#csrf_token').attr('name'); // CSRF Token name
    var csrfHash = $('#csrf_token').val(); // CSRF hash

    $.ajax({
      type: 'POST',
      url: base_url() + 'products/add_to_latest_product/' + pid,
      data: {
        [csrfName]: csrfHash,
      },
      beforeSend: function () {},
      success: function (response) {
        if ($.trim(response) == 1) {
          $(favbtn).addClass('removelatestproduct');
          $(favbtn).removeClass('addlatestproduct');
        }
      },
      error: function () {
        alert('error');
      },
    });
  });

  $(document).on('click', '.removelatestproduct', function () {
    var favbtn = $(this);
    var pid = $(this).data('pid');
    var csrfName = $('#csrf_token').attr('name'); // CSRF Token name
    var csrfHash = $('#csrf_token').val(); // CSRF hash
    $.ajax({
      type: 'POST',
      url: base_url() + 'products/remove_to_latest_product/' + pid,
      data: {
        [csrfName]: csrfHash,
      },
      beforeSend: function () {},
      success: function (response) {
        if ($.trim(response) == 1) {
          $(favbtn).addClass('addlatestproduct');
          $(favbtn).removeClass('removelatestproduct');
        }
      },
      error: function () {
        alert('error');
      },
    });
  });

  $(document).on('click', '.addflashseller', function () {
    var favbtn = $(this);
    var pid = $(this).data('pid');
    var csrfName = $('#csrf_token').attr('name'); // CSRF Token name
    var csrfHash = $('#csrf_token').val(); // CSRF hash
    $.ajax({
      type: 'POST',
      url: base_url() + 'products/add_to_flash_seller/' + pid,
      data: {
        [csrfName]: csrfHash,
      },
      beforeSend: function () {},
      success: function (response) {
        if ($.trim(response) == 1) {
          $(favbtn).addClass('removeflashseller');
          $(favbtn).removeClass('addflashseller');
        }
      },
      error: function () {
        alert('error');
      },
    });
  });

  $(document).on('click', '.removeflashseller', function () {
    var favbtn = $(this);
    var pid = $(this).data('pid');
    var csrfName = $('#csrf_token').attr('name'); // CSRF Token name
    var csrfHash = $('#csrf_token').val(); // CSRF hash
    $.ajax({
      type: 'POST',
      url: base_url() + 'products/remove_to_flash_seller/' + pid,
      data: {
        [csrfName]: csrfHash,
      },
      beforeSend: function () {},
      success: function (response) {
        if ($.trim(response) == 1) {
          $(favbtn).addClass('addflashseller');
          $(favbtn).removeClass('removeflashseller');
        }
      },
      error: function () {
        alert('error');
      },
    });
  });

  $(document).on('click', '.addupsellproduct', function () {
    var favbtn = $(this);
    var pid = $(this).data('pid');
    var csrfName = $('#csrf_token').attr('name'); // CSRF Token name
    var csrfHash = $('#csrf_token').val(); // CSRF hash
    $.ajax({
      type: 'POST',
      url: base_url() + 'products/add_to_upsell_product/' + pid,
      data: {
        [csrfName]: csrfHash,
      },
      beforeSend: function () {},
      success: function (response) {
        if ($.trim(response) == 1) {
          $(favbtn).addClass('removeupsellproduct');
          $(favbtn).removeClass('addupsellproduct');
        }
      },
      error: function () {
        alert('error');
      },
    });
  });

  $(document).on('click', '.removeupsellproduct', function () {
    var favbtn = $(this);
    var pid = $(this).data('pid');
    var csrfName = $('#csrf_token').attr('name'); // CSRF Token name
    var csrfHash = $('#csrf_token').val(); // CSRF hash
    $.ajax({
      type: 'POST',
      url: base_url() + 'products/remove_to_upsell_product/' + pid,
      data: {
        [csrfName]: csrfHash,
      },
      beforeSend: function () {},
      success: function (response) {
        if ($.trim(response) == 1) {
          $(favbtn).addClass('addupsellproduct');
          $(favbtn).removeClass('removeupsellproduct');
        }
      },
      error: function () {
        alert('error');
      },
    });
  });

  $(document).on('click', '.addproductgroup1', function () {
    var favbtn = $(this);
    var pid = $(this).data('pid');
    var csrfName = $('#csrf_token').attr('name'); // CSRF Token name
    var csrfHash = $('#csrf_token').val(); // CSRF hash
    $.ajax({
      type: 'POST',
      url: base_url() + 'products/add_to_product_group/' + pid,
      data: {
        [csrfName]: csrfHash,
      },
      beforeSend: function () {},
      success: function (response) {
        if ($.trim(response) == 1) {
          $(favbtn).addClass('removeproductgroup1');
          $(favbtn).removeClass('addproductgroup1');
        }
      },
      error: function () {
        alert('error');
      },
    });
  });

  $(document).on('click', '.removeproductgroup1', function () {
    var favbtn = $(this);
    var pid = $(this).data('pid');
    var csrfName = $('#csrf_token').attr('name'); // CSRF Token name
    var csrfHash = $('#csrf_token').val(); // CSRF hash
    $.ajax({
      type: 'POST',
      url: base_url() + 'products/remove_to_product_group/' + pid,
      data: {
        [csrfName]: csrfHash,
      },
      beforeSend: function () {},
      success: function (response) {
        if ($.trim(response) == 1) {
          $(favbtn).addClass('addproductgroup1');
          $(favbtn).removeClass('removeproductgroup1');
        }
      },
      error: function () {
        alert('error');
      },
    });
  });

  $(document).on('change', '.checkingrollbox', function () {
    if ($(this).prop('checked')) {
      $(this).siblings('.rollcheckinput').val(1);
    } else {
      $(this).siblings('.rollcheckinput').val(0);
    }
  });

  $(document).on('change', '.checkingrollbox2', function () {
    if ($(this).prop('checked')) {
      $(this).siblings('.rollcheckinput2').val(1);
    } else {
      $(this).siblings('.rollcheckinput2').val(0);
    }
  });

  $(document).on('change', '#attend_date_box', function () {
    var loc = location.href;
    var sortval = $('#attend_date_box').val();

    var key = 'attend_date';

    $('.page-content').html(
      '<div class="apanel_loader"><div class="timeline-wrapper"><div class="timeline-item"><div class="d-flex justify-content-between"><div class="animated-background title_mask"></div><div class="d-flex"><div class="animated-background button_mask1"></div><div class="animated-background button_mask2"></div></div></div><div class="row mt-3"><div class="col-md-4 mb-3"><div class="d-flex rounded-5"><div class="my-auto w-50"><div class="animated-background proload mr-2"></div></div><div class="my-auto w-50"><div class="animated-background protext"></div><div class="animated-background protext"></div><div class="animated-background protext"></div><div class="animated-background protext"></div><div class="animated-background protext"></div></div></div></div><div class="col-md-4 mb-3"><div class="animated-background rounded-5"></div></div><div class="col-md-4 mb-3"><div class="animated-background rounded-5"></div></div><div class="col-md-12 mb-3"><div class="animated-background rounded-5"></div></div><div class="col-md-12 mb-3"><div class="animated-background rounded-5"></div></div><div class="col-md-6 mb-3"><div class="animated-background rounded-5"></div></div><div class="col-md-6 mb-3"><div class="animated-background rounded-5"></div></div></div></div></div></div>'
    );

    var re = new RegExp('([?&])' + key + '=.*?(&|$)', 'i');
    var separator = loc.indexOf('?') !== -1 ? '&' : '?';
    if (loc.match(re)) {
      location.href = loc.replace(re, '$1' + key + '=' + sortval + '$2');
    } else {
      location.href = loc + separator + key + '=' + sortval;
    }
  });

  $(document).on('click', '#monthapply', function () {
    var loc = location.href;
    var sortval = $('#attend_month_box').val();

    var key = 'attend_date';

    var re = new RegExp('([?&])' + key + '=.*?(&|$)', 'i');
    var separator = loc.indexOf('?') !== -1 ? '&' : '?';
    if (loc.match(re)) {
      location.href = loc.replace(re, '$1' + key + '=' + sortval + '$2');
    } else {
      location.href = loc + separator + key + '=' + sortval;
    }
  });

  $(document).on('click', '.form_reset_button', function () {
    $('.form_resetable')[0].reset();
  });

  //////  APP CLICKS //////
  $(document).on('click', '.href_loader', function () {
    var this_content = $(this).html();
    href_loader();
  });

  $(document).on('submit', '.filter_bar form', function () {
    var this_content = $(this).html();
    href_loader();
  });

  $(document).on('submit', '.filter_load form', function () {
    var this_content = $(this).html();
    href_loader();
  });

  $(document).on('submit', '.on_submit_loader', function () {
    var this_content = $(this).html();
    var this_button = $(this).find('button[type="submit"]');
    $(this_button).html(
      '<div class="spinner-grow spinner-grow-sm" role="status"> <span class="visually-hidden">Saving...</span></div>'
    );
  });

  $(document).on('click', '.load_me_on_submit_click', function () {
    var this_button = $(this);
    var thisform = $(this_button).parents('form');

    $(document).on('submit', thisform, function () {
      $(this_button).html(
        '<div class="spinner-grow spinner-grow-sm" role="status"> <span class="visually-hidden">Saving...</span></div>'
      );
    });
  });

  $(document).on('submit', '.submit_loader', function () {
    var this_content = $(this).html();
    href_loader();
  });

  $(document).on(
    'click',
    '.SpriteGenix_table_export[data-type="excel"],.SpriteGenix_table_export[data-type="csv"],.SpriteGenix_table_export[data-type="pdf"]',
    function () {
      show_success_msg('success', 'Your file is ready!, please wait...');
    }
  );

  function href_loader() {
    $('body').append(
      '<div id="print_loader" class="d-flex"><div class="print_box m-auto d-flex justify-content-center"><div class="d-flex my-auto"><div class="spin_me sec_spin"><span class="loader-4"> </span></div></div></div> </div>'
    );
  }

  $(document).on('click', '.href_long_loader', function () {
    var this_content = $(this).html();
    $('.page-content').html(
      '<div class="apanel_loader2"><div><div class="spinner-loading"></div><div class="ddddddta"><div class="preloader"><div class="preloader_inner">100%</div></div></div><h3 class="load_h3">Please do not press back or close the app</h3></div><div class="page"></div></div>'
    );
    loader();
  });

  $(document).on('click', '.href_long_loader_filter', function () {
    var this_content = $(this).html();
    var form = $(this).closest('form');

    form.submit();
    $('.page-content').html(
      '<div class="apanel_loader2"><div><div class="spinner-loading"></div><div class="ddddddta"><div class="preloader"><div class="preloader_inner">100%</div></div></div><h3 class="load_h3">Please do not press back or close the app</h3></div><div class="page"></div></div>'
    );
    loader();
  });

  $(document).on('change', '.department_category', function () {
    var parent = $(this).val();
    var elem = $(this).data('dptid');
    $.ajax({
      url: base_url() + 'settings/get_catgry_select/' + parent,
      success: function (response) {
        $('#user' + elem).html(response);
      },
      error: function () {
        alert('error');
      },
    });
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

  function loader(_success) {
    var obj = document.querySelector('.preloader'),
      inner = document.querySelector('.preloader_inner'),
      page = document.querySelector('.page');
    obj.classList.add('show_load');
    page.classList.remove('show_load');
    var w = 0,
      t = setInterval(function () {
        w = w + 1;
        inner.textContent = w + '%';
        if (w === 98) {
          page.classList.add('show_load');
          clearInterval(t);
          w = 0;
          if (_success) {
            return _success();
          }
        }
      }, 100);
  }

  // $(document).on('click','form button',function(){
  // 	var this_btn_content=$(this).html();
  // 	var this_btn=$(this);
  // 	var rep_btn_content=this_btn_content;

  // 	if(! $(this).closest(".note-editor").length && !$(this).closest(".no_loader").length) {
  //     $(this).html('<div class="spinner-grow spinner-grow-sm" role="status"> <span class="visually-hidden">Saving...</span></div>');
  // 	// $(this_btn).prop('disabled',true);
  // 	setTimeout(function(){
  // 		$(this_btn).html(rep_btn_content);
  // 		// $(this_btn).prop('disabled',false);
  // 	},3000);
  // 	}

  // });

  $(document).on('click', '.button_loader', function () {
    var this_btn_content = $(this).html();
    var this_btn = $(this);
    var rep_btn_content = this_btn_content;
    $(this).html(
      '<div class="spinner-grow spinner-grow-sm" role="status"> <span class="visually-hidden">Saving...</span></div>'
    );

    // $(this_btn).prop('disabled',true);
    setTimeout(function () {
      $(this_btn).html(rep_btn_content);
      // $(this_btn).prop('disabled',false);
    }, 3000);
  });

  //Item Kit Scripts
  $(document).on('change', '.product_type', function () {
    if ($(this).val() == 'single') {
      $('#product_selector').removeClass('d-block');
      $('#product_selector').addClass('d-none');
      $('#product_container').html('');
    } else {
      $('#product_selector').addClass('d-block');
      $('#product_selector').removeClass('d-none');

      var no_of_pros = $('.itemparent').length;

      if (no_of_pros != 0) {
        $('#product_container').html(
          '<h6 class="text-center mt-2" style="color: #0fae2f;">' +
            no_of_pros +
            ' items added!</h6>'
        );
      } else {
        $('#product_container').html('');
      }
    }
  });

  $(document).on('click', '#find_btn', function () {
    //user clicks button
    if ('geolocation' in navigator) {
      //check geolocation available
      //try to get user current location using getCurrentPosition() method
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
          $('#cmy_location').val(
            position.coords.latitude + ',' + position.coords.longitude
          );
          $('#find_btn').html(
            '<span class="text-success"><i class="fa fa-check"></i> Done</span>'
          );
        });
      } else {
        $('#find_btn').html(
          '<span class="text-danger"><i class="fa fa-check"></i> failed</span>'
        );
      }
    } else {
      console.log("Browser doesn't support geolocation!");
    }
  });

  $(document).on('click', '#savedas', function () {
    var checkbox = $(this).prop('checked');
    if (checkbox == true) {
      $('#customer_contact_details').removeClass('d-none');
    } else {
      $('#customer_contact_details').addClass('d-none');
    }
  });

  $(document).on('click', '#add_customer', function () {
    var company = $.trim($('#company').val());
    var area = $.trim($('#area').val());
    var contacttype = $.trim($('#contacttype').val());
    var designation = $.trim($('#designation').val());
    var gst_input = $.trim($('#gst_input').val());

    var gstinformat = new RegExp(
      '^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]1}[1-9A-Z]{1}Z[0-9A-Z]{1}$'
    );

    var name = $.trim($('#display_name').val());
    var phone = $.trim($('#phone').val());
    var email = $.trim($('#email').val());
    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;

    if (name == '') {
      $('#error_mes').html(
        '<div class="alert alert-danger mb-3 mb-3">Please enter name</div>'
      );
    } else if (name.length < 4) {
      $('#error_mes').html(
        '<div class="alert alert-danger mb-3 mb-3">Atleast 4 characters required</div>'
      );
    } else {
      var valid_gst = true;

      var reggst =
        /^([0-9]){2}([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}([0-9]){1}([a-zA-Z]){1}([0-9]){1}?$/;
      if (!reggst.test(gst_input) && gst_input != '') {
        valid_gst = true;
      }

      if (valid_gst == false) {
        $('#error_mes').html(
          '<div class="alert alert-danger mb-3 mb-3">Please Enter Valid GSTIN Number</div>'
        );
        // $("#gst_input").val('');
        $('#gst_input').focus();
      } else {
        var checkbox = $('#savedas').prop('checked');
        if (checkbox == true) {
          if (area == '') {
            $('#error_mes').html(
              '<div class="alert alert-danger mb-3 mb-3">Please Enter area</div>'
            );
          } else if (company == '') {
            $('#error_mes').html(
              '<div class="alert alert-danger mb-3 mb-3">Please enter Company Name</div>'
            );
          } else if (contacttype == '') {
            $('#error_mes').html(
              '<div class="alert alert-danger mb-3 mb-3">Please select Contact type</div>'
            );
          } else if (designation == '') {
            $('#error_mes').html(
              '<div class="alert alert-danger mb-3 mb-3">Please select Designation</div>'
            );
          } else {
            $('#error_mes').html('');
            $('#add_cust_form').submit();
          }
        } else {
          $('#error_mes').html('');
          $('#add_cust_form').submit();
        }
      }
    }
  });

  $(document).on('click', '.click_inventory', function () {
    var redirect_url = $(this).data('urlll');
    var from_stage = $(this).data('from_stage');

    var is_crm = $('#is_crm').val();
    if (is_crm == 1) {
      $('#againstmodal').modal('show');

      $.ajax({
        url:
          base_url() +
          'crm/get_against_data?redirect_url=' +
          redirect_url +
          '&from_stage=' +
          from_stage,
        success: function (response) {
          $('#display_against_crm_data').html(response);
        },
        error: function () {
          alert('error');
        },
      });
    } else {
      href_loader();
      location.href = redirect_url;
    }
  });

  $(document).on('input', '#agaist_search', function () {
    var value = $(this).val().toUpperCase();
    $('.against_ul > li').each(function () {
      if ($(this).text().toUpperCase().search(value) > -1) {
        $(this).show();
      } else {
        $(this).hide();
      }
    });
  });

  $(document).on('click', '.click_inventory_from_renew', function () {
    var redirect_url = $(this).data('urlll');
    var from_stage = $(this).data('from_stage');
    var from_renew = $(this).data('from_renew');

    var is_crm = $('#is_crm').val();
    if (is_crm == 1) {
      $('#againstmodal').modal('show');

      $.ajax({
        url:
          base_url() +
          'crm/get_against_data_from_renew?redirect_url=' +
          redirect_url +
          '&from_stage=' +
          from_stage +
          '&from_renew=' +
          from_renew,
        success: function (response) {
          $('#display_against_crm_data').html(response);
        },
        error: function () {
          alert('error');
        },
      });
    } else {
      location.href = redirect_url;
    }
  });

  //Item Kit Scripts

  $(document).on('click', '.copy_me', function () {
    textt = $(this).html();

    var newtext = $.trim(textt.replace('<span class="copiedsec"></span>', ''));
    var latext = newtext.replace(
      '<span class="copiedsec">- <i class="bx bx-check-circle">Copied!</i></span>',
      ''
    );
    navigator.clipboard.writeText($.trim(latext));
    $(this).css('color', '#bbbec1');
    $(this)
      .find('.copiedsec')
      .html('- <i class="bx bx-check-circle">Copied!</i>');
  });

  $(document).on('click', '.copy_me_renew', function () {
    var copid = $(this).data('copid');
    var textt = $('#copy-ren' + copid).val();

    var newtext = $.trim(textt.replace('<span class="copiedsec"></span>', ''));
    var latext = newtext.replace(
      '<span class="copiedsec">- <i class="bx bx-check-circle">Copied!</i></span>',
      ''
    );
    navigator.clipboard.writeText($.trim(latext));
    $(this).css('color', '#bbbec1');
    $(this).find('.copiedsec').html('<i class="bx bx-copy"></i>');
  });

  $(document).on('input', '#wholesearch', function (e) {
    $('.search_result').addClass('d-none');
    var search_text = $.trim($(this).val());
    if (search_text.length > 0) {
      $.ajax({
        url: base_url() + '/home/search/' + search_text,
        success: function (response) {
          if ($.trim(response) != '') {
            $('#suggest').html(response);
            $('.search_result').removeClass('d-none');
          }
        },
        error: function () {
          alert('error');
        },
      });
    }
  });

  $(document).on('click', '.checkBoxClass_sq', function (e) {
    var checkedNum = $('input[name="pol_is_sq[]"]:checked').length;
    if (checkedNum > 1) {
      $('#tooltip_qts').css('display', 'block');
    } else {
      $('#tooltip_qts').css('display', 'none');
    }
  });

  $(document).on('click', '.checkBoxClass_so', function (e) {
    var checkedNum = $('input[name="pol_is_so[]"]:checked').length;
    if (checkedNum > 1) {
      $('#tooltip_sotdn').css('display', 'block');
    } else {
      $('#tooltip_sotdn').css('display', 'none');
    }
  });

  $(document).on('click', '.checkBoxClass_sdn', function (e) {
    var checkedNum = $('input[name="pol_is_sdn[]"]:checked').length;
    if (checkedNum > 1) {
      $('#tooltip').css('display', 'block');
    } else {
      $('#tooltip').css('display', 'none');
    }
  });

  $(document).on('input', '.update_rate', function () {
    var rate = $.trim($(this).val());
    var cid = $.trim($(this).data('cid'));
    if (rate == '' || rate == 0) {
    } else {
      $.ajax({
        url:
          base_url() +
          '/product_scrapper/update_rate?rate=' +
          rate +
          '&cid=' +
          cid,
        success: function (response) {
          $('#savedcur').html('Saved!');
          setTimeout(function () {
            $('#savedcur').html('');
          }, 2000);
        },
        error: function () {
          alert('error');
        },
      });
    }
  });

  $(document).on('input', '.update_profit', function () {
    var rate = $.trim($(this).val());
    var cid = $.trim($(this).data('cid'));
    if (rate == '' || rate == 0) {
    } else {
      $.ajax({
        url:
          base_url() +
          '/product_scrapper/update_profit?rate=' +
          rate +
          '&cid=' +
          cid,
        success: function (response) {
          $('#savedcur').html('Saved!');
          setTimeout(function () {
            $('#savedcur').html('');
          }, 2000);
        },
        error: function () {
          alert('error');
        },
      });
    }
  });

  $(document).on('click', '.sync_to_google_shop', function () {
    var sync_to_google_shop = $(this);
    var uurl = $(this).data('url');
    var csrfName = $('#csrf_token').attr('name'); // CSRF Token name
    var csrfHash = $('#csrf_token').val(); // CSRF hash
    $.ajax({
      type: 'POST',
      url: uurl,
      data: {
        [csrfName]: csrfHash,
      },
      beforeSend: function () {
        $(sync_to_google_shop).html('<i class="spinner_gro_custom"></i>');
      },
      success: function (result) {
        if ($.trim(result) == 1) {
          $(sync_to_google_shop).html(
            '<i class="bx bx-check-double text-white"></i>'
          );
        } else {
          $(sync_to_google_shop).html(
            '<i class="lni lni-google text-google"></i>'
          );

          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'First, you must configure Google service',
            showConfirmButton: false,
            footer: '<a class="btn btn-primary">Please configure now</a>',
          });
        }
      },
      error: function () {
        alert('error');
      },
    });
  });

  $(document).on('click', '#sync_all_to_google_shop', function () {
    var sync_to_google_shop = $('#sync_all_to_google_shop');

    var len = $('.sync_to_google_shop').length;
    var ip = 0;
    var csrfName = $('#csrf_token').attr('name'); // CSRF Token name
    var csrfHash = $('#csrf_token').val(); // CSRF hash
    $('.sync_to_google_shop').each(function (index) {
      var uurl = $(this).data('url');
      $.ajax({
        type: 'POST',
        url: uurl,
        data: {
          [csrfName]: csrfHash,
        },
        beforeSend: function () {
          $('#sync_all_to_google_shop').prop('disabled', true);
        },
        success: function (result) {
          if ($.trim(result) == 1) {
            ip++;
            if (ip == len) {
              $('#synmes').html('');
            } else {
              $('#synmes').html(
                '<div class="col-md-12"><div class="card" ><div class="card-body">Please wait few minutes... ' +
                  ip +
                  ' items completed</div></div></div>'
              );
            }
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'First, you must configure Google service',
              showConfirmButton: false,
              footer: '<a class="btn btn-primary" >Please configure now</a>',
            });
          }
        },
        error: function () {
          alert('error');
        },
      });
    });
  });

  $(document).on('click', '.sync_all_to_branch', function () {
    var sync_to_google_shop = $(this);
    var branchid = $(this).data('branchid');

    var len = $('.sync_to_google_shop').length;
    var ip = 0;
    Swal.fire({
      title: 'Are you sure?',
      text: "If you click 'YES', it will copy all units, brands, categories, sub categories, secondary categories and products",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, transfer!',
    }).then((result) => {
      if (result.isConfirmed) {
        var ip = 0;
        $('.sync_to_google_shop').each(function (index) {
          var idd = $.trim($(this).data('idd'));
          var unit = $.trim($(this).data('unit'));
          var brand = $.trim($(this).data('brand'));
          var category = $.trim($(this).data('category'));
          var sub_category = $.trim($(this).data('sub_category'));
          var sec_category = $.trim($(this).data('sec_category'));

          if (idd == 0 || idd == '') {
            idd = '';
          }
          if (unit == 0 || unit == '') {
            unit = 'no_val';
          }
          if (brand == 0 || brand == '') {
            brand = 'no_val';
          }
          if (category == 0 || category == '') {
            category = 'no_val';
          }
          if (sub_category == 0 || sub_category == '') {
            sub_category = 'no_val';
          }
          if (sec_category == 0 || sec_category == '') {
            sec_category = 'no_val';
          }

          var csrfName = $('#csrf_token').attr('name'); // CSRF Token name
          var csrfHash = $('#csrf_token').val(); // CSRF hash

          $.ajax({
            type: 'POST',
            url:
              base_url() +
              '/import_and_export/sync_products_to_branch/' +
              branchid +
              '/' +
              idd +
              '/' +
              unit +
              '/' +
              brand +
              '/' +
              category +
              '/' +
              sub_category +
              '/' +
              sec_category,
            data: {
              [csrfName]: csrfHash,
            },
            beforeSend: function () {
              $(sync_to_google_shop).prop('disabled', true);
              $('#sync_select').modal('hide');
              $('#synmes').html(
                '<div class="col-md-12"><div class="card" ><div class="card-body d-md-flex"><span class="my-auto">Please wait few minutes...</span><div class="spinner-border spinner-border-sm" role="status"> <span class="visually-hidden">Loading...</span></div><span class="my-auto">, please dont close/refresh the page until complete.</span></div></div></div>'
              );
            },
            success: function (response) {
              $('#synmes').html('');
              $('#synmes').html(
                '<div class="col-md-12"><div class="card" ><div class="card-body d-md-flex"><span class="my-auto text-success">Completed</span></div></div></div>'
              );
            },
            error: function () {
              alert('error');
            },
          });
        });
      }
    });
  });

  $(document).on('click', '#add_multiple_quotation_to_order', function () {
    // alert('f')
    var val = [];
    $('input[name="pol_is_sq[]"]:checked').each(function (i) {
      val[i] = $(this).val();
    });

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: false,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Okay, I understood',
    }).then((result) => {
      if (result.isConfirmed) {
        if ($('#view_type').val() == 'sales') {
          window.location.href =
            base_url() + 'invoices/convert_to_sale_order/' + val;
        } else {
          window.location.href =
            base_url() + 'purchases/convert_to_purchase_order/' + val;
        }
      }
    });
  });

  $(document).on('click', '#add_multiple_order_to_delivery_note', function () {
    var val = [];
    $('input[name="pol_is_so[]"]:checked').each(function (i) {
      val[i] = $(this).val();
    });

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: false,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Okay, I understood',
    }).then((result) => {
      if (result.isConfirmed) {
        if ($('#view_type').val() == 'sales') {
          window.location.href =
            base_url() + 'invoices/convert_to_sale_delivery_note/' + val;
        } else {
          window.location.href =
            base_url() + 'purchases/convert_to_purchase_delivery_note/' + val;
        }
      }
    });
  });

  $(document).on('click', '#add_multiple_to_sale', function () {
    var val = [];
    $('input[name="pol_is_sdn[]"]:checked').each(function (i) {
      val[i] = $(this).val();
    });

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: false,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Okay, I understood',
    }).then((result) => {
      if (result.isConfirmed) {
        if ($('#view_type').val() == 'sales') {
          window.location.href = base_url() + 'invoices/convert_to_sale/' + val;
        } else {
          window.location.href =
            base_url() + 'purchases/convert_to_purchase/' + val;
        }
      }
    });
  });

  $(document).on('click', '.deltoolclocse_qts', function (e) {
    $('#tooltip_qts').css('display', 'none');
  });

  $(document).on('click', '.deltoolclocse_sotdn', function (e) {
    $('#tooltip_sotdn').css('display', 'none');
  });

  $(document).on('click', '.deltoolclocse', function (e) {
    $('#tooltip').css('display', 'none');
  });

  $(document).on(
    'click',
    '.delete,.delete_gp_head, .delete_work_category,.delete_enquiries,.thumbdel,.remove_sec_add_img,.remove_menu_add_img,.delete_track_status,.delete_order,.delete_home_slider_img,.remove_brand_img,.remove_sec_cat_img,.remove_sub_cat_img,.remove_cat_img,.delete_region,.delete_post,.delete,.product_delete,.delete_product_cat,.delete_product_unit,.delete_product_subcat,.delete_product_seccat,.delete_product_brand,.delete_tax_type,.delete_tmber,.pro_empty_all,.pro_delete,.purchase_delete_per,.inv_empty_all,.invoice_restore,.invoice_delete_per,.clear_20_logs,.clear_all_logs,.delete_payment,.delete_ex_payment',
    function () {
      var urld = $(this).data('url');
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      }).then((result) => {
        if (result.isConfirmed) {
          location.href = urld;
        }
      });
    }
  );

  $(document).on('click', '.cancel', function () {
    var urld = $(this).data('url');
    Swal.fire({
      title: 'Are you sure?',
      text: '',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, cancel!',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Cancelled!', '', 'success');

        location.href = urld;
      }
    });
  });

  $(document).on('click', '.restore', function () {
    var urld = $(this).data('url');
    Swal.fire({
      title: 'Are you sure?',
      text: '',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, restore!',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Restored!', '', 'success');

        location.href = urld;
      }
    });
  });

  $(document).on('submit', 'form', function () {
    $(this)
      .find('.spinner_btn')
      .html(
        '<div class="spinner-grow" role="status"> <span class="visually-hidden">Loading...</span></div>'
      );
  });

  $(document).on('change', '.parc', function () {
    var parent = $(this).val();
    var elem = $(this).data('proid');

    $.ajax({
      url: base_url() + 'products/get_sub_select/' + parent,
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

    if (unit == '' || unit == 'None') {
      $('#subuer').html('Select primary unit');
      $('#sub_unit').val('').trigger('change');
    } else if (unit == sub_unit) {
      $('#subuer').html('Unit & Sub unit are same');
      $('#sub_unit').val('').trigger('change');
    } else {
      // $('#subuer').html('');
    }

    if (
      unit != 'None' &&
      sub_unit != 'None' &&
      unit != '' &&
      sub_unit != '' &&
      unit != sub_unit
    ) {
      $('.add_conversion').removeClass('d-none');
      $('#subuer').html('');
    } else {
      $('.add_conversion').addClass('d-none');
    }
  });

  $(document).on('change', '#unit', function () {
    var unit = $.trim($('#unit').val());
    var sub_unit = $.trim($('#sub_unit').val());
    if (unit == '' || unit == 'None') {
      $('#subuer').html('Select primary unit');
      $('.add_conversion').addClass('d-none');
      $('#sub_unit').val('').trigger('change');
    } else if (unit == sub_unit) {
      $('#subuer').html('Unit & Sub unit are same');
      $('#sub_unit').val('').trigger('change');
    } else {
      $('#subuer').html('');
    }
    if (unit != 'None' && unit != '' && sub_unit != '' && unit != sub_unit) {
      $('.add_conversion').removeClass('d-none');
      $('#subuer').html('');
    } else {
      $('.add_conversion').addClass('d-none');
      $('#subuer').html('');
    }
  });

  $(document).on('change', '.subc', function () {
    var parent = $(this).val();
    var elem = $(this).data('proid');

    $.ajax({
      url: base_url() + 'products/get_sec_select/' + parent,
      success: function (response) {
        $('#secondary_category' + elem).html(response);
      },
      error: function () {
        alert('error');
      },
    });
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

  $(document).on('click', '#edit_save_product', function () {
    var form_data = new FormData($('#edit_product_form')[0]);

    $('#error_display').html('');

    var title = $.trim($('#title').val());
    var slug = $.trim($('#slug').val());
    // var description=$.trim($('#description').val());
    var pprice = $.trim($('#pprice').val());
    var psellprice = $.trim($('#psellprice').val());
    var unit = $.trim($('#unit').val());
    var brand = $.trim($('#brand').val());
    var category = $.trim($('#category').val());

    var subunit = $('#sub_unit').val();

    var conversion_unit_rate = $('#conversion_unit_rate').val();

    var product_method = 'product';

    if ($('#product_method_service').prop('checked')) {
      product_method = 'service';
    }

    if (product_method == 'product') {
      if (title == '' || slug == '') {
        $('#error_display').html('Title & slug is required!');
      } else if (pprice == '' || psellprice == '') {
        $('#error_display').html('Price & Selling Price is required!');
      } else if (unit == '' || category == '' || brand == '') {
        $('#error_display').html('Unit, Brand & category is required!');
      } else {
        var is_correct = true;
        var res_message = 'true';
        if (subunit != '') {
          if (conversion_unit_rate == '') {
            is_correct = false;
            res_message = 'Conversion rate is required!';
          } else if (conversion_unit_rate < 1) {
            is_correct = false;
            res_message = 'Value must be greater than or equal to 1';
          }
        }

        if (is_correct) {
          var csrfName = $('#csrf_token').attr('name'); // CSRF Token name
          var csrfHash = $('#csrf_token').val(); // CSRF hash

          $.ajax({
            type: 'POST',
            url: $('#edit_product_form').prop('action'),
            data: form_data,
            processData: false,
            contentType: false,
            beforeSend: function () {
              $('#edit_save_product').html(
                '<div class="spinner-grow" role="status"> <span class="visually-hidden">Loading...</span></div>'
              );
            },
            success: function (result) {
              $('#edit_save_product').html('Save Product');
              if ($.trim(result) == 1) {
                $('#edit_product_form')[0].reset();

                $('#error_display').html('');
                Swal.fire('Saved!', 'Product has been saved.', 'success');

                setInterval(function () {
                  location.reload();
                }, 1000);
              } else if ($.trim(result) == 2) {
                Swal.fire('Slug already exist!', 'Product not saved.', 'error');
              } else {
                Swal.fire('Failed!', 'Product has been saved.', 'error');
              }
            },
          });
        } else {
          $('#error_display').html(res_message);
        }
      }
    } else {
      if (title == '' || slug == '') {
        $('#error_display').html('Title & slug is required!');
      } else if (psellprice == '') {
        $('#error_display').html('Selling Price is required!');
      } else if (unit == '') {
        $('#error_display').html('Unit is required!');
      } else {
        var is_correct = true;
        var res_message = 'true';
        if (subunit != '') {
          if (conversion_unit_rate == '') {
            is_correct = false;
            res_message = 'Conversion rate is required!';
          } else if (conversion_unit_rate < 1) {
            is_correct = false;
            res_message = 'Value must be greater than or equal to 1';
          }
        }

        if (is_correct) {
          var csrfName = $('#csrf_token').attr('name'); // CSRF Token name
          var csrfHash = $('#csrf_token').val(); // CSRF hash
          $.ajax({
            type: 'POST',
            url: $('#edit_product_form').prop('action'),
            data: form_data,
            processData: false,
            contentType: false,
            beforeSend: function () {
              $('#edit_save_product').html(
                '<div class="spinner-grow" role="status"> <span class="visually-hidden">Loading...</span></div>'
              );
            },
            success: function (result) {
              $('#edit_save_product').html('Save Product');
              if ($.trim(result) == 1) {
                $('#edit_product_form')[0].reset();

                $('#error_display').html('');
                Swal.fire('Saved!', 'Product has been saved.', 'success');

                setInterval(function () {
                  location.reload();
                }, 1000);
              } else if ($.trim(result) == 2) {
                Swal.fire('Slug already exist!', 'Product not saved.', 'error');
              } else {
                Swal.fire('Failed!', 'Product has been saved.', 'error');
              }
            },
          });
        } else {
          $('#error_display').html(res_message);
        }
      }
    }
  });

  $(document).on('change', '#featured_image', function () {
    $('#featured_upload_form p').text(this.files[0].name);

    //stop submit the form, we will post it manually.
    event.preventDefault();

    filesLength = this.files.length;
    for (var i = 0; i < filesLength; i++) {
      var f = this.files[i];
      var fileReader = new FileReader();
      fileReader.onload = function (e) {
        var file = e.target;
        var img = $('<img></img>', {
          class: 'fe_img',
          src: e.target.result,
          title: file.name,
        });
        $('#featured_upload_form p').html(img);
      };
      fileReader.readAsDataURL(f);
    }

    // disabled the submit button
    $('#btnSubmit').prop('disabled', true);
  });

  $(document).on('change', '#thumbnail_images', function () {
    $('#thumb_upload_form p').text('');

    filesLength = this.files.length;
    for (var i = 0; i < filesLength; i++) {
      var f = this.files[i];
      var fileReader = new FileReader();
      fileReader.onload = function (e) {
        var file = e.target;
        var img = $('<img></img>', {
          class: 'thumb_img',
          src: e.target.result,
          title: file.name,
        });
        $('#thumb_upload_form p').append(img);
      };
      fileReader.readAsDataURL(f);
    }

    event.preventDefault();

    // disabled the submit button
    $('#btnSubmit').prop('disabled', true);
  });

  $(document).on('click', '.thumb_detail_image', function () {
    var image = $(this).attr('src');
    $('#main_detail_image').attr('src', image);
  });

  $(document).on('click', '.addtop', function () {
    var favbtn = $(this);

    var pid = $(this).data('pid');
    var csrfName = $('#csrf_token').attr('name'); // CSRF Token name
    var csrfHash = $('#csrf_token').val(); // CSRF hash

    $.ajax({
      type: 'POST',
      url: base_url() + 'products/add_to_top/' + pid,
      data: {
        [csrfName]: csrfHash,
      },
      beforeSend: function () {},
      success: function (response) {
        if ($.trim(response) == 1) {
          $(favbtn).addClass('removetop');
          $(favbtn).removeClass('addtop');
        }
      },
      error: function () {
        alert('error');
      },
    });
  });

  $(document).on('click', '.removetop', function () {
    var favbtn = $(this);
    var pid = $(this).data('pid');

    var csrfName = $('#csrf_token').attr('name'); // CSRF Token name
    var csrfHash = $('#csrf_token').val(); // CSRF hash

    $.ajax({
      type: 'POST',
      url: base_url() + 'products/remove_to_top/' + pid,
      data: {
        [csrfName]: csrfHash,
      },
      beforeSend: function () {},
      success: function (response) {
        if ($.trim(response) == 1) {
          $(favbtn).addClass('addtop');
          $(favbtn).removeClass('removetop ');
        }
      },
      error: function () {
        alert('error');
      },
    });
  });

  $(document).on('click', '.adddeals', function () {
    var favbtn = $(this);
    var pid = $(this).data('pid');
    var csrfName = $('#csrf_token').attr('name'); // CSRF Token name
    var csrfHash = $('#csrf_token').val(); // CSRF hash
    $.ajax({
      type: 'POST',
      url: base_url() + 'products/add_to_deals/' + pid,
      data: {
        [csrfName]: csrfHash,
      },
      beforeSend: function () {},
      success: function (response) {
        if ($.trim(response) == 1) {
          $(favbtn).addClass('removedeals');
          $(favbtn).removeClass('adddeals');
        }
      },
      error: function () {
        alert('error');
      },
    });
  });

  $(document).on('click', '.removedeals', function () {
    var favbtn = $(this);
    var pid = $(this).data('pid');
    var csrfName = $('#csrf_token').attr('name'); // CSRF Token name
    var csrfHash = $('#csrf_token').val(); // CSRF hash
    $.ajax({
      type: 'POST',
      url: base_url() + 'products/remove_to_deals/' + pid,
      data: {
        [csrfName]: csrfHash,
      },
      beforeSend: function () {},
      success: function (response) {
        if ($.trim(response) == 1) {
          $(favbtn).addClass('adddeals');
          $(favbtn).removeClass('removedeals ');
        }
      },
      error: function () {
        alert('error');
      },
    });
  });

  $(document).on('click', '.addtop_seller', function () {
    var favbtn = $(this);
    var pid = $(this).data('pid');
    var csrfName = $('#csrf_token').attr('name'); // CSRF Token name
    var csrfHash = $('#csrf_token').val(); // CSRF hash
    $.ajax({
      type: 'POST',
      url: base_url() + 'products/add_to_top_seller/' + pid,
      data: {
        [csrfName]: csrfHash,
      },
      beforeSend: function () {},
      success: function (response) {
        if ($.trim(response) == 1) {
          $(favbtn).addClass('removetop_seller');
          $(favbtn).removeClass('addtop_seller');
        }
      },
      error: function () {
        alert('error');
      },
    });
  });

  $(document).on('click', '.removetop_seller', function () {
    var favbtn = $(this);
    var pid = $(this).data('pid');
    var csrfName = $('#csrf_token').attr('name'); // CSRF Token name
    var csrfHash = $('#csrf_token').val(); // CSRF hash
    $.ajax({
      type: 'POST',
      url: base_url() + 'products/remove_to_top_seller/' + pid,
      data: {
        [csrfName]: csrfHash,
      },
      beforeSend: function () {},
      success: function (response) {
        if ($.trim(response) == 1) {
          $(favbtn).addClass('addtop_seller');
          $(favbtn).removeClass('removetop_seller ');
        }
      },
      error: function () {
        alert('error');
      },
    });
  });

  $(document).on('click', '.addonline', function () {
    var favbtn = $(this);
    var pid = $(this).data('pid');
    var csrfName = $('#csrf_token').attr('name'); // CSRF Token name
    var csrfHash = $('#csrf_token').val(); // CSRF hash
    $.ajax({
      type: 'POST',
      url: base_url() + 'products/add_to_online/' + pid,
      data: {
        [csrfName]: csrfHash,
      },
      beforeSend: function () {},
      success: function (response) {
        if ($.trim(response) == 1) {
          $(favbtn).addClass('removeonline');
          $(favbtn).removeClass('addonline');
        }
      },
      error: function () {
        alert('error');
      },
    });
  });

  $(document).on('click', '.removeonline', function () {
    var favbtn = $(this);
    var pid = $(this).data('pid');
    var csrfName = $('#csrf_token').attr('name'); // CSRF Token name
    var csrfHash = $('#csrf_token').val(); // CSRF hash
    $.ajax({
      type: 'POST',
      url: base_url() + 'products/remove_to_online/' + pid,
      data: {
        [csrfName]: csrfHash,
      },
      beforeSend: function () {},
      success: function (response) {
        if ($.trim(response) == 1) {
          $(favbtn).addClass('addonline');
          $(favbtn).removeClass('removeonline');
        }
      },
      error: function () {
        alert('error');
      },
    });
  });

  $(document).on('click', '#scrap_product', function () {
    var scrap_url = $.trim($('#scrap_url').val());
    var siteid = $.trim($('#siteid').val());

    var csrfName = $('#csrf_token').attr('name'); // CSRF Token name
    var csrfHash = $('#csrf_token').val(); // CSRF hash

    if (scrap_url != '') {
      $.ajax({
        url:
          base_url() +
          'product_scrapper/?siteid=' +
          siteid +
          '&scrap_url=' +
          scrap_url,
        cache: false,
        data: {
          scrap_url: scrap_url,
          siteid: siteid,
          [csrfName]: csrfHash,
        },
        beforeSend: function () {
          $('#scrap_product').html(
            'Scrapping <i class="bx bx-loader bx-spin ms-2 my-auto" style="font-size: 17px;"></i>'
          );
        },
        success: function (response) {
          // $('.scrap_error').html(response);
          $('#scrap_product').html('Scrap');
          $('#scrap_url').val('');

          data = $.parseJSON(response);
          $('#title').val(data.product_name);

          $('#url_msg').html(
            '<div class="alert border-0 border-5 border-success alert-dismissible fade show"><div class="d-flex align-items-center"><div class="font-35 text-success"><i class="bx bx-error msg_warning"></i></div><div class="ms-3"><div class="mb-0 text-success">If the product url is not identified while scrapping,</div><div class="mb-0 text-success">Close this message and add Manually.</div></div></div><button type="button" id="btn_scrap" class="btn-close my-3" data-bs-dismiss="alert" aria-label="Close"></button></div>'
          );
          $('#scrapped_by').val(siteid);

          var prreslugg = data.product_name;
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

          // $('#slug').val(data.product_name);
          $('#pprice').val(data.pprice);
          $('#psellprice').val(data.psellprice);
          if (data.brand != '') {
            $('#brand option[value=' + data.brand + ']').attr(
              'selected',
              'selected'
            );
          }

          if ($.trim(data.prod_img) != '') {
            var img = $('<img></img>', {
              class: 'fe_img',
              src: data.prod_img,
              title: data.prod_img,
            });
            $('#featured_upload_form p').html(img);
            $('#scrapped_product_image').val(data.prod_img);
          }

          $('#description').html(data.description);
          $('#long_description').html(data.rich_description);
          $('#long_description').summernote('code', data.rich_description);

          // var keywords=data.product_name.replace(/[^a-z0-9\s]/gi, '');
          // $('#keywords').html(keywords.replace(/\s+/g, ","));
          $('#keywords').html(data.keywords);
        },
        error: function (response) {
          alert(response);
        },
      });
    }
  });

  $(document).on('click', '#btn_scrap', function () {
    $('#scrapped_by').val(0);
  });

  $(document).on('click', '#addnewfinancialyear', function () {
    Swal.fire({
      title: 'Are you sure to start a new year?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, start!',
    }).then((result) => {
      if (result.value) {
        var csrfName = $('#csrf_token').attr('name'); // CSRF Token name
        var csrfHash = $('#csrf_token').val(); // CSRF hash

        $.ajax({
          type: 'POST',
          url: base_url() + 'settings/start_new_financial_year/',
          data: {
            [csrfName]: csrfHash,
          },
          beforeSend: function () {},
          success: function (response) {
            if ($.trim(response) == 1) {
              Swal.fire(
                'Done!',
                'Last year accounts closed and new year started.',
                'success'
              );
              setInterval(function () {
                location.reload();
              }, 1000);
            } else {
              Swal.fire(
                'Failed!',
                'Current financial year not completed',
                'error'
              );
            }
          },
          error: function () {
            alert('error');
          },
        });
      }
    });
  });

  $(document).on('click', '.activate_f_year', function () {
    var f_year = $(this).data('fyear');
    Swal.fire({
      title: 'Are you sure to activate?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, activate!',
    }).then((result) => {
      if (result.value) {
        var csrfName = $('#csrf_token').attr('name'); // CSRF Token name
        var csrfHash = $('#csrf_token').val(); // CSRF hash

        $.ajax({
          type: 'POST',
          url: base_url() + 'settings/activate_f_year/' + f_year,
          data: {
            [csrfName]: csrfHash,
          },
          beforeSend: function () {},
          success: function (response) {
            if ($.trim(response) == 1) {
              Swal.fire('Activated!', '', 'success');
              setInterval(function () {
                location.reload();
              }, 1000);
            } else {
              Swal.fire('Failed!', '', 'error');
            }
          },
          error: function () {
            alert('error');
          },
        });
      }
    });
  });

  $(document).on('click', '.checkbooox', function () {
    var diuspriceval = $.trim($('#discounted').val());
    if (diuspriceval != '' && diuspriceval != 0) {
      $('#checkbooox').prop('checked', false);
      $('#showspan').html('');
      $('#discounted').val('');
    } else {
      $('#discout_container_product').toggle();
    }
  });

  $(document).on('click', '.save_dis', function () {
    var diuspriceval = $.trim($('#discounted').val());
    if (diuspriceval != '' && diuspriceval != 0) {
      $('#checkbooox').prop('checked', true);
      $('#showspan').html(diuspriceval);
    } else {
      $('#checkbooox').prop('checked', false);
    }
    $('#discout_container_product').toggle();
  });

  $(document).on('change', '.parc', function () {
    var parent = $(this).val();
    var elem = $(this).data('proid');

    $.ajax({
      url: base_url() + 'products/get_sub_select/' + parent,
      success: function (response) {
        $('#subc' + elem).html(response);
      },
      error: function () {
        alert('error');
      },
    });
  });

  $(document).on('change', '.subc', function () {
    var parent = $(this).val();
    var elem = $(this).data('proid');

    $.ajax({
      url: base_url() + 'products/get_sec_select/' + parent,
      success: function (response) {
        $('#secc' + elem).html(response);
      },
      error: function () {
        alert('error');
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
        url: base_url() + 'settings/add_unit_from_ajax',
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
  $(document).on('click', '.add_pro_subunit', function () {
    var elem = $(this).data('proid');
    $('#subunit_container_product' + elem).toggle();
  });

  $(document).on('click', '.addd_subunit', function () {
    $('#subunits').html('');
    var elem = $(this).data('proid');
    var subunit_name = $.trim($('#subunit_name' + elem).val());

    var punit = $.trim($('#unit' + elem).val());
    if (subunit_name != '') {
      var csrfName = $('#csrf_token').attr('name'); // CSRF Token name
      var csrfHash = $('#csrf_token').val(); // CSRF hash

      $.ajax({
        url: base_url() + 'settings/add_subunit_from_ajax',
        type: 'POST',
        data: {
          subunit_name: subunit_name,
          punit: punit,
          [csrfName]: csrfHash,
        },
        success: function (response) {
          if ($.trim(response) != 0) {
            $('#subunit_name' + elem).val('');
            $('#subunit_container_product' + elem).toggle();
            $('#sub_unit' + elem).append(
              '<option value="' +
                response +
                '" selected>' +
                subunit_name +
                '</option>'
            );
          } else {
            $('#subunits').html(
              '<span class="text-danger" style="font-size: 12px;">Select parent unit</span>'
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
      $('.add_pro_cat').prop('disabled', true);
      $.ajax({
        url: base_url() + 'settings/add_cate_from_ajax',
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
          $('.add_pro_cat').prop('disabled', false);
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

      $('.addd_subcate').prop('disabled', true);
      $.ajax({
        url: base_url() + 'settings/add_subcate_from_ajax',
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
          $('.addd_subcate').prop('disabled', false);
        },
        error: function () {
          alert('error');
        },
      });
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
      $('.addd_seccate').prop('disabled', true);
      $.ajax({
        url: base_url() + 'settings/add_seccate_from_ajax',
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
          $('.addd_seccate').prop('disabled', false);
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

      $('.addd_brand').prop('disabled', true);
      $.ajax({
        url: base_url() + 'settings/add_brand_from_ajax',
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
          $('.addd_brand').prop('disabled', false);
        },
        error: function () {
          alert('error');
        },
      });
    }
  });

  $(document).on('change', '.save_side_bar_change', function () {
    save_side_bar();
  });

  $(document).on('click', '.save_side_bar_click', function () {
    save_side_bar();
  });

  function save_side_bar() {
    var form_data = new FormData($('#side_bar_form')[0]);

    $('#error_display').html('');

    var currency = $.trim($('#currency').val());
    var timezone = $.trim($('#timezone').val());

    if (currency == '') {
      $('#error_display').html('Please select currency!');
    } else if (timezone == '') {
      $('#error_display').html('Please select timezone!');
    } else {
      var csrfName = $('#csrf_token').attr('name'); // CSRF Token name
      var csrfHash = $('#csrf_token').val(); // CSRF hash

      $.ajax({
        type: 'POST',
        url: $('#side_bar_form').prop('action'),
        data: form_data,
        processData: false,
        contentType: false,
        // beforeSend: function() {
        //     $('.save_side_bar_click ').html('<div class="spinner-grow" role="status"> <span class="visually-hidden">Saving...</span></div>');
        // },
        success: function (result) {},
      });
    }
  }

  $(document).on('click', '#preference_close', function () {
    location.reload();
  });

  $(document).on('click', '#preference_close_button', function () {
    if ($(this).data('action') == 'open') {
      $(this).data('action', 'close');
    } else {
      location.reload();
    }
  });

  $(document).on('click', '.select_c_status', function () {
    var statusname = 0;
    var getid = $(this).attr('data-id');

    var csrfName = $('#csrf_token').attr('name'); // CSRF Token name
    var csrfHash = $('#csrf_token').val(); // CSRF hash

    if ($(this).prop('checked')) {
      statusname = 1;
    }

    $.ajax({
      type: 'POST',
      url: base_url() + 'payments/update_status',
      data: { statusname: statusname, getid: getid, [csrfName]: csrfHash },
      success: function (result) {
        if (statusname == '1') {
          $('#' + getid + 'rec_status').html(
            ' <span class="px-2 py-1 rounded rec_status" style="font-size:12px;color: green;" >Received</span>'
          );
        } else {
          $('#' + getid + 'rec_status').html(
            ' <span class="px-2 py-1 rounded rec_status" style="font-size:12px;color: red;" >Not Received</span>'
          );
        }
      },
    });
  });

  $(document).on('click', '.select_submit_status', function () {
    var statusname = 0;
    var getid = $(this).attr('data-id');

    var csrfName = $('#csrf_token').attr('name'); // CSRF Token name
    var csrfHash = $('#csrf_token').val(); // CSRF hash

    if ($(this).prop('checked')) {
      statusname = 1;
    }

    $.ajax({
      type: 'POST',
      url: base_url() + 'invoice_submit/update_status',
      data: { statusname: statusname, getid: getid, [csrfName]: csrfHash },
      success: function (result) {
        if (statusname == '1') {
          $('#' + getid + 'rec_status').html(
            ' <span class="px-2 py-1 rounded rec_status" style="font-size:12px;color: green;" >Scan copy received</span>'
          );
        } else {
          $('#' + getid + 'rec_status').html(
            ' <span class="px-2 py-1 rounded rec_status" style="font-size:12px;color: red;" >Scan copy not received</span>'
          );
        }
      },
    });
  });

  var row = 1;
  $(document).on('click', '.add_ac_name', function () {
    $('#expense_container_cate').toggle();
  });

  $(document).on('click', '.addd_excat', function () {
    var lead_id = $.trim($('#lead_id').val());
    var ex_cate_name = $.trim($('#ex_cate_name').val());

    if (lead_id != '') {
      if (ex_cate_name != '') {
        var csrfName = $('#csrf_token').attr('name'); // CSRF Token name
        var csrfHash = $('#csrf_token').val(); // CSRF hash

        $.ajax({
          url: base_url() + 'expenses/add_ex_cate_ajax_crm/' + lead_id,
          type: 'POST',
          data: {
            ex_cate_name: ex_cate_name,
            [csrfName]: csrfHash,
          },
          success: function (response) {
            if ($.trim(response) != 0) {
              $('#ex_cate_name').val('');
              $('#expense_container_cate').toggle();
              $('#account_name').append(
                '<option value="' +
                  response +
                  '" selected>' +
                  ex_cate_name +
                  '</option>'
              );
            }
          },
          error: function () {
            alert('error');
          },
        });
      }
    } else {
      if (ex_cate_name != '') {
        var csrfName = $('#csrf_token').attr('name'); // CSRF Token name
        var csrfHash = $('#csrf_token').val(); // CSRF hash

        $.ajax({
          url: base_url() + 'expenses/add_ex_cate_ajax',
          type: 'POST',
          data: {
            ex_cate_name: ex_cate_name,
            [csrfName]: csrfHash,
          },
          success: function (response) {
            if ($.trim(response) != 0) {
              $('#ex_cate_name').val('');
              $('#expense_container_cate').toggle();
              $('#account_name').append(
                '<option value="' +
                  response +
                  '" selected>' +
                  ex_cate_name +
                  '</option>'
              );
            }
          },
          error: function () {
            alert('error');
          },
        });
      }
    }
  });

  $(document).on(
    'click',
    '.restore_doc_renew,.pro_restore,.pro_restore_all,.invoice_restore,.inv_restore_all,.purchase_restore',
    function () {
      var urld = $(this).data('urld');
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, restore it!',
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire('Restored!', 'Your file has been restored.', 'success');

          location.href = urld;
        }
      });
    }
  );

  $(document).on('click', '.cancel_renew', function () {
    var urld = $(this).data('urlcr');
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, cancel it!',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Cancelled!', 'Your file has been cancelled.', 'success');

        location.href = urld;
      }
    });
  });

  $(document).on('click', '.product_arrange', function () {
    var urld = $(this).data('url');
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, arranged!',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Saved!', 'Product Arranged.', 'success');

        location.href = urld;
      }
    });
  });

  $(document).on('click', '.product_reject', function () {
    var prorqid = $(this).data('prorqid');
    var form_data = new FormData($('#add_reject_reson' + prorqid)[0]);
    var reason = $.trim($('#reason' + prorqid).val());

    if (reason == '') {
      $('#error_mes' + prorqid).html(
        '<p class="text-danger mb-0">Please enter reason</p>'
      );
    } else {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, reject!',
      }).then((result) => {
        if (result.isConfirmed) {
          $('#add_reject_reson' + prorqid).submit();
        }
      });
    }
  });

  $(document).on('input', '.delivery_days_input', function () {
    var location_id = $(this).data('dd');
    var location_val = $.trim($(this).val());

    if (location_val != '' && location_val != 0) {
      var csrfName = $('#csrf_token').attr('name'); // CSRF Token name
      var csrfHash = $('#csrf_token').val(); // CSRF hash

      $.ajax({
        type: 'POST',
        url: base_url() + 'my_online_shop/save_delivery_days',
        data: {
          location_id: location_id,
          location_val: location_val,
          [csrfName]: csrfHash,
        },
        success: function (response) {
          if (response == 1) {
            $('#ale' + location_id).html('Saved');
            setInterval(function () {
              $('#ale' + location_id).html('');
            }, 1500);
          }
        },
        error: function () {
          alert('error');
        },
      });
    }
  });

  $(document).on('click', '.addviewable', function () {
    var favbtn = $(this);
    var pid = $(this).data('pid');
    var csrfName = $('#csrf_token').attr('name'); // CSRF Token name
    var csrfHash = $('#csrf_token').val(); // CSRF hash

    $.ajax({
      type: 'POST',
      url: base_url() + 'my_online_shop/add_to_viewable/' + pid,
      data: {
        [csrfName]: csrfHash,
      },
      beforeSend: function () {},
      success: function (response) {
        if ($.trim(response) == 1) {
          $(favbtn).addClass('removeviewable');
          $(favbtn).removeClass('addviewable');
        }
      },
      error: function () {
        alert('error');
      },
    });
  });

  $(document).on('click', '.removeviewable', function () {
    var favbtn = $(this);
    var pid = $(this).data('pid');

    var csrfName = $('#csrf_token').attr('name'); // CSRF Token name
    var csrfHash = $('#csrf_token').val(); // CSRF hash

    $.ajax({
      type: 'POST',
      url: base_url() + 'my_online_shop/remove_to_viewable/' + pid,
      data: {
        [csrfName]: csrfHash,
      },
      beforeSend: function () {},
      success: function (response) {
        if ($.trim(response) == 1) {
          $(favbtn).addClass('addviewable');
          $(favbtn).removeClass('removeviewable ');
        }
      },
      error: function () {
        alert('error');
      },
    });
  });

  $(document).on('click', '.branch_click', function () {
    var urld = $(this).data('url');
    Swal.fire({
      title: 'Are you sure?',
      text: '',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Activate!',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Activated!', '', 'success');

        location.href = urld;
      }
    });
  });

  $(document).on('click', '.download_complete,.buttons-html5', function () {
    var thisbutton = $(this);
    var thiscontent = $(this).html();

    $.ajax({
      beforeSend: function () {
        $(thisbutton).html('<i class="bx bx-loader-alt bx-spin me-0"></i>');
      },
      success: function () {
        setTimeout(function () {
          $('body').append(
            '<div class="lobibox-notify-wrapper top right" id="dnbox"><div class="lobibox-notify lobibox-notify-success animated-fast fadeInDown notify-mini rounded" style="width: 320px;"><div class="lobibox-notify-icon-wrapper"><div class="lobibox-notify-icon"><div><div class="icon-el"><i class="bx bx-check-circle"></i></div></div></div></div><div class="lobibox-notify-body"><div class="lobibox-notify-msg" style="max-height: 32px;">File downloading!</div></div><span class="lobibox-close" id="dnbox_close">×</span></div></div>'
          );
          setTimeout(function () {
            $('#dnbox').remove();
          }, 3000);
        }, 200);
        $(thisbutton).html(thiscontent);
      },
    });
  });

  $(document).on('click', '#dnbox_close', function () {
    $('.lobibox-notify-wrapper').remove();
  });

  ///////////////////// SHWETHA ////////////////////////////
  // display_users();
  // display_ctechoman_users();
  // display_asms();

  function display_users() {
    $.ajax({
      url: 'https://SpriteGenix.in/users/display_users',
      crossDomain: true,
      headers: { 'Access-Control-Allow-Origin': 'https://SpriteGenix.in/' },
      success: function (data) {
        $('#display_block').html(data);
      },
    });
  }

  function display_ctechoman_users() {
    $.ajax({
      url: 'https://ctechoman.com/users/display_ctechoman_users',
      crossDomain: true,
      headers: { 'Access-Control-Allow-Origin': 'https://ctechoman.com/' },
      success: function (data) {
        $('#display_ctechoman_block').html(data);
      },
    });
  }

  $(document).on('click', '.delete_user', function () {
    var urll = $(this).data('deleteurl');

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        $.ajax({
          url: urll,
          crossDomain: true,
          headers: {
            'Access-Control-Allow-Origin':
              'http://The web site allowed to access',
          },
          success: function (result) {
            if ($.trim(result) == 1) {
              Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
              display_users();
            } else {
              Swal.fire('Failed!', '', 'error');
            }
          },
        });
      }
    });
  });

  $(document).on('click', '.delete_ctech', function () {
    var urll = $(this).data('deleteurl');

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        $.ajax({
          url: urll,
          crossDomain: true,
          headers: {
            'Access-Control-Allow-Origin':
              'http://The web site allowed to access',
          },
          success: function (result) {
            if ($.trim(result) == 1) {
              Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
              display_ctechoman_users();
            } else {
              Swal.fire('Failed!', '', 'error');
            }
          },
        });
      }
    });
  });

  $(document).on('click', '#add_ctechoman', function () {
    var form_data = new FormData($('#add_ctech_form')[0]);
    var fullname = $.trim($('#fullname').val());
    var email = $.trim($('#email').val());
    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    var password = $.trim($('#password').val());

    $('#error_mes').html('');

    if (fullname == '') {
      $('#error_mes').html(
        '<div class="alert alert-danger mb-3 mb-3">Please enter name</div>'
      );
    } else if (fullname.length < 3) {
      $('#error_mes').html(
        '<div class="alert alert-danger mb-3 mb-3">Atleast 3 chars required</div>'
      );
    } else if (email == '') {
      $('#error_mes').html(
        '<div class="alert alert-danger mb-3 mb-3">Please enter your email</div>'
      );
    } else if (!emailReg.test(email)) {
      $('#error_mes').html(
        '<div class="alert alert-danger mb-3 mb-3">Please enter valid email</div>'
      );
    } else if (password == '') {
      $('#error_mes').html(
        '<div class="alert alert-danger mb-3 mb-3">Please enter password</div>'
      );
    } else {
      $.ajax({
        url: 'http://localhost/ctechoman.com/users/save_ctechoman_user',
        type: 'POST',
        crossDomain: true,
        headers: {
          'Access-Control-Allow-Origin':
            'http://The web site allowed to access',
        },
        data: form_data,
        processData: false,
        contentType: false,
        success: function (data) {
          $('#msgg').html(data);
          $('#add_ctech_form')[0].reset();
          $('#error_mes').html('');
          $('#add_ctechoman').submit();

          display_ctechoman_users();
        },
      });
    }
  });

  $(document).on('click', '#add_SpriteGenix_user', function () {
    var form_data = new FormData($('#add_users_form')[0]);
    var fname = $.trim($('#fname').val());
    var usemail = $.trim($('#usemail').val());
    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    var uspassword = $.trim($('#uspassword').val());

    $('#error_mes').html('');

    if (fname == '') {
      $('#error_mes').html(
        '<div class="alert alert-danger mb-3 mb-3">Please enter name</div>'
      );
    } else if (fname.length < 3) {
      $('#error_mes').html(
        '<div class="alert alert-danger mb-3 mb-3">Atleast 3 chars required</div>'
      );
    } else if (usemail == '') {
      $('#error_mes').html(
        '<div class="alert alert-danger mb-3 mb-3">Please enter your email</div>'
      );
    } else if (!emailReg.test(usemail)) {
      $('#error_mes').html(
        '<div class="alert alert-danger mb-3 mb-3">Please enter valid email</div>'
      );
    } else if (uspassword == '') {
      $('#error_mes').html(
        '<div class="alert alert-danger mb-3 mb-3">Please enter password</div>'
      );
    } else {
      $.ajax({
        url: 'http://localhost/SpriteGenix.in/users/save_user',
        type: 'POST',
        crossDomain: true,
        headers: {
          'Access-Control-Allow-Origin':
            'http://The web site allowed to access',
        },
        data: form_data,
        processData: false,
        contentType: false,
        success: function (data) {
          $('#msg').html(data);
          $('#add_users_form')[0].reset();

          $('#error_mes').html('');
          $('#add_SpriteGenix_user').submit();

          setTimeout(function () {
            display_users();
          }, 1000);
        },
      });
    }
  });

  $(document).on('click', '.edit_ctechoman', function () {
    var ctechid = $(this).data('ctechid');
    var form_data = new FormData($('#ctechoman_users_form' + ctechid)[0]);

    var name = $.trim($('#name').val());
    var uemail = $.trim($('#uemail').val());
    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;

    $('#error_mess' + ctechid).html('');

    if (name == '') {
      $('#error_mess' + ctechid).html(
        '<div class="alert alert-danger mb-3 mb-3">Please enter name</div>'
      );
    } else if (name.length < 3) {
      $('#error_mess' + ctechid).html(
        '<div class="alert alert-danger mb-3 mb-3">Atleast 3 chars required</div>'
      );
    } else if (uemail == '') {
      $('#error_mess' + ctechid).html(
        '<div class="alert alert-danger mb-3 mb-3">Please enter your email</div>'
      );
    } else if (!emailReg.test(uemail)) {
      $('#error_mess' + ctechid).html(
        '<div class="alert alert-danger mb-3 mb-3">Please enter valid email</div>'
      );
    } else {
      $.ajax({
        url: $('#ctechoman_users_form' + ctechid).attr('action'),
        type: 'POST',
        crossDomain: true,
        headers: {
          'Access-Control-Allow-Origin':
            'http://The web site allowed to access',
        },
        data: form_data,
        processData: false,
        contentType: false,
        success: function (data) {
          $('#msg1').html(data);
          $('#edit_ctechoman_users' + ctechid).modal('hide');
          $('#error_mess' + ctechid).html('');
          $('#edit_ctechoman_users').submit();
          setTimeout(function () {
            display_ctechoman_users();
          }, 1000);
        },
      });
    }
  });

  $(document).on('click', '.edit_users', function () {
    var userid = $(this).data('userid');
    var form_data = new FormData($('#edit_users_form' + userid)[0]);

    var firstname = $.trim($('#firstname').val());
    var user_email = $.trim($('#user_email').val());
    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;

    $('#error_mes' + userid).html('');

    if (firstname == '') {
      $('#error_mes' + userid).html(
        '<div class="alert alert-danger mb-3 mb-3">Please enter name</div>'
      );
    } else if (firstname.length < 3) {
      $('#error_mes' + userid).html(
        '<div class="alert alert-danger mb-3 mb-3">Atleast 3 chars required</div>'
      );
    } else if (user_email == '') {
      $('#error_mes' + userid).html(
        '<div class="alert alert-danger mb-3 mb-3">Please enter your email</div>'
      );
    } else if (!emailReg.test(user_email)) {
      $('#error_mes' + userid).html(
        '<div class="alert alert-danger mb-3 mb-3">Please enter valid email</div>'
      );
    } else {
      $.ajax({
        url: $('#edit_users_form' + userid).attr('action'),
        type: 'POST',
        crossDomain: true,
        headers: {
          'Access-Control-Allow-Origin':
            'http://The web site allowed to access',
        },
        data: form_data,
        processData: false,
        contentType: false,
        success: function (data) {
          $('#msg1').html(data);
          $('#edit_user' + userid).modal('hide');
          $('#error_mes' + userid).html('');
          $('#edit_user').submit();
          setTimeout(function () {
            display_users();
          }, 1000);
        },
      });
    }
  });

  function display_asms() {
    $.ajax({
      url: 'https://SpriteGenix.net/asms/users/display_users',
      crossDomain: true,
      headers: {
        'Access-Control-Allow-Origin': 'https://SpriteGenix.net/asms/',
      },
      success: function (data) {
        $('#display_asms_block').html(data);
      },
    });
  }

  // asms

  $(document).on('click', '#add_asms_user', function () {
    var form_data = new FormData($('#add_asms_form')[0]);
    var username = $.trim($('#username').val());
    var useremail = $.trim($('#useremail').val());
    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    var userpassword = $.trim($('#userpassword').val());
    var userphone = $.trim($('#userphone').val());
    var max = $.trim($('#max').val());

    $('#error_mes').html('');

    if (username == '') {
      $('#error_mes').html(
        '<div class="alert alert-danger mb-3 mb-3">Please enter name</div>'
      );
    } else if (username.length < 3) {
      $('#error_mes').html(
        '<div class="alert alert-danger mb-3 mb-3">Atleast 3 chars required</div>'
      );
    } else if (useremail == '') {
      $('#error_mes').html(
        '<div class="alert alert-danger mb-3 mb-3">Please enter your email</div>'
      );
    } else if (!emailReg.test(useremail)) {
      $('#error_mes').html(
        '<div class="alert alert-danger mb-3 mb-3">Please enter valid email</div>'
      );
    } else if (userpassword == '') {
      $('#error_mes').html(
        '<div class="alert alert-danger mb-3 mb-3">Please enter password</div>'
      );
    } else if (userphone == '') {
      $('#error_mes').html(
        '<div class="alert alert-danger mb-3 mb-3">Please enter your phone number</div>'
      );
    } else if (max == '') {
      $('#error_mes').html(
        '<div class="alert alert-danger mb-3 mb-3">Please enter your max</div>'
      );
    } else {
      $.ajax({
        url: 'http://localhost/asms/users/save_user',
        crossDomain: true,
        headers: {
          'Access-Control-Allow-Origin':
            'http://The web site allowed to access',
        },
        type: 'POST',
        data: form_data,
        processData: false,
        contentType: false,
        success: function (data) {
          $('#msg').html(data);
          $('#add_asms_form')[0].reset();
          $('#error_mes').html('');
          $('#add_asms_user').submit();
          setTimeout(function () {
            display_asms();
          }, 1000);
        },
      });
    }
  });

  $(document).on('click', '.delete_asms_user', function () {
    var urll = $(this).data('deleteurl');

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        $.ajax({
          url: urll,
          crossDomain: true,
          headers: {
            'Access-Control-Allow-Origin':
              'http://The web site allowed to access',
          },
          success: function (result) {
            if ($.trim(result) == 1) {
              Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
              display_asms();
            } else {
              Swal.fire('Failed!', '', 'error');
            }
          },
        });
      }
    });
  });

  $(document).on('click', '.edit_asms_users', function () {
    var asmsid = $(this).data('asmsid');
    var form_data = new FormData($('#edit_asms_form' + asmsid)[0]);
    var fullname = $.trim($('#fullname').val());
    var asms_email = $.trim($('#asms_email').val());
    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    var asms_phone = $.trim($('#asms_phone').val());
    var asms_max = $.trim($('#asms_max').val());

    $('#error_mes' + asmsid).html('');

    if (fullname == '') {
      $('#error_mes' + asmsid).html(
        '<div class="alert alert-danger mb-3 mb-3">Please enter name</div>'
      );
    } else if (fullname.length < 3) {
      $('#error_mes' + asmsid).html(
        '<div class="alert alert-danger mb-3 mb-3">Atleast 3 chars required</div>'
      );
    } else if (asms_email == '') {
      $('#error_mes' + asmsid).html(
        '<div class="alert alert-danger mb-3 mb-3">Please enter your email</div>'
      );
    } else if (!emailReg.test(asms_email)) {
      $('#error_mes' + asmsid).html(
        '<div class="alert alert-danger mb-3 mb-3">Please enter valid email</div>'
      );
    } else if (asms_phone == '') {
      $('#error_mes' + asmsid).html(
        '<div class="alert alert-danger mb-3 mb-3">Please enter your phone number</div>'
      );
    } else if (asms_max == '') {
      $('#error_mes' + asmsid).html(
        '<div class="alert alert-danger mb-3 mb-3">Please enter your max</div>'
      );
    } else {
      $.ajax({
        url: $('#edit_asms_form' + asmsid).attr('action'),
        type: 'POST',
        crossDomain: true,
        headers: {
          'Access-Control-Allow-Origin':
            'http://The web site allowed to access',
        },
        data: form_data,
        processData: false,
        contentType: false,
        success: function (data) {
          $('#msg2').html(data);
          $('#edit_asms' + asmsid).modal('hide');
          $('#error_mes' + asmsid).html('');
          $('#edit_asms').submit();
          setTimeout(function () {
            display_asms();
          }, 1000);
        },
      });
    }
  });

  $(document).on('input', '#wholesearch', function (e) {
    $('.search_result').addClass('d-none');
    var search_text = $.trim($(this).val());
    if (search_text.length > 0) {
      $.ajax({
        url: base_url() + '/home/search/' + search_text,
        success: function (response) {
          if ($.trim(response) != '') {
            $('#suggest').html(response);
            $('.search_result').removeClass('d-none');
            $('.searchbox_close_layer').css('display', 'block');
          }
        },
        error: function () {
          alert('error');
        },
      });
    }
  });

  $(document).on('click', '.searchbox_close_layer', function () {
    $('.searchbox_close_layer').css('display', 'none');
    $('.search_result').addClass('d-none');
  });

  $(document).on('click', '#sub_send', function () {
    $('#mail_container').toggle(50);
  });

  //send_bulk_smss
  $(document).on('click', '#send_bulk', function () {
    var form_data = new FormData($('#bulkform')[0]);

    var message = $('#message_area').val();

    var checkedNum = $('.bulkselector:checked').length;
    if (checkedNum < 1) {
      $('#er_msg').html(
        '<div class="alert alert-danger p-2 ">Please Select atleast 1 student</div>'
      );
      setTimeout(function () {
        $('#eccr').fadeOut();
      }, 1000);
    } else {
      if (message == '') {
        $('#er_msg').html(
          '<div class="alert alert-danger p-2">Please Enter message!</div>'
        );
      } else {
        var cb = [];
        var stuid = [];
        $.each($('.bulkselector:checked'), function () {
          cb.push($(this).val());
          stuid.push($(this).data('stuid'));
        });

        $('#send_bulk').prop('disabled', true);

        $.ajax({
          url: $('#bulkform').prop('action'),
          type: 'GET',
          data: {
            smessages: message,
            studentid: stuid,
            cb: cb,
          },
          cache: false,
          beforeSend: function () {
            $('#send_bulk').html(
              'Sending p-2 <i class="anticon anticon-loading d-inline-block"></i> '
            );
            $('#er_msg').html(
              '<div class="alert alert-secondary p-2">Please wait & dont reload, it will takes few seconds</div>'
            );
          },
          success: function (response) {
            $('#send_bulk').html(
              '<i class="anticon anticon-message mr-1"></i>Send SMS'
            );
            $('#bulkform')[0].reset();
            $('#er_msg').html(response);
            $('#send_bulk').prop('disabled', false);
          },
          error: function () {},
        });
      }
    }
  });

  // additional fiels scripts
  $(document).on('click', '.add_fields_input', function () {
    var thisbtn = $(this);
    var blockid = $(this).data('blockid');
    $('.field_select_container' + blockid).append(
      '<input type="text" class="new_field_input" class="" id="field_inp' +
        blockid +
        '" data-blockid="' +
        blockid +
        '">'
    );

    $('#save_add_field' + blockid).removeClass('d-none');
    $(thisbtn).addClass('d-none');
    $('#field_inp' + blockid).focus();
  });

  $(document).on('input', '.new_field_input', function () {
    var thisinput = $(this);
    var blockid = $(this).data('blockid');
    var this_val = $.trim($(this).val());
    if (this_val.length > 0) {
      $('#save_add_field' + blockid).html('<i class="bx bx-check"></i>');
    } else {
      $('#save_add_field' + blockid).html('<i class="bx bx-x"></i>');
    }
  });

  $(document).on('change', '.field_select', function () {
    var thisinput = $(this);
    var blockid = $(this).data('blockid');
    var this_val = $.trim($(this).val());
    if (this_val != '') {
      $('.efb' + blockid).remove();
      $('.field_select_container' + blockid).append(
        '<a class="ml-2 my-auto btn btn-sm btn-codeview edit_fields_btn efb' +
          blockid +
          '" id="edit_fields_btn' +
          blockid +
          '" data-blockid="' +
          blockid +
          '"><i class="bx bx-edit m-auto"></i></a>'
      );
    } else {
      $('.efb' + blockid).remove();
    }
  });

  $(document).on('click', '.edit_fields_btn', function () {
    var thisbtn = $(this);
    var blockid = $(this).data('blockid');
    var select_val = $.trim($('#field_select' + blockid).val());
    $('.field_select_container' + blockid).append(
      '<input type="text" class="edit_field_input efi' +
        blockid +
        '" class="" id="edit_field_inp' +
        blockid +
        '" data-blockid="' +
        blockid +
        '"><a class="ml-2 my-auto btn btn-sm update_fields_input" id="update_add_field' +
        blockid +
        '" data-blockid="' +
        blockid +
        '"><i class="bx bx-check m-auto"></i></a>'
    );
    $('#edit_field_inp' + blockid)
      .focus()
      .val('')
      .val(select_val);
  });

  $(document).on('click', '.save_fields_input', function () {
    var thisinput = $(this);
    var blockid = $(this).data('blockid');
    var this_val = $.trim($('#field_inp' + blockid).val());
    var csrfName = $('#csrf_token').attr('name'); // CSRF Token name
    var csrfHash = $('#csrf_token').val(); // CSRF hash
    if (this_val.length > 0) {
      $.ajax({
        url: base_url() + '/products/add_new_field',
        type: 'POST',
        data: {
          field_name: this_val,
          [csrfName]: csrfHash,
        },
        success: function (response) {
          if ($.trim(response) != 0) {
            var fid = $.trim(response);

            var exists =
              $('#field_select' + blockid + ' option').filter(function (i, o) {
                return o.value === this_val;
              }).length > 0;

            if (exists) {
              $('#field_select' + blockid).val(this_val);
              $('#field_select' + blockid).trigger('change');
            } else {
              $('#add_field_items').append(
                '<option value="' +
                  this_val +
                  '" data-fid="' +
                  fid +
                  '">' +
                  this_val +
                  '</option>'
              );
              $('#field_select' + blockid).append(
                '<option value="' +
                  this_val +
                  '" data-fid="' +
                  fid +
                  '" selected>' +
                  this_val +
                  '</option>'
              );
              $('#field_select' + blockid).val(this_val);
              $('#field_select' + blockid).trigger('change');
            }

            $('#save_add_field' + blockid).html('<i class="bx bx-x"></i>');
            $('#save_add_field' + blockid).addClass('d-none');
            $('#add_fields_input' + blockid).removeClass('d-none');
            $('#field_inp' + blockid).remove();
          } else {
          }
        },
      });
    } else {
      $('#save_add_field' + blockid).html('<i class="bx bx-x"></i>');
      $('#save_add_field' + blockid).addClass('d-none');
      $('#add_fields_input' + blockid).removeClass('d-none');
      $('#field_inp' + blockid).remove();
    }
  });

  $(document).on('click', '.update_fields_input', function () {
    var thisinput = $(this);
    var blockid = $(this).data('blockid');
    var this_val = $.trim($('#edit_field_inp' + blockid).val());
    var csrfName = $('#csrf_token').attr('name'); // CSRF Token name
    var csrfHash = $('#csrf_token').val(); // CSRF hash

    var selected = $('#field_select' + blockid).find('option:selected');
    var fid = selected.data('fid');

    if (this_val.length > 0) {
      $.ajax({
        url: base_url() + '/products/edit_new_field',
        type: 'POST',
        data: {
          field_name: this_val,
          fid: fid,
          [csrfName]: csrfHash,
        },
        success: function (response) {
          if ($.trim(response) == 1) {
            $('.efb' + blockid).remove();
            $('#edit_field_inp' + blockid).remove();

            var exists =
              $('#field_select' + blockid + ' option').filter(function (i, o) {
                return o.value === this_val;
              }).length > 0;

            if (exists) {
              $('#field_select' + blockid).val(this_val);
              $('#field_select' + blockid).trigger('change');
            } else {
              $('#add_field_items').append(
                '<option value="' +
                  this_val +
                  '" data-fid="' +
                  fid +
                  '">' +
                  this_val +
                  '</option>'
              );
              $('#field_select' + blockid).append(
                '<option value="' +
                  this_val +
                  '" data-fid="' +
                  fid +
                  '" selected>' +
                  this_val +
                  '</option>'
              );
              $('#field_select' + blockid).val(this_val);
              $('#field_select' + blockid).trigger('change');
            }
          } else {
          }
        },
      });
    }
  });

  $(document).on('keypress blur', '.add_barcode', function (e) {
    var thisinput = $(this);
    var product_id = $(this).data('product_id');
    var old_src = $('#bar_img' + product_id).attr('src');
    var barcode_number = $(this).val();
    var csrfName = $('#csrf_token').attr('name'); // CSRF Token name
    var csrfHash = $('#csrf_token').val(); // CSRF hash

    if (e.keyCode == 13) {
      $(thisinput).blur();
    } else {
      if (e.type == 'focusout') {
        var regex = /[^\w\s]/gi;

        if (regex.test(barcode_number) == true || barcode_number.length > 20) {
          $('#bar_inp' + product_id).val(
            $('#bar_inp' + product_id)
              .val()
              .replace(/[^a-z0-9]/gi, '')
          );
        } else {
          $.ajax({
            url: base_url() + '/products/add_barcode',
            type: 'POST',
            data: {
              product_id: product_id,
              barcode: barcode_number,
              [csrfName]: csrfHash,
            },
            beforeSend: function () {},
            success: function (data) {
              if ($.trim(data) == 1) {
                $('#bar_inp' + product_id).addClass('is-valid');

                if (barcode_number != '' && barcode_number != 0) {
                  $('#bar_box' + product_id).removeClass('d-none');
                  var new_src =
                    base_url() +
                    '/generate_barcode?text=' +
                    barcode_number +
                    '&size=80&SizeFactor=4&print=true';
                  $('#bar_img' + product_id).attr('src', new_src);
                } else {
                  $('#bar_box' + product_id).addClass('d-none');
                  var new_src =
                    base_url() +
                    '/generate_barcode?text=' +
                    barcode_number +
                    '&size=80&SizeFactor=4&print=true';
                  $('#bar_img' + product_id).attr('src', new_src);
                }

                setTimeout(function () {
                  $('#bar_inp' + product_id).removeClass('is-valid');
                }, 2000);
              } else if ($.trim(data) == 0) {
              }
            },
          });
        }
      }
    }
  });

  $(document).on('click', '.remove_barcode', function () {
    var thisinput = $(this);
    var product_id = $(this).data('product_id');
    var old_src = $('#bar_img' + product_id).attr('src');
    var csrfName = $('#csrf_token').attr('name'); // CSRF Token name
    var csrfHash = $('#csrf_token').val(); // CSRF hash

    $.ajax({
      url: base_url() + '/products/add_barcode',
      type: 'POST',
      data: {
        product_id: product_id,
        barcode: '',
        [csrfName]: csrfHash,
      },
      beforeSend: function () {},
      success: function (data) {
        if ($.trim(data) == 1) {
          $('#bar_inp' + product_id).val('');
          $('#bar_inp' + product_id).addClass('is-invalid');

          $('#bar_box' + product_id).addClass('d-none');
          var new_src =
            base_url() +
            '/generate_barcode?text=&size=80&SizeFactor=4&print=true';

          $('#bar_img' + product_id).attr('src', new_src);

          setTimeout(function () {
            $('#bar_inp' + product_id).removeClass('is-invalid');
          }, 2000);
        } else if ($.trim(data) == 0) {
        }
      },
    });
  });

  $(document).on('click', '#save_staff_data', function () {
    var staff_name = $('#staff_name').val();
    var staff_email = $('#staff_email').val();
    var phone_number = $('#phone_number').val();
    var designation = $('#designation').val();
    var shifts = $('#shifts').val();
    var staff_code = $('#staff_code').val();
    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;

    if ($.trim(staff_name) == '') {
      $('#er_msg').html(
        '<span class="text-danger">Employee name required!</span>'
      );
    } else if ($.trim(staff_email) == '') {
      $('#er_msg').html('<span class="text-danger">Email required!</span>');
    } else if (!emailReg.test(staff_email)) {
      $('#er_msg').html('<span class="text-danger">Email not valid!</span>');
    } else if ($.trim(phone_number) == '') {
      $('#er_msg').html(
        '<span class="text-danger">Contact number required!</span>'
      );
    } else if ($.trim(designation) == '') {
      $('#er_msg').html(
        '<span class="text-danger">Designation required!</span>'
      );
    } else if ($.trim(shifts) == '') {
      $('#er_msg').html(
        '<span class="text-danger">Work shift required!</span>'
      );
    } else if ($.trim(staff_code) == '') {
      $('#er_msg').html(
        '<span class="text-danger">Employee code required!</span>'
      );
    } else {
      $.ajax({
        url: base_url() + '/hr_manage/save_staff_data',
        type: 'POST',
        data: $('#add_staff_form').serialize(),

        success: function (response) {
          if (response == 1) {
            $('#er_msg').html(
              '<span class="text-success"><i class="bx bxs-check-circle me-1"></i>Saved!</span>'
            );
            $('#add_staff_form')[0].reset();
          } else if (response == 3) {
            $('#er_msg').html(
              '<span class="text-danger"><i class="bx bxs-error me-1"></i>Employee code already exist!</span>'
            );
          } else if (response == 2) {
            $('#er_msg').html(
              '<span class="text-danger"><i class="bx bxs-error me-1"></i>Email already exist!</span>'
            );
          } else {
            $('#er_msg').html(
              '<span class="text-danger"><i class="bx bxs-error me-1"></i>Failed to save!</span>'
            );
          }
        },
      });
    }
  });

  $(document).on('click', '.close_staff_mod', function () {
    location.reload();
  });

  $(document).on('click', '.edit_staff_data', function () {
    var employee_id = $(this).data('emp_id');

    var staff_name = $('#staff_name' + employee_id).val();
    var staff_email = $('#staff_email' + employee_id).val();
    var phone_number = $('#phone_number' + employee_id).val();
    var designation = $('#designation' + employee_id).val();
    var shifts = $('#shifts' + employee_id).val();
    var staff_code = $('#staff_code' + employee_id).val();
    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;

    if ($.trim(staff_name) == '') {
      $('#er_msg' + employee_id).html(
        '<span class="text-danger">Employee name required!</span>'
      );
    } else if ($.trim(staff_email) == '') {
      $('#er_msg' + employee_id).html(
        '<span class="text-danger">Email required!</span>'
      );
    } else if (!emailReg.test(staff_email)) {
      $('#er_msg' + employee_id).html(
        '<span class="text-danger">Email not valid!</span>'
      );
    } else if ($.trim(phone_number) == '') {
      $('#er_msg' + employee_id).html(
        '<span class="text-danger">Contact number required!</span>'
      );
    } else if ($.trim(designation) == '') {
      $('#er_msg' + employee_id).html(
        '<span class="text-danger">Designation required!</span>'
      );
    } else if ($.trim(staff_code) == '') {
      $('#er_msg' + employee_id).html(
        '<span class="text-danger">Employee code required!</span>'
      );
    } else {
      $.ajax({
        url: base_url() + '/hr_manage/edit_staff_data/' + employee_id,
        type: 'POST',
        data: $('#edit_staff_form' + employee_id).serialize(),

        success: function (response) {
          if (response == 1) {
            show_success_msg('success', 'Saved!');
          } else if (response == 'code_exist') {
            show_success_msg('error', 'Employee code already exist!');
          } else if (response == 'email_exist') {
            show_success_msg('error', 'Email already exist!');
          } else {
            show_success_msg('error', 'Failed to save!');
          }
        },
      });
    }
  });

  $(document).on('click', '.add_attend_status', function () {
    var status_list = 0;
    var employee_id = $(this).attr('data-id');

    if ($(this).is(':checked')) {
      status_list = 1;
    }

    var csrfName = $('#csrf_token').attr('name'); // CSRF Token name
    var csrfHash = $('#csrf_token').val(); // CSRF hash

    $.ajax({
      type: 'POST',
      url: base_url() + 'hr_manage/allow_emp_attendance/' + employee_id,
      data: {
        attendance_allowed: status_list,
        [csrfName]: csrfHash,
      },
      success: function (response) {
        if (response == '1') {
          show_success_msg('success', '', 'Changes saved!');
        } else {
          show_success_msg('error', '', 'Failed!');
        }
      },
    });
  });

  $(document).on('click', '.add_attend_status_error', function () {
    show_failed_msg('error', '', 'Employee category/Staff code is empty!');
  });

  $(document).on('click', '.generate_barcode', function () {
    var product_id = $(this).data('product_id');

    var csrfName = $('#csrf_token').attr('name'); // CSRF Token name
    var csrfHash = $('#csrf_token').val(); // CSRF hash

    Swal.fire({
      title: 'Are you sure?',
      text: 'You will generate barcode number!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Generate!',
      cancelButtonText: 'No, Cancel !',
      closeOnConfirm: false,
      closeOnCancel: false,
    }).then((result) => {
      if (result.isConfirmed) {
        // $('.generate_barcode').prop('disabled', true);

        var lol = 0;
        if ($('#loc').val() < 1) {
          lol = 13;
        } else {
          lol = $('#loc').val();
        }

        var barcode_number = getRandom(lol);

        $.ajax({
          url: base_url() + '/products/add_barcode',
          type: 'POST',
          data: {
            product_id: product_id,
            barcode: barcode_number,
            [csrfName]: csrfHash,
          },
          beforeSend: function () {},
          success: function (data) {
            if ($.trim(data) == 1) {
              $('#bar_inp' + product_id).addClass('is-valid');
              $('#bar_inp' + product_id).val(barcode_number);
              if (barcode_number != '' && barcode_number != 0) {
                $('#bar_box' + product_id).removeClass('d-none');
                var new_src =
                  base_url() +
                  '/generate_barcode?text=' +
                  barcode_number +
                  '&size=80&SizeFactor=4&print=true';
                $('#bar_img' + product_id).attr('src', new_src);
              } else {
                $('#bar_box' + product_id).addClass('d-none');
                var new_src =
                  base_url() +
                  '/generate_barcode?text=' +
                  barcode_number +
                  '&size=80&SizeFactor=4&print=true';
                $('#bar_img' + product_id).attr('src', new_src);
              }

              setTimeout(function () {
                $('#bar_inp' + product_id).removeClass('is-valid');
              }, 2000);
            } else if ($.trim(data) == 0) {
            }
          },
        });
      } else {
        Swal.fire('Cancelled', '', 'error');
      }
    });
  });

  function getRandom(length) {
    return Math.floor(
      Math.pow(10, length - 1) + Math.random() * 9 * Math.pow(10, length - 1)
    );
  }

  $(document).on('click', '.save_notes', function () {
    var getid = $(this).data('invid');
    var lead_id = $(this).data('lead_id');
    var stage = $(this).data('stage');
    var time = $(this).data('time');

    var text_note = $.trim($('#text_note' + getid).val());
    if (text_note != '') {
      var csrfName = $('#csrf_token').attr('name'); // CSRF Token name
      var csrfHash = $('#csrf_token').val(); // CSRF hash
      $.ajax({
        url: base_url() + 'payments_followup/create_invoicenotes',
        type: 'POST',
        data: {
          getid: getid,
          text_note: text_note,
          lead_id: lead_id,
          stage: stage,
          [csrfName]: csrfHash,
        },
        beforeSend: function () {},
        success: function (response) {
          if ($.trim(response) == 1) {
            $('#appendable_section' + getid).append(
              '<div class="position-relative"><div class="note_arrow" ></div><span class="ms-3 notes_text">' +
                text_note +
                '</span><span style="font-size: 11px;color: #a7a2a2;">' +
                time +
                '</span></div>'
            );
            $('#text_note' + getid).val('');
          }
        },
        error: function () {
          alert('error');
        },
      });
    }
  });

  $(document).on('change', '.save_reponsible_person', function () {
    var getid = $(this).data('cid');
    var responsible_person = $(this).val();

    var csrfName = $('#csrf_token').attr('name'); // CSRF Token name
    var csrfHash = $('#csrf_token').val(); // CSRF hash

    $.ajax({
      url: base_url() + '/invoices/reposnible_person/' + getid,
      type: 'POST',
      data: {
        responsible_person: responsible_person,
        [csrfName]: csrfHash,
      },
      success: function (result) {},
    });
  });

  $(document).on('change', '.save_due_date', function () {
    var getid = $(this).data('inid');
    var due_date = $(this).val();

    var csrfName = $('#csrf_token').attr('name'); // CSRF Token name
    var csrfHash = $('#csrf_token').val(); // CSRF hash

    $.ajax({
      url: base_url() + '/invoices/due_date/' + getid,
      type: 'POST',
      data: {
        due_date: due_date,

        [csrfName]: csrfHash,
      },
      success: function (result) {},
    });
  });

  $(document).on('click', '.date_edit_button', function () {
    var getid = $(this).data('inid');
    if ($('#date_read' + getid).is('[readonly]')) {
      $(this).html('<i class="bx bxs-check-circle"></i>');
      $('#date_read' + getid).attr('readonly', false);
    } else {
      $(this).html('<i class="bx bxs-pencil"></i>');
      $('#date_read' + getid).attr('readonly', true);
    }
  });

  $(document).on('click', '.select_edit_button', function () {
    var getid = $(this).data('cid');
    if ($('#save_respo' + getid).is('[disabled]')) {
      $(this).html('<i class="bx bxs-check-circle"></i>');
      $('#save_respo' + getid).attr('disabled', false);
    } else {
      $(this).html('<i class="bx bxs-pencil"></i>');
      $('#save_respo' + getid).attr('disabled', true);
    }
  });

  $(document).on('click', '.inventory_email', function () {
    var thisbutton = $(this);
    var thisbuttoncontent = $(this).html();
    var thisid = $(this).data('id');

    var to = $.trim($('#emailto' + thisid).val());
    var subject = $('#subject' + thisid).val();
    var message = $('#message' + thisid).val();

    message = message.replace(/\n/g, '%0D%0A');

    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;

    var csrfName = $('#csrf_token').attr('name'); // CSRF Token name
    var csrfHash = $('#csrf_token').val(); // CSRF hash

    var link =
      'https://mail.google.com/mail/?view=cm&fs=1&to=' +
      to +
      '&su=' +
      subject +
      '&body=' +
      message;
    var a = document.createElement('a');
    a.target = '_blank';
    a.href = link;

    $('#ermsg').html('');
    if (to != '') {
      if (!emailReg.test(to)) {
        $('#ermsg').html(
          '<div class="alert alert-danger mb-3 mb-3">Please enter valid email</div>'
        );
      } else {
        a.click();
        $(thisbutton).html(
          '<i class="bx bx-check-double me-0" style="font-size: 20px;"></i> Sent'
        );
      }
    } else {
      $('#ermsg').html('Please write email address');
    }
  });

  $(document).on('click', '.add_parties_cat', function () {
    $('#cat_container_parties').toggle();
  });

  $(document).on('click', '.addd_parti_cate', function () {
    var parties_cat_name = $.trim($('#parties_cat_name').val());
    if (parties_cat_name != '') {
      var csrfName = $('#csrf_token').attr('name'); // CSRF Token name
      var csrfHash = $('#csrf_token').val(); // CSRF hash

      $.ajax({
        url: base_url() + 'customers/add_part_cate_from_ajax',
        type: 'POST',
        data: {
          parties_cat_name: parties_cat_name,
          [csrfName]: csrfHash,
        },
        success: function (response) {
          if ($.trim(response) != 0) {
            $('#parties_cat_name').val('');
            $('#cat_container_parties').toggle();
            $('#part_category').append(
              '<option value="' +
                response +
                '" selected>' +
                parties_cat_name +
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

  function base_url() {
    var baseurl = $('#base_url').val();
    return baseurl;
  }

  function show_success_msg(type, message, title) {
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
      msg: message,
    });
  }

  function show_failed_msg(type, message, title) {
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
      msg: message,
    });
  }
});
