import './App.css';
import { useState, useEffect, useRef } from 'react';

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
    console.log("objToValid", objToValid)
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
      console.log("cos")
      generateSignature(data);
    }
  }

const avatarImage = "data:image/png;base64,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";

const phoneImage = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAA7EAAAOxAGVKw4bAAABdElEQVQ4y5WSPS9DYRTH/+dpS3VoWtaKqx2U2BrVoSS1mHSTJhIWsVp8DJ+CRWyNQUSMSloJGxGiV0LSiJdGJG7vy3MMbq97UbfOdE7Oef7P77wQXBZM5sKmZa0CmOvt6Sm0riomfCzoDkzL2gZzEQB0XV8AsOknQG1HDE+mpSUvALYzdBMKhUaN6yP9LwHRdqSUY85jAGBOmoax5EfgCBDRj34ZKHQvAKie3oRYnp+dXux6BuGRfFDTWk9gjtoCGVZrp10TaJeHJoDdrxFw3u+xR8Cew4YrXImkp8S/BCJ94X0QndsI4++a5ruFgDswHm+Z4okGmEs20wzFE3to3jdIyeYC/YOv/HLX6kgAAAPxWBlEBzZFlJkrGJo4YeZj6/PMf9+CR1XJKpL5DMwxbzU1A0KkrHr1uSMBAEi1phJRCd+PizlmSbnmS+AklWyRmbfAHHFRvAkhUrJefehI4Hyo1naIKAOiMog0EDUArBOgtWs+AKVbjK/FQlvtAAAAAElFTkSuQmCC";

const envelopeImage = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAA7EAAAOxAGVKw4bAAABdElEQVQ4y5WSPS9DYRTH/+dpS3VoWtaKqx2U2BrVoSS1mHSTJhIWsVp8DJ+CRWyNQUSMSloJGxGiV0LSiJdGJG7vy3MMbq97UbfOdE7Oef7P77wQXBZM5sKmZa0CmOvt6Sm0riomfCzoDkzL2gZzEQB0XV8AsOknQG1HDE+mpSUvALYzdBMKhUaN6yP9LwHRdqSUY85jAGBOmoax5EfgCBDRj34ZKHQvAKie3oRYnp+dXux6BuGRfFDTWk9gjtoCGVZrp10TaJeHJoDdrxFw3u+xR8Cew4YrXImkp8S/BCJ94X0QndsI4++a5ruFgDswHm+Z4okGmEs20wzFE3to3jdIyeYC/YOv/HLX6kgAAAPxWBlEBzZFlJkrGJo4YeZj6/PMf9+CR1XJKpL5DMwxbzU1A0KkrHr1uSMBAEi1phJRCd+PizlmSbnmS+AklWyRmbfAHHFRvAkhUrJefehI4Hyo1naIKAOiMog0EDUArBOgtWs+AKVbjK/FQlvtAAAAAElFTkSuQmCC";

const globeImage = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAA7EAAAOxAGVKw4bAAABdElEQVQ4y5WSPS9DYRTH/+dpS3VoWtaKqx2U2BrVoSS1mHSTJhIWsVp8DJ+CRWyNQUSMSloJGxGiV0LSiJdGJG7vy3MMbq97UbfOdE7Oef7P77wQXBZM5sKmZa0CmOvt6Sm0riomfCzoDkzL2gZzEQB0XV8AsOknQG1HDE+mpSUvALYzdBMKhUaN6yP9LwHRdqSUY85jAGBOmoax5EfgCBDRj34ZKHQvAKie3oRYnp+dXux6BuGRfFDTWk9gjtoCGVZrp10TaJeHJoDdrxFw3u+xR8Cew4YrXImkp8S/BCJ94X0QndsI4++a5ruFgDswHm+Z4okGmEs20wzFE3to3jdIyeYC/YOv/HLX6kgAAAPxWBlEBzZFlJkrGJo4YeZj6/PMf9+CR1XJKpL5DMwxbzU1A0KkrHr1uSMBAEi1phJRCd+PizlmSbnmS+AklWyRmbfAHHFRvAkhUrJefehI4Hyo1naIKAOiMog0EDUArBOgtWs+AKVbjK/FQlvtAAAAAElFTkSuQmCC";

const generateSignature = (data) => {
  const signatureHTML = `
<div>
  <div style="max-width:600px; font-family: 'IBM Plex Sans', sans-serif; color: #001f35;">
    <p>Pozdrawiam,</p>
    <div>
      <div style="float: left; width: 214px; text-align: center; min-height: 120px; padding-bottom:10px;">
        <img style="height: 100px; padding-top: 15px;" src=${avatarImage} alt="avatar">
      </div>
      <div style="float: left; border-left: 1px solid #eff1f3; min-height: 120px; width: 250px; padding-left: 20px; padding-bottom:10px;">
        <p style="text-align: left; font-size: 22px; margin: 0px; padding: 0px; color: #001f35; font-weight: 700;">${data.name}</p>
        <div style="font-size: 15px; color: #001f35; margin-bottom: 15px;">${data.position}</div>
        <div>
          <a href="tel:${data.phone}" style="text-decoration: none; color: #001f35; font-size: 15px;">
            <img style="height: 12px; margin-right: 5px;" src=${phoneImage}>${data.phone}</a>
        </div>
        <div>
          <a href="mailto:${data.email}"  style="text-decoration: none; color: #001f35; font-size: 15px;">
            <img style="height: 12px; margin-right: 5px;"
              src=${envelopeImage}>${data.email}</a>
        </div>
        <div>
          <a href="https://www.emultimax.pl"  style="text-decoration: none; color: #001f35; font-size: 15px;">
            <img style="height: 12px; margin-right: 5px;"
              src=${globeImage}>https://www.emultimax.pl</a>
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
  setOpen(true);
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
      {/* <ShowModal signHTML={code} closeModal={handleClose} open={open}/> */}
      <pre style={pre}>
        {code}
      </pre>
    </div>
  );
}

const pre = {
  fontSize:10,
  wordWrap: 'break-word',
  width:'80%',
  whiteSpace:'normal',
  wordWrap: 'break-word',
  margin:'0 auto',
};

export default App;
