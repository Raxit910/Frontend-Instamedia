import { Button } from '@mui/material';

const SubmitButton = ({ label, loading = false }) => {
  return (
    <div className="mt-4">
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        disabled={loading}
        className="rounded-md transition-transform duration-150 hover:scale-[1.01]"
      >
        {loading ? 'Please wait...' : label}
      </Button>
    </div>
  );
};

export default SubmitButton;
