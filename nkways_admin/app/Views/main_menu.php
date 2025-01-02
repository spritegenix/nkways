<div class="topbar d-flex">
    <div class="right_bar d-flex justify-content-between w-100">
        <img src="<?= base_url('public/images/logo_full-white.png') ?>" class="app_logo my-auto me-2">


        <div class="position-relative search-bar-box my-auto">
            <form method="get" action="javascript:void(0);">
                <input type="hidden" name="csrf_SpriteGenix_token" value="026cc814ea22e7fa8b3d2345e42a6243"> <input type="text" class="SpriteGenix_focus form-control search-control" name="product_name" placeholder="Type to search..." autocomplete="off" id="wholesearch"> <span class="position-absolute top-50 search-show translate-middle-y"><i class="bx bx-search"></i></span>
                <span class="position-absolute top-50 search-close translate-middle-y"><i class="bx bx-x"></i></span>
            </form>
            <div class="search_result d-none">
                <div class="search_result_inner p-2">
                    <ul id="suggest">

                    </ul>
                </div>
            </div>

            <div class="searchbox_close_layer"></div>

        </div>


        <div class="d-flex">
            <?php if (is_school(company($user['id']))): ?>
                <a class="my-auto ms-2 text-light cursor-pointer href_loader font-size-topbar" href="<?= base_url('settings/academic_year') ?>">
                    <?= year_of_academic_year(academic_year($user['id'])) ?>
                </a>
            <?php endif ?>
            <a class="my-auto ms-2 text-light href_loader cursor-pointer font-size-topbar go_back_or_close" title="Back">
                <i class="bx bx-arrow-back"></i>
            </a>
            <a class="my-auto ms-2 text-light cursor-pointer font-size-topbar href_loader" title="Refresh" onclick="location.reload();">
                <i class="bx bx-refresh"></i>
            </a>

            <a class="my-auto ms-2 text-light position-relative cursor-pointer font-size-topbar href_loader" href="<?= base_url('notifications') ?>">
                <div id="bell"></div>
                <i class='bx bx-bell'></i>
            </a>




            <div class="dropdown my-auto">

                <a class="d-flex align-items-center nav-link pe-0" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <img src="<?= base_url(); ?>/public/images/avatars/<?php if ($user['profile_pic'] != '') {
                                                                            echo $user['profile_pic'];
                                                                        } else {
                                                                            echo 'avatar-icon.png';
                                                                        } ?>" class="user-img" alt="user avatar">
                    <div class="user-info ps-3">
                        <p class="user-name mb-0 text-light"><?= user_data($user['id'], 'display_name'); ?></p>
                        <p class="designattion mb-0 text-white-50"><?= get_company_data(company($user['id']), 'company_name') ?></p>
                    </div>
                </a>

                <ul class="dropdown-menu SpriteGenix-dropdown-menu">
                    <li><a class="dropdown-item href_loader" href="<?= base_url('settings'); ?>">Profile</a></li>
                    <li><a class="dropdown-item href_loader" href="<?= base_url('settings/organisation-setting'); ?>">Organisation settings</a></li>
                    <li><a class="dropdown-item href_loader" href="<?= base_url('branch_manager'); ?>">Branch Manager</a></li>
                    <li><a class="dropdown-item href_loader" href="<?= base_url('users/logout') ?>">Logout</a></li>
                </ul>
            </div>
        </div>

    </div>
</div>