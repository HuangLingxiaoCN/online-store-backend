# Online Store Backend

This is one part of my online store project which is developed for my thesis in university. The project can be used to buy and sell products and
users can create their accounts with email verification. Items can be added to user's shopping cart.
When users want to check out the items in shopping cart, they are able to place orders from cart page.

## General Info

This project is built as a backend to provide REST APIs and store project data in database for the frontend client application.



## Tech Stack

- TypeScript
- Node
- Express
- MongoDB Atlas
- JWT (Jason Web Token)
- Nodemailer


## API Reference
API endpoint: https://fierce-spring-store-backend.herokuapp.com

#### Get all users

```
  GET /api/user
```

#### Get all products

```
  GET /api/products
```

#### Authentication

```
  GET /api/auth
```

| body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `email`, `password`      | `JSON object` | **Required**. User credentials |

#### New User Registration

```
  POST /api/user
```

| body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `name`, `email`, `password`      | `JSON object` | **Required**. User information |
