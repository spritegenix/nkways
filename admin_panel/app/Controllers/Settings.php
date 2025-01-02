<?php

namespace App\Controllers;

use App\Models\UserModel;
use App\Models\Companies;
use App\Models\FinancialYears;
use App\Models\ProductsModel;
use App\Models\StockModel;
use App\Models\CompanySettings;
use App\Models\ProductUnits;
use App\Models\ProductCategories;
use App\Models\ProductSubCategories;
use App\Models\SecondaryCategories;
use App\Models\ProductBrand;
use App\Models\TaxtypeModel;
use App\Models\PermissionModel;
use App\Models\LossReasons;
use App\Models\WorkcategoryModel;
use App\models\ContactCategory;
use App\Models\ContactType;
use App\Models\Designation;
use App\Models\WorkDepartmentModel;
use App\Models\ProjectType;
use App\Models\ProductSubUnit;
use App\Models\StudentcategoryModel;
use App\Models\AcademicYearModel;
use App\Models\CompanySettings2;
use App\Models\InvoiceSettings;



class Settings extends BaseController
{
    public function index()
    {

        $session = session();

        if ($session->has('isLoggedIn')) {

            $UserModel = new UserModel;



            $myid = session()->get('id');
            $con = array(
                'id' => session()->get('id')
            );
            $user = $UserModel->where('id', $myid)->first();

            if (app_status(company($myid)) == 0) {
                return redirect()->to(base_url('app_error'));
            }

            if (user_data(session()->get('id'), 'activated_financial_year') < 1) {
                return redirect()->to(base_url('settings/financial_years'));
            }

            if (usertype($myid) == 'customer') {
                return redirect()->to(base_url('customer_dashboard'));
            }


            $data = [
                'title' => 'SpriteGenix ERP-Account Settings',
                'user' => $user,

            ];

            echo view('header', $data);
            echo view('settings/account_settings');
            echo view('footer');
        } else {
            return redirect()->to(base_url('users/login'));
        }
    }

    public function edit_category($cat_id = 0)
    {
        $StudentcategoryModel = new StudentcategoryModel();


        if ($this->request->getMethod() == 'post') {

            $stdcat = [
                'category_name' => strip_tags($this->request->getVar('stdcategory')),

            ];

            $StudentcategoryModel->update($cat_id, $stdcat);

            ////////////////////////CREATE ACTIVITY LOG//////////////
            $log_data = [
                'user_id' => session()->get('id'),
                'action' => 'Student category (#' . $cat_id . ') is updated.',
                'ip' => get_client_ip(),
                'mac' => GetMAC(),
                'created_at' => now_time(session()->get('id')),
                'updated_at' => now_time(session()->get('id')),
                'company_id' => company(session()->get('id')),
            ];

            add_log($log_data);
            ////////////////////////END ACTIVITY LOG/////////////////

            $session = session();
            $session->setFlashdata('pu_msg', 'Category updated successfully');
            return redirect()->to(strip_tags($this->request->getVar('redirect_url')));
        } else {
            return redirect()->to(base_url());
        }
    }

    public function save_barcode_settings()
    {
        $session = session();

        if ($session->has('isLoggedIn')) {

            $UserModel = new UserModel;
            $CompanySettings = new CompanySettings;

            $myid = session()->get('id');
            $con = array(
                'id' => session()->get('id')
            );

            $user = $UserModel->where('id', $myid)->first();

            if (app_status(company($myid)) == 0) {
                return redirect()->to(base_url('app_error'));
            }

            if (user_data(session()->get('id'), 'activated_financial_year') < 1) {
                return redirect()->to(base_url('settings/financial_years'));
            }

            $etqry = $CompanySettings->where('company_id', company($myid))->first();



            $clientdata = [

                'price_for_barcode' => strip_tags($this->request->getVar('price_for_barcode')),
                'border' => strip_tags($this->request->getVar('border')),
                'border-width' => strip_tags($this->request->getVar('border-width')),
                'bar_padding1' => strip_tags($this->request->getVar('bar_padding1')),
                'bar_padding2' => strip_tags($this->request->getVar('bar_padding2')),
                'bar_margin1' => strip_tags($this->request->getVar('bar_margin1')),
                'bar_margin2' => strip_tags($this->request->getVar('bar_margin2')),
                'bar_margin3' => strip_tags($this->request->getVar('bar_margin3')),
                'bar_margin4' => strip_tags($this->request->getVar('bar_margin4')),
                'barcode_height' => strip_tags($this->request->getVar('barcode_height')),
                'bar_body_width' => strip_tags($this->request->getVar('bar_body_width')),
                'font_size' => strip_tags($this->request->getVar('font_size')),
                'margin_top' => strip_tags($this->request->getVar('margin_top')),
                'margin_bot' => strip_tags($this->request->getVar('margin_bot')),

            ];


            if ($CompanySettings->update(get_setting(company($myid), 'id'), $clientdata)) {
                echo 1;
            } else {
                echo 0;
            }
        } else {
            return redirect()->to(base_url('users/login'));
        }
    }

    public function save_profile($userid = "")
    {
        if ($this->request->getMethod() == 'post') {

            $UserModel = new UserModel();
            $session = session();

            $myid = session()->get('id');
            $img = $this->request->getFile('user_profile');

            $email = strip_tags($this->request->getVar('user_email'));


            if (!empty(trim($img))) {
                if ($_FILES['user_profile']['size'] > 500000) { //10 MB (size is also in bytes)
                    $filename = strip_tags($this->request->getVar('old_profile_pic'));
                } else {
                    $filename = $img->getRandomName();
                    $mimetype = $img->getClientMimeType();
                    $img->move('public/images/avatars/', $filename);
                }
            } else {


                $filename = strip_tags($this->request->getVar('old_profile_pic'));
            }

            $users_data = [
                'display_name' => strip_tags($this->request->getVar('user_name')),
                'billing_address' => strip_tags($this->request->getVar('address')),
                'phone' => strip_tags($this->request->getVar('user_phone')),
                'date_of_birth' => strip_tags($this->request->getVar('date_of_birth')),
                'gender' => strip_tags($this->request->getVar('gender')),
                'email' => $email,
                'profile_pic' => $filename,
                'datetime' => now_time($myid),
                'date_of_join' => strip_tags($this->request->getVar('date_of_join')),
                'designation' => strip_tags($this->request->getVar('designation')),
                'qualification' => strip_tags($this->request->getVar('qualification')),
            ];




            $myem = $UserModel->where('id', $userid)->first();

            if ($_FILES['user_profile']['size'] < 500000) {
                if ($myem['email'] == $email) {

                    $UserModel->update($userid, $users_data);

                    ////////////////////////CREATE ACTIVITY LOG//////////////
                    $log_data = [
                        'user_id' => $myid,
                        'action' => 'User (#' . $myid . ') <b>' . strip_tags($this->request->getVar('user_name')) . '</b> profile updated.',
                        'ip' => get_client_ip(),
                        'mac' => GetMAC(),
                        'created_at' => now_time($myid),
                        'updated_at' => now_time($myid),
                        'company_id' => company($myid),
                    ];

                    add_log($log_data);
                    ////////////////////////END ACTIVITY LOG/////////////////
                    echo 1;
                    // session()->setFlashdata('sucmsg', 'Saved!');
                    // return redirect()->to(base_url('settings/account_settings'));

                } else {

                    $checkemail = $UserModel->where('email', $email)->where('deleted', 0)->first();

                    if (!$checkemail) {

                        $UserModel->update($userid, $users_data);

                        ////////////////////////CREATE ACTIVITY LOG//////////////
                        $log_data = [
                            'user_id' => $myid,
                            'action' => 'User (#' . $myid . ') <b>' . strip_tags($this->request->getVar('user_name')) . '</b> profile updated.',
                            'ip' => get_client_ip(),
                            'mac' => GetMAC(),
                            'created_at' => now_time($myid),
                            'updated_at' => now_time($myid),
                            'company_id' => company($myid),
                        ];

                        add_log($log_data);
                        ////////////////////////END ACTIVITY LOG/////////////////
                        echo 1;
                    } else {
                        echo 0;
                    }
                    echo 2;
                }
            } else {

                echo 3;
            }
        }
    }





    public function changepassword($userid = "")
    {
        if ($this->request->getMethod() == 'post') {
            $UserModel = new UserModel();
            $myid = session()->get('id');

            $rules = [
                'password' => 'required|min_length[8]|max_length[255]|validateUser[email,password]',
            ];

            $errors = [
                'password' => [
                    'validateUser' => 'Email or Password don\'t match'
                ]
            ];

            if (!$this->validate($rules, $errors)) {
                echo 3;
            } else {
                $biodata = [
                    'password' => $_POST['newpassword']
                ];
                $update_bio = $UserModel->update($userid, $biodata);

                if ($update_bio) {

                    echo 1;
                } else {
                    echo 0;
                }
            }
        }
    }


    public function organisation_setting()
    {
        $session = session();
        $user = new UserModel();
        $Companies = new Companies;
        $myid = session()->get('id');

        if ($session->has('isLoggedIn')) {
            $usaerdata = $user->where('id', session()->get('id'))->first();

            if (app_status(company($myid)) == 0) {
                return redirect()->to(base_url('app_error'));
            }

            if (user_data(session()->get('id'), 'activated_financial_year') < 1) {
                return redirect()->to(base_url('settings/financial_years'));
            }

            if (check_permission($myid, 'manage_account_setting') == true || usertype($myid) == 'admin') {
            } else {
                return redirect()->to(base_url('app_error/permission_denied'));
            }


            $company_data = $Companies->where('id', company($myid))->first();
            $data = [
                'title' => 'Organisation settings | Erudite ERP',
                'user' => $usaerdata,
                'company_data' => $company_data

            ];

            echo view('header', $data);
            echo view('settings/company_settings', $data);
            echo view('footer');
        } else {
            return redirect()->to(base_url('users'));
        }
    }



    public function save_organisation($cmpid = "")
    {
        if ($this->request->getMethod() == 'post') {
            $myid = session()->get('id');
            $session = session();
            $Companies = new Companies;

            $img = $this->request->getFile('cmp_foto');

            if (is_school(company($myid))) {

                $start_time = twelve_to_24($this->request->getVar('start_time'));
                $end_time = twelve_to_24($this->request->getVar('end_time'));
            } else {

                $start_time = '';
                $end_time = '';
            }





            if (!empty(trim($img))) {

                if ($_FILES['cmp_foto']['size'] > 500000) { //10 MB (size is also in bytes)
                    $filename = '';
                } else {

                    $filename = $img->getRandomName();
                    $mimetype = $img->getClientMimeType();
                    $img->move('public/images/company_docs/', $filename);
                }


                $ac_data = [
                    'updated_at' => date('Y-m-d H:i:s'),
                    'company_logo' => $filename,
                    'company_name' => strip_tags($this->request->getVar('company_name')),
                    'company_phone' => strip_tags($this->request->getVar('company_phone')),
                    'country' => strip_tags($this->request->getVar('country')),
                    'state' => strip_tags($this->request->getVar('state')),
                    'city' => strip_tags($this->request->getVar('city')),
                    'postal_code' => strip_tags($this->request->getVar('postal_code')),
                    'email' => strip_tags($this->request->getVar('cmp_email')),
                    'gstin_vat_no' => strip_tags($this->request->getVar('gst_vat')),
                    'company_telephone' => strip_tags($this->request->getVar('company_telephone')),
                    'fax' => strip_tags($this->request->getVar('fax')),
                    'website' => strip_tags($this->request->getVar('website')),
                    'about' => strip_tags($this->request->getVar('about')),
                    'start_time' => $start_time,
                    'end_time' => $end_time,
                    'sc_code' => strip_tags($this->request->getVar('scode')),
                    'lc_code' => strip_tags($this->request->getVar('lcode')),
                    'address' => strip_tags($this->request->getVar('address')),
                ];
            } else {

                $ac_data = [
                    'updated_at' => date('Y-m-d H:i:s'),
                    'company_name' => strip_tags($this->request->getVar('company_name')),
                    'company_phone' => strip_tags($this->request->getVar('company_phone')),
                    'country' => strip_tags($this->request->getVar('country')),
                    'state' => strip_tags($this->request->getVar('state')),
                    'postal_code' => strip_tags($this->request->getVar('postal_code')),
                    'city' => strip_tags($this->request->getVar('city')),
                    'email' => strip_tags($this->request->getVar('cmp_email')),
                    'gstin_vat_no' => strip_tags($this->request->getVar('gst_vat')),
                    'company_telephone' => strip_tags($this->request->getVar('company_telephone')),
                    'fax' => strip_tags($this->request->getVar('fax')),
                    'website' => strip_tags($this->request->getVar('website')),
                    'about' => strip_tags($this->request->getVar('about')),
                    'start_time' => $start_time,
                    'end_time' => $end_time,
                    'sc_code' => strip_tags($this->request->getVar('scode')),
                    'lc_code' => strip_tags($this->request->getVar('lcode')),
                    'address' => strip_tags($this->request->getVar('address')),
                ];
            }
            if (!empty(trim($img))) {

                if ($_FILES['cmp_foto']['size'] < 500000) {

                    $Companies->update($cmpid, $ac_data);

                    ////////////////////////CREATE ACTIVITY LOG//////////////
                    $log_data = [
                        'user_id' => $myid,
                        'action' => 'Company/branch(#' . $cmpid . ') <b>' . strip_tags($this->request->getVar('company_name')) . '</b> details updated.',
                        'ip' => get_client_ip(),
                        'mac' => GetMAC(),
                        'created_at' => now_time($myid),
                        'updated_at' => now_time($myid),
                        'company_id' => company($myid),
                    ];

                    add_log($log_data);
                    ////////////////////////END ACTIVITY LOG/////////////////
                    echo 1;
                } else {
                    echo 2;
                }
            } else {
                $Companies->update($cmpid, $ac_data);
                ////////////////////////CREATE ACTIVITY LOG//////////////
                $log_data = [
                    'user_id' => $myid,
                    'action' => 'Company/branch(#' . $cmpid . ') <b>' . strip_tags($this->request->getVar('company_name')) . '</b> details updated.',
                    'ip' => get_client_ip(),
                    'mac' => GetMAC(),
                    'created_at' => now_time($myid),
                    'updated_at' => now_time($myid),
                    'company_id' => company($myid),
                ];

                add_log($log_data);
                ////////////////////////END ACTIVITY LOG/////////////////

                echo 1;
            }
        }
    }




    public function financial_years()
    {

        $session = session();

        if ($session->has('isLoggedIn')) {

            $FinancialYears = new FinancialYears;
            $Companies = new Companies;
            $UserModel = new UserModel;

            $myid = session()->get('id');
            $con = array(
                'id' => session()->get('id')
            );
            $user = $UserModel->where('id', $myid)->first();

            $query = $Companies->where('id', company($myid))->findAll();
            $fyarray = $FinancialYears->where('company_id', company($myid))->where('status', 1)->orderBy('id', 'DESC')->findAll();
            $data = [
                'title' => 'SpriteGenix ERP- Financial Year',
                'financial_years_array' => $fyarray,
                'company_data' => $query,
                'user' => $user
            ];

            if (check_main_company($myid) == true) {
                if (check_branch_of_main_company(company($myid)) == true) {
                    if (app_status(company($myid)) == 0) {
                        return redirect()->to(base_url('app_error'));
                    }


                    if (check_permission($myid, 'manage_financial_year') == true || usertype($myid) == 'admin') {
                    } else {
                        if ($user['author'] != 1) {
                            return redirect()->to(base_url('app_error/company_not_cofigured'));
                        } else {
                            return redirect()->to(base_url());
                        }
                    }
                } else {
                    return redirect()->to(base_url('company'));
                }
            } else {
                return redirect()->to(base_url('company'));
            }




            echo view('header', $data);
            echo view('settings/financial_years', $data);
            echo view('footer');
        } else {
            return redirect()->to(base_url('users/login'));
        }
    }




    ///financial years//////
    public function start_new_financial_year()
    {


        $session = session();

        $FinancialYears = new FinancialYears;
        $Companies = new Companies;
        $UserModel = new UserModel;
        $ProductsModel = new ProductsModel;
        $StockModel = new StockModel;

        $myid = session()->get('id');
        $result = 0;

        if (company_year_end(company($myid)) == 'dec') {
            $financial_from = date("Y-01-01", strtotime("Y"));
            $financial_to = date("Y-12-t", strtotime($financial_from));
        } elseif (company_year_end(company($myid)) == 'mar') {
            $financial_from = date("Y-04-01", strtotime("Y"));
            $new_year = date("Y") + 1;
            $financial_to = date($new_year . "-03-31", strtotime($financial_from));
        } else {
            $financial_from = '0000-00-00';
            $financial_to = '0000-00-00';
        }


        $gs = $FinancialYears->where('company_id', company($myid))->where('activated', '1')->findAll();
        foreach ($gs as $g) {
            $ud = ['activated' => 0];
            $FinancialYears->update($g['id'], $ud);
        }

        $fin_data = [
            'company_id' => company($myid),
            'financial_from' => $financial_from,
            'financial_to' => $financial_to,
            'status' => 0,
            'activated' => 1,
        ];

        if (current_financial_year('financial_from', company($myid)) == 'no_financial_years') {
            $finins = $FinancialYears->save($fin_data);
            $insert_id = $FinancialYears->insertID();

            if ($finins) {

                $finnewyrdata = [
                    'activated_financial_year' => $insert_id
                ];

                $UserModel->update($myid, $finnewyrdata);

                // add_base_accounting_heads(company($myid),activated_year(company($myid)));

                // $get_pro = $ProductsModel->where('deleted', 0)->where('company_id', company($myid));
                // foreach ($get_pro->findAll() as $gp) {
                //    $stock_data=[
                //        'company_id'=>company($myid),
                //        'financial_year'=>activated_year(company($myid)),
                //        'product_id'=>$gp['id'],
                //        'opening_stock'=>$gp['stock'],
                //        'closing_stock'=>$gp['stock'],
                //        'current_stock'=>$gp['stock'],
                //    ];
                //    $StockModel->save($stock_data);
                // }

                // echo 1;



                if (last_financial_year('id', company($myid)) == "not_exist") {
                    add_base_accounting_heads(company($myid), activated_year(company($myid)));
                    $result = 1;
                } else {

                    add_base_accounting_heads(company($myid), activated_year(company($myid)));
                    transfer_accounting_heads(company($myid), last_financial_year('id', company($myid)), activated_year(company($myid)));
                    $result = 1;
                }
            } else {
                $result = 0;
            }
        } else {
            $result = 0;
        }

        echo $result;
    }

    public function activate_f_year($fyear = "")
    {
        if (!empty($fyear)) {

            $session = session();
            $myid = session()->get('id');
            $UserModel = new UserModel;
            $FinancialYears = new FinancialYears;
            $Companies = new Companies;

            // $gs=$FinancialYears->where('company_id',company($myid))->where('activated','1')->findAll();
            // foreach ($gs as $g) {
            //     $ud=['activated'=>0];
            //     $FinancialYears->update($g['id'],$ud);
            // }


            $finyrdata = [
                'activated_financial_year' => $fyear
            ];


            if ($UserModel->update($myid, $finyrdata)) {


                echo 1;
            } else {
                echo 0;
            }
        } else {
            echo  0;
        }
    }

