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
                    <b class="page_heading text-dark">Organisation Settings</b>
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

    <div class="container-fluid p-0">
        <div class="row">

            <div class="col-md-12">
                <div class="">
                    <div class="">

                        <h5 class="border-bottom pb-2">Organisation infomation

                            <b style="font-size:14px;">(Company ID #<?= str_pad(company($user['id']), 5, '0', STR_PAD_LEFT); ?>)</b>
                        </h5>


                        <form action="<?= base_url('settings/save-organisation'); ?>/<?= company($user['id']); ?>" id="org_form" enctype="multipart/form-data">
                            <?= csrf_field() ?>
                            <div class="row">
                                <div class="col-md-4 mb-2">
                                    <label>Organisation Logo</label>
                                    <input class="form-control" type="file" accept="image/*" name="cmp_foto">
                                </div>
                                <div class="col-md-4 mb-2">
                                    <label>Organisation Name</label>
                                    <input type="text" class="form-control" name="company_name" value="<?= $company_data['company_name']; ?>" required>
                                </div>
                                <div class="col-md-4 mb-2">
                                    <label>Organisation Email</label>
                                    <input type="email" class="form-control" name="cmp_email" value="<?= $company_data['email']; ?>" required>
                                </div>
                                <div class="col-md-4 mb-2">
                                    <label>Mobile Number</label>
                                    <input type="number" class="form-control" name="company_phone" value="<?= $company_data['company_phone']; ?>" required>
                                </div>
                                <div class="col-md-4 mb-2">
                                    <label>Telephone Number</label>
                                    <input type="number" class="form-control" name="company_telephone" value="<?= $company_data['company_telephone']; ?>">
                                </div>

                                <div class="col-md-4 mb-2">
                                    <label>Fax</label>
                                    <input type="text" class="form-control" name="fax" value="<?= $company_data['fax']; ?>">
                                </div>

                                <div class="col-md-4 mb-2">
                                    <label>GSTIN / VAT</label>
                                    <input type="text" class="form-control" name="gst_vat" value="<?= $company_data['gstin_vat_no']; ?>">
                                </div>

                                <div class="col-md-4 mb-2">
                                    <label>Country</label>
                                    <select class="form-select" name="country" id="country_select">
                                        <?php foreach (countries_array(company($user['id'])) as $ct): ?>
                                            <option <?php if ($company_data['country'] == $ct['country_name']) {
                                                        echo "selected";
                                                    } ?> value="<?= $ct['country_name'] ?>"><?= $ct['country_name'] ?></option>
                                        <?php endforeach ?>
                                    </select>

                                </div>

                                <div class="col-md-4 mb-2">
                                    <label>State/Governorate/Emirates</label>
                                    <div class="position-relative" id="layerer">

                                        <select class="form-select" name="state" id="state_select_box" required>
                                            <option value="">Choose</option>
                                            <?php foreach (states_array(company($user['id'])) as $st): ?>
                                                <option <?php if ($company_data['state'] == $st) {
                                                            echo "selected";
                                                        } ?> value="<?= $st ?>"><?= $st ?></option>
                                            <?php endforeach ?>
                                        </select>
                                    </div>
                                </div>

                                <div class="col-md-4 mb-2">
                                    <label>City</label>
                                    <input type="text" class="form-control" name="city" value="<?= $company_data['city']; ?>" required>
                                </div>



                                <div class="col-md-4 mb-2">
                                    <label>Postal Code</label>
                                    <input type="number" class="form-control" name="postal_code" value="<?= $company_data['postal_code']; ?>" required>
                                </div>



                                <div class="col-md-4 mb-2">
                                    <label>Website</label>
                                    <input type="text" class="form-control" name="website" placeholder="example:www.example.com" value="<?= $company_data['website']; ?>">
                                </div>



                                <?php if (is_school(company($user['id']))): ?>

                                    <div class="col-md-3 mb-2">
                                        <div class="form-group">
                                            <label>School starts at</label>
                                            <div class="bootstrap-timepicker">
                                                <div class="form-group">
                                                    <div class="input-group input-group">
                                                        <input id="start_time" name="start_time" type="text" class="form-control timepicker" value="<?= get_date_format($company_data['start_time'], 'h:i a'); ?>">

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>



                                    <div class="col-md-3 mb-2">
                                        <div class="form-group">
                                            <label>School ends at</label>
                                            <div class="bootstrap-timepicker">
                                                <div class="form-group">
                                                    <div class="input-group input-group">
                                                        <input id="end_time" name="end_time" type="text" class="form-control timepicker" value="<?= get_date_format($company_data['end_time'], 'h:i a'); ?>">

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                    <div class="col-md-3 form-group mb-2">
                                        <label class="font-weight-semibold">School Code </label>
                                        <input type="text" class="form-control" id="scode" name="scode" value="<?= $company_data['sc_code']; ?>" />
                                    </div>

                                    <div class="col-md-3 form-group mb-2">
                                        <label class="font-weight-semibold">School Location Code</label>
                                        <input type="text" class="form-control" id="lcode" name="lcode" value="<?= $company_data['lc_code']; ?>" />
                                    </div>
                                <?php endif ?>


                                <div class="col-md-6 form-group mb-2">
                                    <label>Address</label>
                                    <textarea class="form-control" id="address" name="address"><?= $company_data['address']; ?></textarea>
                                </div>

                                <div class="col-md-6 form-group mb-2">
                                    <label>About</label>
                                    <textarea class="form-control" id="about" name="about"><?= $company_data['about']; ?></textarea>
                                </div>

                                <div class="col-md-12 mt-2">
                                    <button type="button" id="save_org" class="SpriteGenix-primary-btn w-25">Save</button>
                                </div>
                            </div>
                        </form>
                    </div>

                </div>

            </div>

        </div>
    </div>
</div>

<!-- ////////////////////////// PAGE FOOTER END ///////////////////////// -->
<div class="sub_footer_bar d-flex justify-content-between">
    <div>
        <a href="<?= base_url('app_info') ?>" class="href_loader text-dark font-size-footer"><i class="bx bx-info-circle"></i> <span class="my-auto">App info</span></a>
        <a href="<?= base_url('tutorial_coming_soon') ?>" class="href_loader text-dark font-size-footer"><i class="bx bx-right-arrow ms-2"></i> <span class="my-auto">Tutorial</span></a>
    </div>
    <div>
        <a href="javascript:void(0);" class="text-dark font-size-footer"><i class="bx bx-calendar"></i> <span class="my-auto"><?= get_date_format(now_time($user['id']), 'd M Y') ?></span></a>

        <a href="<?= base_url('settings/preferences'); ?>" class="text-dark href_loader font-size-footer"><i class="bx bx-cog ms-2"></i> <span class="my-auto">App settings</span></a>
    </div>
</div>
<!-- ////////////////////////// PAGE FOOTER END ///////////////////////// -->