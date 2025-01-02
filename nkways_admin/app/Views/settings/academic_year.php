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
                    <b class="page_heading text-dark">Academic Years</b>
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
<div class="toolbar d-flex justify-content-end">

    <div>
        <a type="button" data-bs-toggle="modal" data-bs-target="#newyear" class="text-dark font-size-footer ms-2"> <span class="my-auto">New Year</span></a>
    </div>

</div>
<!-- ////////////////////////// TOOL BAR END ///////////////////////// -->
<div class="modal fade SpriteGenix-modal" id="newyear">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalCenterTitle">Add new</h5>
                <button type="button" class="close" data-bs-dismiss="modal">
                    <i class="bx bx-close"></i>
                </button>
            </div>
            <form action="<?= base_url('settings/academic_year'); ?>" method="POST" onsubmit="return preventDoubleSubmit(this);">
                <?= csrf_field() ?>
                <div class="modal-body">

                    <div class="form-group">
                        <label class="font-weight-semibold">Current Academic Year Start:</label>
                        <input type="number" min="1900" max="2099" step="1" class="form-control" required="required" id="academic_year" name="academic_yearfrom">
                    </div>

                    <div class="form-group">
                        <label class="font-weight-semibold">Current Academic Year End:</label>
                        <input type="number" min="1900" max="2099" step="1" class="form-control" required="required" id="academic_year" name="academic_yearto">
                    </div>

                </div>
                <div class="modal-footer">
                    <button type="button" class="no-btn btn-default" data-bs-dismiss="modal">Close</button>
                    <button type="submit" class="SpriteGenix-primary-btn prevent-double-submit">Save</button>
                </div>
            </form>
        </div>
    </div>
</div>

<div class="sub_main_page_content">
    <?php foreach ($academic_years as $ay): ?>
        <div class="">
            <div class="m-b-25">
                <div class="d-flex align-items-center justify-content-between">

                    <div class="media d-flex align-items-center">
                        <div class="font_academic">
                            <i class="bx bx-file text-danger"></i>
                        </div>
                        <div class="m-l-15 mx-3">
                            <h6 class="m-b-0 my-auto">
                                <a class="text-dark no_loader" href="javascript:void(0);"><?= $ay['year']; ?></a>

                                <?php if (academic_year($user['id']) == $ay['id']): ?>
                                    <span class="ms-2 text-success"><i class="me-2 bx bx-check-circle"></i>active</span>
                                <?php endif ?>
                            </h6>

                        </div>
                    </div>
                    <div class="dropdown dropdown-animated scale-left">
                        <a class="text-dark font-size-18" href="javascript:void(0);" data-bs-toggle="dropdown">
                            <i class="bx bx-dots-horizontal"></i>
                        </a>
                        <div class="dropdown-menu">
                            <a class="dropdown-item" href="<?= base_url('settings/change_academic_year'); ?>/<?= $ay['id']; ?>">
                                <i class="bx bx-show-alt"></i>
                                <span class="ms-3">Activate</span>
                            </a>
                            <button class="dropdown-item" type="button" data-bs-toggle="modal" data-bs-target="#modify<?= $ay['id']; ?>">
                                <i class="bx bx-download"></i>
                                <span class="ms-3">Modify</span>
                            </button>
                            <button class="dropdown-item confirm_before_link" data-href="<?= base_url('settings/delete_academic_year'); ?>/<?= $ay['id']; ?>">
                                <i class="bx bx-trash"></i>
                                <span class="ms-3">Remove</span>
                            </button>
                        </div>
                    </div>

                    <div class="modal fade SpriteGenix-modal" id="modify<?= $ay['id']; ?>">
                        <div class="modal-dialog modal-dialog-centered">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalCenterTitle">Add new</h5>
                                    <button type="button" class="close" data-dismiss="modal">
                                        <i class="anticon anticon-close"></i>
                                    </button>
                                </div>
                                <form action="<?= base_url('settings/edit_academic_year'); ?>/<?= $ay['id']; ?>" method="POST">
                                    <?= csrf_field() ?>
                                    <div class="modal-body">

                                        <div class="form-group">
                                            <label class="font-weight-semibold">Current Academic Year Start:</label>
                                            <input type="number" min="1900" max="2099" step="1" class="form-control" required="required" id="academic_year" name="academic_yearfrom" value="<?= academic_year_value('from', $ay['year']); ?>">
                                        </div>

                                        <div class="form-group">
                                            <label class="font-weight-semibold">Current Academic Year End:</label>
                                            <input type="number" min="1900" max="2099" step="1" class="form-control" required="required" id="academic_year" name="academic_yearto" value="<?= academic_year_value('to', $ay['year']); ?>">
                                        </div>

                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-default" data-bs-dismiss="modal">Close</button>
                                        <button type="submit" class="SpriteGenix-primary-btn btn-sm">Save changes</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        <?php endforeach ?>

        </div>
</div>