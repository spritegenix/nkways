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
                    <b class="page_heading text-dark">Prefixes</b>
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
    <?= view('settings/settings_sidebar') ?>
    <div class="row setting_margin">
        <div class="col-lg-12">

            <form method="post">
                <?= csrf_field(); ?>
                <div class="row m-0">

                    <div class="form-group col-md-4 mb-3">
                        <label for="input-5" class="form-label">Major Prefix</label>
                        <input type="text" class="form-control" name="invoice_prefix" value="<?= $c_set['invoice_prefix']; ?>" placeholder="ex: INV">
                    </div>

                    <div class="form-group col-md-4 mb-3">
                        <label for="input-5" class="form-label">Sales</label>
                        <input type="text" class="form-control" name="sales_prefix" value="<?= $c_set['sales_prefix']; ?>" placeholder="ex: SL">
                    </div>

                    <div class="form-group col-md-4 mb-3">
                        <label for="input-5" class="form-label">Proforma Invoice</label>
                        <input type="text" class="form-control" name="proforma_invoice_prefix" value="<?= $c_set['proforma_invoice_prefix']; ?>" placeholder="ex: PI">
                    </div>

                    <div class="form-group col-md-4 mb-3">
                        <label for="input-5" class="form-label">Sales Order</label>
                        <input type="text" class="form-control" name="sales_order_prefix" value="<?= $c_set['sales_order_prefix']; ?>" placeholder="ex: SO">
                    </div>

                    <div class="form-group col-md-4 mb-3">
                        <label for="input-5" class="form-label">Sales Quotation</label>
                        <input type="text" class="form-control" name="sales_quotation_prefix" value="<?= $c_set['sales_quotation_prefix']; ?>" placeholder="ex: SQ">
                    </div>

                    <div class="form-group col-md-4 mb-3">
                        <label for="input-5" class="form-label">Sale Return</label>
                        <input type="text" class="form-control" name="sales_return_prefix" value="<?= $c_set['sales_return_prefix']; ?>" placeholder="ex: SR">
                    </div>

                    <div class="form-group col-md-4 mb-3">
                        <label for="input-5" class="form-label">Sales Delivery Note</label>
                        <input type="text" class="form-control" name="sales_delivery_prefix" value="<?= $c_set['sales_delivery_prefix']; ?>" placeholder="ex: SD">
                    </div>

                    <div class="form-group col-md-4 mb-3">
                        <label for="input-5" class="form-label">Purchase</label>
                        <input type="text" class="form-control" name="purchase_prefix" value="<?= $c_set['purchase_prefix']; ?>" placeholder="ex: PC">
                    </div>

                    <div class="form-group col-md-4 mb-3">
                        <label for="input-5" class="form-label">Purchase Order</label>
                        <input type="text" class="form-control" name="purchase_order_prefix" value="<?= $c_set['purchase_order_prefix']; ?>" placeholder="ex: PO">
                    </div>

                    <div class="form-group col-md-4 mb-3">
                        <label for="input-5" class="form-label">Purchase Quotation</label>
                        <input type="text" class="form-control" name="purchase_quotation_prefix" value="<?= $c_set['purchase_quotation_prefix']; ?>" placeholder="ex: PQ">
                    </div>

                    <div class="form-group col-md-4 mb-3">
                        <label for="input-5" class="form-label">Purchase Return</label>
                        <input type="text" class="form-control" name="purchase_return_prefix" value="<?= $c_set['purchase_return_prefix']; ?>" placeholder="ex: PR">
                    </div>

                    <div class="form-group col-md-4 mb-3">
                        <label for="input-5" class="form-label">Purchase Delivery Note</label>
                        <input type="text" class="form-control" name="purchase_delivery_prefix" value="<?= $c_set['purchase_delivery_prefix']; ?>" placeholder="ex: PD">
                    </div>

                    <?php if (is_school(company($user['id']))): ?>
                        <div class="form-group col-md-4 mb-3">
                            <label for="input-5" class="form-label">Challan Prefix</label>
                            <input type="text" class="form-control" name="challan_prefix" value="<?= $c_set['challan_prefix']; ?>" placeholder="ex: CH">
                        </div>
                    <?php endif ?>

                    <div class="form-group col-md-4 mb-3">
                        <label for="input-5" class="form-label">Payment Prefix</label>
                        <input type="text" class="form-control" name="payment_prefix" value="<?= $c_set['payment_prefix']; ?>" placeholder="ex: PM">
                    </div>

                    <div class="form-group col-md-12">
                        <button class="SpriteGenix-primary-btn" name="save_pre_set">Save</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>