    public function preferences()
    {

        $session = session();

        if ($session->has('isLoggedIn')) {

            $CompanySettings = new CompanySettings;
            $UserModel = new UserModel;


            $myid = session()->get('id');
            $con = array(
                'id' => session()->get('id')
            );

            $user = $UserModel->where('id', $myid)->first();

            if (app_status(company($myid)) == 0) {
                return redirect()->to(base_url('app_error'));
            }

            if (user_data(session()->get('id'), 'activated_financial_year') < 1) {
                return redirect()->to(base_url('settings/financial_years'));
            }

            if (check_permission($myid, 'manage_settings') == true || usertype($myid) == 'admin') {
            } else {
                return redirect()->to(base_url());
            }

            $cquery = $CompanySettings->where('company_id', company($myid))->first();

            $data = [
                'title' => 'SpriteGenix ERP- Preferences',
                'user' => $user,
                'c_set' => $cquery
            ];



            echo view('header', $data);
            echo view('settings/preferences', $data);
            echo view('footer');


            if (isset($_POST['save_preference'])) {


                $ac_data = [
                    'currency' => $this->request->getVar('currency'),
                    'timezone' => $this->request->getVar('timezone'),

                    'keyboard' => $this->request->getVar('keyboard'),
                    'primary_color' => $this->request->getVar('primary_color'),
                    'secondary_color' => $this->request->getVar('secondary_color'),
                    'round_of_value' => $this->request->getVar('round_of_value'),
                    'pdf_type' => $this->request->getVar('pdf_type'),
                    'subunit_devide' => $this->request->getVar('subunit_devide'),
                    'billing_style' => strip_tags($this->request->getVar('billing_style')),
                    'language' => strip_tags($this->request->getVar('language')),
                    'make_image' => strip_tags($this->request->getVar('make_image')),
                    'make_image_receipt' => strip_tags($this->request->getVar('make_image_receipt')),
                    'feedback' => strip_tags($this->request->getVar('switch_feed')),
                    'allow_massanger' => strip_tags($this->request->getVar('switch_massenger')),
                    'allow_receipt_date' => strip_tags($this->request->getVar('allow_receipt_date')),
                    'hide_deleted' => strip_tags($this->request->getVar('hide_deleted')),

                    'subunit_devide' => strip_tags($this->request->getVar('subunit_devide')),


                ];

                $update_user = $CompanySettings->update(get_setting(company($myid), 'id'), $ac_data);

                if ($update_user) {
                    ////////////////////////CREATE ACTIVITY LOG//////////////
                    $log_data = [
                        'user_id' => $myid,
                        'action' => 'Company/branch (#' . company($myid) . ') <b>' . my_company_name(company($myid)) . '</b> preferences updated.',
                        'ip' => get_client_ip(),
                        'mac' => GetMAC(),
                        'created_at' => now_time($myid),
                        'updated_at' => now_time($myid),
                        'company_id' => company($myid),
                    ];

                    add_log($log_data);
                    ////////////////////////END ACTIVITY LOG/////////////////
                    session()->setFlashdata('pu_msg', 'Saved!');
                    return redirect()->to(base_url('settings/preferences'));
                } else {
                    session()->setFlashdata('pu_er_msg', 'Failed to save!');
                    return redirect()->to(base_url('settings/preferences'));
                }
            }
        } else {
            return redirect()->to(base_url('users/login'));
        }
    }


    public function invoice()
    {
        $session = session();

        if ($session->has('isLoggedIn')) {

            $CompanySettings = new CompanySettings;
            $CompanySettings2 = new CompanySettings2;

            $UserModel = new UserModel;


            $myid = session()->get('id');
            $con = array(
                'id' => session()->get('id')
            );

            $user = $UserModel->where('id', $myid)->first();

            if (app_status(company($myid)) == 0) {
                return redirect()->to(base_url('app_error'));
            }

            if (user_data(session()->get('id'), 'activated_financial_year') < 1) {
                return redirect()->to(base_url('settings/financial_years'));
            }

            if (check_permission($myid, 'manage_settings') == true || usertype($myid) == 'admin') {
            } else {
                return redirect()->to(base_url());
            }

            $cquery = $CompanySettings->where('company_id', company($myid))->first();




            $data = [
                'title' => 'SpriteGenix ERP- Invoice settings',
                'user' => $user,
                'c_set' => $cquery
            ];

            echo view('header', $data);
            echo view('settings/invoice', $data);
            echo view('footer');


            if (isset($_POST['save_invoice_set'])) {

                $finalfile_invoice_header = '';
                $finalfile_invoice_signature = '';
                $finalfile_payslip_signature = '';
                $finalfile_invoice_seal = '';
                $finalfile_invoice_qr_code = '';

                if (!empty($_FILES['payslip_signature']['name'])) {
                    $target_dir = "public/images/company_docs/";
                    $target_file = $target_dir . time() . basename($_FILES["payslip_signature"]["name"]);
                    $imageFileType = pathinfo($target_file, PATHINFO_EXTENSION);
                    $finalfile_payslip_signature = time() . basename($_FILES["payslip_signature"]["name"]);
                    move_uploaded_file($_FILES["payslip_signature"]["tmp_name"], $target_file);
                } else {
                    $finalfile_payslip_signature = strip_tags($this->request->getVar('old_payslip_signature'));
                }

                if (!empty($_FILES['invoice_header']['name'])) {
                    $target_dir = "public/images/company_docs/";
                    $target_file = $target_dir . time() . basename($_FILES["invoice_header"]["name"]);
                    $imageFileType = pathinfo($target_file, PATHINFO_EXTENSION);
                    $finalfile_invoice_header = time() . basename($_FILES["invoice_header"]["name"]);
                    move_uploaded_file($_FILES["invoice_header"]["tmp_name"], $target_file);
                } else {
                    $finalfile_invoice_header = strip_tags($this->request->getVar('old_invoice_header'));
                }

                if (!empty($_FILES['invoice_signature']['name'])) {
                    $target_dir = "public/images/company_docs/";
                    $target_file = $target_dir . time() . basename($_FILES["invoice_signature"]["name"]);
                    $imageFileType = pathinfo($target_file, PATHINFO_EXTENSION);
                    $finalfile_invoice_signature = time() . basename($_FILES["invoice_signature"]["name"]);
                    move_uploaded_file($_FILES["invoice_signature"]["tmp_name"], $target_file);
                } else {
                    $finalfile_invoice_signature = strip_tags($this->request->getVar('old_invoice_signature'));
                }

                if (!empty($_FILES['invoice_seal']['name'])) {
                    $target_dir = "public/images/company_docs/";
                    $target_file = $target_dir . time() . basename($_FILES["invoice_seal"]["name"]);
                    $imageFileType = pathinfo($target_file, PATHINFO_EXTENSION);
                    $finalfile_invoice_seal = time() . basename($_FILES["invoice_seal"]["name"]);
                    move_uploaded_file($_FILES["invoice_seal"]["tmp_name"], $target_file);
                } else {
                    $finalfile_invoice_seal = strip_tags($this->request->getVar('old_invoice_seal'));
                }

                if (!empty($_FILES['invoice_qr_code']['name'])) {
                    $target_dir = "public/images/company_docs/";
                    $target_file = $target_dir . time() . basename($_FILES["invoice_qr_code"]["name"]);
                    $imageFileType = pathinfo($target_file, PATHINFO_EXTENSION);
                    $finalfile_invoice_qr_code = time() . basename($_FILES["invoice_qr_code"]["name"]);
                    move_uploaded_file($_FILES["invoice_qr_code"]["tmp_name"], $target_file);
                } else {
                    $finalfile_invoice_qr_code = strip_tags($this->request->getVar('old_invoice_qr_code'));
                }

                $ac_data = [

                    'Invoice_color' => strip_tags($this->request->getVar('Invoice_color')),
                    'invoice_footer' => strip_tags($this->request->getVar('invoice_footer')),
                    'invoice_declaration' => strip_tags($this->request->getVar('invoice_declaration')),
                    'invoice_terms' => strip_tags($this->request->getVar('invoice_terms')),
                    'invoice_template' => strip_tags($this->request->getVar('invoice_temp')),
                    'receipt_template' => strip_tags($this->request->getVar('receipt_temp')),
                    'show_batch_no' => strip_tags($this->request->getVar('show_batch_no')),
                    'show_price' => strip_tags($this->request->getVar('show_price')),
                    'show_tax' => strip_tags($this->request->getVar('show_tax')),
                    'show_discount' => strip_tags($this->request->getVar('show_discount')),
                    'show_quantity' => strip_tags($this->request->getVar('show_quantity')),
                    'show_logo' => strip_tags($this->request->getVar('show_logo')),
                    'show_expiry_date' => strip_tags($this->request->getVar('show_expiry_date')),
                    'show_due_date' => strip_tags($this->request->getVar('show_due_date')),
                    'show_head' => strip_tags($this->request->getVar('show_head')),
                    'invoice_font_color' => strip_tags($this->request->getVar('invoice_font_color')),
                    'invoice_header' => $finalfile_invoice_header,
                    'invoice_signature' => $finalfile_invoice_signature,
                    'payslip_signature' => $finalfile_payslip_signature,
                    'invoice_seal' => $finalfile_invoice_seal,
                    'invoice_qr_code' => $finalfile_invoice_qr_code,
                    'bank_details' => strip_tags($this->request->getVar('bank_details')),
                    'upi' => strip_tags($this->request->getVar('upi')),
                    'show_uom' => strip_tags($this->request->getVar('show_uom')),
                    'show_hsncode_no' => strip_tags($this->request->getVar('show_hsncode_no')),
                    'taxnumber' => strip_tags($this->request->getVar('taxnumber')),
                    'tinnumber' => strip_tags($this->request->getVar('tinnumber')),

                    'show_mrn_number' => strip_tags($this->request->getVar('show_mrn_number')),
                    'show_validity' => strip_tags($this->request->getVar('show_validity')),
                    'billing_style' => strip_tags($this->request->getVar('billing_style')),
                    'cursor_position' => strip_tags($this->request->getVar('cursor_position')),

                ];

                $update_user = $CompanySettings->update(get_setting(company($myid), 'id'), $ac_data);

                $inv_data = [
                    'invoice_page_size' => strip_tags($this->request->getVar('invoice_page_size')),
                    'invoice_orientation' => strip_tags($this->request->getVar('invoice_orientation')),

                ];
                $update_data = $CompanySettings2->update(get_setting2(company($myid), 'id'), $inv_data);


                if ($update_user && $update_data) {
                    ////////////////////////CREATE ACTIVITY LOG//////////////
                    $log_data = [
                        'user_id' => $myid,
                        'action' => 'Company/branch (#' . company($myid) . ') <b>' . my_company_name(company($myid)) . '</b> invoice settings updated.',
                        'ip' => get_client_ip(),
                        'mac' => GetMAC(),
                        'created_at' => now_time($myid),
                        'updated_at' => now_time($myid),
                        'company_id' => company($myid),
                    ];

                    add_log($log_data);
                    ////////////////////////END ACTIVITY LOG/////////////////
                    session()->setFlashdata('pu_msg', 'Saved!');
                    return redirect()->to(base_url('settings/invoice_settings'));
                } else {
                    session()->setFlashdata('pu_er_msg', 'Failed to save!');
                    return redirect()->to(base_url('settings/invoice_settings'));
                }
            }
        } else {
            return redirect()->to(base_url('users/login'));
        }
    }


    public function crm_configurations()
    {
        $session = session();

        if ($session->has('isLoggedIn')) {

            $CompanySettings = new CompanySettings;
            $LossReasons = new LossReasons;
            $UserModel = new UserModel;
            $WorkcategoryModel = new WorkcategoryModel;
            $Designation = new Designation;
            $ContactType = new ContactType;
            $WorkDepartmentModel = new WorkDepartmentModel;
            $ProjectType = new ProjectType;


            $myid = session()->get('id');
            $con = array(
                'id' => session()->get('id')
            );

            $user = $UserModel->where('id', $myid)->first();

            if (check_permission($myid, 'manage_settings') == true || usertype($myid) == 'admin') {
            } else {
                return redirect()->to(base_url());
            }

            if (app_status(company($myid)) == 0) {
                return redirect()->to(base_url('app_error'));
            }

            if (user_data(session()->get('id'), 'activated_financial_year') < 1) {
                return redirect()->to(base_url('settings/financial_years'));
            }

            $cquery = $CompanySettings->where('company_id', company($myid))->first();
            $work_category_data = $WorkcategoryModel->where('company_id', company($myid))->where('deleted', 0)->orderBy('id', 'desc')->findAll();

            $data = [
                'title' => 'SpriteGenix ERP- CRM Configurations',
                'user' => $user,
                'c_set' => $cquery,
                'work_category_data' => $work_category_data,
                'work_department' => $WorkDepartmentModel->where('company_id', company($myid))->where('deleted', 0)->orderBy('id', 'desc')->findAll(),
                'reasons' => $LossReasons->where('company_id', company($myid))->where('deleted', 0)->orderBy('id', 'desc')->findAll(),
                'designation' => $Designation->where('company_id', company($myid))->where('deleted', 0)->orderBy('id', 'desc')->findAll(),
                'contact_type' => $ContactType->where('company_id', company($myid))->where('deleted', 0)->orderBy('id', 'desc')->findAll(),
                'project_types' => $ProjectType->where('company_id', company($myid))->where('deleted', 0)->orderBy('id', 'desc')->findAll(),

            ];

            if (is_crm(company($myid))) {
                echo view('header', $data);
                echo view('settings/crm_configurations', $data);
                echo view('footer');
            } else {
                return redirect()->to(base_url());
            }


            if (isset($_POST['save_crm_grids'])) {

                $entry = 1;
                $site_visit = 1;
                $direct_loss = 1;
                $quotation = 1;
                $follow_up = 1;
                $loss = 1;
                $sales_order = 1;
                $deliver_note = 1;
                $delivery = 1;
                $invoice = 1;
                $payment_followup = 1;
                $complete = 1;

                if (strip_tags($this->request->getVar('entry'))) {
                    $entry = 0;
                }

                if (strip_tags($this->request->getVar('site_visit'))) {
                    $site_visit = 0;
                }

                if (strip_tags($this->request->getVar('direct_loss'))) {
                    $direct_loss = 0;
                }

                if (strip_tags($this->request->getVar('quotation'))) {
                    $quotation = 0;
                }

                if (strip_tags($this->request->getVar('follow_up'))) {
                    $follow_up = 0;
                }

                if (strip_tags($this->request->getVar('loss'))) {
                    $loss = 0;
                }

                if (strip_tags($this->request->getVar('sales_order'))) {
                    $sales_order = 0;
                }

                if (strip_tags($this->request->getVar('deliver_note'))) {
                    $deliver_note = 0;
                }

                if (strip_tags($this->request->getVar('delivery'))) {
                    $delivery = 0;
                }

                if (strip_tags($this->request->getVar('invoice'))) {
                    $invoice = 0;
                }

                if (strip_tags($this->request->getVar('payment_followup'))) {
                    $payment_followup = 0;
                }

                if (strip_tags($this->request->getVar('complete'))) {
                    $complete = 0;
                }


                $ac_data = [
                    'company_id' => company($myid),
                    'show_entry' => $entry,
                    'show_site_visit' => $site_visit,
                    'show_direct_loss' => $direct_loss,
                    'show_quotation' => $quotation,
                    'show_follow_up' => $follow_up,
                    'show_loss' => $loss,
                    'show_sales_order' => $sales_order,
                    'show_deliver_note' => $deliver_note,
                    'show_delivery' => $delivery,
                    'show_invoice' => $invoice,
                    'show_payment_followup' => $payment_followup,
                    'show_complete' => $complete
                ];

                $crmhide = $CompanySettings->update(get_setting(company($myid), 'id'), $ac_data);
                if ($crmhide) {
                    session()->setFlashdata('sucmsg', 'Saved!');
                    return redirect()->to(base_url('settings/crm_configurations'));
                } else {
                    session()->setFlashdata('failmsg', 'Failed to save!');
                    return redirect()->to(base_url('settings/crm_configurations'));
                }
            }


            if (isset($_POST['save_department'])) {
                $dept_data = [
                    'company_id' => company($myid),
                    'department_name' => strip_tags($this->request->getVar('department_name')),
                    'department_head' => strip_tags($this->request->getVar('staffid')),
                ];

                if ($WorkDepartmentModel->save($dept_data)) {

                    session()->setFlashdata('sucmsg', 'Saved!');
                    return redirect()->to(base_url('settings/crm_configurations'));
                } else {
                    session()->setFlashdata('failmsg', 'Failed to save!');
                    return redirect()->to(base_url('settings/crm_configurations'));
                }
            }


            if (isset($_POST['edit_work_department'])) {
                $dept_data = [
                    'department_name' => strip_tags($this->request->getVar('department_name')),
                    'department_head' => strip_tags($this->request->getVar('staffid')),
                ];

                if ($WorkDepartmentModel->update(strip_tags($this->request->getVar('wpid')), $dept_data)) {
                    session()->setFlashdata('sucmsg', 'Saved!');
                    return redirect()->to(base_url('settings/crm_configurations'));
                } else {
                    session()->setFlashdata('failmsg', 'Failed to save!');
                    return redirect()->to(base_url('settings/crm_configurations'));
                }
            }


            if (isset($_POST['save_reasons'])) {
                $ac_data = [
                    'company_id' => company($myid),
                    'stage' => strip_tags($this->request->getVar('stage')),
                    'reason' => strip_tags($this->request->getVar('reason')),
                ];



                if ($LossReasons->save($ac_data)) {
                    ////////////////////////CREATE ACTIVITY LOG//////////////
                    $log_data = [
                        'user_id' => $myid,
                        'action' => 'New loss reason (<b>#' . strip_tags($this->request->getVar('reason')) . '</b>) added.',
                        'ip' => get_client_ip(),
                        'mac' => GetMAC(),
                        'created_at' => now_time($myid),
                        'updated_at' => now_time($myid),
                        'company_id' => company($myid),
                    ];

                    add_log($log_data);
                    ////////////////////////END ACTIVITY LOG/////////////////
                    session()->setFlashdata('sucmsg', 'Saved!');
                    return redirect()->to(base_url('settings/crm_configurations'));
                } else {
                    session()->setFlashdata('failmsg', 'Failed to save!');
                    return redirect()->to(base_url('settings/crm_configurations'));
                }
            }


            if (isset($_POST['edit_reason'])) {
                $ac_data = [
                    'stage' => strip_tags($this->request->getVar('stage')),
                    'reason' => strip_tags($this->request->getVar('reason')),
                ];



                if ($LossReasons->update(strip_tags($this->request->getVar('reason_id')), $ac_data)) {
                    ////////////////////////CREATE ACTIVITY LOG//////////////
                    $log_data = [
                        'user_id' => $myid,
                        'action' => 'Loss reason (#' . strip_tags($this->request->getVar('reason_id')) . ') <b>' . strip_tags($this->request->getVar('reason')) . '</b> is updated.',
                        'ip' => get_client_ip(),
                        'mac' => GetMAC(),
                        'created_at' => now_time($myid),
                        'updated_at' => now_time($myid),
                        'company_id' => company($myid),
                    ];

                    add_log($log_data);
                    ////////////////////////END ACTIVITY LOG/////////////////
                    session()->setFlashdata('sucmsg', 'Saved!');
                    return redirect()->to(base_url('settings/crm_configurations'));
                } else {
                    session()->setFlashdata('failmsg', 'Failed to save!');
                    return redirect()->to(base_url('settings/crm_configurations'));
                }
            }


            if (isset($_POST['save_work_category'])) {
                $ac_data = [
                    'company_id' => company($myid),
                    'category_name' => strip_tags($this->request->getVar('category_name')),
                    'parent_id' => strip_tags($this->request->getVar('parent_id')),
                ];


                if ($WorkcategoryModel->save($ac_data)) {

                    session()->setFlashdata('sucmsg', 'Saved!');
                    return redirect()->to(base_url('settings/crm_configurations'));
                } else {
                    session()->setFlashdata('failmsg', 'Failed to save!');
                    return redirect()->to(base_url('settings/crm_configurations'));
                }
            }


            if (isset($_POST['edit_work_category'])) {
                $ac_data = [
                    'category_name' => strip_tags($this->request->getVar('category_name')),
                    'parent_id' => strip_tags($this->request->getVar('parent_id')),
                ];



                if ($WorkcategoryModel->update(strip_tags($this->request->getVar('wcid')), $ac_data)) {

                    session()->setFlashdata('sucmsg', 'Saved!');
                    return redirect()->to(base_url('settings/crm_configurations'));
                } else {
                    session()->setFlashdata('failmsg', 'Failed to save!');
                    return redirect()->to(base_url('settings/crm_configurations'));
                }
            }


            if (isset($_POST['save_category'])) {
                $cc_data = [
                    'company_id' => company($myid),
                    'designation' => strip_tags($this->request->getVar('designation')),
                ];


                if ($Designation->save($cc_data)) {
                    ////////////////////////CREATE ACTIVITY LOG//////////////
                    $category_data = [
                        'user_id' => $myid,
                        'action' => 'New contact category (<b>#' . strip_tags($this->request->getVar('designation')) . '</b>) added.',
                        'ip' => get_client_ip(),
                        'mac' => GetMAC(),
                        'created_at' => now_time($myid),
                        'updated_at' => now_time($myid),
                        'company_id' => company($myid),
                    ];

                    add_log($category_data);
                    ////////////////////////END ACTIVITY LOG/////////////////
                    session()->setFlashdata('sucmsg', 'Saved!');
                    return redirect()->to(base_url('settings/crm_configurations'));
                } else {
                    session()->setFlashdata('failmsg', 'Failed to save!');
                    return redirect()->to(base_url('settings/crm_configurations'));
                }
            }



            if (isset($_POST['edit_category'])) {
                $cc_data = [
                    'designation' => strip_tags($this->request->getVar('designation')),
                ];


                if ($Designation->update(strip_tags($this->request->getVar('contact_id')), $cc_data)) {
                    ////////////////////////CREATE ACTIVITY LOG//////////////
                    $category_data = [
                        'user_id' => $myid,
                        'action' => 'Contact Category (#' . strip_tags($this->request->getVar('contact_id')) . ') <b>' . strip_tags($this->request->getVar('designation')) . '</b> is updated.',
                        'ip' => get_client_ip(),
                        'mac' => GetMAC(),
                        'created_at' => now_time($myid),
                        'updated_at' => now_time($myid),
                        'company_id' => company($myid),
                    ];

                    add_log($category_data);
                    ////////////////////////END ACTIVITY LOG/////////////////
                    session()->setFlashdata('sucmsg', 'Saved!');
                    return redirect()->to(base_url('settings/crm_configurations'));
                } else {
                    session()->setFlashdata('failmsg', 'Failed to save!');
                    return redirect()->to(base_url('settings/crm_configurations'));
                }
            }



            if (isset($_POST['save_type'])) {
                $ct_data = [
                    'company_id' => company($myid),
                    'contact_type' => strip_tags($this->request->getVar('contact_type')),
                ];


                if ($ContactType->save($ct_data)) {
                    ////////////////////////CREATE ACTIVITY LOG//////////////
                    $type_data = [
                        'user_id' => $myid,
                        'action' => 'New contact type (<b>#' . strip_tags($this->request->getVar('contact_type')) . '</b>) added.',
                        'ip' => get_client_ip(),
                        'mac' => GetMAC(),
                        'created_at' => now_time($myid),
                        'updated_at' => now_time($myid),
                        'company_id' => company($myid),
                    ];

                    add_log($type_data);
                    ////////////////////////END ACTIVITY LOG/////////////////
                    session()->setFlashdata('sucmsg', 'Saved!');
                    return redirect()->to(base_url('settings/crm_configurations'));
                } else {
                    session()->setFlashdata('failmsg', 'Failed to save!');
                    return redirect()->to(base_url('settings/crm_configurations'));
                }
            }

            if (isset($_POST['edit_type'])) {
                $ct_data = [
                    'contact_type' => strip_tags($this->request->getVar('contact_type')),

                ];

                if ($ContactType->update(strip_tags($this->request->getVar('type_id')), $ct_data)) {
                    ////////////////////////CREATE ACTIVITY LOG//////////////
                    $type_data = [
                        'user_id' => $myid,
                        'action' => 'Contact Type(#' . strip_tags($this->request->getVar('type_id')) . ') <b>' . strip_tags($this->request->getVar('contact_type')) . '</b> is updated.',
                        'ip' => get_client_ip(),
                        'mac' => GetMAC(),
                        'created_at' => now_time($myid),
                        'updated_at' => now_time($myid),
                        'company_id' => company($myid),
                    ];

                    add_log($type_data);
                    ////////////////////////END ACTIVITY LOG/////////////////
                    session()->setFlashdata('sucmsg', 'Saved!');
                    return redirect()->to(base_url('settings/crm_configurations'));
                } else {
                    session()->setFlashdata('failmsg', 'Failed to save!');
                    return redirect()->to(base_url('settings/crm_configurations'));
                }
            }




            if (isset($_POST['save_project_type'])) {
                $pt_data = [
                    'company_id' => company($myid),
                    'project_type' => strip_tags($this->request->getVar('project_type')),
                ];


                if ($ProjectType->save($pt_data)) {
                    ////////////////////////CREATE ACTIVITY LOG//////////////
                    $projecttype_data = [
                        'user_id' => $myid,
                        'action' => 'New project type (<b>#' . strip_tags($this->request->getVar('project_type')) . '</b>) is added.',
                        'ip' => get_client_ip(),
                        'mac' => GetMAC(),
                        'created_at' => now_time($myid),
                        'updated_at' => now_time($myid),
                        'company_id' => company($myid),
                    ];

                    add_log($projecttype_data);
                    ////////////////////////END ACTIVITY LOG/////////////////
                    session()->setFlashdata('sucmsg', 'Saved!');
                    return redirect()->to(base_url('settings/crm_configurations'));
                } else {
                    session()->setFlashdata('failmsg', 'Failed to save!');
                    return redirect()->to(base_url('settings/crm_configurations'));
                }
            }



            if (isset($_POST['edit_project_type'])) {
                $pted_data = [
                    'project_type' => strip_tags($this->request->getVar('project_type')),
                ];


                if ($ProjectType->update(strip_tags($this->request->getVar('project_type_id')), $pted_data)) {
                    ////////////////////////CREATE ACTIVITY LOG//////////////
                    $ptcategory_data = [
                        'user_id' => $myid,
                        'action' => 'Project type (#' . strip_tags($this->request->getVar('project_type_id')) . ') <b>' . strip_tags($this->request->getVar('project_type')) . '</b> is updated.',
                        'ip' => get_client_ip(),
                        'mac' => GetMAC(),
                        'created_at' => now_time($myid),
                        'updated_at' => now_time($myid),
                        'company_id' => company($myid),
                    ];

                    add_log($ptcategory_data);
                    ////////////////////////END ACTIVITY LOG/////////////////
                    session()->setFlashdata('sucmsg', 'Saved!');
                    return redirect()->to(base_url('settings/crm_configurations'));
                } else {
                    session()->setFlashdata('failmsg', 'Failed to save!');
                    return redirect()->to(base_url('settings/crm_configurations'));
                }
            }
        } else {
            return redirect()->to(base_url('users/login'));
        }
    }




