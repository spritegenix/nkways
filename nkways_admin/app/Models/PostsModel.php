<?php

namespace App\Models;

use CodeIgniter\Model;

class PostsModel extends Model
{
  protected $table = 'posts';
  protected $allowedFields = [
    'id',
    'company_id',
    'title',
    'post_type',
    'category',
    'short_description',
    'description',
    'meta_keyword',
    'meta_description',
    'featured',
    'file_type',
    'alt',
    'status',
    'datetime',
    'slug',
    'posted_by',
    'category_slug'
  ];

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
