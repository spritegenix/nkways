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
                    <b class="page_heading text-dark"><?= WEBSITE_NAME ?></b>
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
    <?= view('website_management/website_sidebar') ?>
    <div class="row website_margin position-relative p-0 h-100">

        <div class="site_view mb-3 h-100" style="height: 100%;">

            <div class="scrollbar-hider" style="overflow:hidden;border: 1px solid #d02057;border-radius: 10px; height: 100%;">
                <div class="scrollbar-hider-margin" style="margin-right: -17px; height: 100%;">
                    <iframe src="<?= convertToValidURL(WEBSITE_URL); ?>"
                        class="web_iframe"
                        frameborder="0" loading="lazy" style="height: 100%;">
                    </iframe>
                </div>
            </div>
        </div>
    </div>
</div>