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
                    <b class="page_heading text-dark">Preferences</b>
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


                    <div class="form-group col-md-4 mb-3">
                        <label for="input-5" class="">Currency</label>
                        <input list="select" name="currency" class="form-control modal_inpu" value="<?= $c_set['currency']; ?>">
                        <datalist id="select">
                            <option value=""></option>
                            <?php currency_list(); ?>
                        </datalist>
                    </div>

                    <div class="form-group col-md-4 mb-3">
                        <label for="input-1" class="">Timezone</label>
                        <input list="timezomesele" name="timezone" class="form-control modal_inpu" value="<?= $c_set['timezone']; ?>">
                        <datalist id="timezomesele">
                            <option value=""></option>
                            <?php timezones_list(); ?>
                        </datalist>
                    </div>

                    <div class="form-group col-md-4 mb-3">
                        <label for="input-3" class="">Currency decimal</label>
                        <select name="round_of_value" class="form-control" value="<?= $c_set['round_of_value']; ?>">
                            <option value="0">1</option>
                            <option value="1" <?php if ($c_set['round_of_value'] == '1') {
                                                    echo 'selected';
                                                } ?>>1.5</option>
                            <option value="2" <?php if ($c_set['round_of_value'] == '2') {
                                                    echo 'selected';
                                                } ?>>1.50</option>
                            <option value="3" <?php if ($c_set['round_of_value'] == '3') {
                                                    echo 'selected';
                                                } ?>>1.500</option>
                        </select>
                    </div>



                    <div class="form-group col-md-4 mb-3">
                        <label for="input-1" class="">Sticky keyboard <br>
                            <span class="span_font"> <?= langg(get_setting(company($user['id']), 'language'), '(Press one key at a time for keyboard shortcuts)'); ?></span>
                        </label>
                        <select class="form-select" name="keyboard" id="input-1">
                            <option value="1" <?php if ($c_set['keyboard'] == '1') {
                                                    echo 'selected';
                                                } ?>>Allow</option>
                            <option value="0" <?php if ($c_set['keyboard'] == '0') {
                                                    echo 'selected';
                                                } ?>>Not Allow</option>
                        </select>
                    </div>




                    <div class="form-group col-md-4  mb-3">
                        <label><?= langg(get_setting(company($user['id']), 'language'), 'Image Quality'); ?> <br>
                            <span class="span_font"> <?= langg(get_setting(company($user['id']), 'language'), '(This will impact the quality of your invoices)'); ?></span>
                        </label>
                        <input type="number" class="form-control" name="make_image" value="<?= $c_set['make_image'] ?>">
                    </div>

                    <div class="form-group col-md-4  mb-3">
                        <label><?= langg(get_setting(company($user['id']), 'language'), 'Receipt Image Quality'); ?> <br>
                            <span class="span_font"> <?= langg(get_setting(company($user['id']), 'language'), '(This will impact the quality of your Receipt)'); ?></span>
                        </label>
                        <input type="number" class="form-control" name="make_image_receipt" value="<?= $c_set['make_image_receipt'] ?>">
                    </div>



                    <div class="form-group col-md-4  mb-3">
                        <label for="input-3" class="form-label">Primary color</label>
                        <input type="color" name="primary_color" class="form-control" value="<?= $c_set['primary_color']; ?>">
                    </div>

                    <div class="form-group col-md-4  mb-3">
                        <label for="input-3" class="form-label">Secondary color</label>
                        <input type="color" name="secondary_color" class="form-control" value="<?= $c_set['secondary_color']; ?>">
                    </div>

                    <div class="form-group col-md-4  mb-3">
                        <label for="input-3" class="">PDF type</label>
                        <select name="pdf_type" class="form-select" value="<?= $c_set['pdf_type']; ?>">
                            <option value="">Both</option>
                            <option value="dompdf" <?php if ($c_set['pdf_type'] == 'dompdf') {
                                                        echo 'selected';
                                                    } ?>>Orginal PDF</option>
                            <option value="image_pdf" <?php if ($c_set['pdf_type'] == 'image_pdf') {
                                                            echo 'selected';
                                                        } ?>>Image PDF</option>
                        </select>
                    </div>


                    <div class="form-group col-md-3 mb-3 d-none">
                        <label for="input-5"><?= langg(get_setting(company($user['id']), 'language'), 'Billing Type'); ?></label>
                        <select type="text" name="billing_style" class="form-select">
                            <option value="0" <?php if (get_setting(company($user['id']), 'billing_style') == 0) {
                                                    echo "selected";
                                                } ?>><?= langg(get_setting(company($user['id']), 'language'), 'Grid'); ?></option>
                            <option value="1" <?php if (get_setting(company($user['id']), 'billing_style') == 1) {
                                                    echo "selected";
                                                } ?>><?= langg(get_setting(company($user['id']), 'language'), 'Type & Search'); ?></option>
                        </select>
                    </div>

                    <div class="form-group col-md-3">
                        <label for="input-5"><?= langg(get_setting(company($user['id']), 'language'), 'Select Languages'); ?></label>
                        <select type="text" name="language" class="form-select">
                            <?php foreach (app_languages_array(company($user['id'])) as $lg): ?>
                                <option value="<?= $lg; ?>" <?php if (get_setting(company($user['id']), 'language') == $lg) {
                                                                echo "selected";
                                                            } ?>><?= ucfirst($lg); ?></option>
                            <?php endforeach ?>
                        </select>
                    </div>

                    <div class="form-group col-md-3 mb-3 d-none">
                        <label for="input-5"><?= langg(get_setting(company($user['id']), 'language'), 'Sub unit divide'); ?></label>
                        <select type="text" name="subunit_devide" class="form-select">
                            <option value="0" <?php if (get_setting(company($user['id']), 'subunit_devide') == 0) {
                                                    echo "selected";
                                                } ?>>No</option>
                            <option value="1" <?php if (get_setting(company($user['id']), 'subunit_devide') == 1) {
                                                    echo "selected";
                                                } ?>>Yes</option>
                        </select>
                    </div>




                    <div class="form-group col-md-12">
                        <label></label>

                        <?php if (is_school(company($user['id']))): ?>
                            <div class="d-flex mb-2">
                                <div class="form-check form-switch cursor-pointer mb-0">
                                    <input type="checkbox" class="form-check-input" id="switch-feed" name="switch_feed" value="1" <?php if (get_setting(company($user['id']), 'feedback') == 1): echo 'checked';
                                                                                                                                    endif; ?>>
                                </div>
                                <p class="mb-0 ms-1">Allow Feedbacks</p>
                            </div>

                            <div class="d-flex mb-2">
                                <div class="form-check form-switch cursor-pointer mb-0">
                                    <input type="checkbox" class="form-check-input" id="switch-massenger" name="switch_massenger" value="1" <?php if (get_setting(company($user['id']), 'allow_massanger') == 1): echo 'checked';
                                                                                                                                            endif; ?>>
                                </div>
                                <p class="mb-0 ms-1">Allow Messenger</p>
                            </div>
                        <?php endif ?>

                        <div class="d-flex mb-2">
                            <div class="form-check form-switch cursor-pointer mb-0">
                                <input type="checkbox" class="form-check-input" id="switch-allow_receipt_date" name="allow_receipt_date" value="1" <?php if (get_setting(company($user['id']), 'allow_receipt_date') == 1): echo 'checked';
                                                                                                                                                    endif; ?>>
                            </div>
                            <p class="mb-0 ms-1">Allow to change vouchers date</p>
                        </div>

                        <div class="d-flex mb-2">
                            <div class="form-check form-switch cursor-pointer mb-0">
                                <input type="checkbox" class="form-check-input" id="switch-hide_deleted" name="hide_deleted" value="1" <?php if (get_setting(company($user['id']), 'hide_deleted') == 1): echo 'checked';
                                                                                                                                        endif; ?>>
                            </div>
                            <p class="mb-0 ms-1">Hide deleted inventories & vouchers</p>
                        </div>

                    </div>



                    <div class="form-group col-md-12 mb-2 mt-2">
                        <button class="SpriteGenix-primary-btn" name="save_preference">Save</button>
                    </div>

                </div>
            </form>

        </div>
    </div>

</div>