import { createMuiTheme, makeStyles } from '@material-ui/core/styles';
import purple from "@material-ui/core/colors/purple";
import green from "@material-ui/core/colors/green";



const useStyles = makeStyles((theme) => ({
  
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  margin: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },

}));


// Material index, set a theme
const newTheme = createMuiTheme({
  palette: {
    
    primary: {
      main: purple[500],
    },
    secondary: {
      main: green[500],
    },
  },
  typography: {
      h3: {
          fontWeight: "bold",
          padding: '50px'
      }
  }
});

export { newTheme, useStyles };



// useStyles will override the theme when called.

