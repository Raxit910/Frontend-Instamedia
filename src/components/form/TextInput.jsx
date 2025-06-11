import { TextField } from '@mui/material';
import { Controller } from 'react-hook-form';

const TextInput = ({
  name,
  label,
  control,
  type = 'text',
  required = false,
  multiline = false,
  rows,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: required && `${label} is required` }}
      render={({ field, fieldState: { error } }) => (
        <div className="mb-5">
          <TextField
            {...field}
            type={type}
            label={label}
            fullWidth
            size="small"
            variant="outlined"
            multiline={multiline}
            rows={rows}
            error={!!error}
            helperText={error?.message}
          />
        </div>
      )}
    />
  );
};

export default TextInput;
