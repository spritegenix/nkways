<?php

namespace App\Models;

use CodeIgniter\Model;

class ReviewsModel extends Model
{
  protected $table = 'reviews';
  protected $allowedFields = ['profile_pic', 'user_name', 'designation', 'ratings', 'review'];

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
