from enum import unique
from flask import Flask, request, render_template, redirect, url_for
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt, check_password_hash, generate_password_hash
from flask_login import LoginManager, login_required, current_user, login_user, logout_user, UserMixin
from sqlalchemy import func
from datetime import datetime
from sqlalchemy.sql import expression
# from flask_migrate import Migrate

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///todos_db"
app.config["SQLALCHEMY_TRACK_MODIOFICATIONS"] = False

app.config["SECRET_KEY"] = "supersecret"
db = SQLAlchemy(app)
# migrate = Migrate(app, db)
bcrypt = Bcrypt(app)
login_manager = LoginManager(app)
# SQLALCHEMY_TRACK_MODIFICATIONS = False


@login_manager.user_loader
def load_user(user_id):
    return User.query.get(user_id)


class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(50), unique=True, nullable=False)
    username = db.Column(db.String(50), unique=True, nullable=False)
    password = db.Column(db.String(40), nullable=False)
    todos = db.relationship('Todo', lazy=True, backref='user')

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def set_password(self, password):
        self.password = generate_password_hash(password)


class Todo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(50), unique=True, nullable=False)
    description = db.Column(db.Text, nullable=True)
    is_done = db.Column(db.Boolean, nullable=False,default = False)
    created_at = db.Column(db.DateTime, nullable=False,default=datetime.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey(
        'user.id'), nullable=True)

    def __str__(self):
        return f"<Todo:{self.id} ({self.title})>"

    def __repr__(self):
        return f"<Todo:{self.id} ({self.title})>"

    @classmethod
    def search(cls, user_id, query):
        return Todo.query.filter(Todo.user_id == user_id).filter(
            func.lower(Todo.title).contains(query.lower()) |
            func.lower(Todo.description).contains(query.lower())
        ).all()


@app.route("/home")
@login_required
def index():
    todos = current_user.todos
    my_user = current_user.username
    # print("My User name is ", my_user)
    return render_template("index.html", todos=todos, login_username=my_user)

@app.route("/home")
@login_required
def get_current_username():
    login_username = current_user.username
    return render_template("header.html", login_username=login_username)


@login_required
@app.route("/uncompleted")
def uncompleted():
    todos = Todo.query.filter_by(user_id=current_user.id, is_done=False).all()
    my_user = current_user.username

    return render_template("index.html", todos=todos, login_username=my_user)

@login_required
@app.route("/completed")
def completed():
    todos = Todo.query.filter_by(user_id=current_user.id, is_done=True).all()
    my_user = current_user.username

    return render_template("index.html", todos=todos, login_username=my_user)


@app.route("/todo/<int:id>/done", methods=["GET", "POST"])
@login_required
def toggle_status(id):

    todo = Todo.query.filter_by(user_id=current_user.id, id=id).first()
    # print(todo.is_done)
    if not todo:
        return render_template("not_found.html")
    if request.method == "GET":
        if todo.is_done == False:
            todo.is_done = True
        else:
            todo.is_done = False
        db.session.add(todo)
        db.session.commit()
        todos = current_user.todos
    return render_template("index.html", todos=todos)

'''
# This Feature Under Work 
# @app.route("/search")
# @login_required
# def search():
#     q = request.args.get('q')
#     if not q:
#         return render_template("not_found.html")
#     todos = Todo.search(current_user.id, q)
#     return render_template("index.html", todos=todos)

    # if q:
    #     # todos = Todo.search(current_user.id, q)
    #     todos = Todo.query.filter(Todo.title.contains(q) | Todo.description.contains(q))
    # else:
    #     todos = Todo.query.all() 
    # return render_template("index.html", todos=todos)  
'''

@app.route("/todo", methods=["GET", "POST"])
@login_required
def create_todo():
    my_user = current_user.username
    if request.method == "POST":
        todo = Todo(title=request.form.get("title"),
                    description=request.form.get("description"),
                    is_done=True if request.form.get("is_done") == "on" else False,
                    user_id=current_user.id)
        db.session.add(todo)
        db.session.commit()
        return redirect(url_for('index'))
    return render_template("todo_form.html", login_username=my_user)


@app.route("/todo/<int:id>", methods=["GET"])
@login_required
def get_todo(id):
    todo = Todo.query.filter_by(user_id=current_user.id, id=id).first()
    if not todo:
        return render_template("not_found.html")
    return render_template("todo.html", todo=todo)


@app.route("/todo/<int:id>/edit", methods=["GET", "POST"])
@login_required
def edit_todo(id):
    my_user = current_user.username
    todo = Todo.query.filter_by(user_id=current_user.id, id=id).first()
    if not todo:
        return render_template("not_found.html")
    if request.method == 'POST':
        todo.title = request.form.get("title")
        todo.description = request.form.get("description")
        todo.is_done = True if request.form.get("is_done") == "on" else False
        db.session.add(todo)
        db.session.commit()
        return redirect(url_for("get_todo", id=id))
    return render_template("todo_form.html", todo=todo, login_username=my_user)


@app.route('/login', methods=["GET", "POST"])
def login():
    if request.method == "POST":
        user = User.query.filter_by(email=request.form.get("email")).first()
        # user.todos
        # print(user)
        # print(user.username)
        if not user or not user.check_password(request.form.get("password")):
            return redirect(url_for("login"))
        login_user(user)
        return redirect(url_for("index"))
    return render_template("login.html")


@app.route("/")
@app.route('/register', methods=["GET", "POST"])
def register():
    if request.method == "POST":
        if request.form.get('password') != request.form.get('confirm_password'):
            return redirect(url_for('register'))
        user = User(
            email=request.form.get('email'),
            username=request.form.get('username'),
        )
        user.set_password(request.form.get('password'))
        db.session.add(user)
        try:
            db.session.commit()
        except Exception as e:
            print(e.args)
            print("User already exists")
            return redirect(url_for('register'))
        login_user(user)
        return redirect(url_for('index'))
    return render_template("register.html")


@app.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('login'))


@app.route('/todo/<int:id>/delete', methods=['GET'])
@login_required
def delete_todo(id):
    todo = Todo.query.filter_by(user_id=current_user.id, id=id).first()
    if not todo:
        return render_template("not_found.html")
    else:
        db.session.delete(todo)
        db.session.commit()
        todos = current_user.todos
        return render_template("index.html", todos=todos)


if __name__ == '__main__':
    db.create_all()  # run this in terminal app.py after write python
    app.run(debug=True)



'''
# Users on todo website for test the website
# test@test.com
#Pass:0000
'''
