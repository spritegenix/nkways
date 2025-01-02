<?php namespace App\Models;
use CodeIgniter\Model;

class SocialMediaModel extends Model{
  protected $table = 'social_medias';
  protected $allowedFields = ['company_id','name','link','class','userid','token'];

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