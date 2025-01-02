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
                    <b class="page_heading text-dark">SMS & Email Configurations</b>
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



<div class="main_page_content ">
    <?= view('settings/settings_sidebar') ?>
    <div class="row setting_margin">
        <div class="col-lg-12">
            <form method="post">
                <?= csrf_field(); ?>
                <div class="col-md-12 row m-0">

                    <div class="form-group col-lg-4 mb-3">
                        <label for="input-5" class="form-label d-block">SMS Sender</label>
                        <input type="text" name="sms_sender" class="form-control" value="<?= $conf['sms_sender']; ?>">
                    </div>

                    <div class="form-group col-lg-4 mb-3">
                        <label for="input-5" class="form-label d-block">Receiver's phone number</label>
                        <input type="text" name="receivers_phone" class="form-control" value="<?= $conf['receivers_phone']; ?>">
                    </div>

                    <div class="form-group col-lg-4 mb-3">
                        <label for="input-5" class="form-label d-block">Source ref</label>
                        <input type="text" name="source_ref" class="form-control" value="<?= $conf['source_ref']; ?>">
                    </div>
                    <div class="col-md-12">
                        <hr>
                    </div>

                    <div class="form-group col-lg-6 mb-3">
                        <label for="input-5" class="form-label d-block">SMTP Host</label>
                        <input type="text" name="smtp_host" class="form-control" value="<?= $conf['smtp_host']; ?>">
                    </div>

                    <div class="form-group col-lg-6 mb-3">
                        <label for="input-5" class="form-label d-block">SMTP User</label>
                        <input type="text" name="smtp_user" class="form-control" value="<?= $conf['smtp_user']; ?>">
                    </div>

                    <div class="form-group col-lg-6 mb-3">
                        <label for="input-5" class="form-label d-block">SMTP Password</label>
                        <input type="text" name="smtp_password" class="form-control" value="<?= $conf['smtp_password']; ?>">
                    </div>

                    <div class="form-group col-lg-6 mb-3">
                        <label for="input-5" class="form-label d-block">SMTP Port</label>
                        <input type="text" name="smtp_port" class="form-control" value="<?= $conf['smtp_port']; ?>">
                    </div>

                    <div class="form-group col-lg-6 mb-3">
                        <label for="input-5" class="form-label d-block">From Email </label>
                        <input type="text" name="from_email" class="form-control" value="<?= $conf['from_email']; ?>">
                    </div>

                    <div class="form-group col-lg-6 mb-3">
                        <label for="input-5" class="form-label d-block">From Name</label>
                        <input type="text" name="from_name" class="form-control" value="<?= $conf['from_name']; ?>">
                    </div>

                    <div class="form-group col-md-12">
                        <button class="SpriteGenix-primary-btn" name="save_sms_email">Save</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>