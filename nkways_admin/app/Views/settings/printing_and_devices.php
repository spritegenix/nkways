<!-- ////////////////////////// TOP BAR START ///////////////////////// -->
<div class="sub_topbar d-flex">
    <div class="right_bar d-flex justify-content-between w-100">

        <a class="my-auto ait-ms-2 href_loader cursor-pointer font-size-topbar go_back_or_close text-SpriteGenix-red " title="Back">
            <i class="bx bx-arrow-back"></i>
        </a>

        <nav aria-label="breadcrumb">
            <ol class="breadcrumb SpriteGenix-breadcrumb mb-0 p-0">
                <li class="breadcrumb-item">
                    <a href="<?= base_url(); ?>" class="href_loader"><i class="bx bx-home-alt text-SpriteGenix-red"></i></a>
                </li>

                <li class="breadcrumb-item active" aria-current="page">
                    <b class="page_heading text-dark">Printers & Devices</b>
                </li>
            </ol>
        </nav>


        <div class="d-flex">

            <a class="my-auto ms-2 text-dark cursor-pointer font-size-topbar href_loader" title="Refresh" onclick="location.reload();">
                <i class="bx bx-refresh"></i>
            </a>
            <a class="my-auto ms-2 text-SpriteGenix-red href_loader cursor-pointer font-size-topbar" href="<?= base_url() ?>" title="Back">
                <i class="bx bxs-category"></i>
            </a>
        </div>

    </div>
</div>
<!-- ////////////////////////// TOP BAR END ///////////////////////// -->



