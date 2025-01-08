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
                    <b class="page_heading text-dark">All Mails</b>
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
                    <!-- <a href="javascript:void(0);" class="SpriteGenix_table_export text-dark font-size-footer me-2" data-type="excel" data-table="#website_enquiries" data-filename="Website enquiries - <?= get_date_format(now_time($user['id']), 'd M Y') ?>">
                        <span class="my-auto">Excel</span>
                    </a>
                    <a href="javascript:void(0);" class="SpriteGenix_table_export text-dark font-size-footer me-2" data-type="csv" data-table="#website_enquiries" data-filename="Website enquiries - <?= get_date_format(now_time($user['id']), 'd M Y') ?>">
                        <span class="my-auto">CSV</span>
                    </a>
                    <a href="javascript:void(0);" class="SpriteGenix_table_export text-dark font-size-footer me-2" data-type="pdf" data-table="#website_enquiries" data-filename="Website enquiries - <?= get_date_format(now_time($user['id']), 'd M Y') ?>">
                        <span class="my-auto">PDF</span>
                    </a>

                    <a href="javascript:void(0);" class="SpriteGenix_table_export text-dark font-size-footer me-2" data-bs-toggle="collapse" data-bs-target="#filter">
                        <span class="my-auto">Filter</span>
                    </a> -->

                    <a href="javascript:void(0);" class="SpriteGenix_table_quick_search text-dark font-size-footer me-2" data-table="#website_enquiries">
                        <span class="my-auto">Quick search</span>
                    </a>




                </div>


            </div>
            <!-- ////////////////////////// TOOL BAR END ///////////////////////// -->
        </div>


        <div id="filter" class=" accordion-collapse col-12 border-0 collapse">
            <div class="tool_filter_bar">
                <!-- FILTER -->
                <form method="get" class="d-flex">
                    <?= csrf_field(); ?>

                    <input type="text" name="name" placeholder="<?= 'Name/Email'; ?>" class="form-control form-control-sm filter-control ">



                    <button class=" btn-dark btn-sm"><?= 'Filter'; ?></button>
                    <a class=" btn-outline-dark btn btn-sm" href="<?= base_url('customers') ?>"><?= 'Clear'; ?></a>


                </form>
                <!-- FILTER -->
            </div>
        </div>

        <div class="SpriteGenix_table col-12 w-100 pt-2 pb-5">

            <table id="website_enquiries" class="erp_table sortable">
                <thead>
                    <tr>
                        <th class="sorticon">Name</th>
                        <th class="sorticon">Email</th>
                        <th class="sorticon">Phone</th>
                        <th class="sorticon">Subject</th>
                        <th class="sorticon">message</th>
                        <th class="sorticon">action</th>
                    </tr>
                </thead>
                <tbody>
                    <?php foreach ($mails as $enq): ?>
                        <tr>
                            <td>
                                <div><?= $enq['name'] ?></div>
                            </td>
                            <td>
                                <div><?= $enq['email'] ?></div>
                            </td>
                            <td>
                                <div><?= $enq['mblno'] ?></div>
                            </td>
                            <td>
                                <div><?= $enq['subject'] ?></div>
                            </td>
                            <td>
                                <div><?= $enq['msg'] ?></div>
                            </td>

                            <!-- <td style="max-width:700px; width: 700px;">
                                <b>< ?= $enq['subject'] ?></b><br>
                                <a data-bs-toggle="collapse" data-bs-target="#flush-collapseOne<?= $enq['id'] ?>" class="SpriteGenix_link" data-tableexport-display="none">More details</a><br>
                                <div id="flush-collapseOne< ?= $enq['id'] ?>" class=" collapse enq_message_box">
                                    < ?= $enq['msg'] ?>
                                </div>
                                <span>< ?= get_date_format($enq['datetime'], 'd M Y h:i A') ?></span>
                            </td> -->
                            <!-- <td data-tableexport-display="none" class="text-center">
                                <a class="text-danger delete_enquiries" data-url="< ?= base_url('website_management/delete_enquiries'); ?>/<?= $enq['id']; ?>"><i class="bx bx-trash me-0" style="font-size: 18px;"></i></a>
                            </td> -->
                            <td>
                                <a class="text-danger delete_enquiries" data-url="<?= base_url('website_management/delete_mail'); ?>/<?= $enq['id']; ?>"><i class="bx bx-trash me-0" style="font-size: 18px;"></i></a>

                            </td>
                        </tr>
                    <?php endforeach ?>
                </tbody>
            </table>
        </div>
    </div>

</div>