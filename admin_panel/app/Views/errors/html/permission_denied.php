<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <title>SpriteGenix ERP - No permissions</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!--favicon-->
    <link rel="icon" href="<?= base_url('public'); ?>/images/app_icon.ico" type="image/png" />
    <link rel="stylesheet" type="text/css" href="<?= base_url('public/css/custom_erp.css') ?>">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>

    <style>
        .main-head {
            text-align: center;
            width: 100%;
            height: 100vh;
            display: flex;
        }

        .head-text {
            font-weight: 600;
            letter-spacing: normal;
            font-size: 3rem;
            margin-top: 0;
            margin-bottom: 0;
            color: #2c3e65;
        }

        .semi-text {
            margin-top: 1.5rem;
        }

        body {
            height: 100%;
            background: #fafafa;
            font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
            color: #777;
            font-weight: 300;
            margin: 0;
        }

        .wait-img {
            width: 30%;
        }

        .btn-soon {
            background: #2c3e65;
            padding: 10px;
            border-radius: 25px;
            text-decoration: none;
            color: whitesmoke;
            font-weight: 500;

        }

        .btn-place {
            text-align: center;
        }

        @media(max-width: 767.98px) {
            .wait-img {
                width: 100%;
            }
        }

        .error_box {
            margin: auto;
        }

        .m-auto {
            margin: auto !important;
        }

        .d-flex {
            display: flex !important;
        }

        .my-auto {
            margin-top: auto !important;
            margin-bottom: auto !important;
        }

        .justify-content-center {
            justify-content: center !important;
        }
    </style>

</head>

<body>
    <div class="main-head">
        <div class="error_box">
            <div>
                <h1 class="head-text">No Entry</h1>
                <h2 class="semi-text">Sorry, You have no permissions to access this. Please contact your administrator & request to give certain permission</h2>
                <img class="wait-img" src="<?= base_url('public') ?>/images/no-permission.webp" alt="">
            </div>
            <div class="">
                <a href="<?= base_url() ?>" class="btn-soon href_loader">Go Back</a>
            </div>
        </div>
    </div>

    <script src="<?= base_url('public'); ?>/js/custom.js"></script>
</body>


</html>