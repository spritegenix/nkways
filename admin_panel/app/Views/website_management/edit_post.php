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

                <li class="breadcrumb-item">
                    <a href="<?= base_url('website_management/posts'); ?>" class="href_loader">Posts</a>
                </li>

                <li class="breadcrumb-item active" aria-current="page">
                    <b class="page_heading text-dark">Edit - <?= $po['title'] ?></b>
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

<!-- \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ POST FORM /////////////////////////////////////////////// -->
<form method="post" id="post_form" action="<?= base_url('website_management/update_post'); ?>" enctype="multipart/form-data">
    <?= csrf_field(); ?>

    <!-- ////////////////////////// TOOL BAR START ///////////////////////// -->
    <div class="toolbar d-flex justify-content-between">

        <div class="d-flex">

            <div class="my-auto">


            </div>

        </div>

        <div class="d-flex">
            <button type="submit" class="SpriteGenix-secondary-btn-topbar me-1 load_me_on_submit_click" name="draft">Draft</button>
            <button type="submit" class="SpriteGenix-primary-btn-topbar load_me_on_submit_click"><i class="bx bx-check"></i> Publish</button>
        </div>

    </div>
    <!-- ////////////////////////// TOOL BAR END ///////////////////////// -->






    <div class="sub_main_page_content pb-5">
        <div class="row  product-grid pb-3" style="">

            <div class="col-md-6">

                <div class="media_box p-2">
                    <div class="form-group">
                        <div class="page">
                            <div class="wrapper">

                                <label for="left" class="w-100">
                                    <input type="radio" name="post_type" id="left" value="image" class="peer radio" <?= ($po['post_type'] == 'image') ? 'checked' : '' ?> />
                                    <div class="icon">
                                        <i class="bx bx-image me-1"></i> Image
                                    </div>
                                </label>

                                <label for="center" class="w-100">
                                    <input type="radio" name="post_type" id="center" value="video" class="peer radio" <?= ($po['post_type'] == 'video') ? 'checked' : '' ?> />
                                    <div class="icon">
                                        <i class="bx bx-video me-1"></i> Video
                                    </div>
                                </label>
                            </div><!-- end .wrapper -->
                        </div><!-- end .page -->
                    </div>

                    <input type="hidden" name="postid" value="<?= $po['id'] ?>">

                    <div class="form-group mt-2">
                        <div class="m-b-30">
                            <div class="row web_pageeefro" id="featured_upload_form">
                                <input type="file" accept="image/*" id="web_page_file" name="featured_img" class="image_preview">
                                <p id="p_text">

                                    <?php if ($po['featured'] != ''): ?>

                                        <img src="<?= base_url(); ?>/public/images/posts/<?php if ($po['featured'] != '') {
                                                                                                echo $po['featured'];
                                                                                            } else {
                                                                                                echo 'prod.png';
                                                                                            } ?>" class="fe_img" ondragstart="return false;">

                                <div class="delete_featured" data-deleteurl="<?= base_url('website_management/remove_featured'); ?>/<?= $po['id'] ?>"><span class="m-auto">Remove</span></div>


                            <?php else: ?>
                                Featured Image
                            <?php endif ?>


                            </p>
                            </div>

                            <span id="error_msg" style="color: red;font-size: 14px;font-weight: 600;"></span>
                        </div>
                    </div>

                    <div class="form-group mt-2">
                        <div class="m-b-30">
                            <div class="row web_pageeefro tumbimage" id="thumb_upload_form">
                                <input type="file" id="web_page_file" name="thumbimages[]" accept="image/*" multiple class="image_preview">
                                <div id="p_text" class="d-flex m-auto justify-content-center">

                                    <?php $cthu = 0;
                                    foreach (thumbnails_array($po['id']) as $pt): $cthu++; ?>
                                        <span class="thbox">
                                            <img class="thumb_img " src="<?= base_url('public'); ?>/images/posts/<?= $pt['thumbnail']; ?>">

                                            <a class="delete_thumb" data-deleteurl="<?= base_url('website_management/remove_thumbnail'); ?>/<?= $pt['id'] ?>">Remove</a>

                                        </span>
                                    <?php endforeach ?>
                                    <?php if ($cthu < 1): ?>
                                        Thumbnail images
                                    <?php endif ?>
                                </div>
                            </div>
                            <span id="error_msg_thmb" style="color: red;font-size: 14px;font-weight: 600;"></span>
                        </div>
                    </div>

                    <input type="hidden" name="old_featured" value="<?= $po['featured']; ?>">
                    <input type="hidden" name="old_file_type" value="<?= $po['file_type']; ?>">


                    <div class="form-group mt-2">
                        <div class="input-box mt-0 input_tag_css">
                            <input type="text" class="form-control input_tag_css tags_input input-1" name="meta_key" placeholder="Tags: Type & Hit Enter" data-role="tagsinput" onfocus="setFocus(true)" onblur="setFocus(false)" value="<?= $po['meta_keyword'] ?>">
                        </div>
                    </div>



                </div>

            </div>

            <div class="col-md-6">
                <div class="media_box p-2">
                    <div class="form-group">
                        <div class="input-box mt-0 <?= (!empty($po['title'])) ? 'active' : '' ?>">
                            <label class="input-label">Title of the post</label>
                            <input type="text" class="input-1" name="title" value="<?= $po['title'] ?>" onfocus="setFocus(true)" onblur="setFocus(false)" />
                        </div>
                    </div>

                    <div class="form-group">
                        <div class="input-box <?= (!empty($po['title'])) ? 'active' : '' ?>">
                            <label class="input-label">Post Type</label>
                            <select class="input-1" id="title" name="title" required onfocus="setFocus(true)" onblur="setFocus(false)" onchange="setChange()">
                                <option value="">Select</option>
                                <option value="blog" <?php if ($po['title'] == 'blog') {
                                                            echo "selected";
                                                        } ?>>Blog</option>
                                <!-- <option value="project" < ?php if ($po['title'] == 'project') {
                                                            echo "selected";
                                                        } ?>>Project</option> -->
                            </select>
                        </div>
                    </div>

                    <div id="project_fileds" class="row <?php if ($po['title'] != 'project') {
                                                            echo 'd-none';
                                                        } ?> ">
                        <div class="form-group col-md-6">
                            <div class="input-box mt-0 <?= (!empty($po['datetime'])) ? 'active' : '' ?>">
                                <label class="input-label">Select Date</label>
                                <input type="date" class="input-1" name="datetime" value="<?= $po['datetime'] ?>" onfocus="setFocus(true)" onblur="setFocus(false)" />
                            </div>
                        </div>

                        <!-- <div class="form-group col-md-6">
                            <div class="input-box mt-0 <= (!empty($po['location'])) ? 'active' : '' ?>">
                                <label class="input-label">Location</label>
                                <input type="text" class="input-1" name="location" value="<= $po['location'] ?>" onfocus="setFocus(true)" onblur="setFocus(false)" />
                            </div>
                        </div> -->
                    </div>

                    <script>
                        $(document).on('change', '#title', function() {
                            var pt = $(this).val();

                            if (pt == 'project') {
                                $('#project_fileds').removeClass('d-none');
                            } else {
                                $('#project_fileds').addClass('d-none');
                            }
                        });
                    </script>

                    <div class="form-group">
                        <div class="position-relative">
                            <div class="input-box <?= (!empty($po['category']) && $po['category'] != 0) ? 'active' : '' ?>">
                                <label class="input-label">Category</label>

                                <select class="input-1" id="post_category" name="post_category" required onfocus="setFocus(true)" onblur="setFocus(false)" onchange="setChange()">
                                    <option value="">Select</option>
                                    <?php foreach (post_categories_array() as $pc): ?>
                                        <option value="<?= $pc['id']; ?>" <?= ($po['category'] == $pc['id']) ? 'selected' : '' ?>><?= $pc['category_name']; ?></option>
                                    <?php endforeach ?>
                                </select>

                            </div>

                            <a class="add_cat_btn"><span class="m-auto">+</span></a>
                            <div style="display: none;" id="catt_box" class="cat_container">
                                <div class="w-100 d-flex mt-2">
                                    <select id="parent_category" class="form-control">
                                        <option value="">Select parent</option>
                                        <?php foreach (post_categories_array() as $pc): ?>
                                            <option value="<?= $pc['id']; ?>"><?= $pc['category_name']; ?></option>
                                        <?php endforeach ?>
                                    </select>
                                    <input type="text" id="new_category" class="form-control" />
                                    <button id="add_new_category" type="button" class="SpriteGenix-cat-btn">Add</button>
                                </div>
                            </div>
                        </div>
                    </div>



                    <div class="form-group">
                        <div class="input-box <?= (!empty($po['short_description'])) ? 'active' : '' ?>">
                            <label class="input-label">Heading</label>
                            <textarea rows="5" name="short_desc" class="input-1 input_short" required onfocus="setFocus(true)" onblur="setFocus(false)"><?= $po['short_description'] ?></textarea>
                        </div>
                    </div>

                    <div class="form-group">
                        <textarea style="overflow: scroll;" id="rich_editor" name="long_desc"> <?= $po['description'] ?></textarea>
                    </div>
                </div>

            </div>

        </div><!--end row-->
