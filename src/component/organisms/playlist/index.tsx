import { Box, Button, Typography } from "@mui/material";
// import DatabaseTable from "component/molecules/upgrade/DatabaseTable";
// import VersionTable from "component/molecules/version_info/VersionTable";
import { useState, useEffect } from "react";
import { GrNext } from "react-icons/gr";
import { useNavigate, useParams } from "react-router-dom";
import { toastMessage } from "../../molecules/toast";
import { PlayList } from "component/molecules/home/PlayList";
import { SongList } from "component/molecules/home/SongList";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const PlayListPage = () => {
  const { version } = useParams();
  // const [databases, setDatabases] = useState<UpgradeableDatabase[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

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
            <SongList />
            {/* <DatabaseTable
                databases={databases}
                onDatabaseSelectionChange={handleDatabasesChange}
              /> */}
          </>
        ) : null}
        <Button
          startIcon={<ArrowForwardIosIcon />}
          variant={"contained"}
          // onClick={handlerContinue}
        >
          Continue
        </Button>
      </Box>
    </Box>
  );
};

export default PlayListPage;
