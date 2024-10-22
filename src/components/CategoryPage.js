import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid'; // Import uuid for generating unique IDs
import CreateTaskButton from './CreateTaskButton'; // Adjust the import according to your structure
import TaskCard from './TaskCard'; // Import the TaskCard component
import './CategoryPage.css'; // Import the CSS file

const CategoryPage = () => {
  // State to hold tasks organized by status
  const [tasks, setTasks] = useState({
    todo: [],
    inProgress: [],
    completed: [],
  });

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null); // State to hold the task being edited
  const [draggedTask, setDraggedTask] = useState(null); // State to hold the currently dragged task

  // Function to handle creating a new task
  const handleCreateTask = (newTaskData) => {
    const newTask = { ...newTaskData, id: uuidv4(), subtasks: [] }; // Initialize subtasks here
    setTasks((prevTasks) => ({
      ...prevTasks,
      todo: [...prevTasks.todo, newTask],
    }));
  };

  // Function to handle editing a specific task
  const handleEditTask = (updatedTask) => {
    setTasks((prevTasks) => {
      const updatedTasks = { ...prevTasks };
      // Update task in the correct status column
      for (const key in updatedTasks) {
        updatedTasks[key] = updatedTasks[key].map(task =>
          task.id === updatedTask.id ? updatedTask : task
        );
      }
      return updatedTasks;
    });
  };

  // Function to handle deleting a specific task
  const handleDeleteTask = (taskToDelete, status) => {
    setTasks((prevTasks) => ({
      ...prevTasks,
      [status]: prevTasks[status].filter(task => task.id !== taskToDelete.id), // Only remove the task with matching ID
    }));
  };

  const navigateToCategory = () => {
    // Placeholder function for navigation
  };

  // Function to handle dragging a task
  const handleDragStart = (task, e) => {
    const taskData = JSON.stringify(task); // Store entire task data including subtasks
    e.dataTransfer.setData('application/json', taskData); // Store task data to transfer
    setDraggedTask(task); // Track the dragged task
  };

  // Function to handle dropping a task into a new status column
  const handleDrop = (status, e) => {
    const taskData = e.dataTransfer.getData('application/json');
    const draggedTask = JSON.parse(taskData);
  
    // Check if the task is being dropped into a new column (status)
    if (draggedTask && status) {
      setTasks((prevTasks) => {
        // Remove the task from its original status
        let updatedTasks = { ...prevTasks };
        for (const key in updatedTasks) {
          updatedTasks[key] = updatedTasks[key].filter(task => task.id !== draggedTask.id);
        }
  
        // Add the task to the new status column
        updatedTasks[status].push(draggedTask);
  
        return updatedTasks;
      });
    }
  };
  
  return (
    <div>
      <div className="button-container">
        <CreateTaskButton
          handleCreateTask={handleCreateTask}
          navigateToCategory={navigateToCategory}
          className="create-task-button"
        />
      </div>
      <div className="container">
        {/* "To Do" Column */}
        <div
          className="column"
          onDragOver={(e) => e.preventDefault()} // Allow drop
          onDrop={(e) => handleDrop('todo', e)} // Handle drop for "To Do"
        >
          <h2 className="column-heading">To Do</h2>
          
          {tasks.todo.length > 0 ? (
            tasks.todo.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onEdit={handleEditTask}
                onDelete={() => handleDeleteTask(task, 'todo')}
                onDragStart={(e) => handleDragStart(task, e)}
                draggable // Make the TaskCard draggable
              />
            ))
          ) : (
            <p>No tasks available.</p>
          )}
        </div>

        {/* "In Progress" Column */}
        <div
          className="column"
          onDragOver={(e) => e.preventDefault()} // Allow drop
          onDrop={(e) => handleDrop('inProgress', e)} // Handle drop for "In Progress"
        >
          <h2 className="column-heading">In Progress</h2>
          {tasks.inProgress.length > 0 ? (
            tasks.inProgress.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onEdit={handleEditTask}
                onDelete={() => handleDeleteTask(task, 'inProgress')}
                onDragStart={(e) => handleDragStart(task, e)}
                draggable // Make the TaskCard draggable
              />
              
            ))
          ) : (
            <p>No tasks available.</p>
          )}
        </div>

        {/* "Completed" Column */}
        <div
          className="column"
          onDragOver={(e) => e.preventDefault()} // Allow drop
          onDrop={(e) => handleDrop('completed', e)} // Handle drop for "Completed"
        >
          <h2 className="column-heading">Completed</h2>
          {tasks.completed.length > 0 ? (
            tasks.completed.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onEdit={handleEditTask}
                onDelete={() => handleDeleteTask(task, 'completed')}
                onDragStart={(e) => handleDragStart(task, e)}
                draggable // Make the TaskCard draggable
              />
              
            ))
          ) : (
            <p>No tasks available.</p>
          )}
          
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
