import React, { useState } from 'react';
import { Box, Typography, IconButton, Menu, MenuItem, Select, FormControl, OutlinedInput } from '@mui/material';
import MediumPriorityIcon from "../image/YellowIcon.svg";
import HighPriorityIcon from "../image/RedIcon.svg";
import LowPriorityIcon from "../image/GreenIcon.svg";
import SkullIcon from "../image/SkullIcon.svg";
import AddIcon from "../image/AddIcon.svg";
import SubtaskModal from './SubtaskModal';
import TaskModal from './TaskModal';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

const TaskCard = ({ task, onEdit, onDelete, onDragStart, onDrop }) => {
  const [isDimmed, setIsDimmed] = useState(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [taskTitle, setTaskTitle] = useState(task.title || '');
  const [time, setTime] = useState(task.time || '');
  const [date, setDate] = useState(task.date || '');
  const [priority, setPriority] = useState(task.priority || 'Low');
  const [isSubtaskModalOpen, setIsSubtaskModalOpen] = useState(false);
  const [subtasks, setSubtasks] = useState(task.subtasks || []);
  const [anchorEl, setAnchorEl] = useState(null);
  const [subtaskMenuEl, setSubtaskMenuEl] = useState(null);
  const [currentSubtaskIndex, setCurrentSubtaskIndex] = useState(null);
  const open = Boolean(anchorEl);
  const openSubtaskMenu = Boolean(subtaskMenuEl);
  const [selectedSubtask, setSelectedSubtask] = useState(null);

 // Drag start event handler
const handleDragStart = (event) => {
  if (!canDrag()) {
    event.preventDefault(); // 
    return;
  }

  // Proceed with dragging
  const taskData = JSON.stringify({ ...task, subtasks });
  event.dataTransfer.setData('application/json', taskData);
  onDragStart && onDragStart(event);
};

// Drop event handler
const handleDrop = (event) => {
  event.preventDefault();

  // Prevent drop if not all subtasks are completed
  if (!canDropToCompleted()) {
    return; // If not all subtasks are completed, prevent the drop
  }

  // If all subtasks are completed, process the drop
  const droppedTaskData = JSON.parse(event.dataTransfer.getData('application/json'));
  onDrop && onDrop(droppedTaskData);
};

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleOpenTaskModal = () => {
    setIsTaskModalOpen(true);
  };

  const handleCloseTaskModal = () => {
    setIsTaskModalOpen(false);
  };

  const handleOpenSubtaskModal = () => {
    setIsSubtaskModalOpen(true);
  };

  const handleCloseSubtaskModal = () => {
    setIsSubtaskModalOpen(false);
    setSelectedSubtask(null); // Reset selected subtask when modal closes
  };

  const handleAddSubtask = (subtaskData) => {
    const updatedSubtasks = [...subtasks, subtaskData];
    setSubtasks(updatedSubtasks);
    onEdit({ ...task, subtasks: updatedSubtasks });
    handleCloseSubtaskModal();
  };

  const handleUpdateSubtask = (updatedSubtask) => {
    const updatedSubtasks = subtasks.map((subtask, index) => 
      index === currentSubtaskIndex ? { ...subtask, ...updatedSubtask } : subtask
    );
    setSubtasks(updatedSubtasks);
    onEdit({ ...task, subtasks: updatedSubtasks });
    handleCloseSubtaskModal();
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEditClick = () => {
    handleOpenTaskModal();
    handleMenuClose();
  };

  const handleDeleteClick = () => {
    onDelete(task);
    handleMenuClose();
  };

  const handleTaskUpdate = (updatedTask) => {
    setTaskTitle(updatedTask.title);
    setTime(updatedTask.time);
    setDate(updatedTask.date);
    setPriority(updatedTask.priority);
    setIsTaskModalOpen(false);
    onEdit({ ...task, ...updatedTask, subtasks });
  };

  const handleSubtaskMenuClick = (event, index) => {
    setCurrentSubtaskIndex(index);
    setSelectedSubtask(subtasks[index]); // Set the selected subtask
    setSubtaskMenuEl(event.currentTarget);
  };

  const handleSubtaskMenuClose = () => {
    setSubtaskMenuEl(null);
  };

  const handleEditSubtask = () => {
    setIsSubtaskModalOpen(true);
    handleSubtaskMenuClose();
  };

  const handleDeleteSubtask = () => {
    const updatedSubtasks = subtasks.filter((_, index) => index !== currentSubtaskIndex);
    setSubtasks(updatedSubtasks);
    onEdit({ ...task, subtasks: updatedSubtasks });
    handleSubtaskMenuClose();
  };

  const handleStatusChange = (index, status) => {
    const updatedSubtasks = subtasks.map((subtask, i) => 
      i === index ? { ...subtask, status } : subtask
    );
    setSubtasks(updatedSubtasks);
    onEdit({ ...task, subtasks: updatedSubtasks });
  };
 const canDrag = () => {
    return subtasks.some((subtask) => subtask.status === 'In Progress');
    
  };

  // Check if the card can be dropped in the Completed column
  const canDropToCompleted = () => {
    return subtasks.every((subtask) => subtask.status === 'Completed');
  };
  const getPriorityIcon = () => {
    switch (priority) {
      case 'High':
        return <img src={HighPriorityIcon} alt="High Priority" style={{ width: 20, height: 20 }} />;
      case 'Medium':
        return <img src={MediumPriorityIcon} alt="Medium Priority" style={{ width: 20, height: 20 }} />;
      case 'Low':
        return <img src={LowPriorityIcon} alt="Low Priority" style={{ width: 20, height: 20 }} />;
      default:
        return null;
    }
  };

  const statusColors = {
    'To Do': '#ffffff',
    'In Progress': '#FFA500',
    'Completed': '#008000'
  };

  return (
    <Box
      sx={{
        backgroundColor: '#2b2b2b',
        padding: '16px',
        borderRadius: '12px',
        marginBottom: '16px',
        color: '#ffffff',
        width: '280px',
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.3)',
        fontFamily: 'Urbanist',
      }}
      draggable
      onDragStart={handleDragStart}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography sx={{ fontSize: '10px' }}>
          {date} - {time}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {getPriorityIcon()}
          <IconButton onClick={handleOpenSubtaskModal} sx={{ marginLeft: '8px' }}>
            <img src={AddIcon} alt="Add Subtask" style={{ width: 18, height: 18 }} />
          </IconButton>
          <IconButton onClick={handleMenuClick} sx={{ marginLeft: '8px' }}>
            <MoreVertIcon sx={{ color: '#ffffff' }} />
          </IconButton>
        </Box>
      </Box>

      <Typography sx={{ fontSize: '14px', fontWeight: 600, marginTop: '12px' }}>
        {taskTitle}
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: '16px' }}>
        {subtasks.map((subtask, index) => (
          <Box
            key={index}
            sx={{
              backgroundColor: '#3a3a3a',
              padding: '12px',
              borderRadius: '8px',
              marginBottom: '8px',
              color: '#ffffff',
              width: '240px',
              boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
              fontFamily: 'Urbanist',
              position: 'relative',
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography sx={{ fontSize: '8px', color: '#ffffff' }}>
                {subtask.date} - {subtask.time}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                {subtask.priority === 'High' && (
                  <img src={HighPriorityIcon} alt="High Priority" style={{ width: 14, height: 14 }} />
                )}
                {subtask.priority === 'Medium' && (
                  <img src={MediumPriorityIcon} alt="Medium Priority" style={{ width: 14, height: 14 }} />
                )}
                {subtask.priority === 'Low' && (
                  <img src={LowPriorityIcon} alt="Low Priority" style={{ width: 14, height: 14 }} />
                )}
                <IconButton onClick={(event) => handleSubtaskMenuClick(event, index)} sx={{ marginLeft: '8px' }}>
                  <MoreHorizIcon sx={{ color: '#ffffff' }} />
                </IconButton>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px' }}>
              <Typography sx={{ fontSize: '12px', fontWeight: 600 }}>
                {subtask.title}
              </Typography>
              <FormControl variant="outlined" size="small" sx={{ marginLeft: '16px', minWidth: '70px' }}>
                <Select
                  value={subtask.status || 'To Do'}
                  onChange={(e) => handleStatusChange(index, e.target.value)}
                  input={<OutlinedInput sx={{ backgroundColor: '#444444', color: '#ffffff', borderRadius: '4px' }} />}
                  renderValue={(selected) => (
                    <Typography sx={{ color: statusColors[selected], fontSize: '10px' }}>
                      {selected}
                    </Typography>
                  )}
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        backgroundColor: '#444444',
                        color: '#ffffff',
                      },
                    },
                  }}
                >
                  <MenuItem value="To Do">
                    <Typography sx={{ color: statusColors['To Do'], fontSize: '10px' }}>To Do</Typography>
                  </MenuItem>
                  <MenuItem value="In Progress">
                    <Typography sx={{ color: statusColors['In Progress'], fontSize: '10px' }}>In Progress</Typography>
                  </MenuItem>
                  <MenuItem value="Completed">
                    <Typography sx={{ color: statusColors['Completed'], fontSize: '10px' }}>Completed</Typography>
                  </MenuItem>
                </Select>
              </FormControl>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px' }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <img src={SkullIcon} alt="Time and Date Icon" style={{ width: 12, height: 12, marginRight: '6px' }} />
                <Typography sx={{ fontSize: '8px', color: '#ff4d4d' }}>
                  {subtask.date} - {subtask.time}
                </Typography>
              </Box>
            </Box>

            {/* Subtask Menu */}
            <Menu
              anchorEl={subtaskMenuEl}
              open={openSubtaskMenu}
              onClose={handleSubtaskMenuClose}
              PaperProps={{
                style: {
                  backgroundColor: '#444444',
                  color: '#ffffff',
                },
              }}
            >
              <MenuItem onClick={handleEditSubtask}>Edit</MenuItem>
              <MenuItem onClick={handleDeleteSubtask}>Delete</MenuItem>
            </Menu>
          </Box>
        ))}
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <img src={SkullIcon} alt="Time and Date Icon" style={{ width: 14, height: 14, marginRight: '6px' }} />
          <Typography sx={{ fontSize: '10px', color: '#ff4d4d' }}>
            {date} - {time}
          </Typography>
        </Box>
      </Box>

      {/* Task Menu */}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        PaperProps={{
          style: {
            backgroundColor: '#444444',
            color: '#ffffff',
          },
        }}
      >
        <MenuItem onClick={handleEditClick}>Edit</MenuItem>
        <MenuItem onClick={handleDeleteClick}>Delete</MenuItem>
      </Menu>

      {/* Task Modal for editing */}
      <TaskModal
        open={isTaskModalOpen}
        onClose={handleCloseTaskModal}
        onUpdateTask={handleTaskUpdate}
        task={{ title: taskTitle, date, time, priority }}
      />

      {/* Subtask Modal for adding/editing subtasks */}
      <SubtaskModal
        open={isSubtaskModalOpen}
        onClose={handleCloseSubtaskModal}
        onAddSubtask={handleAddSubtask} // You might want to rename this to onSaveSubtask for clarity
        selectedSubtask={selectedSubtask} // Pass the selected subtask for editing
        onUpdateSubtask={handleUpdateSubtask} // Handle the update logic
      />
    </Box>
  );
};

export default TaskCard;
