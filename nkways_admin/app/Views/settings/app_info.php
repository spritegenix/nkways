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
                    <b class="page_heading text-dark">App Information</b>
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

    <div class="p-3 pt-0">
        <p class="mb-0">
            <b>Welcome to SpriteGenix ERP</b><br><br>

            SpriteGenix ERP is application were small and medium business, company can handle Inventory, stock, reports, HR manage and accounts. With this, you can handle day to day activities easily and keep track on your business flow.
            Software is designed to be user-friendly and intuitive, making it easy for anyone to use.<br>

            Some of the key features of SpriteGenix ERP include:
        <ul>
            <li>Easy Track on work</li>
            <li>Automated reminder</li>
            <li>Manage payroll and attendance</li>
        </ul>
        SpriteGenix ERP is constantly updated with new features and improvements to ensure that our users have the best possible experience. We take feedback from our users seriously and are always looking for ways to make SpriteGenix ERP even better.<br>


        Start enjoying all the benefits that it has to offer!
        </p>

    </div>

    <div class="row">
        <div class="col-lg-12">
            <div class="card">
                <div class="card-body">
                    <label>App name:</label>
                    <h6>SpriteGenix ERP</h6>

                    <label>Description:</label>
                    <h6>A complete software solution for your business</h6>

                    <label>Author:</label>
                    <h6>SpriteGenix.com</h6>

                    <label>License:</label>
                    <h6>ISC</h6>

                    <label>Update status:</label>
                    <h6 id="updatemesage">Checking for updates...</h6>

                </div>
            </div>
        </div>
    </div>
</div>

<script>
    window.api.receive('show_message', (event, data) => {
        var messageFromMain = document.getElementById('updatemesage');
        messageFromMain.innerHTML = data;
    });
</script>