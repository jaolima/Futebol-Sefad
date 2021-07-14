import React, { useEffect } from "react";
// plugin that creates slider
import Slider from "nouislider";
// @material-ui/core components
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Radio from "@material-ui/core/Radio";
import Switch from "@material-ui/core/Switch";
// @material-ui/icons
import Favorite from "@material-ui/icons/Favorite";
import People from "@material-ui/icons/People";
import Check from "@material-ui/icons/Check";
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import CustomLinearProgress from "components/CustomLinearProgress/CustomLinearProgress.js";
import Paginations from "components/Pagination/Pagination.js";
import Badge from "components/Badge/Badge.js";

import styles from "assets/jss/material-kit-react/views/componentsSections/basicsStyle.js";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import Close from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import api, { configRequest } from '../../../services/api';
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import Face from "@material-ui/icons/Face";
import Chat from "@material-ui/icons/Chat";
import Build from "@material-ui/icons/Build";
import image from "assets/img/faces/avatar.jpg";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

function createData(name, calories, fat, protein) {
  return { name, calories, fat, protein };
}

const rows = [
  createData('Brasileirão - Série D', '10/07 15:00', 'Brasiliense v Aparecidense'),
  createData('Brasileirão - Série D', '18/07 15:30', 'SC Jaragua v Brasiliense')
];

const useStyles = makeStyles(styles);

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

Transition.displayName = "Transition";


