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
                    <b class="page_heading text-dark"><?= WEBSITE_NAME ?></b>
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


<div class="website_page">
    <div class="main_page">
        <div>
            <h1 class="main-text">We are here for you!!</h1>
            <h6 style="margin-top: 1.5rem; color: #ce0041d9; font-size:27px;">We're here to serve you with a comprehensive range of professional website services.<br></h6>

            <br>
            <p>
                We offer comprehensive web design and development services that are tailored to meet the unique needs of your business. <br>Our team of experienced designers and developers work closely with you to create a website<br> that not only looks great but also functions seamlessly.
            </p>
            <div class="d-flex">
                <div class="new-menu">

                    <div class="main-menu text-dark cursor-pointer">
                        <img src="<?= base_url('public/images/email.webp') ?>" class="img-main">
                        <a href="mailto:<?= email_support(company($user['id'])) ?>" style="color:#2c3e65"><b class="mt-1" style="font-size: 17px;"><?= email_support(company($user['id'])) ?></b></a>

                    </div>

                    <div class="main-menu text-dark cursor-pointer">
                        <img src="<?= base_url('public/images/phone.webp') ?>" class="img-main">

                        <a href="tel:<?= call_support(company($user['id'])) ?>" style="color:#2c3e65"><b class="mt-1" style="font-size: 17px;"><?= call_support(company($user['id'])) ?></b></a>


                    </div>

                    <div class="main-menu text-dark cursor-pointer">
                        <img src="<?= base_url('public/images/whatsapp.webp') ?>" class="img-main">

                        <a href="https://wa.me/<?= call_support(company($user['id'])) ?>" style="color:#2c3e65"><b class="mt-1" style="font-size: 17px;"><?= call_support(company($user['id'])) ?></b></a>


                    </div>

                </div>
            </div>

        </div>
    </div>
</div>
<style type="text/css">
    .website_page {
        text-align: center;
        width: 100%;
        height: 100vh;
        display: flex;
    }

    .main_page {
        margin: auto;
    }

    .main-text {
        font-weight: 600;
        letter-spacing: normal;
        font-size: 3rem;
        margin-top: 0;
        margin-bottom: 0;
    }

    .new-menu {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        margin: auto;
        margin-top: 30px;
    }

    .main-menu {
        text-align: center;
        margin: 20px;
        background: white;
        border-radius: 5px;
        padding: 10px;
        width: 240px;
        box-shadow: 2px 2px 8px 2px #00000021;




    }

    .img-main {
        width: 100px;
        height: 100px;
        object-fit: contain;
    }
</style>