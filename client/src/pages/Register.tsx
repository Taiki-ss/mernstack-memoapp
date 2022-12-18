import React from "react";
import { Box, TextField, Button } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <>
      <Box component="form">
        <TextField
          fullWidth
          margin="normal"
          id="username"
          name="username"
          label="お名前"
          required
        />
        <TextField
          fullWidth
          margin="normal"
          type="password"
          id="password"
          name="password"
          label="パスワード"
          required
        />
        <TextField
          fullWidth
          margin="normal"
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          label="確認用パスワード"
          required
        />
        <LoadingButton
          sx={{
            mt: 3,
            mb: 2,
          }}
          fullWidth
          type="submit"
          loading={false}
          color="primary"
          variant="outlined"
        >
          アカウント作成
        </LoadingButton>
      </Box>
      <Button component={Link} to="/login">
        すでにアカウントを持っていますか？ログイン
      </Button>
    </>
  );
};

export default Register;
