import React, { useEffect, useState } from "react";
import {
  Drawer,
  IconButton,
  List,
  ListItemButton,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import assets from "../../assets";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import memoApi from "../../api/memoApi";
import { useDispatch } from "react-redux";
import { setMemos } from "../../redux/features/memoSlice";

const Sidebar = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useAppSelector((state) => state.user.value);
  const memos = useAppSelector((state) => state.memo.value);
  const { memoId } = useParams();

  const logout = () => {
    console.log("logout");
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    (async () => {
      try {
        const memos = await memoApi.getAll();
        dispatch(setMemos(memos));
      } catch (error) {
        alert(error);
      }
    })();
  }, [dispatch, navigate]);

  useEffect(() => {
    const activeIndex = memos.findIndex(
      (e: { _id: string }) => e._id === memoId
    );
    setActiveIndex(activeIndex);
  }, [navigate]);

  return (
    <Drawer
      container={window.document.body}
      variant="permanent"
      open={true}
      sx={{ width: 250, height: "100vh" }}
    >
      <List
        sx={{
          width: 250,
          height: "100vh",
          backgroundColor: assets.colors.secondary,
        }}
      >
        <ListItemButton>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="body2" fontWeight="700">
              {user.username}
            </Typography>
            <IconButton onClick={logout}>
              <LogoutOutlinedIcon />
            </IconButton>
          </Box>
        </ListItemButton>
        <ListItemButton>
          <Box
            sx={{
              paddingTop: "10px",
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="body2" fontWeight="700">
              お気に入り
            </Typography>
          </Box>
        </ListItemButton>
        <ListItemButton>
          <Box
            sx={{
              paddingTop: "10px",
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="body2" fontWeight="700">
              プライベート
            </Typography>
            <IconButton>
              <AddBoxOutlinedIcon />
            </IconButton>
          </Box>
        </ListItemButton>
        {memos.map(
          (memo: { title: string; icon: string; _id: string }, index) => {
            return (
              <ListItemButton
                key={index}
                sx={{ pl: "20px" }}
                component={Link}
                to={`/memo/${memo._id}`}
                selected={index === activeIndex}
              >
                <Typography>{memo.icon + memo.title}</Typography>
              </ListItemButton>
            );
          }
        )}
      </List>
    </Drawer>
  );
};

export default Sidebar;
