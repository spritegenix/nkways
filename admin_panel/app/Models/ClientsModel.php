<?php namespace App\Models;

use CodeIgniter\Model;

class ClientsModel extends Model{
  protected $table = 'clients';
  protected $allowedFields = [ 'company_id', 'client_logo', 'client_name', 'url'];

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

