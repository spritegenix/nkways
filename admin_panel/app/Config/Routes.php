<?php

namespace Config;

// Create a new instance of our RouteCollection class.
$routes = Services::routes();

/*
 * --------------------------------------------------------------------
 * Router Setup
 * --------------------------------------------------------------------
 */
$routes->setDefaultNamespace('App\Controllers');
$routes->setDefaultController('Home');
$routes->setDefaultMethod('index');
$routes->setTranslateURIDashes(false);
$routes->set404Override();
// The Auto Routing (Legacy) is very dangerous. It is easy to create vulnerable apps
// where controller filters or CSRF protection are bypassed.
// If you don't want to define all routes, please use the Auto Routing (Improved).
// Set `$autoRoutesImproved` to true in `app/Config/Feature.php` and set the following to true.
// $routes->setAutoRoute(false);

/*
 * --------------------------------------------------------------------
 * Route Definitions
 * --------------------------------------------------------------------
 */

// We get a performance increase by specifying the default
// route since we don't have to scan directories.
$routes->get('/', 'Website_management::index');

$routes->get('/users/login', 'Users::login');
$routes->get('/users', 'Users::login');
$routes->post('/users/login', 'Users::login');
$routes->get('/users/logout', 'Users::logout');
$routes->get('/website_management/allposts', 'Website_management::getAllPosts');
$routes->post('/website_management/submit-testimonial', 'Website_management::submitTestimonial');
$routes->get('/website_management/all-reviews', 'Website_management::getAllReviews');
///////////// Website /////////////////
$routes->get('/website_management', 'Website_management::index');
$routes->post('/website_management', 'Website_management::index');
$routes->get('/website_management/enquiries', 'Website_management::enquiries');
$routes->get('/website_management/social_media', 'Website_management::social_media');
$routes->post('/website_management/social_media', 'Website_management::social_media');
$routes->get('/website_management/posts', 'Website_management::posts');
$routes->get('/website_management/create_post', 'Website_management::create_post');
$routes->get('/website_management/categories', 'Website_management::post_categories');
$routes->post('/website_management/categories', 'Website_management::post_categories');
$routes->post('/website_management/edit_cat', 'Website_management::edit_cat');
$routes->post('/website_management/add_cat_from_ajax', 'Website_management::add_cat_from_ajax');



$routes->post('/website_management/add_post', 'Website_management::add_post');
$routes->post('/website_management/update_post', 'Website_management::update_post');
$routes->get('/website_management/deletepost/(:any)', 'Website_management::deletepost/$1');
$routes->get('/website_management/edit_post/(:any)', 'Website_management::edit_post/$1');
$routes->get('/website_management/deletecat/(:any)', 'Website_management::deletecat/$1');
$routes->get('/website_management/remove_featured/(:any)', 'Website_management::remove_featured/$1');
$routes->get('/website_management/remove_thumbnail/(:any)', 'Website_management::remove_thumbnail/$1');



$routes->get('/website_management/api_details', 'Website_management::api_details');
$routes->post('/website_management/api_details', 'Website_management::api_details');
$routes->get('/website_management/delete_enquiries/(:any)', 'Website_management::delete_enquiries/$1');
$routes->get('/website_management/deletesoc/(:any)', 'Website_management::deletesoc/$1');
$routes->post('/website_management/editsoc', 'Website_management::editsoc');

$routes->get('/website_management/reviews', 'Website_management::reviews');
$routes->post('/website_management/add_review', 'Website_management::add_review');
$routes->post('/website_management/edit_review', 'Website_management::edit_review');
$routes->get('/website_management/delete_review/(:any)', 'Website_management::delete_review/$1');


$routes->get('/website_management/clients', 'Website_management::clients');
$routes->post('/website_management/add_client', 'Website_management::add_client');
$routes->post('/website_management/edit_client', 'Website_management::edit_client');
$routes->get('/website_management/delete_client/(:any)', 'Website_management::delete_client/$1');



//////////////////////// Settings ////////////
$routes->get('/settings', 'Settings::index');
$routes->post('/settings/save_profile/(:any)', 'Settings::save_profile/$1');
$routes->post('/settings/changepassword/(:any)', 'Settings::changepassword/$1');
$routes->get('/settings/caste_category', 'Settings::caste_category');
$routes->post('/settings/add_caste_category', 'Settings::add_caste_category');
$routes->post('/settings/edit_caste_category/(:any)', 'Settings::edit_caste_category/$1');
$routes->post('/settings/deletestdcat/(:any)', 'Settings::deletestdcat/$1');
$routes->post('/settings/add_caste_sub_category', 'Settings::add_caste_sub_category');
$routes->post('/settings/edit_caste_sub_category/(:any)', 'Settings::edit_caste_sub_category/$1');
$routes->post('/settings/deletestdsubcat/(:any)', 'Settings::deletestdsubcat/$1');
$routes->get('/settings/prefixes', 'Settings::prefixes');
$routes->post('/settings/prefixes', 'Settings::prefixes');
$routes->get('/settings/payment_gateway', 'Settings::payment_gateway');
$routes->post('/settings/save_paymentway/(:any)', 'Settings::save_paymentway/$1');

$routes->get('settings/invoice_settings', 'Settings::invoice');
$routes->post('settings/invoice_settings', 'Settings::invoice');


/*
 * --------------------------------------------------------------------
 * Additional Routing
 * --------------------------------------------------------------------
 *
 * There will often be times that you need additional routing and you
 * need it to be able to override any defaults in this file. Environment
 * based routes is one such time. require() additional route files here
 * to make that happen.
 *
 * You will have access to the $routes object within that file without
 * needing to reload it.
 */
if (is_file(APPPATH . 'Config/' . ENVIRONMENT . '/Routes.php')) {
    require APPPATH . 'Config/' . ENVIRONMENT . '/Routes.php';
}
