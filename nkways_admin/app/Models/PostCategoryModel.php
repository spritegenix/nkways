<?php namespace App\Models;

use CodeIgniter\Model;

class PostCategoryModel extends Model{
  protected $table = 'post_categories';
  protected $allowedFields = ['category_name','slug','parent','company_id'];

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