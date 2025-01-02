<?php

namespace App\Controllers;

use App\Models\UserModel;
use App\Models\PaymentsModel;
use App\Models\Classtablemodel;
use App\Models\InvoiceModel;
use App\Models\FeesModel;


class Users extends BaseController
{

    protected $Aclibrary;

    public function index()
    {
        return redirect()->to(base_url('users/login'));
    }

    public function login()
    {
        $data = [];
        helper(['form']);

        if ($this->request->getMethod() == 'post') {

            $session = session();

            if (!$session->has('isLoggedIn')) {

                $email = $this->request->getVar('email');
                $password = $this->request->getVar('password');

                $model = new UserModel();
                $user = $model->where('email', $email)->first();

                if ($user && $user['password'] === $password) { // Simple password check
                    $this->setUserSession($user);

                    return redirect()->to(base_url());
                } else {
                    session()->setFlashdata('failmsg', 'Invalid email or password.');
                    return redirect()->to(base_url('users/login'));
                }
            } else {
                return redirect()->to(base_url());
            }
        }

        $data['title'] = "Login | SpriteGenix ERP";

        $session = session();
        if (!$session->has('isLoggedIn')) {
            echo view('users/login', $data);
        } else {
            return redirect()->to(base_url());
        }
    }




    private function setUserSession($user)
    {
        $data = [
            'id' => $user['id'],
            'first_name' => $user['firstname'],
            'lastn_ame' => $user['lastname'],
            'email' => $user['email'],
            'isLoggedIn' => true,
            'user_token' => user_token(),

        ];

        session()->set($data);
        return true;
    }

    public function logout()
    {
        session()->destroy();
        return redirect()->to(base_url('users'));
    }
}
