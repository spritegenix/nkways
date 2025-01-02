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
                    <b class="page_heading text-dark">Caste Category</b>
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
        <div class="col-md-12 row">
            <div class="col-md-6">
                <div class="d-flex justify-content-between">
                    <h6 class="fw-bold  my-auto">Category</h6>
                    <a class="font-size-topbar me-2 action_btn cursor-pointer my-auto" data-bs-toggle="modal" data-bs-target="#caste_cat_add"><i class="bx bxs-plus-circle"></i></a>
                </div>

                <!-- Modal -->
                <div class="modal fade" id="caste_cat_add">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="addteamLabel">Add Category</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>

                            <form method="post" action="<?= base_url('settings/add_caste_category'); ?>" onsubmit="return preventDoubleSubmit(this);">
                                <?= csrf_field() ?>
                                <div class="modal-body">
                                    <div class="form-group col-md-12">
                                        <input type="text" class="form-control" name="stdcategory" placeholder="Caste Category " required>
                                    </div>
                                </div>
                                <div class="modal-footer text-start py-1">
                                    <button type="submit" class="SpriteGenix-primary-btn prevent-double-submit">Save</button>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
                <!-- Modal -->

                <hr class="mt-0">

                <div class="card">
                    <div class="card-body">
                        <ul class="list-inline mb-0">
                            <?php $i = 0;
                            foreach ($student_cat as $stc): $i++; ?>
                                <li class="border-bottom py-2">
                                    <div class="d-flex justify-content-between">
                                        <p class="m-0"><?= $stc['category_name']; ?></p>

                                        <div>

                                            <a class="btn-edit-dark me-2 action_btn cursor-pointer" data-bs-toggle="modal" data-bs-target="#stdcatedit<?= $stc['id'] ?>"><i class="bx bxs-edit-alt"></i></a>
                                            <?php if ($stc['default'] != 1): ?>
                                                <a class="btn-delete-red action_btn cursor-pointer deletecastecategory" data-deleteurl="<?= base_url('settings/deletestdcat'); ?>/<?= $stc['id']; ?>"><i class="bx bxs-trash"></i></a>
                                            <?php endif ?>
                                        </div>
                                    </div>


                                    <!-- Modal -->
                                    <div class="modal fade" id="stdcatedit<?= $stc['id'] ?>">
                                        <div class="modal-dialog modal-dialog-centered">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <h5 class="modal-title" id="addteamLabel">Edit Category</h5>
                                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>

                                                <form method="post" action="<?= base_url('settings/edit_caste_category'); ?>/<?= $stc['id'] ?>">
                                                    <?= csrf_field() ?>
                                                    <div class="modal-body">
                                                        <div class="form-group col-md-12">
                                                            <input type="text" class="form-control" name="stdcategory" value="<?= $stc['category_name'] ?>" placeholder="Caste Category " required>
                                                        </div>
                                                    </div>
                                                    <div class="modal-footer text-start py-1">
                                                        <button type="submit" class="SpriteGenix-primary-btn">Save</button>
                                                    </div>
                                                </form>

                                            </div>
                                        </div>
                                    </div>
                                    <!-- Modal -->
                                </li>

                            <?php endforeach ?>
                            <?php if ($i == 0): ?>
                                <li>
                                    <h6 class="text-danger text-center fw-bold p-4">No Category</h6>
                                </li>
                            <?php endif ?>
                        </ul>
                    </div>
                </div>

            </div>

            <div class="col-md-6">
                <div class="d-flex justify-content-between">
                    <h6 class="fw-bold  my-auto">Sub Category</h6>
                    <a class="font-size-topbar me-2 action_btn cursor-pointer my-auto" data-bs-toggle="modal" data-bs-target="#caste_subcat_add"><i class="bx bxs-plus-circle"></i></a>
                </div>

                <!-- Modal -->
                <div class="modal fade" id="caste_subcat_add">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="addteamLabel">Add Sub Category</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>

                            <form method="post" action="<?= base_url('settings/add_caste_sub_category'); ?>" onsubmit="return preventDoubleSubmit(this);">
                                <?= csrf_field() ?>
                                <div class="modal-body">

                                    <div class="form-group col-md-12 mb-3">
                                        <select class="form-select" name="stdcategory" required>
                                            <option value="">Select Caste Category</option>
                                            <?php foreach (student_category_array(company($user['id'])) as $sac): ?>
                                                <option value="<?= $sac['id']; ?>"><?= student_category_name($sac['id']); ?></option>
                                            <?php endforeach ?>
                                        </select>
                                    </div>

                                    <div class="form-group col-md-12">
                                        <input type="text" class="form-control" name="stdsubcategory" placeholder="Caste Sub Category" required>
                                    </div>
                                </div>
                                <div class="modal-footer text-start py-1">
                                    <button type="submit" class="SpriteGenix-primary-btn prevent-double-submit">Save</button>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
                <!-- Modal -->

                <hr class="mt-0">


                <div class="card">
                    <div class="card-body">
                        <ul class="list-inline mb-0">
                            <?php $i = 0;
                            foreach ($student_sub_cat as $stsub): $i++; ?>
                                <li class="border-bottom py-2">
                                    <div class="d-flex justify-content-between">

                                        <p class="m-0"><?= student_category_name($stsub['parent_id']); ?> <i class="bx bxs-chevron-right"></i> <?= $stsub['category_name']; ?></p>

                                        <div>
                                            <a class="btn-edit-dark me-2 action_btn cursor-pointer" data-bs-toggle="modal" data-bs-target="#stdsubcatedit<?= $stsub['id'] ?>"><i class="bx bxs-edit-alt"></i></a>

                                            <a class="btn-delete-red action_btn cursor-pointer deletecastecategory" data-deleteurl="<?= base_url('settings/deletestdsubcat'); ?>/<?= $stsub['id']; ?>"><i class="bx bxs-trash"></i></a>
                                        </div>
                                    </div>


                                    <!-- Modal -->
                                    <div class="modal fade" id="stdsubcatedit<?= $stsub['id'] ?>">
                                        <div class="modal-dialog modal-dialog-centered">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <h5 class="modal-title" id="addteamLabel">Edit Sub Category</h5>
                                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>

                                                <form method="post" action="<?= base_url('settings/edit_caste_sub_category'); ?>/<?= $stsub['id'] ?>">
                                                    <?= csrf_field() ?>
                                                    <div class="modal-body">

                                                        <div class="form-group col-md-12 mb-3">
                                                            <select class="form-select" name="stdcategory">
                                                                <?php foreach (student_category_array(company($user['id'])) as $scata): ?>
                                                                    <option value="<?= $scata['id']; ?>" <?php if ($scata['id'] == $stsub['parent_id']) {
                                                                                                                echo 'selected';
                                                                                                            } ?>><?= student_category_name($scata['id']); ?></option>
                                                                <?php endforeach ?>
                                                            </select>
                                                        </div>

                                                        <div class="form-group col-md-12">
                                                            <input type="text" class="form-control" name="stdsubcategory" value="<?= $stsub['category_name'] ?>" placeholder="Caste Category " required>
                                                        </div>
                                                    </div>
                                                    <div class="modal-footer text-start py-1">
                                                        <button type="submit" class="SpriteGenix-primary-btn">Save</button>
                                                    </div>
                                                </form>

                                            </div>
                                        </div>
                                    </div>
                                    <!-- Modal -->
                                </li>

                            <?php endforeach ?>
                            <?php if ($i == 0): ?>
                                <li>
                                    <h6 class="text-danger text-center fw-bold p-4">No Sub Category</h6>
                                </li>
                            <?php endif ?>
                        </ul>
                    </div>
                </div>


            </div>
        </div>
    </div>

</div>