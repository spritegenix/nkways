$(document).ready(function () {
  var current_url = location.href;

  // $(document).on('click','.formula_save',function(){
  $(document).on('blur', '.formula_input', function () {
    var thisid = $(this).data('id');
    var formula_text = $('#formula_input' + thisid).val();

    const json_fields = $('#json_fields').val();

    const to_replace = new RegExp('[a-zA-Z]', 'g');
    const replacement = 1;
    const checking_formula = formula_text.replace(to_replace, replacement);

    const allowedCharsRegex = /^[\d+\-*/().\s]+$/;

    var csrfName = $('#csrf_token').attr('name'); // CSRF Token name
    var csrfHash = $('#csrf_token').val(); // CSRF hash

    var checkreg = true;
    if ($.trim(formula_text) != '') {
      checkreg = allowedCharsRegex.test(checking_formula);
    }

    // Remove all non-bracket characters from the string
    var bracketsOnly = formula_text.replace(/[^\(\)\[\]\{\}]/g, '');

    // Continuously remove pairs of matching brackets until none are left
    var pattern = /\(\)|\[\]|\{\}/;
    while (pattern.test(bracketsOnly)) {
      bracketsOnly = bracketsOnly.replace(pattern, '');
    }

    // If there are no brackets left, it means they are properly closed
    if (bracketsOnly.length === 0) {
      // alert(true);
    } else {
      checkreg = false;
    }

    if (checkreg) {
      try {
        var existss = 1;

        const checku = formula_text.split(/[.\-=*/()_+]/);
        var varib = '';

        $.each(checku, function (index, fvalue) {
          if ($.trim(fvalue) != '') {
            if (isNaN(fvalue) == true) {
              const hasValue = Object.values(JSON.parse(json_fields)).includes(
                $.trim(fvalue)
              );

              if (hasValue == false) {
                existss = 0;
                varib += '<b>' + fvalue + '</b>';
                // show_success_msg('error','Variable '+varib+' is invalid!');
                return false;
              }
            }
          } else {
            existss = 1;
          }
        });

        if (existss == 1) {
          $.ajax({
            type: 'POST',
            url: base_url() + '/payroll/save_formula/' + thisid,
            data: {
              formula: formula_text,
              [csrfName]: csrfHash,
            },
            beforeSend: function () {},
            success: function (data) {
              if ($.trim(data) == 1) {
                show_success_msg('success', 'Good!');
              } else {
                show_success_msg('error', 'failed');
              }
            },
          });
        } else {
          show_success_msg('error', 'Variable ' + varib + ' is invalid!');
        }
      } catch (e) {
        show_success_msg('error', 'Syntax wrong!');
      }
    } else {
      show_success_msg('error', 'Syntax wrong!');
    }
  });

  function containsNumbers(str) {
    return /\d/.test(str);
  }

  $(document).on('click', '.set_value', function () {
    var this_btn = $(this);
    var box_id = $(this_btn).data('boxid');

    $(this_btn).addClass('save_value');
    $(this_btn).removeClass('set_value');
    $(this_btn).html(
      '<span class="text-success"><b><i class="bx bx-check"></i></b> Save<span>'
    );

    $('.manual_box' + box_id).addClass('SpriteGenix-simple-input');
    $('.manual_box' + box_id).removeClass('SpriteGenix-simple-input-disabled');
    $('.manual_box' + box_id).attr('readonly', false);
  });

  $(document).on('click', '.save_value', function () {
    var this_btn = $(this);
    var box_id = $(this_btn).data('boxid');
    $(this_btn).removeClass('save_value');
    $(this_btn).addClass('set_value');
    $(this_btn).html('+ Set value');

    $('.manual_box' + box_id).removeClass('SpriteGenix-simple-input');
    $('.manual_box' + box_id).addClass('SpriteGenix-simple-input-disabled');
    $('.manual_box' + box_id).attr('readonly', true);

    var month_details = $('#month_details').val();
    var array_salary_id = [];
    var array_employee_id = [];
    var array_field_id = [];
    var array_manual_value = [];

    $('.manual_box' + box_id).each(function () {
      var salary_id = $(this).data('salary_id');
      var field_id = $(this).data('field_id');
      var employee_id = $(this).data('employee_id');
      var manual_value = $(this).val();

      console.log(
        month_details +
          '---' +
          salary_id +
          '---' +
          field_id +
          '---' +
          employee_id
      );

      array_salary_id.push(salary_id);
      array_employee_id.push(employee_id);
      array_field_id.push(field_id);
      array_manual_value.push(manual_value);
    });

    var csrfName = $('#csrf_token').attr('name'); // CSRF Token name
    var csrfHash = $('#csrf_token').val(); // CSRF hash

    $.ajax({
      type: 'POST',
      url: base_url() + '/payroll/save_manual_payroll_field_values',
      data: {
        month_details: month_details,
        salary_id: array_salary_id,
        employee_id: array_employee_id,
        field_id: array_field_id,
        manual_value: array_manual_value,
        [csrfName]: csrfHash,
      },
      beforeSend: function () {},
      success: function (data) {
        if ($.trim(data) == 1) {
          show_success_msg('success', 'saved!');
          setTimeout(function () {
            location.reload();
          }, 1000);
        } else {
          show_success_msg('error', 'failed');
        }
      },
    });
  });

  $(document).on('click', '.edit_payfield', function () {
    var this_id = $(this).data('id');
    var ed_payroll_form = $('#ed_payroll_form' + this_id);
    var ed_field_name = $('#ed_field_name' + this_id).val();

    var words = '';

    $('.formula_input').each(function () {
      words += $(this).val();
    });

    if (words.includes(ed_field_name)) {
      show_success_msg(
        'error',
        ' Failed!, <b>"' +
          ed_field_name +
          '"</b> is used in formula, please remove that before edit.'
      );
    } else {
      show_success_msg('success', 'Saved!');
      $(ed_payroll_form).submit();
    }
  });

  $('#check_all_user').click(function () {
    $('.user_check_box').prop('checked', $(this).prop('checked'));
  });

  $(document).on('click', '#manual_punch', function () {
    var form_data = new FormData($('#manual_punch_form')[0]);

    $('#manual_punch_form').validate({
      // Specify validation rules
      rules: {
        punch_employee: 'required',
        punch_date: 'required',
        punch_time: 'required',
      },
      // Specify validation error messages
      messages: {},
    });

    var valid = $('#manual_punch_form').valid();

    if (valid == true) {
      $.ajax({
        type: 'POST',
        url: $('#manual_punch_form').prop('action'),
        data: form_data,
        processData: false,
        contentType: false,
        beforeSend: function () {
          // setting a timeout
          $('#manual_punch').html(
            'Saving...<i class="bx bx-loader bx-spin"></i> '
          );
        },
        success: function () {
          $('#manual_punch').html('Save');
          $('#manual_punch_form')[0].reset();
          show_success_msg('success', 'Attendance log added successfully!');
        },
      });
    }
  });

  $(document).on('click', '.edit_punch_btn', function () {
    var timetbdid = $(this).data('id');
    var techerbt = $(this);
    var form_data = new FormData($('#edit_punch_btn_form' + timetbdid)[0]);
    $('#edit_punch_btn_form' + timetbdid).validate({
      // Specify validation rules
      rules: {
        punch_date: 'required',
        punch_time: 'required',
      },
      // Specify validation error messages
      messages: {},
    });

    var valid = $('#edit_punch_btn_form' + timetbdid).valid();

    if (valid == true) {
      $.ajax({
        type: 'POST',
        url: $('#edit_punch_btn_form' + timetbdid).prop('action'),
        data: form_data,
        processData: false,
        contentType: false,
        beforeSend: function () {
          // setting a timeout
          $(techerbt).html('Saving...<i class="bx bx-loader bx-spin"></i>');
        },
        success: function () {
          $(techerbt).html('Save');
          show_success_msg('success', 'Attendance log updated!');
        },
      });
    }
  });

  $(document).on('blur', '.punch_note', function () {
    var punch_id = $(this).data('id');
    var save_url = $(this).data('save_url');
    var punch_note = $(this).val();
    var csrfName = $('#csrf_token').attr('name'); // CSRF Token name
    var csrfHash = $('#csrf_token').val(); // CSRF hash

    if ($.trim(punch_note) != '') {
      $.ajax({
        type: 'POST',
        url: save_url,
        data: {
          note: punch_note,
          [csrfName]: csrfHash,
        },
        beforeSend: function () {},
        success: function () {
          show_success_msg('success', 'Note saved!');
        },
      });
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
});
