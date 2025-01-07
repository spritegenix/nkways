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
                    <b class="page_heading text-dark">Financial Years</b>
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
    <div class="col-lg-10 mx-auto">

        <div class="card radius-15 mb-3 ">
            <div class="card-body p-0">
                <?php if (current_financial_year('financial_from', company($user['id'])) == 'no_financial_years'): ?>
                    <button id="addnewfinancialyear" class="btn btn-facebook finacial_backg w-lg w-100 py-2">+ Start a new financial year</button>
                <?php else: ?>

                    <button class="btn w-lg finacial_backg activate_f_year  w-100 py-2 f_btn_hover" data-fyear="<?= current_financial_year('id', company($user['id'])) ?>">

                        <?php if (current_financial_year('id', company($user['id'])) == activated_year(company($user['id']))): ?>
                            <i class="bx bxs-check-circle btn_i"></i>
                        <?php endif ?>
                        <?= get_date_format(current_financial_year('financial_from', company($user['id'])), 'd M Y') ?> - <?= get_date_format(current_financial_year('financial_to', company($user['id'])), 'd M Y') ?><small> (current)</small>
                    </button>
                <?php endif ?>
            </div>
        </div>


        <?php foreach ($financial_years_array as $fy): ?>
            <div class="row">
                <!-- timeline item 1 left dot -->
                <div class="col-auto text-center flex-column d-none d-sm-flex">
                    <div class="row h-25">
                        <div class="col border-end border-dark">&nbsp;</div>

                        <div class="col">&nbsp;</div>
                    </div>
                    <h5 class="m-2">
                        <span class="badge rounded-pill  border <?php if ($fy['activated'] == activated_year(company($user['id']))): ?>
                                        bg-primary
                                <?php endif ?>">&nbsp;</span>


                    </h5>
                    <div class="row h-25">
                        <div class="col">&nbsp;</div>
                        <div class="col">&nbsp;</div>
                    </div>
                </div>
                <!-- timeline item 1 event content -->
                <div class="col py-2">
                    <div class="card radius-15">
                        <div class="card-body ">
                            <button class="py-2 cursor-pointer activate_f_year w-100 btn btn-primary" data-fyear="<?= $fy['id'] ?>">
                                <?php if ($fy['id'] == activated_year(company($user['id']))): ?>
                                    <i class="bx bxs-check-circle btn_i"></i>
                                <?php endif ?>

                                <?= get_date_format($fy['financial_from'], 'd M Y'); ?> - <?= get_date_format($fy['financial_to'], 'd M Y'); ?>

                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <!--/row-->
        <?php endforeach ?>

    </div>
</div>