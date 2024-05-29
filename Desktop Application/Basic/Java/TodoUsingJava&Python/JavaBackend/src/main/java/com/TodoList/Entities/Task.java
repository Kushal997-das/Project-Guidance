package com.TodoList.Entities;

import java.util.Objects;

public class Task {
	private String taskName;

	
	public Task() {
		super();
	}

	public Task(String taskName) {
		super();
		this.taskName = taskName;
	}

	public String getTaskName() {
		return taskName;
	}

	public void setTaskName(String taskName) {
		this.taskName = taskName;
	}

	@Override
	public int hashCode() {
		return Objects.hash(taskName);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Task other = (Task) obj;
		return Objects.equals(taskName, other.taskName);
	}
	
	
}
