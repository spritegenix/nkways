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
                    <b class="page_heading text-dark">Payment Gateway</b>
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

            <form id="paymentway_form" action="<?= base_url('settings/save_paymentway'); ?>/<?= get_setting(company($user['id']), 'id'); ?>">
                <?= csrf_field(); ?>
                <div class="row m-0">

                    <div class="form-group mb-2">
                        <label>API Key</label>
                        <input type="text" oninput="apikeycheck();" class="form-control" required="required" id="api_key" name="api_key" value="<?= get_setting(company($user['id']), 'api_key') ?>" <?php if (get_setting(company($user['id']), 'enable_payment') == 1): echo 'disabled';
                                                                                                                                                                                                    endif; ?>>
                        <span id="error_msg" style="color: red; font-size: 13px;"></span>
                    </div>

                    <div class="form-group mb-3">
                        <label>Security Key</label>
                        <input type="text" class="form-control" required="required" id="security_key" name="security_key" value="<?= get_setting(company($user['id']), 'security_key') ?>" <?php if (get_setting(company($user['id']), 'enable_payment') == 1): echo 'disabled';
                                                                                                                                                                                            endif; ?>>
                    </div>


                    <div class="d-flex ">
                        <p>Enable payment gateway</p>
                        <div class="form-check form-switch cursor-pointer ms-5">
                            <input type="checkbox" class="form-check-input" id="enable_payment" name="enable_payment" value="1" <?php if (get_setting(company($user['id']), 'enable_payment') == 1): echo 'checked';
                                                                                                                                endif; ?>>
                        </div>

                    </div>

                    <div id="result" style="color: green; font-weight:700">


                    </div>
            </form>
        </div>
    </div>
</div>


<script type="text/javascript">
    function apikeycheck() {
        let api_key = document.querySelector('#api_key').value
        let error_msg = document.querySelector('#error_msg')
        if (api_key?.toString().length < 3 && api_key?.toString().length > 0) {
            error_msg.innerHTML = `minimum 3 letter needed !`
        } else {
            error_msg.innerHTML = ``
        }
    }
</script>