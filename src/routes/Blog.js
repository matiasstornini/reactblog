import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Typography from "@material-ui/core/Typography";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
});
const disableselect = (e) => {
  return false;
};
document.onselectstart = disableselect;
document.onmousedown = disableselect;
export default function LinearBuffer() {
  const classes = useStyles();
  const [progress, setProgress] = React.useState(0);
  const [buffer, setBuffer] = React.useState(10);
  /** */
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [darkMode, setDarkMode] = React.useState(prefersDarkMode);
  ///console.log(prefersDarkMode);

  const theme = React.useMemo(() =>
    createTheme({
      palette: {
        type: darkMode ? "dark" : "light",
      },
    })
  );
  useEffect(() => {
    setDarkMode(prefersDarkMode);
  }, [prefersDarkMode]);
  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
  };

  /* VARS SIMPLES*/
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const txt = urlParams.get("txt");
  let Frases = [
    "Delay estimado: 20 segundos a 1 minuto.",
    "Las opciones chinas, son estables, y las que menos delay tienen.",
    "Ante cualquier error, reiniciar la app.",
  ];
  const [frase, setFrase] = React.useState(Frases[0]);
  /* /VARS SIMPLES*/

  const progressRef = React.useRef(() => {});
  React.useEffect(() => {
    progressRef.current = () => {
      if (progress > 100) {
        setProgress(0);
        setBuffer(10);
      } else {
        const diff = Math.random() * 10;
        const diff2 = Math.random() * 10;
        setProgress(progress + diff);
        setBuffer(progress + diff + diff2);
      }

      if (progress > 100) {
        const url = "https://docs.google.com/spreadsheets/d/";
        const ssid = "1-kq0XXTaxdl98FaqpLtgQo5cWmWy8LpbwVbppjvq3Uk";
        const q1 = "/gviz/tq?";
        const q2 = "tqx=out:json";
        const q3 = "sheet=Sheet6";
        let url1 = `${url}${ssid}${q1}&${q2}`;

        console.log(url1);
        fetch(url1)
          .then((res) => res.text())
          .then((data) => {
            const json = JSON.parse(data.substr(47).slice(0, -2));
            let lista = [];
            json.table.rows.forEach((row) => {
              row.c.forEach((cell) => {
                lista.push(cell.v);
              });
            });
            window.location.href = lista[txt];
          });
      }
      if (progress < 33) {
        setFrase(Frases[0]);
      } else if ((progress > 33) & (progress < 75)) {
        setFrase(Frases[1]);
      } else {
        setFrase(Frases[2]);
      }
    };
  });

  React.useEffect(() => {
    const timer = setInterval(() => {
      progressRef.current();
    }, 300);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <div className={classes.root}>
        <Typography variant="h4" component="h5" align="center">
          Cargando...
        </Typography>
        <br />
        <LinearProgress
          variant="buffer"
          value={progress}
          valueBuffer={buffer}
        />
        <p></p>
        <h4 align="center">{frase}</h4>
        <div></div>
      </div>
    </ThemeProvider>
  );
}
