import React, { useState } from 'react';
import { Modal, Box, TextField, Button } from '@mui/material';

const SubtaskEditModal = ({ open, onClose, subtask, onUpdate }) => {
  const [title, setTitle] = useState(subtask.title);
  const [date, setDate] = useState(subtask.date);
  const [time, setTime] = useState(subtask.time);
  const [priority, setPriority] = useState(subtask.priority);

  const handleSave = () => {
    onUpdate({ ...subtask, title, date, time, priority });
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ padding: 4, backgroundColor: '#2b2b2b', borderRadius: '8px' }}>
        <TextField
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          fullWidth
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          fullWidth
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Priority"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          fullWidth
          sx={{ marginBottom: 2 }}
        />
        <Button onClick={handleSave} variant="contained">Save</Button>
      </Box>
    </Modal>
  );
};

export default SubtaskEditModal;
