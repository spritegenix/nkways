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

                <li class="breadcrumb-item">
                    <a href="<?= base_url('website_management'); ?>" class="href_loader"><?= WEBSITE_NAME ?></a>
                </li>

                <li class="breadcrumb-item active" aria-current="page">
                    <b class="page_heading text-dark">Posts</b>
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


<!-- ////////////////////////// TOOL BAR START ///////////////////////// -->
<div class="toolbar d-flex justify-content-between">

    <div class="d-flex">

        <div class="my-auto">

            <a href="javascript:void(0);" class="SpriteGenix_table_export text-dark font-size-footer me-2" data-bs-toggle="collapse" data-bs-target="#pro_filter">
                <span class="my-auto">Filter</span>
            </a>
        </div>



    </div>

    <div class="d-flex">
        <a href="<?= base_url('website_management/create_post'); ?>" class="text-dark font-size-footer href_loader ms-2 my-auto"> <span class="my-auto">+ New post</span></a>
    </div>

</div>
<!-- ////////////////////////// TOOL BAR END ///////////////////////// -->







<div id="pro_filter" class=" accordion-collapse col-12 border-0 collapse">
    <div class="filter_bar">
        <!-- FILTER -->
        <form method="get" class="d-flex">
            <?= csrf_field(); ?>

            <div class="position-relative w-100">
                <input type="text" class="form-control ps-5" placeholder="Search title..." name="post_title"> <span class="position-absolute top-50 product-show_search translate-middle-y"><i class="bx bx-search"></i></span>
            </div>


            <button type="submit" class="btn-dark btn-sm"><?= langg(get_setting(company($user['id']), 'language'), 'Filter'); ?></button>
            <a class=" btn-outline-dark btn btn-sm" href="<?= base_url('products') ?>"><?= langg(get_setting(company($user['id']), 'language'), 'Clear'); ?></a>
        </form>
        <!-- FILTER -->
    </div>
</div>



<div class="sub_main_page_content pb-5">

    <div id="synmes" class="mb-2">

    </div>

    <div class="row  product-grid pb-3" style="">
        <div class="table_box pb-5">
            <table id="product_list_table" class="w-100">
                <thead>
                    <tr>
                        <th class="text-center" style="max-width: 600px; width:600px;">Post</th>
                        <th class="text-center">Type</th>
                        <th class="text-center">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <?php $pi = 0;
                    foreach ($posts as $po): $pi++; ?>
                        <tr>

                            <td>
                                <div class="d-flex py-1">

                                    <?php if ($po['featured'] != ''): ?>
                                        <img onclick="location.href='<?= base_url('website_management/edit_post'); ?>/<?= $po['id']; ?>';" src="<?= base_url(); ?>/public/images/posts/<?php if ($po['featured'] != '') {
                                                                                                                                                                                            echo $po['featured'];
                                                                                                                                                                                        } else {
                                                                                                                                                                                            echo 'prod.png';
                                                                                                                                                                                        } ?>" class="href_loader card-img-top me-2 pro_featured " draggable="false" style="-moz-user-select: none; background-repeat: no-repeat, repeat;
                                    background-image: url('<?= base_url(); ?>/public/images/posts/<?php if ($po['featured'] != '') {
                                                                                                        echo $po['featured'];
                                                                                                    } else {
                                                                                                        echo 'prod.png';
                                                                                                    } ?>'), url('');
                                        background-blend-mode: lighten;" ondragstart="return false;">
                                    <?php else: ?>
                                        <div class="image_box d-flex me-2">
                                            <i class="bx bx-plus-circle m-auto"></i>
                                        </div>
                                    <?php endif ?>



                                    <div class="my-auto w-100 pro_box">
                                        <a href="<?= base_url('website_management/edit_post'); ?>/<?= $po['id']; ?>" title="<?= $po['title'] ?>">
                                            <h6 class="text_over_flow_2 text-dark">
                                                <b><?= $po['title'] ?></b>
                                            </h6>
                                        </a>
                                        <p class="category_text d-flex justify-content-between mt-1">

                                            <span>
                                                <span class="text-dark text-capitalize">[ <?= $po['post_type']; ?> post ]</span>


                                                <?php if (!empty($po['category'])): ?>
                                                    <?= name_of_post_category($po['category']); ?>
                                                <?php endif ?>
                                                <?php if (!empty($po['sub_category'])): ?>
                                                    > </i><?= name_of_sub_post_category($po['sub_category']); ?>
                                                <?php endif ?>
                                                <?php if (!empty($po['sec_category'])): ?>
                                                    > </i><?= name_of_sec_post_category($po['sec_category']); ?>
                                                <?php endif ?>
                                            </span>


                                            <small class="">
                                                <b class="<?= ($po['status'] == 'published') ? 'text-success' : 'text-SpriteGenix-red' ?>"><?= $po['status']; ?></b> on <span class="text-dark"><?= get_date_format($po['datetime'], 'd M Y'); ?></span>
                                            </small>

                                        </p>



                                    </div>
                                </div>


                            </td>
                            <td class="text-center">
                                <div class="pro_box_details">
                                    <div>
                                        <small class=" text-capitalize"><span><?= $po['title']; ?></span></small>

                                    </div>
                                    <span class="price_label mt-1"></span>
                                    <small class="text-success"></small>
                                </div>
                            </td>


                            <td class="text-center">
                                <div class="dropdown dropdown-animated scale-left">
                                    <a class="btn btn-outline-dark btn-sm font-size-18" href="javascript:void(0);" data-bs-toggle="dropdown">
                                        <i class="bx bx-dots-horizontal"></i>
                                    </a>
                                    <div class="dropdown-menu">



                                        <a href="<?php echo base_url('website_management/edit_post'); ?>/<?= $po['id']; ?>" class="dropdown-item href_loader" title="Edit">
                                            <i class="bx bx-pencil"></i>
                                            <span class="ms-3">Edit</span>
                                        </a>

                                        <a data-url="<?php echo base_url('website_management/deletepost'); ?>/<?= $po['id']; ?>" class="dropdown-item product_delete text-danger-dropdown-link" title="delete">
                                            <i class="bx bx-trash"></i>
                                            <span class="ms-3">Delete</span>
                                        </a>

                                    </div>
                                </div>
                            </td>
                        </tr>
                    <?php endforeach; ?>

                    <?php if ($pi < 1): ?>
                        <tr>
                            <td colspan="3" class="text-center text-danger">No posts</td>
                        </tr>
                    <?php endif ?>
                </tbody>
            </table>
        </div>
    </div><!--end row-->




    <div class="sub_footer_bar d-flex justify-content-between">
        <div class="b_ft_bn">
            <a href="<?= base_url('website_management'); ?>" class="text-dark font-size-footer me-2 href_loader"><i class="bx bx-arrow-back ms-2"></i> <span class="my-auto">Back to website management</span></a>
        </div>
        <div class="SpriteGenix_pagination">
            <?= $pager->links() ?>
        </div>
    </div>

</div>