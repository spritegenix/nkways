<?php namespace App\Models;



use CodeIgniter\Model;



class PostThumbnail extends Model{

  protected $table = 'post_thumbnails';

  protected $allowedFields = ['post_id','thumbnail'];

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