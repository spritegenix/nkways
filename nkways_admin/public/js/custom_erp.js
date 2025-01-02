$(document).ready(function () {
  var current_url = location.href;

  $(document).on('click', '#generate_ap_code', function () {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will Generate code!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonClass: 'btn-danger',
      confirmButtonText: 'Yes, Generate!',
      cancelButtonText: 'No, Cancel !',
      closeOnConfirm: false,
      closeOnCancel: false,
    }).then((result) => {
      if (result.isConfirmed) {
        $('#generate_ap_code').prop('disabled', true);

        $.ajax({
          url: base_url() + 'easy_edit/generate_ap_code',

          success: function () {
            Swal.fire({
              title: 'Generated successfully!',
              text: '',
              icon: 'success',
              showCancelButton: false,
              allowOutsideClick: false,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Okay',
            }).then((result) => {
              if (result.isConfirmed) {
                location.reload();
              }
            });

            $('#generate_ap_code').prop('disabled', false);
          },
        });
      } else {
        Swal.fire('Cancelled', '', 'error');
      }
    });
  });

  $(document).on('click', '.submit_invoice_form', function () {
    var vehicleid = $(this).data('id');

    var st = $('#price' + vehicleid).val();
    var pt = $('#payment_type' + vehicleid).val();
    var exp = $('#exp' + vehicleid).val();

    if (exp != '') {
      if (st > 0) {
        if (pt != '') {
          $('.submit_invoice_form').prop('disabled', true);

          $.ajax({
            type: 'POST',
            url: $('#expense_invoice_form' + vehicleid).attr('action'),
            data: $('#expense_invoice_form' + vehicleid).serialize(),
            beforeSend: function () {
              // $('#expense_invoice_form'+vehicleid).html('<span class="spinner-grow spinner-grow-sm mr-1" role="status" aria-hidden="true"></span> Loading...');
            },
            success: function (response) {
              // $('#expense_invoice_form'+vehicleid).prop('disabled', false);
              // $('#expense_invoice_form'+vehicleid).html('<i class="mdi mdi-plus mr-1"></i> Complete');
              show_success_msg('success', 'Vehicle expense added!', 'Saved!');
              // $('#mess'+vehicleid).html('saved');
              $('#expense_invoice_form' + vehicleid)[0].reset();
              $('.submit_invoice_form').prop('disabled', false);
            },
            error: function (response) {
              alert(JSON.stringify(response));
            },
          });
        } else {
          $('#mess' + vehicleid).html(
            '<span class="my-2">Select payment type!</div>'
          );
        }
      } else {
        $('#mess' + vehicleid).html(
          '<span class="my-2">Enter amount greater than 1!</div>'
        );
      }
    } else {
      $('#mess' + vehicleid).html(
        '<span class="my-2">Please select expense</div>'
      );
    }
  });
  $(document).on('click', '.transfer_student', function () {
    var deleteurl = $(this).data('deleteurl');
    var student_id = $(this).data('student_id');
    var csrfName = $('#csrf_token').attr('name'); // CSRF Token name
    var csrfHash = $('#csrf_token').val(); // CSRF hash
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      allowOutsideClick: false,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, transfer it!',
    }).then((result) => {
      if (result.isConfirmed) {
        $.ajax({
          type: 'POST',
          url: deleteurl,
          data: {
            [csrfName]: csrfHash,
          },
          beforeSend: function () {
            // setting a timeout
            // $(techerbt).html('Saving  <i class="bx bx-loader spin_me d-inline-block"></i> ');
          },
          success: function () {
            Swal.fire('Done!', 'Student has been transferred', 'success').then(
              function () {
                window.location.href = base_url() + 'student-master?page=1';
              }
            );
          },
        });
      }
    });
  });

  $(document).on('input', '.fees_item_price', function () {
    var total_fees = 0;
    var discount = $('#discount').val();
    $($('.fees_item_price')).each(function (i) {
      if ($.trim($(this).val()) != '') {
        if ($.trim($(this).val()) > 0) {
          total_fees += parseFloat($.trim($(this).val()));
        }
      }
    });

    $('#main_total_html').html(total_fees - discount);
    $('#main_total_val').val(total_fees);
  });

  $(document).on('click', '#submit_challan', function (e) {
    var grand_total = $('#main_total_val').val();
    var discount = $('#discount').val();
    var grand_total_after_discount = grand_total - discount;

    var inid = $('#invoice_id').val();
    var total_cash = $('#paid_amt').val();

    var due_amount = $('#due_amount').val();

    // var inid=$(this).data('inid');
    if (grand_total != 0) {
      if (parseFloat(total_cash) > parseFloat(grand_total_after_discount)) {
        $('#mess').html(
          '<span class="my-2 font-14">Cannot updated the challan with lower amount than current payment made. <a href="' +
            base_url() +
            'fees_and_payments/payments/' +
            inid +
            '">Delete vouchers</a></span>'
        );
      } else {
        $('#submit_challan').prop('disabled', true);
        var status = navigator.onLine;
        if (status) {
          cinv(inid);
        } else {
          $('#submit_challan').prop('disabled', false);
          $('#mess').html('<span class="my-2 font-14">No internet</div>');
        }
      }
    } else {
      $('#mess').html('<span class="my-2 font-14">Item is empty!</div>');
    }
  });

  function cinv(inid) {
    $.ajax({
      type: 'POST',
      url: $('#challan_edit_form').attr('action'),
      data: $('#challan_edit_form').serialize(),
      beforeSend: function () {
        $('#submit_challan').html(
          '<span class="spinner-grow spinner-grow-sm mr-1" role="status" aria-hidden="true"></span> Loading...'
        );
      },
      success: function (response) {
        // alert(response);
        $('#submit_challan').prop('disabled', false);
        location.reload();
      },
      error: function (response) {
        alert(JSON.stringify(response));
      },
    });
  }

  $(document).on('click', '.fee_row_remove', function () {
    var button_id = $(this).attr('id');
    $('#fee_row' + button_id + '').remove();

    var total_fees = 0;
    var discount = $('#discount').val();
    $($('.fees_item_price')).each(function (i) {
      if ($.trim($(this).val()) != '') {
        if ($.trim($(this).val()) > 0) {
          total_fees += parseFloat($.trim($(this).val()));
        }
      }
    });

    $('#main_total_html').html(total_fees - discount);
    $('#main_total_val').val(total_fees);
  });

  $(document).on('click', '#generate_dpc_code', function () {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will Generate code!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonClass: 'btn-danger',
      confirmButtonText: 'Yes, Generate!',
      cancelButtonText: 'No, Cancel !',
      closeOnConfirm: false,
      closeOnCancel: false,
    }).then((result) => {
      if (result.isConfirmed) {
        $('#generate_dpc_code').prop('disabled', true);

        $.ajax({
          url: base_url() + 'easy_edit/generate_dpc_code',

          success: function () {
            Swal.fire({
              title: 'Generated successfully!',
              text: '',
              icon: 'success',
              showCancelButton: false,
              allowOutsideClick: false,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Okay',
            }).then((result) => {
              if (result.isConfirmed) {
                location.reload();
              }
            });

            $('#generate_dpc_code').prop('disabled', false);
          },
        });
      } else {
        Swal.fire('Cancelled', '', 'error');
      }
    });
  });

  $(document).on('click', '.student_other_data', function () {
    var student_id = $(this).data('student_id');

    $.ajax({
      url: base_url() + 'student-master/get_student_other_data/' + student_id,
      beforeSend: function () {
        $('#hide_student_data' + student_id).html(
          '<div class="text-center p-4"><span>Please wait....</span><i class="bx bx-loader bx-spin"></i></div>'
        );
      },
      success: function (response) {
        $('#hide_student_data' + student_id).html(response);
      },
    });
  });

  $(document).on('click', '.promote_stu_data', function () {
    var student_id = $(this).data('student_id');

    $.ajax({
      url: base_url() + 'student-master/get_promote_student_data/' + student_id,
      beforeSend: function () {
        $('#promote_student_data' + student_id).html(
          '<div class="text-center p-4"><span>Please wait....</span><i class="bx bx-loader bx-spin"></i></div>'
        );
      },
      success: function (response) {
        $('#promote_student_data' + student_id).html(response);
      },
    });
  });

  $(document).on('click', '.edit_stu_data', function () {
    var student_id = $(this).data('student_id');

    $.ajax({
      url: base_url() + 'student-master/get_edit_student_data/' + student_id,
      beforeSend: function () {
        $('#edit_student_data' + student_id).html(
          '<div class="text-center p-4"><span>Please wait....</span><i class="bx bx-loader bx-spin"></i></div>'
        );
      },
      success: function (response) {
        $('#edit_student_data' + student_id).html(response);
      },
    });
  });

  $(document).on('click', '.add_driver', function () {
    $('#brand_container_product').removeClass('d-none');
    $('#brand_container_product').toggle();
  });

  $(document).on('click', '.addd_driver', function () {
    var display_name = $.trim($('#display_name').val());
    var contact_number = $.trim($('#contact_number').val());

    if (display_name != '') {
      var csrfName = $('#csrf_token').attr('name'); // CSRF Token name
      var csrfHash = $('#csrf_token').val(); // CSRF hash
      $('.addd_driver').prop('disabled', true);
      $.ajax({
        url: base_url() + 'school_transport/add_driver_from_ajax',
        type: 'POST',
        data: {
          display_name: display_name,
          contact_number: contact_number,
          [csrfName]: csrfHash,
        },
        success: function (response) {
          if ($.trim(response) != 0) {
            $('#display_name').val('');
            $('#brand_container_product').toggle();
            $('#driver').append(
              '<option value="' +
                response +
                '" selected>' +
                display_name +
                '</option>'
            );
          }

          $('.addd_driver').prop('disabled', false);
        },
        error: function () {
          alert('error');
        },
      });
    }
  });

  $(document).on('click', '.print_barcode', function () {
    var thisbt = $(this);
    var thisid = $(thisbt).data('thisid');

    $('body').append(
      '<div id="print_loader" class="d-flex"><div class="print_box m-auto d-flex justify-content-center"><div class="d-flex my-auto"><i class="bx bx-loader bx-spin me-1"></i> Readying to print</div></div></div>'
    );

    var frame1 = $('<iframe id="iframeprint" style="opacity:0;"/>');
    frame1[0].name = 'frame1';
    frame1.css({ position: 'fixed', top: '-1000000', left: '-1000000' });
    $('body').append(frame1);
    var frameDoc = frame1[0].contentWindow
      ? frame1[0].contentWindow
      : frame1[0].contentDocument.document
      ? frame1[0].contentDocument.document
      : frame1[0].contentDocument;
    frameDoc.document.open();

    $.ajax({
      type: 'GET',
      url: base_url() + 'products/barcode_preview/' + thisid,

      beforeSend: function () {},
      success: function (data) {
        frameDoc.document.write(data);
        frameDoc.document.close();
        $('#iframeprint').on('load', function () {
          setTimeout(function () {
            $('#print_loader').remove();
            window.frames['frame1'].focus();
            window.frames['frame1'].print();
            frame1.remove();
          }, 1000);
        });
      },
    });
  });

  $(document).on('click', '.save_side_bar_click', function () {
    save_barcode();
  });

  $(document).on('input', '.save_side_bar_input', function () {
    save_barcode();
  });

  function save_barcode() {
    var form_data = new FormData($('#side_bar_form')[0]);
    // $('#error_display').html('');
    var csrfName = $('#csrf_token').attr('name'); // CSRF Token name
    var csrfHash = $('#csrf_token').val(); // CSRF hash

    $.ajax({
      type: 'POST',
      url: $('#side_bar_form').prop('action'),
      data: form_data,
      processData: false,
      contentType: false,

      success: function (response) {
        if (response == 1) {
          show_success_msg('success', 'saved!');
          $('#bar_body_widthss').text(htmlEntities($('#bar_body_width').val()));
        } else {
          show_success_msg('error', 'failed');
        }
      },
    });
  }

  $(document).on('click', '.pro_stock_data', function () {
    var product_id = $(this).data('product_id');

    $.ajax({
      url: base_url() + 'products/get_adjust_stock/' + product_id,
      beforeSend: function () {
        $('#show_adjust_stock' + product_id).html(
          '<div class="text-center"><span>Please wait....</span><i class="bx bx-loader bx-spin"></i></div>'
        );
      },
      success: function (response) {
        $('#show_adjust_stock' + product_id).html(response);
      },
    });
  });

  $(document).on('click', '.delete_adjust_stock', function () {
    var urll = $(this).data('url');
    var product_id = $(this).data('product_id');

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
          type: 'GET',
          success: function (result) {
            // display_documentrenew();

            if ($.trim(result) == 1) {
              Swal.fire('Deleted!', 'Your file has been deleted.', 'success');

              $.ajax({
                url: base_url() + 'products/get_adjust_stock/' + product_id,
                beforeSend: function () {
                  $('#show_adjust_stock' + product_id).html(
                    '<div class="text-center"><span>Please wait....</span><i class="bx bx-loader bx-spin"></i></div>'
                  );
                },
                success: function (response) {
                  $('#show_adjust_stock' + product_id).html(response);
                },
              });
            } else {
              Swal.fire('Failed!', '', 'error');
            }
          },
        });
      }
    });
  });

  $(document).on('click', '.update_bar_type', function () {
    var this_ele = $(this);
    var proid = $(this_ele).data('product_id');
    var bar_type = $(this_ele).data('bar_type');

    var csrfName = $('#csrf_token').attr('name'); // CSRF Token name
    var csrfHash = $('#csrf_token').val(); // CSRF hash

    $.ajax({
      type: 'POST',
      url: base_url() + '/easy_edit/generate_pro_barcode/' + proid,
      data: {
        barcode_type: bar_type,
        from: 'single',
        [csrfName]: csrfHash,
      },
      beforeSend: function () {},
      success: function (data) {
        if ($.trim(data) == 1) {
          show_success_msg('success', 'saved!');
        } else {
          show_success_msg('error', 'failed');
        }
      },
    });
  });

  $(document).on('click', '.update_all_bar_type', function () {
    var this_ele = $(this);

    // var proid=$(this_ele).data('product_id');

    var val = [];
    $('.bar_pros').each(function (i) {
      val[i] = $(this).data('proid');
    });

    var bar_type = $(this_ele).data('bar_type');

    var csrfName = $('#csrf_token').attr('name'); // CSRF Token name
    var csrfHash = $('#csrf_token').val(); // CSRF hash

    $.ajax({
      type: 'POST',
      url: base_url() + '/easy_edit/generate_pro_barcode/' + val,
      data: {
        barcode_type: bar_type,
        from: 'all',
        [csrfName]: csrfHash,
      },
      beforeSend: function () {
        $('body').append(
          '<div id="print_loader" class="d-flex"><div class="print_box m-auto d-flex justify-content-center"><div class="d-flex my-auto"><i class="bx bx-loader bx-spin me-1"></i> Generating barcode...</div></div></div>'
        );
      },
      success: function (data) {
        $('#print_loader').remove();
        show_success_msg('success', 'Barcode generated!');
      },
    });
  });

  $(document).on('change', '.week_selector', function () {
    var this_selector = $(this);
    var this_sel_val = $(this_selector).val();

    if (this_sel_val == 'custom') {
      var thispar = $(this_selector).parents('.week_parent');
      $(thispar)
        .find('.custom_week_input')
        .removeClass('d-none')
        .addClass('d-block');
    } else {
      var thispar = $(this_selector).parents('.week_parent');
      $(thispar)
        .find('.custom_week_input')
        .removeClass('d-block')
        .addClass('d-none');
    }
  });

  ///////////////// COMPRESSSOR ////////////////////

  const compressImage = async (file, { quality = 1, type = file.type }) => {
    // Get as image data
    const imageBitmap = await createImageBitmap(file);

    // Draw to canvas
    const canvas = document.createElement('canvas');
    canvas.width = imageBitmap.width;
    canvas.height = imageBitmap.height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(imageBitmap, 0, 0);

    // Turn into Blob
    const blob = await new Promise((resolve) =>
      canvas.toBlob(resolve, type, quality)
    );

    // Turn Blob into File
    return new File([blob], file.name, {
      type: blob.type,
    });
  };

  $('.image_preview').change(async function (e) {
    // Get the files
    const { files } = e.target;

    // No files selected
    if (!files.length) return;

    // We'll store the files in this data transfer object
    const dataTransfer = new DataTransfer();

    // For every file in the files list
    for (const file of files) {
      // We don't have to compress files that aren't images
      if (!file.type.startsWith('image')) {
        // Ignore this file, but do add it to our result
        dataTransfer.items.add(file);
        continue;
      }

      // We compress the file by 50%
      const compressedFile = await compressImage(file, {
        quality: 0.5,
        type: 'image/webp',
      });

      // Save back the compressed file instead of the original file
      dataTransfer.items.add(compressedFile);
    }

    // Set value of the file input to our new files list
    e.target.files = dataTransfer.files;

    // add your logic to decide which image control you'll use
    // var imcontrol=$(this).data('elem_no');
    // var imgControlName = ".imag"+imcontrol;
    // readURL(this, imgControlName);
    //  $('#removeImage'+imcontrol).removeClass('d-none');
    // $('.btn-rmv1').addClass('rmv');
  });

  ///////////////// COMPRESSSOR ////////////////////

  ///////////////////////////////// Manufacture scripts start ///////////////////////////////////////////

  $(document).on('input', '.product_selector_search', function () {
    var searchvalue = $.trim($(this).val());
    if (searchvalue.length > 2) {
      $.ajax({
        url: base_url() + 'products/get_product_for_item_kit/' + searchvalue,
        beforeSend: function () {
          $('#show_pro').html(
            '<div class="w-100 text-center"><div class="spinner-grow text-danger" style="width: 3rem; height: 3rem;" role="status"> <span class="visually-hidden">Loading...</span></div></div>'
          );
        },
        success: function (response) {
          $('#show_pro').html(response);
        },
        error: function () {
          alert('error');
        },
      });
    }
  });

  $(document).on('click', '.add_to_item_kit', function () {
    var product_id = $(this).data('product_id');
    var product_name = $(this).data('product_name');
    var price = $(this).data('purchased_price');
    var purchased_price = $(this).data('purchased_price');
    var description = $(this).data('description');
    var proconversion_unit_rate = $(this).data('proconversion_unit_rate');
    var in_unit_options = $(this).data('in_unit_options');
    var tax = $(this).data('tax');
    var unit = $(this).data('unit');
    var sub_unit = $(this).data('sub_unit');

    if ($('#proo' + product_id).length) {
      // use this if you are using id to check
      var qttt = $.trim($('#qtyite' + product_id).val());

      if (qttt == '') {
        qttt = 0;
      }
      var toot = parseFloat(qttt) + 1;
      $('#qtyite' + product_id).val(toot);

      var finqty = toot;

      var finprice = $('#main_price' + product_id).val();

      if (proconversion_unit_rate > 0) {
        if (
          $('#in_unit' + product_id)
            .children('option:first-child')
            .is(':selected')
        ) {
        } else {
          finprice = finprice / proconversion_unit_rate;
        }

        $('#amtite' + product_id).val(finprice * finqty);
      }
    } else {
      var response =
        ' <li class="list-group-item mb-2 d-flex justify-content-between align-items-center cursor-pointer itemparent" id="proo' +
        product_id +
        '"><input type="hidden" name="main_price[]" id="main_price' +
        product_id +
        '" value="' +
        purchased_price +
        '"> <input type="hidden" name="conversion_unit_rate[]" value="' +
        proconversion_unit_rate +
        '"><input type="hidden" name="unit[]" value="' +
        unit +
        '"><input type="hidden" name="sub_unit[]" value="' +
        sub_unit +
        '"><input type="text" name="item_product_name[]" class="form-empty bg-0" value="' +
        product_name +
        '" style="margin-right: 15px;" readonly><input type="number" name="item_quantity[]" id="qtyite' +
        product_id +
        '" data-proid="' +
        product_id +
        '" data-price="' +
        price +
        '" class="form-light itemkit_qty_input SpriteGenix-simple-input form-light" data-row="' +
        product_id +
        '" data-proconversion_unit_rate="' +
        proconversion_unit_rate +
        '" value="1" step="any" style="margin-right: 15px; width:100px;"><select class="in_unit_material form-light SpriteGenix-simple-input" name="in_unit[]" data-row="' +
        product_id +
        '" data-proconversion_unit_rate="' +
        proconversion_unit_rate +
        '" id="in_unit' +
        product_id +
        '" style="margin-right: 15px;">' +
        in_unit_options +
        '</select><input type="text" name="item_amount[]" class="form-light no-btn  SpriteGenix-simple-input form-light totalamot" value="' +
        price +
        '" id="amtite' +
        product_id +
        '" style="margin-right: 15px; width:150px;" readonly><input type="hidden" name="item_product_id[]" value="' +
        product_id +
        '"><input type="hidden" name="item_price[]" value="' +
        price +
        '"><input type="hidden" name="purchased_price[]"  value="' +
        purchased_price +
        '"><input type="hidden" name="item_selling_price[]"  value="' +
        price +
        '"><input type="hidden" name="item_product_desc[]"  value="' +
        description +
        '"><input type="hidden" name="item_tax[]"  value="' +
        tax +
        '"><button type="button" class="btn-dark btn btn-sm removeitemkit rounded-pill"><span class="rotate-45 d-block">+</span></button></li>';
      $('#product_list').append(response);
    }

    var no_of_pros = $('.itemparent').length;

    if (no_of_pros != 0) {
      $('#plus_icon').html('');
    } else {
      $('#product_container').html('');
      $('#plus_icon').html('+');
    }
  });

  $(document).on('click', '.removeitemkit', function () {
    $(this).parents('.itemparent').remove();
    var no_of_pros = $('.itemparent').length;

    if (no_of_pros != 0) {
      $('#plus_icon').html('');
    } else {
      $('#product_container').html('');
      $('#plus_icon').html('+');
    }
  });

  $(document).on('click', '#saveitems', function () {
    var material_count = $('.itemkit_qty_input').length;
    var raw_material_form = $('#raw_material_form');
    $('#show_pro').html('');

    $.ajax({
      type: 'POST',
      url: $('#raw_material_form').prop('action'),
      data: $('#raw_material_form').serialize(),
      beforeSend: function () {},
      success: function (data) {
        if ($.trim(data) == 1) {
          show_success_msg('success', 'saved!');
        } else {
          show_success_msg('error', 'failed');
        }
      },
    });
  });

  $(document).on('change', '.in_unit_material', function () {
    var inu = $(this).val();
    var rowno = $(this).data('row');
    var proconversion_unit_rate = $(this).data('proconversion_unit_rate');
    var finprice = $('#main_price' + rowno).val();
    var finqty = $('#qtyite' + rowno).val();

    if (proconversion_unit_rate > 0) {
      if ($(this).children('option:first-child').is(':selected')) {
      } else {
        finprice = finprice / proconversion_unit_rate;
      }

      $('#amtite' + rowno).val(finprice * finqty);
    }
  });

  $(document).on('input', '.itemkit_qty_input', function () {
    var finqty = $(this).val();
    var rowno = $(this).data('row');

    var proconversion_unit_rate = $(this).data('proconversion_unit_rate');
    var finprice = $('#main_price' + rowno).val();

    if (proconversion_unit_rate > 0) {
      if (
        $('#in_unit' + rowno)
          .children('option:first-child')
          .is(':selected')
      ) {
      } else {
        finprice = finprice / proconversion_unit_rate;
      }
    }

    $('#amtite' + rowno).val(finprice * finqty);
  });

  $(document).on('change', '#adsadsadas', function () {
    var ubit_rrrate = $(this).data('conversion_unit_rate');

    $('.itemkit_qty_input').each(function () {
      var tval = $(this).data('still_qty');
      if (manufactured_unit == selected_unit) {
        $(this).val(tval * man_quantity_input);
      } else {
        $(this).val((tval / ubit_rrrate) * man_quantity_input);
      }
      count_total_cost();
      total_manufacture_cost();
    });
  });

  $(document).on(
    'input change',
    '#man_quantity_input,#man_unit_input',
    function () {
      var ubit_rrrate = $(this).data('conversion_unit_rate');

      var manufactured_unit = $('#manufactured_unit').val();
      var man_quantity_input = $('#man_quantity_input').val();
      var selected_unit = $('#man_unit_input').val();

      var man_quantity_input = $('#man_quantity_input').val();
      if (man_quantity_input < 1 || man_quantity_input == '') {
        man_quantity_input = 1;
      }
      var total_cost = 0;

      $('.raw_items').each(function () {
        var this_row = $(this).data('row');
        var base_qty = $('#base_qty' + this_row).val();
        var qtyite = $('#qtyite' + this_row).val();
        var in_unit = $('#in_unit' + this_row).val();
        var priceite = $('#priceite' + this_row).val();
        var amtite = $('#amtite' + this_row).val();
        var conversion_unit_rate = $('#conversion_unit_rate' + this_row).val();
        var unit = $('#conversion_unit_rate' + this_row).val();
        var sub_unit = $('#conversion_unit_rate' + this_row).val();

        var tval = $('#base_qty' + this_row).val();

        if (manufactured_unit == selected_unit) {
          base_qty = tval;
        } else {
          base_qty = tval / ubit_rrrate;
        }

        if (man_quantity_input > 0) {
          if (conversion_unit_rate > 0) {
            if (
              $('#in_unit' + this_row)
                .children('option:first-child')
                .is(':selected')
            ) {
              finprice = priceite;
            } else {
              finprice = priceite / conversion_unit_rate;
            }
          } else {
            finprice = priceite;
          }

          $('#qtyite' + this_row).val(man_quantity_input * base_qty);
          $('#amtite' + this_row).val(man_quantity_input * base_qty * finprice);
          total_cost = total_cost + man_quantity_input * base_qty * finprice;
        }
      });

      // alert(total_cost)
      $('#total_cost_text').html(total_cost);
      $('#total_cost').val(total_cost);

      total_manufacture_cost();
    }
  );

  $(document).on('input', '.cost_input', function () {
    count_total_cost();
    total_manufacture_cost();
  });

  $(document).on('click', '.add-more', function () {
    var html =
      '<tr class="after-add-more-tr"><td class="w-25"><input type="hidden" name="co_i_id[]" value="0"><input type="hidden" name="old_additional_cost[]"  value="0"><select name="additional_charges[]" class="SpriteGenix-simple-input"><option value="Labour cost">Labour cost</option><option value="Electricity cost">Electricity cost</option><option value="Packaging charge">Packaging charge</option><option value="Logistic cost">Logistic cost</option><option value="Other charges">Other charges</option></select></td><td class="w-75"><input type="text" name="additional_details[]" class="SpriteGenix-simple-input"></td><td><input type="number" name="additional_cost[]" style="width: 300px;" class="SpriteGenix-simple-input cost_input text-end"></td><td class="change"><a class=" no_load btn btn-danger btn-sm remove text-white"><b>-</b></a></td></tr>';
    $('.after-add-more').append(html);

    if ($('.after-add-more-tr').length > 0) {
      $('#payment_mode_tr').removeClass('d-none');
    } else {
      $('#payment_mode_tr').addClass('d-none');
    }
  });

  $(document).on('click', '.remove', function () {
    $(this).parents('.after-add-more-tr').remove();
    count_total_cost();
    total_manufacture_cost();
    if ($('.after-add-more-tr').length > 0) {
      $('#payment_mode_tr').removeClass('d-none');
    } else {
      $('#payment_mode_tr').addClass('d-none');
    }
  });

  function count_total_cost() {
    var total_additional_cost = 0;

    $('.cost_input').each(function () {
      var cost_val = $(this).val();
      if (cost_val != '') {
        total_additional_cost =
          parseFloat(total_additional_cost) + parseFloat(cost_val);
      }
    });

    $('#total_additional_cost_text').html(total_additional_cost);
    $('#total_additional_cost').val(total_additional_cost);
  }

  function total_manufacture_cost() {
    var total_manufacture_cost = 0;

    $('.man_cost_input').each(function () {
      var man_cost_val = $(this).val();
      if (man_cost_val != '') {
        total_manufacture_cost =
          parseFloat(total_manufacture_cost) + parseFloat(man_cost_val);
      }
      // alert(man_cost_val)
    });

    $('#total_manufacture_cost_text').html(total_manufacture_cost);
    $('#total_manufacture_cost').val(total_manufacture_cost);
  }

  $(document).on('click', '#manufacture_this', function () {
    Swal.fire({
      title: 'Are you sure?',
      text: '',
      type: 'warning',
      showCancelButton: true,
      confirmButtonClass: 'btn-danger',
      confirmButtonText: 'Yes, Proceed!',
      closeOnConfirm: true,
    }).then((result) => {
      if (result.isConfirmed) {
        $.ajax({
          type: 'POST',
          url: $('#manufacture_form').prop('action'),
          data: $('#manufacture_form').serialize(),
          beforeSend: function () {
            // setting a timeout
            $('#manufacture_this').html(
              'Manufacturing...<i class="bx bx-loader bx-spin"></i> '
            );
          },
          success: function (result) {
            if (result == 1) {
              Swal.fire({
                title: 'Saved successfully!',
                text: '',
                icon: 'success',
                showCancelButton: false,
                allowOutsideClick: false,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Okay',
              }).then((result) => {
                if (result.isConfirmed) {
                  location.reload();
                }
              });
            } else {
              show_success_msg('error', 'Try again!');
            }
            $('#manufacture_this').html('Manufacture');
          },
        });
      }
    });
  });

  ///////////////////////////////// Manufacture scripts end ///////////////////////////////////////////

  //add_time_table
  $(document).on('click', '#add_time_table', function () {
    var form_data = new FormData($('#add_time_table_form')[0]);

    $('#add_time_table_form').validate({
      // Specify validation rules
      rules: {
        week: 'required',
        subject: 'required',
        classes: 'required',
        start_time: 'required',
        end_time: 'required',
      },
      // Specify validation error messages
      messages: {},
    });

    var valid = $('#add_time_table_form').valid();

    if (valid == true) {
      $('#add_time_table').prop('disabled', true);
      $.ajax({
        type: 'POST',
        url: $('#add_time_table_form').prop('action'),
        data: form_data,
        processData: false,
        contentType: false,
        beforeSend: function () {
          // setting a timeout
          $('#add_time_table').html(
            'Saving...<i class="bx bx-loader bx-spin"></i> '
          );
        },
        success: function () {
          $('#add_time_table').html('Save');
          show_success_msg('success', 'Time Table Added successfully!');

          $('#add_time_table').prop('disabled', false);
        },
      });
    }
  });

  //edit notice
  $(document).on('click', '.edit_time_table', function () {
    var timetbdid = $(this).data('id');
    var techerbt = $(this);
    var form_data = new FormData($('#edit_time_table_form' + timetbdid)[0]);
    $('#edit_time_table_form' + timetbdid).validate({
      // Specify validation rules
      rules: {
        week: 'required',
        subject: 'required',
        classes: 'required',
        start_time: 'required',
        end_time: 'required',
      },
      // Specify validation error messages
      messages: {},
    });

    var valid = $('#edit_time_table_form' + timetbdid).valid();

    if (valid == true) {
      $.ajax({
        type: 'POST',
        url: $('#edit_time_table_form' + timetbdid).prop('action'),
        data: form_data,
        processData: false,
        contentType: false,
        beforeSend: function () {
          // setting a timeout
          $(techerbt).html('Saving...<i class="bx bx-loader bx-spin"></i>');
        },
        success: function () {
          $(techerbt).html('Save');
          show_success_msg('success', 'Time Table updated!');
        },
      });
    }
  });

  $(document).on('click', '#notify_time_table', function () {
    var csrfName = $('#csrf_token').attr('name'); // CSRF Token name
    var csrfHash = $('#csrf_token').val(); // CSRF hash
    $.ajax({
      type: 'POST',
      url: base_url() + 'time_table/notify_time_table/',
      data: {
        [csrfName]: csrfHash,
      },
      beforeSend: function () {},
      success: function (data) {
        if ($.trim(data) == 1) {
          show_success_msg('success', 'Notification Sent!');
        } else {
          show_failed_msg('Failed', 'failed');
        }
      },
    });
  });

  $(document).on('click', '.SpriteGenix-print', function () {
    var purl = $(this).data('url');
    var iframe = document.createElement('iframe');
    // iframe.id = 'pdfIframe'
    iframe.className = 'pdfIframe';
    document.body.appendChild(iframe);
    iframe.style.display = 'none';
    iframe.onload = function () {
      setTimeout(function () {
        iframe.focus();
        iframe.contentWindow.print();
        URL.revokeObjectURL(purl);
        // document.body.removeChild(iframe)
      }, 1);
    };
    iframe.src = purl;
  });

  display_all_fees_data();

  function display_all_fees_data() {
    var invoice_id = $('#invoice_id').val();

    $.ajax({
      url:
        base_url() + '/fees_and_payments/get_all_fees_list/all/8/' + invoice_id,
      success: function (data) {
        $('#search_feestable_data').html(data);
      },
    });
  }

  $(document).on('click', '.click_to_add_fees', function () {
    var productid = $(this).data('product_id');
    var product_name = $(this).data('product_name');
    var product_price = $(this).data('product_price');

    if ($('.itemforcheck' + productid).length < 1) {
      $('.search_fee_select').append(
        '<div class="card_fees rounded-3 border mb-2 itemforcheck' +
          productid +
          '" id="fee_row' +
          productid +
          '">' +
          '<div class="d-flex justify-content-between ">' +
          '<div class="d-flex justify-content-between w-100 p-2">' +
          '<h6 class="my-auto font-14">' +
          product_name +
          '</h6>' +
          '<input type="hidden" name="product_name[]" value="' +
          product_name +
          '">' +
          '<input type="hidden" name="product_id[]" value="' +
          productid +
          '">' +
          '<input type="hidden" name="initem_id[]" value="0">' +
          '<input type="number" step="any" name="fee_item_price[]" class="form-control form-control-sm w-25 fees_item_price" value="' +
          product_price +
          '"></div>' +
          '<a class="btn btn-danger d-flex align-items-center fee_row_remove" id="' +
          productid +
          '"><span>X</span></a></div></div>'
      );

      var total_fees = 0;
      var discount = $('#discount').val();
      $($('.fees_item_price')).each(function (i) {
        if ($.trim($(this).val()) != '') {
          if ($.trim($(this).val()) > 0) {
            total_fees += parseFloat($.trim($(this).val()));
          }
        }
      });

      $('#main_total_html').html(total_fees - discount);
      $('#main_total_val').val(total_fees);
    }
  });

  $(document).on('keypress', '#searchfeesInput', function (e) {
    if (e.keyCode == 13) {
      var this_elem = $(this);
      var fees_limit = 3;
      var search_text = $.trim($(this).val());
      var select_url = $.trim($(this).data('select_url'));
      var invoice_id = $.trim($(this).data('invoice_id'));
      if (search_text.length > 0) {
        if (search_text.length > 2) {
          fees_limit = 0;
          $.ajax({
            type: 'GET',
            url:
              select_url +
              '/' +
              search_text +
              '/' +
              fees_limit +
              '/' +
              invoice_id,
            beforeSend: function () {},
            success: function (response) {
              $('#search_feestable_data').html(response);
            },
          });
        }
      } else {
        fees_limit = 0;
        $.ajax({
          type: 'GET',
          url: select_url + '/all/8/' + invoice_id,
          beforeSend: function () {},
          success: function (response) {
            $('#search_feestable_data').html(response);
          },
        });
      }
    }
  });

  $(document).on('keyup', '#search_addtional_fee', function () {
    var value = this.value.toLowerCase().trim();

    $('#feetable tr').each(function (index) {
      if (!index) return;
      $(this)
        .find('td')
        .each(function () {
          var id = $(this).text().toLowerCase().trim();
          var not_found = id.indexOf(value) == -1;
          $(this).closest('tr').toggle(!not_found);
          return not_found;
        });
    });
  });

  $(document).on('click', '#deleteinvoiceCheckAll', function () {
    var thisbox = $(this);
    if ($(thisbox).hasClass('select')) {
      $('.checkBoxinvoiceAll').prop('checked', true);
      $(thisbox).removeClass('select');
    } else {
      $('.checkBoxinvoiceAll').prop('checked', false);
      $(thisbox).addClass('select');
    }

    var checkedNum = $('input[name="delete_all_invoice[]"]:checked').length;
    if (checkedNum > 1) {
      $('#deleteallbtn').removeClass('d-none');
    } else {
      $('#deleteallbtn').addClass('d-none');
    }
  });

  $(document).on('click', '.checkBoxinvoiceAll', function (e) {
    var checkedNum = $('input[name="delete_all_invoice[]"]:checked').length;
    if (checkedNum > 1) {
      $('#deleteallbtn').removeClass('d-none');
    } else {
      $('#deleteallbtn').addClass('d-none');
    }
  });

  $(document).on('click', '#deleteallbtn', function () {
    var ffedid = $(this).data('feeid');
    var val = [];
    $('input[name="delete_all_invoice[]"]:checked').each(function (i) {
      val[i] = $(this).val();
    });

    Swal.fire({
      title: 'Are you sure?',
      text: 'You cant retrive this after delete',
      type: 'warning',
      showCancelButton: true,
      confirmButtonClass: 'btn-danger',
      confirmButtonText: 'Yes, Delete!',
      closeOnConfirm: true,
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href =
          base_url() +
          '/fees_and_payments/delete_invoice/' +
          ffedid +
          '/' +
          val;
      }
    });
  });

  $(document).on('click', '#notify_student_fees', function () {
    var thiss = $(this);
    var phone = $(this).data('phone');
    var due_amount = $(this).data('due_amount');
    var invoice_id = $(this).data('invoice_id');
    var fees_id = $(this).data('fees_id');

    $.ajax({
      type: 'GET',
      url: $(thiss).data('action'),
      data: {
        phone: phone,
        due_amount: due_amount,
        invoice_id: invoice_id,
        fees_id: fees_id,
      },
      beforeSend: function () {
        // setting a timeout
        $(thiss).html(
          'Notifying <i class="bx bx-loader spin_me d-inline-block"></i> '
        );
      },
      success: function (data) {
        if ($.trim(data) == 1) {
          show_success_msg('success', 'Notification sent!');
        } else {
          show_success_msg('error', 'Failed!, Please try again.');
        }
        $(thiss).html('Notify');
      },
    });
  });

  $(document).on('click', '#sms_notify_student_fees', function () {
    var thiss = $(this);
    var form_data = new FormData($('#sms_form_my')[0]);

    $.ajax({
      type: 'POST',
      url: $(thiss).data('action'),
      data: form_data,
      processData: false,
      contentType: false,
      beforeSend: function () {
        // setting a timeout
        $(thiss).html(
          'Sending <i class="bx bx-loader spin_me d-inline-block"></i> '
        );
      },
      success: function (data) {
        if ($.trim(data) == 1) {
          show_success_msg('success', 'SMS sent!');
        } else {
          show_success_msg('error', 'Failed!, Please try again.');
        }
        $(thiss).html('Send SMS');
      },
    });
  });

  $(document).on('change', '#no_of_installments', function () {
    var no_of_installments = $(this).val();
    var payable = $('#due_amount').val();
    var cursymb = $('#cursymb').val();

    var calculated_details = '';
    var emi_amount = 0;
    emi_amount = (parseFloat(payable) / no_of_installments).toFixed(
      round_of_value()
    );

    for (var i = 0; i < no_of_installments; i++) {
      var counts = parseInt(i) + 1;
      calculated_details +=
        '<tr><td>Installment ' +
        counts +
        '</td><td>-</td><td>' +
        cursymb +
        ' ' +
        parseFloat(emi_amount).toFixed(round_of_value()) +
        ' <input type="hidden" value="' +
        parseFloat(emi_amount).toFixed(round_of_value()) +
        '" name="installments[]"></td></tr>';
    }

    $('#emi_calcultor').html(calculated_details);
  });

  $(document).on('click', '.incheck', function (e) {
    var amttt = $('#temp_amount').val();
    if ($(this).data('pstat') == 'disable') {
      e.preventDefault();
    } else {
      $('.incheckcount:checked').each(function (cb) {
        amttt = parseFloat(amttt) + parseFloat($(this).data('amt'));
      });
      $('#payment_amount').val(amttt.toFixed(round_of_value()));
    }
  });

  $(document).on('click', '#save_payment', function () {
    var payment_type = $('#payment_type').val();
    var total_pay_amount = $('#temp_amount').val();
    var payment_amount = $('#payment_amount').val();
    var payment_date = $('#payment_date').val();

    if (payment_date == '') {
      show_success_msg('error', 'Please enter date');
      $('#save_payment').html('Save');
    } else if (payment_type == '') {
      show_success_msg('error', 'Please select payment type');
      $('#save_payment').html('Save');
    } else if (payment_amount <= 0) {
      show_success_msg('error', 'Minimun amount value is 1');
      $('#save_payment').html('Save');
    } else if (parseFloat(payment_amount) > parseFloat(total_pay_amount)) {
      show_success_msg(
        'error',
        'Please enter an amount less than or equal to the total amount!'
      );
      $('#save_payment').html('Save');
    } else {
      $('#save_payment').prop('disabled', true);

      $.ajax({
        url: $('#save_payment').data('inserturl'),
        method: 'POST',
        data: $('#policy_form').serialize(),
        beforeSend: function () {
          $('#save_payment').html(
            '<i class="bx bx-loader-alt bx-spin"></i> Saving..'
          );
        },
        success: function (data) {
          if ($.trim(data) == 'morethandue') {
            show_success_msg(
              'error',
              'Enter amount less than or equal to due amount'
            );
          } else {
            $('#pdfthis').fadeIn().html(data);

            // $.ajax({
            //      url: $('#save_payment').data('url'),
            //      success:function(response) {
            //          $('#pdfthis').html(response);
            //       },
            //      error:function(){
            //          alert("error");
            //      }
            //  });

            $('#receipt_show_modal').modal('show');

            $('#save_payment').html('Save');

            const iframe = document.getElementById('SpriteGenix-embed');
            iframe.srcdoc =
              '<!DOCTYPE html><div style="color: green; background:white; width: 100%;height: 96vh;display: flex;"><div style="margin:auto; font-family: system-ui;">Rendering Content...</div></div>';

            iframe.addEventListener('load', () =>
              setTimeout(function () {
                iframe.removeAttribute('srcdoc');
              }, 2500)
            );

            show_success_msg('success', 'Payment saved!');

            $('.printbtn').removeClass('d-none');

            var paidaaa = $('#paidcalc').html();
            var dueaaa = $('#duecalc').html();

            if (payment_type == 'cash') {
              $('#paidcalc').html(
                parseFloat($('.cash_amount').val()) + parseFloat(paidaaa)
              );
              $('#duecalc').html(
                parseFloat(dueaaa) - parseFloat($('.cash_amount').val())
              );
            } else if (payment_type == 'bank_transfer') {
              $('#paidcalc').html(
                parseFloat($('.bt_amount').val()) + parseFloat(paidaaa)
              );
              $('#duecalc').html(
                parseFloat(dueaaa) - parseFloat($('.bt_amount').val())
              );
            } else if (payment_type == 'cheque') {
              location.href = current_url;
            } else {
            }
            $('#policy_form')[0].reset();
          }
          $('#save_payment').prop('disabled', false);
        },
      });
    }
  });

  $(document).on('click', '.location_reload', function () {
    location.reload();
  });

  $(document).on('click', '#create_installment', function () {
    var form_data = new FormData($('#create_installment_form')[0]);

    var no_of_installments = $('#no_of_installments').val();
    var inid = $('#inidddd').val();

    $('#errrr').html('');

    if (no_of_installments != '') {
      $.ajax({
        type: 'POST',
        url: $('#create_installment_form').prop('action'),
        data: form_data,
        processData: false,
        contentType: false,
        beforeSend: function () {},
        success: function (result) {
          $('#closeeee').click();
          $('.modal-backdrop').remove();

          $.ajax({
            type: 'GET',
            url: base_url() + '/fees_and_payments/get_payment_form/' + inid,
            success: function (feeform) {
              $('#form_of_pay').html(feeform);
              $('#fee_show').html(feeform);
            },
          });
        },
      });
    } else {
      $('#errrr').html('<span class="text-danger">This field required</span>');
    }
  });

  $(document).on('click', '.delete_installments', function () {
    var urld = $(this).data('url');
    var inid = $(this).data('inid');

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
          url: urld,
          success: function (result) {
            if ($.trim(result) == 1) {
              Swal.fire('Deleted!', 'Your file has been deleted.', 'success');

              $.ajax({
                type: 'GET',
                url: urld,
                success: function (feeform) {
                  $.ajax({
                    type: 'GET',
                    url:
                      base_url() +
                      '/fees_and_payments/get_payment_form/' +
                      inid,
                    success: function (feeform) {
                      $('#form_of_pay').html(feeform);
                      $('#fee_show').html(feeform);
                    },
                  });
                },
              });
            } else {
              Swal.fire(
                'Failed!',
                'Sorry, you cant delete installments because some installments have been paid. If you need to delete them, please first remove the payment entries for those installments',
                'error'
              );
            }
          },
        });
      }
    });
  });

  $(document).on('click', '.delete_challan_link', function () {
    var deleteurl = $(this).data('url');
    var challan_id = $(this).data('challan_id');

    var csrfName = $('#csrf_token').attr('name'); // CSRF Token name
    var csrfHash = $('#csrf_token').val(); // CSRF hash

    Swal.fire({
      title: 'Are you sure?',
      text: 'You cant retrive this after delete',
      type: 'warning',
      showCancelButton: true,
      confirmButtonClass: 'btn-danger',
      confirmButtonText: 'Yes, Delete!',
      closeOnConfirm: true,
    }).then((result) => {
      if (result.isConfirmed) {
        $.ajax({
          type: 'GET',
          url:
            base_url() + '/users/check_challan_transaction_exist/' + challan_id,
          data: {
            [csrfName]: csrfHash,
          },
          success: function (res_data) {
            if ($.trim(res_data) == 'exist') {
              show_success_msg(
                'error',
                'Please delete all transactions before delete',
                'error'
              );
            } else {
              $.ajax({
                type: 'GET',
                url: deleteurl,
                data: {
                  [csrfName]: csrfHash,
                },
                beforeSend: function () {
                  // setting a timeout
                  // $(techerbt).html('Saving  <i class="anticon anticon-loading d-inline-block"></i> ');
                },
                success: function () {
                  location.href = current_url;
                },
              });
            }
          },
        });
      }
    });
  });

  $(document).on('click', '.generate_invoices', function () {
    var fees_id = $(this).data('fees_id');
    var class_id_select = $('#class_id_select').val();
    var this_btn = $(this);
    var csrfName = $('#csrf_token').attr('name'); // CSRF Token name
    var csrfHash = $('#csrf_token').val(); // CSRF hash
    if (class_id_select != '') {
      Swal.fire({
        title: 'Are you sure?',
        text: 'Please check price table before generate challan',
        type: 'warning',
        showCancelButton: true,
        confirmButtonClass: 'btn-danger',
        confirmButtonText: 'Yes, Generate!',
        closeOnConfirm: true,
      }).then((result) => {
        if (result.isConfirmed) {
          $.ajax({
            type: 'POST',
            url:
              base_url() +
              'fees_and_payments/generate_invoices_for_class/' +
              fees_id +
              '/' +
              class_id_select,
            data: {
              [csrfName]: csrfHash,
            },
            beforeSend: function () {
              $(this_btn).html(
                'Please wait until complete  <i class="ml-2 bx bx-loader spin_me d-inline-block"></i> '
              );
            },
            success: function (response) {
              if ($.trim(response) == 1) {
                $(this_btn).html('Generate invoice/Challan');
                $('#invoice_output').html(response);
                show_success_msg('success', 'Generated successfully!');

                setTimeout(function () {
                  location.href = current_url;
                }, 1000);
              } else {
                $('#generate_invoices').html('Generate invoice/Challan');
                show_success_msg('error', 'Failed!');
              }
            },
          });
        }
      });
    }
  });

  $(document).on('click', '.generate_challan_for_all', function () {
    var fees_id = $(this).data('fees_id');
    var this_btn = $(this);
    var csrfName = $('#csrf_token').attr('name'); // CSRF Token name
    var csrfHash = $('#csrf_token').val(); // CSRF hash
    if (class_id_select != '') {
      Swal.fire({
        title: 'Are you sure?',
        text: 'Please check price table before generate challan',
        type: 'warning',
        showCancelButton: true,
        confirmButtonClass: 'btn-danger',
        confirmButtonText: 'Yes, Generate!',
        closeOnConfirm: true,
      }).then((result) => {
        if (result.isConfirmed) {
          $.ajax({
            type: 'POST',
            url:
              base_url() +
              'fees_and_payments/generate_challan_for_all/' +
              fees_id,
            data: {
              [csrfName]: csrfHash,
            },
            beforeSend: function () {
              $(this_btn).html(
                'Please wait until complete  <i class="ml-2 bx bx-loader spin_me d-inline-block"></i> '
              );
            },
            success: function (response) {
              if ($.trim(response) == 1) {
                $(this_btn).html('Generate invoice/Challan');
                $('#invoice_output').html(response);
                show_success_msg('success', 'Generated successfully!');

                setTimeout(function () {
                  location.href = current_url;
                }, 1000);
              } else {
                $('#generate_invoices').html('Generate invoice/Challan');
                show_success_msg('error', 'Failed!');
              }
            },
          });
        }
      });
    }
  });

  $(document).on('click', '.generate_for_all_transport', function () {
    var fees_id = $(this).data('fees_id');
    var this_btn = $(this);
    var csrfName = $('#csrf_token').attr('name'); // CSRF Token name
    var csrfHash = $('#csrf_token').val(); // CSRF hash
    if (class_id_select != '') {
      Swal.fire({
        title: 'Are you sure?',
        text: 'Please check price table before generate challan',
        type: 'warning',
        showCancelButton: true,
        confirmButtonClass: 'btn-danger',
        confirmButtonText: 'Yes, Generate!',
        closeOnConfirm: true,
      }).then((result) => {
        if (result.isConfirmed) {
          $.ajax({
            type: 'POST',
            url:
              base_url() +
              'fees_and_payments/generate_for_all_transport/' +
              fees_id,
            data: {
              [csrfName]: csrfHash,
            },
            beforeSend: function () {
              $(this_btn).html(
                'Please wait until complete  <i class="ml-2 bx bx-loader spin_me d-inline-block"></i>'
              );
            },
            success: function (response) {
              if ($.trim(response) == 1) {
                $(this_btn).html('Generate for all');
                $('#invoice_output').html(response);
                show_success_msg('success', 'Generated successfully!');

                setTimeout(function () {
                  location.href = current_url;
                }, 1000);
              } else {
                $(this_btn).html('Generate for all');
                show_failed_msg('error', 'Failed!');
              }
            },
          });
        }
      });
    }
  });

  $(document).on('click', '.generate_invoice_for_student', function () {
    var fees_id = $(this).data('fees_id');
    var student_id = $('#student_id_select').val();
    var this_btn = $(this);
    var csrfName = $('#csrf_token').attr('name'); // CSRF Token name
    var csrfHash = $('#csrf_token').val(); // CSRF hash

    if (student_id != '') {
      $.ajax({
        type: 'POST',
        url:
          base_url() +
          'fees_and_payments/generate_invoices/' +
          fees_id +
          '/' +
          student_id,
        data: {
          [csrfName]: csrfHash,
        },
        beforeSend: function () {
          $(this_btn).html(
            'Please wait until complete  <i class="ml-2 bx bx-loader spin_me d-inline-block"></i> '
          );
        },
        success: function (response) {
          $(this_btn).html('Generate');

          show_success_msg('success', 'Generated successfully!');

          setTimeout(function () {
            location.href = current_url;
          }, 1000);
        },
      });
    }
  });

  /////////////////////////////  custom fees

  $('[name=challan_for]').each(function (i, d) {
    var p = $(this).prop('checked');
    //   console.log(p);
    if (p) {
      $('.custom_article article').eq(i).addClass('on');
    }
  });

  $('[name=challan_for]').on('change', function () {
    var p = $(this).prop('checked');

    // $(type).index(this) == nth-of-type
    var i = $('[name=challan_for]').index(this);

    $('.custom_article article').removeClass('on');
    $('.custom_article article').eq(i).addClass('on');
  });

  $(document).on('click', '.add-more-custom', function () {
    var html =
      '<tr class="after-add-more-custom-tr"><td><input type="text" name="custom_fees_name[]" class="form-control "></td><td><input type="number" name="custom_fees_amount[]" class="form-control text-end custom_fees_amount"></td><td class="change"><a class="btn btn-danger btn-sm no_load  remove-custom text-white"><b>-</b></a></td></tr>';
    $('.after-add-more-custom').append(html);

    if ($('.after-add-more-custom-tr').length > 0) {
    }
  });

  $(document).on('click', '.remove-custom', function () {
    $(this).parents('.after-add-more-custom-tr').remove();

    if ($('.after-add-more-custom-tr').length > 0) {
    }
  });

  $(document).on('input', '.custom_fees_amount', function () {
    var total_fees = 0;

    $($('.custom_fees_amount')).each(function (i) {
      if ($.trim($(this).val()) != '') {
        if ($.trim($(this).val()) > 0) {
          total_fees += parseFloat($.trim($(this).val()));
        }
      }
    });

    $('#custom_total').val(total_fees);
  });

  $(document).on('click', '.generate_invoice_for_student_custom', function () {
    var fees_id = $(this).data('fees_id');
    var student_id = $('#student_id_select_custom').val();
    var class_id = $('#class_id_select_custom').val();
    var for_what = $('input[name="challan_for"]:checked').val();
    var this_btn = $(this);
    var csrfName = $('#csrf_token').attr('name'); // CSRF Token name
    var csrfHash = $('#csrf_token').val(); // CSRF hash

    var allow_noo = false;
    var cuer = '';

    if (for_what == 'for_student') {
      if (student_id != '') {
        allow_noo = true;
      } else {
        cuer = 'Please select student!';
      }
    } else if (for_what == 'for_class') {
      if (class_id != '') {
        allow_noo = true;
      } else {
        cuer = 'Please select class!';
      }
    } else {
      allow_noo = true;
    }

    if (allow_noo == true) {
      if ($('.after-add-more-custom-tr').length < 1) {
        show_success_msg('error', 'Please add atleast 1 item to challan!');
      } else {
        var proceed = false;
        $($('.after-add-more-custom-tr')).each(function (i) {
          var this_fees_name = $(this).find('.custom_fees_name').val();
          var this_fees_amount = $(this).find('.custom_fees_amount').val();
          if (this_fees_name != '' && this_fees_amount > 0) {
            proceed = true;
          }
        });

        if (proceed == true) {
          if (student_id == '') {
            student_id = 0;
          }

          $.ajax({
            type: 'POST',
            url:
              base_url() +
              'fees_and_payments/generate_invoices_custom/' +
              fees_id +
              '/' +
              student_id,
            data: $('#_form_custom').serialize(),
            beforeSend: function () {
              $(this_btn).html(
                'Please wait until complete  <i class="ml-2 bx bx-loader spin_me d-inline-block"></i> '
              );
            },
            success: function (response) {
              $(this_btn).html('Generate');

              show_success_msg('success', 'Generated successfully!');

              setTimeout(function () {
                location.href = current_url;
              }, 1000);
            },
          });
        } else {
          show_success_msg(
            'error',
            'Please add atleast 1 valid fees name & amount!'
          );
        }
      }
    } else {
      show_success_msg('error', cuer);
    }
  });

  $(document).on('click', '.generate_invoices_custom', function () {
    var fees_id = $(this).data('fees_id');
    var class_id_select = $('#class_id_select_custom').val();
    var this_btn = $(this);
    var csrfName = $('#csrf_token').attr('name'); // CSRF Token name
    var csrfHash = $('#csrf_token').val(); // CSRF hash
    if (class_id_select != '') {
      Swal.fire({
        title: 'Are you sure?',
        text: 'Please check price table before generate challan',
        type: 'warning',
        showCancelButton: true,
        confirmButtonClass: 'btn-danger',
        confirmButtonText: 'Yes, Generate!',
        closeOnConfirm: true,
      }).then((result) => {
        if (result.isConfirmed) {
          alert('hi custom class');
          // $.ajax({
          //      type: 'POST',
          //     url: base_url()+'fees_and_payments/generate_invoices_for_class/'+fees_id+'/'+class_id_select,
          //     data:{
          //          [csrfName]: csrfHash
          //     },
          //     beforeSend: function() {
          //         $(this_btn).html('Please wait until complete  <i class="ml-2 bx bx-loader spin_me d-inline-block"></i> ');
          //     },
          //     success: function(response) {

          //         if ($.trim(response)==1) {
          //             $(this_btn).html('Generate invoice/Challan');
          //             $('#invoice_output').html(response);
          //             show_success_msg('success','Generated successfully!');

          //             setTimeout(function(){
          //                location.href=current_url;
          //             }, 1000);

          //         }else {
          //             $('#generate_invoices').html('Generate invoice/Challan');
          //             show_success_msg('error','Failed!');
          //         }

          //         }

          // });
        }
      });
    }
  });

  $(document).on('click', '.generate_challan_for_all_custom', function () {
    var fees_id = $(this).data('fees_id');
    var this_btn = $(this);
    var csrfName = $('#csrf_token').attr('name'); // CSRF Token name
    var csrfHash = $('#csrf_token').val(); // CSRF hash
    if (class_id_select != '') {
      Swal.fire({
        title: 'Are you sure?',
        text: 'Please check price table before generate challan',
        type: 'warning',
        showCancelButton: true,
        confirmButtonClass: 'btn-danger',
        confirmButtonText: 'Yes, Generate!',
        closeOnConfirm: true,
      }).then((result) => {
        if (result.isConfirmed) {
          alert('hi custom all');
          // $.ajax({
          //      type: 'POST',
          //     url: base_url()+'fees_and_payments/generate_challan_for_all/'+fees_id,
          //     data:{
          //          [csrfName]: csrfHash
          //     },
          //     beforeSend: function() {
          //         $(this_btn).html('Please wait until complete  <i class="ml-2 bx bx-loader spin_me d-inline-block"></i> ');
          //     },
          //     success: function(response) {

          //         if ($.trim(response)==1) {
          //             $(this_btn).html('Generate invoice/Challan');
          //             $('#invoice_output').html(response);
          //             show_success_msg('success','Generated successfully!');

          //             setTimeout(function(){
          //                location.href=current_url;
          //             }, 1000);

          //         }else {
          //             $('#generate_invoices').html('Generate invoice/Challan');
          //             show_success_msg('error','Failed!');
          //         }

          //     }
          // });
        }
      });
    }
  });

  ///////////////// custom fees

  $(document).on(
    'click',
    '.generate_transport_invoice_for_student',
    function () {
      var fees_id = $(this).data('fees_id');
      var student_id = $('#t_student_id_select').val();
      var location_id = $('#t_location_id_select').val();
      var this_btn = $(this);
      var csrfName = $('#csrf_token').attr('name'); // CSRF Token name
      var csrfHash = $('#csrf_token').val(); // CSRF hash

      if (student_id != '' && location_id != '') {
        $.ajax({
          type: 'POST',
          url:
            base_url() +
            'fees_and_payments/generate_invoices_for_transport/' +
            fees_id +
            '/' +
            student_id +
            '/' +
            location_id,
          data: {
            [csrfName]: csrfHash,
          },
          beforeSend: function () {
            $(this_btn).html(
              'Please wait until complete  <i class="ml-2 bx bx-loader spin_me d-inline-block"></i> '
            );
          },
          success: function (response) {
            $(this_btn).html('Generate');

            show_success_msg('success', 'Generated successfully!');

            setTimeout(function () {
              location.href = current_url;
            }, 1000);
          },
        });
      }
    }
  );

  $(document).on('click', '#save_pro', function () {
    var form_data = new FormData($('#pro_form')[0]);

    $('#pro_form').validate({
      // Specify validation rules
      rules: {
        user_name: 'required',
        user_phone: 'required',
        date_of_birth: 'required',
        address: 'required',

        user_email: {
          required: true,
          email: true,
        },
      },
      // Specify validation error messages
      messages: {
        user_name: 'Please enter your name!',
        user_phone: 'Please enter your mobile number!',
        date_of_birth: 'Please enter your date of birth!',
        address: 'Please enter your address!',
        user_email: {
          required: 'Please enter your email-id!',
          email: 'Please enter a valid email-id!',
        },
      },
    });

    var valid = $('#pro_form').valid();

    if (valid == true) {
      // $('#save_pro').prop('disabled', true);
      $.ajax({
        type: 'POST',
        url: $('#pro_form').prop('action'),
        data: form_data,
        processData: false,
        contentType: false,
        beforeSend: function () {
          // setting a timeout
          $('#save_pro').html('Saving...<i class="bx bx-loader bx-spin"></i>');
        },
        success: function (response) {
          if ($.trim(response) == 1) {
            $('#save_pro').html('Save');
            show_success_msg('success', '', 'Saved!');

            $('#ac_username').text(htmlEntities($('#user_name').val()));

            if ($.trim($('#select_profile_img').val()) != '') {
              var oFReader = new FileReader();
              oFReader.readAsDataURL(
                document.getElementById('select_profile_img').files[0]
              );

              oFReader.onload = function (oFREvent) {
                document.getElementById('ac_profile').src =
                  oFREvent.target.result;
              };
            }
          } else if ($.trim(response) == 0) {
            // show_toast('fail','File must be less than 500kb');
            $('#save_pro').html('Save');
            show_failed_msg('error', '', 'Email already exists!');
          } else if ($.trim(response) == 3) {
            // show_toast('fail','File must be less than 500kb');
            $('#save_pro').html('Save');
            show_failed_msg('error', 'File must be less than 500kb', 'Failed');
          } else {
            // $('#save_pro').prop('disabled', false);
            show_failed_msg('error', '', 'Failed to save!');
          }
        },
      });
    }
  });

  function htmlEntities(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  $(document).on('click', '#change_pass', function () {
    var form_data = new FormData($('#pass_form')[0]);

    $('#pass_form').validate({
      rules: {
        password: {
          required: true,
          minlength: 8,
        },
        newpassword: {
          required: true,
          minlength: 8,
        },
      },
      // Specify validation error messages
      messages: {
        password: {
          required: 'Please enter your old password!',
          minlength: 'Password must contain 8 charecters',
        },
        newpassword: {
          required: 'Please enter your new password!',
          minlength: 'Password must contain 8 charecters',
        },
      },
    });
    var valid = $('#pass_form').valid();

    if (valid == true) {
      $.ajax({
        type: 'POST',
        url: $('#pass_form').prop('action'),
        data: form_data,
        processData: false,
        contentType: false,
        beforeSend: function () {
          // setting a timeout
          $('#change_pass').html(
            'Saving...<i class="bx bx-loader bx-spin"></i>'
          );
        },
        success: function (result) {
          $('#change_pass').html('Save');
          $('#pass_form')[0].reset();
          if ($.trim(result) == 1) {
            $('#pass_form')[0].reset();
            show_success_msg(
              'success',
              'Password changed successfully!',
              'Saved!'
            );
          } else if ($.trim(result) == 0) {
            $('#pass_form')[0].reset();
            show_failed_msg('error', '', 'Failed!');
          } else if ($.trim(result) == 3) {
            $('#pass_form')[0].reset();
            show_failed_msg('error', '', 'Wrong old password!');
          }
        },
      });
    }
  });

  $(document).on('click', '.deletebook', function () {
    var deleteurl = $(this).data('deleteurl');
    var csrfName = $('#csrf_token').attr('name'); // CSRF Token name
    var csrfHash = $('#csrf_token').val(); // CSRF hash

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      allowOutsideClick: false,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        $.ajax({
          type: 'POST',
          url: deleteurl,
          data: {
            [csrfName]: csrfHash,
          },
          beforeSend: function () {
            // setting a timeout
            // $(techerbt).html('Saving  <i class="bx bx-loader spin_me d-inline-block"></i> ');
          },
          success: function () {
            Swal.fire('Deleted!', 'Book has been deleted.', 'success').then(
              function () {
                window.location.href = base_url() + 'library-management?page=1';
              }
            );
          },
        });
      }
    });
  });

  $(document).on('click', '.deleteissuebk', function () {
    var deleteurl = $(this).data('deleteurl');
    var csrfName = $('#csrf_token').attr('name'); // CSRF Token name
    var csrfHash = $('#csrf_token').val(); // CSRF hash

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      allowOutsideClick: false,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        $.ajax({
          type: 'POST',
          url: deleteurl,
          data: {
            [csrfName]: csrfHash,
          },
          beforeSend: function () {
            // setting a timeout
            // $(techerbt).html('Saving  <i class="bx bx-loader spin_me d-inline-block"></i> ');
          },
          success: function () {
            Swal.fire('Deleted!', 'Issued book deleted.', 'success').then(
              function () {
                window.location.href =
                  base_url() + 'library-management/issuedbooks?page=1';
              }
            );
          },
        });
      }
    });
  });

  $(document).on('click', '.send_returnbook_via_sms', function () {
    var uid = $(this).data('uid');
    var phone = $(this).data('phone');
    var bookname = $(this).data('bookname');
    var csrfName = $('#csrf_token').attr('name'); // CSRF Token name
    var csrfHash = $('#csrf_token').val(); // CSRF hash

    Swal.fire({
      title: 'Are you sure?',
      text: '',
      icon: 'warning',
      showCancelButton: true,
      allowOutsideClick: false,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, send!',
    }).then((result) => {
      if (result.isConfirmed) {
        $.ajax({
          type: 'get',
          url: base_url() + 'messaging/send-bookreturn/',
          data: {
            uid: uid,
            phone: phone,
            bookname: bookname,
            [csrfName]: csrfHash,
          },
          beforeSend: function () {},
          success: function (data) {
            data = $.parseJSON(data);
            if (data.status == true) {
              show_success_msg('success', data.message, 'Saved!');
            } else {
              show_failed_msg('error', data.message, 'Failed!');
            }
          },
        });
      }
    });
  });

  $(document).on('click', '.receive_book', function () {
    var deleteurl = $(this).data('deleteurl');
    var csrfName = $('#csrf_token').attr('name'); // CSRF Token name
    var csrfHash = $('#csrf_token').val(); // CSRF hash

    Swal.fire({
      title: 'Are you sure?',
      text: '',
      icon: 'warning',
      showCancelButton: true,
      allowOutsideClick: false,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, received!',
    }).then((result) => {
      if (result.isConfirmed) {
        $.ajax({
          type: 'POST',
          url: deleteurl,
          data: {
            [csrfName]: csrfHash,
          },
          beforeSend: function () {
            // setting a timeout
            // $(techerbt).html('Saving  <i class="bx bx-loader spin_me d-inline-block"></i> ');
          },
          success: function () {
            Swal.fire(
              'Book Received!',
              'You clicked the button!',
              'success'
            ).then(function () {
              window.location.href =
                base_url() + 'library-management/returnedbooks?page=1';
            });
          },
        });
      }
    });
  });

  $(document).on('click', '.deletecategory', function () {
    var deleteurl = $(this).data('deleteurl');
    var csrfName = $('#csrf_token').attr('name'); // CSRF Token name
    var csrfHash = $('#csrf_token').val(); // CSRF hash

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      allowOutsideClick: false,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        $.ajax({
          type: 'POST',
          url: deleteurl,
          data: {
            [csrfName]: csrfHash,
          },
          beforeSend: function () {
            // setting a timeout
            // $(techerbt).html('Saving  <i cla ss="bx bx-loader spin_me d-inline-block"></i> ');
          },
          success: function () {
            Swal.fire(
              'Deleted!',
              'Book Category has been deleted!',
              'success'
            ).then(function () {
              window.location.href =
                base_url() + 'library-management/bookcategory';
            });
          },
        });
      }
    });
  });

  $(document).on('click', '#add_category', function () {
    var form_data = new FormData($('#add_bcate_form')[0]);

    $('#add_bcate_form').validate({
      // Specify validation rules
      rules: {
        book_category: 'required',
      },
      // Specify validation error messages
      messages: {
        book_category: {
          required: 'Please enter book category',
        },
      },
    });
    var valid = $('#add_bcate_form').valid();

    if (valid == true) {
      $('#add_category').prop('disabled', true);
      $.ajax({
        type: 'POST',
        url: $('#add_bcate_form').prop('action'),
        data: form_data,
        processData: false,
        contentType: false,
        beforeSend: function () {
          // setting a timeout
          $('#add_category').html(
            'Saving...<i class="bx bx-loader bx-spin"></i>'
          );
        },
        success: function (response) {
          if ($.trim(response) == 1) {
            $('#add_category').html('Save');
            $('#add_bcate_form')[0].reset();
            show_success_msg(
              'success',
              'Category added successfully!',
              'Saved!'
            );
          } else {
            show_failed_msg('error', '', 'Failed!');
          }
          $('#add_category').prop('disabled', false);
        },
      });
    }
  });

  $(document).on('click', '.edit_category', function () {
    var cateid = $(this).data('id');
    var techerbt = $(this);

    var form_data = new FormData($('#edit_bcate_form' + cateid)[0]);
    $('#edit_bcate_form' + cateid).validate({
      rules: {
        book_category: 'required',
      },
      // Specify validation error messages
      messages: {
        book_category: {
          required: 'Please enter book category',
        },
      },
    });
    var valid = $('#edit_bcate_form' + cateid).valid();

    if (valid == true) {
      $.ajax({
        type: 'POST',
        url: $('#edit_bcate_form' + cateid).prop('action'),
        data: form_data,
        processData: false,
        contentType: false,
        beforeSend: function () {
          // setting a timeout
          $(techerbt).html('Saving...<i class="bx bx-loader bx-spin"></i>');
        },
        success: function (response) {
          if ($.trim(response) == 1) {
            $(techerbt).html('Save');
            show_success_msg(
              'success',
              'Category updated successfully!',
              'Saved!'
            );
          } else {
            show_failed_msg('error', '', 'Failed!');
          }
        },
      });
    }
  });

  $(document).on('click', '.add_issue_book', function () {
    var isbkid = $(this).data('id');
    var issuedbt = $(this);
    var form_data = new FormData($('#add_issue_book_form' + isbkid)[0]);

    $('#add_issue_book_form' + isbkid).validate({
      // Specify validation rules

      rules: {
        student: 'required',
        return_date: 'required',
      },
      // Specify validation error messages
      messages: {
        student: 'Please select student!',
        return_date: 'Please enter book return date!',
      },
    });
    var valid = $('#add_issue_book_form' + isbkid).valid();

    if (valid == true) {
      $.ajax({
        type: 'POST',
        url: $('#add_issue_book_form' + isbkid).prop('action'),
        data: form_data,
        processData: false,
        contentType: false,
        beforeSend: function () {
          // setting a timeout
          $(issuedbt).html('Saving...<i class="bx bx-loader bx-spin"></i>');
        },
        success: function (response) {
          if ($.trim(response) == 1) {
            $(issuedbt).html('Save');
            $('#add_issue_book_form' + isbkid)[0].reset();
            show_success_msg('success', 'Book issued!', 'Saved!');
          } else {
            show_failed_msg('error', '', 'Failed!');
          }
        },
      });
    }
  });

  $(document).on('click', '.edit_issue_book', function () {
    var issuebkid = $(this).data('id');
    var techerbt = $(this);
    var form_data = new FormData($('#edit_issue_book_form' + issuebkid)[0]);
    $('#edit_issue_book_form' + issuebkid).validate({
      // Specify validation rules
      rules: {
        student: 'required',
        book: 'required',
        return_date: 'required',
      },
      // Specify validation error messages
      messages: {
        book: 'Please select book',
        student: 'Please select student',
        return_date: 'Please enter return date',
      },
    });
    var valid = $('#edit_issue_book_form' + issuebkid).valid();

    if (valid == true) {
      $.ajax({
        type: 'POST',
        url: $('#edit_issue_book_form' + issuebkid).prop('action'),
        data: form_data,
        processData: false,
        contentType: false,
        beforeSend: function () {
          // setting a timeout

          $(techerbt).html('Saving...<i class="bx bx-loader bx-spin"></i>');
        },
        success: function (response) {
          if ($.trim(response) == 1) {
            $(techerbt).html('Save');
            show_success_msg('success', 'Updated successfully!', 'Saved!');
          } else {
            show_failed_msg('error', '', 'Failed!');
          }
        },
      });
    }
  });

  $(document).on('click', '#add_book', function () {
    var form_data = new FormData($('#add_book_form')[0]);

    $('#add_book_form').validate({
      // Specify validation rules
      rules: {
        book_number: 'required',
        book_title: 'required',
        author_name: 'required',
        category: 'required',
        no_of_books: {
          required: true,
          min: 0,
        },
      },
      // Specify validation error messages
      messages: {
        book_number: 'Please enter book number!',
        book_title: 'Please enter book title!',
        author_name: 'Please enter book author name!',
        category: 'Please select book category!',
        no_of_books: {
          required: 'Please enter number of books!',
          min: 'minimun value is 0',
        },
      },
    });
    var valid = $('#add_book_form').valid();

    if (valid == true) {
      $('#add_book').prop('disabled', true);
      $.ajax({
        type: 'POST',
        url: $('#add_book_form').prop('action'),
        data: form_data,
        processData: false,
        contentType: false,
        beforeSend: function () {
          // setting a timeout
          $('#add_book').html('Saving...<i class="bx bx-loader bx-spin"></i>');
        },
        success: function (response) {
          if ($.trim(response) == 1) {
            $('#add_book_form')[0].reset();
            $('#add_book').html('Save');
            show_success_msg('success', 'Book added successfully!', 'Saved!');
          } else if ($.trim(response) == 2) {
            $('#add_book').html('Save');
            show_failed_msg(
              'error',
              'File must be less than 500kb!',
              'Failed!'
            );
          } else {
            $('#add_book').html('Save');
            show_failed_msg('error', '', 'Failed!');
          }
          $('#add_book').prop('disabled', false);
        },
      });
    }
  });

  $(document).on('click', '.edit_book', function () {
    var bookid = $(this).data('id');
    var techerbt = $(this);
    var form_data = new FormData($('#edit_book_form' + bookid)[0]);
    $('#edit_book_form' + bookid).validate({
      // Specify validation rules
      rules: {
        book_number: 'required',
        book_title: 'required',
        author_name: 'required',
        category: 'required',
        no_of_books: {
          required: true,
          min: 0,
        },
      },
      // Specify validation error messages
      messages: {
        book_number: 'Please enter book number!',
        book_title: 'Please enter book title!',
        author_name: 'Please enter book author name!',
        category: 'Please select book category!',
        no_of_books: {
          required: 'Please enter number of books!',
          min: 'minimun value is 0',
        },
      },
    });
    var valid = $('#edit_book_form' + bookid).valid();

    if (valid == true) {
      $.ajax({
        type: 'POST',
        url: $('#edit_book_form' + bookid).prop('action'),
        data: form_data,
        processData: false,
        contentType: false,
        beforeSend: function () {
          // setting a timeout
          $(techerbt).html('Saving...<i class="bx bx-loader bx-spin"></i>');
        },
        success: function (response) {
          if ($.trim(response) == 1) {
            $(techerbt).html('Save');
            show_success_msg('success', 'Book details updated!', 'Saved!');
          } else if ($.trim(response) == 2) {
            $(techerbt).html('Save');
            show_failed_msg(
              'error',
              'File must be less than 500kb!',
              'Failed!'
            );
          } else {
            $(techerbt).html('Save');
            show_failed_msg('error', '', 'Failed!');
          }
        },
      });
    }
  });

  $(document).on('click', '.close_school', function () {
    location.reload();
  });

  $(document).on('click', '.add_teacher', function () {
    $('#teacher_container').toggle();
  });

  $(document).on('click', '.addd_teacher', function () {
    var display_name = $.trim($('#display_name').val());
    var contact_number = $.trim($('#contact_number').val());

    if (display_name != '') {
      var csrfName = $('#csrf_token').attr('name'); // CSRF Token name
      var csrfHash = $('#csrf_token').val(); // CSRF hash
      $('.addd_teacher').prop('disabled', true);
      $.ajax({
        url: base_url() + 'class_and_subjects/add_teacher_from_ajax',
        type: 'POST',
        data: {
          display_name: display_name,
          contact_number: contact_number,
          [csrfName]: csrfHash,
        },
        success: function (response) {
          if ($.trim(response) != 0) {
            $('#display_name').val('');
            $('#teacher_container').toggle();
            $('#teacher').append(
              '<option value="' +
                response +
                '" selected>' +
                display_name +
                '</option>'
            );
          }
          $('.addd_teacher').prop('disabled', false);
        },
        error: function () {
          alert('error');
        },
      });
    }
  });

  $(document).on('click', '#save_org', function () {
    var form_data = new FormData($('#org_form')[0]);

    $('#org_form').validate({
      rules: {
        company_name: 'required',
        company_phone: 'required',
        country: 'required',
        cmp_email: {
          required: true,
          email: true,
        },
      },
      // Specify validation error messages
      messages: {
        company_name: 'Please enter your organisation name!',
        company_phone: 'Please enter your organisation mobile number!',
        country: 'Please select your organisation country!',
        cmp_email: {
          required: 'Please enter your email-id!',
          email: 'Please enter a valid email-id!',
        },
      },
    });
    var valid = $('#org_form').valid();

    if (valid == true) {
      $.ajax({
        type: 'POST',
        url: $('#org_form').prop('action'),
        data: form_data,
        processData: false,
        contentType: false,
        beforeSend: function () {
          // setting a timeout
          $('#save_org').html('Saving...<i class="bx bx-loader bx-spin"></i>');
        },
        success: function (response) {
          if ($.trim(response) == 1) {
            $('#save_org').html('Save');
            show_success_msg('success', '', 'Saved!');
          } else if ($.trim(response) == 2) {
            $('#save_org').html('Save');
            show_failed_msg(
              'error',
              'File must be less than 500kb!',
              'Failed!'
            );
          } else {
            $('#save_org').html('Save');
            show_failed_msg('error', '', 'Failed!');
          }
        },
      });
    }
  });

  $(document).on('click', '.delete_feedback', function () {
    var deleteurl = $(this).data('deleteurl');
    var csrfName = $('#csrf_token').attr('name'); // CSRF Token name
    var csrfHash = $('#csrf_token').val(); // CSRF hash

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      allowOutsideClick: false,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        $.ajax({
          type: 'POST',
          url: deleteurl,
          data: {
            [csrfName]: csrfHash,
          },
          beforeSend: function () {
            // setting a timeout
            // $(techerbt).html('Saving  <i class="bx bx-loader spin_me d-inline-block"></i> ');
          },
          success: function () {
            Swal.fire('Deleted!', 'Feedback deleted.', 'success').then(
              function () {
                window.location.href = base_url() + 'feedbacks?page=1';
              }
            );
          },
        });
      }
    });
  });

  $(document).on('click', '#add_subjects', function () {
    var form_data = new FormData($('#add_subject_form')[0]);

    $('#add_subject_form').validate({
      rules: {
        subname: 'required',
      },
      // Specify validation error messages
      messages: {
        subname: 'Please enter subject name!',
      },
    });
    var valid = $('#add_subject_form').valid();

    if (valid == true) {
      $('#add_subjects').prop('disabled', true);
      $.ajax({
        type: 'POST',
        url: $('#add_subject_form').prop('action'),
        data: form_data,
        processData: false,
        contentType: false,
        beforeSend: function () {
          // setting a timeout
          $('#add_subjects').html(
            'Saving...<i class="bx bx-loader bx-spin"></i>'
          );
        },
        success: function (response) {
          if ($.trim(response) == 1) {
            $('#add_subjects').html('Save');
            $('#add_subject_form')[0].reset();
            show_success_msg(
              'success',
              'Subject added successfully!',
              'Saved!'
            );
          } else {
            $('#add_subjects').html('Save');
            show_failed_msg('error', '', 'Failed!');
          }
          $('#add_subjects').prop('disabled', false);
        },
      });
    }
  });

  $(document).on('click', '.edit_subjects', function () {
    var subjectid = $(this).data('id');
    var subjbt = $(this);
    var form_data = new FormData($('#edit_subject_form' + subjectid)[0]);
    $('#edit_subject_form' + subjectid).validate({
      rules: {
        subname: 'required',
      },

      messages: {
        subname: 'Please enter subject name!',
      },
    });
    var valid = $('#edit_subject_form' + subjectid).valid();

    if (valid == true) {
      $.ajax({
        type: 'POST',
        url: $('#edit_subject_form' + subjectid).prop('action'),
        data: form_data,
        processData: false,
        contentType: false,
        beforeSend: function () {
          // setting a timeout
          $(subjbt).html('Saving...<i class="bx bx-loader bx-spin"></i>');
        },
        success: function (response) {
          if ($.trim(response) == 1) {
            $(subjbt).html('Save');
            show_success_msg('success', 'Subject updated!', 'Saved!');
          } else {
            $(subjbt).html('Save');
            show_failed_msg('error', '', 'Failed!');
          }
        },
      });
    }
  });

  $(document).on('click', '.deletesubject', function () {
    var deleteurl = $(this).data('deleteurl');
    var csrfName = $('#csrf_token').attr('name'); // CSRF Token name
    var csrfHash = $('#csrf_token').val(); // CSRF hash
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      allowOutsideClick: false,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        $.ajax({
          type: 'POST',
          url: deleteurl,
          data: {
            [csrfName]: csrfHash,
          },
          beforeSend: function () {
            // setting a timeout
            // $(techerbt).html('Saving  <i class="bx bx-loader spin_me d-inline-block"></i> ');
          },
          success: function () {
            Swal.fire('Deleted!', 'Subject has been deleted', 'success').then(
              function () {
                window.location.href =
                  base_url() + 'class-and-subjects/subjects';
              }
            );
          },
        });
      }
    });
  });

  $(document).on('click', '.deleteclass', function () {
    var deleteurl = $(this).data('deleteurl');
    var csrfName = $('#csrf_token').attr('name'); // CSRF Token name
    var csrfHash = $('#csrf_token').val(); // CSRF hash
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      allowOutsideClick: false,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        $.ajax({
          type: 'POST',
          url: deleteurl,
          data: {
            [csrfName]: csrfHash,
          },
          beforeSend: function () {
            // setting a timeout
            // $(techerbt).html('Saving  <i class="bx bx-loader spin_me d-inline-block"></i> ');
          },
          success: function () {
            Swal.fire('Deleted!', 'Class deleted', 'success').then(function () {
              window.location.href = base_url() + 'class-and-subjects';
            });
          },
        });
      }
    });
  });

  $(document).on('click', '#add_class', function () {
    var form_data = new FormData($('#add_class_form')[0]);

    $('#add_class_form').validate({
      // Specify validation rules
      rules: {
        class: 'required',
        // strength: {
        //   required: true,
        //   min: 0
        // }
      },
      // Specify validation error messages
      messages: {
        class: 'Please enter class name!',
        // strength: {
        //   required: "Please enter class strength!",
        //   min: "minimun value is 0"
        // }
      },
    });
    var valid = $('#add_class_form').valid();

    if (valid == true) {
      $('#add_class').prop('disabled', true);
      $.ajax({
        type: 'POST',
        url: $('#add_class_form').prop('action'),
        data: form_data,
        processData: false,
        contentType: false,
        beforeSend: function () {
          // setting a timeout
          $('#add_class').html('Saving...<i class="bx bx-loader bx-spin"></i>');
        },
        success: function (response) {
          if ($.trim(response) == 1) {
            $('#add_class').html('Save');
            $('#add_class_form')[0].reset();
            show_success_msg('success', 'Class added successfully!', 'Saved!');
          } else {
            $('#add_class').html('Save');
            show_failed_msg('error', '', 'Failed!');
          }
          $('#add_class').prop('disabled', false);
        },
      });
    }
  });

  $(document).on('click', '.edit_class', function () {
    var classid = $(this).data('id');
    var techerbt = $(this);
    var form_data = new FormData($('#edit_class_form' + classid)[0]);
    $('#edit_class_form' + classid).validate({
      // Specify validation rules
      rules: {
        class: 'required',
        // strength: {
        //   required: true,
        //   min: 0
        // }
      },
      // Specify validation error messages
      messages: {
        class: 'Please enter class name!',
        // strength: {
        //   required: "Please enter class strength!",
        //   min: "minimun value is 0"
        // }
      },
    });
    var valid = $('#edit_class_form' + classid).valid();

    if (valid == true) {
      $.ajax({
        type: 'POST',
        url: $('#edit_class_form' + classid).prop('action'),
        data: form_data,
        processData: false,
        contentType: false,
        beforeSend: function () {
          // setting a timeout
          $(techerbt).html('Saving...<i class="bx bx-loader bx-spin"></i>');
        },
        success: function (response) {
          if ($.trim(response) == 1) {
            $(techerbt).html('Save');
            show_success_msg('success', 'Class details updated!', 'Saved!');
          } else {
            $(techerbt).html('Save');
            show_failed_msg('error', '', 'Failed!');
          }
        },
      });
    }
  });

  $(document).on('click', '.deletestudent', function () {
    var deleteurl = $(this).data('deleteurl');
    var student_id = $(this).data('student_id');
    var csrfName = $('#csrf_token').attr('name'); // CSRF Token name
    var csrfHash = $('#csrf_token').val(); // CSRF hash
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      allowOutsideClick: false,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        $.ajax({
          type: 'POST',
          url:
            base_url() + 'student-master/check_transaction_exist/' + student_id,
          data: {
            [csrfName]: csrfHash,
          },
          success: function (res_data) {
            if ($.trim(res_data) == 'exist') {
              Swal.fire(
                'Failed!',
                'Please delete all transactions before delete',
                'error'
              ).then(function () {
                window.location.href = base_url() + 'student-master?page=1';
              });
            } else {
              $.ajax({
                type: 'POST',
                url: deleteurl,
                data: {
                  [csrfName]: csrfHash,
                },
                beforeSend: function () {
                  // setting a timeout
                  // $(techerbt).html('Saving  <i class="bx bx-loader spin_me d-inline-block"></i> ');
                },
                success: function () {
                  Swal.fire(
                    'Deleted!',
                    'Student has been deleted',
                    'success'
                  ).then(function () {
                    window.location.href = base_url() + 'student-master?page=1';
                  });
                },
              });
            }
          },
        });
      }
    });
  });

  $(document).on('click', '.edit_student', function () {
    var studentid = $(this).data('id');
    var studentbt = $(this);
    var form_data = new FormData($('#edit_student_form' + studentid)[0]);

    $('#edit_student_form' + studentid).validate({
      // Specify validation rules
      rules: {
        stdname: 'required',
        address: 'required',
        date_of_birth: 'required',
        age: 'required',
        fathername: 'required',
        mothername: 'required',
        date_of_join: 'required',
        classes: 'required',
        category: 'required',
        mobileno: {
          required: true,
          minlength: 5,
          maxlength: 12,
        },
      },
      // Specify validation error messages
      messages: {
        stdname: 'Please enter student name!',
        address: 'Please enter student address',
        date_of_birth: 'Please select student date of birth',
        age: 'Please enter student age',
        fathername: 'Please enter student father name',
        mothername: 'Please enter student mother name',
        date_of_join: 'Please select student join date',
        classes: 'Please select student class',
        category: 'Please select student category',
        mobileno: {
          required: 'Contact number required',
          minlength: 'Enter a valid number',
          maxlength: 'Invalid number',
        },
      },
    });
    var valid = $('#edit_student_form' + studentid).valid();

    if (valid == true) {
      $.ajax({
        type: 'POST',
        url: $('#edit_student_form' + studentid).prop('action'),
        data: form_data,
        processData: false,
        contentType: false,
        beforeSend: function () {
          // setting a timeout
          $(studentbt).html('Saving...<i class="bx bx-loader bx-spin"></i>');
        },
        success: function (result) {
          if ($.trim(result) == 'big_file') {
            $(studentbt).html('Save');
            show_failed_msg(
              'error',
              'Profile size must be less than 500kb!',
              'Failed!'
            );
          } else if ($.trim(result) == 'email_exist') {
            show_failed_msg(
              'error',
              'Mobile number already exists!',
              'Failed!'
            );
            $(studentbt).html('Save');
          } else {
            show_success_msg('success', 'Student details updated!', 'Saved!');
            $(studentbt).html('Save');
          }
        },
      });
    }
  });

  $(document).on('change', '.stdcat', function () {
    var parent = $(this).val();
    var elem = $(this).data('stid');

    $.ajax({
      url: base_url() + 'student-master/get_subcat_select/' + parent,
      success: function (response) {
        $('#subcategory' + elem).html(response);
        // $('select').select2();
      },
      error: function () {
        alert('error');
      },
    });
  });

  $(document).on('click', '#add_student_new', function () {
    var form_data = new FormData($('#add_student_form')[0]);

    var added_from = $(this).data('from');

    $('#add_student_form').validate({
      // Specify validation rules
      rules: {
        stdname: 'required',
        address: 'required',
        date_of_birth: 'required',
        age: 'required',
        fathername: 'required',
        mothername: 'required',
        date_of_join: 'required',
        classes: 'required',
        category: 'required',
        mobileno: {
          required: true,
          minlength: 5,
          maxlength: 12,
        },
      },
      // Specify validation error messages
      messages: {
        stdname: 'Please enter student name!',
        address: 'Please enter student address',
        date_of_birth: 'Please select student date of birth',
        age: 'Please enter student age',
        fathername: 'Please enter student father name',
        mothername: 'Please enter student mother name',
        date_of_join: 'Please select student join date',
        classes: 'Please select student class',
        category: 'Please select student category',
        mobileno: {
          required: 'Contact number required',
          minlength: 'Enter a valid number',
          maxlength: 'Invalid number',
        },
      },
    });
    var valid = $('#add_student_form').valid();

    if (valid == true) {
      $('#add_student_new').prop('disabled', true);
      $.ajax({
        type: 'POST',
        url: $('#add_student_form').prop('action'),
        data: form_data,
        processData: false,
        contentType: false,
        beforeSend: function () {
          // setting a timeout
          $('#add_student_new').html(
            'Saving...<i class="bx bx-loader bx-spin"></i>'
          );
        },
        success: function (response) {
          $('#add_student_new').html('Save');

          if ($.trim(response) == 'email_exist') {
            show_failed_msg(
              'error',
              'Mobile number already exists!',
              'Failed!'
            );
          } else if ($.trim(response) == 'big_file') {
            show_failed_msg(
              'error',
              'Profile size must be less than 500kb!',
              'Failed!'
            );
          } else {
            $('#add_student_form')[0].reset();
            show_success_msg('success', 'Added successfully!', 'Saved!');
            $('#studentaddmodal').css('z-index', '1040');
            // $('.modal-backdrop').remove();

            if (added_from == 'organisation') {
              // Fees collect

              Swal.fire({
                title: 'Are you going to pay the fees?',
                text: '',
                icon: 'warning',
                showCancelButton: true,
                allowOutsideClick: false,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, Generate receipt!',
              }).then((result) => {
                if (result.isConfirmed) {
                  $.ajax({
                    type: 'GET',
                    url:
                      base_url() +
                      'student-master/get_fees_list_of_student/' +
                      response,
                    success: function (feedata) {
                      $('#fees_selection_modal').modal('show');
                      $('#fees_box').html(feedata);
                    },
                  });
                } else {
                  window.location.href = base_url() + 'student-master?page=1';
                }
              });

              // Fees collect
            }
          }

          $('#add_student_new').prop('disabled', false);
        },
      });
    }
  });

  $(document).on('click', '.generate_challan_for_student', function () {
    var fees_id = $(this).data('fees_id');
    var student_id = $(this).data('student_id');
    var this_btn = $(this);
    var csrfName = $('#csrf_token').attr('name'); // CSRF Token name
    var csrfHash = $('#csrf_token').val(); // CSRF hash

    $.ajax({
      type: 'POST',
      url:
        base_url() +
        'fees_and_payments/generate_invoices/' +
        fees_id +
        '/' +
        student_id,
      data: {
        [csrfName]: csrfHash,
      },
      beforeSend: function () {
        $(this_btn).html(
          '<div class="card bg-success"><div class="card-body text-white">Please wait until complete ...<i class="ml-2 bx bx-loader spin_me d-inline-block"></i> </div> </div>'
        );
      },
      success: function (response) {
        if ($.trim(response) != '') {
          location.href = base_url() + 'fees_and_payments/payments/' + response;
        }
      },
    });
  });

  $(document).on('click', '.deletecastecategory', function () {
    var deleteurl = $(this).data('deleteurl');
    var csrfName = $('#csrf_token').attr('name'); // CSRF Token name
    var csrfHash = $('#csrf_token').val(); // CSRF hash
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      allowOutsideClick: false,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        $.ajax({
          type: 'POST',
          url: deleteurl,
          data: {
            [csrfName]: csrfHash,
          },
          beforeSend: function () {
            // setting a timeout
            // $(techerbt).html('Saving  <i class="bx bx-loader spin_me d-inline-block"></i> ');
          },
          success: function () {
            Swal.fire('Deleted!', 'Category deleted!', 'success').then(
              function () {
                window.location.href = base_url() + 'settings/caste_category';
              }
            );
          },
        });
      }
    });
  });

  $(document).on('click', '#do_filter_mess', function () {
    var str_serachclass = $('#sel_class').val();
    var str_gender = $('#sel_gender').val();
    var strsearch = $('#searchName').val();
    msg_std_to = 20;
    msg_std_from = 0;
    msg_std_load_data(
      msg_std_to,
      msg_std_from,
      strsearch,
      'html',
      str_serachclass,
      str_gender
    );
    msg_std_search = strsearch;
    msg_std_serachclass = str_serachclass;
    msg_std_gender = str_gender;

    $(window).scroll(function () {
      if (
        $(window).scrollTop() + $(window).height() >
          $('#all_student_details').height() &&
        msg_std_action == 'inactive'
      ) {
        msg_std_lazzy_loader(msg_std_to);
        msg_std_action = 'active';
        msg_std_from = msg_std_from + msg_std_to;
        setTimeout(function () {
          msg_std_load_data(
            msg_std_to,
            msg_std_from,
            msg_std_search,
            'append',
            msg_std_serachclass,
            msg_std_gender
          );
        }, 1000);
      }
    });
  });

  $(document).on('click', '#enable_payment', function () {
    var api_key = $('#api_key').val();
    var security_key = $('#security_key').val();

    if (!this.checked) {
      $('#api_key').prop('disabled', false);
      $('#security_key').prop('disabled', false);
      var form_data = new FormData($('#paymentway_form')[0]);

      save_gate_way_settings(form_data);
    } else {
      if (api_key != '' && security_key != '') {
        var form_data = new FormData($('#paymentway_form')[0]);
        save_gate_way_settings(form_data);
      } else {
        $('#enable_payment').prop('checked', false);
      }
    }
  });

  function save_gate_way_settings(gatedata) {
    $.ajax({
      type: 'POST',
      url: $('#paymentway_form').prop('action'),
      data: gatedata,
      processData: false,
      contentType: false,
      beforeSend: function () {
        // $('#result').html('Saving  <i class="bx bx-loader spin_me d-inline-block"></i> ');
      },
      success: function (data) {
        // $('#result').fadeIn();
        if ($('#enable_payment').prop('checked') == true) {
          $('#api_key').prop('disabled', true);
          $('#security_key').prop('disabled', true);
        } else {
          $('#api_key').prop('disabled', false);
          $('#security_key').prop('disabled', false);
        }

        show_success_msg('success', '', 'Saved!');
      },
    });
  }

  $(document).on('click', '#add_sports', function () {
    var form_data = new FormData($('#add_sports_form')[0]);

    $('#add_sports_form').validate({
      rules: {
        sportsname: 'required',
      },
      // Specify validation error messages
      messages: {
        sportsname: 'Please enter sports name!',
      },
    });
    var valid = $('#add_sports_form').valid();

    if (valid == true) {
      $('#add_sports').prop('disabled', true);
      $.ajax({
        type: 'POST',
        url: $('#add_sports_form').prop('action'),
        data: form_data,
        processData: false,
        contentType: false,
        beforeSend: function () {
          // setting a timeout
          $('#add_sports').html(
            'Saving...<i class="bx bx-loader bx-spin"></i>'
          );
        },
        success: function (response) {
          if ($.trim(response) == 1) {
            $('#add_sports').html('Save');
            $('#add_sports_form')[0].reset();
            show_success_msg('success', 'Sports added successfully!', 'Saved!');
          } else {
            $('#add_sports').html('Save');
            show_failed_msg('error', '', 'Failed!');
          }
          $('#add_sports').prop('disabled', false);
        },
      });
    }
  });

  //edit sports
  $(document).on('click', '.edit_sports', function () {
    var sportsid = $(this).data('id');
    var techerbt = $(this);
    var form_data = new FormData($('#edit_sports_form' + sportsid)[0]);
    $('#edit_sports_form' + sportsid).validate({
      // Specify validation rules
      rules: {
        sportsname: 'required',
      },
      // Specify validation error messages
      messages: {
        sportsname: 'Please enter sports name!',
      },
    });
    var valid = $('#edit_sports_form' + sportsid).valid();

    if (valid == true) {
      $.ajax({
        type: 'POST',
        url: $('#edit_sports_form' + sportsid).prop('action'),
        data: form_data,
        processData: false,
        contentType: false,
        beforeSend: function () {
          // setting a timeout
          $(techerbt).html('Saving...<i class="bx bx-loader bx-spin"></i>');
        },
        success: function (response) {
          if ($.trim(response) == 1) {
            $(techerbt).html('Save');
            show_success_msg('success', 'Sports details updated!', 'Saved!');
          } else {
            $(techerbt).html('Save');
            show_failed_msg('error', '', 'Failed!');
          }
        },
      });
    }
  });

  $(document).on('click', '.deletesports', function () {
    var deleteurl = $(this).data('deleteurl');
    var csrfName = $('#csrf_token').attr('name'); // CSRF Token name
    var csrfHash = $('#csrf_token').val(); // CSRF hash
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      allowOutsideClick: false,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        $.ajax({
          type: 'POST',
          url: deleteurl,
          data: {
            [csrfName]: csrfHash,
          },

          beforeSend: function () {
            // setting a timeout
            // $(techerbt).html('Saving  <i class="anticon anticon-loading d-inline-block"></i> ');
          },
          success: function () {
            Swal.fire('Deleted!', 'Sports has been deleted!', 'success').then(
              function () {
                window.location.href = base_url() + 'school_activities/sports';
              }
            );
          },
        });
      }
    });
  });

  $(document).on('click', '#add_participant', function () {
    var form_data = new FormData($('#add_participant_form')[0]);

    var student_sele = $.trim($('#student_sele').val());
    $('#student_sele-error').html('');

    $('#add_participant_form').validate({
      // Specify validation rules
      rules: {
        student: 'required',
        sports: 'required',
      },
      // Specify validation error messages
      messages: {
        student: 'Please select student!',
        sports: 'Please select sports!',
      },
    });
    var valid = $('#add_participant_form').valid();

    if (valid == true) {
      $('#add_participant').prop('disabled', true);
      $.ajax({
        type: 'POST',
        url: $('#add_participant_form').prop('action'),
        data: form_data,
        processData: false,
        contentType: false,
        beforeSend: function () {
          // setting a timeout
          $('#add_participant').html(
            'Saving...<i class="bx bx-loader bx-spin"></i>'
          );
        },
        success: function (response) {
          if ($.trim(response) == 'sports_exist') {
            $('#add_participant').html('Save');
            show_failed_msg(
              'error',
              'Sports category already exists!',
              'Failed!'
            );
          } else {
            $('#add_participant').html('Save');
            $('#add_participant_form')[0].reset();
            show_success_msg('success', 'Added successfully!', 'Saved!');
          }
          $('#add_participant').prop('disabled', false);
        },
      });
    }
  });

  $(document).on('click', '.edit_participants', function () {
    var partcipid = $(this).data('id');
    var techerbt = $(this);
    var form_data = new FormData($('#edit_participant_form' + partcipid)[0]);
    $('#edit_participant_form' + partcipid).validate({
      // Specify validation rules
      rules: {
        sports: 'required',
      },
      // Specify validation error messages
      messages: {
        sports: 'Please select sports!',
      },
    });
    var valid = $('#edit_participant_form' + partcipid).valid();

    if (valid == true) {
      $.ajax({
        type: 'POST',
        url: $('#edit_participant_form' + partcipid).prop('action'),
        data: form_data,
        processData: false,
        contentType: false,
        beforeSend: function () {
          // setting a timeout
          $(techerbt).html('Saving...<i class="bx bx-loader bx-spin"></i>');
        },
        success: function (response) {
          if ($.trim(response) == 'sports_exist') {
            $(techerbt).html('Save');
            show_failed_msg(
              'error',
              'Sports category already exists!',
              'Failed!'
            );
          } else {
            $(techerbt).html('Save');
            show_success_msg('success', '', 'Saved!');
          }
        },
      });
    }
  });

  $(document).on('click', '.deletesportspartici', function () {
    var deleteurl = $(this).data('deleteurl');
    var csrfName = $('#csrf_token').attr('name'); // CSRF Token name
    var csrfHash = $('#csrf_token').val(); // CSRF hash

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      allowOutsideClick: false,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        $.ajax({
          type: 'POST',
          url: deleteurl,
          data: {
            [csrfName]: csrfHash,
          },
          beforeSend: function () {
            // setting a timeout
            // $(techerbt).html('Saving  <i class="anticon anticon-loading d-inline-block"></i> ');
          },
          success: function () {
            Swal.fire(
              'Deleted!',
              'Sports participant has been deleted!',
              'success'
            ).then(function () {
              window.location.href =
                base_url() + 'school_activities/sports_participants?page=1';
            });
          },
        });
      }
    });
  });

  $(document).on('input', '.analytics_sports', function () {
    var studentid = $(this).data('student_id');
    var sports_eccc_id = $(this).data('sports_id');
    var involve_sports = $(this).val();
    var csrfName = $('#csrf_token').attr('name'); // CSRF Token name
    var csrfHash = $('#csrf_token').val(); // CSRF hash

    if (involve_sports != '' && involve_sports != 0) {
      if (involve_sports <= 100) {
        $.ajax({
          type: 'POST',
          url: base_url() + 'school_activities/add_involve_sports',
          data: {
            student_id: studentid,
            sports_id: sports_eccc_id,
            involve_sports: involve_sports,
            [csrfName]: csrfHash,
          },
          beforeSend: function () {},
          success: function (data) {
            if ($.trim(data) == 1) {
              show_success_msg('success', '', 'Saved!');
            } else {
              show_failed_msg('error', '', 'Failed!');
            }
          },
        });
      } else {
        $(this).val(0);
      }
    } else {
    }
  });

  //add Sportsevent
  $(document).on('click', '#add_sportsevent', function () {
    var form_data = new FormData($('#add_sportsevent_form')[0]);

    $('#add_sportsevent_form').validate({
      // Specify validation rules
      rules: {
        events_name: 'required',
        from: 'required',
        to: 'required',
        place: 'required',
        related_to: 'required',
        c_type: 'required',
      },
      // Specify validation error messages
      messages: {
        events_name: 'Please enter event name!',
        from: 'Please select date!',
        to: 'Please select date!',
        place: 'Please enter place!',
        related_to: 'Please select sports!',
        c_type: 'Please select event type',
      },
    });
    var valid = $('#add_sportsevent_form').valid();

    if (valid == true) {
      $('#add_sportsevent').prop('disabled', true);
      $.ajax({
        type: 'POST',
        url: $('#add_sportsevent_form').prop('action'),
        data: form_data,
        processData: false,
        contentType: false,
        beforeSend: function () {
          // setting a timeout
          $('#add_sportsevent').html(
            'Saving...<i class="bx bx-loader bx-spin"></i>'
          );
        },
        success: function (response) {
          if ($.trim(response) == '1') {
            $('#add_sportsevent').html('Save');
            $('#add_sportsevent_form')[0].reset();
            show_success_msg('success', 'Event added successfully!', 'Saved!');
          } else {
            $('#add_sportsevent').html('Save');
            show_failed_msg('error', '', 'Failed!');
          }
          $('#add_sportsevent').prop('disabled', false);
        },
      });
    }
  });

  $(document).on('click', '.edit_sportsevent', function () {
    var speventid = $(this).data('id');
    var techerbt = $(this);
    var form_data = new FormData($('#edit_sportsevent_form' + speventid)[0]);
    $('#edit_sportsevent_form' + speventid).validate({
      // Specify validation rules
      rules: {
        events_name: 'required',
        from: 'required',
        to: 'required',
        place: 'required',
        related_to: 'required',
        c_type: 'required',
      },
      // Specify validation error messages
      messages: {
        events_name: 'Please enter event name!',
        from: 'Please select date!',
        to: 'Please select date!',
        place: 'Please enter place!',
        related_to: 'Please select sports!',
        c_type: 'Please select event type',
      },
    });
    var valid = $('#edit_sportsevent_form' + speventid).valid();

    if (valid == true) {
      $.ajax({
        type: 'POST',
        url: $('#edit_sportsevent_form' + speventid).prop('action'),
        data: form_data,
        processData: false,
        contentType: false,
        beforeSend: function () {
          // setting a timeout
          $(techerbt).html('Saving...<i class="bx bx-loader bx-spin"></i>');
        },
        success: function (response) {
          if ($.trim(response) == '1') {
            $(techerbt).html('Save');
            show_success_msg('success', 'Event updated!', 'Saved!');
          } else {
            $(techerbt).html('Save');
            show_failed_msg('error', '', 'Failed!');
          }
        },
      });
    }
  });

  $(document).on('click', '.deletesportsevent', function () {
    var deleteurl = $(this).data('deleteurl');
    var csrfName = $('#csrf_token').attr('name'); // CSRF Token name
    var csrfHash = $('#csrf_token').val(); // CSRF hash

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      allowOutsideClick: false,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        $.ajax({
          type: 'POST',
          url: deleteurl,
          data: {
            [csrfName]: csrfHash,
          },
          beforeSend: function () {
            // setting a timeout
            // $(techerbt).html('Saving  <i class="anticon anticon-loading d-inline-block"></i> ');
          },
          success: function () {
            Swal.fire('Deleted!', 'Event deleted!', 'success').then(
              function () {
                window.location.href =
                  base_url() + 'school_activities/sports_events?page=1';
              }
            );
          },
        });
      }
    });
  });

  $(document).on('input', '.event_mark', function () {
    var studentid = $(this).data('student_id');
    var event_id = $(this).data('event_id');

    var reward_mark = $(this).val();
    var csrfName = $('#csrf_token').attr('name'); // CSRF Token name
    var csrfHash = $('#csrf_token').val(); // CSRF hash

    if (reward_mark != '' && reward_mark != 0) {
      if (reward_mark <= 100) {
        $.ajax({
          type: 'POST',
          url: base_url() + 'school_activities/add_reward_mark',
          data: {
            student_id: studentid,
            reward_mark: reward_mark,
            event_id: event_id,
            [csrfName]: csrfHash,
          },
          beforeSend: function () {},
          success: function (response) {
            if ($.trim(response) == 1) {
              show_success_msg('success', '', 'Saved!');
            } else {
              show_failed_msg('error', '', 'Failed!');
            }
          },
        });
      } else {
        $(this).val(0);
      }
    } else {
    }
  });

  $(document).on('change', '.event_reward_select', function () {
    var studentid = $(this).data('student_id');
    var event_id = $(this).data('event_id');

    var reward_status = $(this).val();
    var csrfName = $('#csrf_token').attr('name'); // CSRF Token name
    var csrfHash = $('#csrf_token').val(); // CSRF hash

    if (reward_status != '' && reward_status != 0) {
      if (reward_status != '') {
        $.ajax({
          type: 'POST',
          url: base_url() + 'school_activities/add_reward_status',
          data: {
            student_id: studentid,
            reward_status: reward_status,
            event_id: event_id,
            [csrfName]: csrfHash,
          },
          beforeSend: function () {},
          success: function (response) {
            if ($.trim(response) == 1) {
              show_success_msg('success', '', 'Saved!');
              $('#rw_status' + studentid).text(
                htmlEntities($('#rw_val' + studentid).val())
              );
            } else {
              show_failed_msg('error', '', 'Failed!');
            }
          },
        });
      }
    } else {
    }
  });

  $(document).on('click', '.send_reward_via_sms', function () {
    var uid = $(this).data('uid');
    var phone = $(this).data('phone');
    var event = $(this).data('event');
    var csrfName = $('#csrf_token').attr('name'); // CSRF Token name
    var csrfHash = $('#csrf_token').val(); // CSRF hash

    Swal.fire({
      title: 'Are you sure?',
      text: '',
      icon: 'warning',
      showCancelButton: true,
      allowOutsideClick: false,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, send!',
    }).then((result) => {
      if (result.isConfirmed) {
        $.ajax({
          type: 'get',
          url: base_url() + 'messaging/send_reward/',
          data: {
            uid: uid,
            phone: phone,
            event: event,
            [csrfName]: csrfHash,
          },
          beforeSend: function () {},
          success: function (data) {
            data = $.parseJSON(data);
            if (data.status == true) {
              show_success_msg('success', data.message, 'Saved!');
            } else {
              show_failed_msg('error', data.message, 'Failed!');
            }
          },
        });
      }
    });
  });

  $(document).on('click', '#add_activity', function () {
    var form_data = new FormData($('#add_activity_form')[0]);

    $('#add_activity_form').validate({
      // Specify validation rules
      rules: {
        activityname: 'required',
      },
      // Specify validation error messages
      messages: {
        activityname: 'Please enter activity name!',
      },
    });
    var valid = $('#add_activity_form').valid();

    if (valid == true) {
      $('#add_activity').prop('disabled', true);
      $.ajax({
        type: 'POST',
        url: $('#add_activity_form').prop('action'),
        data: form_data,
        processData: false,
        contentType: false,
        beforeSend: function () {
          // setting a timeout
          $('#add_activity').html(
            'Saving...<i class="bx bx-loader bx-spin"></i>'
          );
        },
        success: function (response) {
          if ($.trim(response) == 1) {
            $('#add_activity').html('Save');
            $('#add_activity_form')[0].reset();
            show_success_msg(
              'success',
              'Activity added successfully!',
              'Saved!'
            );
          } else {
            $('#add_activity').html('Save');
            show_failed_msg('error', '', 'Failed!');
          }
          $('#add_activity').prop('disabled', false);
        },
      });
    }
  });

  $(document).on('click', '.edit_activity', function () {
    var activityid = $(this).data('id');
    var techerbt = $(this);
    var form_data = new FormData($('#edit_activity_form' + activityid)[0]);
    $('#edit_activity_form' + activityid).validate({
      // Specify validation rules
      rules: {
        activityname: 'required',
      },
      // Specify validation error messages
      messages: {
        activityname: 'Please enter activity name!',
      },
    });
    var valid = $('#edit_activity_form' + activityid).valid();

    if (valid == true) {
      $.ajax({
        type: 'POST',
        url: $('#edit_activity_form' + activityid).prop('action'),
        data: form_data,
        processData: false,
        contentType: false,
        beforeSend: function () {
          // setting a timeout
          $(techerbt).html('Saving...<i class="bx bx-loader bx-spin"></i>');
        },
        success: function (response) {
          if ($.trim(response) == 1) {
            $(techerbt).html('Save');
            show_success_msg(
              'success',
              'Activities details updated!',
              'Saved!'
            );
          } else {
            $(techerbt).html('Save');
            show_failed_msg('error', '', 'Failed!');
          }
        },
      });
    }
  });

  $(document).on('click', '.deleteactivity', function () {
    var deleteurl = $(this).data('deleteurl');
    var csrfName = $('#csrf_token').attr('name'); // CSRF Token name
    var csrfHash = $('#csrf_token').val(); // CSRF hash

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      allowOutsideClick: false,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        $.ajax({
          type: 'POST',
          url: deleteurl,
          data: {
            [csrfName]: csrfHash,
          },
          beforeSend: function () {
            // setting a timeout
            // $(techerbt).html('Saving  <i class="anticon anticon-loading d-inline-block"></i> ');
          },
          success: function () {
            Swal.fire('Deleted!', 'Activity has been deleted!', 'success').then(
              function () {
                window.location.href = base_url() + 'school_activities/eccc';
              }
            );
          },
        });
      }
    });
  });

  $(document).on('click', '#add_actparticipant', function () {
    var form_data = new FormData($('#add_activityparticipant_form')[0]);

    $('#add_activityparticipant_form').validate({
      // Specify validation rules
      rules: {
        student: 'required',
        activity: 'required',
      },
      // Specify validation error messages
      messages: {
        student: 'Please select student!',
        activity: 'Please select activity!',
      },
    });
    var valid = $('#add_activityparticipant_form').valid();

    if (valid == true) {
      $('#add_actparticipant').prop('disabled', true);
      $.ajax({
        type: 'POST',
        url: $('#add_activityparticipant_form').prop('action'),
        data: form_data,
        processData: false,
        contentType: false,
        beforeSend: function () {
          // setting a timeout
          $('#add_actparticipant').html(
            'Saving...<i class="bx bx-loader bx-spin"></i>'
          );
        },
        success: function (response) {
          if ($.trim(response) == 'activity_exist') {
            $('#add_actparticipant').html('Save');
            show_failed_msg('error', 'Activity already exists!', 'Failed!');
          } else {
            $('#add_activityparticipant_form')[0].reset();
            $('#add_actparticipant').html('Save');
            show_success_msg('success', 'Added successfully!', 'Saved!');
          }

          $('#add_actparticipant').prop('disabled', false);
        },
      });
    }
  });

  $(document).on('click', '.edit_actparticipants', function () {
    var actpartcipid = $(this).data('id');
    var techerbt = $(this);
    var form_data = new FormData(
      $('#edit_actparticipant_form' + actpartcipid)[0]
    );

    $('#edit_actparticipant_form' + actpartcipid).validate({
      // Specify validation rules
      rules: {
        activity: 'required',
      },
      // Specify validation error messages
      messages: {
        activity: 'Please select activity!',
      },
    });
    var valid = $('#edit_actparticipant_form' + actpartcipid).valid();

    if (valid == true) {
      $.ajax({
        type: 'POST',
        url: $('#edit_actparticipant_form' + actpartcipid).prop('action'),
        data: form_data,
        processData: false,
        contentType: false,
        beforeSend: function () {
          // setting a timeout
          $(techerbt).html('Saving...<i class="bx bx-loader bx-spin"></i> ');
        },
        success: function (response) {
          if ($.trim(response) == 'activity_exist') {
            $(techerbt).html('Save');
            show_failed_msg('error', 'Activity already exists!', 'Failed!');
          } else {
            $(techerbt).html('Save');
            show_success_msg('success', '', 'Saved!');
          }
        },
      });
    }
  });

  $(document).on('click', '.deleteactpartici', function () {
    var deleteurl = $(this).data('deleteurl');
    var csrfName = $('#csrf_token').attr('name'); // CSRF Token name
    var csrfHash = $('#csrf_token').val(); // CSRF hash

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      allowOutsideClick: false,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        $.ajax({
          type: 'POST',
          url: deleteurl,
          data: {
            [csrfName]: csrfHash,
          },
          beforeSend: function () {
            // setting a timeout
            // $(techerbt).html('Saving  <i class="anticon anticon-loading d-inline-block"></i> ');
          },
          success: function () {
            Swal.fire(
              'Deleted!',
              'Activities participant has been deleted!',
              'success'
            ).then(function () {
              window.location.href =
                base_url() + 'school_activities/eccc_participants?page=1';
            });
          },
        });
      }
    });
  });

  $(document).on('input', '.analytics_eccc', function () {
    var studentid = $(this).data('student_id');
    var sports_eccc_id = $(this).data('activities_id');
    var involve_eccc = $(this).val();
    var csrfName = $('#csrf_token').attr('name'); // CSRF Token name
    var csrfHash = $('#csrf_token').val(); // CSRF hash

    if (involve_eccc != '' && involve_eccc != 0) {
      if (involve_eccc <= 100) {
        $.ajax({
          type: 'POST',
          url: base_url() + 'school_activities/add_involve_eccc',
          data: {
            student_id: studentid,
            activities_id: sports_eccc_id,
            involve_eccc: involve_eccc,
            [csrfName]: csrfHash,
          },
          beforeSend: function () {},
          success: function (data) {
            if ($.trim(data) == 1) {
              show_success_msg('success', '', 'Saved!');
            } else {
              show_failed_msg('error', '', 'Failed!');
            }
          },
        });
      } else {
        $(this).val(0);
      }
    } else {
    }
  });

  $(document).on('click', '#add_ecccevent', function () {
    var form_data = new FormData($('#add_ecccsevent_form')[0]);

    $('#add_ecccsevent_form').validate({
      // Specify validation rules
      rules: {
        events_name: 'required',
        from: 'required',
        to: 'required',
        place: 'required',
        related_to: 'required',
        c_type: 'required',
      },
      // Specify validation error messages
      messages: {
        events_name: 'Please enter event name!',
        from: 'Please select date!',
        to: 'Please select date!',
        place: 'Please enter place!',
        related_to: 'Please select activities!',
        c_type: 'Please select event type',
      },
    });
    var valid = $('#add_ecccsevent_form').valid();

    if (valid == true) {
      $('#add_ecccevent').prop('disabled', true);
      $.ajax({
        type: 'POST',
        url: $('#add_ecccsevent_form').prop('action'),
        data: form_data,
        processData: false,
        contentType: false,
        beforeSend: function () {
          // setting a timeout
          $('#add_ecccevent').html(
            'Saving...<i class="bx bx-loader bx-spin"></i>'
          );
        },
        success: function (response) {
          if ($.trim(response) == '1') {
            $('#add_ecccevent').html('Save');
            $('#add_ecccsevent_form')[0].reset();
            show_success_msg('success', 'Event added successfully!', 'Saved!');
          } else {
            $('#add_ecccevent').html('Save');
            show_failed_msg('error', '', 'Failed!');
          }

          $('#add_ecccevent').prop('disabled', false);
        },
      });
    }
  });

  $(document).on('click', '.edit_ecccevent', function () {
    var speventid = $(this).data('id');
    var techerbt = $(this);
    var form_data = new FormData($('#edit_ecccevent_form' + speventid)[0]);
    $('#edit_ecccevent_form' + speventid).validate({
      // Specify validation rules
      rules: {
        events_name: 'required',
        from: 'required',
        to: 'required',
        place: 'required',
        related_to: 'required',
        c_type: 'required',
      },
      // Specify validation error messages
      messages: {
        events_name: 'Please enter event name!',
        from: 'Please select date!',
        to: 'Please select date!',
        place: 'Please enter place!',
        related_to: 'Please select activities!',
        c_type: 'Please select event type',
      },
    });
    var valid = $('#edit_ecccevent_form' + speventid).valid();

    if (valid == true) {
      $.ajax({
        type: 'POST',
        url: $('#edit_ecccevent_form' + speventid).prop('action'),
        data: form_data,
        processData: false,
        contentType: false,
        beforeSend: function () {
          // setting a timeout
          $(techerbt).html(
            'Saving  <i class="anticon anticon-loading d-inline-block"></i> '
          );
        },
        success: function (response) {
          if ($.trim(response) == '1') {
            $(techerbt).html('Save');
            show_success_msg('success', 'Event updated!', 'Saved!');
          } else {
            $(techerbt).html('Save');
            show_failed_msg('error', '', 'Failed!');
          }
        },
      });
    }
  });

  $(document).on('click', '.deleteecccevent', function () {
    var deleteurl = $(this).data('deleteurl');
    var csrfName = $('#csrf_token').attr('name'); // CSRF Token name
    var csrfHash = $('#csrf_token').val(); // CSRF hash

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      allowOutsideClick: false,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        $.ajax({
          type: 'POST',
          url: deleteurl,
          data: {
            [csrfName]: csrfHash,
          },
          beforeSend: function () {
            // setting a timeout
            // $(techerbt).html('Saving  <i class="anticon anticon-loading d-inline-block"></i> ');
          },
          success: function () {
            Swal.fire('Deleted!', 'Event deleted!', 'success').then(
              function () {
                window.location.href =
                  base_url() + 'school_activities/eccc_events?page=1';
              }
            );
          },
        });
      }
    });
  });

  $(document).on(
    'click',
    '#backdrop_for_ent,.quick_menu_container',
    function () {
      $('#backdrop_for_ent').toggle();

      if ($('.receipt_q_but').hasClass('receipt_q_but-show')) {
        $('.receipt_q_but').removeClass('receipt_q_but-show');
        $('.receipt_q_but span').removeClass('d-block');
        $('.receipt_q_but span').addClass('d-none');

        $('#stucontainer').removeClass('d-flex');
        $('#stucontainer').addClass('d-none');
        $('#fees_container').removeClass('d-flex');
        $('#fees_container').addClass('d-none');
      } else {
        $('.receipt_q_but').addClass('receipt_q_but-show');
        $('.receipt_q_but span').addClass('d-block');
        $('.receipt_q_but span').removeClass('d-none');
      }

      if ($('.fees_q_but').hasClass('fees_q_but-show')) {
        $('.fees_q_but').removeClass('fees_q_but-show');
        $('.fees_q_but span').addClass('d-none');
        $('.fees_q_but span').removeClass('d-block');
      } else {
        $('.fees_q_but').addClass('fees_q_but-show');
        $('.fees_q_but span').addClass('d-block');
        $('.fees_q_but span').removeClass('d-none');
      }

      if ($('.payment_q_but').hasClass('payment_q_but-show')) {
        $('.payment_q_but').removeClass('payment_q_but-show');
        $('.payment_q_but span').addClass('d-none');
        $('.payment_q_but span').removeClass('d-block');
      } else {
        $('.payment_q_but').addClass('payment_q_but-show');
        $('.payment_q_but span').addClass('d-block');
        $('.payment_q_but span').removeClass('d-none');
      }
    }
  );

  // Take fees

  $(document).on('click', '.close_fees_container,#take_fees_btn', function () {
    if ($('#stucontainer').hasClass('d-none')) {
      $('#stucontainer').removeClass('d-none');
      $('#stucontainer').addClass('d-flex');
      $('#fees_container').removeClass('d-flex');
      $('#fees_container').addClass('d-none');
      $('#student_search_input').focus();
    } else {
      $('#stucontainer').removeClass('d-flex');
      $('#stucontainer').addClass('d-none');
      $('#fees_container').removeClass('d-flex');
      $('#fees_container').addClass('d-none');
    }
  });

  $(document).on('input', '#student_search_input', function () {
    var searched_student = $(this).val();

    if (searched_student.length >= 3) {
      $.ajax({
        type: 'GET',
        url: base_url() + '/users/student_suggestions/' + searched_student,
        success: function (data) {
          if ($.trim(data) != '') {
            $('#sug_ul').css('display', 'block');
            $('#sug_ul').html(data);
          }
        },
      });
    } else {
      $('#sug_ul').css('display', 'none');
      $('#sug_ul').html('');
    }
  });

  $(document).on('click', '.open_feeses_of_student', function () {
    var stid = $(this).data('stid');

    $.ajax({
      type: 'GET',
      url: base_url() + 'users/get_unpaid_fees_of_student/' + stid,
      success: function (feedata) {
        $('#sug_ul').html(feedata);
      },
    });
  });

  $(document).on('click', '.feesli', function () {
    var invoice_id = $(this).data('invoice_id');
    var due_amount = $(this).data('due_amount');

    if (due_amount > 0) {
      if ($('#fees_container').hasClass('d-none')) {
        $('#fees_container').removeClass('d-none');
        $('#fees_container').addClass('d-flex');
        $('#stucontainer').removeClass('d-flex');
        $('#stucontainer').addClass('d-none');
        $.ajax({
          type: 'GET',
          url: base_url() + '/fees_and_payments/get_payment_form/' + invoice_id,
          success: function (feeform) {
            $('#fee_show').html(feeform);
            $('#fee_show').append(
              '<div class="close_fees_container"><i class="anticon anticon-close"></i></div>'
            );
          },
        });
      } else {
        $('#fees_container').removeClass('d-flex');
        $('#fees_container').addClass('d-none');
      }
    } else {
      show_toast('error', 'Already paid');
    }
  });

  $(document).on('click', '.generate_new_challan', function () {
    var std_id = $(this).data('std_id');

    var taypeee =
      '<li class="btn d-block btn-info generate_standard_fee" data-std_id="' +
      std_id +
      '"><span>Standard</span></li><li class="btn d-block btn-secondary mt-2 generate_transport_fee" data-std_id="' +
      std_id +
      '"><span>Transport</span></li>';

    $('#sug_ul').html(taypeee);
  });

  $(document).on('click', '.generate_standard_fee', function () {
    var std_id = $(this).data('std_id');

    $.ajax({
      type: 'GET',
      url: base_url() + 'users/get_all_standard_fees_of_student/' + std_id,
      success: function (feedata) {
        $('#sug_ul').html(feedata);
      },
    });
  });

  $(document).on('click', '.generate_transport_fee', function () {
    var std_id = $(this).data('std_id');

    $.ajax({
      type: 'GET',
      url: base_url() + 'users/get_all_transport_fees_of_student/' + std_id,
      success: function (feedata) {
        $('#sug_ul').html(feedata);
      },
    });
  });

  $(document).on('click', '.st_fees_list', function () {
    var fees_id = $(this).data('fees_id');
    var student_id = $(this).data('std_id');
    var this_btn = $(this);
    var csrfName = $('#csrf_token').attr('name'); // CSRF Token name
    var csrfHash = $('#csrf_token').val(); // CSRF hash

    if (student_id != '') {
      $.ajax({
        type: 'POST',
        url:
          base_url() +
          'fees_and_payments/generate_invoices/' +
          fees_id +
          '/' +
          student_id,
        data: {
          [csrfName]: csrfHash,
        },
        beforeSend: function () {},
        success: function (response) {
          $.ajax({
            type: 'GET',
            url: base_url() + 'users/get_unpaid_fees_of_student/' + student_id,
            success: function (feedata) {
              $('#sug_ul').html(feedata);
            },
          });
          show_toast('pass', 'Generated successfully!');
        },
      });
    }
  });

  $(document).on('click', '.tr_location_list', function () {
    var fees_id = $(this).data('fees_id');
    var student_id = $(this).data('student_id');
    var location_id = $(this).data('location_id');
    var this_btn = $(this);
    var csrfName = $('#csrf_token').attr('name'); // CSRF Token name
    var csrfHash = $('#csrf_token').val(); // CSRF hash

    if (student_id != '' && location_id != '') {
      $.ajax({
        type: 'POST',
        url:
          base_url() +
          'fees_and_payments/generate_invoices_for_transport/' +
          fees_id +
          '/' +
          student_id +
          '/' +
          location_id,
        data: {
          [csrfName]: csrfHash,
        },
        beforeSend: function () {
          $(this_btn).html(
            'Please wait until complete  <i class="ml-2 bx bx-loader spin_me d-inline-block"></i> '
          );
        },
        success: function (response) {
          $.ajax({
            type: 'GET',
            url: base_url() + 'users/get_unpaid_fees_of_student/' + student_id,
            success: function (feedata) {
              $('#sug_ul').html(feedata);
            },
          });
          show_toast('pass', 'Generated successfully!');
        },
      });
    }
  });

  $(document).on('click', '.paste_all', function () {
    var column_class = $(this).data('input_class');
    $('.' + column_class).each(function () {
      var value = $(this).val();
      var row_class = $(this).data('row_class');

      $('.' + row_class).each(function () {
        $(this).val(value);
        $(this).trigger('blur');
      });
    });
  });

  $(document).on('blur', '.analytics_fees', function () {
    var categoryid = $(this).data('category_id');
    var itemid = $(this).data('item_id');
    var classid = $(this).data('classid');
    var price = $(this).val();
    // alert(price);
    var csrfName = $('#csrf_token').attr('name'); // CSRF Token name
    var csrfHash = $('#csrf_token').val(); // CSRF hash

    if (price != '') {
      if (price < 0) {
        $(this).val(0);
      } else {
        $.ajax({
          type: 'POST',
          url: base_url() + '/fees_and_payments/add_item_price',
          data: {
            category_id: categoryid,
            item_id: itemid,
            price: price,
            classid: classid,
            [csrfName]: csrfHash,
          },
          beforeSend: function () {},
          success: function (data) {
            if ($.trim(data) == 1) {
              show_success_msg('success', 'saved!');
            } else {
              show_success_msg('error', 'failed');
            }
          },
        });
      }
    } else {
    }
  });

  $(document).on('click', '.tr_fees_list', function () {
    var std_id = $(this).data('std_id');
    var fees_id = $(this).data('fees_id');

    $.ajax({
      type: 'GET',
      url:
        base_url() +
        'users/get_all_transport_locations/' +
        std_id +
        '/' +
        fees_id,
      success: function (feedata) {
        $('#sug_ul').html(feedata);
      },
    });
  });

  function show_toast(status, message) {
    $('#asm_toast').addClass('show');
    if (status == 'pass') {
      var icon = '<i class="bx bx-check-circle pr-2 d-inline-block"></i>';
    } else {
      var icon = '<i class="bx bx-close-circle pr-2 d-inline-block"></i>';
    }
    $('#asm_toast').html(icon + message);
    $('#asm_toast').addClass(status);
    setInterval(function () {
      $('#asm_toast').removeClass('show');
      $('#asm_toast').html('');
      $('#asm_toast').removeClass(status);
    }, 3000);
  }

  $(document).on('change', '#fees_type', function () {
    var ftt = $(this).val();
    if (ftt == 1 || ftt == 2) {
      $('#feeselector').addClass('d-none');
    } else {
      $('#feeselector').removeClass('d-none');
    }
  });

  $(document).on('click', '.confirm_before_link', function () {
    var uuurl = $(this).data('href');
    var csrfName = $('#csrf_token').attr('name'); // CSRF Token name
    var csrfHash = $('#csrf_token').val(); // CSRF hash
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      allowOutsideClick: false,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        location.href = uuurl;

        $.ajax({
          type: 'POST',
          url: url,
          data: {
            [csrfName]: csrfHash,
          },
          beforeSend: function () {
            // setting a timeout
            // $(techerbt).html('Saving  <i class="anticon anticon-loading d-inline-block"></i> ');
          },
          success: function () {
            Swal.fire('Deleted!', 'Activated year deleted!', 'success');
          },
        });
      }
    });
  });

  $(document).on('change', '.staff_additional', function () {
    var checkbox = $(this).prop('checked');

    var stfid = $(this).data('stfid');

    if (checkbox == true) {
      $('#staff_additional_details' + stfid).removeClass('d-none');
    } else {
      $('#staff_additional_details' + stfid).addClass('d-none');
    }
  });

  $(document).on('click', '#add_staff', function () {
    var form_data = new FormData($('#add_staff_form')[0]);

    $('#add_staff_form').validate({
      // Specify validation rules
      rules: {
        staff_name: 'required',
        contact_number: 'required',
        address: 'required',
        date_of_join: 'required',
        u_type: 'required',

        staff_email: {
          required: true,
          email: true,
        },

        password: {
          required: true,
          minlength: 8,
        },
      },
      // Specify validation error messages
      messages: {
        staff_name: 'Please enter staff name!',
        contact_number: 'Please enter phone number!',
        address: 'Please enter address!',
        date_of_join: 'Please select joined date!',
        u_type: 'Please select user type!',

        staff_email: {
          required: 'Please enter your email-id!',
          email: 'Please enter a valid email-id!',
        },
        password: {
          required: 'Password required',
          minlength: 'Password must contain 8 charecters',
        },
      },
    });
    var valid = $('#add_staff_form').valid();

    if (valid == true) {
      $.ajax({
        type: 'POST',
        url: $('#add_staff_form').prop('action'),
        data: form_data,
        processData: false,
        contentType: false,
        beforeSend: function () {
          // setting a timeout
          $('#add_staff').html('Saving...<i class="bx bx-loader bx-spin"></i>');
        },
        success: function (result) {
          if ($.trim(result) == 'email_exist') {
            $('#add_staff').html('Save');
            show_failed_msg('error', 'Email already exists!', 'Failed!');
          } else if ($.trim(result) == 'big_file') {
            $('#add_staff').html('Save');
            show_failed_msg('error', 'File must be less than 500kb', 'Failed!');
          } else if ($.trim(result) == 'passed') {
            $('#add_staff_form')[0].reset();
            $('#add_staff').html('Save');
            show_success_msg('success', 'Added successfully!', 'Saved!');
          } else {
            $('#add_staff_form')[0].reset();
            $('#add_staff').html('Save');
            show_failed_msg('error', 'Max user limit reached!', 'Failed!');
          }
        },
      });
    }
  });

  $(document).on('click', '.edit_staff', function () {
    var staffid = $(this).data('id');
    var techerbt = $(this);
    var form_data = new FormData($('#edit_staff_form' + staffid)[0]);
    $('#edit_staff_form' + staffid).validate({
      // Specify validation rules
      rules: {
        staff_name: 'required',
        contact_number: 'required',
        address: 'required',
        date_of_join: 'required',
        u_type: 'required',

        staff_email: {
          required: true,
          email: true,
        },
        password: {
          minlength: 8,
        },
      },
      // Specify validation error messages
      messages: {
        staff_name: 'Please enter staff name!',
        contact_number: 'Please enter phone number!',
        address: 'Please enter address!',
        date_of_join: 'Please select joined date!',
        u_type: 'Please select user type!',

        staff_email: {
          required: 'Please enter your email-id!',
          email: 'Please enter a valid email-id!',
        },

        password: {
          minlength: 'Password must contain 8 charecters',
        },
      },
    });
    var valid = $('#edit_staff_form' + staffid).valid();

    if (valid == true) {
      $.ajax({
        type: 'POST',
        url: $('#edit_staff_form' + staffid).prop('action'),
        data: form_data,
        processData: false,
        contentType: false,
        beforeSend: function () {
          // setting a timeout
          $(techerbt).html('Saving...<i class="bx bx-loader bx-spin"></i>');
        },
        success: function (result) {
          if ($.trim(result) == 'email_exist') {
            $(techerbt).html('Save');
            show_failed_msg('error', 'Email already exists!', 'Failed!');
          } else if ($.trim(result) == 'big_file') {
            $(techerbt).html('Save');
            show_failed_msg('error', 'File must be less than 500kb', 'Failed!');
          } else {
            $(techerbt).html('Save');
            show_success_msg('success', 'Staff details updated!', 'Saved!');
          }
        },
      });
    }
  });

  $(document).on('click', '.delete_staff', function () {
    var deleteurl = $(this).data('deleteurl');
    var csrfName = $('#csrf_token').attr('name'); // CSRF Token name
    var csrfHash = $('#csrf_token').val(); // CSRF hash
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      allowOutsideClick: false,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        $.ajax({
          type: 'POST',
          url: deleteurl,
          data: {
            [csrfName]: csrfHash,
          },
          beforeSend: function () {
            // setting a timeout
            // $(techerbt).html('Saving  <i class="anticon anticon-loading d-inline-block"></i> ');
          },
          success: function () {
            Swal.fire('Deleted!', 'Staff deleted!', 'success').then(
              function () {
                window.location.href = base_url() + 'user_master?page=1';
              }
            );
          },
        });
      }
    });
  });

  $(document).on('click', '.send_pass_via_sms', function () {
    var uid = $(this).data('uid');
    var phone = $(this).data('phone');
    var csrfName = $('#csrf_token').attr('name'); // CSRF Token name
    var csrfHash = $('#csrf_token').val(); // CSRF hash

    Swal.fire({
      title: 'Are you sure?',
      text: '',
      icon: 'warning',
      showCancelButton: true,
      allowOutsideClick: false,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Send!',
    }).then((result) => {
      if (result.isConfirmed) {
        $.ajax({
          type: 'get',
          url: base_url() + 'messaging/send_credentials/',
          data: {
            uid: uid,
            phone: phone,
            [csrfName]: csrfHash,
          },
          beforeSend: function () {},
          success: function (data) {
            data = $.parseJSON(data);
            if (data.status == true) {
              show_success_msg('success', data.message, 'Saved!');
            } else {
              show_failed_msg('error', data.message, 'Failed!');
            }
          },
        });
      }
    });
  });

  $(document).on('click', '#add_vehicle', function () {
    var form_data = new FormData($('#add_vehicle_form')[0]);

    $('#add_vehicle_form').validate({
      // Specify validation rules
      rules: {
        vehiclename: 'required',
        vehiclenumber: 'required',
        driver: 'required',
      },
      // Specify validation error messages
      messages: {
        vehiclename: 'Please enter vehicle name!',
        vehiclenumber: 'Please enter vehicle number!',
        driver: 'Please select driver!',
      },
    });
    var valid = $('#add_vehicle_form').valid();

    if (valid == true) {
      $('#add_vehicle').prop('disabled', true);

      $.ajax({
        type: 'POST',
        url: $('#add_vehicle_form').prop('action'),
        data: form_data,
        processData: false,
        contentType: false,
        beforeSend: function () {
          // setting a timeout
          $('#add_vehicle').html(
            'Saving...<i class="bx bx-loader bx-spin"></i>'
          );
        },
        success: function (result) {
          if ($.trim(result) == 'passed') {
            $('#add_vehicle').html('Save');
            $('#add_vehicle_form')[0].reset();
            show_success_msg('success', 'Added successfully!', 'Saved!');
          } else {
            show_failed_msg('error', '', 'Failed!');
          }
          $('#add_vehicle').prop('disabled', false);
        },
      });
    }
  });

  $(document).on('click', '.edit_vechicle', function () {
    var vehicleid = $(this).data('id');
    var techerbt = $(this);
    var form_data = new FormData($('#edit_vehicle_form' + vehicleid)[0]);
    $('#edit_vehicle_form' + vehicleid).validate({
      // Specify validation rules
      rules: {
        vehiclename: 'required',
        vehiclenumber: 'required',
        driver: 'required',
      },
      // Specify validation error messages
      messages: {
        vehiclename: 'Please enter vehicle name!',
        vehiclenumber: 'Please enter vehicle number!',
        driver: 'Please select driver!',
      },
    });
    var valid = $('#edit_vehicle_form' + vehicleid).valid();

    if (valid == true) {
      $.ajax({
        type: 'POST',
        url: $('#edit_vehicle_form' + vehicleid).prop('action'),
        data: form_data,
        processData: false,
        contentType: false,
        beforeSend: function () {
          // setting a timeout
          $(techerbt).html('Saving...<i class="bx bx-loader bx-spin"></i>');
        },
        success: function (result) {
          if ($.trim(result) == 'passed') {
            $(techerbt).html('Save');
            show_success_msg('success', 'Vehicle details updated!', 'Saved!');
          } else {
            $(techerbt).html('Save');
            show_failed_msg('error', '', 'Failed!');
          }
        },
      });
    }
  });

  $(document).on('click', '.deletevehicle', function () {
    var deleteurl = $(this).data('deleteurl');
    var csrfName = $('#csrf_token').attr('name'); // CSRF Token name
    var csrfHash = $('#csrf_token').val(); // CSRF hash

    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this data!',
      icon: 'warning',
      showCancelButton: true,
      allowOutsideClick: false,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Send!',
    }).then((result) => {
      if (result.isConfirmed) {
        $.ajax({
          type: 'POST',
          url: deleteurl,
          data: {
            [csrfName]: csrfHash,
          },
          beforeSend: function () {
            // setting a timeout
            // $(techerbt).html('Saving  <i class="anticon anticon-loading d-inline-block"></i> ');
          },
          success: function () {
            Swal.fire('Deleted!', 'Vehicle deleted!', 'success').then(
              function () {
                window.location.href = base_url() + 'school_transport';
              }
            );
          },
        });
      }
    });
  });

  $(document).on('click', '#add_std_location', function () {
    var form_data = new FormData($('#add_stdlocation_form')[0]);

    $('#add_stdlocation_form').validate({
      // Specify validation rules
      rules: {
        students: 'required',
        location: 'required',
      },
      // Specify validation error messages
      messages: {
        students: 'Please select student!',
        location: 'Please select location!',
      },
    });
    var valid = $('#add_stdlocation_form').valid();

    if (valid == true) {
      $('#add_std_location').prop('disabled', true);
      $.ajax({
        type: 'POST',
        url: $('#add_stdlocation_form').prop('action'),
        data: form_data,
        processData: false,
        contentType: false,
        beforeSend: function () {
          // setting a timeout
          $('#add_std_location').html(
            'Saving...<i class="bx bx-loader bx-spin"></i>'
          );
        },
        success: function (result) {
          $('#add_std_location').prop('disabled', false);
          if ($.trim(result) == 'location_exist') {
            $('#add_std_location').html('Save');
            show_failed_msg('error', 'Student already exists!', 'Failed!');
          } else {
            $('#add_std_location').html('Save');
            $('#add_stdlocation_form')[0].reset();
            show_success_msg('success', 'Added successfully!', 'Saved!');
          }
        },
      });
    }
  });

  $(document).on('click', '.deletestdlocation', function () {
    var deleteurl = $(this).data('deleteurl');
    var csrfName = $('#csrf_token').attr('name'); // CSRF Token name
    var csrfHash = $('#csrf_token').val(); // CSRF hash

    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this data!',
      icon: 'warning',
      showCancelButton: true,
      allowOutsideClick: false,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Delete!',
    }).then((result) => {
      if (result.isConfirmed) {
        $.ajax({
          type: 'POST',
          url: deleteurl,
          data: {
            [csrfName]: csrfHash,
          },
          beforeSend: function () {
            // setting a timeout
            // $(techerbt).html('Saving  <i class="anticon anticon-loading d-inline-block"></i> ');
          },
          success: function () {
            Swal.fire('Deleted!', '', 'success').then(function () {
              window.location.href =
                base_url() + 'school_transport/student_location?page=1';
            });
          },
        });
      }
    });
  });

  $(document).on('input', '.easy_stu_update', function () {
    var student_id = $(this).data('student_id');

    var p_element_val = $(this).val();
    var p_element = $(this).data('p_element');
    var p_table = $(this).data('table');
    var classtableid = $(this).data('classtableid');

    var csrfName = $('#csrf_token').attr('name'); // CSRF Token name
    var csrfHash = $('#csrf_token').val(); // CSRF hash

    $.ajax({
      type: 'POST',
      url:
        base_url() +
        'student-master/student_easyedit/' +
        student_id +
        '/' +
        classtableid,
      data: {
        p_element_val: p_element_val,
        p_element: p_element,
        p_table: p_table,
        [csrfName]: csrfHash,
      },
      beforeSend: function () {},
      success: function (response) {
        if ($.trim(response) == 1) {
          $('.add_cls-' + p_element + '-' + student_id).addClass(
            'SpriteGenix-is-valid'
          );
          setTimeout(function () {
            $('.add_cls-' + p_element + '-' + student_id).removeClass(
              'SpriteGenix-is-valid'
            );
          }, 2000);

          // round_success_noti('Saved');
        } else {
          $('.add_cls-' + p_element + '-' + student_id).addClass(
            'SpriteGenix-is-invalid'
          );
          setTimeout(function () {
            $('.add_cls-' + p_element + '-' + student_id).removeClass(
              'SpriteGenix-is-invalid'
            );
          }, 2000);
        }
      },
    });
  });

  $(document).on('change', '.easy_edit_student', function () {
    var student_id = $(this).data('student_id');
    var p_element_val = $(this).val();
    var p_element = $(this).data('p_element');
    var p_table = $(this).data('table');
    var classtableid = $(this).data('classtableid');

    var csrfName = $('#csrf_token').attr('name'); // CSRF Token name
    var csrfHash = $('#csrf_token').val(); // CSRF hash

    $.ajax({
      type: 'POST',
      url:
        base_url() +
        'student-master/student_easyedit/' +
        student_id +
        '/' +
        classtableid,
      data: {
        p_element_val: p_element_val,
        p_element: p_element,
        p_table: p_table,
        [csrfName]: csrfHash,
      },
      beforeSend: function () {},
      success: function (response) {
        if ($.trim(response) == 1) {
          $('.add_cls-' + p_element + '-' + student_id).addClass(
            'SpriteGenix-is-valid'
          );
          setTimeout(function () {
            $('.add_cls-' + p_element + '-' + student_id).removeClass(
              'SpriteGenix-is-valid'
            );
          }, 2000);

          // round_success_noti('Saved');
        } else {
          $('.add_cls-' + p_element + '-' + student_id).addClass(
            'SpriteGenix-is-invalid'
          );
          setTimeout(function () {
            $('.add_cls-' + p_element + '-' + student_id).removeClass(
              'SpriteGenix-is-invalid'
            );
          }, 2000);
        }
      },
    });
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

  // ///calender////
  $(document).on('click', '.add_cal_event', function () {
    var tid = $(this).data('tid');
    $('#er_mes' + tid).html('');
    var title = $.trim($('#title' + tid).val());
    var start = $.trim($('#start' + tid).val());
    if (title != '' && start != '') {
      $('#add_cal_event_form' + tid).submit();
    } else {
      $('#er_mes' + tid).html(
        '<span class="text-danger px-3 mb-3 d-block">Title & Start date is required</span>'
      );
    }
  });

  $(document).on('click', '#add_exam_cate', function () {
    var form_data = new FormData($('#exams_add_cate_form')[0]);

    $('#exams_add_cate_form').validate({
      // Specify validation rules
      rules: {
        exam_cate_name: 'required',
      },
      // Specify validation error messages
      messages: {
        exam_cate_name: 'Please enter exam category name!',
      },
    });
    var valid = $('#exams_add_cate_form').valid();

    if (valid == true) {
      $('#add_exam_cate').prop('disabled', true);

      $.ajax({
        type: 'POST',
        url: $('#exams_add_cate_form').prop('action'),
        data: form_data,
        processData: false,
        contentType: false,
        beforeSend: function () {
          // setting a timeout
          $('#add_exam_cate').html(
            'Saving...<i class="bx bx-loader bx-spin"></i>'
          );
        },
        success: function () {
          $('#add_exam_cate').html('Save');
          show_success_msg('success', 'Category added successfully!', 'Saved!');
          $('#exams_add_cate_form')[0].reset();
          $('#add_exam_cate').prop('disabled', false);
        },
      });
    }
  });

  $(document).on('click', '.edit_cate_exam', function () {
    var noticedid = $(this).data('id');
    var techerbt = $(this);
    var form_data = new FormData($('#edit_exam_cate_form' + noticedid)[0]);
    $('#edit_exam_cate_form' + noticedid).validate({
      // Specify validation rules
      rules: {
        exam_cate_name: 'required',
      },
      // Specify validation error messages
      messages: {
        exam_cate_name: 'Please enter exam category name!',
      },
    });
    var valid = $('#edit_exam_cate_form' + noticedid).valid();

    if (valid == true) {
      $.ajax({
        type: 'POST',
        url: $('#edit_exam_cate_form' + noticedid).prop('action'),
        data: form_data,
        processData: false,
        contentType: false,
        beforeSend: function () {
          // setting a timeout
          $(techerbt).html('Saving...<i class="bx bx-loader bx-spin"></i>');
        },
        success: function () {
          $(techerbt).html('Save');
          show_success_msg('success', 'Category updated!', 'Saved!');
        },
      });
    }
  });

  $(document).on('click', '.deleteexamcate', function () {
    var deleteurl = $(this).data('deleteurl');
    var csrfName = $('#csrf_token').attr('name'); // CSRF Token name
    var csrfHash = $('#csrf_token').val(); // CSRF hash

    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this data!',
      icon: 'warning',
      showCancelButton: true,
      allowOutsideClick: false,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Delete!',
    }).then((result) => {
      if (result.isConfirmed) {
        $.ajax({
          type: 'POST',
          url: deleteurl,
          data: {
            [csrfName]: csrfHash,
          },
          beforeSend: function () {
            // setting a timeout
            // $(techerbt).html('Saving  <i class="anticon anticon-loading d-inline-block"></i> ');
          },
          success: function () {
            Swal.fire('Deleted!', 'Category has been deleted!', 'success').then(
              function () {
                window.location.href = base_url() + 'exams/exam_configuration';
              }
            );
          },
        });
      }
    });
  });

  $(document).on('click', '#add_main_exam', function () {
    var form_data = new FormData($('#add_main_exam_form')[0]);

    $('#add_main_exam_form').validate({
      // Specify validation rules
      rules: {
        exam_name: 'required',
        category: 'required',
        start_date: 'required',
        end_date: 'required',
      },
      // Specify validation error messages
      messages: {
        exam_name: 'Please enter exam name!',
        category: 'Please select exam category!',
        start_date: 'Please select exam start date!',
        end_date: 'Please select exam end date!',
      },
    });
    var valid = $('#add_main_exam_form').valid();

    if (valid == true) {
      $('#add_main_exam').prop('disabled', true);

      $.ajax({
        type: 'POST',
        url: $('#add_main_exam_form').prop('action'),
        data: form_data,
        processData: false,
        contentType: false,
        beforeSend: function () {
          // setting a timeout
          $('#add_main_exam').html(
            'Saving...<i class="bx bx-loader bx-spin"></i>'
          );
        },
        success: function () {
          $('#add_main_exam').html('Save');
          show_success_msg('success', 'Exam added successfully!', 'Saved!');
          $('#add_main_exam_form')[0].reset();
          $('#add_main_exam').prop('disabled', false);
        },
      });
    }
  });

  $(document).on('click', '.edit_main_exam', function () {
    var noticedid = $(this).data('id');
    var techerbt = $(this);
    var form_data = new FormData($('#edit_main_exam_form' + noticedid)[0]);
    $('#edit_main_exam_form' + noticedid).validate({
      // Specify validation rules
      rules: {
        exam_name: 'required',
        category: 'required',
        start_date: 'required',
        end_date: 'required',
      },
      // Specify validation error messages
      messages: {
        exam_name: 'Please enter exam name!',
        category: 'Please select exam category!',
        start_date: 'Please select exam start date!',
        end_date: 'Please select exam end date!',
      },
    });
    var valid = $('#edit_main_exam_form' + noticedid).valid();

    if (valid == true) {
      $.ajax({
        type: 'POST',
        url: $('#edit_main_exam_form' + noticedid).prop('action'),
        data: form_data,
        processData: false,
        contentType: false,
        beforeSend: function () {
          // setting a timeout
          $(techerbt).html('Saving...<i class="bx bx-loader bx-spin"></i>');
        },
        success: function () {
          $(techerbt).html('Save');
          show_success_msg('success', 'Exam updated!', 'Saved!');
        },
      });
    }
  });

  $(document).on('click', '.delete_main_exam', function () {
    var deleteurl = $(this).data('deleteurl');
    var csrfName = $('#csrf_token').attr('name'); // CSRF Token name
    var csrfHash = $('#csrf_token').val(); // CSRF hash

    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this data!',
      icon: 'warning',
      showCancelButton: true,
      allowOutsideClick: false,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Delete!',
    }).then((result) => {
      if (result.isConfirmed) {
        $.ajax({
          type: 'POST',
          url: deleteurl,
          data: {
            [csrfName]: csrfHash,
          },
          beforeSend: function () {
            // setting a timeout
            // $(techerbt).html('Saving  <i class="anticon anticon-loading d-inline-block"></i> ');
          },
          success: function () {
            Swal.fire('Deleted!', 'Exam has been deleted!', 'success').then(
              function () {
                window.location.href = base_url() + 'exams/main_exam';
              }
            );
          },
        });
      }
    });
  });

  $(document).on('click', '#add_main_exam_subject', function () {
    var form_data = new FormData($('#add_main_exam_subject_form')[0]);

    $('#add_main_exam_subject_form').validate({
      // Specify validation rules
      rules: {
        date: 'required',
        from: 'required',
        to: 'required',
        exam_for_subject: 'required',
        exam_for_class: 'required',
      },
      // Specify validation error messages
      messages: {
        date: 'Please select exam date!',
        from: 'Please select exam start time!',
        to: 'Please select exam end time!',
        exam_for_subject: 'Please select exam subject!',
        exam_for_class: 'Please select class!',
      },
    });
    var valid = $('#add_main_exam_subject_form').valid();

    if (valid == true) {
      $('#add_main_exam_subject').prop('disabled', true);

      $.ajax({
        type: 'POST',
        url: $('#add_main_exam_subject_form').prop('action'),
        data: form_data,
        processData: false,
        contentType: false,
        beforeSend: function () {
          // setting a timeout
          $('#add_main_exam_subject').html(
            'Saving...<i class="bx bx-loader bx-spin"></i>'
          );
        },
        success: function () {
          $('#add_main_exam_subject').html('Save');

          show_success_msg('success', 'Exam subject added!', 'Saved!');

          $('#add_main_exam_subject_form')[0].reset();
          $('#add_main_exam_subject').prop('disabled', false);
        },
      });
    }
  });

  $(document).on('click', '.delete_main_exam_subject', function () {
    var deleteurl = $(this).data('deleteurl');
    var main_ex_id = $(this).data('main_ex_id');
    var csrfName = $('#csrf_token').attr('name'); // CSRF Token name
    var csrfHash = $('#csrf_token').val(); // CSRF hash

    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this data!',
      icon: 'warning',
      showCancelButton: true,
      allowOutsideClick: false,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Delete!',
    }).then((result) => {
      if (result.isConfirmed) {
        $.ajax({
          type: 'POST',
          url: deleteurl,
          data: {
            [csrfName]: csrfHash,
          },
          beforeSend: function () {
            // setting a timeout
            // $(techerbt).html('Saving  <i class="anticon anticon-loading d-inline-block"></i> ');
          },
          success: function () {
            Swal.fire(
              'Deleted!',
              'Exam subject has been deleted!',
              'success'
            ).then(function () {
              window.location.href =
                base_url() + 'exams/main_exam_time_table/' + main_ex_id;
            });
          },
        });
      }
    });
  });

  $(document).on('click', '.edit_main_exam_form', function () {
    var noticedid = $(this).data('id');
    var techerbt = $(this);
    var form_data = new FormData(
      $('#edit_main_exam_subject_form' + noticedid)[0]
    );
    $('#edit_main_exam_subject_form' + noticedid).validate({
      // Specify validation rules
      rules: {
        date: 'required',
        from: 'required',
        to: 'required',
        exam_for_subject: 'required',
        exam_for_class: 'required',
      },
      // Specify validation error messages
      messages: {
        date: 'Please select exam date!',
        from: 'Please select exam start time!',
        to: 'Please select exam end time!',
        exam_for_subject: 'Please select exam subject!',
        exam_for_class: 'Please select class!',
      },
    });
    var valid = $('#edit_main_exam_subject_form' + noticedid).valid();

    if (valid == true) {
      $.ajax({
        type: 'POST',
        url: $('#edit_main_exam_subject_form' + noticedid).prop('action'),
        data: form_data,
        processData: false,
        contentType: false,
        beforeSend: function () {
          // setting a timeout
          $(techerbt).html('Saving...<i class="bx bx-loader bx-spin"></i>');
        },
        success: function () {
          $(techerbt).html('Save');
          show_success_msg('success', 'Exam subject updated!', 'Saved!');
        },
      });
    }
  });

  $(document).on('click', '.publish_exam_via_sms', function () {
    var exid = $(this).data('exid');
    var boxid = $(this).data('boxid');
    var csrfName = $('#csrf_token').attr('name'); // CSRF Token name
    var csrfHash = $('#csrf_token').val(); // CSRF hash

    Swal.fire({
      title: 'Are you sure?',
      text: 'Please check all subjects are valuated or not before notify!',
      icon: 'warning',
      showCancelButton: true,
      allowOutsideClick: false,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, notify!',
    }).then((result) => {
      if (result.isConfirmed) {
        $.ajax({
          type: 'POST',
          url:
            base_url() +
            'messaging/publish_exam_via_sms/' +
            exid +
            '?classid=' +
            boxid,
          data: {
            [csrfName]: csrfHash,
          },
          beforeSend: function () {
            $('#btttn' + boxid).html(
              'Please wait...<i class="bx bx-loader bx-spin"></i>'
            );
          },
          success: function (data) {
            $('#errorbox' + boxid).html(data);
            $('#btttn' + boxid).html('Publish via SMS');
          },
        });
      }
    });
  });

  $(document).on('click', '.promote_student', function () {
    var studentid = $(this).data('id');
    var studentbt = $(this);
    var form_data = new FormData($('#promote_form' + studentid)[0]);
    $('promote_student').prop('disabled', true);
    $.ajax({
      type: 'POST',
      url: $('#promote_form' + studentid).prop('action'),
      data: form_data,
      processData: false,
      contentType: false,
      beforeSend: function () {
        // setting a timeout
        $(studentbt).html('Promoting...<i class="bx bx-loader bx-spin"></i>');
      },
      success: function (data) {
        if ($.trim(data) == 'done') {
          $(studentbt).html('Save');
          show_success_msg('success', 'Student promoted!', 'Saved!');
          $('#promote_form' + studentid)[0].reset();
          $('.close').click();
          $('.modal-backdrop').remove();
          // $('body').removeClass('modal-open');
        } else if ($.trim(data) == 'exist') {
          $(studentbt).html('Promote');
          show_failed_msg('error', 'Student already exist!', 'Failed!');
        }

        $('promote_student').prop('disabled', false);
      },
    });
  });

  $(document).on('change', '.checkingabsentbox', function () {
    if ($(this).prop('checked')) {
      $(this).siblings('.absentcheckinput').val(1);
    } else {
      $(this).siblings('.absentcheckinput').val(0);
    }
  });

  $(document).on('click', '.publish_exam_result_via_sms', function () {
    var exid = $(this).data('exid');
    var boxid = $(this).data('boxid');
    var csrfName = $('#csrf_token').attr('name'); // CSRF Token name
    var csrfHash = $('#csrf_token').val(); // CSRF hash

    Swal.fire({
      title: 'Are you sure?',
      text: 'Please check all subjects are valuated or not before notify!',
      icon: 'warning',
      showCancelButton: true,
      allowOutsideClick: false,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, notify!',
    }).then((result) => {
      if (result.isConfirmed) {
        $.ajax({
          type: 'POST',
          url:
            base_url() +
            'messaging/publish_exam_result_via_sms/' +
            exid +
            '?classid=' +
            boxid,
          data: {
            [csrfName]: csrfHash,
          },
          beforeSend: function () {
            $('#btttnn' + boxid).html(
              'Please wait...<i class="bx bx-loader bx-spin"></i>'
            );
          },
          success: function (data) {
            $('#errorbox' + boxid).html(data);
            $('#btttnn' + boxid).html('Publish result via SMS');
          },
        });
      }
    });
  });

  $(document).on('change', '.exam_for_grade', function () {
    var pt = $(this).val();

    if (pt == 'grade') {
      $('.remove_grade').removeClass('d-none');
      $('.remove_marks').addClass('d-none');
    } else {
      $('.remove_grade').addClass('d-none');
      $('.remove_marks').removeClass('d-none');
    }
  });

  $(document).on('change', '#classselect', function () {
    var clas_val = $(this).val();
    if (clas_val != '') {
      location.href = base_url() + 'health?class=' + clas_val;
    }
  });

  $(document).on('input', '.health_weight', function () {
    var studentid = $(this).data('student_id');

    var weight = $(this).val();

    var csrfName = $('#csrf_token').attr('name'); // CSRF Token name
    var csrfHash = $('#csrf_token').val(); // CSRF hash

    if (weight != '' && weight != 0) {
      $.ajax({
        type: 'POST',
        url: base_url() + '/health/add_health_weight',
        data: {
          student_id: studentid,
          weight: weight,
          [csrfName]: csrfHash,
        },
        beforeSend: function () {},
        success: function (data) {
          if ($.trim(data) == 1) {
            show_success_msg('success', '', 'saved!');
          } else {
            show_failed_msg('error', '', 'failed');
          }
        },
      });
    }
  });

  $(document).on('input', '.health_height', function () {
    var studentid = $(this).data('student_id');
    var height = $(this).val();

    var csrfName = $('#csrf_token').attr('name'); // CSRF Token name
    var csrfHash = $('#csrf_token').val(); // CSRF hash

    if (height != '' && height != 0) {
      $.ajax({
        type: 'POST',
        url: base_url() + '/health/add_health_height',
        data: {
          student_id: studentid,
          height: height,
          [csrfName]: csrfHash,
        },
        beforeSend: function () {},
        success: function (data) {
          if ($.trim(data) == 1) {
            show_success_msg('success', 'saved!');
          } else {
            show_failed_msg('error', 'failed');
          }
        },
      });
    }
  });

  $(document).on('click', '.notify_exam_result', function () {
    var exid = $(this).data('exid');
    var boxid = $(this).data('boxid');
    var csrfName = $('#csrf_token').attr('name'); // CSRF Token name
    var csrfHash = $('#csrf_token').val(); // CSRF hash

    Swal.fire({
      title: 'Are you sure?',
      text: 'Please check all subjects are valuated or not before notify!',
      icon: 'warning',
      showCancelButton: true,
      allowOutsideClick: false,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, notify!',
    }).then((result) => {
      if (result.isConfirmed) {
        $.ajax({
          type: 'POST',
          url:
            base_url() +
            'exams/notify_main_exam_result/' +
            exid +
            '?classid=' +
            boxid,
          data: {
            [csrfName]: csrfHash,
          },
          beforeSend: function () {},
          success: function (data) {
            if ($.trim(data) == 1) {
              Swal.fire('', 'Notification Sent!', 'success');
            } else {
              Swal.fire('', 'Failed', 'danger');
            }
          },
        });
      }
    });
  });

  //add_notice
  $(document).on('click', '#send_notice', function () {
    var form_data = new FormData($('#notice_add_form')[0]);

    $('#notice_add_form').validate({
      // Specify validation rules
      rules: {
        subject: 'required',
        notice: 'required',
      },
      // Specify validation error messages
      messages: {
        notice: 'please fill this field',
      },
    });
    var valid = $('#notice_add_form').valid();
    var summerrich = $.trim($('#summernote').val());
    var strippedword = summerrich.replace(/(<([^>]+)>)/gi, '');
    var final_richcontent = strippedword.replace(/&nbsp;/g, '');
    $('#final_richcontent-error').html('');

    if (valid == true) {
      if (final_richcontent != '') {
        $('#send_notice').prop('disabled', true);
        $.ajax({
          type: 'POST',
          url: $('#notice_add_form').prop('action'),
          data: form_data,
          processData: false,
          contentType: false,
          beforeSend: function () {
            // setting a timeout
            $('#send_notice').html(
              'Saving  <i class="anticon anticon-loading d-inline-block"></i> '
            );
          },
          success: function () {
            $('#send_notice').html('Saved');
            show_success_msg('success', 'Notice Sent successfully!');
            $('#notice_add_form')[0].reset();

            $('#summernote').summernote('reset');

            $('#send_notice').prop('disabled', false);
          },
        });
      } else {
        $('#final_richcontent-error').html('This field is required.');
      }
    }
  });

  $(document).on('click', '.deletenote', function () {
    var deleteurl = $(this).data('deleteurl');
    var csrfName = $('#csrf_token').attr('name'); // CSRF Token name
    var csrfHash = $('#csrf_token').val(); // CSRF hash

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      allowOutsideClick: false,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        $.ajax({
          type: 'GET',
          url: deleteurl,
          data: {
            [csrfName]: csrfHash,
          },
          beforeSend: function () {
            // setting a timeout
            // $(techerbt).html('Saving  <i class="bx bx-loader spin_me d-inline-block"></i> ');
          },
          success: function () {
            Swal.fire('Deleted!', 'Notice deleted.', 'success').then(
              function () {
                window.location.href = base_url() + 'notice';
              }
            );
          },
        });
      }
    });
  });

  //edit notice
  $(document).on('click', '.edit_notice', function () {
    var noticedid = $(this).data('id');
    var techerbt = $(this);
    var form_data = new FormData($('#edit_notice_form' + noticedid)[0]);
    $('#edit_notice_form' + noticedid).validate({
      // Specify validation rules
      rules: {
        notice: 'required',
      },
      // Specify validation error messages
      messages: {
        notice: 'please fill this field',
      },
    });
    var valid = $('#edit_notice_form' + noticedid).valid();

    if (valid == true) {
      $.ajax({
        type: 'POST',
        url: $('#edit_notice_form' + noticedid).prop('action'),
        data: form_data,
        processData: false,
        contentType: false,
        beforeSend: function () {
          // setting a timeout
          $(techerbt).html(
            'Saving  <i class="anticon anticon-loading d-inline-block"></i> '
          );
        },
        success: function () {
          $(techerbt).html('Saved');
          show_success_msg('success', 'Notice updated!');
        },
      });
    }
  });

  $(document).on('click', '.delete_product_cat', function () {
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
  });

  $(document).on('change', '.add_and_remove_fees', function () {
    var total = $('#total').val();
    var main_total = $('#main_total').val();

    var thiss = $(this);
    var amount = $(this).data('amount');

    $.ajax({
      type: 'POST',
      url: $('#add_and_remove_fees_form').prop('action'),
      data: $('#add_and_remove_fees_form').serialize(),
      beforeSend: function () {},
      success: function (data) {
        if ($.trim(data) == 1) {
          show_success_msg('success', 'saved!');

          if ($(thiss).is(':checked')) {
            $('#total').val(parseFloat(total) + parseFloat(amount));
            $('#main_total').val(parseFloat(main_total) + parseFloat(amount));
          } else {
            $('#total').val(parseFloat(total) - parseFloat(amount));
            $('#main_total').val(parseFloat(main_total) - parseFloat(amount));
          }
        } else {
          show_failed_msg('Failed', 'failed');
        }
      },
    });
  });

  $(document).on('click', '.add_cat_btn', function () {
    $('#catt_box').toggle();
  });

  $(document).on('click', '.delete_rec', function () {
    var urld = $(this).data('url');
    var nid = $(this).data('nid');
    var retval = false;
    Swal.fire({
      title: 'Reason for delete?',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off',
      },
      showCancelButton: true,
      confirmButtonText: 'Delete',
      showLoaderOnConfirm: true,
      preConfirm: (reason) => {
        if ($.trim(reason) !== '') {
          if (reason.length > 5) {
            var csrfName = $('#csrf_token').attr('name'); // CSRF Token name
            var csrfHash = $('#csrf_token').val(); // CSRF hash

            $.ajax({
              type: 'POST',
              url: base_url() + '/fees_and_payments/add_reason/' + nid,
              data: {
                [csrfName]: csrfHash,
                delete_reason: reason,
              },
              beforeSend: function () {},
              success: function (response) {
                if ($.trim(response) == 1) {
                  // alert(response)
                  retval = true;
                  return retval;
                } else {
                  Swal.showValidationMessage(`Failed`);
                  return retval;
                }
              },
              error: function () {
                alert('error');
                return retval;
              },
            });
          } else {
            Swal.showValidationMessage(`Maximum 5 characters required`);
            return retval;
          }
        } else {
          Swal.showValidationMessage(
            `Enter reason before you delete any voucher`
          );
          return retval;
        }
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed) {
        location.href = urld;
      }
    });
  });

  $(document).on('click', '#add_new_category', function () {
    var parent_category = $.trim($('#parent_category').val());
    var new_category = $.trim($('#new_category').val());

    var csrfName = $('#csrf_token').attr('name'); // CSRF Token name
    var csrfHash = $('#csrf_token').val(); // CSRF hash

    if (new_category != '') {
      $.ajax({
        type: 'POST',
        url: base_url() + 'website_management/add_cat_from_ajax',
        data: {
          cat_name: new_category,
          parent: parent_category,
          [csrfName]: csrfHash,
        },
        success: function (cat_result) {
          if (cat_result != 0) {
            $('#catt_box').toggle();
            $('#parent_category').val('');
            $('#new_category').val('');
            $('#post_category').append(
              '<option value="' +
                cat_result +
                '" selected>' +
                new_category +
                '</option>'
            );
            $('#post_category').focus();
          }
        },
      });
    }
  });

  $(document).on('click', '.delete_featured', function () {
    var urll = $(this).data('deleteurl');

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, remove it!',
    }).then((result) => {
      if (result.isConfirmed) {
        $.ajax({
          url: urll,
          success: function (result) {
            if ($.trim(result) == 1) {
              Swal.fire(
                'Deleted!',
                'Featured image has been removed.',
                'success'
              );
              location.reload();
            } else {
              Swal.fire('Failed!', '', 'error');
            }
          },
        });
      }
    });
  });

  $(document).on('click', '.delete_thumb', function () {
    var urll = $(this).data('deleteurl');

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, remove it!',
    }).then((result) => {
      if (result.isConfirmed) {
        $.ajax({
          url: urll,
          success: function (result) {
            if ($.trim(result) == 1) {
              Swal.fire('Deleted!', 'Thumb image has been removed.', 'success');
              location.reload();
            } else {
              Swal.fire('Failed!', '', 'error');
            }
          },
        });
      }
    });
  });

  $(document).on('click', '#send_email', function () {
    var email_to = $('#email_to').val();
    var email_subject = $('#email_subject').val();
    var email_template = $('#email_template').val();
    var emailtoReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;

    var emailList = email_to.split(',');

    var csrfName = $('#csrf_token').attr('name'); // CSRF Token name
    var csrfHash = $('#csrf_token').val(); // CSRF hash

    $('#emailmsg').html('');
    $('#em_sub_msg').html('');
    $('#em_temp_msg').html('');

    for (var i = 0; i < emailList.length; i++) {
      var email = emailList[i].trim(); // Remove whitespace around email address

      if ($.trim(email) == '') {
        $('#emailmsg').html(
          '<span class="ct_error">Please enter email!</span>'
        );
        return; // Stop further processing if any email is empty
      } else if (!emailtoReg.test(email)) {
        $('#emailmsg').html('<span class="ct_error">Email not valid!</span>');
        return; // Stop further processing if any email is invalid
      }
    }

    if ($.trim(email_subject) == '') {
      $('#em_sub_msg').html(
        '<span class="ct_error">Please enter subject!</span>'
      );
    } else if ($.trim(email_template) == '') {
      $('#em_temp_msg').html(
        '<span class="ct_error">Please add your email template!</span>'
      );
    } else {
      $.ajax({
        url: base_url() + 'e-mailer/send-email',
        type: 'POST',
        data: {
          email_to: email_to,
          email_subject: email_subject,
          email_template: email_template,
          [csrfName]: csrfHash,
        },
        beforeSend: function () {
          $('#send_email').html(
            'Sending...<i class="icofont-spinner-alt-1"></i>'
          );
        },
        success: function (result) {
          $('#send_email').html('Send');
          $('#suc_msg').html(result);
          $('.tag_remove').click();
          $('#send_email_form')[0].reset();
        },
      });
    }
  });

  $(document).on('change', '.otamtSelect', function () {
    var selectedValue = $(this).val();
    if (selectedValue === 'custom') {
      $('.ot_div_enable').addClass('d-block');
      $('.ot_div_enable').removeClass('d-none');
    } else {
      $('.ot_div_enable').addClass('d-none');
      $('.ot_div_enable').removeClass('d-block');
    }
  });

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

  function base_url() {
    var baseurl = $('#base_url').val();
    return baseurl;
  }

  function round_of_value() {
    var round_of_value = $('#round_of_value').val();
    return round_of_value;
  }
});
