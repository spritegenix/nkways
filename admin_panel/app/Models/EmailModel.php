<?php

namespace App\Models;

use CodeIgniter\Model;

class EmailModel extends Model
{
    protected $table = 'email_msg';
    protected $allowedFields = ['company_id', 'name', 'email', 'msg', 'datetime', 'mblno', 'subject', 'created_at'];

    protected $beforeInsert = ['beforeInsert'];
    protected $beforeUpdate = ['beforeUpdate'];

    protected function beforeInsert(array $data)
    {
        $data['data']['company_id'] = COMPANY_ID;
        return $data;
    }

    protected function beforeUpdate(array $data)
    {
        $data['data']['company_id'] = COMPANY_ID;
        return $data;
    }
}
