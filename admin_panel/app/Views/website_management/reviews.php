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
                    <b class="page_heading text-dark">Reviews</b>
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
    <?= view('website_management/website_sidebar') ?>
    <div class="row website_margin position-relative p-0">


        <div class="col-lg-12">
            <!-- ////////////////////////// TOOL BAR START ///////////////////////// -->
            <div class="toolbar_sidebar d-flex justify-content-between">
                <div>
                    <a href="javascript:void(0);" class="SpriteGenix_table_export text-dark font-size-footer me-2" data-type="excel" data-table="#post_cat_table" data-filename="Website reviews - <?= get_date_format(now_time($user['id']), 'd M Y') ?>">
                        <span class="my-auto">Excel</span>
                    </a>
                    <a href="javascript:void(0);" class="SpriteGenix_table_export text-dark font-size-footer me-2" data-type="csv" data-table="#post_cat_table" data-filename="Website reviews - <?= get_date_format(now_time($user['id']), 'd M Y') ?>">
                        <span class="my-auto">CSV</span>
                    </a>
                    <a href="javascript:void(0);" class="SpriteGenix_table_export text-dark font-size-footer me-2" data-type="pdf" data-table="#post_cat_table" data-filename="Website reviews - <?= get_date_format(now_time($user['id']), 'd M Y') ?>">
                        <span class="my-auto">PDF</span>
                    </a>


                </div>

                <a data-bs-toggle="modal" data-bs-target="#addreviewmodal" class="text-dark font-size-footer my-auto ms-2 "> <span class="">+ Add reviews</span></a>
            </div>
            <!-- ////////////////////////// TOOL BAR END ///////////////////////// 
        </div> -->



            <!-- ////////////////////////// MODAL ///////////////////////// -->

            <div class="modal fade" id="addreviewmodal" tabindex="-1" data-bs-backdrop="static" aria-labelledby="addreviewmodalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered ">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="addreviewmodalLabel">Add Reviews</h5>
                            <button type="button" class="btn-close close_school" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form method="post" action="<?= base_url('website_management/add_review'); ?>" class="on_submit_loader" enctype="multipart/form-data">
                            <?= csrf_field() ?>
                            <div class="modal-body">
                                <div class="row">

                                    <!-- <div class="form-group col-md-6 mb-2">
                                        <label>Profile</label>
                                        <input type="file" class="form-control image_preview" name="profile_pic" accept="image/*" required>

                                    </div> -->
                                    <div class="form-group col-md-6 mb-2">
                                        <label>Name</label>
                                        <input type="text" class="form-control" name="user_name" required>

                                    </div>
                                    <div class="form-group col-md-6 mb-2">
                                        <label>Designation</label>
                                        <input type="text" class="form-control" name="designation" required>

                                    </div>
                                    <div class="form-group col-md-6 mb-2">
                                        <label>Ratings</label>
                                        <select class="form-select" required name="ratings">
                                            <option value="">Select</option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                        </select>

                                    </div>
                                    <div class="form-group col-md-12 mb-2">
                                        <label>Review</label>
                                        <textarea class="form-control" rows="4" name="review" required></textarea>

                                    </div>


                                </div>
                            </div>
                            <div class="modal-footer text-start py-1">
                                <button type="submit" class="SpriteGenix-primary-btn">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <!-- ////////////////////////// MODAL ///////////////////////// -->





            <div class="SpriteGenix_table col-12 w-100 pt-2 pb-5">

                <table id="post_cat_table" class="erp_table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Designation</th>
                            <!-- <th>Ratings</th> -->
                            <th>Review</th>
                            <th class="text-center" data-tableexport-display="none">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php $cii = 0;
                        foreach ($reviews as $rv): $cii++; ?>
                            <tr>
                                <td>
                                    <div class="d-flex">

                                        <!-- <div><img style="width: 40px;height: 40px;border-radius: 50%;
    object-fit: cover;border: 1px solid #920a36;" src="< ?= base_url(); ?>/public/images/review/< ?php if ($rv['profile_pic'] != '') {
                                                                                                    echo $rv['profile_pic'];
                                                                                                } else {
                                                                                                    echo 'prod.png';
                                                                                                } ?>"></div> -->
                                        <span class="my-auto ms-2"><?= $rv['user_name']; ?></span>
                                    </div>
                                </td>
                                <td><?= $rv['designation']; ?></td>
                                <td>
                                    <?php if ($rv['ratings'] == 1): ?>
                                        <div class="d-flex">
                                            <i class="bx bxs-star me-1" style="color:goldenrod;"></i>
                                            <i class="bx bxs-star me-1" style="color:#c7c7c7;"></i>
                                            <i class="bx bxs-star me-1" style="color:#c7c7c7;"></i>
                                            <i class="bx bxs-star me-1" style="color:#c7c7c7;"></i>
                                            <i class="bx bxs-star me-1" style="color:#c7c7c7;"></i>

                                        </div>
                                    <?php elseif ($rv['ratings'] == 2): ?>
                                        <div class="d-flex">
                                            <i class="bx bxs-star me-1" style="color:goldenrod;"></i>
                                            <i class="bx bxs-star me-1" style="color:goldenrod;"></i>
                                            <i class="bx bxs-star me-1" style="color:#c7c7c7;"></i>
                                            <i class="bx bxs-star me-1" style="color:#c7c7c7;"></i>
                                            <i class="bx bxs-star me-1" style="color:#c7c7c7;"></i>

                                        </div>
                                    <?php elseif ($rv['ratings'] == 3): ?>
                                        <div class="d-flex">
                                            <i class="bx bxs-star me-1" style="color:goldenrod;"></i>
                                            <i class="bx bxs-star me-1" style="color:goldenrod;"></i>
                                            <i class="bx bxs-star me-1" style="color:goldenrod;"></i>
                                            <i class="bx bxs-star me-1" style="color:#c7c7c7;"></i>
                                            <i class="bx bxs-star me-1" style="color:#c7c7c7;"></i>
                                        </div>
                                    <?php elseif ($rv['ratings'] == 4): ?>
                                        <div class="d-flex">
                                            <i class="bx bxs-star me-1" style="color:goldenrod;"></i>
                                            <i class="bx bxs-star me-1" style="color:goldenrod;"></i>
                                            <i class="bx bxs-star me-1" style="color:goldenrod;"></i>
                                            <i class="bx bxs-star me-1" style="color:goldenrod;"></i>
                                            <i class="bx bxs-star me-1" style="color:#c7c7c7;"></i>
                                        </div>
                                    <?php elseif ($rv['ratings'] == 5): ?>
                                        <div class="d-flex">
                                            <i class="bx bxs-star me-1" style="color:goldenrod;"></i>
                                            <i class="bx bxs-star me-1" style="color:goldenrod;"></i>
                                            <i class="bx bxs-star me-1" style="color:goldenrod;"></i>
                                            <i class="bx bxs-star me-1" style="color:goldenrod;"></i>
                                            <i class="bx bxs-star me-1" style="color:goldenrod;"></i>

                                        </div>

                                    <?php endif ?>

                                </td>
                                <td><?= $rv['review']; ?></td>
                                <td data-tableexport-display="none" class="text-center">

                                    <a class="text-primary" data-bs-toggle="modal" data-bs-target="#editreview<?= $rv['id']; ?>"><i class="bx bx-pencil"></i></a>



                                    <div class="modal fade" id="editreview<?= $rv['id']; ?>" tabindex="-1" role="dialog" aria-hidden="true">

                                        <div class="modal-dialog modal-dialog-centered text-start" role="document">

                                            <div class="modal-content">

                                                <div class="modal-header">

                                                    <h5 class="modal-title">Edit</h5>

                                                    <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">

                                                        <span aria-hidden="true">&times;</span>

                                                    </button>

                                                </div>
                                                <form method="post" action="<?= base_url('website_management/edit_review'); ?>" class="on_submit_loader" enctype="multipart/form-data">
                                                    <?= csrf_field() ?>
                                                    <div class="modal-body">


                                                        <div class="row">
                                                            <input type="hidden" name="rid" value="<?= $rv['id']; ?>">

                                                            <div class="form-group col-md-6 mb-2">
                                                                <label>Profile</label>
                                                                <input type="file" class="form-control image_preview" name="profile_pic" accept="image/*">

                                                            </div>
                                                            <div class="form-group col-md-6 mb-2">
                                                                <label>Name</label>
                                                                <input type="text" class="form-control" name="user_name" required value="<?= $rv['user_name']; ?>">

                                                            </div>
                                                            <div class="form-group col-md-6 mb-2">
                                                                <label>Designation</label>
                                                                <input type="text" class="form-control" name="designation" required value="<?= $rv['designation']; ?>">

                                                            </div>
                                                            <div class="form-group col-md-6 mb-2">
                                                                <label>Ratings</label>
                                                                <select class="form-select" required name="ratings">
                                                                    <option value="1" <?php if ($rv['ratings'] == 1) {
                                                                                            echo 'selected';
                                                                                        } ?>>1</option>
                                                                    <option value="2" <?php if ($rv['ratings'] == 2) {
                                                                                            echo 'selected';
                                                                                        } ?>>2</option>
                                                                    <option value="3" <?php if ($rv['ratings'] == 3) {
                                                                                            echo 'selected';
                                                                                        } ?>>3</option>
                                                                    <option value="4" <?php if ($rv['ratings'] == 4) {
                                                                                            echo 'selected';
                                                                                        } ?>>4</option>
                                                                    <option value="5" <?php if ($rv['ratings'] == 5) {
                                                                                            echo 'selected';
                                                                                        } ?>>5</option>
                                                                </select>

                                                            </div>
                                                            <div class="form-group col-md-12 mb-2">
                                                                <label>Review</label>
                                                                <textarea class="form-control" rows="4" name="review" required><?= $rv['review']; ?></textarea>

                                                            </div>

                                                        </div>



                                                    </div>

                                                    <div class="modal-footer text-start py-1">
                                                        <button type="submit" class="SpriteGenix-primary-btn">Save</button>
                                                    </div>

                                                </form>

                                            </div>

                                        </div>

                                    </div>

                                    <a class="text-danger delete_enquiries" data-url="<?= base_url('website_management/delete_review'); ?>/<?= $rv['id']; ?>"><i class="bx bx-trash me-0" style="font-size: 18px;"></i></a>
                                </td>
                            </tr>

                        <?php endforeach ?>


                        <?php if ($cii < 1): ?>
                            <tr>
                                <td colspan="5" class="text-center text-danger">No reviews</td>
                            </tr>
                        <?php endif ?>



                    </tbody>
                </table>
            </div>
        </div>

    </div>