</form>
<!-- \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ POST FORM /////////////////////////////////////////////// -->



<div class="sub_footer_bar d-flex justify-content-between">
    <div class="b_ft_bn">
        <a href="<?= base_url('website_management'); ?>" class="text-dark font-size-footer me-2 href_loader"><i class="bx bx-arrow-back ms-2"></i> <span class="my-auto">Back to website management</span></a>
    </div>
    <div class="SpriteGenix_pagination">

    </div>
</div>

</div>


<script type="text/javascript">
    function setFocus(on) {
        var element = document.activeElement;
        if (on) {
            setTimeout(function() {
                element.parentNode.classList.add("focus");
            });
        } else {
            let box = document.querySelector(".input-box");
            box.classList.remove("focus");
            $("input,select,textarea").each(function() {
                var $input = $(this);
                var $parent = $input.closest(".input-box");

                if ($input.val()) $parent.addClass("focus");
                else $parent.removeClass("focus");
            });
        }
    }


    $('#featured_upload_form input').change(function() {
        // $('#featured_upload_form p').text(this.files[0].name);
        //stp submit the form, we will post it manually.
        event.preventDefault();
        filesLength = this.files.length;

        if (this.files[0].size > 1000000) {
            $('#featured_upload_form input').val(null);
            $('#error_msg').html('File size must be less than 1mb!')
        } else {
            $('#featured_upload_form p').text(this.files[0].name);

            for (var i = 0; i < filesLength; i++) {
                var f = this.files[i]
                var fileReader = new FileReader();
                fileReader.onload = (function(e) {
                    var file = e.target;
                    var img = $("<img></img>", {
                        class: "fe_img",
                        src: e.target.result,
                        title: file.name
                    });
                    $('#featured_upload_form p').html(img);
                });
                fileReader.readAsDataURL(f);
            }
            // disabled the submit button
            $("#btnSubmit").prop("disabled", true);
        }
    });
    $('#thumb_upload_form input').change(function() {
        // $('#thumb_upload_form #p_text').text("");
        filesLength = this.files.length;

        if (this.files[0].size > 1000000) {
            $('#thumb_upload_form input').val(null);
            $('#error_msg_thmb').html('File size must be less than 1mb!')
        } else {
            $('#thumb_upload_form #p_text').text("");

            for (var i = 0; i < filesLength; i++) {
                var f = this.files[i]
                var fileReader = new FileReader();
                fileReader.onload = (function(e) {
                    var file = e.target;
                    var img = $("<img></img>", {
                        class: "thumb_img",
                        src: e.target.result,
                        title: file.name
                    });
                    img = img;
                    $('#thumb_upload_form #p_text').append('<span class="thbox">' + img + '</span>');
                });
                fileReader.readAsDataURL(f);
            }
            event.preventDefault();
            // disabled the submit button
            $("#btnSubmit").prop("disabled", true);
        }
    });
</script>