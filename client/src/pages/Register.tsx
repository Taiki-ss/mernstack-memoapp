import React from "react";
import { Box, TextField, Button } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Link } from "react-router-dom";
import authApi from "../api/authApi";

const Register = () => {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // 入力欄の文字列を取得
    e.preventDefault();
    const data = new FormData(e.target as HTMLFormElement);
    const username = (data.get("username") as string).trim();
    const password = (data.get("password") as string).trim();
    const confirmpassword = (data.get("confirmpassword") as string).trim();

    // 新規登録APIを叩く
    try {
      const res = await authApi.register({
        username,
        password,
        confirmpassword,
      });

      if ("token" in res) {
        localStorage.setItem("token", res.token as string);
      }
      console.log("新規登録に成功しました");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Box component="form" onSubmit={handleSubmit}>
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
          id="confirmpassword"
          name="confirmpassword"
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
