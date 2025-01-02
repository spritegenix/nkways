<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8"> 
    <meta name="viewport" content="width=device-width, initial-scale=1">
    
    <!--favicon-->
    <link rel="icon" href="<?= base_url('public'); ?>/images/app_icon.ico" type="image/png" />

    <!-- manifest file -->
    <link rel="manifest" href="<?= base_url('manifest.json'); ?>">

    <!-- styles -->
    <link href="<?= base_url('public'); ?>/css/icons.css" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="<?= base_url('public/css/bootstrap.min.css') ?>">
    <link rel="stylesheet" type="text/css" href="<?= base_url('public/css/custom_erp.css') ?>?ver=<?= style_version(); ?>">
    <link rel="stylesheet" type="text/css" href="<?= base_url('public/css/tags.css') ?>?ver=<?= style_version(); ?>">
    <link rel="stylesheet" type="text/css" href="<?= base_url('public/css/lobibox.min.css') ?>">
    <link rel="stylesheet" type="text/css" href="<?= base_url('public/css/sweetalert2.min.css') ?>">

    <link rel="stylesheet" href="<?= base_url('public') ?>/richtexteditor/rte_theme_default.css" />
    <script type="text/javascript" src="<?= base_url('public') ?>/richtexteditor/rte.js"></script>
    <script type="text/javascript" src='<?= base_url('public') ?>/richtexteditor/plugins/all_plugins.js'></script>
    
    <link href="<?= base_url('public') ?>/css/timepicker.css" rel="stylesheet">

    <title><?= $title; ?></title>

   
    <!-- scripts -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>

      
    <script src="<?= base_url('public'); ?>/js/lobibox.min.js"></script>
    <script type="text/javascript">
        function popup_message(type,title,message){
           Lobibox.notify(type, {
              size: 'mini',
              title: title,
              position: 'top right',
              width: 300,
              icon: 'bx bxs-check-circle',
              sound: false,
              // delay: false,
              delay: 10000,
              delayIndicator: false,
              showClass: 'zoomIn',
              hideClass: 'zoomOut',
              msg: message
          });
        }

    </script>

  

    <?php  
     $uri = new \CodeIgniter\HTTP\URI(str_replace('index.php','',current_url()));
     if ($uri->getTotalSegments()>sn2()) { ?> 
    <?php if ($uri->getSegment(sn4()) == 'add_new' || $uri->getSegment(sn4()) == 'long_edit' || $uri->getSegment(sn3()) == 'notice') { ?>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/summernote/0.8.20/summernote-bs4.min.css" integrity="sha512-ngQ4IGzHQ3s/Hh8kMyG4FC74wzitukRMIcTOoKT3EyzFZCILOPF0twiXOQn75eDINUfKBYmzYn2AA8DkAk8veQ==" crossorigin="anonymous" referrerpolicy="no-referrer" />

    <?php }; ?>
    <?php } ?>

</head>

<?php 
   
    $home_bg='home-bg';
    if ($uri->getTotalSegments()>sn2()){
        $home_bg='sub-bg';
    }
  ?> 
<body class="app_body <?= $home_bg; ?>">
<main>
    
    <?php if (session()->get('pu_msg')): ?>
        <script type="text/javascript">
            popup_message('success','Done',"<?= session()->get('pu_msg'); ?>"); 
        </script>
    <?php endif ?>

    <?php if (session()->get('pu_er_msg')): ?> 
        <script type="text/javascript">
            popup_message('error','Failed',"<?= session()->get('pu_er_msg'); ?>"); 
        </script>
    <?php endif ?>