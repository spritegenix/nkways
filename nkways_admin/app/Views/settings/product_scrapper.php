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
          <b class="page_heading text-dark">Scrap configuration</b>
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

  <!-- add site  buttons -->
  <div class="ms-auto">
    <div class="">




      <div class="modal fade SpriteGenix-model" id="add_site" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title"><?= langg(get_setting(company($user['id']), 'language'), 'Add new site'); ?></h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            <form method="post" action="<?= base_url('product_scrapper/add_site') ?>">
              <?= csrf_field(); ?>
              <div class="modal-body">
                <div class="row">

                  <div class="form-group col-md-12">
                    <label for="input-1" class="modal_lab"><?= langg(get_setting(company($user['id']), 'language'), 'Site Name'); ?></label>
                    <input type="text" class="form-control modal_inpu" name="site_name" required>
                  </div>

                  <div class="form-group col-md-12 mt-2">
                    <label for="input-1" class="modal_lab"><?= langg(get_setting(company($user['id']), 'language'), 'Product Name <span class="text-danger">(XPath)</span>'); ?></label>
                    <input type="text" class="form-control modal_inpu" name="product_name" required>
                  </div>

                  <div class="form-group col-md-12 mt-2">
                    <label for="input-1" class="modal_lab"><?= langg(get_setting(company($user['id']), 'language'), 'Price <span class="text-danger">(XPath)</span>'); ?></label>
                    <input type="text" class="form-control modal_inpu" name="price">
                  </div>

                  <div class="form-group col-md-12 mt-2">
                    <label for="input-1" class="modal_lab"><?= langg(get_setting(company($user['id']), 'language'), 'Currency'); ?></label>

                    <select class="form-select" name="currency">
                      <option value="omr">OMR</option>
                      <option value="aed">AED</option>
                      <option value="usd">USD</option>
                      <option value="inr">INR</option>
                    </select>
                  </div>

                  <div class="form-group col-md-12 mt-2">
                    <label for="input-1" class="modal_lab"><?= langg(get_setting(company($user['id']), 'language'), 'Description <span class="text-danger">(XPath)</span>'); ?></label>
                    <input type="text" class="form-control modal_inpu" name="description">
                  </div>

                  <div class="form-group col-md-12 mt-2">
                    <label for="input-1" class="modal_lab"><?= langg(get_setting(company($user['id']), 'language'), 'Rich Description <span class="text-danger">(XPath)</span>'); ?></label>
                    <input type="text" class="form-control modal_inpu" name="rich_description">
                  </div>

                  <div class="form-group col-md-12 mt-2">
                    <label for="input-1" class="modal_lab"><?= langg(get_setting(company($user['id']), 'language'), 'Keywords <span class="text-danger">(XPath)</span>'); ?></label>
                    <input type="text" class="form-control modal_inpu" name="keywords">
                  </div>

                  <div class="form-group col-md-12 mt-2">
                    <label for="input-1" class="modal_lab"><?= langg(get_setting(company($user['id']), 'language'), 'Product image <span class="text-danger">(XPath)</span>'); ?></label>
                    <input type="text" class="form-control modal_inpu" name="product_image">
                  </div>

                  <div class="form-group col-md-12 mt-2">
                    <label for="input-1" class="modal_lab"><?= langg(get_setting(company($user['id']), 'language'), 'Thumb Image <span class="text-danger">(XPath)</span>'); ?></label>
                    <input type="text" class="form-control modal_inpu" name="thumb_image">
                  </div>

                  <div class="form-group col-md-12 mt-2">
                    <label for="input-1" class="modal_lab"><?= langg(get_setting(company($user['id']), 'language'), 'Brand <span class="text-danger">(XPath)</span>'); ?></label>
                    <input type="text" class="form-control modal_inpu" name="brand">
                  </div>

                  <div class="form-group col-md-12 mt-2">
                    <label for="input-1" class="modal_lab"><?= langg(get_setting(company($user['id']), 'language'), 'Category <span class="text-danger">(XPath)</span>'); ?></label>
                    <input type="text" class="form-control modal_inpu" name="category">
                  </div>

                  <div class="form-group col-md-12 mt-2">
                    <label for="input-1" class="modal_lab"><?= langg(get_setting(company($user['id']), 'language'), 'Sub Category <span class="text-danger">(XPath)</span>'); ?></label>
                    <input type="text" class="form-control modal_inpu" name="sub_category">
                  </div>

                  <div class="form-group col-md-12 mt-2">
                    <label for="input-1" class="modal_lab"><?= langg(get_setting(company($user['id']), 'language'), 'Secondary Category <span class="text-danger">(XPath)</span>'); ?></label>
                    <input type="text" class="form-control modal_inpu" name="sec_category">
                  </div>

                  <div class="form-group col-md-12 mt-2">
                    <button type="submit" class="SpriteGenix-primary-btn" name="save_site">Save site</button>
                  </div>


                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- button end -->
  <!-- scrap -->
  <div class="setting_margin">
    <div class="d-flex justify-content-between ">
      <h5 class="card-title mb-0">Scrapping sites</h5>

      <div class="text-end">
        <button type="button" class="SpriteGenix-primary-btn-topbar" data-bs-toggle="modal" data-bs-target="#add_site">+ Add Site</button>
      </div>
    </div>
    <hr class="my-1">
    <div class="accordion" id="accordionExample">

      <?php foreach ($sites as $st): ?>
        <div class="accordion-item">
          <h2 class="accordion-header" id="headingTwo<?= $st['id']; ?>">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo<?= $st['id']; ?>" aria-expanded="false" aria-controls="collapseTwo<?= $st['id']; ?>">
              <?= $st['site_name'] ?>
            </button>
          </h2>


          <div id="collapseTwo<?= $st['id']; ?>" class="accordion-collapse collapse" aria-labelledby="headingTwo<?= $st['id']; ?>" data-bs-parent="#accordionExample">
            <div class="accordion-body">
              <form method="post" action="<?= base_url('product_scrapper/update_site'); ?>/<?= $st['id']; ?>">
                <?= csrf_field(); ?>
                <div class="">
                  <div class="row">
                    <div class="form-group col-md-12">
                      <label for="input-1" class="modal_lab"><?= langg(get_setting(company($user['id']), 'language'), 'Site Name'); ?></label>
                      <input type="text" class="form-control modal_inpu" name="site_name" value="<?= htmlspecialchars($st['site_name']); ?>" required>
                    </div>

                    <div class="form-group col-md-12 mt-2">
                      <label for="input-1" class="modal_lab"><?= langg(get_setting(company($user['id']), 'language'), 'Product Name <span class="text-danger">(XPath)</span>'); ?></label>
                      <input type="text" class="form-control modal_inpu" name="product_name" value="<?= htmlspecialchars($st['product_name']); ?>" required>
                    </div>

                    <div class="form-group col-md-12 mt-2">
                      <label for="input-1" class="modal_lab"><?= langg(get_setting(company($user['id']), 'language'), 'Price <span class="text-danger">(XPath)</span>'); ?></label>
                      <input type="text" class="form-control modal_inpu" name="price" value="<?= htmlspecialchars($st['price']); ?>">
                    </div>

                    <div class="form-group col-md-12 mt-2">
                      <label for="input-1" class="modal_lab"><?= langg(get_setting(company($user['id']), 'language'), 'Currency <span class="text-danger">(XPath)</span>'); ?></label>

                      <select class="form-select" name="currency">
                        <option value="omr" <?php if ($st['currency'] == 'omr') {
                                              echo 'selected';
                                            } ?>>OMR</option>
                        <option value="aed" <?php if ($st['currency'] == 'aed') {
                                              echo 'selected';
                                            } ?>>AED</option>
                        <option value="usd" <?php if ($st['currency'] == 'usd') {
                                              echo 'selected';
                                            } ?>>USD</option>
                        <option value="inr" <?php if ($st['currency'] == 'inr') {
                                              echo 'selected';
                                            } ?>>INR</option>
                      </select>
                    </div>

                    <div class="form-group col-md-12 mt-2">
                      <label for="input-1" class="modal_lab"><?= langg(get_setting(company($user['id']), 'language'), 'Description <span class="text-danger">(XPath)</span>'); ?></label>
                      <input type="text" class="form-control modal_inpu" name="description" value="<?= htmlspecialchars($st['description']); ?>">
                    </div>

                    <div class="form-group col-md-12 mt-2">
                      <label for="input-1" class="modal_lab"><?= langg(get_setting(company($user['id']), 'language'), 'Rich Description <span class="text-danger">(XPath)</span>'); ?></label>
                      <input type="text" class="form-control modal_inpu" name="rich_description" value="<?= htmlspecialchars($st['rich_description']); ?>">
                    </div>

                    <div class="form-group col-md-12 mt-2">
                      <label for="input-1" class="modal_lab"><?= langg(get_setting(company($user['id']), 'language'), 'Keywords <span class="text-danger">(XPath)</span>'); ?></label>
                      <input type="text" class="form-control modal_inpu" name="keywords" value="<?= htmlspecialchars($st['keywords']); ?>">
                    </div>

                    <div class="form-group col-md-12 mt-2">
                      <label for="input-1" class="modal_lab"><?= langg(get_setting(company($user['id']), 'language'), 'Product image <span class="text-danger">(XPath)</span>'); ?></label>
                      <input type="text" class="form-control modal_inpu" name="product_image" value="<?= htmlspecialchars($st['product_image']); ?>">
                    </div>

                    <div class="form-group col-md-12 mt-2">
                      <label for="input-1" class="modal_lab"><?= langg(get_setting(company($user['id']), 'language'), 'Thumb Image <span class="text-danger">(XPath)</span>'); ?></label>
                      <input type="text" class="form-control modal_inpu" name="thumb_image" value="<?= htmlspecialchars($st['thumb_image']); ?>">
                    </div>

                    <div class="form-group col-md-12 mt-2">
                      <label for="input-1" class="modal_lab"><?= langg(get_setting(company($user['id']), 'language'), 'Brand <span class="text-danger">(XPath)</span>'); ?></label>
                      <input type="text" class="form-control modal_inpu" name="brand" value="<?= htmlspecialchars($st['brand']); ?>">
                    </div>

                    <div class="form-group col-md-12 mt-2">
                      <label for="input-1" class="modal_lab"><?= langg(get_setting(company($user['id']), 'language'), 'Category <span class="text-danger">(XPath)</span>'); ?></label>
                      <input type="text" class="form-control modal_inpu" name="category" value="<?= htmlspecialchars($st['category']); ?>">
                    </div>

                    <div class="form-group col-md-12 mt-2">
                      <label for="input-1" class="modal_lab"><?= langg(get_setting(company($user['id']), 'language'), 'Sub Category <span class="text-danger">(XPath)</span>'); ?></label>
                      <input type="text" class="form-control modal_inpu" name="sub_category" value="<?= htmlspecialchars($st['sub_category']); ?>">
                    </div>

                    <div class="form-group col-md-12 mt-2">
                      <label for="input-1" class="modal_lab"><?= langg(get_setting(company($user['id']), 'language'), 'Secondary Category <span class="text-danger">(XPath)</span>'); ?></label>
                      <input type="text" class="form-control modal_inpu" name="sec_category" value="<?= htmlspecialchars($st['sec_category']); ?>">
                    </div>

                    <div class="form-group col-md-12 mt-2">
                      <label for="input-1" class="modal_lab"><?= langg(get_setting(company($user['id']), 'language'), 'Set as default'); ?></label>
                      <input type="checkbox" name="set_as_default" value="1" <?php if ($st['check_default'] == 1) {
                                                                                echo 'checked';
                                                                              } ?>>
                    </div>

                    <div class="form-group col-md-12 mt-2 text-end">
                      <button type="submit" class="SpriteGenix-primary-btn modal_inpu" name="save_site">Save Site</button>

                      <a data-url="<?= base_url('product_scrapper/delete_site'); ?>/<?= $st['id']; ?>" class="btn btn-danger delete ms-2"><i class="bx bx-trash"></i></a>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      <?php endforeach ?>
    </div>



    <div class="mt-4 p-3">
      <h5 class="card-title">Currency conversion <small class="text-success" id="savedcur"></small></h5>
      <h6>To OMR</h6>

      <?php foreach (scrap_currency_array() as $cr): ?>
        <div class="d-flex mb-2">
          <span class="my-auto text-uppercase" style="min-width: 30px;"><?= $cr['currency'] ?></span>
          <span class="text-danger my-auto px-2">*</span>
          <input type="number" step="any" class="form-control update_rate my-auto px-2" style="max-width:200px;" value="<?= $cr['rate'] ?>" data-cid="<?= $cr['id'] ?>">
          <span class="text-danger my-auto px-2">+</span>
          <input type="number" step="any" class="form-control update_profit my-auto px-2" style="max-width:200px;" value="<?= $cr['profit'] ?>" data-cid="<?= $cr['id'] ?>">
        </div>
      <?php endforeach ?>
    </div>

  </div>
  <!-- scrap -->
</div>