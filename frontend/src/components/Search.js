import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import FormInfo from "./FormInfo";
import GameCard from "./GameCard";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import InputLabel from "@mui/material/InputLabel";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Autocomplete from "@mui/material/Autocomplete";
import ToggleButton from "@mui/material/ToggleButton";
// import Drawer from "@mui/material/Drawer";
import MenuItem from "@mui/material/MenuItem";
// import List from "@mui/material/List";
import Select from "@mui/material/Select";
// import ListItem from "@mui/material/ListItem";
// import ListItemIcon from "@mui/material/ListItemIcon";
// import ListItemText from "@mui/material/ListItemText";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import Pagination from "@mui/material/Pagination";
import { makeStyles } from "@material-ui/core/styles";
import SortIcon from "@mui/icons-material/Sort";

function Search() {
  const [groups, setGroups] = useState([]);
  // const [inGroup, setInGroup] = useState([]);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(5);
  const [limit, setLimit] = useState(12);
  const [filters, setFilters] = useState({
    gameSystem: "",
    medium: "",
    adventureLength: "",
    language: "",
  });

  const [sort, setSort] = useState({
    sortBy: "Create Time",
    orderBy: 'DESC',
  });

  const [showFilters, setShowFilters] = React.useState(false);
  const [showSort, setShowSort] = React.useState(false);

  const getGroups = async () => {
    try {
      const sortBy = getSort(sort.sortBy)
      // console.log(sortBy)
      // console.log(sort.orderBy)

      // const temp_lang = filters.language === null ? '' : filters.language;  
      const response = await fetch(`http://localhost:5000/groups?page=${page}&limit=${limit}&sortBy=${sortBy}&orderBy=${sort.orderBy}&gameSystem=${filters.gameSystem}&medium=${filters.medium}&adventureLength=${filters.adventureLength}&language=${filters.language}`);
      const jsonRes = await response.json();
      setGroups(jsonRes.groups);
      setPageCount(jsonRes.pageCount);
      // console.log(jsonRes);
    } catch (err) {
      console.error(err.message);
    }
  };

  // const getInGroup = async () => {
  //   try {
  //     const userid = localStorage.getItem("user");
  //     const response = await fetch(`http://localhost:5000/group/${userid}`);
  //     const jsonRes = await response.json();

  //     // console.log(jsonRes);
  //     await setInGroup(jsonRes);
  //     // console.log(inGroup);

  //   } catch (err) {
  //     console.error(err.message);
  //   }
  // }

  useEffect(() => {
    getGroups();
    // getInGroup();

  }, [page]);

  const handleChangeFilterGameSystem = (event) => {
    setFilters({ ...filters, gameSystem: event.target.value });
  };
  const handleChangeFilterMedium = (event) => {
    setFilters({ ...filters, medium: event.target.value });
  };
  const handleChangeFilterAdventureLength = (event) => {
    setFilters({ ...filters, adventureLength: event.target.value });
  };

  const handlePageChange = (event, value) => {
    // console.log(value);

    setPage(value);
    getGroups();
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

  const styles = useStyles();

  const getSort = (sort) => {
    if (sort === "Create Time") return 'group_id';
    else if (sort === "Player Count") return 'available_player_count' 
    else if (sort === "Experience Level") return 'player_experience_level'
    else return null; 
  }

  const handleSearch = () => {

    getGroups();

  }

  const languages = [
    "Abkhaz",
    "Afar",
    "Afrikaans",
    "Akan",
    "Albanian",
    "Amharic",
    "Arabic",
    "Aragonese",
    "Armenian",
    "Assamese",
    "Avaric",
    "Avestan",
    "Aymara",
    "Azerbaijani",
    "Bambara",
    "Bashkir",
    "Basque",
    "Belarusian",
    "Bengali",
    "Bihari",
    "Bislama",
    "Bosnian",
    "Breton",
    "Bulgarian",
    "Burmese",
    "Catalan",
    "Chamorro",
    "Chechen",
    "Chichewa",
    "Chinese",
    "Chuvash",
    "Cornish",
    "Corsican",
    "Cree",
    "Croatian",
    "Czech",
    "Danish",
    "Divehi",
    "Dutch",
    "English",
    "Esperanto",
    "Estonian",
    "Ewe",
    "Faroese",
    "Fijian",
    "Finnish",
    "French",
    "Fula",
    "Galician",
    "Georgian",
    "German",
    "Greek",
    "Guaraní",
    "Gujarati",
    "Haitia",
    "Hausa",
    "Hebrew",
    "Herero",
    "Hindi",
    "Hiri Motu",
    "Hungarian",
    "Interlingua",
    "Indonesian",
    "Interlingue",
    "Irish",
    "Igbo",
    "Inupiaq",
    "Ido",
    "Icelandic",
    "Italian",
    "Inuktitut",
    "Japanese",
    "Javanese",
    "Kalaallisut",
    "Kannada",
    "Kanuri",
    "Kashmiri",
    "Kazakh",
    "Khmer",
    "Kikuyu",
    "Kinyarwanda",
    "Kirghiz",
    "Komi",
    "Kongo",
    "Korean",
    "Kurdish",
    "Kwanyama",
    "Latin",
    "Luxembourgish",
    "Luganda",
    "Limburgish",
    "Lingala",
    "Lao",
    "Lithuanian",
    "Luba-Katanga",
    "Latvian",
    "Manx",
    "Macedonian",
    "Malagasy",
    "Malay",
    "Malayalam",
    "Maltese",
    "Māori",
    "Marathi",
    "Marshallese",
    "Mongolian",
    "Nauru",
    "Navajo",
    "North Ndebele",
    "Nepali",
    "Ndonga",
    "Norwegian",
    "Nuosu",
    "South Ndebele",
    "Occitan",
    "Ojibwe",
    "Oromo",
    "Oriya",
    "Ossetian",
    "Panjabi",
    "Pāli",
    "Persian",
    "Polish",
    "Pashto",
    "Portuguese",
    "Quechua",
    "Romansh",
    "Kirundi",
    "Romanian",
    "Russian",
    "Sanskrit",
    "Sardinian",
    "Sindhi",
    "Northern Sami",
    "Samoan",
    "Sango",
    "Serbian",
    "Scottish Gaelic",
    "Shona",
    "Sinhala",
    "Slovak",
    "Slovene",
    "Somali",
    "Southern Sotho",
    "Spanish",
    "Sundanese",
    "Swahili",
    "Swati",
    "Swedish",
    "Tamil",
    "Telugu",
    "Tajik",
    "Thai",
    "Tigrinya",
    "Tibetan",
    "Turkmen",
    "Tagalog",
    "Tswana",
    "Tonga",
    "Turkish",
    "Tsonga",
    "Tatar",
    "Twi",
    "Tahitian",
    "Uighur",
    "Ukrainian",
    "Urdu",
    "Uzbek",
    "Venda",
    "Vietnamese",
    "Volapük",
    "Walloon",
    "Welsh",
    "Wolof",
    "Western Frisian",
    "Xhosa",
    "Yiddish",
    "Yoruba",
    "Zhuang",
  ];

  const tagList = [
    "Absurd",
    "Adults Only",
    "Casual",
    "Character Driven",
    "Combat-heavy",
    "Comedy",
    "Dark",
    "Dragonlance",
    "Dungeon Crawler",
    "Eberron",
    "Epic Fantasy",
    "Forgotten Realms",
    "Fun Prioritized",
    "Gothic",
    "Grim",
    "Hardcore Play",
    "Heavy Prep",
    "High Magic",
    "High Tier",
    "Homebrew",
    "Horror",
    "Improvisation",
    "Kid-friendly",
    "Low Magic",
    "Low Tier",
    "Maraton Sessions",
    "Mediaval",
    "Mid Tier",
    "Multiple GM",
    "Murderhobo",
    "New GM",
    "No Prep",
    "Old School",
    "Open-world",
    "Prewritten",
    "Railroad",
    "Realistic",
    "RP-heavy",
    "Rule of Fun",
    "Rules-heavy",
    "Sandbox",
    "Serious",
    "Solo",
    "Strategic",
    "Urban",
    "Vampire",
    "Werewolf",
    "Worldbuilding",
  ];

  return (
    <Box
      sx={{ flexGrow: 1, mt: 17, paddingX: { xs: 4, sm: 6, md: 8, lg: 12 } }}
    >
      <FormInfo
        title="Search"
        type="title"
        subtitle="Looking for a game? Use the search bar to search any game you want. Don't forget to use sorting and filtering to specify your search in detail."
      ></FormInfo>

      <Divider variant="middle" />

      <div>
        <FormControl
          sx={{
            minWidth: 275,
            width: "75%",
            maxWidth: 350,
            marginX: 1,
            marginBottom: 2,
            marginTop: 5,
          }}
        >
          <Autocomplete
            multiple
            id="tags-outlined"
            options={tagList}
            getOptionLabel={(option) => option}
            filterSelectedOptions
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            // value={values.tags}
            // onChange={handleChangeTags}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Search tags"
                //   placeholder="Choose one or more tags"
              />
            )}
          />
        </FormControl>
        {/* <TextField
          id="search-bar"
          label="Search tags"
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
        /> */}
      </div>

      <div>
        <Button
          variant="contained"
          color="grey"
          sx={{
            fontWeight: "bold",
            color: "#d8dee9",
            backgroundColor: "#4c566a",
            marginTop: 5,
            marginRight: 1,
          }}
          onClick={() => {
            setShowFilters(!showFilters);
          }}
          endIcon={<FilterAltIcon />}
        >
          FILTER
        </Button>
        <Button
          variant="contained"
          color="grey"
          sx={{
            fontWeight: "bold",
            color: "#d8dee9",
            backgroundColor: "#4c566a",
            marginTop: 5,
            marginX: 1,
          }}
          endIcon={<SearchIcon />}
          onClick={handleSearch}
        >
          SEARCH
        </Button>
        <Button
          variant="contained"
          color="grey"
          sx={{
            fontWeight: "bold",
            color: "#d8dee9",
            backgroundColor: "#4c566a",
            marginTop: 5,
            marginLeft: 1,
          }}
          onClick={() => {
            setShowSort(!showSort);
          }}
          endIcon={<SortIcon />}
        >
          SORT
        </Button>
      </div>

      {showFilters ? (
        <div>
          <FormControl sx={{ marginX: 1, marginTop: 5 }}>
            <InputLabel>Game System</InputLabel>
            <Select
              required
              id="adventure-length-select"
              value={filters.gameSystem}
              // variant="filled"
              label="Game System"
              sx={{ width: 170 }}
              onChange={handleChangeFilterGameSystem}
            >
              <MenuItem value="">Any</MenuItem>
              <MenuItem value="Dungeons & Dragons">Dungeons & Dragons</MenuItem>
              <MenuItem value="Pathfinder">Pathfinder</MenuItem>
              <MenuItem value="Starfinder">Starfinder</MenuItem>
              <MenuItem value="Shadowrun">Shadowrun</MenuItem>
              <MenuItem value="FATE">FATE</MenuItem>
              <MenuItem value="Vampire: The Masquerade">
                Vampire: The Masquerade
              </MenuItem>
              <MenuItem value="Call of Cthulhu">Call of Cthulhu</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ marginX: 1, marginTop: 5 }}>
            <InputLabel>Medium</InputLabel>
            <Select
              required
              id="medium-select"
              value={filters.medium}
              // variant="filled"
              label="Medium"
              sx={{ width: 170 }}
              onChange={handleChangeFilterMedium}
            >
              <MenuItem value="">Any</MenuItem>
              <MenuItem value="Online">Online</MenuItem>
              <MenuItem value="IRL">IRL</MenuItem>
              <MenuItem value="Hybrid">Hybrid</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ marginX: 1, marginTop: 5 }}>
            <InputLabel>Adventure Length</InputLabel>
            <Select
              required
              id="adventure-length-select"
              value={filters.adventureLength}
              // variant="filled"
              label="Adventure Length"
              sx={{ width: 170 }}
              onChange={handleChangeFilterAdventureLength}
            >
              <MenuItem value="">Any</MenuItem>
              <MenuItem value="One-Shot">One-Shot</MenuItem>
              <MenuItem value="Mini adventure">Mini adventure</MenuItem>
              <MenuItem value="Adventure">Adventure</MenuItem>
              <MenuItem value="Long Adventure">Long Adventure</MenuItem>
              <MenuItem value="Campaign">Campaign</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ marginX: 1, marginTop: 5 }}>
            <Autocomplete
              disablePortal
              id="language-select"
              options={languages}
              variant="filled"
              defaultValue=''
              value={filters.language}
              sx={{ width: 170 }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="Game Language"
                />
              )}
              onChange={(event, newValue) => {
                setFilters({ ...filters, language: newValue ? newValue : '' });
              }}
            />
          </FormControl>
        </div>
      ) : null}

      {showSort ? (
        <div>
          <FormControl sx={{ marginX: 2, marginTop: 5 }}>
            <InputLabel>Sort By</InputLabel>
            <Select
              required
              id="sort-select"
              // size='small'
              value={sort.sortBy}
              // variant="filled"
              label="Sort By"
              sx={{ width: 170 }}
              onChange={(event) => {
                setSort({ ...sort, sortBy: event.target.value });
              }}
            >
              <MenuItem value="Create Time">Create Time</MenuItem>
              <MenuItem value="Player Count">Player Count</MenuItem>
              <MenuItem value="Experience Level">Experience Level</MenuItem>
            </Select>
          </FormControl>

          <ToggleButton
            sx={{ marginTop: 5 }}
            size="large"
            value={sort.orderBy}
            // selected={selected}
            onClick={() => {
              setSort({ ...sort, orderBy: sort.orderBy === 'DESC' ? 'ASC' : 'DESC' });
              // console.log(sort.orderBy);
            }}
          >
            {sort.orderBy === 'DESC' ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />}
          </ToggleButton>
        </div>
      ) : null}

      <Grid container sx={{ my: 4, alignItems: "stretch" }} spacing={4}>
        {groups.map((group) => (
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <GameCard
              group={group}
              page="search"
            ></GameCard>
          </Grid>
        ))}

      </Grid>

      <div className={styles.root}>
        <Pagination
          sx={{ marginY: 5 }}
          count={pageCount}
          page={page}
          onChange={handlePageChange}
        />
      </div>
    </Box>
  );
}

export default Search;
