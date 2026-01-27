# Aura Market Backend Logic

Here are the step-by-step logic flows for how data is stored and verified.

## 1. Data Storage (MongoDB)
**File:** `models/User.js`

We define a "Schema" (Blueprint) for what a User looks like in our database.
- **Name**: String (Required)
- **Email**: String (Required, Unique) - This ensures no two users have the same email.
- **Password**: String (Required) - This is stored as a "Hash" (encrypted), not plain text.

## 2. User Registration (The "Store" Step)
**Route:** `POST /api/auth/register` (in `routes/auth.js`)

1.  **Receive Data**: Server gets `name`, `email`, `password` from the frontend.
2.  **Check Existence**: queries MongoDB (`User.findOne({ email })`) to see if the user is already there.
3.  **Hash Password**: Uses `bcryptjs` to scramble the password.
    *   Example: `password123` -> `$2a$10$C7...`
    *   *Why?* If hackers steal the database, they can't read the passwords.
4.  **Save**: Creates a new `User` object and runs `.save()` to store it in MongoDB.
5.  **Generate Token**: Creates a **JWT** (JSON Web Token) containing the user's ID.

## 3. Verification & Authentication (The "Verify" Step)
**Route:** `POST /api/auth/login` (in `routes/auth.js`)

1.  **Receive Credentials**: Server gets `email`, `password`.
2.  **Find User**: Looks up the user by email in MongoDB.
    *   If not found -> Error "Invalid Credentials".
3.  **Verify Password**: Uses `bcrypt.compare(inputPassword, storedHash)` to check if they match.
    *   It hashes the input and compares it to the stored hash.
    *   If no match -> Error "Invalid Credentials".
4.  **Issue Token**: If verified, issues a **JWT** token.
    *   The Token is like a digital ID card. The frontend stores this (in `localStorage`).
    *   Future requests can send this token to prove "I am this user".

## How to Run
1.  Ensure MongoDB is running.
2.  Run `npm run dev` in this folder.
3.  Check the terminal logs to see "Registering new user..." or "Login failed..." details.
