import { Dialog, DialogContent, DialogTitle, IconButton, Box } from '@mui/material';
import { FiX } from 'react-icons/fi';

const Modal = ({ open, onClose, title, children, maxWidth = 'sm', fullWidth = true }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={maxWidth}
      fullWidth={fullWidth}
      sx={{
        borderRadius: 2,
        bgcolor: 'background.paper',
      }}
    >
      {title && (
        <DialogTitle
          sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
        >
          {title}
          <IconButton onClick={onClose} size="small">
            <FiX size={20} />
          </IconButton>
        </DialogTitle>
      )}
      <DialogContent>
        <Box sx={{ pt: title ? 0 : 2 }}>{children}</Box>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
