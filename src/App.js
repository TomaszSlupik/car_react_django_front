import { useState, useEffect } from 'react';
import './App.css';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import * as React from 'react';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function App() {

  // Wyświetlenie wyniku
  const [car, setCars] = useState([])
  const [newCar, setNewCar] = useState()

  useEffect(() => {
    
    fetch("http://127.0.0.1:8000/car/serializerscar/", {
      method: "GET", 
      headers: {
        "Content-Type": "application/json",
      }
    }).then(res => res.json())
      .then(data => setCars(data))
      .catch(error => console.error('Błąd pobierania danych', error));
  }, [])

  // Dodawanie do bazy
  const handleAddCar =() => {
    setNewCar("")
    fetch("http://127.0.0.1:8000/car/serializerscar/", {
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
      }, 
      body: JSON.stringify({ title : newCar})
    })
    .then(() => {
            // Po dodaniu nowego samochodu odświeżam listę
            fetch("http://127.0.0.1:8000/car/serializerscar/")
            .then(res => res.json())
            .then(data => setCars(data))
            .catch(error => console.error('Błąd pobierania danych', error));
    }
    )
  }

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
        .then(res => res.json())
        .then(data => setCars(data))
        .catch(error => console.error('Błąd pobierania danych', error));
    })
    .catch(error => console.error('Błąd usuwania samochodu', error));
  };


  // Otwieranie okna edycji
  const [openWindow, setOpenWindow] = React.useState(false);

  const handleClickOpen = (title) => {
    console.log(title)
    setOpenWindow(true);
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
              <input type='text' 
              value={newCar}
              onChange={(e) => setNewCar(e.target.value)} />
              <Button 
              variant='outlined'
              onClick={handleAddCar}>
                Dodaj samochód
              </Button>
          </div>
        <h3>Cała baza:</h3>
        {
          car.map((el, index) => {
            return (
                <div>
                  <div style={{position: 'relative', display: "flex", flexDirection: "row", justifyContent: 'center'}} key={index}>
                    <div>{el.title}</div> 
                    <EditIcon 
                    onClick={() => handleClickOpen(el.title)}
                    />
                    <Button
                    variant='outlined'
                    onClick={() => handleDeleteCar(el.id)}
                    >Usuń</Button>
                </div>  
                  <React.Fragment>
                    <Dialog
                      open={openWindow}
                      TransitionComponent={Transition}
                      keepMounted
                      onClose={handleClose}
                      aria-describedby="alert-dialog-slide-description"
                    >
                      <DialogTitle>{"Use Google's location service?"}</DialogTitle>
                      <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                          cos tutaj bedzie 
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={handleClose}>Disagree</Button>
                        <Button onClick={handleClose}>Agree</Button>
                      </DialogActions>
                    </Dialog>
                  </React.Fragment>
                


                </div>

            )
          })
        }
      </header>
    </div>
  );
}

export default App;


