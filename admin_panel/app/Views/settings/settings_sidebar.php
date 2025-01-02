<div class="settings_sidebar">
    <div class="">
        <ul>
            <h6 class="mb-3">Settings</h6>

            <li>
                <a href="<?= base_url('settings/preferences'); ?>" class="href_loader">
                    <div class="icon_parent"><i class='bx bx-cog'></i></div>
                    <div class="icon-title">Preferences</div>
                </a>
            </li>

            <li>
                <a href="<?= base_url('settings/printing_and_devices'); ?>" class="href_loader">
                    <div class="icon_parent"><i class='bx bx-printer'></i></div>
                    <div class="icon-title">Printer & Devices</div>
                </a>
            </li>

            <li>
                <a href="<?= base_url('settings/sms_and_emails'); ?>" class="href_loader">
                    <div class="icon_parent"><i class='bx bx-envelope-open'></i></div>
                    <div class="icon-title">SMS & Emails</div>
                </a>
            </li>


            <?php if (is_SpriteGenix(company($user['id']))): ?>
                <li>
                    <a href="<?= base_url('settings/product-scrapper'); ?>" class="href_loader">
                        <div class="icon_parent"><i class='bx bx-search-alt'></i></div>
                        <div class="icon-title">Scrap Configuration</div>
                    </a>
                </li>
            <?php endif; ?>

            <?php if (is_school(company($user['id']))): ?>
                <li>
                    <a href="<?= base_url('settings/caste_category'); ?>" class="href_loader">
                        <div class="icon_parent"><i class='bx bx-trim'></i></div>
                        <div class="icon-title">Caste Category</div>
                    </a>
                </li>
            <?php endif ?>

            <li>
                <a href="<?= base_url('settings/prefixes'); ?>" class="href_loader">
                    <div class="icon_parent"><i class='bx bx-tag-alt'></i></div>
                    <div class="icon-title">Prefixes</div>
                </a>
            </li>


            <li>
                <a href="<?= base_url('settings/payment_gateway'); ?>" class="href_loader">
                    <div class="icon_parent"><i class='bx bx-money'></i></div>
                    <div class="icon-title">Payment Gateway</div>
                </a>
            </li>


        </ul>

    </div>
</div>