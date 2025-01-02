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
                    <b class="page_heading text-dark">Social Media</b>
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
                    <a href="javascript:void(0);" class="SpriteGenix_table_export text-dark font-size-footer me-2" data-type="excel" data-table="#socialmedia_table" data-filename="Social media links - <?= get_date_format(now_time($user['id']), 'd M Y') ?>">
                        <span class="my-auto">Excel</span>
                    </a>
                    <a href="javascript:void(0);" class="SpriteGenix_table_export text-dark font-size-footer me-2" data-type="csv" data-table="#socialmedia_table" data-filename="Social media links - <?= get_date_format(now_time($user['id']), 'd M Y') ?>">
                        <span class="my-auto">CSV</span>
                    </a>
                    <a href="javascript:void(0);" class="SpriteGenix_table_export text-dark font-size-footer me-2" data-type="pdf" data-table="#socialmedia_table" data-filename="Social media links - <?= get_date_format(now_time($user['id']), 'd M Y') ?>">
                        <span class="my-auto">PDF</span>
                    </a>


                </div>

                <a data-bs-toggle="modal" data-bs-target="#addlinkmodal" class="text-dark font-size-footer my-auto ms-2 "> <span class="">+ Add link</span></a>
            </div>
            <!-- ////////////////////////// TOOL BAR END ///////////////////////// -->
        </div>



        <!-- ////////////////////////// MODAL ///////////////////////// -->

        <div class="modal fade" id="addlinkmodal" tabindex="-1" data-bs-backdrop="static" aria-labelledby="addlinkmodalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="addlinkmodalLabel">Add Link</h5>
                        <button type="button" class="btn-close close_school" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <form method="post" action="<?= base_url('website_management/social_media'); ?>" class="on_submit_loader">
                        <?= csrf_field() ?>
                        <div class="modal-body">
                            <div class="row">



                                <div class="form-group col-md-6 mb-2">

                                    <input type="text" class="form-control" placeholder="Social Media" name="socname" required>

                                </div>

                                <div class="form-group col-md-6 mb-2">

                                    <input type="text" class="form-control" placeholder="Url" name="soclink" required>

                                </div>

                                <div class="form-group col-md-6 mb-2">

                                    <input type="text" class="form-control" placeholder="Icon Class (ex: 'facebook')" name="socclass" required>

                                </div>

                                <div class="form-group col-md-6 mb-2">

                                    <input type="text" class="form-control" placeholder="User Id" name="socuserid">

                                </div>

                                <div class="form-group col-md-6 mb-2">

                                    <input type="text" class="form-control" placeholder="Access Token" name="socaccess">

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

            <table id="socialmedia_table" class="erp_table sortable">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Link</th>
                        <th>Class</th>
                        <th>User</th>
                        <th>Token</th>
                        <th class="text-center" data-tableexport-display="none">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <?php $cii = 0;
                    foreach ($social_medias as $sm): $cii++; ?>
                        <tr>
                            <td><?= $sm['name']; ?></td>
                            <td><?= $sm['link']; ?></td>
                            <td><?= $sm['class']; ?></td>
                            <td><?= $sm['userid']; ?></td>
                            <td><?= $sm['token']; ?></td>
                            <td data-tableexport-display="none" class="text-center">

                                <a class="text-primary" data-bs-toggle="modal" data-bs-target="#editsoc<?= $sm['id']; ?>"><i class="bx bx-pencil"></i></a>


                                <!-- Modal -->

                                <div class="modal fade" id="editsoc<?= $sm['id']; ?>" tabindex="-1" role="dialog" aria-hidden="true">

                                    <div class="modal-dialog modal-dialog-centered" role="document">

                                        <div class="modal-content">

                                            <div class="modal-header">

                                                <h5 class="modal-title"><?= $sm['name']; ?></h5>

                                                <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">

                                                    <span aria-hidden="true">&times;</span>

                                                </button>

                                            </div>
                                            <form method="post" action="<?= base_url('website_management/editsoc'); ?>" class="on_submit_loader">
                                                <?= csrf_field() ?>
                                                <div class="modal-body">


                                                    <div class="row">

                                                        <div class="form-group col-md-6 mb-2">

                                                            <input type="hidden" name="sid" value="<?= $sm['id']; ?>">

                                                            <input type="text" class="form-control" placeholder="Social Media" name="socname" value="<?= $sm['name']; ?>" required>

                                                        </div>

                                                        <div class="form-group col-md-6 mb-2">

                                                            <input type="text" class="form-control" placeholder="Url" name="soclink" value="<?= $sm['link']; ?>" required>

                                                        </div>

                                                        <div class="form-group col-md-6 mb-2">

                                                            <input type="text" class="form-control" placeholder="Icon Class (ex: 'facebook')" name="socclass" value="<?= $sm['class']; ?>" required>

                                                        </div>

                                                        <div class="form-group col-md-6 mb-2">

                                                            <input type="text" class="form-control" placeholder="User Id" name="socuserid" value="<?= $sm['userid']; ?>">

                                                        </div>

                                                        <div class="form-group col-md-6 mb-2">

                                                            <input type="text" class="form-control" placeholder="Access Token" name="socaccess" value="<?= $sm['token']; ?>">

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



                                <a class="text-danger delete_enquiries" data-url="<?= base_url('website_management/deletesoc'); ?>/<?= $sm['id']; ?>"><i class="bx bx-trash me-0" style="font-size: 18px;"></i></a>
                            </td>
                        </tr>
                    <?php endforeach ?>
                    <?php if ($cii < 1): ?>
                        <tr>
                            <td colspan="6" class="text-center text-danger">No links</td>
                        </tr>
                    <?php endif ?>
                </tbody>
            </table>
        </div>
    </div>

</div>