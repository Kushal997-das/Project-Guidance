from django.shortcuts import render,redirect
from .models import TodoList, Category


def index(request):     # index to filter requests
    todos = TodoList.objects.all()
    categories = Category.objects.all()
    if request.method == "POST":    # Check for POST request
        if "taskAdd" in request.POST:   # Check if POST to add task
            # Create task
            title = request.POST["description"]
            date = str(request.POST["date"])
            category = request.POST["category_select"]
            content = title + " -- " + date + " " + category
            Todo = TodoList(title=title, content=content, due_date=date, category=Category.objects.get(name=category))
            Todo.save()
            return redirect("/")     # Reload page after task

        if "taskDelete" in request.POST:    # Check if POST to delete task
            # Delete task
            checkedlist = request.POST["checkedbox"]
            for todo_id in checkedlist:
                todo = TodoList.objects.get(id=int(todo_id))
                todo.delete()
    return render(request, "index.html", {"todos": todos, "categories":categories})