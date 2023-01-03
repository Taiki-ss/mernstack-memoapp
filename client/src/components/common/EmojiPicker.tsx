import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import Picker from "@emoji-mart/react";

const EmojiPicker = (props: { icon: string; onChange: any }) => {
  const [selectedEmoji, setSelectedEmoji] = useState("");
  const [isShowPicker, setIsShowPicker] = useState(false);

  useEffect(() => {
    setSelectedEmoji(props.icon);
  }, [props.icon]);

  const selectEmoji = (e: { unified: string; native: string }) => {
	/* e.nativeではなくてe.unifiedを使い場合は以下 */
    // const emojiCode = e.unified.split("-");
    // const codeArray: number[] = [];
    // emojiCode.forEach((el) => codeArray.push(+("0x" + el)));
    // const emoji = String.fromCodePoint(...codeArray);

    setIsShowPicker(false);
    props.onChange(e.native);
  };

  return (
    <Box>
      <Typography
        variant="h3"
        fontWeight="700"
        sx={{ cursor: "pointer" }}
        onClick={() => setIsShowPicker(!isShowPicker)}
      >
        {selectedEmoji}
      </Typography>
      <Box
        sx={{
          display: isShowPicker ? "block" : "none",
          position: "absolute",
          zIndex: 100,
        }}
      >
        <Picker onEmojiSelect={selectEmoji} />
      </Box>
    </Box>
  );
};

export default EmojiPicker;
