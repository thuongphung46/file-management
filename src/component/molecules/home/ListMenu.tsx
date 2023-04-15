import { Box, Grid, Paper } from "@mui/material";
import Chart from "component/molecules/chart/Chart";
import Deposits from "component/molecules/chart/Deposits";

const data = [
  {
    id: 1,
    name: "Total Users",
    calories: "44,278",
    carbs: "5%",
    fat: "Last week",
  },
  {
    id: 2,
    name: "Total Profit",
    calories: "67,987",
    carbs: "0.75%",
    fat: "Last 6 days",
  },
  {
    id: 3,
    name: "Total Expenses",
    calories: "$76,965",
    carbs: "0.9%",
    fat: "Last 9 days",
  },
  {
    id: 4,
    name: "Total Cost",
    calories: "$59,765",
    carbs: "0.6%",
    fat: "Last year",
  },
];

export const ListMenu = () => {
  return (
    <Box padding={1}>
      <Box>
        <div style={{ padding: "16px 24px", color: "#44596e" }}>
          <Grid style={{ padding: "8px 8px", display: "flex" }}>
            {data.map((x) => {
              return (
                <Grid key={x.id} item xs={12} md={8} lg={9} marginRight={3}>
                  <Paper
                    sx={{
                      p: 4,
                      width: 350,
                      display: "flex",
                      flexDirection: "column",
                      height: 169,
                    }}>
                    <Deposits
                      key={x.id}
                      calories={x.calories.toString()}
                      carbs={x.carbs.toString()}
                      fat={x.fat.toString()}
                      name={x.name}
                    />
                  </Paper>
                </Grid>
              );
            })}
          </Grid>

          <div style={{ padding: "4px 8px", display: "flex" }}>
            <Grid item width={"69.5%"} marginRight={2}>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  height: 300,
                }}>
                <Chart />
              </Paper>
            </Grid>
            <Grid>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  height: 300,
                }}>
                <Deposits
                  calories={"test"}
                  carbs={"test"}
                  fat={"test"}
                  name={"test"}
                />
              </Paper>
            </Grid>
          </div>
        </div>
      </Box>
    </Box>
  );
};
