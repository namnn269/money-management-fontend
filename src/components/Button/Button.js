import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

export default function IconLabelButtons({
  content,
  variant,
  startIcon,
  endIcon,
}) {
  return (
    <Stack direction="row" spacing={2}>
      <Button variant={variant} startIcon={startIcon} endIcon={endIcon}>
        {content}
      </Button>
    </Stack>
  );
}
