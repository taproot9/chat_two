<?php

namespace App\Http\Controllers;

use App\Chat;
use App\Friend;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ChatController extends Controller
{

    public function index()
    {
        $friends = Auth::user()->friends();
        return view('chat.index', compact('friends'));
    }


    public function create()
    {
        //
    }


    public function store(Request $request)
    {
        //validate

        //add to db
        $friend = new Friend();
        $friend->user_id = Auth::user()->id;
        $friend->friend_id = $request->friend_id;
        $friend->save();

        //
        Session::flash('success', 'Friend has been added');

        return redirect()->back();
    }


    public function show($id)
    {
        $friend = User::find($id);
        return view('chat.show', compact('friend'));
    }

    public function edit(Chat $chat)
    {
    }


    public function update(Request $request, Chat $chat)
    {
    }


    public function destroy(Chat $chat)
    {
    }

    public function getChat($id){

       $chats =  Chat::where(function ($query) use ($id){
            $query->where('user_id', '=', Auth::user()->id)
                ->where('friend_id', '=', $id);
        })->orWhere(function ($query) use ($id){
            $query->where('user_id', '=', $id)
                ->where('friend_id', '=', Auth::user()->id);
        })->get();

        return $chats;
    }

    public function sendChat(Request $request){
        Chat::create([
            'user_id'=> $request->user_id,
            'friend_id' => $request->friend_id,
            'chat' => $request->chat
        ]);
        return [];
    }

}
