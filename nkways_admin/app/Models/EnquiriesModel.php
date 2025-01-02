<?php

namespace App\Models;

use CodeIgniter\Model;

class EnquiriesModel extends Model
{
    protected $table = 'enquiry';
    protected $allowedFields = ['company_id', 'name', 'email', 'message', 'datetime', 'deleted','phone','subject','notified','enquiry_type'];

    protected $beforeInsert = ['beforeInsert'];
    protected $beforeUpdate = ['beforeUpdate'];

    protected function beforeInsert(array $data){ 
      $data['data']['company_id'] = COMPANY_ID;  
      return $data;
    }

    protected function beforeUpdate(array $data){
      $data['data']['company_id'] = COMPANY_ID;  
      return $data;
    } 
}
    
