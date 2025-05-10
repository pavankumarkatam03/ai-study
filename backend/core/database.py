import sqlite3
from sqlite3 import Error
import json

def get_db_connection():
    conn = sqlite3.connect('database.db')
    conn.row_factory = sqlite3.Row
    return conn

def int_db():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute(
    '''CREATE TABLE IF NOT EXISTS users(
        id Integer PRIMARY KEY,
        name TEXT NOT NULL,
        username TEXT NOT NULL UNIQUE,
        email TEXT NOT NULL,
        hashed_password TEXT NOT NULL,
        responses TEXT DEFAULT '[]'
    )'''
)
    conn.commit()
    conn.close()

def get_user_by_username(username: str):
    conn = get_db_connection()
    user = conn.execute('SELECT * FROM users WHERE username = ?', (username,)).fetchone()
    conn.close()
    return user

def add_user(name: str, username: str, email: str, hashed_password: str):
    conn = get_db_connection()
    responses = json.dumps([])  # Initialize empty list of responses
    conn.execute(
        'INSERT INTO users (name, username, email, hashed_password, responses) VALUES (?, ?, ?, ?, ?)',
        (name, username, email, hashed_password, responses)
    )
    conn.commit()
    conn.close()


def update_user_responses(username: str, new_response: str):
    conn = get_db_connection()
    user = conn.execute('SELECT responses FROM users WHERE username = ?', (username,)).fetchone()
    if user:
        responses = json.loads(user["responses"])
        responses.append(new_response)
        conn.execute('UPDATE users SET responses = ? WHERE username = ?', (json.dumps(responses), username))
        conn.commit()
    conn.close()

def update_user_responses(username: str, new_response: dict):
    conn = get_db_connection()
    user = conn.execute('SELECT responses FROM users WHERE username = ?', (username,)).fetchone()
    if user:
        responses = json.loads(user["responses"])
        responses.append(new_response)  # Append query-response pair
        conn.execute('UPDATE users SET responses = ? WHERE username = ?', (json.dumps(responses), username))
        conn.commit()
    conn.close()