    public function delete_reason($taxval = "")
    {

        $session = session();

        $LossReasons = new LossReasons;
        $myid = session()->get('id');
        $con = array(
            'id' => session()->get('id')
        );

        $reason_name = $LossReasons->where('id', $taxval)->first();
        $deledata = [
            'deleted' => 1
        ];
        $del = $LossReasons->update($taxval, $deledata);

        if ($del) {
            ////////////////////////CREATE ACTIVITY LOG//////////////
            $log_data = [
                'user_id' => $myid,
                'action' => 'Loss reason (#' . $taxval . ') <b>' . $reason_name['reason'] . '</b> is deleted.',
                'ip' => get_client_ip(),
                'mac' => GetMAC(),
                'created_at' => now_time($myid),
                'updated_at' => now_time($myid),
                'company_id' => company($myid),
            ];

            add_log($log_data);
            ////////////////////////END ACTIVITY LOG/////////////////
            $session->setFlashdata('sucmsg', 'Deleted!');
            return redirect()->to(base_url('settings/crm_configurations'));
        } else {
            $session->setFlashdata('failmsg', 'Failed to delete!');
            return redirect()->to(base_url('settings/crm_configurations'));
        }
    }


    public function delete_work_category($wcid = "")
    {
        $WorkcategoryModel = new WorkcategoryModel();

        $session = session();

        $myid = session()->get('id');
        $con = array(
            'id' => session()->get('id')
        );

        $deledata = [
            'deleted' => 1
        ];


        if ($WorkcategoryModel->update($wcid, $deledata)) {

            $session->setFlashdata('pu_msg', 'Deleted!');
            return redirect()->to(base_url('settings/crm_configurations'));
        } else {
            $session->setFlashdata('pu_er_msg', 'Failed to delete!');
            return redirect()->to(base_url('settings/crm_configurations'));
        }
    }

    public function delete_designation($cid = "")
    {

        $session = session();

        $Designation = new Designation;
        $myid = session()->get('id');
        $con = array(
            'id' => session()->get('id')
        );

        $designation = $Designation->where('id', $cid)->first();
        $deledata = [
            'deleted' => 1
        ];
        $del = $Designation->update($cid, $deledata);

        if ($del) {
            ////////////////////////CREATE ACTIVITY LOG//////////////
            $log_data = [
                'user_id' => $myid,
                'action' => 'Contact Category (#' . $cid . ') <b>' . $designation['designation'] . '</b> is deleted.',
                'ip' => get_client_ip(),
                'mac' => GetMAC(),
                'created_at' => now_time($myid),
                'updated_at' => now_time($myid),
                'company_id' => company($myid),
            ];

            add_log($log_data);
            ////////////////////////END ACTIVITY LOG/////////////////
            $session->setFlashdata('sucmsg', 'Deleted!');
            return redirect()->to(base_url('settings/crm_configurations'));
        } else {
            $session->setFlashdata('failmsg', 'Failed to delete!');
            return redirect()->to(base_url('settings/crm_configurations'));
        }
    }

    public function delete_project_type($cid = "")
    {

        $session = session();

        $ProjectType = new ProjectType;
        $myid = session()->get('id');
        $con = array(
            'id' => session()->get('id')
        );

        $designation = $ProjectType->where('id', $cid)->first();
        $deledata = [
            'deleted' => 1
        ];
        $del = $ProjectType->update($cid, $deledata);

        if ($del) {
            ////////////////////////CREATE ACTIVITY LOG//////////////
            $log_data = [
                'user_id' => $myid,
                'action' => 'Contact Category (#' . $cid . ') <b>' . $designation['project_type'] . '</b> is deleted.',
                'ip' => get_client_ip(),
                'mac' => GetMAC(),
                'created_at' => now_time($myid),
                'updated_at' => now_time($myid),
                'company_id' => company($myid),
            ];

            add_log($log_data);
            ////////////////////////END ACTIVITY LOG/////////////////
            $session->setFlashdata('sucmsg', 'Deleted!');
            return redirect()->to(base_url('settings/crm_configurations'));
        } else {
            $session->setFlashdata('failmsg', 'Failed to delete!');
            return redirect()->to(base_url('settings/crm_configurations'));
        }
    }




    public function delete_contacttype($ctype = "")
    {

        $session = session();

        $ContactType = new ContactType;
        $myid = session()->get('id');
        $con = array(
            'id' => session()->get('id')
        );

        $contact_type = $ContactType->where('id', $ctype)->first();
        $deledata = [
            'deleted' => 1
        ];
        $del = $ContactType->update($ctype, $deledata);

        if ($del) {
            ////////////////////////CREATE ACTIVITY LOG//////////////
            $log_data = [
                'user_id' => $myid,
                'action' => 'Contact type (#' . $ctype . ') <b>' . $contact_type['contact_type'] . '</b> is deleted.',
                'ip' => get_client_ip(),
                'mac' => GetMAC(),
                'created_at' => now_time($myid),
                'updated_at' => now_time($myid),
                'company_id' => company($myid),
            ];

            add_log($log_data);
            ////////////////////////END ACTIVITY LOG/////////////////
            $session->setFlashdata('sucmsg', 'Deleted!');
            return redirect()->to(base_url('settings/crm_configurations'));
        } else {
            $session->setFlashdata('failmsg', 'Failed to delete!');
            return redirect()->to(base_url('settings/crm_configurations'));
        }
    }








    public function prefixes()
    {
        $session = session();

        if ($session->has('isLoggedIn')) {

            $CompanySettings = new CompanySettings;
            $UserModel = new UserModel;


            $myid = session()->get('id');
            $con = array(
                'id' => session()->get('id')
            );

            $user = $UserModel->where('id', $myid)->first();

            if (app_status(company($myid)) == 0) {
                return redirect()->to(base_url('app_error'));
            }

            if (user_data(session()->get('id'), 'activated_financial_year') < 1) {
                return redirect()->to(base_url('settings/financial_years'));
            }

            if (check_permission($myid, 'manage_settings') == true || usertype($myid) == 'admin') {
            } else {
                return redirect()->to(base_url());
            }

            $cquery = $CompanySettings->where('company_id', company($myid))->first();


            $data = [
                'title' => 'SpriteGenix ERP- Prefix settings',
                'user' => $user,
                'c_set' => $cquery
            ];

            echo view('header', $data);
            echo view('settings/prefixes', $data);
            echo view('footer');


            if (isset($_POST['save_pre_set'])) {


                $ac_data = [
                    'invoice_prefix' => strip_tags($this->request->getVar('invoice_prefix')),
                    'sales_prefix' => strip_tags($this->request->getVar('sales_prefix')),
                    'sales_order_prefix' => strip_tags($this->request->getVar('sales_order_prefix')),
                    'sales_quotation_prefix' => strip_tags($this->request->getVar('sales_quotation_prefix')),
                    'sales_return_prefix' => strip_tags($this->request->getVar('sales_return_prefix')),
                    'sales_delivery_prefix' => strip_tags($this->request->getVar('sales_delivery_prefix')),
                    'purchase_order_prefix' => strip_tags($this->request->getVar('purchase_order_prefix')),
                    'purchase_quotation_prefix' => strip_tags($this->request->getVar('purchase_quotation_prefix')),
                    'purchase_return_prefix' => strip_tags($this->request->getVar('purchase_return_prefix')),
                    'purchase_delivery_prefix' => strip_tags($this->request->getVar('purchase_delivery_prefix')),
                    'purchase_prefix' => strip_tags($this->request->getVar('purchase_prefix')),
                    'challan_prefix' => strip_tags($this->request->getVar('challan_prefix')),
                    'payment_prefix' => strip_tags($this->request->getVar('payment_prefix')),
                    'proforma_invoice_prefix' => strip_tags($this->request->getVar('proforma_invoice_prefix')),
                ];

                $update_user = $CompanySettings->update(get_setting(company($myid), 'id'), $ac_data);

                if ($update_user) {
                    ////////////////////////CREATE ACTIVITY LOG//////////////
                    $log_data = [
                        'user_id' => $myid,
                        'action' => 'Company/branch (#' . company($myid) . ') <b>' . my_company_name(company($myid)) . '</b> prefixes changed.',
                        'ip' => get_client_ip(),
                        'mac' => GetMAC(),
                        'created_at' => now_time($myid),
                        'updated_at' => now_time($myid),
                        'company_id' => company($myid),
                    ];

                    add_log($log_data);
                    ////////////////////////END ACTIVITY LOG/////////////////
                    session()->setFlashdata('pu_msg', 'Saved!');
                    return redirect()->to(base_url('settings/prefixes'));
                } else {
                    session()->setFlashdata('pu_er_msg', 'Failed to save!');
                    return redirect()->to(base_url('settings/prefixes'));
                }
            }
        } else {
            return redirect()->to(base_url('users/login'));
        }
    }




    public function payment()
    {

        $session = session();
        if ($session->has('isLoggedIn')) {

            $CompanySettings = new CompanySettings;
            $UserModel = new UserModel;


            $myid = session()->get('id');
            $con = array(
                'id' => session()->get('id')
            );

            $user = $UserModel->where('id', $myid)->first();



            if (app_status(company($myid)) == 0) {
                return redirect()->to(base_url('app_error'));
            }

            if (user_data(session()->get('id'), 'activated_financial_year') < 1) {
                return redirect()->to(base_url('settings/financial_years'));
            }

            if (check_permission($myid, 'manage_settings') == true || usertype($myid) == 'admin') {
            } else {
                return redirect()->to(base_url());
            }

            $cquery = $CompanySettings->where('company_id', company($myid))->first();


            $data = [
                'title' => 'SpriteGenix ERP- Payment settings',
                'user' => $user,
                'c_set' => $cquery
            ];

            echo view('header', $data);
            echo view('settings/payment', $data);
            echo view('footer');


            if (isset($_POST['save_payment_setting'])) {


                $ac_data = [
                    'payment_prefix' => strip_tags($this->request->getVar('payment_prefix')),
                    'payment_auto_archive' => strip_tags($this->request->getVar('payment_auto_archive')),
                    'payment_color' => strip_tags($this->request->getVar('payment_color')),
                    'payment_footer' => strip_tags($this->request->getVar('payment_footer')),
                ];

                $update_user = $CompanySettings->update(get_setting(company($myid), 'id'), $ac_data);

                if ($update_user) {
                    ////////////////////////CREATE ACTIVITY LOG//////////////
                    $log_data = [
                        'user_id' => $myid,
                        'action' => 'Company/branch (#' . company($myid) . ') <b>' . my_company_name(company($myid)) . '</b> payment settings updated.',
                        'ip' => get_client_ip(),
                        'mac' => GetMAC(),
                        'created_at' => now_time($myid),
                        'updated_at' => now_time($myid),
                        'company_id' => company($myid),
                    ];

                    add_log($log_data);
                    ////////////////////////END ACTIVITY LOG/////////////////
                    session()->setFlashdata('sucmsg', 'Saved!');
                    return redirect()->to(base_url('settings/payment'));
                } else {
                    $session()->setFlashdata('failmsg', 'Failed to save!');
                    return redirect()->to(base_url('settings/payment'));
                }
            }
        } else {
            return redirect()->to(base_url('users/login'));
        }
    }




