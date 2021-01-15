import sqlite3

def connect():
    conn=sqlite3.connect("films.db")
    cur=conn.cursor()
    cur.execute("CREATE TABLE IF NOT EXISTS film(id INTEGER PRIMARY KEY, title text, director text,year integer,genre text,review text)")
    conn.commit()
    conn.close()

def insert(title,year,director,genre,review):
    conn=sqlite3.connect("films.db")
    cur=conn.cursor()
    cur.execute("INSERT INTO film VALUES(NULL,?,?,?,?,?)",(title,year,director,genre,review))
    conn.commit()
    conn.close()

def view():
    conn=sqlite3.connect("films.db")
    cur=conn.cursor()
    cur.execute("SELECT * FROM film")
    rows=cur.fetchall()
    conn.close()
    return rows

def search(title=None,year=None,director=None,genre=None):
    conn=sqlite3.connect("films.db")
    cur=conn.cursor()
    cur.execute("SELECT * FROM film WHERE title=? OR year=? OR director=? OR genre=?",(title,year,director,genre))
    rows=cur.fetchall()
    conn.close()
    return rows

def delete(id):
    conn=sqlite3.connect("films.db")
    cur=conn.cursor()
    cur.execute(f"DELETE FROM film WHERE id={id}")
    conn.commit()
    conn.close()

def update(id,title,year,director,genre,review):
    conn=sqlite3.connect("films.db")
    cur=conn.cursor()
    cur.execute("UPDATE film SET title=?,year=?,director=?,genre=?,review=? WHERE id=?",(id,title,year,director,genre))
    conn.commit()
    conn.close()





connect()