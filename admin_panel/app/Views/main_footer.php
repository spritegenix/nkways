

    <div class="footer_bar d-flex justify-content-between">
        <div>
            <a href="<?= base_url('app_info') ?>" class="text-light href_loader font-size-footer"><i class="bx bx-info-circle"></i> <span class="my-auto">App info</span></a>
            <a href="<?= base_url('tutorial_coming_soon') ?>" class="text-light href_loader font-size-footer"><i class="bx bx-right-arrow ms-2"></i> <span class="my-auto">Tutorial</span></a>
            <a href="<?= base_url('support') ?>" class="text-light href_loader font-size-footer"><i class="bx bx-support ms-2"></i> <span class="my-auto">Support</span></a>
        </div>
        <div>
            <a href="javascript:void(0);" class="text-light font-size-footer"><i class="bx bx-calendar"></i> <span class="my-auto"><?= get_date_format(now_time($user['id']),'d M Y') ?></span></a>
            
            <?php if (is_school(company($user['id']))): ?>
            <a href="<?= base_url('settings/academic_year'); ?>" class="text-light href_loader font-size-footer"><i class="bx bx-calendar-alt ms-2"></i> <span class="my-auto">Academic Year</span></a>
            <?php endif ?>

            <a href="<?= base_url('settings/financial_years'); ?>" class="text-light font-size-footer"><i class="bx bx-calendar-check ms-2"></i> <span class="my-auto">Financial Year</span></a>

            <a href="<?= base_url('accounts/ledger-accounts'); ?>" class="text-light href_loader font-size-footer"><i class="bx bx-file-find ms-2"></i> <span class="my-auto">Accounts</span></a>

            <a href="<?= base_url('settings/preferences'); ?>" class="text-light href_loader font-size-footer"><i class="bx bx-cog ms-2"></i> <span class="my-auto">App settings</span></a>
        </div>
    </div> 
</main>
