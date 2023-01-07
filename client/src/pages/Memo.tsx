import { IconButton, TextField } from "@mui/material";
import { Box } from "@mui/system";
import EmojiPicker from "../components/common/EmojiPicker";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import memoApi from "../api/memoApi";
import { useAppSelector } from "../redux/hooks";
import { useDispatch } from "react-redux";
import { setMemos } from "../redux/features/memoSlice";

type MemoType = {
  _id?: string;
  user?: string;
  icon?: string;
  title?: string;
  description?: string;
};

const Memo = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const memos = useAppSelector((state) => state.memo.value);

  const { memoId } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState("");

  useEffect(() => {
    (async () => {
      try {
        if (memoId) {
          const memo = (await memoApi.getOne(memoId)) as MemoType;
          setTitle(memo.title ? memo.title : "");
          setDescription(memo.description ? memo.description : "");
          setIcon(memo.icon ? memo.icon : "");
          console.log(memo);
        }
      } catch (error) {
        alert(error);
      }
    })();
  }, [memoId]);

  let timer: ReturnType<typeof setTimeout>;
  const timeout = 500;

  const titleUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    clearTimeout(timer);
    const newTitle = e.target.value;
    setTitle(newTitle);

    timer = setTimeout(async () => {
      try {
        await memoApi.update(memoId!, { title: newTitle });
      } catch (error) {
        alert(error);
      }
    }, timeout);
  };

  const descriptionUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    clearTimeout(timer);
    const newDescription = e.target.value;
    setDescription(newDescription);

    timer = setTimeout(async () => {
      try {
        await memoApi.update(memoId!, { description: newDescription });
      } catch (error) {
        alert(error);
      }
    }, timeout);
  };

  const deleteMemo = async () => {
    try {
      const deleted = await memoApi.delete(memoId!);
      console.log(deleted);
      const newMemos: { _id: string }[] = memos.filter(
        (memo: { _id: string }) => memo._id !== memoId
      );

      if (newMemos.length === 0) {
        navigate("/memo");
      } else {
        navigate(`/memo/${newMemos[0]._id}`);
      }
      dispatch(setMemos(newMemos));
    } catch (error) {
      alert(error);
    }
  };

  const onIconChange = async (newIcon: string) => {
    let temp: { icon: string; _id: string }[] = [...memos];
    const index = temp.findIndex(
      (memo: { _id: string }) => memo._id === memoId
    );
    temp[index] = { ...temp[index], icon: newIcon };
    setIcon(newIcon);
    dispatch(setMemos(temp));
    try {
      await memoApi.update(memoId!, { icon: newIcon });
    } catch (error) {
      alert(error);
    }
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          width: "100%",
        }}
      >
        <IconButton>
          <StarBorderOutlinedIcon />
        </IconButton>
        <IconButton color="error" onClick={deleteMemo}>
          <DeleteOutlinedIcon />
        </IconButton>
      </Box>
      <Box sx={{ padding: "10px 50px" }}>
        <Box>
          <EmojiPicker icon={icon} onChange={onIconChange} />
          <TextField
            onChange={titleUpdate}
            placeholder="無題"
            value={title}
            variant="outlined"
            fullWidth
            sx={{
              ".MuiOutlinedInput-input": { padding: 0 },
              ".MuiOutlinedInput-notchedOutline": { border: "none" },
              ".MuiOutlinedInput-root": { fontSize: "2rem", fontWeight: 700 },
            }}
          />
          <TextField
            onChange={descriptionUpdate}
            placeholder="ここに自由に入力してください。"
            value={description}
            variant="outlined"
            fullWidth
            sx={{
              ".MuiOutlinedInput-input": { padding: 0 },
              ".MuiOutlinedInput-notchedOutline": { border: "none" },
              ".MuiOutlinedInput-root": { fontSize: "1rem" },
            }}
          />
        </Box>
      </Box>
    </>
  );
};

export default Memo;
