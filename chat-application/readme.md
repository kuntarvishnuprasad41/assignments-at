# Chat App Realtime

This is the WebApp created for real-time chat 


PORT failsafe : 8000


The application has front-end in views folder
users are handeled in /utils/users


## Chat Options - Socket.io

| Key | Description |
| --- | --- |
| connection | When user is connected|
| joinRoom | To join a particular room  |
| message | Send message to room joined by user |
| roomUsers | List of users in particular room |
| disconnect | User leaving the chat |
| chatMessage | Listening to particular message |



## User Schema
```
   {
        id,
        username,
        room
    }

```

## Message Schema
```
    {
        username,
        text,
        time
    }

```
