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
  const [indexTeam, setIndexTeam] = React.useState(0);

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

  const turnBack = () => {
    step === 4 ? setSteps(step - 2) : setSteps(step - 1);
  }
  const match = (type, teamId) => {
    table.map((row, i) => {
      if(row.time.time_id === teamId)
      setIndexTeam(i);
    }

    )

    // setIndexTeam(index.findIndex(teamId))
    type === 2 ? setSteps(4) : setSteps(3);
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

        {step === 1 && (
          <div className={classes.title}>
            <h2>Competições 2021</h2>
          </div>
        )}

        {step === 3 && (
          <div className={classes.title}>
            <h2>Proximas Partidas</h2>
          </div>
        )}

        {step === 4 && (
          <div className={classes.title}>
            <h2>Partidas Anteriores</h2>
          </div>
        )}

        <Button onClick={() => turnBack()} >voltar</Button>

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
            <div className={classes.section}>
              <div className={classes.container}>
                <div id="images">
                  <GridContainer justify="center">
                    <GridItem xs={6} sm={5} className={classes.marginLeft}>
                      <div className={classes.typo}>
                        <h1>{teams.nome}</h1>
                      </div>
                    </GridItem>
                  </GridContainer>

                  <GridContainer justify="center">
                    <GridItem xs={12} sm={2} className={classes.marginLeft}>

                      <img
                        src={teams.escudo}
                        alt="..."
                        className={classes.imgRoundedCircle + " " + classes.imgFluid}
                      />
                    </GridItem>

                    <GridItem xs={6} sm={12} md={8}>
                      <Button onClick={() => match(1, teams.time_id)} >Próximas Partidas</Button>
                      <Button onClick={() => match(2, teams.time_id)}>Partidas Anteriores</Button>
                    </GridItem>


                  </GridContainer>
                </div>
              </div>
            </div>

          </>}

          {(step === 3 || step === 4) && <>
            {table.map((row) => (
              <>
                <GridContainer>

                  <GridItem xs={5} sm={6}>
                    <b>SÁB 17/07/2021</b> MORUMBI <b>17:00</b>
                  </GridItem>
                </GridContainer>

                <GridContainer>

                  <GridItem xs={5} sm={2}>
                    <img
                      src={table[indexTeam].time.escudo}
                      style={{ width: '100px' }}
                      alt="..."
                      className={classes.imgRounded + " " + classes.imgFluid}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={2}>
                    <h4>{table[indexTeam].time.nome_popular}</h4>
                  </GridItem>
                  <GridItem xs={12} sm={1}>
                    <h4>X</h4>
                  </GridItem>
                  <GridItem xs={12} sm={2}>
                    <h4>{row.time.nome_popular}</h4>
                  </GridItem>
                  <GridItem xs={5} sm={2}>
                    <img
                      src={row.time.escudo}
                      style={{ width: '100px' }}
                      alt="..."
                      className={classes.imgRounded + " " + classes.imgFluid}
                    />
                  </GridItem>
                </GridContainer>
              </>
            ))}
            <GridContainer />
          </>}
        </TableContainer>
      </div>
    </div>

  );
}