    public function product()
    {

        $session = session();

        if ($session->has('isLoggedIn')) {

            $CompanySettings = new CompanySettings;
            $UserModel = new UserModel;
            $UserModel = new UserModel();
            $ProductUnits = new ProductUnits();
            $ProductCategories = new ProductCategories();
            $ProductSubCategories = new ProductSubCategories();
            $SecondaryCategories = new SecondaryCategories();
            $ProductBrand = new ProductBrand();
            $ProductSubUnit = new ProductSubUnit();



            $myid = session()->get('id');
            $con = array(
                'id' => session()->get('id')
            );

            $user = $UserModel->where('id', $myid)->first();

            if (app_status(company($myid)) == 0) {
                return redirect()->to(base_url('app_error'));
            }

            if (user_data(session()->get('id'), 'activated_financial_year') < 1) {
                return redirect()->to(base_url('settings/financial_years'));
            }

            if (check_permission($myid, 'manage_settings') == true || usertype($myid) == 'admin') {
            } else {
                return redirect()->to(base_url());
            }


            $cquery = $CompanySettings->where('company_id', company($myid))->first();
            $puqry = $ProductUnits->where('company_id', company($myid))->where('deleted', 0)->findAll();
            $pcuqry = $ProductCategories->where('company_id', company($myid))->where('deleted', 0)->findAll();

            $psubcuqry = $ProductSubCategories->where('company_id', company($myid))->where('deleted', 0)->findAll();

            $pseccuqry = $SecondaryCategories->where('company_id', company($myid))->where('deleted', 0)->findAll();

            $pbrandcuqry = $ProductBrand->where('company_id', company($myid))->where('deleted', 0)->findAll();

            $data = [
                'title' => 'SpriteGenix ERP- Product settings',
                'user' => $user,
                'c_set' => $cquery,
                'p_units' => $puqry,
                'p_cate' => $pcuqry,
                'psub_cate' => $psubcuqry,
                'psec_cate' => $pseccuqry,
                'p_brand' => $pbrandcuqry
            ];


            echo view('header', $data);
            echo view('settings/product', $data);
            echo view('footer');



            if ($this->request->getMethod() == 'post') {

                // Product Unit CRUD

                if (isset($_POST['add_p_unit'])) {

                    if (isset($_POST['set_as_default_pu'])) {
                        $setaspu = 1;

                        $uspunit = $ProductUnits->where('company_id', company($myid))->orderBy('id', 'desc')->findAll();
                        foreach ($uspunit as $uni) {

                            $pnit_d = ['check_default' => 0];
                            $ProductUnits->update($uni['id'], $pnit_d);
                        }
                    } else {
                        $setaspu = 0;
                    }


                    $pu_data = [
                        'company_id' => company($myid),
                        'name' => strip_tags(trim($this->request->getVar('unit_name'))),
                        'check_default' => $setaspu,
                    ];

                    if ($ProductUnits->save($pu_data)) {

                        ////////////////////////CREATE ACTIVITY LOG//////////////
                        $log_data = [
                            'user_id' => $myid,
                            'action' => 'New product unit("<b>' . strip_tags(trim($this->request->getVar('unit_name'))) . '</b>") added.',
                            'ip' => get_client_ip(),
                            'mac' => GetMAC(),
                            'created_at' => now_time($myid),
                            'updated_at' => now_time($myid),
                            'company_id' => company($myid),
                        ];

                        add_log($log_data);
                        ////////////////////////END ACTIVITY LOG/////////////////
                        $session->setFlashdata('pu_msg', 'Saved!');
                        return redirect()->to(base_url('settings/product'));
                    } else {
                        $session->setFlashdata('pu_er_msg', 'Failed to save!');
                        return redirect()->to(base_url('settings/product'));
                    }
                }



                if (isset($_POST['add_p_subunit'])) {
                    $pcu_data = [
                        'company_id' => company($myid),
                        'parent_id' => strip_tags($this->request->getVar('parent_unit')),
                        'sub_unit_name' => strip_tags($this->request->getVar('psubunit_name')),
                        'slug' => cat_title_to_slug($this->request->getVar('psubunit_name'))
                    ];

                    if ($ProductSubUnit->save($pcu_data)) {
                        ////////////////////////CREATE ACTIVITY LOG//////////////
                        $log_data = [
                            'user_id' => $myid,
                            'action' => 'New product sub unit ("' . name_of_unit(strip_tags($this->request->getVar('parent_unit'))) . '-><b>' . strip_tags(trim($this->request->getVar('psubunit_name'))) . '</b>") added.',
                            'ip' => get_client_ip(),
                            'mac' => GetMAC(),
                            'created_at' => now_time($myid),
                            'updated_at' => now_time($myid),
                            'company_id' => company($myid),
                        ];

                        add_log($log_data);
                        ////////////////////////END ACTIVITY LOG/////////////////
                        $session->setFlashdata('pu_msg', 'Saved!');
                        return redirect()->to(base_url('settings/product'));
                    } else {
                        $session->setFlashdata('pu_er_msg', 'Failed to save!');
                        return redirect()->to(base_url('settings/product'));
                    }
                }


                if (isset($_POST['edit_p_subunit'])) {
                    $edpu_data = [
                        'parent_id' => strip_tags($this->request->getVar('parent_unit')),
                        'sub_unit_name' => strip_tags($this->request->getVar('psubunit_name')),
                        'slug' => cat_title_to_slug($this->request->getVar('psubunit_name'))
                    ];

                    if ($ProductSubUnit->update($this->request->getVar('sui'), $edpu_data)) {
                        ////////////////////////CREATE ACTIVITY LOG//////////////
                        $log_data = [
                            'user_id' => $myid,
                            'action' => 'Product sub unit (#' . $this->request->getVar('sui') . ') ' . name_of_unit(strip_tags($this->request->getVar('parent_unit'))) . '-><b>' . strip_tags(trim($this->request->getVar('psubunit_name'))) . '</b> is updated.',
                            'ip' => get_client_ip(),
                            'mac' => GetMAC(),
                            'created_at' => now_time($myid),
                            'updated_at' => now_time($myid),
                            'company_id' => company($myid),
                        ];

                        add_log($log_data);
                        ////////////////////////END ACTIVITY LOG/////////////////
                        $session->setFlashdata('pu_msg', 'Saved!');
                        return redirect()->to(base_url('settings/product'));
                    } else {
                        $session->setFlashdata('pu_er_msg', 'Failed to save!');
                        return redirect()->to(base_url('settings/product'));
                    }
                }



                if (isset($_POST['add_p_cate'])) {
                    $pc_data = [
                        'company_id' => company($myid),
                        'cat_name' => strip_tags(trim($this->request->getVar('pcate_name'))),
                        'cat_department' => strip_tags(trim($this->request->getVar('cat_department'))),
                        'slug' => cat_title_to_slug(strip_tags(trim($this->request->getVar('pcate_name'))))
                    ];

                    if ($ProductCategories->save($pc_data)) {
                        ////////////////////////CREATE ACTIVITY LOG//////////////
                        $log_data = [
                            'user_id' => $myid,
                            'action' => 'New product category ("<b>' . strip_tags(trim($this->request->getVar('pcate_name'))) . '</b>") added.',
                            'ip' => get_client_ip(),
                            'mac' => GetMAC(),
                            'created_at' => now_time($myid),
                            'updated_at' => now_time($myid),
                            'company_id' => company($myid),
                        ];

                        add_log($log_data);
                        ////////////////////////END ACTIVITY LOG/////////////////

                        $session->setFlashdata('pu_msg', 'Saved!');
                        return redirect()->to(base_url('settings/product'));
                    } else {
                        $session->setFlashdata('pu_er_msg', 'Failed to save!');
                        return redirect()->to(base_url('settings/product'));
                    }
                }

                if (isset($_POST['add_p_subcate'])) {
                    $pc_data = [
                        'company_id' => company($myid),
                        'parent_id' => strip_tags($this->request->getVar('parent_category')),
                        'sub_cat_name' => strip_tags($this->request->getVar('psubcate_name')),
                        'slug' => cat_title_to_slug($this->request->getVar('psubcate_name'))
                    ];

                    if ($ProductSubCategories->save($pc_data)) {
                        ////////////////////////CREATE ACTIVITY LOG//////////////
                        $log_data = [
                            'user_id' => $myid,
                            'action' => 'New product sub category ("' . name_of_category(strip_tags($this->request->getVar('parent_category'))) . '-><b>' . strip_tags(trim($this->request->getVar('psubcate_name'))) . '</b>") added.',
                            'ip' => get_client_ip(),
                            'mac' => GetMAC(),
                            'created_at' => now_time($myid),
                            'updated_at' => now_time($myid),
                            'company_id' => company($myid),
                        ];

                        add_log($log_data);
                        ////////////////////////END ACTIVITY LOG/////////////////
                        $session->setFlashdata('pu_msg', 'Saved!');
                        return redirect()->to(base_url('settings/product'));
                    } else {
                        $session->setFlashdata('pu_er_msg', 'Failed to save!');
                        return redirect()->to(base_url('settings/product'));
                    }
                }

                if (isset($_POST['add_p_seccate'])) {
                    $pc_data = [
                        'company_id' => company($myid),
                        'parent_id' => strip_tags($this->request->getVar('parent_category')),
                        'second_cat_name' => strip_tags($this->request->getVar('pseccate_name')),
                        'slug' => cat_title_to_slug($this->request->getVar('pseccate_name'))
                    ];


                    if ($SecondaryCategories->save($pc_data)) {
                        ////////////////////////CREATE ACTIVITY LOG//////////////
                        $log_data = [
                            'user_id' => $myid,
                            'action' => 'New product secondary category ("' . name_of_sub_category(strip_tags($this->request->getVar('parent_category'))) . '-><b>' . strip_tags(trim($this->request->getVar('pseccate_name'))) . '</b>") added.',
                            'ip' => get_client_ip(),
                            'mac' => GetMAC(),
                            'created_at' => now_time($myid),
                            'updated_at' => now_time($myid),
                            'company_id' => company($myid),
                        ];

                        add_log($log_data);
                        ////////////////////////END ACTIVITY LOG/////////////////

                        $session->setFlashdata('pu_msg', 'Saved!');
                        return redirect()->to(base_url('settings/product'));
                    } else {
                        $session->setFlashdata('pu_er_msg', 'Failed to save!');
                        return redirect()->to(base_url('settings/product'));
                    }
                }


                if (isset($_POST['add_p_brand'])) {
                    $pc_data = [
                        'company_id' => company($myid),
                        'brand_name' => strip_tags($this->request->getVar('pbrand_name')),
                        'slug' => cat_title_to_slug($this->request->getVar('pbrand_name'))
                    ];


                    if ($ProductBrand->save($pc_data)) {
                        ////////////////////////CREATE ACTIVITY LOG//////////////
                        $log_data = [
                            'user_id' => $myid,
                            'action' => 'New product brand ("<b>' . strip_tags(trim($this->request->getVar('pbrand_name'))) . '</b>") added.',
                            'ip' => get_client_ip(),
                            'mac' => GetMAC(),
                            'created_at' => now_time($myid),
                            'updated_at' => now_time($myid),
                            'company_id' => company($myid),
                        ];

                        add_log($log_data);
                        ////////////////////////END ACTIVITY LOG/////////////////

                        $session->setFlashdata('pu_msg', 'Saved!');
                        return redirect()->to(base_url('settings/product'));
                    } else {
                        $session->setFlashdata('pu_er_msg', 'Failed to save!');
                        return redirect()->to(base_url('settings/product'));
                    }
                }

                if (isset($_POST['edit_p_brand'])) {
                    $edpu_data = [
                        'brand_name' => strip_tags($this->request->getVar('pbrand_name')),
                        'slug' => cat_title_to_slug($this->request->getVar('pbrand_name'))
                    ];

                    if ($ProductBrand->update($this->request->getVar('pr'), $edpu_data)) {
                        ////////////////////////CREATE ACTIVITY LOG//////////////
                        $log_data = [
                            'user_id' => $myid,
                            'action' => 'Product brand (#' . $this->request->getVar('pr') . ') <b>' . strip_tags(trim($this->request->getVar('pbrand_name'))) . '</b> is updated.',
                            'ip' => get_client_ip(),
                            'mac' => GetMAC(),
                            'created_at' => now_time($myid),
                            'updated_at' => now_time($myid),
                            'company_id' => company($myid),
                        ];

                        add_log($log_data);
                        ////////////////////////END ACTIVITY LOG/////////////////
                        $session->setFlashdata('pu_msg', 'Saved!');
                        return redirect()->to(base_url('settings/product'));
                    } else {
                        $session->setFlashdata('pu_er_msg', 'Failed to save!');
                        return redirect()->to(base_url('settings/product'));
                    }
                }



                if (isset($_POST['edit_p_seccate'])) {
                    $edpu_data = [
                        'parent_id' => strip_tags($this->request->getVar('parent_category')),
                        'second_cat_name' => strip_tags($this->request->getVar('pseccate_name')),
                        'slug' => cat_title_to_slug($this->request->getVar('pseccate_name'))
                    ];

                    if ($SecondaryCategories->update($this->request->getVar('si'), $edpu_data)) {
                        ////////////////////////CREATE ACTIVITY LOG//////////////
                        $log_data = [
                            'user_id' => $myid,
                            'action' => 'Product secondary category (#' . $this->request->getVar('si') . ') ' . name_of_sub_category(strip_tags($this->request->getVar('parent_category'))) . '-><b>' . strip_tags(trim($this->request->getVar('pseccate_name'))) . '</b> is updated.',
                            'ip' => get_client_ip(),
                            'mac' => GetMAC(),
                            'created_at' => now_time($myid),
                            'updated_at' => now_time($myid),
                            'company_id' => company($myid),
                        ];

                        add_log($log_data);
                        ////////////////////////END ACTIVITY LOG/////////////////
                        $session->setFlashdata('pu_msg', 'Saved!');
                        return redirect()->to(base_url('settings/product'));
                    } else {
                        $session->setFlashdata('pu_er_msg', 'Failed to save!');
                        return redirect()->to(base_url('settings/product'));
                    }
                }



                if (isset($_POST['edit_p_subcate'])) {
                    $edpu_data = [
                        'parent_id' => strip_tags($this->request->getVar('parent_category')),
                        'sub_cat_name' => strip_tags($this->request->getVar('psubcate_name')),
                        'slug' => cat_title_to_slug($this->request->getVar('psubcate_name'))
                    ];

                    if ($ProductSubCategories->update($this->request->getVar('si'), $edpu_data)) {
                        ////////////////////////CREATE ACTIVITY LOG//////////////
                        $log_data = [
                            'user_id' => $myid,
                            'action' => 'Product sub category (#' . $this->request->getVar('si') . ') ' . name_of_category(strip_tags($this->request->getVar('parent_category'))) . '-><b>' . strip_tags(trim($this->request->getVar('psubcate_name'))) . '</b> is updated.',
                            'ip' => get_client_ip(),
                            'mac' => GetMAC(),
                            'created_at' => now_time($myid),
                            'updated_at' => now_time($myid),
                            'company_id' => company($myid),
                        ];

                        add_log($log_data);
                        ////////////////////////END ACTIVITY LOG/////////////////
                        $session->setFlashdata('pu_msg', 'Saved!');
                        return redirect()->to(base_url('settings/product'));
                    } else {
                        $session->setFlashdata('pu_er_msg', 'Failed to save!');
                        return redirect()->to(base_url('settings/product'));
                    }
                }





                if (isset($_POST['edit_p_unit'])) {

                    if (isset($_POST['set_as_default_pu'])) {
                        $setaspu = 1;

                        $uspunit = $ProductUnits->where('company_id', company($myid))->orderBy('id', 'desc')->findAll();
                        foreach ($uspunit as $uni) {

                            $pnit_d = ['check_default' => 0];
                            $ProductUnits->update($uni['id'], $pnit_d);
                        }
                    } else {
                        $setaspu = 0;
                    }

                    $edpu_data = [
                        'name' => strip_tags(trim($this->request->getVar('unit_name'))),
                        'check_default' => $setaspu,
                    ];

                    if ($ProductUnits->update($this->request->getVar('ci'), $edpu_data)) {
                        ////////////////////////CREATE ACTIVITY LOG//////////////
                        $log_data = [
                            'user_id' => $myid,
                            'action' => 'Product unit (#' . $this->request->getVar('ci') . ') <b>' . strip_tags(trim($this->request->getVar('unit_name'))) . '</b> is updated.',
                            'ip' => get_client_ip(),
                            'mac' => GetMAC(),
                            'created_at' => now_time($myid),
                            'updated_at' => now_time($myid),
                            'company_id' => company($myid),
                        ];

                        add_log($log_data);
                        ////////////////////////END ACTIVITY LOG/////////////////

                        $session->setFlashdata('pu_msg', 'Saved!');
                        return redirect()->to(base_url('settings/product'));
                    } else {
                        $session->setFlashdata('pu_er_msg', 'Failed to save!');
                        return redirect()->to(base_url('settings/product'));
                    }
                }

                if (isset($_POST['edit_p_cate'])) {
                    $edpu_data = [
                        'cat_name' => strip_tags(trim($this->request->getVar('pcate_name'))),
                        'slug' => cat_title_to_slug(strip_tags(trim($this->request->getVar('pcate_name'))))
                    ];

                    if ($ProductCategories->update($this->request->getVar('ci'), $edpu_data)) {

                        ////////////////////////CREATE ACTIVITY LOG//////////////
                        $log_data = [
                            'user_id' => $myid,
                            'action' => 'Product category (#' . $this->request->getVar('ci') . ') <b>' . strip_tags(trim($this->request->getVar('pcate_name'))) . '</b> is updated.',
                            'ip' => get_client_ip(),
                            'mac' => GetMAC(),
                            'created_at' => now_time($myid),
                            'updated_at' => now_time($myid),
                            'company_id' => company($myid),
                        ];

                        add_log($log_data);
                        ////////////////////////END ACTIVITY LOG/////////////////

                        $session->setFlashdata('pu_msg', 'Saved!');
                        return redirect()->to(base_url('settings/product'));
                    } else {
                        $session->setFlashdata('pu_er_msg', 'Failed to save!');
                        return redirect()->to(base_url('settings/product'));
                    }
                }


                if (isset($_POST['save_additional_settings'])) {

                    $ac_data = [
                        'items_kit_show' => $this->request->getVar('items_kit_show'),
                        'stock_enable' => $this->request->getVar('stock_enable'),
                        'results_per_page' => $this->request->getVar('results_per_page'),
                        'delivery_days' => $this->request->getVar('delivery_days'),
                        'display_price' => $this->request->getVar('display_price'),
                    ];

                    $update_user = $CompanySettings->update(get_setting(company($myid), 'id'), $ac_data);

                    if ($update_user) {
                        ////////////////////////CREATE ACTIVITY LOG//////////////
                        $log_data = [
                            'user_id' => $myid,
                            'action' => 'Products additional settings updated.',
                            'ip' => get_client_ip(),
                            'mac' => GetMAC(),
                            'created_at' => now_time($myid),
                            'updated_at' => now_time($myid),
                            'company_id' => company($myid),
                        ];

                        add_log($log_data);
                        ////////////////////////END ACTIVITY LOG/////////////////
                        $session->setFlashdata('pu_msg', 'Saved!');
                        return redirect()->to(base_url('settings/product'));
                    } else {
                        $session->setFlashdata('pu_er_msg', 'Failed to save!');
                        return redirect()->to(base_url('settings/product'));
                    }
                }
            }
        } else {
            return redirect()->to(base_url('users/login'));
        }
    }



    public function delete_product_unit($proval = "")
    {
        $ProductUnits = new ProductUnits();

        $session = session();

        $myid = session()->get('id');
        $con = array(
            'id' => session()->get('id')
        );

        $unit_name = $ProductUnits->where('id', $proval)->first();
        $deledata = [
            'deleted' => 1
        ];


        if ($ProductUnits->update($proval, $deledata)) {
            ////////////////////////CREATE ACTIVITY LOG//////////////
            $log_data = [
                'user_id' => $myid,
                'action' => 'Product unit (#' . $proval . ') <b>' . $unit_name['name'] . '</b> is deleted.',
                'ip' => get_client_ip(),
                'mac' => GetMAC(),
                'created_at' => now_time($myid),
                'updated_at' => now_time($myid),
                'company_id' => company($myid),
            ];

            add_log($log_data);
            ////////////////////////END ACTIVITY LOG/////////////////

            $session->setFlashdata('pu_msg', 'Deleted!');
            return redirect()->to(base_url('settings/product'));
        } else {
            $session->setFlashdata('pu_er_msg', 'Failed to delete!');
            return redirect()->to(base_url('settings/product'));
        }
    }


