<!DOCTYPE html>
<html lang="en">

<head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- manifest file -->


    <!--favicon-->
    <link rel="icon" href="<?= base_url('public'); ?>/images/app_icon.ico" type="image/png" />
    <!-- loader-->


    <!-- Bootstrap CSS -->

    <link href="<?= base_url('public'); ?>/css/icons.css" rel="stylesheet">


    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>

    <!--api link-->
    <script src="https://www.google.com/recaptcha/api.js" async defer></script>
    <!--call back function-->
    <script>
        function onSubmit(token) {
            var username = $.trim($('#login_username').val());
            var typepassword = $.trim($('#typepassword').val());
            var password = $.trim($('#password').val());

            let string = $('#typepassword').val();
            let rounds = parseInt($('#rounds').val());

            $('#password').val(typepassword);


            if (username != '') {
                if (typepassword != '') {
                    $('#login-form').submit();
                    $('#log_submit').html('<div class="spinner-grow text-sky-light" role="status"> <span class="visually-hidden">Loading...</span></div>');
                }
            }
        }
    </script>



    <title>Login - SpriteGenix aPanel</title>

    <style type="text/css">
        @import url("https://fonts.googleapis.com/css?family=Poppins:300,400,500,700");

        body {
            margin: 0;
        }

        * {
            font-family: poppins;
        }

        .w-100 {
            width: 100%;
        }

        .SpriteGenix_validation ul {
            padding: 0;
            list-style: none;
            margin-bottom: 0;
            text-align: center;
            color: red;
            font-size: 14px;
        }

        .input-affix {
            position: relative;
            display: flex;
            align-items: stretch;
            width: 100%;
        }

        .input-affix .prefix-icon,
        .input-affix .suffix-icon {
            position: absolute;
            top: 58%;
            z-index: 990;
            line-height: 1.5;
            transform: translateY(-50%);
            -webkit-transform: translateY(-50%);
            -moz-transform: translateY(-50%);
            -o-transform: translateY(-50%);
            -ms-transform: translateY(-50%);
        }

        .input-affix .prefix-icon {
            left: 12px;
        }

        .input-affix .suffix-icon {
            right: 12px;
        }

        .input-affix .form-control:not(:first-child) {
            padding-left: 35px !important;
        }

        .input-affix .form-control:not(:last-child) {
            padding-right: 35px !important;
        }

        .authentication-forgot {
            height: 100vh;
            display: flex;
        }

        .form_head {
            text-align: center;
            font-size: 26px;
            margin: 0;
        }

        .btn_login {
            width: 100%;
            margin-top: 15px;
            padding: 10px;
            border: none;
            color: white;
        }

        .form_box {
            margin: auto;
            min-width: 300px;
        }

        .grecaptcha-badge {
            display: none !important;
        }
    </style>
</head>

<body class="">
    <!-- wrapper -->
    <div class="">
        <div class="authentication-forgot">
            <div class="form_box">

                <h4 class="form_head">Login</h4>

                <?php if (session()->get('success')): ?>
                    <p class="text-muted">
                        <?= session()->get('success') ?>
                    </p>
                <?php endif; ?>

                <form action="<?= base_url('users/login'); ?>" method="post" id="login-form">
                    <?= csrf_field(); ?>


                    <div class="">
                        <label style="margin-bottom: 10px;" for="userName">Email</label>
                        <div class="input-affix">
                            <i class="prefix-icon bx bx-user"></i>
                            <input type="text" class="form-control w-100" id="login_username" name="email" placeholder="Username/Email" value="<?= set_value('email') ?>" style="border-radius:5px; padding:10px;padding-right: 35px!important; border: 1px solid grey; margin-top: 10px;">
                        </div>
                    </div>

                    <div style="margin-top: 8px;">
                        <label class="">Password</label>
                        <div class="input-affix">
                            <i class="prefix-icon bx bx-lock"></i>
                            <input type="password" value="" id="typepassword" placeholder="Password" class="form-control w-100" style="border-radius:5px;padding:10px;border: 1px solid grey; margin-top: 10px;" required>

                            <input type="hidden" value="" id="password" name="password" placeholder="Password" class="form-control form-control-lg" required>

                            <input type="hidden" id="rounds" value="12"></input>
                        </div>
                    </div>


                    <?php if (isset($validation)): ?>
                        <div class="my-4">
                            <div class="SpriteGenix_validation ">
                                <?= $validation->listErrors() ?>
                            </div>
                        </div>
                    <?php endif; ?>

                    <?php if (session()->get('failmsg')): ?>
                        <div class="my-4">
                            <div class="SpriteGenix_validation ">
                                <p class=text-danger>
                                    <?= session()->get('failmsg') ?>
                                </p>
                            </div>
                        </div>
                    <?php endif; ?>

                    <div class="d-grid gap-2">
                        <button id="log_submit" class="btn  text-white btn_login" onclick="onSubmit('token');" style="background-color: #ce0041d9; border-radius: 5px;">Login</button>
                    </div>

                </form>

            </div>
        </div>
    </div>

    <!-- end wrapper -->
</body>



<script type="text/javascript">
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('<?= base_url('service-worker.js'); ?>/', {
            scope: '.' // <--- THIS BIT IS REQUIRED
        }).then(function(registration) {
            // Registration was successful
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }, function(err) {
            // registration failed :(
            console.log('ServiceWorker registration failed: ', err);
        });
    }
</script>

<script src="<?= base_url('public'); ?>/js/login.js" type="text/javascript"></script>

</html>