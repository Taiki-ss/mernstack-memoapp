import React, { useState } from "react";
import { Box, TextField, Button } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Link } from "react-router-dom";
import authApi from "../api/authApi";
import { isAxiosError } from "axios";

const Register = () => {
  const [usernameErrText, setUsernameErrText] = useState("");
  const [passwordErrText, setPasswordErrText] = useState("");
  const [confirmPasswordErrText, setConfirmPasswordErrText] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setUsernameErrText("");
    setPasswordErrText("");
    setConfirmPasswordErrText("");

    // 入力欄の文字列を取得
    const data = new FormData(e.target as HTMLFormElement);
    const username = (data.get("username") as string).trim();
    const password = (data.get("password") as string).trim();
    const confirmpassword = (data.get("confirmpassword") as string).trim();

    let isError = false;

    if (username === "") {
      setUsernameErrText("名前を入力してください");
      isError = true;
    }
    if (password === "") {
      setPasswordErrText("パスワードを入力してください");
      isError = true;
    }
    if (confirmpassword === "") {
      setConfirmPasswordErrText("確認用パスワードを入力してください");
      isError = true;
    }
    if (password !== confirmpassword) {
      setConfirmPasswordErrText("パスワードと確認用パスワードが異なります");
      isError = true;
    }

    if (isError) return;

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
      if (isAxiosError(error) && error.response && error.response.data) {
        const errors: [{ msg: string; param: string }] =
          error.response.data.errors;
        errors.forEach((err: { msg: string; param: string }) => {
          if (err.param === "username") {
            setUsernameErrText(err.msg);
          }
          if (err.param === "password") {
            setPasswordErrText(err.msg);
          }
          if (err.param === "confirmpassword") {
            setConfirmPasswordErrText(err.msg);
          }
        });
      }
    }
  };

  return (
    <>
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <TextField
          fullWidth
          margin="normal"
          id="username"
          name="username"
          label="お名前"
          required
          helperText={usernameErrText}
          error={usernameErrText !== ""}
        />
        <TextField
          fullWidth
          margin="normal"
          type="password"
          id="password"
          name="password"
          label="パスワード"
          required
          helperText={passwordErrText}
          error={passwordErrText !== ""}
        />
        <TextField
          fullWidth
          margin="normal"
          type="password"
          id="confirmpassword"
          name="confirmpassword"
          label="確認用パスワード"
          required
          helperText={confirmPasswordErrText}
          error={confirmPasswordErrText !== ""}
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
