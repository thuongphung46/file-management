import { Box, Button, Typography } from "@mui/material";
import { PlayListService } from "services/PlayListService";
import { useState } from "react";
import { PlayList } from "component/molecules/home/PlayList";
import { SongList } from "component/molecules/home/SongList";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useParams } from "react-router-dom";
import { toastMessage } from "component/molecules/toast";

const PlayListPage = () => {
  const { id } = useParams();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const handleDatabasesChange = (newSelectedIds: string[]) => {
    setSelectedIds(newSelectedIds);
  };

  const handlerContinue = () => {
    if (selectedIds.length > 0) {
      selectedIds.map((data) =>
        PlayListService.AddSongToPlayList(data, id as string).then((res) => {
          if (res.status === "OK") {
            toastMessage("thành công", "success");
          }
        })
      );
    } else {
      toastMessage("chưa chọn bài hát", "error");
    }
  };

  return (
    <Box>
      <Box>
        <Typography variant={"h6"} color={"primary"}></Typography>
        <PlayList />
      </Box>
      <Box>
        {id ? (
          <>
            <Typography variant={"h6"} color={"primary"}></Typography>
            <SongList onDatabaseSelectionChange={handleDatabasesChange} />
          </>
        ) : null}
        <Button
          startIcon={<ArrowForwardIosIcon />}
          variant={"contained"}
          onClick={handlerContinue}>
          Thêm nhạc vào playlist
        </Button>
      </Box>
    </Box>
  );
};

export default PlayListPage;
