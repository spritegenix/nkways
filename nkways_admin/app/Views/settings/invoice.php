<!-- ////////////////////////// TOP BAR START ///////////////////////// -->
<div class="sub_topbar d-flex">
    <div class="right_bar d-flex justify-content-between w-100">

        <a class="my-auto ait-ms-2 href_loader cursor-pointer font-size-topbar go_back_or_close text-SpriteGenix-red " title="Back">
            <i class="bx bx-arrow-back"></i>
        </a>

        <nav aria-label="breadcrumb">
            <ol class="breadcrumb SpriteGenix-breadcrumb mb-0 p-0">
                <li class="breadcrumb-item">
                    <a href="<?= base_url(); ?>"><i class="bx bx-home-alt text-SpriteGenix-red"></i></a>
                </li>

                <li class="breadcrumb-item active" aria-current="page">
                    <a href="<?= base_url('invoices/sales'); ?>">Invoices</a>
                </li>

                <li class="breadcrumb-item active" aria-current="page">
                    <b class="page_heading text-dark">Invoice Settings</b>
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
    <div>
        <form method="post" enctype="multipart/form-data">
            <?= csrf_field(); ?>

            <div class="col-md-12 row m-0">

                <div class="col-md-3">
                    <div class="form-group col-md-6 mb-3">
                        <div class="form-check form-switch">

                            <input type="checkbox" class="form-check-input" id="settings-check3" name="show_batch_no" value="1" <?php if (get_setting(company($user['id']), 'show_batch_no') == '1') {
                                                                                                                                    echo 'checked';
                                                                                                                                } ?>>

                            <label class="form-check-label font-weight-normal" for="settings-check3"><?= langg(get_setting(company($user['id']), 'language'), 'Show Batch Number'); ?></label>
                        </div>
                    </div>

                    <div class="form-group col-md-6 mb-3">
                        <div class="form-check form-switch">

                            <input type="checkbox" class="form-check-input" id="settings-check4" name="show_price" value="1" <?php if (get_setting(company($user['id']), 'show_price') == '1') {
                                                                                                                                    echo 'checked';
                                                                                                                                } ?>>
                            <label class="form-check-label font-weight-normal" for="settings-check4"><?= langg(get_setting(company($user['id']), 'language'), 'Show Price'); ?></label>
                        </div>
                    </div>

                    <div class="form-group col-md-6 mb-3">
                        <div class="form-check form-switch">
                            <input type="checkbox" class="form-check-input" id="settings-check5" name="show_tax" value="1" <?php if (get_setting(company($user['id']), 'show_tax') == '1') {
                                                                                                                                echo 'checked';
                                                                                                                            } ?>>
                            <label class="form-check-label font-weight-normal" for="settings-check5"><?= langg(get_setting(company($user['id']), 'language'), 'Show Tax'); ?></label>
                        </div>
                    </div>

                    <div class="form-group col-md-6 mb-3">
                        <div class="form-check form-switch">
                            <input type="checkbox" class="form-check-input" id="settings-check6" name="show_discount" value="1" <?php if (get_setting(company($user['id']), 'show_discount') == '1') {
                                                                                                                                    echo 'checked';
                                                                                                                                } ?>>
                            <label class="form-check-label font-weight-normal" for="settings-check6"><?= langg(get_setting(company($user['id']), 'language'), 'Show Discount'); ?></label>
                        </div>
                    </div>

                    <div class="form-group col-md-6 mb-3">
                        <div class="form-check form-switch">
                            <input type="checkbox" class="form-check-input" id="settings-check7" name="show_quantity" value="1" <?php if (get_setting(company($user['id']), 'show_quantity') == '1') {
                                                                                                                                    echo 'checked';
                                                                                                                                } ?>>
                            <label class="form-check-label font-weight-normal" for="settings-check7"><?= langg(get_setting(company($user['id']), 'language'), 'Show Quantity'); ?></label>
                        </div>
                    </div>

                    <div class="form-group col-md-6 mb-3">
                        <div class="form-check form-switch">
                            <input type="checkbox" class="form-check-input" id="settings-check8" name="show_logo" value="1" <?php if (get_setting(company($user['id']), 'show_logo') == '1') {
                                                                                                                                echo 'checked';
                                                                                                                            } ?>>
                            <label class="form-check-label font-weight-normal" for="settings-check8"><?= langg(get_setting(company($user['id']), 'language'), 'Show Logo'); ?></label>
                        </div>
                    </div>
                    <div class="form-group col-md-6 mb-3">
                        <div class="form-check form-switch">
                            <input type="checkbox" class="form-check-input" id="settings-check9" name="show_expiry_date" value="1" <?php if (get_setting(company($user['id']), 'show_expiry_date') == '1') {
                                                                                                                                        echo 'checked';
                                                                                                                                    } ?>>
                            <label class="form-check-label font-weight-normal" for="settings-check9"><?= langg(get_setting(company($user['id']), 'language'), 'Show expiry date'); ?></label>
                        </div>
                    </div>


                    <div class="form-group col-md-12">
                        <label class="form-label mt-4"><?= langg(get_setting(company($user['id']), 'language'), 'Select Page Size'); ?></label>
                        <select class="form-control form-control-sm" name="invoice_page_size">
                            <option value="" selected>select page size</option>
                            <option value="a4" <?php if (get_setting2(company($user['id']), 'invoice_page_size') == 'a4') {
                                                    echo 'selected';
                                                } ?>>A4</option>
                            <option value="a5" <?php if (get_setting2(company($user['id']), 'invoice_page_size') == 'a5') {
                                                    echo 'selected';
                                                } ?>>A5</option>
                            <option value="a3" <?php if (get_setting2(company($user['id']), 'invoice_page_size') == 'a3') {
                                                    echo 'selected';
                                                } ?>>A3</option>
                        </select>
                    </div>


                </div>

                <div class="col-md-3">



                    <div class="form-group col-md-6 mb-3">
                        <div class="form-check form-switch">
                            <input type="checkbox" class="form-check-input" id="settings-check10" name="show_due_date" value="1" <?php if (get_setting(company($user['id']), 'show_due_date') == '1') {
                                                                                                                                        echo 'checked';
                                                                                                                                    } ?>>
                            <label class="form-check-label font-weight-normal" for="settings-check10"><?= langg(get_setting(company($user['id']), 'language'), 'Show due date'); ?></label>
                        </div>
                    </div>

                    <div class="form-group col-md-6 mb-3">
                        <div class="form-check form-switch">
                            <input type="checkbox" class="form-check-input" id="settings-check11" name="show_head" value="1" <?php if (get_setting(company($user['id']), 'show_head') == '1') {
                                                                                                                                    echo 'checked';
                                                                                                                                } ?>>
                            <label class="form-check-label font-weight-normal" for="settings-check11"><?= langg(get_setting(company($user['id']), 'language'), 'Show invoice heading'); ?></label>
                        </div>
                    </div>

                    <div class="form-group col-md-6 mb-3">
                        <div class="form-check form-switch">
                            <input type="checkbox" class="form-check-input" id="settings-check7" name="show_uom" value="1" <?php if (get_setting(company($user['id']), 'show_uom') == '1') {
                                                                                                                                echo 'checked';
                                                                                                                            } ?>>
                            <label class="form-check-label font-weight-normal" for="settings-check7"><?= langg(get_setting(company($user['id']), 'language'), 'Show UOM'); ?></label>
                        </div>
                    </div>

                    <div class="form-group col-md-12 mb-3">
                        <div class="form-check form-switch">
                            <input type="checkbox" class="form-check-input" id="settings-check16" name="show_hsncode_no" value="1" <?php if (get_setting(company($user['id']), 'show_hsncode_no') == '1') {
                                                                                                                                        echo 'checked';
                                                                                                                                    } ?>>
                            <label class="form-check-label font-weight-normal" for="settings-check16"><?= langg(get_setting(company($user['id']), 'language'), 'Show item identity'); ?></label>
                        </div>
                    </div>

                    <div class="form-group col-md-12 mb-3">
                        <div class="form-check form-switch">
                            <input type="checkbox" class="form-check-input" id="settings-check19" name="billing_style" value="1" <?php if (get_setting(company($user['id']), 'billing_style') == '1') {
                                                                                                                                        echo 'checked';
                                                                                                                                    } ?>>
                            <label class="form-check-label font-weight-normal" for="settings-check19"><?= langg(get_setting(company($user['id']), 'language'), 'Disable grid billing'); ?></label>
                        </div>
                    </div>

                    <div class="form-group col-md-6 mb-3">
                        <div class="form-check form-switch">
                            <input type="checkbox" class="form-check-input" id="settings-check18" name="show_validity" value="1" <?php if (get_setting(company($user['id']), 'show_validity') == '1') {
                                                                                                                                        echo 'checked';
                                                                                                                                    } ?>>
                            <label class="form-check-label font-weight-normal" for="settings-check18"><?= langg(get_setting(company($user['id']), 'language'), 'Show Validity'); ?></label>
                        </div>
                    </div>
                    <div class="form-group col-md-6 mb-3">
                        <div class="form-group col-md-12 mb-3">
                            <div class="form-check form-switch">
                                <input type="checkbox" class="form-check-input" id="settings-check17" name="show_mrn_number" value="1" <?php if (get_setting(company($user['id']), 'show_mrn_number') == '1') {
                                                                                                                                            echo 'checked';
                                                                                                                                        } ?>>
                                <label class="form-check-label font-weight-normal" for="settings-check17"><?= langg(get_setting(company($user['id']), 'language'), 'MRN Number'); ?></label>
                            </div>
                        </div>
                    </div>
                    <div class="form-group col-md-12">
                        <label class="form-label mt-4"><?= langg(get_setting(company($user['id']), 'language'), 'Select Orientation'); ?></label>
                        <select class="form-control form-control-sm" name="invoice_orientation">
                            <option value="" selected>select orientation</option>
                            <option value="landscape" <?php if (get_setting2(company($user['id']), 'invoice_orientation') == 'landscape') {
                                                            echo 'selected';
                                                        } ?>>Landscape</option>
                            <option value="portrait" <?php if (get_setting2(company($user['id']), 'invoice_orientation') == 'portrait') {
                                                            echo 'selected';
                                                        } ?>>Portrait</option>
                        </select>
                    </div>
                </div>

                <div class="col-md-6">
                    <div class="col-md-12 d-md-flex form-group justify-content-between mb-3">
                        <div>
                            <label class="form-label"><?= langg(get_setting(company($user['id']), 'language'), 'Header'); ?></label>
                            <input type="file" accept="image/*" class="form-control" name="invoice_header" id="input-1" style="height: 35px;">
                            <input type="hidden" name="old_invoice_header" value="<?= $c_set['invoice_header'] ?>">
                        </div>
                        <img src="<?= base_url('public/images/company_docs') ?>/<?php if (!empty($c_set['invoice_header'])) {
                                                                                    echo $c_set['invoice_header'];
                                                                                } else {
                                                                                    echo 'alt.png';
                                                                                } ?>" class="my-auto py-2" style="max-height: 60px;">
                    </div>

                    <div class="col-md-12 d-md-flex form-group justify-content-between mb-3">
                        <div class="my-auto">
                            <label class="form-label"><?= langg(get_setting(company($user['id']), 'language'), 'Signature'); ?></label>
                            <input type="file" accept="image/*" class="form-control" name="invoice_signature" id="input-1" style="height: 35px;">
                            <input type="hidden" name="old_invoice_signature" value="<?= $c_set['invoice_signature'] ?>">
                        </div>
                        <img src="<?= base_url('public/images/company_docs') ?>/<?php if (!empty($c_set['invoice_signature'])) {
                                                                                    echo $c_set['invoice_signature'];
                                                                                } else {
                                                                                    echo 'alt.png';
                                                                                } ?>" class="my-auto py-2" style="max-height: 60px;">
                    </div>

                    <div class="col-md-12 d-md-flex form-group justify-content-between mb-3">
                        <div class="my-auto">
                            <label class="form-label"><?= langg(get_setting(company($user['id']), 'language'), 'Payslip Signature'); ?></label>
                            <input type="file" accept="image/*" class="form-control" name="payslip_signature" id="input-1" style="height: 35px;">
                            <input type="hidden" name="old_payslip_signature" value="<?= $c_set['payslip_signature'] ?>">
                        </div>
                        <img src="<?= base_url('public/images/company_docs') ?>/<?php if (!empty($c_set['payslip_signature'])) {
                                                                                    echo $c_set['payslip_signature'];
                                                                                } else {
                                                                                    echo 'alt.png';
                                                                                } ?>" class="my-auto py-2" style="max-height: 60px;">
                    </div>

                    <div class="col-md-12 d-md-flex form-group justify-content-between mb-3">
                        <div class="my-auto">
                            <label class="form-label"><?= langg(get_setting(company($user['id']), 'language'), 'Seal'); ?></label>
                            <input type="file" accept="image/*" class="form-control" name="invoice_seal" id="input-1" style="height: 35px;">
                            <input type="hidden" name="old_invoice_seal" value="<?= $c_set['invoice_seal'] ?>">
                        </div>
                        <img src="<?= base_url('public/images/company_docs') ?>/<?php if (!empty($c_set['invoice_seal'])) {
                                                                                    echo $c_set['invoice_seal'];
                                                                                } else {
                                                                                    echo 'alt.png';
                                                                                } ?>" class="my-auto py-2" style="max-height: 60px;">
                    </div>


                    <div class="col-md-12 d-md-flex form-group justify-content-between mb-3">
                        <div class="my-auto">
                            <label class="form-label"><?= langg(get_setting(company($user['id']), 'language'), 'QR Code'); ?></label>
                            <input type="file" accept="image/*" class="form-control" name="invoice_qr_code" id="input-1" style="height: 35px;">
                            <input type="hidden" name="old_invoice_qr_code" value="<?= $c_set['invoice_qr_code'] ?>">
                        </div>
                        <img src="<?= base_url('public/images/company_docs') ?>/<?php if (!empty($c_set['invoice_qr_code'])) {
                                                                                    echo $c_set['invoice_qr_code'];
                                                                                } else {
                                                                                    echo 'alt.png';
                                                                                } ?>" class="my-auto py-2" style="max-height: 60px;">
                    </div>
                </div>











                <div class="form-group col-md-6 mb-3">
                    <label class="form-label"><?= langg(get_setting(company($user['id']), 'language'), 'Background Color'); ?></label>
                    <input type="color" class="form-control" name="Invoice_color" id="input-1" value="<?= $c_set['Invoice_color']; ?>" style="height: 35px;">
                </div>

                <div class="form-group col-md-6 mb-3">
                    <label class="form-label"><?= langg(get_setting(company($user['id']), 'language'), 'Font Color'); ?></label>
                    <input type="color" class="form-control" name="invoice_font_color" id="input-1" value="<?= $c_set['invoice_font_color']; ?>" style="height: 35px;">
                </div>





                <div class="form-group col-md-6 mb-3">
                    <label class="form-label"><?= langg(get_setting(company($user['id']), 'language'), 'Tax Card Number'); ?></label>
                    <input type="number" class="form-control" name="taxnumber" value="<?= $c_set['taxnumber'] ?>">
                </div>

                <div class="form-group col-md-6 mb-3">
                    <label class="form-label"><?= langg(get_setting(company($user['id']), 'language'), 'TIN Number'); ?></label>
                    <input type="number" class="form-control" name="tinnumber" value="<?= $c_set['tinnumber'] ?>">
                </div>



                <div class="form-group col-md-6 mb-3">
                    <label class="form-label"><?= langg(get_setting(company($user['id']), 'language'), 'Footer'); ?></label>
                    <textarea class="form-control" name="invoice_footer"><?= $c_set['invoice_footer']; ?></textarea>
                </div>

                <!-- new -->
                <div class="form-group col-md-6 mb-3">
                    <label class="form-label"><?= langg(get_setting(company($user['id']), 'language'), 'Declaration'); ?></label>
                    <textarea class="form-control" name="invoice_declaration"><?= $c_set['invoice_declaration'];  ?></textarea>
                </div>

                <div class="form-group col-md-6 mb-3">
                    <label class="form-label"><?= langg(get_setting(company($user['id']), 'language'), 'Terms & Conditions'); ?></label>
                    <textarea class="form-control" name="invoice_terms"><?= $c_set['invoice_terms']; ?></textarea>
                </div>
                <div class="form-group col-md-6 mb-3">
                    <label class="form-label"><?= langg(get_setting(company($user['id']), 'language'), 'Bank Details'); ?></label>
                    <textarea class="form-control" name="bank_details"><?= $c_set['bank_details']; ?></textarea>
                </div>
                <div class="form-group col-md-6 mb-3">
                    <label class="form-label"><?= langg(get_setting(company($user['id']), 'language'), 'UPI'); ?></label>
                    <input type="text" class="form-control" name="upi" value="<?= $c_set['upi']; ?>">
                </div>
                <!--  additional -->

                <div class="form-group col-md-6 mb-3">
                    <label class="form-label">Search Type</label>
                    <select class="form-select save_side_bar_change" name="cursor_position">
                        <option value="0" <?php if (get_setting(company($user['id']), 'cursor_position') == '0') {
                                                echo 'selected';
                                            } ?>>Search bar</option>
                        <option value="2" <?php if (get_setting(company($user['id']), 'cursor_position') == '2') {
                                                echo 'selected';
                                            } ?>>Barcode</option>
                        <option value="1" <?php if (get_setting(company($user['id']), 'cursor_position') == '1') {
                                                echo 'selected';
                                            } ?>>Product Code</option>
                    </select>
                </div>


                <!-- end -->



                <div class="form-check ">
                    <div class="row mt-2">
                        <div class="col-md-3 mb-3">
                            <div class="ms-4">
                                <input class="form-check-input my-5" type="radio" name="invoice_temp" id="invoice_temp" value="1" checked <?php if ($c_set['invoice_template'] == '1') {
                                                                                                                                                echo 'checked';
                                                                                                                                            } ?>>
                                <img src="<?= base_url('public'); ?>/images/in1.png" style="width: 100px; box-shadow: 0px 1px 2px 1px #0000002b;">

                            </div>
                            <p class="mb-0  ms-5 ">Basic</p>
                        </div>








                    </div>


                </div>

            </div>



            <div class="form-group col-md-12 mb-3 d-none">
                <label class=""><?= langg(get_setting(company($user['id']), 'language'), 'Receipt Template'); ?></label> <br>
                <div class="form-check form-check-inline">
                    <div class="row mt-2">
                        <div class="col-md-6 mb-3">
                            <div class="ms-4">
                                <input class="form-check-input" type="radio" name="receipt_temp" id="receipt_temp" value="1" checked <?php if ($c_set['receipt_template'] == '1') {
                                                                                                                                            echo 'checked';
                                                                                                                                        } ?>>
                                <img src="<?= base_url('public'); ?>/images/rec1.png" style="width: 100px; box-shadow: 0px 1px 2px 1px #0000002b;">
                            </div>
                        </div>
                        <div class="col-md-6 mb-3">
                            <div class="ms-4">
                                <input class="form-check-input" type="radio" name="receipt_temp" id="receipt_temp" value="2" <?php if ($c_set['receipt_template'] == '2') {
                                                                                                                                    echo 'checked';
                                                                                                                                } ?>>
                                <img src="<?= base_url('public'); ?>/images/rec2.png" style="width: 100px; box-shadow: 0px 1px 2px 1px #0000002b;">
                            </div>

                        </div>
                    </div>


                </div>
            </div>






            <div class="form-group col-md-12">
                <button class="SpriteGenix-primary-btn" name="save_invoice_set"><?= langg(get_setting(company($user['id']), 'language'), 'Save'); ?></button>
            </div>
    </div>
    </form>

</div>
</div>