    public function delete_product_subunit($proval = "")
    {
        $ProductSubUnit = new ProductSubUnit();

        $session = session();

        $myid = session()->get('id');
        $con = array(
            'id' => session()->get('id')
        );


        $sub_unit_name = $ProductSubUnit->where('id', $proval)->first();
        $deledata = [
            'deleted' => 1
        ];


        if ($ProductSubUnit->update($proval, $deledata)) {

            ////////////////////////CREATE ACTIVITY LOG//////////////
            $log_data = [
                'user_id' => $myid,
                'action' => 'Product sub unit (#' . $proval . ') ' . name_of_unit($sub_unit_name['parent_id']) . '-><b>' . $sub_unit_name['sub_unit_name'] . '</b> is deleted.',
                'ip' => get_client_ip(),
                'mac' => GetMAC(),
                'created_at' => now_time($myid),
                'updated_at' => now_time($myid),
                'company_id' => company($myid),
            ];

            add_log($log_data);
            ////////////////////////END ACTIVITY LOG/////////////////


            $session->setFlashdata('pu_msg', 'Deleted!');
            return redirect()->to(base_url('settings/product'));
        } else {
            $session->setFlashdata('pu_er_msg', 'Failed to delete!');
            return redirect()->to(base_url('settings/product'));
        }
    }

    public function delete_product_cat($proval = "")
    {
        $ProductCategories = new ProductCategories();

        $session = session();

        $myid = session()->get('id');
        $con = array(
            'id' => session()->get('id')
        );

        $cate_name = $ProductCategories->where('id', $proval)->first();
        $deledata = [
            'deleted' => 1
        ];

        if ($ProductCategories->update($proval, $deledata)) {

            ////////////////////////CREATE ACTIVITY LOG//////////////
            $log_data = [
                'user_id' => $myid,
                'action' => 'Product category (#' . $proval . ') <b>' . $cate_name['cat_name'] . '</b> is deleted.',
                'ip' => get_client_ip(),
                'mac' => GetMAC(),
                'created_at' => now_time($myid),
                'updated_at' => now_time($myid),
                'company_id' => company($myid),
            ];

            add_log($log_data);
            ////////////////////////END ACTIVITY LOG/////////////////

            $session->setFlashdata('pu_msg', 'Deleted!');
            return redirect()->to(base_url('settings/product'));
        } else {
            $session->setFlashdata('pu_er_msg', 'Failed to delete!');
            return redirect()->to(base_url('settings/product'));
        }
    }

    public function delete_product_subcat($proval = "")
    {
        $ProductSubCategories = new ProductSubCategories();

        $session = session();

        $myid = session()->get('id');
        $con = array(
            'id' => session()->get('id')
        );


        $sub_cate_name = $ProductSubCategories->where('id', $proval)->first();
        $deledata = [
            'deleted' => 1
        ];


        if ($ProductSubCategories->update($proval, $deledata)) {

            ////////////////////////CREATE ACTIVITY LOG//////////////
            $log_data = [
                'user_id' => $myid,
                'action' => 'Product sub category (#' . $proval . ') ' . name_of_category($sub_cate_name['parent_id']) . '-><b>' . $sub_cate_name['sub_cat_name'] . '</b> is deleted.',
                'ip' => get_client_ip(),
                'mac' => GetMAC(),
                'created_at' => now_time($myid),
                'updated_at' => now_time($myid),
                'company_id' => company($myid),
            ];

            add_log($log_data);
            ////////////////////////END ACTIVITY LOG/////////////////


            $session->setFlashdata('pu_msg', 'Deleted!');
            return redirect()->to(base_url('settings/product'));
        } else {
            $session->setFlashdata('pu_er_msg', 'Failed to delete!');
            return redirect()->to(base_url('settings/product'));
        }
    }

    public function delete_product_seccat($proval = "")
    {
        $SecondaryCategories = new SecondaryCategories();

        $session = session();

        $myid = session()->get('id');
        $con = array(
            'id' => session()->get('id')
        );

        $sec_cate_name = $SecondaryCategories->where('id', $proval)->first();
        $deledata = [
            'deleted' => 1
        ];


        if ($SecondaryCategories->update($proval, $deledata)) {

            ////////////////////////CREATE ACTIVITY LOG//////////////
            $log_data = [
                'user_id' => $myid,
                'action' => 'Product secondary category (#' . $proval . ') ' . name_of_sub_category($sec_cate_name['parent_id']) . '-><b>' . $sec_cate_name['second_cat_name'] . '</b> is deleted.',
                'ip' => get_client_ip(),
                'mac' => GetMAC(),
                'created_at' => now_time($myid),
                'updated_at' => now_time($myid),
                'company_id' => company($myid),
            ];

            add_log($log_data);
            ////////////////////////END ACTIVITY LOG/////////////////

            $session->setFlashdata('pu_msg', 'Deleted!');
            return redirect()->to(base_url('settings/product'));
        } else {
            $session->setFlashdata('pu_er_msg', 'Failed to delete!');
            return redirect()->to(base_url('settings/product'));
        }
    }



    public function delete_product_brand($proval = "")
    {
        $ProductBrand = new ProductBrand();

        $session = session();

        $myid = session()->get('id');
        $con = array(
            'id' => session()->get('id')
        );

        $brand_name = $ProductBrand->where('id', $proval)->first();

        $deledata = [
            'deleted' => 1
        ];


        if ($ProductBrand->update($proval, $deledata)) {
            ////////////////////////CREATE ACTIVITY LOG//////////////
            $log_data = [
                'user_id' => $myid,
                'action' => 'Product brand (#' . $proval . ') <b>' . $brand_name['brand_name'] . '</b> is deleted.',
                'ip' => get_client_ip(),
                'mac' => GetMAC(),
                'created_at' => now_time($myid),
                'updated_at' => now_time($myid),
                'company_id' => company($myid),
            ];

            add_log($log_data);
            ////////////////////////END ACTIVITY LOG/////////////////

            $session->setFlashdata('pu_msg', 'Deleted!');
            return redirect()->to(base_url('settings/product'));
        } else {
            $session->setFlashdata('pu_er_msg', 'Failed to delete!');
            return redirect()->to(base_url('settings/product'));
        }
    }






    public function taxtypes()
    {
        $session = session();

        if ($session->has('isLoggedIn')) {

            $TaxtypeModel = new TaxtypeModel;
            $UserModel = new UserModel;
            $myid = session()->get('id');
            $con = array(
                'id' => session()->get('id')
            );

            $user = $UserModel->where('id', $myid)->first();

            if (app_status(company($myid)) == 0) {
                return redirect()->to(base_url('app_error'));
            }

            if (user_data(session()->get('id'), 'activated_financial_year') < 1) {
                return redirect()->to(base_url('settings/financial_years'));
            }

            if (check_permission($myid, 'manage_settings') == true || usertype($myid) == 'admin') {
            } else {
                return redirect()->to(base_url());
            }
            $tqry = $TaxtypeModel->where('company_id', company($myid))->where('deleted', 0)->orderBy('id', 'DESC')->findAll();


            $data = [
                'title' => 'POS - Tax types',
                'user' => $user,
                'tx_types' => $tqry
            ];

            echo view('header', $data);
            echo view('settings/taxtypes', $data);
            echo view('footer');



            if (isset($_POST['add_tax'])) {

                if (isset($_POST['set_as_default'])) {
                    $setas = 1;

                    $ustaxtype = $TaxtypeModel->where('company_id', company($myid))->orderBy('id', 'desc')->findAll();
                    foreach ($ustaxtype as $us) {

                        $usup = ['check_default' => 0];
                        $TaxtypeModel->update($us['id'], $usup);
                    }
                } else {
                    $setas = 0;
                }


                $at_data = [
                    'company_id' => company($myid),
                    'name' => strip_tags(trim($this->request->getVar('name'))),
                    'percent' => strip_tags(trim($this->request->getVar('percent'))),
                    'default_tax' => strip_tags(trim($this->request->getVar('default_tax'))),
                    'description' => strip_tags(trim($this->request->getVar('description'))),
                    'check_default' => $setas,
                ];

                $update_user = $TaxtypeModel->save($at_data);

                if ($update_user) {

                    ////////////////////////CREATE ACTIVITY LOG//////////////
                    $log_data = [
                        'user_id' => $myid,
                        'action' => 'New tax <b>' . strip_tags($this->request->getVar('name')) . '</b> is added.',
                        'ip' => get_client_ip(),
                        'mac' => GetMAC(),
                        'created_at' => now_time($myid),
                        'updated_at' => now_time($myid),
                        'company_id' => company($myid),
                    ];

                    add_log($log_data);
                    ////////////////////////END ACTIVITY LOG/////////////////

                    $session->setFlashdata('pu_msg', 'Saved!');
                    return redirect()->to(base_url('settings/taxtypes'));
                } else {
                    $session->setFlashdata('pu_er_msg', 'Failed to save!');
                    return redirect()->to(base_url('settings/taxtypes'));
                }
            }


            if (isset($_POST['edit_tax'])) {

                if (isset($_POST['set_as_default'])) {
                    $setas = 1;

                    $ustaxtype = $TaxtypeModel->where('company_id', company($myid))->orderBy('id', 'desc')->findAll();
                    foreach ($ustaxtype as $us) {
                        $usup = ['check_default' => 0];
                        $TaxtypeModel->update($us['id'], $usup);
                    }
                } else {
                    $setas = 0;
                }


                $pu_data = [
                    'name' => strip_tags(trim($this->request->getVar('name'))),
                    'percent' => strip_tags(trim($this->request->getVar('percent'))),
                    'default_tax' => strip_tags(trim($this->request->getVar('default_tax'))),
                    'description' => strip_tags(trim($this->request->getVar('description'))),
                    'check_default' => $setas,
                ];


                $update_user = $TaxtypeModel->update($_POST['tid'], $pu_data);

                if ($update_user) {
                    ////////////////////////CREATE ACTIVITY LOG//////////////
                    $log_data = [
                        'user_id' => $myid,
                        'action' => 'Tax <b>' . strip_tags($this->request->getVar('name')) . '</b> is updated.',
                        'ip' => get_client_ip(),
                        'mac' => GetMAC(),
                        'created_at' => now_time($myid),
                        'updated_at' => now_time($myid),
                        'company_id' => company($myid),
                    ];

                    add_log($log_data);
                    ////////////////////////END ACTIVITY LOG/////////////////
                    $session->setFlashdata('pu_msg', 'Saved!');
                    return redirect()->to(base_url('settings/taxtypes'));
                } else {
                    $session->setFlashdata('pu_er_msg', 'Failed to save!');
                    return redirect()->to(base_url('settings/taxtypes'));
                }
            }
        } else {
            return redirect()->to(base_url('users/login'));
        }
    }



    public function delete_taxtype($taxval = "")
    {

        $session = session();

        $TaxtypeModel = new TaxtypeModel;
        $myid = session()->get('id');
        $con = array(
            'id' => session()->get('id')
        );

        $tax_name = $TaxtypeModel->where('id', $taxval)->first();
        $deledata = [
            'deleted' => 1
        ];
        $del = $TaxtypeModel->update($taxval, $deledata);

        if ($del) {
            ////////////////////////CREATE ACTIVITY LOG//////////////
            $log_data = [
                'user_id' => $myid,
                'action' => 'Tax (#' . $taxval . ') <b>' . $tax_name['name'] . '</b> is deleted.',
                'ip' => get_client_ip(),
                'mac' => GetMAC(),
                'created_at' => now_time($myid),
                'updated_at' => now_time($myid),
                'company_id' => company($myid),
            ];

            add_log($log_data);
            ////////////////////////END ACTIVITY LOG/////////////////
            $session->setFlashdata('pu_msg', 'Deleted!');
            return redirect()->to(base_url('settings/taxtypes'));
        } else {
            $session->setFlashdata('pu_msg', 'Failed to delete!');
            return redirect()->to(base_url('settings/taxtypes'));
        }
    }




    public function printing_and_devices()
    {
        $session = session();

        if ($session->has('isLoggedIn')) {

            $UserModel = new UserModel;
            $CompanySettings = new CompanySettings;

            $myid = session()->get('id');
            $con = array(
                'id' => session()->get('id')
            );

            $user = $UserModel->where('id', $myid)->first();

            if (app_status(company($myid)) == 0) {
                return redirect()->to(base_url('app_error'));
            }

            if (user_data(session()->get('id'), 'activated_financial_year') < 1) {
                return redirect()->to(base_url('settings/financial_years'));
            }

            if (check_permission($myid, 'manage_settings') == true || usertype($myid) == 'admin') {
            } else {
                return redirect()->to(base_url());
            }


            $etqry = $CompanySettings->where('company_id', company($myid))->first();


            $data = [
                'title' => 'SpriteGenix ERP- Printers & Devices',
                'user' => $user,
                'conf' => $etqry
            ];


            echo view('header', $data);
            echo view('settings/printing_and_devices', $data);
            echo view('footer');



            if (isset($_POST['save_devices'])) {

                $pu_data = [
                    'print_thermal' => $this->request->getVar('print_thermal'),
                    'printer1' => strip_tags($this->request->getVar('printer1')),
                    'printer2' => strip_tags($this->request->getVar('printer2')),
                    'loc' => strip_tags($this->request->getVar('loc')),
                    'copies' => strip_tags(trim($this->request->getVar('copies'))),
                    'width' => strip_tags(trim($this->request->getVar('width'))),

                    'header' => strip_tags(trim($this->request->getVar('header'))),
                    'footer' => strip_tags(trim($this->request->getVar('footer'))),
                    'dpi' => strip_tags(trim($this->request->getVar('dpi'))),
                    'preview' => strip_tags(trim($this->request->getVar('preview'))),
                    'silent' => strip_tags(trim($this->request->getVar('silent'))),
                    'margin1' => strip_tags(trim($this->request->getVar('margin1'))),
                    'margin2' => strip_tags(trim($this->request->getVar('margin2'))),
                    'margin3' => strip_tags(trim($this->request->getVar('margin3'))),
                    'margin4' => strip_tags(trim($this->request->getVar('margin4'))),
                    'time_out_per_line' => strip_tags(trim($this->request->getVar('time_out_per_line'))),
                    'bar_printer1' => strip_tags($this->request->getVar('bar_printer1')),
                    'bar_printer2' => strip_tags($this->request->getVar('bar_printer2')),
                    'bar_copies' => strip_tags(trim($this->request->getVar('bar_copies'))),
                    'bar_width' => strip_tags(trim($this->request->getVar('bar_width'))),
                    'bar_header' => strip_tags(trim($this->request->getVar('bar_header'))),
                    'bar_footer' => strip_tags(trim($this->request->getVar('bar_footer'))),
                    'bar_dpi' => strip_tags(trim($this->request->getVar('bar_dpi'))),
                    'bar_preview' => strip_tags(trim($this->request->getVar('bar_preview'))),
                    'bar_silent' => strip_tags(trim($this->request->getVar('bar_silent'))),
                    'bar_margin1' => strip_tags(trim($this->request->getVar('bar_margin1'))),
                    'bar_margin2' => strip_tags(trim($this->request->getVar('bar_margin2'))),
                    'bar_margin3' => strip_tags(trim($this->request->getVar('bar_margin3'))),
                    'bar_margin4' => strip_tags(trim($this->request->getVar('bar_margin4'))),
                    'bar_time_out_per_line' => strip_tags(trim($this->request->getVar('bar_time_out_per_line'))),
                    'port' => strip_tags(trim($this->request->getVar('port'))),
                    'baudrate' => strip_tags(trim($this->request->getVar('baudrate'))),
                    'databits' => strip_tags(trim($this->request->getVar('databits'))),
                    'stopbits' => strip_tags(trim($this->request->getVar('stopbits'))),
                    'parity' => strip_tags(trim($this->request->getVar('parity'))),
                    'buffersize' => strip_tags(trim($this->request->getVar('buffersize'))),
                    'weighing_mac' => strip_tags(trim($this->request->getVar('weighing_mac'))),
                    'w_device' => strip_tags(trim($this->request->getVar('w_device'))),
                    'bar_body_width' => strip_tags(trim($this->request->getVar('bar_body_width'))),
                    'body_width' => strip_tags(trim($this->request->getVar('body_width'))),
                    'barcode_height' => strip_tags(trim($this->request->getVar('barcode_height'))),
                    'barcode_width' => strip_tags(trim($this->request->getVar('barcode_width'))),
                    'barcode_fontsize' => strip_tags(trim($this->request->getVar('barcode_fontsize'))),
                    'barcode_marginbottom' => strip_tags(trim($this->request->getVar('barcode_marginbottom'))),
                    'fp_device' => strip_tags(trim($this->request->getVar('fp_device'))),
                    'fp_port' => strip_tags(trim($this->request->getVar('fp_port'))),
                    'fp_address' => strip_tags(trim($this->request->getVar('fp_address'))),
                ];


                $update_user = $CompanySettings->update(get_setting(company($myid), 'id'), $pu_data);

                if ($update_user) {
                    ////////////////////////CREATE ACTIVITY LOG//////////////
                    $log_data = [
                        'user_id' => $myid,
                        'action' => 'Company/branch (#' . company($myid) . ') <b>' . my_company_name(company($myid)) . '</b> printers & devices details changed.',
                        'ip' => get_client_ip(),
                        'mac' => GetMAC(),
                        'created_at' => now_time($myid),
                        'updated_at' => now_time($myid),
                        'company_id' => company($myid),
                    ];

                    add_log($log_data);
                    ////////////////////////END ACTIVITY LOG/////////////////


                    $session->setFlashdata('pu_msg', 'Saved!');
                    return redirect()->to(base_url('settings/printing_and_devices'));
                } else {
                    $session->setFlashdata('pu_er_msg', 'Failed to save!');
                    return redirect()->to(base_url('settings/printing_and_devices'));
                }
            }
        } else {
            return redirect()->to(base_url('users/login'));
        }
    }



    public function sms_and_emails()
    {
        $session = session();

        if ($session->has('isLoggedIn')) {

            $UserModel = new UserModel;
            $CompanySettings = new CompanySettings;

            $myid = session()->get('id');
            $con = array(
                'id' => session()->get('id')
            );

            $user = $UserModel->where('id', $myid)->first();

            if (app_status(company($myid)) == 0) {
                return redirect()->to(base_url('app_error'));
            }

            if (user_data(session()->get('id'), 'activated_financial_year') < 1) {
                return redirect()->to(base_url('settings/financial_years'));
            }

            if (check_permission($myid, 'manage_settings') == true || usertype($myid) == 'admin') {
            } else {
                return redirect()->to(base_url());
            }


            $etqry = $CompanySettings->where('company_id', company($myid))->first();


            $data = [
                'title' => 'SpriteGenix ERP- Printers & Devices',
                'user' => $user,
                'conf' => $etqry
            ];

            if (usertype($myid) == 'admin') {
                echo view('header', $data);
                echo view('settings/sms_and_emails', $data);
                echo view('footer');
            } else {
                return redirect()->to(base_url());
            }




            if (isset($_POST['save_sms_email'])) {

                $pu_data = [
                    'sms_sender' => htmlentities(strip_tags(trim($this->request->getVar('sms_sender')))),
                    'receivers_phone' => htmlentities(strip_tags(trim($this->request->getVar('receivers_phone')))),
                    'source_ref' => htmlentities(strip_tags(trim($this->request->getVar('source_ref')))),
                    'smtp_host' => htmlentities(strip_tags(trim($this->request->getVar('smtp_host')))),
                    'smtp_port' => htmlentities(strip_tags(trim($this->request->getVar('smtp_port')))),
                    'smtp_user' => htmlentities(strip_tags(trim($this->request->getVar('smtp_user')))),
                    'smtp_password' => htmlentities(strip_tags(trim($this->request->getVar('smtp_password')))),
                    'from_name' => htmlentities(strip_tags(trim($this->request->getVar('from_name')))),
                    'from_email' => htmlentities(strip_tags(trim($this->request->getVar('from_email'))))
                ];


                $update_user = $CompanySettings->update(get_setting(company($myid), 'id'), $pu_data);

                if ($update_user) {

                    ////////////////////////CREATE ACTIVITY LOG//////////////
                    $log_data = [
                        'user_id' => $myid,
                        'action' => 'Company/branch (#' . company($myid) . ') <b>' . my_company_name(company($myid)) . '</b> sms & email configurations changed.',
                        'ip' => get_client_ip(),
                        'mac' => GetMAC(),
                        'created_at' => now_time($myid),
                        'updated_at' => now_time($myid),
                        'company_id' => company($myid),
                    ];

                    add_log($log_data);
                    ////////////////////////END ACTIVITY LOG/////////////////


                    $session->setFlashdata('pu_msg', 'Saved!');
                    return redirect()->to(base_url('settings/sms_and_emails'));
                } else {
                    $session->setFlashdata('pu_er_msg', 'Failed to save!');
                    return redirect()->to(base_url('settings/sms_and_emails'));
                }
            }
        } else {
            return redirect()->to(base_url('users/login'));
        }
    }




