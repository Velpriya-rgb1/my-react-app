import React, { useEffect, useState } from 'react';
import { Modal, Box, TextField, Button, Select, MenuItem, FormControl, Typography } from '@mui/material';
import MediumPriorityIcon from "../image/YellowIcon.svg";
import HighPriorityIcon from "../image/RedIcon.svg";
import LowPriorityIcon from "../image/GreenIcon.svg";

const priorityIcons = {
  High: HighPriorityIcon,
  Medium: MediumPriorityIcon,
  Low: LowPriorityIcon,
};

const SubtaskModal = ({ open, onClose, onAddSubtask, selectedSubtask, onUpdateSubtask }) => {
  const [subtaskData, setSubtaskData] = useState({
    title: '',
    date: '',
    time: '',
    priority: 'Low',
    status: 'To Do',
  });

  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    if (selectedSubtask) {
      setSubtaskData(selectedSubtask);
    } else {
      setSubtaskData({ title: '', date: '', time: '', priority: 'Low', status: 'To Do' });
    }
  }, [selectedSubtask, open]);

  // Check if all fields are filled
  useEffect(() => {
    const { title, date, time, priority } = subtaskData;
    if (title && date && time && priority) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [subtaskData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSubtaskData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = () => {
    if (selectedSubtask) {
      onUpdateSubtask(subtaskData);
    } else {
      onAddSubtask(subtaskData);
    }
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ 
        position: 'absolute', 
        top: '50%', 
        left: '50%', 
        transform: 'translate(-50%, -50%)', 
        width: 450, 
        bgcolor: '#2B2F33', // Dark background
        borderRadius: 3, 
        boxShadow: 24, 
        p: 3,
        color: 'white', // Ensure all text is white
      }}>
        <Typography variant="h6" sx={{ mb: 2, color: '#fff' }}>
          New Task
        </Typography>

        <TextField
          label="Title"
          name="title"
          value={subtaskData.title}
          onChange={handleChange}
          fullWidth
          margin="normal"
          InputLabelProps={{ style: { color: '#bfbfbf' }}} // Label in grey
          InputProps={{
            style: { color: '#fff', backgroundColor: '#1C1F22', borderRadius: 1 }, // Dark input background
          }}
        />

        <Typography variant="body1" sx={{ mt: 2, mb: 1, color: '#bfbfbf' }}>
          Set Priority
        </Typography>
        <FormControl fullWidth margin="normal">
          <Select
            name="priority"
            value={subtaskData.priority}
            onChange={handleChange}
            displayEmpty
            sx={{ 
              backgroundColor: '#1C1F22', 
              color: '#fff',
              '.MuiOutlinedInput-notchedOutline': { borderColor: '#666' } 
            }}
          >
            <MenuItem value="High">
              <img src={HighPriorityIcon} alt="High" style={{ width: 20, marginRight: 8 }} />
              High
            </MenuItem>
            <MenuItem value="Medium">
              <img src={MediumPriorityIcon} alt="Medium" style={{ width: 20, marginRight: 8 }} />
              Medium
            </MenuItem>
            <MenuItem value="Low">
              <img src={LowPriorityIcon} alt="Low" style={{ width: 20, marginRight: 8 }} />
              Low
            </MenuItem>
          </Select>
        </FormControl>

        <Typography variant="body1" sx={{ mt: 2, mb: 1, color: '#bfbfbf' }}>
          Set Deadline
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <TextField
            type="date"
            name="date"
            value={subtaskData.date}
            onChange={handleChange}
            fullWidth
            InputProps={{
              style: { color: '#fff', backgroundColor: '#1C1F22', borderRadius: 1 }, // Dark input
            }}
          />
          <TextField
            type="time"
            name="time"
            value={subtaskData.time}
            onChange={handleChange}
            fullWidth
            InputProps={{
              style: { color: '#fff', backgroundColor: '#1C1F22', borderRadius: 1 }, // Dark input
            }}
          />
        </Box>

        <Button 
          onClick={handleSubmit} 
          variant="contained" 
          disabled={!isFormValid} // Disable button if form is not valid
          sx={{ 
            marginTop: 3, 
            bgcolor: isFormValid ? '#4CAF50' : '#9E9E9E', // Green if enabled, grey if disabled
            '&:hover': { bgcolor: isFormValid ? '#388E3C' : '#9E9E9E' }, // No change on hover when disabled
            borderRadius: 2,
            width: '100%'
          }}>
          {selectedSubtask ? 'Update Subtask' : 'Add Subtask'}
        </Button>
      </Box>
    </Modal>
  );
};

export default SubtaskModal;
