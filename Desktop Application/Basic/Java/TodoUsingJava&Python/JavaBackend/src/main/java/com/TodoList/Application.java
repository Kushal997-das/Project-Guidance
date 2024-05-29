package com.TodoList;

import java.util.ArrayList;
import java.util.List;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.TodoList.Entities.Task;

@SpringBootApplication
@RestController
@RequestMapping("/tasks")
public class Application {

	public List<Task> tasks = new Arra yList<>();
	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}

	@GetMapping
	public List<Task> getTasks()
	{
		
		if(!tasks.isEmpty())
		{
			return tasks;
		}
		return null;
		
	}
	
	@PostMapping
	public void addTask(@RequestBody Task task)
	{
		
		tasks.add(task);
	}
	
	@DeleteMapping
	public void deleteTask(@RequestBody Task task)
	{
		System.out.println(task.getTaskName());
		
			tasks.remove(task);
			
		
	}
}
