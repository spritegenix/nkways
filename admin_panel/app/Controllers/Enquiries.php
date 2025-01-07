<?php

namespace App\Controllers;
use App\Models\EnquiriesModel;
use App\Models\UserModel;

class Enquiries extends BaseController
{
    public function index()
    {
        $session=session();
        $UserModel=new UserModel;
        $EnquiriesModel=new EnquiriesModel;

        if ($session->has('isLoggedIn')){

            $myid=session()->get('id');
            $con = array( 
                'id' => session()->get('id') 
            );
            $user=$UserModel->where('id',$myid)->first();

            if (app_status(company($myid))==0) {return redirect()->to(base_url('app_error'));}

            if (user_data(session()->get('id'),'activated_financial_year')<1) {
                            return redirect()->to(base_url('settings/financial_years'));
                        }

            if (check_permission($myid,'manage_enquires')==true || usertype($myid) =='admin') {}else{return redirect()->to(base_url());}

            if (usertype($myid)=='customer') {
                return redirect()->to(base_url('customer_dashboard'));
            }


            $user_data=$EnquiriesModel->where('company_id',company($myid))->where('deleted',0)->findAll();

            




            $data=[
                'title'=>'Manage Enquiries',
                'user'=>$user,
                'user_data'=>$user_data,
            ];
            echo view('header',$data);
            echo view('enquiries/enquiries');
            echo view('footer');

        }
                
        
    }


    public function delete_enquiries($cid=""){
        $session=session();
        $myid=session()->get('id');
        $EnquiriesModel=new EnquiriesModel;

        $eq=$EnquiriesModel->where('id',$cid)->first();

        $data=[
            'deleted'=>1
        ];

        if ($EnquiriesModel->update($cid,$data)) {

             ////////////////////////CREATE ACTIVITY LOG//////////////
                $log_data=[
                    'user_id'=>$myid,
                    'action'=> 'Enquiry of <b>'.$eq['name'].'</b> is deleted.',
                    'ip'=>get_client_ip(),
                    'mac'=>GetMAC(),
                    'created_at'=>now_time($myid),
                    'updated_at'=>now_time($myid),
                    'company_id'=>company($myid),
                ];

                add_log($log_data);
                ////////////////////////END ACTIVITY LOG/////////////////


            $session->setFlashdata('pu_msg','Deleted!');
            return redirect()->to(base_url('enquiries'));
        }else{
            $session->setFlashdata('pu_er_msg','Failed to saved!');
            return redirect()->to(base_url('enquiries'));
        }
        
    }

}