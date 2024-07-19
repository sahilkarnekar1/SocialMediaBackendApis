# localhost endpoints 

- Register : http://localhost:5000/api/auth/register
- Login : http://localhost:5000/api/auth/login
- Forgot Password : http://localhost:5000/api/auth/forgot-password
- Create Post : http://localhost:5000/api/posts
- Get All Posts Of The User : http://localhost:5000/api/posts
- Update Post : http://localhost:5000/api/posts/Paste_Post_Id_Here_From_Database
- Delete Post : http://localhost:5000/api/posts/Paste_Post_Id_Here_From_Database
- Follow User : http://localhost:5000/api/posts/follow/Paste_User_Id_Here_From_Database
- Get All Following Users Posts : http://localhost:5000/api/posts/followed
- Like a Post : http://localhost:5000/api/posts/Paste_Post_Id_Here_From_Database/like
- Comment on post : http://localhost:5000/api/posts/Paste_Post_Id_Here_From_Database/comment



## Note : Deployed Endpoints can not work for create update or delete post because the project is hosted on vercel.com and vercel have read-only file system thats why i am not able to write files on backend but this functionality can be achive using AWS cloud storage or any other read and write file system.
you can test the endpoints locally only 

# Deployment endpoints

- Register : https://banao-node-js-backend-apis.vercel.app/api/auth/register
- Login : https://banao-node-js-backend-apis.vercel.app/api/auth/login
- Forgot Password : https://banao-node-js-backend-apis.vercel.app/api/auth/forgot-password
- Create Post : https://banao-node-js-backend-apis.vercel.app/api/posts
- Get All Posts Of The User : https://banao-node-js-backend-apis.vercel.app/api/posts
- Update Post : https://banao-node-js-backend-apis.vercel.app/api/posts/Paste_Post_Id_Here_From_Database
- Delete Post : https://banao-node-js-backend-apis.vercel.app/api/posts/Paste_Post_Id_Here_From_Database
- Follow User : https://banao-node-js-backend-apis.vercel.app/api/posts/follow/Paste_User_Id_Here_From_Database
- Get All Following Users Posts : https://banao-node-js-backend-apis.vercel.app/api/posts/followed
- Like a Post : https://banao-node-js-backend-apis.vercel.app/api/posts/Paste_Post_Id_Here_From_Database/like
- Comment on post : https://banao-node-js-backend-apis.vercel.app/api/posts/Paste_Post_Id_Here_From_Database/comment


## Example Json Data to Pass the api

## Register : Method : POST
Body -> raw -> JSON data -> 
{
    "username": "user1",
    "email": "Provide-Your-Email",      "password": "password123"
}

## Login : Method : POST
Body -> raw -> JSON data -> 
{
    "username":"Your-Username",
    "password":"Your-Password"
}

## Forgot Password : Method : POST
Body -> raw -> JSON data -> 
{
    "email": "Provide-Your-Registered-Email"
}

## Create Post : Method : POST
Headers : 
1. Content-Type = application/json
2. Key is userId = Value is Assuming user is logged in and id getting from frontend. for testing paste user id of the user who logged in and paste user id from database.
For Example : userId = 66966c1a10f05218b59d78de

Body -> form-data -> in key value pair -> 
1. heading = heading of post
2. description = description of post
3. image = image should be file type select file from local machine

## Get All Posts Of The User : Method : GET
Headers :
1. Key is userId = Value is Assuming user is logged in and id getting from frontend. for testing paste user id of the user who logged in and paste user id from database.
For Example : userId = 66966c1a10f05218b59d78de

## Update Post : Method : PUT
Headers :
1. Key is userId = Value is Assuming user is logged in and id getting from frontend. for testing paste user id of the user who logged in and paste user id from database.
For Example : userId = 66966c1a10f05218b59d78de

Body -> form-data -> in key value pair -> 
1. heading = update heading of post
2. description = update description of post
3. image = update image should be file type select file from local machine

## Delete Post : Method : DELETE
Headers :
1. Key is userId = Value is Assuming user is logged in and id getting from frontend. for testing paste user id of the user who logged in and paste user id from database.
For Example : userId = 66966c1a10f05218b59d78de

## Follow User : Method : POST
Headers :
1. Key is userId = Value is Assuming user is logged in and id getting from frontend. for testing paste user id of the user who logged in and paste user id from database.
For Example : userId = 66966c1a10f05218b59d78de

## Get All Following Users Posts : Method : GET
Headers :
1. Key is userId = Value is Assuming user is logged in and id getting from frontend. for testing paste user id of the user who logged in and paste user id from database.
For Example : userId = 66966c1a10f05218b59d78de

## Like a Post : Method : POST
Headers :
1. Key is userId = Value is Assuming user is logged in and id getting from frontend. for testing paste user id of the user who logged in and paste user id from database.
For Example : userId = 66966c1a10f05218b59d78de

## Comment on post : Method : POST
Headers :
1. Key is userId = Value is Assuming user is logged in and id getting from frontend. for testing paste user id of the user who logged in and paste user id from database.
For Example : userId = 66966c1a10f05218b59d78de

Body -> raw -> JSON data -> 
{
  "text": "Very Nice !"
}








## Support

For support, email sahilkarnekar.sit.it@gmail.com
#### Mob: 7875632522 