export default function SectionBasics() {

  const classes = useStyles();
  const [checked, setChecked] = React.useState([24, 22]);
  const [selectedEnabled, setSelectedEnabled] = React.useState("b");
  const [checkedA, setCheckedA] = React.useState(true);
  const [checkedB, setCheckedB] = React.useState(false);
  const [classicModal, setClassicModal] = React.useState(false);
  const [champions, setChampions] = React.useState([]);
  const [table, setTable] = React.useState([]);
  const [teams, setTeam] = React.useState([]);
  const [step, setSteps] = React.useState(0);

  useEffect(() => {
    api.get('campeonatos', configRequest()).then((res) => {
      const { data } = res;
      setChampions(data);
    })
  }, [])

  const setTables = (idChampion) => {
    api.get(`campeonatos/${idChampion}/tabela`, configRequest()).then((res) => {
      const { data } = res;
      setTable(data);
      setSteps(1);
    })
  }

  const setTeams = (id) => {
    api.get(`times/${id}`, configRequest()).then((res) => {
      const { data } = res;
      setTeam(data);
      setSteps(2);
    })
  }

  const match = (type, teamId) => {
    switch (type) {
      case 1:
        // api.get(`times/${teamId}/partidas/proximas`).then((res) => {
        //   const {data} = res;
        //   console.log(data)
        // })
        break;
      case 2:
        // api.get(`times/${teamId}/partidas/anteriores`).then((res) =>{
        //   const {data} = res;
        //   console.log(data)
        // })
        break;
      case 3:
        // api.get(`times/${teamsId}/partidas/ao-vivo`).then((res) => {
        //   const {data} = res;
        //   console.log(res)
        // })
        break;    
    }
    setSteps(3);
  }

  const handleToggle = (value) => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };
  return (
    <div className={classes.sections}>
      <div className={classes.container}>

        <div className={classes.title}>
          <h2>Competições 2021</h2>
        </div>
        <div id="buttons">
          <button onClick={() => setSteps(step - 1)} >voltar</button>

          <Dialog
            classes={{
              root: classes.center,
              paper: classes.modal,
            }}
            open={classicModal}
            TransitionComponent={Transition}
            keepMounted
            onClose={() => setClassicModal(false)}
            aria-labelledby="classic-modal-slide-title"
            aria-describedby="classic-modal-slide-description"
          >
            <DialogTitle
              id="classic-modal-slide-title"
              disableTypography
              className={classes.modalHeader}
            >
              <IconButton
                className={classes.modalCloseButton}
                key="close"
                aria-label="Close"
                color="inherit"
                onClick={() => setClassicModal(false)}
              >
                <Close className={classes.modalClose} />
              </IconButton>
              <h4 className={classes.modalTitle}>Aqui podem aparecer algumas informações</h4>
            </DialogTitle>
            <DialogContent
              id="classic-modal-slide-description"
              className={classes.modalBody}
            >
              <p>
                .....
              </p>
            </DialogContent>
            <DialogActions className={classes.modalFooter}>
              <Button
                onClick={() => setClassicModal(false)}
                color="danger"
                simple
              >
                Fechar
              </Button>
            </DialogActions>
          </Dialog>

          <TableContainer component={Paper}>
            {step === 0 && <>
              <Table className={classes.table} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Campeonato</StyledTableCell>
                    <StyledTableCell align="right">Data</StyledTableCell>
                    <StyledTableCell align="right">Times</StyledTableCell>
                    <StyledTableCell align="right"></StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>

                  {champions.map((row) => (
                    <StyledTableRow key={row.nome}>
                      <StyledTableCell component="th" scope="row">
                        <img style={{ height: '150px' }} src={row.logo} />
                        {row.nome_popular}
                      </StyledTableCell>
                      <StyledTableCell align="right">{row.status}</StyledTableCell>
                      <StyledTableCell align="right">{row.fat}</StyledTableCell>
                      <StyledTableCell align="right"><Button
                        block
                        onClick={() => setTables(row.campeonato_id)}
                      >
                        Visualizar
                      </Button></StyledTableCell>
                    </StyledTableRow>
                  ))}

                </TableBody>
              </Table>
            </>}

            {step === 1 && <>
              <Table className={classes.table} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Times</StyledTableCell>
                    <StyledTableCell align="right">Pontos</StyledTableCell>
                    <StyledTableCell align="right">Jogos</StyledTableCell>
                    <StyledTableCell align="right">Vitórias</StyledTableCell>
                    <StyledTableCell align="right">Derrotas</StyledTableCell>
                    <StyledTableCell align="right"></StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>

                  {table.map((row) => (
                    <StyledTableRow key={row.nome}>
                      <StyledTableCell component="th" scope="row">
                        <img style={{ height: '80px' }} src={row.time.escudo} />
                        {row.time.nome_popular}
                      </StyledTableCell>
                      <StyledTableCell align="right">{row.pontos}</StyledTableCell>
                      <StyledTableCell align="right">{row.jogos}</StyledTableCell>
                      <StyledTableCell align="right">{row.vitorias}</StyledTableCell>
                      <StyledTableCell align="right">{row.derrotas}</StyledTableCell>
                      <StyledTableCell align="right"><Button
                        block
                        onClick={() => setTeams(row.time.time_id)}
                      >
                        Ver jogos
                      </Button></StyledTableCell>
                    </StyledTableRow>
                  ))}

                </TableBody>
              </Table>
            </>}

            {step === 2 && <>

              <Grid container className={classes.root} spacing={2}>
      <Grid item xs={12}>
        <Grid container justifyContent="center" spacing={spacing}>
          {[0, 1, 2].map((value) => (
            <Grid key={value} item>
              <Paper className={classes.paper} />
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Paper className={classes.control}>
          <Grid container>
            <Grid item>
              <FormLabel>spacing</FormLabel>
              <RadioGroup
                name="spacing"
                aria-label="spacing"
                value={spacing.toString()}
                onChange={handleChange}
                row
              >
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
                  <FormControlLabel
                    key={value}
                    value={value.toString()}
                    control={<Radio />}
                    label={value.toString()}
                  />
                ))}
              </RadioGroup>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
    
              <div className={classes.section}>
                <div className={classes.container}>
                  <div id="images">
                  <GridContainer>
                    <GridItem xs={12} sm={2} className={classes.marginLeft}>
                      <h4>{teams.nome}</h4>
                      <img
                        src={teams.escudo}
                        alt="..."
                        className={classes.imgRoundedCircle + " " + classes.imgFluid}
                      />
                    </GridItem>
                    </GridContainer>
                  </div>
                </div>
              </div>
              <Button onClick={() => match(1, teams.time_id)} >Próximas Partidas</Button>
              <Button onClick={() => match(2, teams.time_id)}>Partidas Anteriores</Button>
              <Button onClick={() => match(3, teams.time_id)}>Partidas ao vivo</Button>
            </>}

            {step === 3 && <>
              <div className={classes.section}>
                <div className={classes.container}>
                  <div id="images">
                  <GridContainer>
                    <GridItem xs={12} sm={2} className={classes.marginLeft}>
                      <h4>Vasco</h4>
                      <img
                        src={image}
                        alt="..."
                        className={classes.imgRoundedCircle + " " + classes.imgFluid}
                      />
                      x
                      <h4>São Paulo</h4>
                      <img
                        src={image}
                        alt="..."
                        className={classes.imgRoundedCircle + " " + classes.imgFluid}
                      />
                    </GridItem>
                    </GridContainer>
                  </div>
                </div>
              </div>
            </>}
          </TableContainer>
        </div>
      </div>
    </div>
  );
}
