import React, { useState } from 'react';
import { Modal, Box, Typography, Button, TextField } from '@mui/material';

const EditTaskModal = ({ open, onClose, taskData, onSave }) => {
  const [title, setTitle] = useState(taskData.taskTitle);
  const [date, setDate] = useState(taskData.date);
  const [time, setTime] = useState(taskData.time);
  const [priority, setPriority] = useState(taskData.priority);

  const handleSave = () => {
    const updatedTaskData = {
      title,
      date,
      time,
      priority,
    };
    onSave(updatedTaskData);  // Pass the updated data back
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ padding: '16px', backgroundColor: '#333', color: '#fff', borderRadius: '8px', margin: 'auto', marginTop: '10%', width: '300px' }}>
        <Typography variant="h6">Edit Task</Typography>
        <TextField
          fullWidth
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          sx={{ marginTop: '8px' }}
        />
        <TextField
          fullWidth
          label="Date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          sx={{ marginTop: '8px' }}
        />
        <TextField
          fullWidth
          label="Time"
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          sx={{ marginTop: '8px' }}
        />
        <TextField
          fullWidth
          label="Priority"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          sx={{ marginTop: '8px' }}
        />
        <Box sx={{ marginTop: '16px', display: 'flex', justifyContent: 'space-between' }}>
          <Button variant="contained" onClick={handleSave}>Save</Button>
          <Button variant="outlined" onClick={onClose}>Cancel</Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default EditTaskModal;
