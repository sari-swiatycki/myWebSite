
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Box, 
  TextField, 
  Button, 
  Typography, 
  CircularProgress, 
  IconButton,
  Paper,
  Slide,
  Fade,
  Chip
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import PersonIcon from '@mui/icons-material/Person';
import { RootStore } from '../Stores/songStore';
import { addUserMessage, sendChatMessage } from '../Slices/sendChatMessage ';

interface ChatBoxProps {
  onClose: () => void;
}

const ChatBox: React.FC<ChatBoxProps> = ({ onClose }) => {
  const [input, setInput] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const dispatch = useDispatch<any>();
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const { messages, status } = useSelector((state: RootStore) => state.chat);

  // Suggested topics for music conversations
  const suggestedTopics = [
    "Create a music quiz",
    "Song translation",
    "Music history",
    "Music theory",
    "Artist recommendations"
  ];

  // Expand chat after animation completes
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExpanded(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (input.trim() === '') return;
    dispatch(addUserMessage(input));
    dispatch(sendChatMessage(input));
    setInput('');
  };

  const handleTopicClick = (topic: string) => {
    dispatch(addUserMessage(topic));
    dispatch(sendChatMessage(topic));
  };

  return (
    <Slide direction="up" in={true} mountOnEnter unmountOnExit>
      <Paper
        elevation={8}
        sx={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          width: 350,
          height: isExpanded ? 450 : 0,
          borderRadius: 3,
          overflow: 'hidden',
          transition: 'height 0.3s ease-in-out',
          display: 'flex',
          flexDirection: 'column',
          bgcolor: '#121212',
        }}
      >
        {/* Chat Header */}
        <Box 
          sx={{ 
            p: 2, 
            bgcolor: '#000', 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            borderBottom: '1px solid #222',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <MusicNoteIcon sx={{ color: '#00BFFF', mr: 1 }} />
            <Typography variant="h6" sx={{ color: '#fff', fontWeight: 'bold' }}>
              Chat with Alex
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="caption" sx={{ color: '#00BFFF', mr: 1 }}>
              Music Expert
            </Typography>
            <IconButton onClick={onClose} size="small" sx={{ color: '#aaa' }}>
              <CloseIcon />
            </IconButton>
          </Box>
        </Box>

        {/* Chat Messages */}
        <Fade in={isExpanded}>
          <Box 
            sx={{ 
              flexGrow: 1, 
              p: 2, 
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: 1.5,
              bgcolor: '#111',
            }}
          >
            {messages.length === 0 ? (
              <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                justifyContent: 'center',
                height: '100%',
              }}>
                <Box sx={{
                  bgcolor: '#000',
                  p: 3,
                  borderRadius: 2,
                  width: '100%',
                  mb: 2
                }}>
                  <Typography variant="body1" align="center" sx={{ color: '#fff', mb: 2 }}>
                    Hi! I'm Alex, your music expert.
                  </Typography>
                  <Typography variant="body2" align="center" sx={{ color: '#aaa', mb: 3 }}>
                    Ask me anything about music or try one of these topics:
                  </Typography>
                  
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'center' }}>
                    {suggestedTopics.map((topic, index) => (
                      <Chip
                        key={index}
                        label={topic}
                        onClick={() => handleTopicClick(topic)}
                        sx={{
                          bgcolor: '#00BFFF',
                          color: '#000',
                          '&:hover': { bgcolor: '#0099CC' },
                          fontSize: '0.75rem',
                          mb: 1
                        }}
                      />
                    ))}
                  </Box>
                </Box>
              </Box>
            ) : (
              messages.map((msg, index) => (
                <Box 
                  key={index}
                  sx={{
                    display: 'flex',
                    justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                    mb: 1,
                  }}
                >
                  {msg.sender !== 'user' && (
                    <Box 
                      sx={{ 
                        width: 28, 
                        height: 28, 
                        borderRadius: '50%', 
                        bgcolor: '#00BFFF',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mr: 1
                      }}
                    >
                      <MusicNoteIcon sx={{ fontSize: 16, color: '#000' }} />
                    </Box>
                  )}
                  
                  <Box
                    sx={{
                      maxWidth: '75%',
                      p: 1.5,
                      bgcolor: msg.sender === 'user' ? '#333' : '#00BFFF',
                      color: msg.sender === 'user' ? '#fff' : '#000',
                      borderRadius: msg.sender === 'user' 
                        ? '18px 18px 4px 18px' 
                        : '18px 18px 18px 4px',
                      position: 'relative',
                    }}
                  >
                    {msg.sender !== 'user' && (
                      <Typography variant="caption" sx={{ color: '#003366', fontWeight: 'bold', display: 'block', mb: 0.5 }}>
                        Alex
                      </Typography>
                    )}
                    <Typography variant="body2">{msg.text}</Typography>
                  </Box>
                  
                  {msg.sender === 'user' && (
                    <Box 
                      sx={{ 
                        width: 28, 
                        height: 28, 
                        borderRadius: '50%', 
                        bgcolor: '#444',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        ml: 1
                      }}
                    >
                      <PersonIcon sx={{ fontSize: 16, color: '#fff' }} />
                    </Box>
                  )}
                </Box>
              ))
            )}
            
            {status === 'loading' && (
              <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 1 }}>
                <Box 
                  sx={{ 
                    width: 28, 
                    height: 28, 
                    borderRadius: '50%', 
                    bgcolor: '#00BFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mr: 1
                  }}
                >
                  <MusicNoteIcon sx={{ fontSize: 16, color: '#000' }} />
                </Box>
                <Box 
                  sx={{ 
                    p: 2, 
                    bgcolor: '#00BFFF', 
                    borderRadius: '18px 18px 18px 4px',
                    display: 'flex',
                    justifyContent: 'center'
                  }}
                >
                  <CircularProgress size={20} sx={{ color: '#000' }} />
                </Box>
              </Box>
            )}
            <div ref={messagesEndRef} />
          </Box>
        </Fade>

        {/* Input Area */}
        <Box 
          sx={{ 
            display: 'flex', 
            p: 2, 
            borderTop: '1px solid #222',
            bgcolor: '#000'
          }}
        >
          <TextField
            fullWidth
            size="small"
            variant="outlined"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 5,
                backgroundColor: '#111',
                color: '#fff',
                '& fieldset': {
                  borderColor: '#333',
                },
                '&:hover fieldset': {
                  borderColor: '#555',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#00BFFF',
                },
              },
              '& .MuiInputBase-input': {
                '&::placeholder': {
                  color: '#aaa',
                  opacity: 1,
                },
              },
            }}
            inputProps={{
              style: { color: '#fff' }
            }}
          />
          <Button 
            variant="contained" 
            onClick={handleSend} 
            sx={{ 
              ml: 1, 
              minWidth: 'unset', 
              width: 40, 
              height: 40, 
              borderRadius: '50%',
              bgcolor: '#00BFFF',
              '&:hover': {
                bgcolor: '#0099CC',
              }
            }}
          >
            <SendIcon fontSize="small" />
          </Button>
        </Box>
      </Paper>
    </Slide>
  );
};

export default ChatBox;