<div class="main_page_content d-flex">
    <div class="menu_box">




        <a class="menu_icon href_loader text-dark cursor-pointer" href="<?= base_url('customers') ?>?page=1">
            <img src="<?= base_url('public/images/menu_icons/customer_master.webp') ?>" class="menu_img">
            <h6 class="mt-1">Parties</h6>
        </a>

        <?php if (is_school(company($user['id']))): ?>
            <a class="menu_icon href_loader text-dark cursor-pointer" href="<?= base_url('class-and-subjects') ?>">
                <img src="<?= base_url('public/images/menu_icons/classes.webp') ?>" class="menu_img">
                <h6 class="mt-1">Class & Subjects</h6>
            </a>
        <?php endif ?>

        <?php if (is_school(company($user['id']))): ?>
            <a class="menu_icon href_loader text-dark cursor-pointer" href="<?= base_url('student-master') ?>?page=1">
                <img src="<?= base_url('public/images/menu_icons/student_master.webp') ?>" class="menu_img">
                <h6 class="mt-1">Students Master</h6>
            </a>
        <?php endif ?>

        <a class="menu_icon href_loader text-dark cursor-pointer" href="<?= base_url('user_master') ?>?page=1">
            <img src="<?= base_url('public/images/menu_icons/user_master.webp') ?>" class="menu_img">
            <h6 class="mt-1">Users Master</h6>
        </a>

        <?php if (check_permission($user['id'], 'manage_pro_ser') == true || $user['u_type'] == 'admin'): ?>
            <a class="menu_icon href_loader text-dark cursor-pointer" href="<?= base_url('products'); ?>?page=1">
                <img src="<?= base_url('public/images/menu_icons/products.webp') ?>" class="menu_img">
                <h6 class="mt-1">Products</h6>
            </a>
        <?php endif; ?>

        <?php if (check_permission($user['id'], 'manage_sales') == true || $user['u_type'] == 'admin'): ?>
            <a class="menu_icon href_loader text-dark cursor-pointer" href="<?= base_url('invoices/sales'); ?>">
                <img src="<?= base_url('public/images/menu_icons/inventories.webp') ?>" class="menu_img">
                <h6 class="mt-1">Sales</h6>
            </a>
        <?php endif; ?>

        <?php if (check_permission($user['id'], 'manage_purchase') == true || $user['u_type'] == 'admin'): ?>
            <a class="menu_icon href_loader text-dark cursor-pointer" href="<?= base_url('purchases/purchases'); ?>">
                <img src="<?= base_url('public/images/menu_icons/inventories.webp') ?>" class="menu_img">
                <h6 class="mt-1">Purchases</h6>
            </a>
        <?php endif; ?>


        <a class="menu_icon href_loader text-dark cursor-pointer" href="<?= base_url('voucher_entries'); ?>">
            <img src="<?= base_url('public/images/menu_icons/vouchers.webp') ?>" class="menu_img">
            <h6 class="mt-1">Vouchers</h6>
        </a>

        <?php if (is_hrmanage(company($user['id']))): ?>

            <?php if (check_permission($user['id'], 'manage_hr') == true || $user['u_type'] == 'admin'): ?>
                <a class="menu_icon href_loader text-dark cursor-pointer" href="<?= base_url('hr_manage'); ?>">
                    <img src="<?= base_url('public/images/menu_icons/hr_manage.webp') ?>" class="menu_img">
                    <h6 class="mt-1">HR Management</h6>
                </a>
            <?php endif ?>

        <?php endif ?>

        <?php if (is_crm(company($user['id']))): ?>
            <a class="menu_icon href_loader text-dark cursor-pointer" href="<?= base_url('crm') ?>">
                <img src="<?= base_url('public/images/menu_icons/crm.webp') ?>" class="menu_img">
                <h6 class="mt-1">CRM</h6>
            </a>
        <?php endif ?>


        <a class="menu_icon href_loader text-dark cursor-pointer" href="<?= base_url('website_management') ?>">
            <img src="<?= base_url('public/images/menu_icons/website.webp') ?>" class="menu_img">
            <h6 class="mt-1">My Website</h6>
        </a>


        <?php if (is_school(company($user['id']))): ?>
            <a class="menu_icon href_loader text-dark cursor-pointer" href="<?= base_url('library-management') ?>?page=1">
                <img src="<?= base_url('public/images/menu_icons/library.webp') ?>" class="menu_img">
                <h6 class="mt-1">Library</h6>
            </a>
        <?php endif ?>

        <?php if (is_school(company($user['id']))): ?>
            <a class="menu_icon href_loader text-dark cursor-pointer" href="<?= base_url('feedbacks') ?>?page=1">
                <img src="<?= base_url('public/images/menu_icons/feedbacks.webp') ?>" class="menu_img">
                <h6 class="mt-1">Feedbacks</h6>
            </a>
        <?php endif ?>


        <?php if (is_school(company($user['id']))): ?>
            <?php if (check_permission($user['id'], 'manage_fees') == true || $user['u_type'] == 'admin'): ?>
                <a class="menu_icon href_loader text-dark cursor-pointer" href="<?= base_url('fees_and_payments'); ?>">
                    <img src="<?= base_url('public/images/menu_icons/fees.webp') ?>" class="menu_img">
                    <h6 class="mt-1">Fees</h6>
                </a>
            <?php endif ?>
        <?php endif ?>



        <?php if (is_school(company($user['id']))): ?>
            <?php if (check_permission($user['id'], 'manage_messaging') == true || $user['u_type'] == 'admin'): ?>
                <a class="menu_icon href_loader text-dark cursor-pointer" href="<?= base_url('messaging') ?>">
                    <img src="<?= base_url('public/images/menu_icons/message.webp') ?>" class="menu_img">
                    <h6 class="mt-1">Messaging</h6>
                </a>
            <?php endif ?>
        <?php endif ?>

        <?php if (is_SpriteGenix(company($user['id']))): ?>

            <a class="menu_icon href_loader text-dark cursor-pointer" href="<?= base_url('invoice_submit'); ?>?page=1">
                <img src="<?= base_url('public/images/menu_icons/invoice_submit.webp') ?>" class="menu_img">
                <div class="menu-title">Invoice submit</div>
            </a>



            <a class="menu_icon href_loader text-dark cursor-pointer" href="<?= base_url('work_updates'); ?>">
                <img src="<?= base_url('public/images/menu_icons/work_updates.webp') ?>" class="menu_img">
                <div class="menu-title">Work updates</div>
            </a>

        <?php endif; ?>


        <?php if (is_school(company($user['id']))): ?>
            <a class="menu_icon href_loader text-dark cursor-pointer" href="<?= base_url('school_activities') ?>">
                <img src="<?= base_url('public/images/menu_icons/activities.webp') ?>" class="menu_img">
                <h6 class="mt-1">Activities</h6>
            </a>
        <?php endif ?>


        <?php if (is_crm(company($user['id']))): ?>
            <a class="menu_icon href_loader text-dark cursor-pointer" href="<?= base_url('document_renew') ?>">
                <img src="<?= base_url('public/images/menu_icons/library.webp') ?>" class="menu_img">
                <h6 class="mt-1">Renews</h6>
            </a>
        <?php endif ?>

        <?php if (check_permission($user['id'], 'manage_reports') == true || $user['u_type'] == 'admin'): ?>
            <a class="menu_icon href_loader text-dark cursor-pointer" href="<?= base_url('reports_selector'); ?>">
                <img src="<?= base_url('public/images/menu_icons/reports.webp') ?>" class="menu_img">
                <h6 class="mt-1">Reports</h6>
            </a>
        <?php endif ?>



        <?php if (is_school(company($user['id']))): ?>

            <a class="menu_icon text-dark cursor-pointer" href="<?= base_url('calender') ?>">
                <img src="<?= base_url('public/images/menu_icons/calender.webp') ?>" class="menu_img">
                <h6 class="mt-1">Calendar</h6>
            </a>

            <a class="menu_icon text-dark cursor-pointer" href="<?= base_url('exams') ?>">
                <img src="<?= base_url('public/images/menu_icons/exam.webp') ?>" class="menu_img">
                <h6 class="mt-1">Exams</h6>
            </a>

            <a class="menu_icon href_loader text-dark cursor-pointer" href="<?= base_url('school_transport'); ?>">
                <img src="<?= base_url('public/images/menu_icons/transport.webp') ?>" class="menu_img">
                <h6 class="mt-1">Transport</h6>
            </a>

            <a class="menu_icon href_loader text-dark cursor-pointer" href="<?= base_url('time_table') ?>">
                <img src="<?= base_url('public/images/menu_icons/time_table.webp') ?>" class="menu_img">
                <h6 class="mt-1">Time Table</h6>
            </a>

            <a class="menu_icon href_loader text-dark cursor-pointer" href="<?= base_url('magazine_request') ?>">
                <img src="<?= base_url('public/images/menu_icons/article.webp') ?>" class="menu_img">
                <h6 class="mt-1">Articles</h6>
            </a>

            <?php if (check_permission($user['id'], 'manage_health') == true || $user['u_type'] == 'admin'): ?>
                <a class="menu_icon href_loader text-dark cursor-pointer" href="<?= base_url('health') ?>">
                    <img src="<?= base_url('public/images/menu_icons/health.webp') ?>" class="menu_img">
                    <h6 class="mt-1">Health</h6>
                </a>
            <?php endif ?>
            <?php if (check_permission($user['id'], 'manage_notices') == true || $user['u_type'] == 'admin'): ?>
                <a class="menu_icon href_loader text-dark cursor-pointer" href="<?= base_url('notice') ?>">
                    <img src="<?= base_url('public/images/menu_icons/notice.webp') ?>" class="menu_img">
                    <h6 class="mt-1">Notice</h6>
                </a>
            <?php endif ?>

        <?php endif ?>




        <?php if (is_SpriteGenix(company($user['id']))): ?>
            <a class="menu_icon href_loader text-dark cursor-pointer" href="<?= base_url('SpriteGenix_keys'); ?>">
                <img src="<?= base_url('public/images/menu_icons/SpriteGenix_keys.webp') ?>" class="menu_img">
                <h6 class="mt-1">SpriteGenix Keys</h6>
            </a>

            <?php if (check_permission($user['id'], 'manage_enquires') == true || $user['u_type'] == 'admin'): ?>
                <?php if (is_online_shop(company($user['id']))): ?>
                    <a class="menu_icon href_loader text-dark cursor-pointer" href="<?= base_url('enquiries') ?>">
                        <img src="<?= base_url('public/images/menu_icons/enquiries.webp') ?>" class="menu_img">
                        <h6 class="mt-1">Enquiries</h6>
                    </a>
                <?php endif ?>
            <?php endif ?>

        <?php endif ?>

        <?php if (is_SpriteGenix(company($user['id']))): ?>

            <a class="menu_icon href_loader text-dark cursor-pointer" href="<?= base_url('e-mailer'); ?>">
                <img src="<?= base_url('public/images/menu_icons/e-mailer.webp') ?>" class="menu_img">
                <div class="menu-title">E-Mailer</div>
            </a>


        <?php endif; ?>

    </div>
</div>