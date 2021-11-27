import React from "react";
import Box from "@mui/material/Box";
import FormInfo from "./FormInfo";
import GameCard from "./GameCard";
// import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
// import InputLabel from "@mui/material/InputLabel";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
// import MenuItem from "@mui/material/MenuItem";
import List from "@mui/material/List";
// import Select from "@mui/material/Select";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import Pagination from "@mui/material/Pagination";
import { makeStyles } from "@material-ui/core/styles";
import SortIcon from "@mui/icons-material/Sort";

function Search() {
  const [page, setPage] = React.useState(1);
  const [filterDrawer, setFilterDrawer] = React.useState(false);
  const handlePageChange = (event, value) => {
    setPage(value);
  };
  const useStyles = makeStyles((theme) => ({
    root: {
      "& > *": {
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
      },
    },
    pagination: {
      marginY: 5,
    },
  }));

  const toggleFilterDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setFilterDrawer({ ...filterDrawer, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleFilterDrawer(anchor, false)}
      onKeyDown={toggleFilterDrawer(anchor, false)}
    >
      <List>
    
        <ListItem button key={"create"}>
          <ListItemIcon>
            <SortIcon></SortIcon>
          </ListItemIcon>
          <ListItemText primary={"create"} />
        </ListItem>
        <ListItem button key={"search"}>
          <ListItemIcon>
            <SortIcon></SortIcon>
          </ListItemIcon>
          <ListItemText primary={"search"} />
        </ListItem>
        <ListItem button key={"manage"}>
          <ListItemIcon>
            <SortIcon></SortIcon>
          </ListItemIcon>
          <ListItemText primary={"manage"} />
        </ListItem>
      </List>
    </Box>
  );

  const styles = useStyles();

  return (
    <Box
      sx={{ flexGrow: 1, mt: 17, paddingX: { xs: 4, sm: 6, md: 8, lg: 12 } }}
    >
      <FormInfo
        title="Search"
        subtitle="Looking for a game? Use the search bar to search any game you want. Don't forget to use sorting and filtering to specify your search in detail."
      ></FormInfo>

      <div>
        <TextField
          id="search-bar"
          label="Search"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
          // defaultValue="Search for a game."
        />
      </div>

      <div>
        <React.Fragment key={"left"}>
          <Button
            variant="contained"
            color="grey"
            onClick={toggleFilterDrawer("left", true)}
            sx={{
              fontWeight: "bold",
              color: "#d8dee9",
              backgroundColor: "#4c566a",
              marginTop: 5,
              marginX: 2,
            }}
            endIcon={<FilterAltIcon />}
          >
            FILTER
          </Button>
          <Drawer
            anchor={"left"}
            open={filterDrawer["left"]}
            PaperProps={{
              style: {
                backgroundColor: "#eceff4",
              },
            }}
            onClose={toggleFilterDrawer("left", false)}
          >
            {list("left")}
          </Drawer>
        </React.Fragment>
        <Button
          variant="contained"
          color="grey"
          sx={{
            fontWeight: "bold",
            color: "#d8dee9",
            backgroundColor: "#4c566a",
            marginTop: 5,
            marginX: 2,
          }}
          endIcon={<SortIcon />}
        >
          SORT
        </Button>
      </div>

      <Grid container sx={{ my: 4, alignItems:"stretch"}} spacing={4}>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <GameCard
            game="D&D 5e"
            adventureName="Curse of Strahd"
            medium="Online(Roll20)"
            length="Campaign"
            playerCount="5/7"
            storyType="Prewritten"
            language="English"
          ></GameCard>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <GameCard
            game="D&D 3.5"
            adventureName="Wave Echo Cave"
            medium="Online(Foundry)"
            length="Long Adventure"
            playerCount="2/5"
            storyType="Prewritten"
            language="Turkish"
          ></GameCard>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <GameCard
            game="Pathfinder 2e"
            adventureName="Out of the Abyys"
            medium="Istanbul, Turkey"
            length="One Shot"
            playerCount="1/4"
            storyType="Homebrew"
            language="English"
          ></GameCard>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <GameCard
            game="FATE: Core"
            adventureName="Dragon Heist"
            medium="Online(Roll20)"
            length="Mini Adventure"
            playerCount="3/5"
            storyType="Prewritten"
            language="English"
          ></GameCard>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <GameCard
            game="Starfinder"
            adventureName="Mad Mage"
            medium="LA, USA"
            length="Campaign"
            playerCount="4/5"
            storyType="Homebrew"
            language="English"
          ></GameCard>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <GameCard
            game="D&D 5e"
            adventureName="Witchlight"
            medium="Online(Foundry)"
            length="Campaign"
            playerCount="0/5"
            storyType="Prewritten"
            language="German"
          ></GameCard>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <GameCard
            game="Call of Cthulhu 7e"
            adventureName="Below the Surface"
            medium="London, UK"
            length="One-Shot"
            playerCount="3/7"
            storyType="Homebrew"
            language="English"
          ></GameCard>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <GameCard
            game="Pathfinder 1e"
            adventureName="Storm King"
            medium="Berlin, Germany"
            length="Adventure"
            playerCount="2/6"
            storyType="Prewritten"
            language="Spanish"
          ></GameCard>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <GameCard
            game="Shadowrun 6e"
            adventureName="Candlekeep"
            medium="Online(Astral)"
            length="Campaign"
            playerCount="2/8"
            storyType="Homebrew"
            language="English"
          ></GameCard>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <GameCard
            game="FATE: Core"
            adventureName="Exandria: Unlimited"
            medium="Online(Astral)"
            length="Adventure"
            playerCount="4/5"
            storyType="Homebrew"
            language="French"
          ></GameCard>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <GameCard
            game="D&D 5e"
            adventureName="Eberron"
            medium="Sydney, Australia"
            length="One-Shot"
            playerCount="2/5"
            storyType="Prewritten"
            language="English"
          ></GameCard>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <GameCard
            game="Pathfinder 2e"
            adventureName="A Call from Beyond"
            medium="Online(Foundry)"
            length="Mini Adventure"
            playerCount="3/5"
            storyType="Homebrew"
            language="Turkish"
          ></GameCard>
        </Grid>

      </Grid>

      <div className={styles.root}>
        <Pagination
          sx={{ marginY: 5 }}
          count={10}
          page={page}
          onChange={handlePageChange}
        />
      </div>
    </Box>
  );
}

export default Search;