<div class="main_page_content">
    <?= view('settings/settings_sidebar') ?>

    <div class="row setting_margin">
        <div class="col-lg-12">
            <form method="post">
                <?= csrf_field(); ?>

                <div class="col-md-12 row m-0">
                    <h5 class="col-md-12 mb-3">Invoice thermal printer</h5>
                    <div class="form-group my-auto col-lg-12 mb-3">
                        <div class="form-check form-switch">
                            <label class="form-check-label" for="print_thermal">Print thermal
                                <span class="span_font"> <?= langg(get_setting(company($user['id']), 'language'), '(Enable Print Thermal)'); ?></span>
                            </label>
                            <input class="form-check-input" value="1" <?php if ($conf['print_thermal'] == 1) {
                                                                            echo 'checked';
                                                                        } ?> type="checkbox" name="print_thermal" id="print_thermal">
                        </div>
                    </div>


                    <div class="form-group col-lg-6 mb-3">
                        <div class="form-check form-switch">
                            <label class="form-check-label" for="preview">Preview
                                <span class="span_font"> <?= langg(get_setting(company($user['id']), 'language'), '(Enable to view preview)'); ?></span>
                            </label>
                            <input class="form-check-input" value="1" <?php if ($conf['preview'] == 1) {
                                                                            echo 'checked';
                                                                        } ?> type="checkbox" name="preview" id="preview">
                        </div>
                    </div>

                    <div class="form-group  my-auto col-lg-6 mb-3">
                        <div class="form-check form-switch">
                            <label class="form-check-label" for="silent">Silent
                                <span class="span_font"> <?= langg(get_setting(company($user['id']), 'language'), '(When this is enable, it will automatically print without preview)'); ?></span>
                            </label>
                            <input class="form-check-input" value="1" <?php if ($conf['silent'] == 1) {
                                                                            echo 'checked';
                                                                        } ?> type="checkbox" name="silent" id="silent">

                        </div>
                    </div>

                    <div class="col-lg-12">
                        <div class="d-flex mb-3">
                            <div class="my-auto">
                                <label for="input-5" class="form-label">Printer share name : </label>

                            </div>
                            <div class="my-auto ms-2">
                                <input type="text" name="printer1" class="form-control form_input" value="<?= $conf['printer1']; ?>">

                            </div>

                        </div>
                    </div>




                    <!-- <div class="form-group col-md-12 mb-3">
                        <label for="input-5" class="form-label">Printer2 share name</label>
                        <input type="text" name="printer2" class="form-control" value="<= $conf['printer2']; ?>">
                    </div> -->






                    <div class="form-group col-lg-6 col-sm-12 mb-3 ">
                        <label for="input-5" class="form-label">Margin (px) : </label>
                        <input type="number" step="any" name="margin1" style="width: 50px;" placeholder="T" class="text-center form_input   mt-1" value="<?= $conf['margin1']; ?>">
                        <span>X</span>
                        <input type="number" step="any" name="margin2" style="width: 50px;" placeholder="R" class="text-center form_input " value="<?= $conf['margin2']; ?>">
                        <span>X</span>
                        <input type="number" step="any" name="margin3" style="width: 50px;" placeholder="B" class="text-center form_input" value="<?= $conf['margin3']; ?>">
                        <span>X</span>
                        <input type="number" step="any" name="margin4" style="width: 50px;" placeholder="L" class="text-center form_input " value="<?= $conf['margin4']; ?>">
                    </div>



                    <div class="form-group col-lg-6 col-sm-12 mb-3 ">
                        <label for="input-5" class="form-label">Page size : </label>
                        <select class="form_input" name="width">
                            <option value="80mm" <?php if ($conf['width'] == '80mm') {
                                                        echo 'selected';
                                                    } ?>>80mm</option>
                            <option value="78mm" <?php if ($conf['width'] == '78mm') {
                                                        echo 'selected';
                                                    } ?>>78mm</option>
                            <option value="76mm" <?php if ($conf['width'] == '76mm') {
                                                        echo 'selected';
                                                    } ?>>76mm</option>
                            <option value="58mm" <?php if ($conf['width'] == '58mm') {
                                                        echo 'selected';
                                                    } ?>>58mm</option>
                            <option value="57mm" <?php if ($conf['width'] == '57mm') {
                                                        echo 'selected';
                                                    } ?>>57mm</option>
                            <option value="44mm" <?php if ($conf['width'] == '44mm') {
                                                        echo 'selected';
                                                    } ?>>44mm</option>
                        </select>
                    </div>



                    <div class="col-lg-6">
                        <div class="d-flex mb-3">
                            <div class="my-auto">
                                <label for="input-5" class="form-label">Body width: </label>
                            </div>
                            <div class="my-auto ms-2">
                                <input type="number" step="any" name="body_width" class="form-control form_input" value="<?= $conf['body_width']; ?>">
                            </div>

                        </div>
                    </div>


                    <div class="col-lg-6">
                        <div class="d-flex mb-3">
                            <div class="my-auto">
                                <label for="input-5" class="form-label">Header : </label>
                            </div>
                            <div class="my-auto ms-2">
                                <input type="text" name="header" class="form-control form_input" value="<?= $conf['header']; ?>">
                            </div>

                        </div>
                    </div>

                    <div class="col-lg-6">
                        <div class="d-flex mb-3">
                            <div class="my-auto">
                                <label for="input-5" class="form-label">Footer : </label>
                            </div>
                            <div class="my-auto ms-2">
                                <input type="text" name="footer" class="form-control form_input" value="<?= $conf['footer']; ?>">
                            </div>

                        </div>
                    </div>


                    <div class="col-lg-6">
                        <div class="d-flex mb-3">
                            <div class="my-auto">
                                <label for="input-5" class="form-label">Copies : </label>
                            </div>
                            <div class="my-auto ms-2">
                                <input type="number" step="any" name="copies" class="form-control form_input" min="1" value="<?= ($conf['copies'] > 0) ? $conf['copies'] : 1;  ?>">
                            </div>

                        </div>
                    </div>

                    <div class="col-lg-6">
                        <div class="d-flex mb-3">
                            <div class="my-auto">
                                <label for="input-5" class="form-label">DPI : </label>
                            </div>
                            <div class="my-auto ms-4">
                                <input type="number" step="any" name="dpi" class="form-control form_input" value="<?= $conf['dpi']; ?>">
                            </div>

                        </div>
                    </div>

                    <div class="col-lg-6">
                        <div class="d-flex mb-3">
                            <div class="my-auto">
                                <label for="input-5" class="form-label">Time out per line(400) : </label>
                            </div>
                            <div class="my-auto ms-2">
                                <input type="number" step="any" name="time_out_per_line" class="form-control form_input" value="<?= $conf['time_out_per_line']; ?>">
                            </div>

                        </div>
                    </div>



                    <h5 class="col-md-12 d-none ">Barcode printer</h5>

                    <div class="form-group col-md-12 mb-3 d-none">
                        <label for="input-5" class="form-label">Length of code</label>
                        <input type="number" step="any" min="0" name="loc" class="form-control" value="<?= $conf['loc']; ?>">
                    </div>

                    <!-- <div class="form-group col-md-6 mb-3">
                        <label for="input-5" class="form-label">Printer2 share name</label>
                        <input type="text" name="bar_printer2" class="form-control" value="<?= $conf['bar_printer2']; ?>">
                    </div> -->


                    <div class="form-group col-lg-6 mb-3 d-none">
                        <div class="form-check form-switch">
                            <label class="form-check-label" for="preview">Preview
                                <span class="span_font"> <?= langg(get_setting(company($user['id']), 'language'), '(Enable to view preview)'); ?></span>
                            </label>
                            <input class="form-check-input" value="1" <?php if ($conf['bar_preview'] == 1) {
                                                                            echo 'checked';
                                                                        } ?> type="checkbox" name="bar_preview" id="bar_preview">
                        </div>
                    </div>

                    <div class="form-group col-lg-6 mb-3 d-none">
                        <div class="form-check form-switch">
                            <label class="form-check-label" for="silent">Silent
                                <span class="span_font"> <?= langg(get_setting(company($user['id']), 'language'), '(When this is enable, it will automatically print without preview)'); ?></span>
                            </label>
                            <input class="form-check-input" value="1" <?php if ($conf['bar_silent'] == 1) {
                                                                            echo 'checked';
                                                                        } ?> type="checkbox" name="bar_silent" id="bar_silent">

                        </div>
                    </div>

                    <div class="col-lg-12 d-none">
                        <div class="d-flex mb-3">
                            <div class="my-auto">
                                <label for="input-5" class="form-label">Printer share name : </label>
                            </div>
                            <div class="my-auto ms-2">
                                <input type="text" name="bar_printer1" class="form-control form_input" value="<?= $conf['bar_printer1']; ?>">
                            </div>

                        </div>
                    </div>






                    <div class="form-group col-lg-6 col-md-12  col-sm-12 mb-3 d-none">
                        <label for="input-5" class="form-label">Page size : </label>
                        <select class="form_input" name="bar_width">
                            <option value="80mm" <?php if ($conf['bar_width'] == '80mm') {
                                                        echo 'selected';
                                                    } ?>>80mm</option>
                            <option value="78mm" <?php if ($conf['bar_width'] == '78mm') {
                                                        echo 'selected';
                                                    } ?>>78mm</option>
                            <option value="76mm" <?php if ($conf['bar_width'] == '76mm') {
                                                        echo 'selected';
                                                    } ?>>76mm</option>
                            <option value="58mm" <?php if ($conf['bar_width'] == '58mm') {
                                                        echo 'selected';
                                                    } ?>>58mm</option>
                            <option value="57mm" <?php if ($conf['bar_width'] == '57mm') {
                                                        echo 'selected';
                                                    } ?>>57mm</option>
                            <option value="44mm" <?php if ($conf['bar_width'] == '44mm') {
                                                        echo 'selected';
                                                    } ?>>44mm</option>
                        </select>
                    </div>





                    <div class="col-lg-6 col-md-12 d-none">
                        <div class="d-flex mb-3">
                            <div class="my-auto">
                                <label for="input-5" class="form-label">Header : </label>
                            </div>
                            <div class="my-auto ms-2">
                                <input type="text" name="bar_header" class="form-control form_input" value="<?= $conf['bar_header']; ?>">
                            </div>

                        </div>
                    </div>

                    <div class="col-lg-6 d-none">
                        <div class="d-flex mb-3">
                            <div class="my-auto">
                                <label for="input-5" class="form-label">Footer : </label>
                            </div>
                            <div class="my-auto ms-2">
                                <input type="text" name="bar_footer" class="form-control form_input" value="<?= $conf['bar_footer']; ?>">
                            </div>

                        </div>
                    </div>

                    <div class="col-lg-6 d-none">
                        <div class="d-flex mb-3">
                            <div class="my-auto">
                                <label for="input-5" class="form-label">Copies : </label>
                            </div>
                            <div class="my-auto ms-2">
                                <input type="number" step="any" name="bar_copies" class="form-control form_input" min="1" value="<?= ($conf['bar_copies'] > 0) ? $conf['bar_copies'] : 1; ?>">
                            </div>

                        </div>
                    </div>

                    <div class="col-lg-6 d-none">
                        <div class="d-flex mb-3">
                            <div class="my-auto">
                                <label for="input-5" class="form-label">DPI : </label>
                            </div>
                            <div class="my-auto ms-2">
                                <input type="number" step="any" name="bar_dpi" class="form-control form_input" value="<?= $conf['bar_dpi']; ?>">
                            </div>

                        </div>
                    </div>



                    <div class="col-lg-6 d-none">
                        <div class="d-flex mb-3">
                            <div class="my-auto">
                                <label for="input-5" class="form-label">Barcode width : </label>
                            </div>
                            <div class="my-auto ms-2">
                                <input type="number" step="any" name="barcode_width" class="form-control form_input" value="<?= $conf['barcode_width']; ?>">
                            </div>

                        </div>
                    </div>

                    <div class="col-lg-6 d-none">
                        <div class="d-flex mb-3">
                            <div class="my-auto">
                                <label for="input-5" class="form-label">Barcode font size : </label>
                            </div>
                            <div class="my-auto ms-2">
                                <input type="number" step="any" name="barcode_fontsize" class="form-control form_input" value="<?= $conf['barcode_fontsize']; ?>">
                            </div>

                        </div>
                    </div>

                    <div class="col-lg-6 d-none">
                        <div class="d-flex mb-3">
                            <div class="my-auto">
                                <label for="input-5" class="form-label">Barcode gap between : </label>
                            </div>
                            <div class="my-auto ms-2">
                                <input type="number" step="any" name="barcode_marginbottom" class="form-control form_input" value="<?= $conf['barcode_marginbottom']; ?>">
                            </div>

                        </div>
                    </div>




                    <div class="col-lg-12 d-none">
                        <div class="d-flex mb-3">
                            <div class="my-auto">
                                <label for="input-5" class="form-label">Time out per line(400) : </label>
                            </div>
                            <div class="my-auto ms-2">
                                <input type="number" step="any" name="bar_time_out_per_line" class="form-control form_input" value="<?= $conf['bar_time_out_per_line']; ?>">
                            </div>

                        </div>
                    </div>


                    <hr>
                    <h5 class="col-md-12 ">Weighing machine </h5>
                    <div class="form-group col-md-12 mb-3">
                        <div class="form-check form-switch">
                            <label class="form-check-label" for="weighing_mac">Weighing machine
                                <span class="span_font"> <?= langg(get_setting(company($user['id']), 'language'), '(Enable Weighing machine)'); ?></span>
                            </label>
                            <input class="form-check-input" value="1" <?php if ($conf['weighing_mac'] == 1) {
                                                                            echo 'checked';
                                                                        } ?> type="checkbox" name="weighing_mac" id="weighing_mac">
                        </div>
                    </div>

                    <div class="col-lg-4 my-auto">
                        <div class="d-flex mb-3">
                            <div class="my-auto">
                                <label for="input-5" class="form-label">Port: </label>
                            </div>
                            <div class="my-auto ms-2">
                                <input type="text" name="port" class="form-control form_input" value="<?= ($conf['port'] != '') ? $conf['port'] : 'COM1';  ?>">
                            </div>

                        </div>
                    </div>

                    <div class="col-lg-4 my-auto">
                        <div class="d-flex mb-3">
                            <div class="my-auto">
                                <label for="input-5" class="form-label">Baud Rate : </label>
                            </div>
                            <div class="my-auto ms-2">
                                <input type="text" name="baudrate" class="form-control form_input" value="<?= ($conf['baudrate'] != 0) ? $conf['baudrate'] : '9600';  ?>">
                            </div>

                        </div>
                    </div>

                    <div class="col-lg-4 my-auto">
                        <div class="d-flex  mb-3">
                            <div class="my-auto">
                                <label for="input-5" class="form-label">Data Bits : </label>
                            </div>
                            <div class="my-auto ms-2">
                                <input type="text" name="databits" class="form-control form_input" value="<?= ($conf['databits'] != 0) ? $conf['databits'] : '7';  ?>">
                            </div>

                        </div>
                    </div>

                    <div class="col-lg-4 my-auto">
                        <div class="d-flex mb-3">
                            <div class="my-auto">
                                <label for="input-5" class="form-label">Stop Bits : </label>
                            </div>
                            <div class="my-auto ms-2">
                                <input type="text" name="stopbits" class="form-control form_input" value="<?= ($conf['stopbits'] != 0) ? $conf['stopbits'] : '1';  ?>">
                            </div>
                        </div>
                    </div>

                    <div class="col-lg-4 my-auto">
                        <div class="d-flex mb-3">
                            <div class="my-auto">
                                <label for="input-5" class="form-label ">Parity : </label>
                            </div>
                            <div class="my-auto ms-2">
                                <select class="form-select form_input" name="parity">
                                    <option value="none" <?= ($conf['parity'] == 'none') ? 'selected' : '';  ?>>None</option>
                                    <option value="even" <?= ($conf['parity'] == 'even') ? 'selected' : '';  ?>>Even</option>
                                    <option value="odd" <?= ($conf['parity'] == 'odd') ? 'selected' : '';  ?>>Odd</option>
                                    <option value="space" <?= ($conf['parity'] == 'space') ? 'selected' : '';  ?>>Space</option>
                                    <option value="mark" <?= ($conf['parity'] == 'mark') ? 'selected' : '';  ?>>Mark</option>
                                </select>
                            </div>

                        </div>
                    </div>


                    <div class="col-lg-4 my-auto">
                        <div class="d-flex mb-3">
                            <div class="my-auto">
                                <label for="input-5" class="form-label">Buffer Size : </label>
                            </div>
                            <div class="my-auto ms-2">
                                <input type="text" name="buffersize" class="form-control form_input" value="<?= ($conf['buffersize'] != 0) ? $conf['buffersize'] : '1024';  ?>">
                            </div>

                        </div>
                    </div>

                    <div class="col-lg-12 my-auto">
                        <div class="d-flex mb-3">
                            <div class="my-auto">
                                <label for="input-5" class="form-label">Weighing device : </label>
                            </div>
                            <div class="my-auto ms-2">
                                <select class="form-select form_input" name="w_device">
                                    <?php foreach (weighing_machines_array() as $dev): ?>
                                        <option value="<?= $dev['id'] ?>" <?= ($conf['w_device'] == $dev['id']) ? 'selected' : '';  ?>><?= $dev['device_name'] ?></option>
                                    <?php endforeach ?>
                                </select>
                            </div>

                        </div>
                    </div>


                    <!-- //////////////////  Attendance devices /////////// -->
                    <hr>
                    <h5 class="col-md-12 ">Finger print attendance device</h5>
                    <div class="form-group col-md-12 mb-3">
                        <div class="form-check form-switch">
                            <label class="form-check-label" for="fp_device">Finger print device
                                <span class="span_font"> <?= langg(get_setting(company($user['id']), 'language'), '(Enable Finger print device)'); ?></span>
                            </label>
                            <input class="form-check-input" value="1" <?php if ($conf['fp_device'] == 1) {
                                                                            echo 'checked';
                                                                        } ?> type="checkbox" name="fp_device" id="fp_device">
                        </div>
                    </div>

                    <div class="col-lg-6 my-auto">
                        <div class="d-flex mb-3">
                            <div class="my-auto">
                                <label for="input-5" class="form-label" style="width:max-content;">Device IP address : </label>
                            </div>
                            <div class="my-auto ms-2">
                                <input type="text" pattern="^([0-9]{1,3}\.){3}[0-9]{1,3}$" placeholder="000.000.0.000" name="fp_address" class="form-control form_input" value="<?= ($conf['fp_address'] != '') ? $conf['fp_address'] : '192.168.2.200';  ?>">
                            </div>
                        </div>
                    </div>

                    <div class="col-lg-6 my-auto">
                        <div class="d-flex mb-3">
                            <div class="my-auto">
                                <label for="input-5" class="form-label ">Port: </label>
                            </div>
                            <div class="my-auto ms-2">
                                <select class="form-select form_input" name="fp_port">
                                    <option value="<?= ($conf['fp_port'] == 4370) ? $conf['fp_port'] : '4370';  ?>" <?= ($conf['fp_port'] == 4370) ? 'selected' : '';  ?>>4370</option>
                                    <option value="<?= ($conf['fp_port'] == 5005) ? $conf['fp_port'] : '5005';  ?>" <?= ($conf['fp_port'] == 5005) ? 'selected' : '';  ?>>5005</option>
                                    <option value="<?= ($conf['fp_port'] == 8001) ? $conf['fp_port'] : '8001';  ?>" <?= ($conf['fp_port'] == 8001) ? 'selected' : '';  ?>>8001</option>
                                </select>
                            </div>
                        </div>
                    </div>


                    <div class="form-group col-md-12 mb-2">
                        <button class="SpriteGenix-primary-btn" name="save_devices">Save</button>
                    </div>
                </div>
            </form>
        </div>

    </div>
</div>