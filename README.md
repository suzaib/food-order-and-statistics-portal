This is the food and beverages portal designed for Mood Indigo 2024, but wasn't implemented due to some unavoidable reasons.<br/>
First create a database with the documents that are provided. <br/>
The passwords for admin and vendor are given.<br/>
Only the admin can place order.<br/>
Admin Credentials are in the users.json file with role admin and their password is POC123 (same for all) <br/>
Vendor can only see his own statistics and history.<br/>
Admin can see history of all orders and their statistics.<br/>
<hr/>
Create an env file with the following:<br/>
MONGO_URI=#Your Mongo DB URL<br/>
JWT_SECRET=#Your JWT Secret<br/>
PORT=#Port<br/>
<hr/>
users.json contains database of all users and vedors.<br/>
<hr/>
