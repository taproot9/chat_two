<?php

namespace App;

use App\Events\BroadcastChat;
use Illuminate\Database\Eloquent\Model;

class Chat extends Model
{
    protected $fillable = [
        'user_id',
        'friend_id',
        'chat'
    ];

    protected $dispatchesEvents = [
        'created' => BroadcastChat::class
    ];
}