    public function team()
    {

        $session = session();

        if ($session->has('isLoggedIn')) {

            $UserModel = new UserModel;
            $CompanySettings = new CompanySettings;
            $PermissionModel = new PermissionModel;
            $Companies = new Companies;

            $myid = session()->get('id');
            $con = array(
                'id' => session()->get('id')
            );

            $user = $UserModel->where('id', $myid)->first();

            if (app_status(company($myid)) == 0) {
                return redirect()->to(base_url('app_error'));
            }

            if (user_data(session()->get('id'), 'activated_financial_year') < 1) {
                return redirect()->to(base_url('settings/financial_years'));
            }

            if (check_permission($myid, 'manage_settings') == true || usertype($myid) == 'admin') {
            } else {
                return redirect()->to(base_url());
            }

            // $company_members_array=array();

            // $get_branches=$Companies->where('parent_company', main_company_id($myid));

            // foreach($get_branches->findAll() as $ci){
            //     foreach(SpriteGenix_get_admins_of_company($ci['id']) as $cid){
            //         array_push($company_members_array, $cid);
            //     }
            // }

            $company_members_array = $UserModel->where('main_compani_id', main_company_id($myid))->where('u_type!=', 'vendor')->where('u_type!=', 'customer')->where("deleted", 0)->orderBy('u_type', 'ASC')->findAll();

            // foreach ($tqry as $pu_te) {
            //     array_push($company_members_array, $pu_te);
            // }


            $get_branches = $Companies->where('parent_company', main_company_id($myid));








            $data = [
                'title' => 'SpriteGenix ERP- Company Members',
                'user' => $user,
                'company_member' => $company_members_array,
                'branches' => $get_branches->findAll()
            ];


            echo view('header', $data);
            echo view('settings/team', $data);
            echo view('footer');




            if (isset($_POST['add_memberee'])) {

                $word = strtolower(strip_tags(trim($this->request->getVar('email'))));

                if (count_email($word, company($myid)) == 0) {



                    if (!empty($_FILES['profiel_foto']['name'])) {

                        $target_dir = "public/images/avatars/";
                        $target_file = $target_dir . time() . basename($_FILES["profiel_foto"]["name"]);
                        $imageFileType = pathinfo($target_file, PATHINFO_EXTENSION);
                        $imgName = time() . basename($_FILES["profiel_foto"]["name"]);
                        move_uploaded_file($_FILES["profiel_foto"]["tmp_name"], $target_file);

                        $ac_data = [
                            'profile_pic' => $imgName,
                            'display_name' => strip_tags($this->request->getVar('full_name')),
                            'email' => strip_tags(trim($this->request->getVar('email'))),
                            'phone' => strip_tags($this->request->getVar('phone')),
                            'password' => strip_tags($this->request->getVar('password')),
                            'status' => 1,
                            'updated_at' => date('Y-m-d H:i:s'),
                            'company_id' => company($myid),
                            'main_compani_id' => main_company_id($myid),
                            'u_type' => $this->request->getVar('u_type'),
                        ];
                    } else {
                        $ac_data = [
                            'display_name' => strip_tags($this->request->getVar('full_name')),
                            'email' => strip_tags($this->request->getVar('email')),
                            'phone' => strip_tags($this->request->getVar('phone')),
                            'password' => strip_tags($this->request->getVar('password')),
                            'status' => 1,
                            'updated_at' => date('Y-m-d H:i:s'),
                            'company_id' => company($myid),
                            'main_compani_id' => main_company_id($myid),
                            'u_type' => $this->request->getVar('u_type')
                        ];
                    }

                    $update_user = $UserModel->save($ac_data);

                    if ($update_user) {
                        ////////////////////////CREATE ACTIVITY LOG//////////////
                        $log_data = [
                            'user_id' => $myid,
                            'action' => 'New team member <b>' . strip_tags($this->request->getVar('full_name')) . '</b> is joined.',
                            'ip' => get_client_ip(),
                            'mac' => GetMAC(),
                            'created_at' => now_time($myid),
                            'updated_at' => now_time($myid),
                            'company_id' => company($myid),
                        ];

                        add_log($log_data);
                        ////////////////////////END ACTIVITY LOG/////////////////
                        $session->setFlashdata('sucmsg', 'Saved!');
                        return redirect()->to(base_url('settings/team'));
                    } else {
                        $session->setFlashdata('failmsg', 'Failed to save');
                        return redirect()->to(base_url('settings/team'));
                    }
                } else {
                    $session->setFlashdata('failmsg', 'Email already exists');
                    return redirect()->to(base_url('settings/team'));
                }
            }


            if (isset($_POST['edit_memberee'])) {



                $word = strtolower(strip_tags(trim($this->request->getVar('email'))));


                if (user_email($_POST['mid']) == strip_tags(trim($this->request->getVar('email')))) {

                    if (!empty($_FILES['profiel_foto']['name'])) {
                        $target_dir = "public/images/avatars/";
                        $target_file = $target_dir . time() . basename($_FILES["profiel_foto"]["name"]);
                        $imageFileType = pathinfo($target_file, PATHINFO_EXTENSION);
                        $imgName = time() . basename($_FILES["profiel_foto"]["name"]);
                        move_uploaded_file($_FILES["profiel_foto"]["tmp_name"], $target_file);

                        if (!empty(trim(strip_tags($this->request->getVar('password'))))) {
                            $ac_data = [
                                'profile_pic' => $imgName,
                                'display_name' => strip_tags($this->request->getVar('full_name')),
                                'email' => strip_tags(trim($this->request->getVar('email'))),
                                'phone' => strip_tags($this->request->getVar('phone')),
                                'password' => strip_tags($this->request->getVar('password')),
                                'status' => 1,
                                'updated_at' => date('Y-m-d H:i:s'),
                                'u_type' => $this->request->getVar('u_type')
                            ];
                        } else {
                            $ac_data = [
                                'profile_pic' => $imgName,
                                'display_name' => strip_tags($this->request->getVar('full_name')),
                                'email' => strip_tags(trim($this->request->getVar('email'))),
                                'phone' => strip_tags($this->request->getVar('phone')),
                                'status' => 1,
                                'updated_at' => date('Y-m-d H:i:s'),
                                'u_type' => $this->request->getVar('u_type')
                            ];
                        }
                    } else {
                        if (!empty(trim(strip_tags($this->request->getVar('password'))))) {
                            $ac_data = [
                                'display_name' => strip_tags($this->request->getVar('full_name')),
                                'email' => strip_tags(trim($this->request->getVar('email'))),
                                'phone' => strip_tags($this->request->getVar('phone')),
                                'password' => strip_tags($this->request->getVar('password')),
                                'status' => 1,
                                'updated_at' => date('Y-m-d H:i:s'),
                                'company_id' => company($myid),
                                'u_type' => $this->request->getVar('u_type')
                            ];
                        } else {
                            $ac_data = [
                                'display_name' => strip_tags($this->request->getVar('full_name')),
                                'email' => strip_tags(trim($this->request->getVar('email'))),
                                'phone' => strip_tags($this->request->getVar('phone')),
                                'status' => 1,
                                'updated_at' => date('Y-m-d H:i:s'),
                                'company_id' => company($myid),
                                'u_type' => $this->request->getVar('u_type')
                            ];
                        }
                    }

                    $update_user = $UserModel->update($_POST['mid'], $ac_data);


                    if ($update_user) {
                        ////////////////////////CREATE ACTIVITY LOG//////////////
                        $log_data = [
                            'user_id' => $myid,
                            'action' => 'Team member <b>' . strip_tags($this->request->getVar('full_name')) . '</b> details is updated.',
                            'ip' => get_client_ip(),
                            'mac' => GetMAC(),
                            'created_at' => now_time($myid),
                            'updated_at' => now_time($myid),
                            'company_id' => company($myid),
                        ];

                        add_log($log_data);
                        ////////////////////////END ACTIVITY LOG/////////////////
                        $session->setFlashdata('sucmsg', 'Saved!');
                        return redirect()->to(base_url('settings/team'));
                    } else {
                        $session->setFlashdata('failmsg', 'Failed to save!');
                        return redirect()->to(base_url('settings/team'));
                    }
                } else {
                    if (count_email($word, company($myid)) == 0) {

                        if (!empty($_FILES['profiel_foto']['name'])) {
                            $target_dir = "public/images/avatars/";
                            $target_file = $target_dir . time() . basename($_FILES["profiel_foto"]["name"]);
                            $imageFileType = pathinfo($target_file, PATHINFO_EXTENSION);
                            $imgName = time() . basename($_FILES["profiel_foto"]["name"]);
                            move_uploaded_file($_FILES["profiel_foto"]["tmp_name"], $target_file);

                            $ac_data = [
                                'profile_pic' => $imgName,
                                'display_name' => strip_tags($this->request->getVar('full_name')),
                                'email' => strip_tags(trim($this->request->getVar('email'))),
                                'phone' => strip_tags($this->request->getVar('phone')),
                                'password' => strip_tags($this->request->getVar('password')),
                                'status' => 1,
                                'updated_at' => date('Y-m-d H:i:s'),
                                'company_id' => company($myid),
                                'u_type' => $this->request->getVar('u_type'),
                            ];
                        } else {
                            $ac_data = [
                                'display_name' => strip_tags($this->request->getVar('full_name')),
                                'email' => strip_tags(trim($this->request->getVar('email'))),
                                'phone' => strip_tags($this->request->getVar('phone')),
                                'password' => strip_tags($this->request->getVar('password')),
                                'status' => 1,
                                'updated_at' => date('Y-m-d H:i:s'),
                                'company_id' => company($myid),
                                'u_type' => $this->request->getVar('u_type')
                            ];
                        }

                        $update_user = $UserModel->update($_POST['mid'], $ac_data);


                        if ($update_user) {
                            ////////////////////////CREATE ACTIVITY LOG//////////////
                            $log_data = [
                                'user_id' => $myid,
                                'action' => 'New team member <b>' . strip_tags($this->request->getVar('full_name')) . '</b> is joined.',
                                'ip' => get_client_ip(),
                                'mac' => GetMAC(),
                                'created_at' => now_time($myid),
                                'updated_at' => now_time($myid),
                                'company_id' => company($myid),
                            ];

                            add_log($log_data);
                            ////////////////////////END ACTIVITY LOG/////////////////
                            $session->setFlashdata('sucmsg', 'Saved!');
                            return redirect()->to(base_url('settings/team'));
                        } else {

                            $session->setFlashdata('failmsg', 'Saved!');
                            return redirect()->to(base_url('settings/team'));
                        }
                    } else {
                        $session->setFlashdata('failmsg', 'Email already exists!');
                        return redirect()->to(base_url('settings/team'));
                    }
                }
            }




            //adding permissions to users(employees)
            if (isset($_POST['save_grant'])) {

                if (isset($_POST['manage_parties'])) {
                    $manage_parties = $_POST['manage_parties'];
                } else {
                    $manage_parties = 0;
                }


                if (isset($_POST['manage_sales'])) {
                    $manage_sales = $_POST['manage_sales'];
                } else {
                    $manage_sales = 0;
                }


                if (isset($_POST['manage_sales_quotation'])) {
                    $manage_sales_quotation = $_POST['manage_sales_quotation'];
                } else {
                    $manage_sales_quotation = 0;
                }


                if (isset($_POST['manage_sales_order'])) {
                    $manage_sales_order = $_POST['manage_sales_order'];
                } else {
                    $manage_sales_order = 0;
                }

                if (isset($_POST['manage_sales_return'])) {
                    $manage_sales_return = $_POST['manage_sales_return'];
                } else {
                    $manage_sales_return = 0;
                }


                if (isset($_POST['manage_sales_delivery_note'])) {
                    $manage_sales_delivery_note = $_POST['manage_sales_delivery_note'];
                } else {
                    $manage_sales_delivery_note = 0;
                }


                if (isset($_POST['manage_purc'])) {
                    $manage_purchase = $_POST['manage_purc'];
                } else {
                    $manage_purchase = 0;
                }
                if (isset($_POST['manage_purchase_order'])) {
                    $manage_purchase_order = $_POST['manage_purchase_order'];
                } else {
                    $manage_purchase_order = 0;
                }

                if (isset($_POST['manage_purchase_return'])) {
                    $manage_purchase_return = $_POST['manage_purchase_return'];
                } else {
                    $manage_purchase_return = 0;
                }

                if (isset($_POST['manage_purchase_delivery_note'])) {
                    $manage_purchase_delivery_note = $_POST['manage_purchase_delivery_note'];
                } else {
                    $manage_purchase_delivery_note = 0;
                }

                if (isset($_POST['manage_cash_ex'])) {
                    $manage_cash = $_POST['manage_cash_ex'];
                } else {
                    $manage_cash = 0;
                }

                if (isset($_POST['manage_pro_ser'])) {
                    $manage_product = $_POST['manage_pro_ser'];
                } else {
                    $manage_product = 0;
                }

                if (isset($_POST['manage_reports'])) {
                    $manage_reports = $_POST['manage_reports'];
                } else {
                    $manage_reports = 0;
                }

                if (isset($_POST['manage_orders'])) {
                    $manage_orders = $_POST['manage_orders'];
                } else {
                    $manage_orders = 0;
                }

                if (isset($_POST['manage_appearance'])) {
                    $manage_appearance = $_POST['manage_appearance'];
                } else {
                    $manage_appearance = 0;
                }


                if (isset($_POST['manage_trash'])) {
                    $manage_trash = $_POST['manage_trash'];
                } else {
                    $manage_trash = 0;
                }

                if (isset($_POST['manage_product_requestes'])) {
                    $manage_pro_requests = $_POST['manage_product_requestes'];
                } else {
                    $manage_pro_requests = 0;
                }

                if (isset($_POST['manage_settings'])) {
                    $manage_settings = $_POST['manage_settings'];
                } else {
                    $manage_settings = 0;
                }

                if (isset($_POST['manage_SpriteGenix_keys'])) {
                    $manage_SpriteGenix_keys = $_POST['manage_SpriteGenix_keys'];
                } else {
                    $manage_SpriteGenix_keys = 0;
                }


                if (isset($_POST['manage_enquires'])) {
                    $manage_enquires = $_POST['manage_enquires'];
                } else {
                    $manage_enquires = 0;
                }


                if (isset($_POST['manage_crm'])) {
                    $manage_crm = $_POST['manage_crm'];
                } else {
                    $manage_crm = 0;
                }

                if (isset($_POST['manage_document_renew'])) {
                    $manage_document_renew = $_POST['manage_document_renew'];
                } else {
                    $manage_document_renew = 0;
                }

                if (isset($_POST['manage_work_updates'])) {
                    $manage_work_updates = $_POST['manage_work_updates'];
                } else {
                    $manage_work_updates = 0;
                }

                if (isset($_POST['manage_hr'])) {
                    $manage_hr = $_POST['manage_hr'];
                } else {
                    $manage_hr = 0;
                }

                if (isset($_POST['manage_invoice_submit'])) {
                    $manage_invoice_submit = $_POST['manage_invoice_submit'];
                } else {
                    $manage_invoice_submit = 0;
                }






                $us_id = $_POST['useid'];
                $check_per = $PermissionModel->where('user', $us_id)->where('company_id', company($myid))->first();
                if (!$check_per) {
                    $insper = [
                        'user' => $us_id,
                        'company_id' => company($myid),
                        'manage_parties' => $manage_parties,
                        'manage_sales' => $manage_sales,
                        'manage_sales_quotation' => $manage_sales_quotation,
                        'manage_sales_order' => $manage_sales_order,
                        'manage_sales_return' => $manage_sales_return,
                        'manage_sales_delivery_note' => $manage_sales_delivery_note,
                        'manage_purchase' => $manage_purchase,
                        'manage_purchase_order' => $manage_purchase_order,
                        'manage_purchase_return' => $manage_purchase_return,
                        'manage_purchase_delivery_note' => $manage_purchase_delivery_note,
                        'manage_cash_ex' => $manage_cash,
                        'manage_pro_ser' => $manage_product,
                        'manage_reports' => $manage_reports,
                        'manage_orders' => $manage_orders,
                        'manage_appearance' => $manage_appearance,
                        'manage_trash' => $manage_trash,
                        'manage_product_requestes' => $manage_pro_requests,
                        'manage_settings' => $manage_settings,
                        'manage_SpriteGenix_keys' => $manage_SpriteGenix_keys,
                        'manage_enquires' => $manage_enquires,
                        'manage_crm' => $manage_crm,
                        'manage_document_renew' => $manage_document_renew,
                        'manage_work_updates' => $manage_work_updates,
                        'manage_hr' => $manage_hr,
                        'manage_invoice_submit' => $manage_invoice_submit
                    ];
                    $apl = $PermissionModel->save($insper);
                } else {
                    $insper = [
                        'manage_parties' => $manage_parties,
                        'manage_sales' => $manage_sales,
                        'manage_sales_quotation' => $manage_sales_quotation,
                        'manage_sales_order' => $manage_sales_order,
                        'manage_sales_return' => $manage_sales_return,
                        'manage_sales_delivery_note' => $manage_sales_delivery_note,
                        'manage_purchase' => $manage_purchase,
                        'manage_purchase_order' => $manage_purchase_order,
                        'manage_purchase_return' => $manage_purchase_return,
                        'manage_purchase_delivery_note' => $manage_purchase_delivery_note,
                        'manage_cash_ex' => $manage_cash,
                        'manage_pro_ser' => $manage_product,
                        'manage_reports' => $manage_reports,
                        'manage_orders' => $manage_orders,
                        'manage_appearance' => $manage_appearance,
                        'manage_trash' => $manage_trash,
                        'manage_product_requestes' => $manage_pro_requests,
                        'manage_settings' => $manage_settings,
                        'manage_SpriteGenix_keys' => $manage_SpriteGenix_keys,
                        'manage_enquires' => $manage_enquires,
                        'manage_crm' => $manage_crm,
                        'manage_document_renew' => $manage_document_renew,
                        'manage_work_updates' => $manage_work_updates,
                        'manage_hr' => $manage_hr,
                        'manage_invoice_submit' => $manage_invoice_submit


                    ];


                    $apl = $PermissionModel->update($check_per['id'], $insper);
                }
                if ($apl) {
                    $session->setFlashdata('sucmsg', 'Permission Granted!');
                    return redirect()->to(base_url('settings/team'));
                } else {
                    $session->setFlashdata('sucmsg', 'Failed!');
                    return redirect()->to(base_url('settings/team'));
                }
            }
        } else {
            return redirect()->to(base_url('users/login'));
        }
    }



