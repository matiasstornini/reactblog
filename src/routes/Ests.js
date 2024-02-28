import React /*, { useState, useEffect } */ from "react";
import { makeStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    width: "100%"
  }
});

export default function LinearBuffer() {
  const classes = useStyles();
  const [progress, setProgress] = React.useState(0);
  const [buffer, setBuffer] = React.useState(10);
  /* VARS SIMPLES*/
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  //const v = urlParams.get("v");
  const txt = urlParams.get("txt");

  //console.log(v + "  " + m);
  /* */
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
      //console.log(progress);

      if (progress > 100) {
        //const output = document.querySelector(".output");

        const url = "https://docs.google.com/spreadsheets/d/";
        const ssid = "1KlbYfjyegeeXt3Xxul8_BagK3SPJZkHpjK6mBO0E0_Y";
        const q1 = "/gviz/tq?";
        const q2 = "tqx=out:json";
        const q3 = "sheet=Sheet6";
        let url1 = `${url}${ssid}${q1}&${q2}&${q3}`;
        let html = "";

        fetch(url1)
          .then((res) => res.text())
          .then((data) => {
            const json = JSON.parse(data.substr(47).slice(0, -2));
            //console.log(json.table);
            //const headings = makeCell(output,'','heading');
            let lista = [];
            json.table.rows.forEach((row) => {
              //console.log(row);
              //const div = makeCell(output,'','row');
              row.c.forEach((cell) => {
                //const ele1 = makeCell(div,`${cell.v}`,'box');
                //console.log(cell.v);
                //console.log(url1);
                lista.push(cell.v);
                //window.location.href = lista[txt];
              });
            });
            //window.location.href = lista[txt];
            html += `
            <h1>${lista[0]} - ${lista[1]}</h1>
            `;
            document.getElementById("Matchs").innerHTML = html;
          });
        //window.location.href = cell.v;
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
    <div className={classes.root}>
      <Typography variant="h4" component="h5" align="center">
        Cargando
      </Typography>
      <br />
      <LinearProgress variant="buffer" value={progress} valueBuffer={buffer} />

      <div id="Matchs"></div>
    </div>
  );
}
