import { useState, useEffect } from "react";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import * as React from "react";
import TextField from "@mui/material/TextField";
import Transition from "./Transition";

export default function Main() {
  // Wyświetlenie wyniku
  const [car, setCars] = useState([]);
  const [newCar, setNewCar] = useState();
  const [editCar, setEditCar] = useState();
  // Stan przechowujący id samochodu do edycji
  const [editCarId, setEditCarId] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/car/serializerscar/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setCars(data))
      .catch((error) => console.error("Błąd pobierania danych", error));
  }, []);

  // Dodawanie do bazy
  const handleAddCar = () => {
    setNewCar("");
    fetch("http://127.0.0.1:8000/car/serializerscar/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: newCar }),
    }).then(() => {
      // Po dodaniu nowego samochodu odświeżam listę
      fetch("http://127.0.0.1:8000/car/serializerscar/")
        .then((res) => res.json())
        .then((data) => setCars(data))
        .catch((error) => console.error("Błąd pobierania danych", error));
    });
  };

  // Obsługa usuwania samochodu
  const handleDeleteCar = (id) => {
    fetch(`http://127.0.0.1:8000/car/serializerscar/${id}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(() => {
        // Po usunięciu samochodu odświeżam listę
        fetch("http://127.0.0.1:8000/car/serializerscar/")
          .then((res) => res.json())
          .then((data) => setCars(data))
          .catch((error) => console.error("Błąd pobierania danych", error));
      })
      .catch((error) => console.error("Błąd usuwania samochodu", error));
  };

  // Obsługa edycji samochodu
  const handleEditCar = (id, editCar) => {
    fetch(`http://127.0.0.1:8000/car/serializerscar/${id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: editCar }),
    }).then(() => {
      // Po dodaniu nowego samochodu odświeżam listę
      fetch("http://127.0.0.1:8000/car/serializerscar/")
        .then((res) => res.json())
        .then((data) => setCars(data))
        .catch((error) => console.error("Błąd pobierania danych", error));
    });
  };

  // Otwieranie okna edycji
  const [openWindow, setOpenWindow] = React.useState(false);

  const handleClickOpen = (id, title) => {
    setEditCarId(id);
    setEditCar(title);
    setOpenWindow(true);
  };

  const handleEditAccept = () => {
    handleEditCar(editCarId, editCar);
    setOpenWindow(false);
  };

  const handleClose = () => {
    setOpenWindow(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Testujemy</h1>
        <h3>Dodawanie samochodu</h3>
        <div>
          <input
            type="text"
            value={newCar}
            onChange={(e) => setNewCar(e.target.value)}
          />
          <Button variant="outlined" onClick={handleAddCar}>
            Dodaj samochód
          </Button>
        </div>
        <h3>Cała baza:</h3>
        {car.map((el, index) => {
          return (
            <div>
              <div
                style={{
                  position: "relative",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                }}
                key={index}
              >
                <div>{el.title}</div>
                <React.Fragment>
                  <Dialog
                    open={openWindow}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleClose}
                    aria-describedby="alert-dialog-slide-description"
                    onEntered={() =>
                      document.getElementById("edit-car-textfield").focus()
                    }
                  >
                    <DialogTitle>{`Edycja ${editCar}`}</DialogTitle>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-slide-description">
                        <br></br>
                        <TextField
                          id="edit-car-textfield"
                          label="Edycja samochodu"
                          value={editCar}
                          onChange={(e) => setEditCar(e.target.value)}
                          autoFocus
                          variant="outlined"
                        />
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button variant="outlined" onClick={handleClose}>
                        Anuluj
                      </Button>
                      <Button
                        variant="contained"
                        onClick={() => handleEditAccept(el.id)}
                      >
                        Akceptuję
                      </Button>
                    </DialogActions>
                  </Dialog>
                </React.Fragment>
                <EditIcon
                  style={{ cursor: "pointer", color: "yellow" }}
                  onClick={(e) => {
                    e.preventDefault();
                    handleClickOpen(el.id, el.title);
                  }}
                />
                <Button
                  variant="outlined"
                  onClick={() => handleDeleteCar(el.id)}
                >
                  Usuń
                </Button>
              </div>
            </div>
          );
        })}
      </header>
    </div>
  );
}
