import './App.css';
import { useState } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal';

import ShowModal from './Components/ShowModal'

import { styled } from '@mui/styles';

const MyButton = styled(Button)({ 
  fontFamily: "'IBM Plex Sans', sans-serif",
  background:"linear-gradient(to right, #f07d3b, #ea5036)",
  marginTop:30,
  marginBottom:30,
});

const MyCard = styled(Card)({ 
  fontFamily: "'IBM Plex Sans', sans-serif",
  border: '2px solid transparent',
  borderRadius:10,
  backgroundImage: 'linear-gradient(white, white), radial-gradient(circle at top left, #f07d3b,#ea5036)',
  backgroundOrigin: 'border-box',
  backgroundClip: 'content-box, border-box',
  textAlign:"center"
});

const SelectFormControl = styled(FormControl)({ 
  marginTop:10,
  textAlign:'initial'
});

const Form = styled("form")({ 
  marginLeft:30,
  marginRight:30,
});

const InputFile = styled(TextField)({ 
  marginTop:15,
});

const MyButtonWrapper = styled("div")({ 
  textAlign:"right",
});

const App = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [data, setData] = useState({
    name:"",
    position:"",
    phone:"",
    email:"",
    workplace:"",
  })

  const [selectedFile, setSelectedFile] = useState(null);

  const [validation, setValidation] = useState({
    name:"",
    position:"",
    phone:"",
    email:"",
    workplace:"",
  })

  // Treść kodu html 
  const [code, setCode] = useState(null);

  // Pokazywania modala  
  const [modal, setModal] = useState(false);

  const workplaces = ["Pracownik biurowy w Zamościu", "Salon sprzedaży w Warszawie", "Salon sprzedaży w Krakowie" ,"Salon sprzedaży w Rzeszowie" ,"Salon sprzedaży w Zamościu" ,"Punkt sprzedaży w Gdańsku" ,"Punkt sprzedaży w Poznaniu"];

  const workspace = workplaces.map((workplace, index) => {
    return(
      <MenuItem key={index} value={workplace}>{workplace}</MenuItem>
    )
  })

  const handleChange = (e) => {
    setData({...data, [e.target.name]: e.target.value});
    setValidation({...validation, [e.target.name]: ""});
  }

  const validationForm = (objToValid) => {
    const localState = {
      name:"",
      position:"",
      phone:"",
      email:"",
      workplace:"",
    }
    if(objToValid.name == ""){
      localState.name = "Podaj imię i nazwisko";
    } else {
      localState.name = "";
    }

    if(objToValid.position == ""){
      localState.position = "Podaj nazwę stanowiska";
    } else {
      localState.position = "";
    }

    const phoneRegex = /(?<!\w)(\(?(\+|00)?48\)?)?[ -]?\d{3}[ -]?\d{3}[ -]?\d{3}(?!\w)/g
    if(objToValid.phone.match(phoneRegex)){
      localState.phone = "";
    } else {
      localState.phone = "Podaj numer telefonu";
    }

    const emailRegex = /^[a-z\d]+[\w\d.-]*@(?:[a-z\d]+[a-z\d-]+\.){1,5}[a-z]{2,6}$/i;
    if(objToValid.email.match(emailRegex)){
      localState.email = "";
    } else {
      localState.email = "Podaj poprawny adres email";
    }

    if(objToValid.workplace == ""){
      localState.workplace = "Podaj miejsce pracy";
    } else {
      localState.workplace = "";
    }

    if(localState.name || localState.position || localState.phone || localState.email || localState.workplace){
      setValidation(localState)
      return false;
    } else {
      return true;
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationFormResult = validationForm(data);
    if(validationFormResult){
      generateSignature(data);
    }
  }

const generateSignature = (data) => {
  const signatureHTML = `
<div>
  <div style="max-width:600px; font-family: 'IBM Plex Sans', sans-serif; color: #001f35;">
    <p>Pozdrawiam,</p>
    <div>
      <div style="float: left; width: 214px; text-align: center; min-height: 120px; padding-bottom:10px;">
        <img style="height: 100px; padding-top: 15px;" src="https://www.emultimax.pl/images/assets/signature/avatar.png" alt="avatar">
      </div>
      <div style="float: left; border-left: 1px solid #eff1f3; min-height: 120px; width: 250px; padding-left: 20px; padding-bottom:10px;">
        <p style="text-align: left; font-size: 22px; margin: 0px; padding: 0px; color: #001f35; font-weight: 700;">${data.name}</p>
        <div style="font-size: 15px; color: #001f35; margin-bottom: 15px;">${data.position}</div>
        <div>
          <a href="tel:${data.phone}" style="text-decoration: none; color: #001f35; font-size: 15px;">
            <img style="height: 12px; margin-right: 5px;" src="https://www.emultimax.pl/images/assets/signature/phone.png">${data.phone}</a>
        </div>
        <div>
          <a href="mailto:${data.email}"  style="text-decoration: none; color: #001f35; font-size: 15px;">
            <img style="height: 12px; margin-right: 5px;"
              src="https://www.emultimax.pl/images/assets/signature/envelope.png">${data.email}</a>
        </div>
        <div>
          <a href="https://www.emultimax.pl"  style="text-decoration: none; color: #001f35; font-size: 15px;">
            <img style="height: 12px; margin-right: 5px;"
              src="https://www.emultimax.pl/images/assets/signature/globe.png">https://www.emultimax.pl</a>
        </div>
      </div>
      <div style="clear: both"></div>
    </div>
    <div style="clear: both; margin-bottom: 10px; border-top: 1px solid #eff1f3; margin-top:10px">
      <div style="float: left; padding-left: 20px; width: 194px; margin-bottom: 5px;">
        <div style="margin: 0; font-weight: 600; font-size: 10px; padding-top: 2px; padding-bottom: 2px;">P.W. MULTIMAX Damian Chwiejczak</div>
        <p style="margin: 0; font-weight: 400; font-size: 10px;">ul. Peowiaków 9, 22-400 Zamość</p>
        <p style="margin: 0; font-weight: 400; font-size: 10px;">NIP: 922-264-64-63</p>
      </div>
      ${data.workplace === "Pracownik biurowy w Zamościu" ? "" : `
        <div style="float: left; padding-left: 20px; width: 251px; margin-bottom: 5px;">
          <div style="margin: 0; font-weight: 600; font-size: 10px; padding-top: 2px; padding-bottom: 2px;">Salon sprzedaży w Warszawie</div>
          <p style="margin: 0; font-weight: 400; font-size: 10px;">ul. Trakt Lubelski 393a</p>
          <p style="margin: 0; font-weight: 400; font-size: 10px;">04-667 Warszawa</p>
        </div>
      `}
      <div style="clear: both"></div>
    </div>
    <div style="clear: both; display: block; padding-left: 10px; padding-right: 10px;">
        <p style="font-weight: 700; font-size: 18px; margin-top: 0; margin-bottom: 2px; color: #001f35;">Zmieniamy się</p>
        <a href="https://www.emultimax.pl/pl/n/2021/Czas-na-zmiany./177" target="_blank" style="text-decoration: none;">
        <img style="width: 100%; max-width: 400px;" src="https://www.emultimax.pl/images/assets/signature/logo1.png" alt="">
      </a>
    </div>
  </div>
</div>
  `;

  setCode(signatureHTML);
  setModal(true);
}

  return (
    <div className="App">
      <Box sx={{ maxWidth: 600, margin: "50px auto"}}>
        <MyCard variant="outlined">
          <h1>Generator stopek</h1>
          <Form>
            <TextField id="name" name="name" value={data.name} label="Imię i nazwisko" variant="outlined" fullWidth margin="dense" size="small" onChange={e=>handleChange(e)} error={validation.name ? true : false} helperText={validation.name}/>
            <TextField id="position" name="position" value={data.position} label="Stanowisko" variant="outlined" fullWidth margin="dense" size="small" onChange={e=>handleChange(e)}  error={validation.position ? true : false} helperText={validation.position}/>
            <TextField type="number" id="phone" name="phone" value={data.phone} label="Numer telefonu" variant="outlined" fullWidth margin="dense" size="small" onChange={e=>handleChange(e)}  error={validation.phone ? true : false} helperText={validation.phone}/>
            <TextField id="email" name="email" value={data.email} label="Adres email" variant="outlined" fullWidth margin="dense" size="small" onChange={e=>handleChange(e)} error={validation.email ? true : false} helperText={validation.email}/>
            <SelectFormControl fullWidth error={validation.workplace ? true : false}>
              <InputLabel id="workplace-label" size="small">Miejsce pracy</InputLabel>
              <Select
                labelId="workplace-label"
                id="workplace"
                label="Miejsce pracy"
                variant="outlined"
                name="workplace"
                value={data.workplace}
                onChange={e=>handleChange(e)}
                size="small" 
              >
                {workspace}
              </Select>
              <FormHelperText>{validation.workplace}</FormHelperText>
            </SelectFormControl>
            <InputFile type="file" id="file" name="file" value={data.file} label="Wyślij swoje zdjęcie" fullWidth margin="dense" size="small" onChange={(e) => setSelectedFile(e.target.files[0])} InputLabelProps={{
            shrink: true,
          }}/>
          <MyButtonWrapper>
          <MyButton variant="contained" endIcon={<SendIcon />} onClick={e => handleSubmit(e)}>
              Generuj
            </MyButton>
          </MyButtonWrapper>
          </Form>
        </MyCard>
      </Box>
      {/* <ShowModal signHTML={code} closeModal={setModal(false)} modal={modal}/> */}
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box>
            Text in a modal
        </Box>
      </Modal>
      <pre>{code}</pre>
    </div>
  );
}

export default App;
