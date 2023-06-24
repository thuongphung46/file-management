import { Box, Button, Typography } from "@mui/material";
// import DatabaseTable from "component/molecules/upgrade/DatabaseTable";
// import VersionTable from "component/molecules/version_info/VersionTable";
import { useState } from "react";
import { PlayList } from "component/molecules/home/PlayList";
import { SongList } from "component/molecules/home/SongList";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useParams } from "react-router-dom";

const PlayListPage = () => {
  const { version } = useParams();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const handleDatabasesChange = (newSelectedIds: string[]) => {
    setSelectedIds(newSelectedIds);
  };

  const handlerContinue = () => {
    console.log(selectedIds);
  };

  return (
    <Box>
      <Box>
        <Typography variant={"h6"} color={"primary"}></Typography>
        <PlayList />
      </Box>
      <Box>
        {version ? (
          <>
            <Typography variant={"h6"} color={"primary"}></Typography>
            <SongList onDatabaseSelectionChange={handleDatabasesChange} />
            {/* <DatabaseTable
                databases={databases}
                onDatabaseSelectionChange={handleDatabasesChange}
              /> */}
          </>
        ) : null}
        <Button
          startIcon={<ArrowForwardIosIcon />}
          variant={"contained"}
          onClick={handlerContinue}>
          Continue
        </Button>
      </Box>
    </Box>
  );
};

export default PlayListPage;
