# localhost endpoints 

- Register : http://localhost:5000/api/auth/register
- Login : http://localhost:5000/api/auth/login
- Forgot Password : http://localhost:5000/api/auth/forgot-password
- Reset Password : http://localhost:5000/api/auth/reset-password?token=24ac2818ffd9cb57c81731df7c08f633 // this link will be provided on email after sending request on forgot-password api endpoint
you need to provide {"newPassword" : "new password"} in json format for reset the password

# Deployment endpoints

- Register : https://banao-node-js-backend-apis.vercel.app/api/auth/register
- Login : https://banao-node-js-backend-apis.vercel.app/api/auth/login
- Forgot Password : https://banao-node-js-backend-apis.vercel.app/api/auth/forgot-password
- - Reset Password : https://banao-node-js-backend-apis.vercel.app/api/auth/reset-password?token=24ac2818ffd9cb57c81731df7c08f633 // this link will be provided on email after sending request on forgot-password api endpoint



## Example Json Data to Pass the api

## Register : Method : POST
Body -> raw -> JSON data -> 
{
    "username": "user1",
    "email": "Provide-Your-Email",     
    "password": "password123"
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

## Reset Password : Method : POST
Body -> raw -> JSON data -> 
{
    "newPassword": "Provide-Your-new Password"
}
## Support

For support, email sahilkarnekar.sit.it@gmail.com
#### Mob: 7875632522 
