import React, { useState, useEffect } from 'react';
import { Modal, Box, TextField, Button, Typography, MenuItem, Grid } from '@mui/material';
import MediumPriorityIcon from "../image/YellowIcon.svg";
import HighPriorityIcon from "../image/RedIcon.svg";
import LowPriorityIcon from "../image/GreenIcon.svg";

const TaskModal = ({ open, onClose, task, onUpdateTask }) => {
  const [title, setTitle] = useState(task.title);
  const [time, setTime] = useState(task.time);
  const [date, setDate] = useState(task.date);
  const [priority, setPriority] = useState(task.priority);

  // Effect to reset the state when the modal is opened
  useEffect(() => {
    setTitle(task.title);
    setTime(task.time);
    setDate(task.date);
    setPriority(task.priority);
  }, [task]);

  const handleSubmit = () => {
    onUpdateTask({ title, time, date, priority });
    onClose(); // Close the modal after submitting
  };

  // Form validation: check if the form is valid
  const isFormValid = title && time && date && priority;

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="task-modal-title"
      aria-describedby="task-modal-description"
    >
      <Box sx={{ padding: 3, bgcolor: '#1E1E1E', borderRadius: 2, maxWidth: 400, margin: 'auto' }}>
        <Typography variant="h6" sx={{ mb: 2, color: '#ffffff', textAlign: 'center' }}>
          Edit Task
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="subtitle1" sx={{ color: '#ffffff' }}>
              Title
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              sx={{
                backgroundColor: '#101214',
                '& .MuiInputBase-input': { color: '#ffffff' },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: '#4a4a4a' },
                  '&:hover fieldset': { borderColor: '#666666' },
                  '&.Mui-focused fieldset': { borderColor: '#ffffff' },
                },
              }}
            />
          </Grid>
         <Grid item xs={12}>
            <Typography variant="subtitle1" sx={{ color: '#ffffff' }}>
              Set Priority
            </Typography>
            <TextField
              select
              fullWidth
              variant="outlined"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              sx={{
                backgroundColor: '#101214',
                '& .MuiInputBase-input': { color: '#ffffff' },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: '#4a4a4a' },
                  '&:hover fieldset': { borderColor: '#666666' },
                  '&.Mui-focused fieldset': { borderColor: '#ffffff' },
                },
              }}
            >
              <MenuItem value="Low">
                <img src={LowPriorityIcon} alt="Low Priority" style={{ width: 20, height: 20, marginRight: 10 }} />
                Low
              </MenuItem>
              <MenuItem value="Medium">
                <img src={MediumPriorityIcon} alt="Medium Priority" style={{ width: 20, height: 20, marginRight: 10 }} />
                Medium
              </MenuItem>
              <MenuItem value="High">
                <img src={HighPriorityIcon} alt="High Priority" style={{ width: 20, height: 20, marginRight: 10 }} />
                High
              </MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1" sx={{ color: '#ffffff' }}>
              Date
            </Typography>
            <TextField
              fullWidth
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              sx={{
                backgroundColor: '#101214',
                '& .MuiInputBase-input': { color: '#ffffff' },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: '#4a4a4a' },
                  '&:hover fieldset': { borderColor: '#666666' },
                  '&.Mui-focused fieldset': { borderColor: '#ffffff' },
                },
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1" sx={{ color: '#ffffff' }}>
              Time
            </Typography>
            <TextField
              fullWidth
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              sx={{
                backgroundColor: '#101214',
                '& .MuiInputBase-input': { color: '#ffffff' },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: '#4a4a4a' },
                  '&:hover fieldset': { borderColor: '#666666' },
                  '&.Mui-focused fieldset': { borderColor: '#ffffff' },
                },
              }}
            />
          </Grid>
        </Grid>

        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={!isFormValid}
          sx={{ mt: 3, backgroundColor: isFormValid ? '#4CAF50' : '#666666', color: '#ffffff', width: '100%' }}
        >
          Update Task
        </Button>
      </Box>
    </Modal>
  );
};
export default TaskModal;