    public function save_branch_permission($user_id)

    {
        $session = session();

        if ($session->has('isLoggedIn')) {

            $UserModel = new UserModel;

            $myid = session()->get('id');
            $con = array(
                'id' => session()->get('id')
            );

            $user = $UserModel->where('id', $myid)->first();
            $new_active_company = 0;

            if ($this->request->getMethod() == 'post') {
                $allowedcomp = '';

                if ($this->request->getVar('allowed_branches')) {
                    foreach ($this->request->getVar('allowed_branches') as $allw) {
                        $allowedcomp .= $allw . ',';

                        if (get_cust_data($user_id, 'company_id') == $allw) {
                            $new_active_company = $allw;
                        } else {
                            $new_active_company = $allw;
                        }
                    }
                }

                $ac_data = [
                    'allowed_branches' => $allowedcomp,
                    'is_branch_changed' => 1,
                    'company_id' => $new_active_company
                ];

                $update_user = $UserModel->update($user_id, $ac_data);


                if ($update_user) {
                    $session->setFlashdata('sucmsg', 'Saved!');
                    return redirect()->to(base_url('settings/team'));
                } else {
                    $session->setFlashdata('sucmsg', 'Failed!');
                    return redirect()->to(base_url('settings/team'));
                }
            }
        } else {
            return redirect()->to(base_url('users/login'));
        }
    }

    public function delete_work_department($wcid = "")
    {
        $WorkDepartmentModel = new WorkDepartmentModel();

        $session = session();

        $myid = session()->get('id');
        $con = array(
            'id' => session()->get('id')
        );

        $deledata = [
            'deleted' => 1
        ];


        if ($WorkDepartmentModel->update($wcid, $deledata)) {

            $session->setFlashdata('pu_msg', 'Deleted!');
            return redirect()->to(base_url('settings/crm_configurations'));
        } else {
            $session->setFlashdata('pu_er_msg', 'Failed to delete!');
            return redirect()->to(base_url('settings/crm_configurations'));
        }
    }



    public function delete_member($useval = "")
    {

        $session = session();
        $myid = session()->get('id');

        $UserModel = new UserModel;

        if (usertype($myid) == 'admin') {

            $team_member_name = $UserModel->where('id', $useval)->first();
            $deledata = [
                'deleted' => 1
            ];
            $del = $UserModel->update($useval, $deledata);

            if ($del) {

                ////////////////////////CREATE ACTIVITY LOG//////////////
                $log_data = [
                    'user_id' => $myid,
                    'action' => 'Team member <b>' . $team_member_name['display_name'] . '</b> is deleted.',
                    'ip' => get_client_ip(),
                    'mac' => GetMAC(),
                    'created_at' => now_time($myid),
                    'updated_at' => now_time($myid),
                    'company_id' => company($myid),
                ];

                add_log($log_data);
                ////////////////////////END ACTIVITY LOG/////////////////


                $session->setFlashdata('sucmsg', 'Deleted!');
                return redirect()->to(base_url('settings/team'));
            } else {
                $session->setFlashdata('failmsg', 'Failed to delete!');
                return redirect()->to(base_url('settings/team'));
            }
        } else {
            return redirect()->to(base_url());
        }
    }




    public function add_unit_from_ajax()
    {
        $session = session();
        $myid = session()->get('id');

        $con = array(
            'id' => session()->get('id')
        );

        $ProductUnits = new ProductUnits;

        if (isset($_POST['unit_name'])) {
            $pu_data = [
                'company_id' => company($myid),
                'name' => $this->request->getVar('unit_name')
            ];

            $un = $ProductUnits->save($pu_data);
            $uinserid = $ProductUnits->insertID();

            if ($un) {
                echo $uinserid;
            } else {
                echo 0;
            }
        }
    }


    public function add_subunit_from_ajax()
    {
        $session = session();
        $myid = session()->get('id');

        $con = array(
            'id' => session()->get('id')
        );

        $ProductSubUnit = new ProductSubUnit;

        if (isset($_POST['subunit_name'])) {
            $ps_data = [
                'company_id' => company($myid),
                'parent_id' => $this->request->getVar('punit'),
                'sub_unit_name' => $this->request->getVar('subunit_name'),
                'slug' => cat_title_to_slug($this->request->getVar('subunit_name'))
            ];

            $sc = $ProductSubUnit->save($ps_data);
            $sinserid = $ProductSubUnit->insertID();

            if ($sc) {
                echo $sinserid;
            } else {
                echo 0;
            }
        }
    }


    public function add_brand_from_ajax()
    {
        $session = session();
        $myid = session()->get('id');

        $con = array(
            'id' => session()->get('id')
        );

        $ProductBrand = new ProductBrand;

        if (isset($_POST['brand_name'])) {
            $ps_data = [
                'company_id' => company($myid),
                'brand_name' => $this->request->getVar('brand_name'),
                'slug' => cat_title_to_slug($this->request->getVar('brand_name'))
            ];

            $sc = $ProductBrand->save($ps_data);
            $sinserid = $ProductBrand->insertID();

            if ($sc) {
                echo $sinserid;
            } else {
                echo 0;
            }
        }
    }



    public function add_cate_from_ajax()
    {
        $session = session();
        $myid = session()->get('id');

        $con = array(
            'id' => session()->get('id')
        );
        $ProductCategories = new ProductCategories;

        if (isset($_POST['cat_name'])) {
            $pc_data = [
                'company_id' => company($myid),
                'cat_name' => $this->request->getVar('cat_name'),
                'slug' => cat_title_to_slug($this->request->getVar('cat_name')),
                'cat_department' => dpt_serial(company($myid))
            ];

            $ct = $ProductCategories->save($pc_data);
            $cinserid = $ProductCategories->insertID();

            if ($ct) {
                echo $cinserid;
            } else {
                echo 0;
            }
        }
    }



    public function add_subcate_from_ajax()
    {
        $session = session();
        $myid = session()->get('id');

        $con = array(
            'id' => session()->get('id')
        );

        $ProductSubCategories = new ProductSubCategories;

        if (isset($_POST['subcat_name'])) {
            $ps_data = [
                'company_id' => company($myid),
                'parent_id' => $this->request->getVar('pcategory'),
                'sub_cat_name' => $this->request->getVar('subcat_name'),
                'slug' => cat_title_to_slug($this->request->getVar('subcat_name'))
            ];

            $sc = $ProductSubCategories->save($ps_data);
            $sinserid = $ProductSubCategories->insertID();

            if ($sc) {
                echo $sinserid;
            } else {
                echo 0;
            }
        }
    }


    public function add_seccate_from_ajax()
    {
        $session = session();
        $myid = session()->get('id');

        $con = array(
            'id' => session()->get('id')
        );

        $SecondaryCategories = new SecondaryCategories;

        if (isset($_POST['seccat_name'])) {
            $ps_data = [
                'company_id' => company($myid),
                'parent_id' => $this->request->getVar('pcategory'),
                'second_cat_name' => $this->request->getVar('seccat_name'),
                'slug' => cat_title_to_slug($this->request->getVar('seccat_name'))
            ];

            $sc = $SecondaryCategories->save($ps_data);
            $sinserid = $SecondaryCategories->insertID();

            if ($sc) {
                echo $sinserid;
            } else {
                echo 0;
            }
        }
    }


    public function side_bar_setting()

    {
        $session = session();

        if ($session->has('isLoggedIn')) {

            $UserModel = new UserModel;
            $CompanySettings = new CompanySettings;

            $myid = session()->get('id');
            $con = array(
                'id' => session()->get('id')
            );

            $user = $UserModel->where('id', $myid)->first();

            $cquery = $CompanySettings->where('company_id', company($myid))->orderBy('id', 'DESC');

            $data = [
                'title' => 'SpriteGenix ERP- Preferences '

            ];

            if ($this->request->getMethod() == 'post') {


                $ac_data = [
                    'currency' => $this->request->getVar('currency'),
                    'timezone' => $this->request->getVar('timezone'),
                    'keyboard' => $this->request->getVar('keyboard'),
                    'results_per_page' => $this->request->getVar('results_per_page'),
                    'Invoice_color' => strip_tags($this->request->getVar('Invoice_color')),
                    'invoice_font_color' => strip_tags($this->request->getVar('invoice_font_color')),
                    'invoice_template' => strip_tags($this->request->getVar('invoice_temp')),
                    'receipt_template' => strip_tags($this->request->getVar('receipt_temp')),
                    'items_kit_show' => $this->request->getVar('items_kit_show'),
                    'stock_enable' => $this->request->getVar('stock_enable'),
                    'billing_style' => strip_tags($this->request->getVar('billing_style')),
                    'split_tax' => strip_tags($this->request->getVar('split_tax')),
                    'cursor_position' => $this->request->getVar('cursor_position'),

                ];

                $update_user = $CompanySettings->update(get_setting(company($myid), 'id'), $ac_data);

                if ($update_user) {

                    ////////////////////////CREATE ACTIVITY LOG//////////////
                    $log_data = [
                        'user_id' => $myid,
                        'action' => 'Company/branch (#' . company($myid) . ') <b>' . my_company_name(company($myid)) . '</b> invoice settings updated.',
                        'ip' => get_client_ip(),
                        'mac' => GetMAC(),
                        'created_at' => now_time($myid),
                        'updated_at' => now_time($myid),
                        'company_id' => company($myid),
                    ];

                    add_log($log_data);
                    ////////////////////////END ACTIVITY LOG/////////////////

                    echo 1;
                } else {
                    echo 2;
                }
            }
        } else {
            return redirect()->to(base_url('users/login'));
        }
    }


    public function app_info()
    {
        $session = session();

        if ($session->has('isLoggedIn')) {

            $UserModel = new UserModel;
            $CompanySettings = new CompanySettings;

            $myid = session()->get('id');
            $con = array(
                'id' => session()->get('id')
            );

            $user = $UserModel->where('id', $myid)->first();

            if (app_status(company($myid)) == 0) {
                return redirect()->to(base_url('app_error'));
            }

            if (user_data(session()->get('id'), 'activated_financial_year') < 1) {
                return redirect()->to(base_url('settings/financial_years'));
            }

            if (check_permission($myid, 'manage_settings') == true || usertype($myid) == 'admin') {
            } else {
                return redirect()->to(base_url());
            }




            $data = [
                'title' => 'App Information',
                'user' => $user,
            ];


            echo view('header', $data);
            echo view('settings/app_info', $data);
            echo view('footer');
        } else {
            return redirect()->to(base_url('users/login'));
        }
    }


    public function get_catgry_select($parent = "")
    {
        $WorkcategoryModel = new WorkcategoryModel();

        $WorkcategoryModel->where('parent_id', $parent);
        $WorkcategoryModel->where('deleted', 0);
        $scs = $WorkcategoryModel->findAll();
        echo '<option value="">Select Work Category</option>';
        foreach ($scs as $sc) {
            echo '<option value="' . $sc['id'] . '">' . $sc['category_name'] . '</option>';
        }
    }




    public function caste_category()
    {
        $session = session();
        $user = new UserModel();
        $myid = session()->get('id');
        $StudentcategoryModel = new StudentcategoryModel();

        if ($session->has('isLoggedIn')) {
            $usaerdata = $user->where('id', session()->get('id'))->first();


            if (app_status(company($myid)) == 0) {
                return redirect()->to(base_url('app_error'));
            }

            if (user_data(session()->get('id'), 'activated_financial_year') < 1) {
                return redirect()->to(base_url('settings/financial_years'));
            }


            $student_cat = $StudentcategoryModel->where('company_id', company($myid))->where('deleted', 0)->where('type', 'main')->findAll();

            $student_sub_cat = $StudentcategoryModel->where('company_id', company($myid))->where('deleted', 0)->where('type', 'sub')->findAll();

            $data = [
                'title' => 'Caste Category | Erudite ERP',
                'user' => $usaerdata,
                'student_cat' => $student_cat,
                'student_sub_cat' => $student_sub_cat

            ];

            echo view('header', $data);
            echo view('settings/caste_category', $data);
            echo view('footer');
        } else {
            return redirect()->to(base_url('users'));
        }
    }



    public function add_caste_category()
    {
        $StudentcategoryModel = new StudentcategoryModel();


        if ($this->request->getMethod() == 'post') {
            $myid = session()->get('id');

            $stdcat = [
                'company_id' => company($myid),
                'category_name' => strip_tags($this->request->getVar('stdcategory')),
                'deleted' => 0,
                'type' => 'main',
            ];

            $StudentcategoryModel->save($stdcat);

            ////////////////////////CREATE ACTIVITY LOG//////////////
            $log_data = [
                'user_id' => session()->get('id'),
                'action' => 'New student category (' . strip_tags($this->request->getVar('stdcategory')) . ') is added.',
                'ip' => get_client_ip(),
                'mac' => GetMAC(),
                'created_at' => now_time(session()->get('id')),
                'updated_at' => now_time(session()->get('id')),
                'company_id' => company(session()->get('id')),
            ];

            add_log($log_data);
            ////////////////////////END ACTIVITY LOG/////////////////

            $session = session();
            $session->setFlashdata('pu_msg', 'Category added successfully');
            return redirect()->to(base_url('settings/caste_category'));
        } else {
            return redirect()->to(base_url());
        }
    }


    public function edit_caste_category($cat_id = 0)
    {
        $StudentcategoryModel = new StudentcategoryModel();


        if ($this->request->getMethod() == 'post') {

            $stdcat = [
                'category_name' => strip_tags($this->request->getVar('stdcategory')),

            ];

            $StudentcategoryModel->update($cat_id, $stdcat);

            ////////////////////////CREATE ACTIVITY LOG//////////////
            $log_data = [
                'user_id' => session()->get('id'),
                'action' => 'Student category (#' . $cat_id . ') is updated.',
                'ip' => get_client_ip(),
                'mac' => GetMAC(),
                'created_at' => now_time(session()->get('id')),
                'updated_at' => now_time(session()->get('id')),
                'company_id' => company(session()->get('id')),
            ];

            add_log($log_data);
            ////////////////////////END ACTIVITY LOG/////////////////

            $session = session();
            $session->setFlashdata('pu_msg', 'Category updated successfully');
            return redirect()->to(base_url('settings/caste_category'));
        } else {
            return redirect()->to(base_url());
        }
    }

    public function deletestdcat($cat_id = 0)
    {
        $StudentcategoryModel = new StudentcategoryModel();


        if ($this->request->getMethod() == 'post') {

            $StudentcategoryModel->find($cat_id);

            $stdcat = [
                'deleted' => 1,

            ];

            $StudentcategoryModel->update($cat_id, $stdcat);

            ////////////////////////CREATE ACTIVITY LOG//////////////
            $log_data = [
                'user_id' => session()->get('id'),
                'action' => 'Student category (#' . $cat_id . ') is deleted.',
                'ip' => get_client_ip(),
                'mac' => GetMAC(),
                'created_at' => now_time(session()->get('id')),
                'updated_at' => now_time(session()->get('id')),
                'company_id' => company(session()->get('id')),
            ];

            add_log($log_data);
            ////////////////////////END ACTIVITY LOG/////////////////



        } else {
            return redirect()->to(base_url('settings/caste_category'));
        }
    }



    public function add_caste_sub_category()
    {
        $StudentcategoryModel = new StudentcategoryModel();


        if ($this->request->getMethod() == 'post') {
            $myid = session()->get('id');

            $stdcat = [
                'company_id' => company($myid),
                'parent_id' => strip_tags($this->request->getVar('stdcategory')),
                'category_name' => strip_tags($this->request->getVar('stdsubcategory')),
                'deleted' => 0,
                'type' => 'sub',
            ];

            $StudentcategoryModel->save($stdcat);


            ////////////////////////CREATE ACTIVITY LOG//////////////
            $log_data = [
                'user_id' => session()->get('id'),
                'action' => 'New student sub category (' . strip_tags($this->request->getVar('stdsubcategory')) . ') is added.',
                'ip' => get_client_ip(),
                'mac' => GetMAC(),
                'created_at' => now_time(session()->get('id')),
                'updated_at' => now_time(session()->get('id')),
                'company_id' => company(session()->get('id')),
            ];

            add_log($log_data);
            ////////////////////////END ACTIVITY LOG/////////////////

            $session = session();
            $session->setFlashdata('pu_msg', 'Sub category added successfully!');
            return redirect()->to(base_url('settings/caste_category'));
        } else {
            return redirect()->to(base_url('settings/caste_category'));
        }
    }


    public function edit_caste_sub_category($subcat_id = 0)
    {
        $StudentcategoryModel = new StudentcategoryModel();


        if ($this->request->getMethod() == 'post') {

            $stdcat = [
                'parent_id' => strip_tags($this->request->getVar('stdcategory')),
                'category_name' => strip_tags($this->request->getVar('stdsubcategory')),

            ];

            $StudentcategoryModel->update($subcat_id, $stdcat);

            ////////////////////////CREATE ACTIVITY LOG//////////////
            $log_data = [
                'user_id' => session()->get('id'),
                'action' => 'Student sub category (#' . $subcat_id . ') is updated.',
                'ip' => get_client_ip(),
                'mac' => GetMAC(),
                'created_at' => now_time(session()->get('id')),
                'updated_at' => now_time(session()->get('id')),
                'company_id' => company(session()->get('id')),
            ];

            add_log($log_data);
            ////////////////////////END ACTIVITY LOG/////////////////

            $session = session();
            $session->setFlashdata('pu_msg', 'Sub category updated successfully!');
            return redirect()->to(base_url('settings/caste_category'));
        } else {
            return redirect()->to(base_url('settings/caste_category'));
        }
    }


    public function deletestdsubcat($subcat_id = 0)
    {
        $StudentcategoryModel = new StudentcategoryModel();


        if ($this->request->getMethod() == 'post') {

            $StudentcategoryModel->find($subcat_id);

            $stdcat = [
                'deleted' => 1,

            ];

            $StudentcategoryModel->update($subcat_id, $stdcat);

            ////////////////////////CREATE ACTIVITY LOG//////////////
            $log_data = [
                'user_id' => session()->get('id'),
                'action' => 'Student sub category (#' . $subcat_id . ') is deleted.',
                'ip' => get_client_ip(),
                'mac' => GetMAC(),
                'created_at' => now_time(session()->get('id')),
                'updated_at' => now_time(session()->get('id')),
                'company_id' => company(session()->get('id')),
            ];

            add_log($log_data);
            ////////////////////////END ACTIVITY LOG/////////////////


        } else {
            return redirect()->to(base_url('settings/students'));
        }
    }



    public function payment_gateway()
    {
        $session = session();
        $user = new UserModel();
        $myid = session()->get('id');
        $CompanySettings = new CompanySettings();

        if ($session->has('isLoggedIn')) {
            $usaerdata = $user->where('id', session()->get('id'))->first();

            if (app_status(company($myid)) == 0) {
                return redirect()->to(base_url('app_error'));
            }

            if (user_data(session()->get('id'), 'activated_financial_year') < 1) {
                return redirect()->to(base_url('settings/financial_years'));
            }

            $data = [
                'title' => 'Payment Gate way | Erudite ERP',
                'user' => $usaerdata,

            ];



            echo view('header', $data);
            echo view('settings/payment_gateway', $data);
            echo view('footer');
        } else {
            return redirect()->to(base_url('users'));
        }
    }


