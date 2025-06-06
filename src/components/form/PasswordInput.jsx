import { useState } from 'react';
import { TextField, IconButton, InputAdornment } from '@mui/material';
import { Controller } from 'react-hook-form';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

const PasswordInput = ({ name, label, control }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: `${label} is required` }}
      render={({ field, fieldState: { error } }) => (
        <div className="mt-4">
          <TextField
            {...field}
            label={label}
            type={showPassword ? 'text' : 'password'}
            fullWidth
            size="small"
            variant="outlined"
            error={!!error}
            helperText={error?.message}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </div>
      )}
    />
  );
};

export default PasswordInput;
