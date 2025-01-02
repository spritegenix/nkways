<?php

use App\Models\UserModel as UserModel;

use App\Models\PostCategoryModel as PostCategoryModel;
use App\Models\PostThumbnail as PostThumbnail;





function style_version()
{
    return '30.2';
}

function script_version()
{
    return '30.2';
}



//online
function sn2()
{
    if (APP_STATE == 'offline') {
        return 2;
    } else {
        return 2;
    }
}

function sn3()
{
    if (APP_STATE == 'offline') {
        return 3;
    } else {
        return 3;
    }
}

function sn4()
{
    if (APP_STATE == 'offline') {
        return 4;
    } else {
        return 4;
    }
}






function convertToValidURL($domain)
{
    $protocol = '//';
    if (substr($domain, 0, 2) === '//' || substr($domain, 0, 4) === 'http') {
        // Domain already has a protocol, no need to add it again
        return $domain;
    } else {
        return $protocol . $domain;
    }
}

function post_categories_array()
{
    $myid = session()->get('id');
    $catmodel = new PostCategoryModel;
    $id = $catmodel->where('company_id', company($myid))->findAll();
    return $id;
}

function thumbnails_array($postid)
{
    $thumbmodel = new PostThumbnail;
    return $thumbmodel->where('post_id', $postid)->findAll();
}


function cat_name($cat)
{
    $catmodel = new PostCategoryModel;
    $numrows = $catmodel->where('id', $cat)->first();
    if ($numrows) {
        return $numrows['category_name'];
    } else {
        return '';
    }
}

function cat_data($cat, $column)
{
    $catmodel = new PostCategoryModel;
    $numrows = $catmodel->where('id', $cat)->first();
    if ($numrows) {
        return $numrows[$column];
    } else {
        return '';
    }
}

function get_setting($company, $option)
{
    return '';
}

function langg()
{
    return '';
}


function user_name($userid)
{
    $UserModel = new UserModel;
    $get_name = $UserModel->where('id', $userid)->first();
    if ($get_name) {
        return $get_name['display_name'];
    } else {
        return '';
    }
}

function now_time($myid)
{
    $timezone = 'Asia/Kolkata';
    $now = new DateTime();
    $now->setTimezone(new DateTimezone($timezone));
    return $now->format('Y-m-d H:i:s');
}


function company($userid)
{
    return COMPANY_ID;
}


function name_of_category($categoryid)
{
    $ProductCategories = new ProductCategories;
    $user = $ProductCategories->where('id', $categoryid)->first();
    if ($user) {
        $fn = $user['cat_name'];
        return $fn;
    } else {
        return '';
    }
}

function name_of_post_category($categoryid)
{
    $PostCategoryModel = new PostCategoryModel;
    $user = $PostCategoryModel->where('id', $categoryid)->first();
    if ($user) {
        $fn = $user['category_name'];
        return $fn;
    } else {
        return '';
    }
}




function name_of_unit($unitid)
{
    if (strtolower($unitid) == 'none') {
        return '';
    } else {
        return $unitid;
    }
}

function name_of_subunit($unitid)
{
    return $unitid;
}


function get_date_format($date, $format)
{
    $newDate = date($format, strtotime($date));
    return $newDate;
}



function cat_title_to_slug($title)
{
    $slug = '';

    $unwanted_array = [
        'ś' => 's',
        'ą' => 'a',
        'ć' => 'c',
        'ç' => 'c',
        'ę' => 'e',
        'ł' => 'l',
        'ń' => 'n',
        'ó' => 'o',
        'ź' => 'z',
        'ż' => 'z',
        'Ś' => 's',
        'Ą' => 'a',
        'Ć' => 'c',
        'Ç' => 'c',
        'Ę' => 'e',
        'Ł' => 'l',
        'Ń' => 'n',
        'Ó' => 'o',
        'Ź' => 'z',
        'Ż' => 'z'
    ]; // Polish letters for example
    $str = strtr($title, $unwanted_array);

    $slug = strtolower(trim(preg_replace('/[\s-]+/', '-', preg_replace('/[^A-Za-z0-9-]+/', '-', preg_replace('/[&]/', 'and', preg_replace('/[\']/', '', iconv('UTF-8', 'ASCII//TRANSLIT', $title))))), '-'));


    return $slug;
}

function user_token()
{
    return '';
}