    public function save_paymentway($orgid = "")
    {
        if ($this->request->getMethod() == 'post') {
            $CompanySettings = new CompanySettings();

            $UserModel = new UserModel();
            $session = session();
            $myid = session()->get('id');
            $cquery = $CompanySettings->where('company_id', company($myid))->first();

            $org_data = [
                'enable_payment' => $this->request->getVar('enable_payment'),
                'api_key' => $this->request->getVar('api_key'),
                'security_key' => $this->request->getVar('security_key'),
                // 'gate_way' => $cquery

            ];
            $uporg = $CompanySettings->update($orgid, $org_data);

            echo $this->request->getVar('api_key');

            ////////////////////////CREATE ACTIVITY LOG//////////////
            $log_data = [
                'user_id' => session()->get('id'),
                'action' => 'Payments setting is updated.',
                'ip' => get_client_ip(),
                'mac' => GetMAC(),
                'created_at' => now_time(session()->get('id')),
                'updated_at' => now_time(session()->get('id')),
                'company_id' => company(session()->get('id')),
            ];

            add_log($log_data);

            ////////////////////////END ACTIVITY LOG/////////////////
        }
    }


    public function academic_year()
    {
        $session = session();
        $user = new UserModel();
        $AcademicYearModel = new AcademicYearModel();
        $myid = session()->get('id');

        if ($session->has('isLoggedIn')) {
            $usaerdata = $user->where('id', session()->get('id'))->first();

            if (app_status(company($myid)) == 0) {
                return redirect()->to(base_url('app_error'));
            }

            if (user_data(session()->get('id'), 'activated_financial_year') < 1) {
                return redirect()->to(base_url('settings/financial_years'));
            }


            if (check_permission($myid, 'manage_academic_year') == true || usertype($myid) == 'admin') {
            } else {
                return redirect()->to(base_url('app_error/permission_denied'));
            }

            $ac_years = $AcademicYearModel->where('company_id', company($myid))->where('deleted', 0)->orderby('id', 'desc')->findAll();

            $data = [
                'title' => 'Academic Year settings | Erudite ERP',
                'user' => $usaerdata,
                'academic_years' => $ac_years
            ];

            if (is_school(company($myid))) {

                echo view('header', $data);
                echo view('settings/academic_year', $data);
                echo view('footer');

                if ($this->request->getMethod() == 'post') {

                    if ($this->request->getVar('academic_yearfrom')) {
                        $acyear = $this->request->getVar('academic_yearfrom') . '-' . $this->request->getVar('academic_yearto');

                        $acdata = [
                            'company_id' => company($myid),
                            'year' => $acyear
                        ];

                        if ($AcademicYearModel->save($acdata)) {

                            $insert_id = $AcademicYearModel->insertID();

                            $swdata = [
                                'activated_academic' => $insert_id
                            ];
                            $user->update($myid, $swdata);

                            ////////////////////////CREATE ACTIVITY LOG//////////////
                            $log_data = [
                                'user_id' => session()->get('id'),
                                'action' => 'New academic year  <b>' . $acyear . '</b> added.',
                                'ip' => get_client_ip(),
                                'mac' => GetMAC(),
                                'created_at' => now_time(session()->get('id')),
                                'updated_at' => now_time(session()->get('id')),
                                'company_id' => company(session()->get('id')),
                            ];

                            add_log($log_data);
                            ////////////////////////END ACTIVITY LOG/////////////////

                            $session->setFlashdata('pu_msg', ' New academic year <b>' . $acyear . '</b> added successfully!');
                            return redirect()->to(base_url('settings/academic_year'));
                        } else {
                            $session->setFlashdata('pu_er_msg', ' Failed!');
                            return redirect()->to(base_url('settings/academic_year'));
                        }
                    }
                }
            } else {
                return redirect()->to(base_url());
            }
        } else {
            return redirect()->to(base_url('users'));
        }
    }

    public function delete_academic_year($scid = '')
    {
        if (!empty($scid)) {
            $session = session();
            $user = new UserModel();
            $AcademicYearModel = new AcademicYearModel();
            $myid = session()->get('id');

            if ($session->has('isLoggedIn')) {
                $usaerdata = $user->where('id', session()->get('id'))->first();


                if (app_status(company($myid)) == 0) {
                    return redirect()->to(base_url('app_error'));
                }

                $deldata = [
                    'deleted' => 1
                ];

                if ($AcademicYearModel->update($scid, $deldata)) {

                    ////////////////////////CREATE ACTIVITY LOG//////////////
                    $log_data = [
                        'user_id' => session()->get('id'),
                        'action' => 'Academic year <b>(#' . $scid . ')</b> is deleted.',
                        'ip' => get_client_ip(),
                        'mac' => GetMAC(),
                        'created_at' => now_time(session()->get('id')),
                        'updated_at' => now_time(session()->get('id')),
                        'company_id' => company(session()->get('id')),
                    ];

                    add_log($log_data);
                    ////////////////////////END ACTIVITY LOG/////////////////

                    $session->setFlashdata('pu_msg', 'Deleted!');
                    return redirect()->to(base_url('settings/academic_year'));
                }
            } else {
                return redirect()->to(base_url('users'));
            }
        } else {
            return redirect()->to(base_url());
        }
    }

    public function edit_academic_year($scid = '')
    {
        if (!empty($scid)) {
            $session = session();
            $user = new UserModel();
            $AcademicYearModel = new AcademicYearModel();
            $myid = session()->get('id');

            if ($session->has('isLoggedIn')) {
                $usaerdata = $user->where('id', session()->get('id'))->first();


                if (app_status(company($myid)) == 0) {
                    return redirect()->to(base_url('app_error'));
                }

                if (user_data(session()->get('id'), 'activated_financial_year') < 1) {
                    return redirect()->to(base_url('settings/financial_years'));
                }

                $ac_years = $AcademicYearModel->where('company_id', company($myid))->where('deleted', 0)->orderby('id', 'desc')->findAll();


                if ($this->request->getMethod() == 'post') {

                    if ($this->request->getVar('academic_yearfrom')) {
                        $acyear = $this->request->getVar('academic_yearfrom') . '-' . $this->request->getVar('academic_yearto');

                        $acdata = [
                            'year' => $acyear
                        ];

                        if ($AcademicYearModel->update($scid, $acdata)) {
                            ////////////////////////CREATE ACTIVITY LOG//////////////
                            $log_data = [
                                'user_id' => session()->get('id'),
                                'action' => 'Academic year <b>' . $acyear . '</b> is modified.',
                                'ip' => get_client_ip(),
                                'mac' => GetMAC(),
                                'created_at' => now_time(session()->get('id')),
                                'updated_at' => now_time(session()->get('id')),
                                'company_id' => company(session()->get('id')),
                            ];

                            add_log($log_data);
                            ////////////////////////END ACTIVITY LOG/////////////////
                            $session->setFlashdata('pu_msg', 'Academic year <b>' . $acyear . '</b> saved successfully!');
                            return redirect()->to(base_url('settings/academic_year'));
                        }
                    }
                }
            } else {
                return redirect()->to(base_url('users'));
            }
        } else {
            return redirect()->to(base_url());
        }
    }

    public function change_academic_year($scid = '')
    {
        if (!empty($scid)) {
            $session = session();
            $UserModel = new UserModel();
            $AcademicYearModel = new AcademicYearModel();
            $companies = new Companies();
            $myid = session()->get('id');



            if ($session->has('isLoggedIn')) {
                $usaerdata = $UserModel->where('id', session()->get('id'))->first();


                if (app_status(company($myid)) == 0) {
                    return redirect()->to(base_url('app_error'));
                }

                if (user_data(session()->get('id'), 'activated_financial_year') < 1) {
                    return redirect()->to(base_url('settings/financial_years'));
                }

                $actdata = [
                    'academic_year' => $scid
                ];

                if ($companies->update(company($myid), $actdata)) {
                    $swdata = [
                        'activated_academic' => $scid
                    ];
                    $UserModel->update($myid, $swdata);

                    ////////////////////////CREATE ACTIVITY LOG//////////////
                    $log_data = [
                        'user_id' => session()->get('id'),
                        'action' => 'Academic year  <b>(#' . $scid . ')</b> is activated.',
                        'ip' => get_client_ip(),
                        'mac' => GetMAC(),
                        'created_at' => now_time(session()->get('id')),
                        'updated_at' => now_time(session()->get('id')),
                        'company_id' => company(session()->get('id')),
                    ];

                    add_log($log_data);
                    ////////////////////////END ACTIVITY LOG/////////////////
                    $session->setFlashdata('pu_msg', 'Academic year activated!');
                    return redirect()->to(base_url('settings/academic_year'));
                }
            } else {
                return redirect()->to(base_url('users'));
            }
        } else {
            return redirect()->to(base_url());
        }
    }




    public function invoice_settings($invoice_type = "sales")
    {

        $session = session();

        if ($session->has('isLoggedIn')) {

            $UserModel = new UserModel;
            $InvoiceSettings = new InvoiceSettings;

            $myid = session()->get('id');
            $con = array(
                'id' => session()->get('id')
            );
            $user = $UserModel->where('id', $myid)->first();

            if (app_status(company($myid)) == 0) {
                return redirect()->to(base_url('app_error'));
            }

            if (user_data(session()->get('id'), 'activated_financial_year') < 1) {
                return redirect()->to(base_url('settings/financial_years'));
            }



            $cquery = $InvoiceSettings->where('company_id', company($myid))->first();


            $data = [
                'title' => 'Invoice Settings',
                'user' => $user,
                'c_set' => $cquery,
                'invoice_type' => $invoice_type
            ];

            echo view('header', $data);
            echo view('invoices/invoice_settings');
            echo view('footer');
        } else {
            return redirect()->to(base_url('users/login'));
        }
    }




    public function get_form($invoice_type = "sales")
    {
        $UserModel = new UserModel();
        $InvoiceSettings = new InvoiceSettings();
        $myid = session()->get('id');

        $data = [
            'title' => 'Invoice Settings - SpriteGenix ERP',
            'user' => $UserModel->where('id', session()->get('id'))->first(),
            'invoice_type' => $invoice_type

        ];

        $session = session();

        if ($session->has('isLoggedIn')) {
            echo view('invoices/invoice_setting_form', $data);
        }
    }



    public function save_invoice_settings($invoice_type)
    {
        $session = session();

        $myid = session()->get('id');
        $con = array(
            'id' => session()->get('id')
        );
        $UserModel = new UserModel;
        $InvoiceSettings = new InvoiceSettings;
        $CompanySettings2 = new CompanySettings2;
        $CompanySettings = new CompanySettings;



        if ($this->request->getMethod('post')) {

            $finalfile_invoice_header = '';
            $finalfile_invoice_signature = '';
            // $finalfile_payslip_signature='';
            $finalfile_invoice_seal = '';
            $finalfile_invoice_qr_code = '';

            // if (!empty($_FILES['payslip_signature']['name'])) {
            //     $target_dir = "public/images/company_docs/";
            //     $target_file = $target_dir . time().basename($_FILES["payslip_signature"]["name"]);
            //     $imageFileType = pathinfo($target_file,PATHINFO_EXTENSION);
            //     $finalfile_payslip_signature = time().basename($_FILES["payslip_signature"]["name"]);
            //     move_uploaded_file($_FILES["payslip_signature"]["tmp_name"], $target_file);
            // }else{
            //     $finalfile_payslip_signature=strip_tags($this->request->getVar('old_payslip_signature'));
            // }

            if (!empty($_FILES['invoice_header']['name'])) {
                $target_dir = "public/images/company_docs/";
                $target_file = $target_dir . time() . basename($_FILES["invoice_header"]["name"]);
                $imageFileType = pathinfo($target_file, PATHINFO_EXTENSION);
                $finalfile_invoice_header = time() . basename($_FILES["invoice_header"]["name"]);
                move_uploaded_file($_FILES["invoice_header"]["tmp_name"], $target_file);
            } else {
                $finalfile_invoice_header = strip_tags($this->request->getVar('old_invoice_header'));
            }

            if (!empty($_FILES['invoice_signature']['name'])) {
                $target_dir = "public/images/company_docs/";
                $target_file = $target_dir . time() . basename($_FILES["invoice_signature"]["name"]);
                $imageFileType = pathinfo($target_file, PATHINFO_EXTENSION);
                $finalfile_invoice_signature = time() . basename($_FILES["invoice_signature"]["name"]);
                move_uploaded_file($_FILES["invoice_signature"]["tmp_name"], $target_file);
            } else {
                $finalfile_invoice_signature = strip_tags($this->request->getVar('old_invoice_signature'));
            }

            if (!empty($_FILES['invoice_seal']['name'])) {
                $target_dir = "public/images/company_docs/";
                $target_file = $target_dir . time() . basename($_FILES["invoice_seal"]["name"]);
                $imageFileType = pathinfo($target_file, PATHINFO_EXTENSION);
                $finalfile_invoice_seal = time() . basename($_FILES["invoice_seal"]["name"]);
                move_uploaded_file($_FILES["invoice_seal"]["tmp_name"], $target_file);
            } else {
                $finalfile_invoice_seal = strip_tags($this->request->getVar('old_invoice_seal'));
            }

            if (!empty($_FILES['invoice_qr_code']['name'])) {
                $target_dir = "public/images/company_docs/";
                $target_file = $target_dir . time() . basename($_FILES["invoice_qr_code"]["name"]);
                $imageFileType = pathinfo($target_file, PATHINFO_EXTENSION);
                $finalfile_invoice_qr_code = time() . basename($_FILES["invoice_qr_code"]["name"]);
                move_uploaded_file($_FILES["invoice_qr_code"]["tmp_name"], $target_file);
            } else {
                $finalfile_invoice_qr_code = strip_tags($this->request->getVar('old_invoice_qr_code'));
            }

            $ac_data = [
                'company_id' => company($myid),
                'invoice_footer' => strip_tags($this->request->getVar('invoice_footer')),
                'invoice_declaration' => strip_tags($this->request->getVar('invoice_declaration')),
                'invoice_terms' => strip_tags($this->request->getVar('invoice_terms')),
                'invoice_template' => strip_tags($this->request->getVar('invoice_temp')),
                'receipt_template' => strip_tags($this->request->getVar('receipt_temp')),
                'show_batch_no' => strip_tags($this->request->getVar('show_batch_no')),
                'show_pro_desc' => strip_tags($this->request->getVar('show_pro_desc')),
                'show_price' => strip_tags($this->request->getVar('show_price')),
                'show_tax' => strip_tags($this->request->getVar('show_tax')),
                'show_discount' => strip_tags($this->request->getVar('show_discount')),
                'show_quantity' => strip_tags($this->request->getVar('show_quantity')),
                'show_logo' => strip_tags($this->request->getVar('show_logo')),
                'show_header' => strip_tags($this->request->getVar('show_header')),
                'show_invoice_header' => strip_tags($this->request->getVar('show_invoice_header')),
                'show_bill_number' => strip_tags($this->request->getVar('show_bill_number')),
                'show_amount' => strip_tags($this->request->getVar('show_amount')),
                'show_expiry_date' => strip_tags($this->request->getVar('show_expiry_date')),
                'show_due_date' => strip_tags($this->request->getVar('show_due_date')),
                'show_qr_code' => strip_tags($this->request->getVar('show_qr_code')),
                'show_bank_details' => strip_tags($this->request->getVar('show_bank_details')),
                'show_footer' => strip_tags($this->request->getVar('show_footer')),
                'show_declaration' => strip_tags($this->request->getVar('show_declaration')),
                'show_terms' => strip_tags($this->request->getVar('show_terms')),
                'show_seal' => strip_tags($this->request->getVar('show_seal')),
                'show_signature' => strip_tags($this->request->getVar('show_signature')),
                // 'show_payslip_signature'=>strip_tags($this->request->getVar('show_payslip_signature')),
                'show_date' => strip_tags($this->request->getVar('show_date')),
                'show_bill_to' => strip_tags($this->request->getVar('show_bill_to')),
                'show_customer_address' => strip_tags($this->request->getVar('show_customer_address')),
                // 'show_head'=>strip_tags($this->request->getVar('show_head')),
                'invoice_header' => $finalfile_invoice_header,
                'invoice_signature' => $finalfile_invoice_signature,
                // 'payslip_signature'=>$finalfile_payslip_signature, 
                'invoice_seal' => $finalfile_invoice_seal,
                'invoice_qr_code' => $finalfile_invoice_qr_code,
                'bank_details' => strip_tags($this->request->getVar('bank_details')),
                'upi' => strip_tags($this->request->getVar('upi')),
                'show_uom' => strip_tags($this->request->getVar('show_uom')),
                'show_hsncode_no' => strip_tags($this->request->getVar('show_hsncode_no')),
                'taxnumber' => strip_tags($this->request->getVar('taxnumber')),
                'tinnumber' => strip_tags($this->request->getVar('tinnumber')),
                'show_mrn_num' => strip_tags($this->request->getVar('show_mrn_num')),
                'show_validity' => strip_tags($this->request->getVar('show_validity')),
                'billing_style' => strip_tags($this->request->getVar('billing_style')),
                'cursor_position' => strip_tags($this->request->getVar('cursor_position')),
                'round_off' => strip_tags($this->request->getVar('round_off')),
                'mode_of_payment' => strip_tags($this->request->getVar('mode_of_payment')),
                'due_amount' => strip_tags($this->request->getVar('due_amount')),
                'invoice_num' => strip_tags($this->request->getVar('invoice_num')),
                'show_tax_tin_num' => strip_tags($this->request->getVar('show_tax_tin_num')),
                'show_reciver_sign' => strip_tags($this->request->getVar('show_reciver_sign')),
                'show_vehicle_number' => strip_tags($this->request->getVar('show_vehicle_number')),
                'show_business_name' => strip_tags($this->request->getVar('show_business_name')),
                'show_business_address' => strip_tags($this->request->getVar('show_business_address')),
                'show_tax_details' => strip_tags($this->request->getVar('show_tax_details')),
                'invoice_type' => $invoice_type,


            ];

            // echo $invoice_type;

            $check_type = $InvoiceSettings->where('company_id', company($myid))->where('invoice_type', $invoice_type)->first();
            if (!$check_type) {
                $update_user = $InvoiceSettings->save($ac_data);
            } else {
                $update_user = $InvoiceSettings->update(get_invoicesetting(company($myid), $invoice_type, 'id'), $ac_data);
            }

            $com_data = [
                'Invoice_color' => strip_tags($this->request->getVar('invoice_color')),
                'invoice_font_color' => strip_tags($this->request->getVar('invoice_font_color')),
                'show_validity' => strip_tags($this->request->getVar('show_validity')),
                'show_mrn_number' => strip_tags($this->request->getVar('show_mrn_number')),
                'invoice_template' => strip_tags($this->request->getVar('invoice_temp')),
            ];
            $compa_data = $CompanySettings->update(get_setting(company($myid), 'id'), $com_data);


            $inv_data = [
                'invoice_page_size' => strip_tags($this->request->getVar('invoice_page_size')),
                'invoice_orientation' => strip_tags($this->request->getVar('invoice_orientation')),

            ];
            $update_data = $CompanySettings2->update(get_setting2(company($myid), 'id'), $inv_data);


            if ($update_user && $update_data && $compa_data) {
                ////////////////////////CREATE ACTIVITY LOG//////////////
                $log_data = [
                    'user_id' => $myid,
                    'action' => 'Company/branch (#' . company($myid) . ') <b>' . my_company_name(company($myid)) . '</b> invoice settings updated.',
                    'ip' => get_client_ip(),
                    'mac' => GetMAC(),
                    'created_at' => now_time($myid),
                    'updated_at' => now_time($myid),
                    'company_id' => company($myid),
                ];

                add_log($log_data);
                ////////////////////////END ACTIVITY LOG/////////////////
                session()->setFlashdata('pu_msg', 'Saved!');
                return redirect()->to(base_url('invoice_settings/' . $invoice_type));
            } else {
                session()->setFlashdata('pu_er_msg', 'Failed to save!');
                return redirect()->to(base_url('invoice_settings/' . $invoice_type));
            }
        }
    }
}
