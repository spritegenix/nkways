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

                <li class="breadcrumb-item active href_loader" aria-current="page">
                    <a href="<?= base_url('products'); ?>">Products</a>
                </li>

                <li class="breadcrumb-item active" aria-current="page">
                    <b class="page_heading text-dark">Products Settings</b>
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

<div class="no_toolbar_sub_main_page_content">
    <div class="row ">
        <div class="col-12 col-lg-12 col-md-12">
            <div class="d-flex justify-content-between">
                <h6 class=" my-auto text-uppercase">Product Category</h6>
                <a class="btn btn-inverse-primary btn-sm my-auto" data-bs-toggle="modal" data-bs-target="#pcate">+ Category</a>
            </div>
            <hr class="mt-2">
            <div class="card">
                <div class="card-body">
                    <ul class="list-group">
                        <?php foreach ($p_cate as $ct) { ?>
                            <li class="list-group-item d-flex justify-content-between">
                                <div class="me-2">
                                    <?= $ct['cat_department'] ?>. <b><?= $ct['cat_name']; ?></b> <small>[<?= $ct['slug']; ?>]</small>

                                </div>
                                <div class="d-flex my-auto">
                                    <a class="me-2 text-success " data-bs-toggle="modal" data-bs-target="#psubcate<?= $ct['id']; ?>"><i class="bx bxs-plus-circle"></i></a>
                                    <a class="text-info me-2" data-bs-toggle="modal" data-bs-target="#ed_pcate<?= $ct['id']; ?>"><i class="bx bx-pencil"></i></a>
                                    <a class="text-danger delete_product_cat" data-url="<?= base_url('settings/delete_product_cat'); ?>/<?= $ct['id']; ?>"><i class="bx bx-trash"></i></a>
                                </div>

                                <div class="modal fade aitposmodal" id="psubcate<?= $ct['id']; ?>" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                                    <div class="modal-dialog modal-dialog-centered" role="document">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h5 class="modal-title">Add Product Sub Category</h5>
                                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
                                                </button>
                                            </div>
                                            <form method="post" onsubmit="return preventDoubleSubmit(this);">
                                                <?= csrf_field(); ?>
                                                <div class="modal-body">
                                                    <div class="row">
                                                        <div class="col-md-12">
                                                            <div class="form-group">
                                                                <label for="input-2" class="form-label">Product Sub Category Name</label>
                                                                <input type="hidden" name="parent_category" value="<?= $ct['id']; ?>">
                                                                <input type="text" class="form-control modal_inpu" id="input-2" name="psubcate_name" required>
                                                                <input type="hidden" name="add_p_subcate">
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="modal-footer">
                                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                    <button type="submit" class="SpriteGenix-primary-btn spinner_btn prevent-double-submit">Save Category</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>

                                <div class="modal fade aitposmodal" id="ed_pcate<?= $ct['id']; ?>" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                                    <div class="modal-dialog modal-dialog-centered" role="document">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h5 class="modal-title">Edit Product Category</h5>
                                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
                                                </button>
                                            </div>
                                            <form method="post">
                                                <?= csrf_field(); ?>
                                                <div class="modal-body">
                                                    <div class="row">
                                                        <div class="col-md-12">
                                                            <div class="form-group">
                                                                <label for="input-2" class="modal_lab">Name</label>
                                                                <input type="hidden" name="ci" value="<?= $ct['id']; ?>">
                                                                <input type="text" class="form-control modal_inpu" id="input-2" name="pcate_name" value="<?= $ct['cat_name']; ?>" required>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="modal-footer">
                                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                    <button type="submit" class="SpriteGenix-primary-btn" name="edit_p_cate">Save Category</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </li>


                            <?php foreach (child_of_categories($ct['id']) as $sc) { ?>
                                <li class="list-group-item d-flex justify-content-between">
                                    <div class="me-2 text-danger" style="margin-left:15px;"><?= $sc['sub_cat_name']; ?></div>
                                    <div class="d-flex my-auto">
                                        <a class="me-2 text-danger" data-bs-toggle="modal" data-bs-target="#pseccate<?= $sc['id']; ?>"><i class="bx bxs-plus-circle"></i></a>
                                        <a class="text-info me-2" data-bs-toggle="modal" data-bs-target="#ed_psubcate<?= $sc['id']; ?>"><i class="bx bx-pencil"></i></a>
                                        <a class="text-danger delete_product_subcat" data-url="<?= base_url('settings/delete_product_subcat'); ?>/<?= $sc['id']; ?>"><i class="bx bx-trash"></i></a>
                                    </div>

                                    <div class="modal fade aitposmodal" id="pseccate<?= $sc['id']; ?>" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                                        <div class="modal-dialog modal-dialog-centered" role="document">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <h5 class="modal-title">Add Secondary Category</h5>
                                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
                                                    </button>
                                                </div>
                                                <form method="post" onsubmit="return preventDoubleSubmit(this);">
                                                    <?= csrf_field(); ?>
                                                    <div class="modal-body">
                                                        <div class="row">
                                                            <div class="col-md-12">
                                                                <div class="form-group">
                                                                    <label for="input-2" class="form-label">Product Secondary Category Name</label>
                                                                    <input type="hidden" name="parent_category" value="<?= $sc['id']; ?>">
                                                                    <input type="text" class="form-control modal_inpu" id="input-2" name="pseccate_name" required>
                                                                    <input type="hidden" name="add_p_seccate">
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="modal-footer">
                                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                        <button type="submit" class="SpriteGenix-primary-btn spinner_btn prevent-double-submit">Save Category</button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="modal fade aitposmodal" id="ed_psubcate<?= $sc['id']; ?>" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                                        <div class="modal-dialog modal-dialog-centered" role="document">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <h5 class="modal-title">Edit Sub Category</h5>
                                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
                                                    </button>
                                                </div>
                                                <form method="post">
                                                    <?= csrf_field(); ?>
                                                    <div class="modal-body">
                                                        <div class="row">
                                                            <div class="form-group mb-2 col-md-12">
                                                                <label for="input-5" class="modal_lab">Category</label>
                                                                <select class="form-control modal_inpu" name="parent_category" id="input-5" required>
                                                                    <option value="">Select Category</option>
                                                                    <?php foreach (product_categories_array(company($user['id'])) as $ct) { ?>
                                                                        <option value="<?= $ct['id']; ?>" <?php if ($sc['parent_id'] == $ct['id']) {
                                                                                                                echo 'selected';
                                                                                                            } ?>><?= $ct['cat_name']; ?></option>
                                                                    <?php } ?>
                                                                </select>
                                                            </div>

                                                            <div class="col-md-12">
                                                                <div class="form-group">
                                                                    <label for="input-2" class="modal_lab">Sub Category</label>
                                                                    <input type="hidden" name="si" value="<?= $sc['id']; ?>">
                                                                    <input type="text" class="form-control modal_inpu" id="input-2" name="psubcate_name" value="<?= $sc['sub_cat_name']; ?>" required>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="modal-footer">
                                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                        <button type="submit" class="SpriteGenix-primary-btn" name="edit_p_subcate">Save Category</button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </li>

                                <?php foreach (child_of_subcategories($sc['id']) as $scc) { ?>
                                    <li class="list-group-item d-flex justify-content-between">
                                        <div class="me-2 text-primary" style="margin-left: 30px;"><?= $scc['second_cat_name']; ?> </div>
                                        <div class="d-flex my-auto">
                                            <a class="text-info me-2" data-bs-toggle="modal" data-bs-target="#ed_pseccate<?= $scc['id']; ?>">
                                                <i class="bx bx-pencil"></i>
                                            </a>

                                            <a class="text-danger delete_product_seccat" data-url="<?= base_url('settings/delete_product_seccat'); ?>/<?= $scc['id']; ?>">
                                                <i class="bx bx-trash"></i>
                                            </a>
                                        </div>

                                        <div class="modal fade aitposmodal" id="ed_pseccate<?= $scc['id']; ?>" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                                            <div class="modal-dialog modal-dialog-centered" role="document">
                                                <div class="modal-content">
                                                    <div class="modal-header">
                                                        <h5 class="modal-title">Edit Secondary Category</h5>
                                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">

                                                        </button>
                                                    </div>
                                                    <form method="post">
                                                        <?= csrf_field(); ?>
                                                        <div class="modal-body">
                                                            <div class="row">
                                                                <div class="form-group col-md-12">
                                                                    <label for="input-5" class="modal_lab">Sub Category</label>
                                                                    <select class="form-control modal_inpu" name="parent_category" id="input-5" required>
                                                                        <option value="">Select Sub Category</option>
                                                                        <?php foreach (product_subcategories(company($user['id'])) as $ct) { ?>
                                                                            <option value="<?= $ct['id']; ?>" <?php if ($scc['parent_id'] == $ct['id']) {
                                                                                                                    echo 'selected';
                                                                                                                } ?>><?= $ct['sub_cat_name']; ?></option>
                                                                        <?php } ?>
                                                                    </select>
                                                                </div>

                                                                <div class="col-md-12">
                                                                    <div class="form-group">
                                                                        <label for="input-2" class="modal_lab">Secondary Category</label>
                                                                        <input type="hidden" name="si" value="<?= $scc['id']; ?>">
                                                                        <input type="text" class="form-control modal_inpu" id="input-2" name="pseccate_name" value="<?= $scc['second_cat_name']; ?>" required>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="modal-footer">
                                                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                            <button type="submit" class="SpriteGenix-primary-btn" name="edit_p_seccate">Save Category</button>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                <?php } ?>
                            <?php } ?>
                        <?php } ?>
                    </ul>
                </div>
            </div>
        </div>



        <div class="col-12 col-lg-12 col-md-12">
            <div class="d-flex justify-content-between">
                <h6 class=" my-auto text-uppercase">Product Brand</h6>
                <a class="btn btn-inverse-primary btn-sm my-auto" data-bs-toggle="modal" data-bs-target="#pbrand">+ Brand</a>
            </div>
            <hr class="mt-2">
            <div class="card">
                <div class="card-body">
                    <ul class="list-group">
                        <?php foreach ($p_brand as $pb) { ?>
                            <li class="list-group-item d-flex justify-content-between">
                                <div class="me-2"><?= $pb['brand_name']; ?> <small>[<?= $pb['slug']; ?>]</small></div>
                                <div class="d-flex my-auto">
                                    <a class="text-info me-2" data-bs-toggle="modal" data-bs-target="#ed_pbrand<?= $pb['id']; ?>">
                                        <i class="bx bx-pencil"></i>
                                    </a>
                                    <a class="text-danger delete_product_brand" data-url="<?= base_url('settings/delete_product_brand'); ?>/<?= $pb['id']; ?>">
                                        <i class="bx bx-trash"></i>
                                    </a>
                                </div>

                                <div class="modal fade aitposmodal" id="ed_pbrand<?= $pb['id']; ?>" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                                    <div class="modal-dialog modal-dialog-centered" role="document">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h5 class="modal-title">Edit Product Brand</h5>
                                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
                                                </button>
                                            </div>

                                            <form method="post">
                                                <?= csrf_field(); ?>
                                                <div class="modal-body">
                                                    <div class="row">
                                                        <div class="col-md-12">
                                                            <div class="form-group">
                                                                <label for="input-2" class="modal_lab">Product Brand</label>
                                                                <input type="hidden" name="pr" value="<?= $pb['id']; ?>">
                                                                <input type="text" class="form-control modal_inpu" id="input-2" name="pbrand_name" value="<?= $pb['brand_name']; ?>" required>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="modal-footer">
                                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                    <button type="submit" class="SpriteGenix-primary-btn" name="edit_p_brand">Update Brand</button>
                                                </div>
                                            </form>
                                        </div>

                                    </div>
                                </div>
                            </li>
                        <?php } ?>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <!--end row-->


    <div class="modal fade" id="unit" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Add new unit</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <form method="post">
                    <?= csrf_field(); ?>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="form-group mb-2">
                                    <label for="input-2" class="form-label">Name</label>
                                    <input type="text" class="form-control modal_inpu" id="input-2" name="unit_name" required>
                                </div>
                                <div class="form-group ">
                                    <input type="checkbox" class="" name="set_as_default_pu" value="1">
                                    <label class="form-label" for="term-conditionCheck"><?= langg(get_setting(company($user['id']), 'language'), 'Set as default'); ?></label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="submit" class="btn btn-dark spinner_btn" name="add_p_unit">Save Unit</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <div class="modal fade" id="pcate" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Add new category</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <form method="post" onsubmit="return preventDoubleSubmit(this);">
                    <?= csrf_field(); ?>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label for="input-2" class="form-label">Product Category Name</label>
                                    <input type="text" class="form-control modal_inpu" id="input-2" name="pcate_name" required>
                                </div>
                                <div class="form-group mt-1">
                                    <input type="hidden" class="form-control modal_inpu" value="<?= dpt_serial(company($user['id'])) ?>" name="cat_department" required>
                                    <input type="hidden" name="add_p_cate">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="submit" class="SpriteGenix-primary-btn spinner_btn prevent-double-submit">Save Category</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <div class="modal fade aitposmodal" id="pbrand" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Add Product Brand</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
                    </button>
                </div>
                <form method="post" onsubmit="return preventDoubleSubmit(this);">
                    <?= csrf_field(); ?>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-md-12 ">
                                <div class="form-group">
                                    <label for="input-2" class="form-label">Product Brand Name</label>
                                    <input type="text" class="form-control modal_inpu" id="input-2" name="pbrand_name" required>
                                    <input type="hidden" name="add_p_brand">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="submit" class="SpriteGenix-primary-btn spinner_btn prevent-double-submit">Save Brand</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>