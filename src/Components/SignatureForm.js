import React from "react";
import { storage } from "../firebase";

import { styled } from "@mui/styles";
import { useFormik } from "formik";
import * as yup from "yup";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import InputLabel from "@mui/material/InputLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Select from "@mui/material/Select";
import SendIcon from "@mui/icons-material/Send";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";

import Btn from "./Btn";

const validationSchema = yup.object({
  name: yup.string().required("Podaj swoje imię i nazwisko"),
  position: yup.string().required("Podaj swoją nazwę stanowiska"),
  phone: yup
    .string()
    .matches(
      /(?<!\w)(\(?(\+|00)?48\)?)?[ -]?\d{3}[ -]?\d{2,3}[ -]?\d{2,3}(?!\w)/g,
      "Numer telefonu jest niepoprawny"
    )
    .required("Podaj swój numer telefonu"),
  email: yup
    .string()
    .required("Podaj swój adres email")
    .matches(
      /^[a-z\d]+[\w\d.-]*@(?:[a-z\d]+[a-z\d-]+\.){1,5}[a-z]{2,6}$/i,
      "Adres emial jest niepoprawny"
    ),
  workplace: yup.string().required("Miejsce pracy jest wymagane"),
});

const SignatureForm = ({ data, setData, setCode, setOpen }) => {
  const workspace = workplaces.map((workplace, index) => {
    return (
      <MenuItem key={index} value={workplace.type}>
        {workplace.type}
      </MenuItem>
    );
  });

  const handleSubmit = (formValues) => {
    const { name, position, phone, email, workplace } = formValues;
    if (name && position && phone && email && workplace) {
      setData({ ...data, ...formValues });
      if (data.file === "") {
        generateSignature(formValues);
      } else {
        addImageToServer(formValues);
      }
    }
  };

  const addImageToServer = (formValues) => {
    const uploadImage = storage.ref(`images/${data.file.name}`).put(data.file);
    uploadImage.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref("images")
          .child(data.file.name)
          .getDownloadURL()
          .then((url) => {
            setData({ ...data, imageURL: url });
            console.log(url);
          })
          .then(() => {
            generateSignature(formValues);
          });
      }
    );
  };

  const handleImage = (e) => {
    var file = e.target.files[0];
    setData({ ...data, file: file });
  };

  const generateSignature = (signValues) => {
    const typeOfWorker = workplaces.filter(
      (workplace) => workplace.type === signValues.workplace
    )[0];
    const signatureHTML = `<div>
    <div style="max-width:600px; font-family: 'IBM Plex Sans', Arial, sans-serif; color: #001f35;">
        <p>Pozdrawiam,</p>
        <div>
            <div style="float: left; width: 214px; text-align: center; min-height: 120px; padding-bottom:10px;">
                <img style="height: 100px; padding-top: 15px;"
                    src=${data.imageURL === "" ? avatarImage : data.imageURL}>
            </div>
            <div
                style="float: left; border-left: 1px solid #eff1f3; min-height: 120px; width: 250px; padding-left: 20px; padding-bottom:10px;">
                <p
                    style="text-align: left; font-size: 18px; margin: 0px; padding: 0px; color: #001f35; font-weight: 700;">${
                      signValues.name
                    }</p>
                <div style="font-size: 13px; color: #001f35; margin-bottom: 20px;">${
                  signValues.position
                }</div>
                <div style="margin-bottom:5px;">
                    <a href="tel:${
                      signValues.phone
                    }" style="text-decoration: none; color: #001f35; font-size: 13px;">
                        <img style="height: 12px; margin-right: 5px;"
                            src=${phoneImage}>${signValues.phone}</a>
                </div>
                <div style="margin-bottom:5px;">
                    <a href="mailto:${
                      signValues.email
                    }" style="text-decoration: none; color: #001f35; font-size: 13px;">
                        <img style="height: 12px; margin-right: 5px;"
                            src=${envelopeImage}>${signValues.email}</a>
                </div>
                <div style="margin-bottom:5px;">
                    <a href="https://www.emultimax.pl" target="_blank"
                        style="text-decoration: none; color: #001f35; font-size: 13px;">
                        <img style="height: 12px; margin-right: 5px;"
                            src=${globeImage}>www.emultimax.pl</a>
                </div>
            </div>
            <div style="clear: both"></div>
        </div>
        <div style="clear: both; margin-bottom: 15px; border-top: 1px solid #eff1f3;">
            <div style="float: left; padding-left: 20px; width: 194px; margin-bottom: 5px; padding-top:10px">
                <div style="margin: 0; font-weight: 600; font-size: 9px;">
                    P.W.
                    MULTIMAX Damian Chwiejczak</div>
                <div style="margin: 0; font-weight: 400; font-size: 9px;">ul. Peowiaków 9, 22-400 Zamość</div>
                <div style="margin: 0; font-weight: 400; font-size: 9px;">NIP: 922-264-64-63</div>
            </div>
    ${
      typeOfWorker.type === "Salon sprzedaży w Zamościu"
        ? ""
        : `
            <div style="float: left; padding-left: 20px; width: 251px; margin-bottom: 5px; padding-top:10px">
                <div style="margin: 0; font-weight: 600; font-size: 9px;">${typeOfWorker.type}</div>
                <div style="margin: 0; font-weight: 400; font-size: 9px;">${typeOfWorker.address}</div>
                <div style="margin: 0; font-weight: 400; font-size: 9px;">${typeOfWorker.address1}</div>
            </div>
        `
    }
            <div style="clear: both"></div>
        </div>
        <div style="clear: both; display: block; padding-left: 20px; padding-right: 10px;">
            <p
                style="font-weight: 700; font-size: 13px; margin-top:5px; margin-bottom: 10px; padding-top:10px; color: #001f35;">
                Zmieniamy się!</p>
            <a href="https://www.emultimax.pl/pl/n/2021/Czas-na-zmiany./177" target="_blank"
                style="text-decoration: none;">
                <img style="width: 100%; max-width: 400px;"
                    src=${rebrandingImage} alt="">
            </a>
        </div>
    </div>
</div>
  `;

    setCode(signatureHTML);
    setOpen(true);
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      position: "",
      phone: "",
      email: "",
      workplace: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  return (
    <Box sx={{ maxWidth: 600, margin: "50px auto" }}>
      <MyCard variant="outlined">
        <Title>Generator stopek</Title>
        <Form>
          <TextField
            id="name"
            name="name"
            value={formik.values.name}
            label="Imię i nazwisko: *"
            variant="outlined"
            fullWidth
            margin="dense"
            size="small"
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
          <TextField
            id="position"
            name="position"
            value={formik.values.position}
            label="Stanowisko: *"
            variant="outlined"
            fullWidth
            margin="dense"
            size="small"
            onChange={formik.handleChange}
            error={formik.touched.position && Boolean(formik.errors.position)}
            helperText={formik.touched.position && formik.errors.position}
          />
          <TextField
            id="phone"
            name="phone"
            value={formik.values.phone}
            label="Numer telefonu: *"
            variant="outlined"
            fullWidth
            margin="dense"
            size="small"
            onChange={formik.handleChange}
            error={formik.touched.phone && Boolean(formik.errors.phone)}
            helperText={formik.touched.phone && formik.errors.phone}
          />
          <TextField
            id="email"
            name="email"
            value={formik.values.email}
            label="Adres email: *"
            variant="outlined"
            fullWidth
            margin="dense"
            size="small"
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <SelectFormControl
            fullWidth
            error={formik.touched.workplace && Boolean(formik.errors.workplace)}
          >
            <InputLabel id="workplace-label" size="small">
              Miejsce pracy: *
            </InputLabel>
            <Select
              labelId="workplace-label"
              id="workplace"
              label="Miejsce pracy: *"
              variant="outlined"
              name="workplace"
              value={formik.values.workplace}
              onChange={formik.handleChange}
              size="small"
            >
              {workspace}
            </Select>
            <FormHelperText>
              {formik.touched.workplace && formik.errors.workplace}
            </FormHelperText>
          </SelectFormControl>
          <InputFile
            type="file"
            id="file"
            name="file"
            label="Wyślij swoje zdjęcie"
            fullWidth
            margin="dense"
            size="small"
            onChange={(e) => {
              handleImage(e);
            }}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <Legend>
            <Star>*</Star> pola wymagane
          </Legend>
          <Btn
            icon={<SendIcon />}
            handle={formik.handleSubmit}
            name={"Generuj"}
            type={"submit"}
          />
        </Form>
      </MyCard>
    </Box>
  );
};

const MyCard = styled(Card)({
  fontFamily: "'IBM Plex Sans', sans-serif",
  border: "1px solid #b8c4c9",
  borderRadius: 10,
  color: "#001f35",
  textAlign: "center",
});

const Title = styled("h1")({
  fontFamily: "'Lexend', sans-serif",
  color: "#001f35",
});

const SelectFormControl = styled(FormControl)({
  marginTop: 10,
  textAlign: "initial",
});

const Form = styled("form")({
  marginLeft: 30,
  marginRight: 30,
});

const InputFile = styled(TextField)({
  marginTop: 15,
});

const Legend = styled("div")({
  textAlign: "left",
});

const Star = styled("span")({
  color: "#ea5036",
});

const workplaces = [
  {
    type: "Salon sprzedaży w Warszawie",
    address: "Trakt Lubelski 393a",
    address1: "04-667 Warszawa",
  },
  {
    type: "Salon sprzedaży w Krakowie",
    address: "Zakopiańska 105 (Solvay Park)",
    address1: "30-418 Kraków",
  },
  {
    type: "Salon sprzedaży w Rzeszowie",
    address: "Biskupa Józefa Pelczara 6",
    address1: "35-312 Rzeszów",
  },
  {
    type: "Salon sprzedaży w Zamościu",
    address: "Peowiaków 9",
    address1: "22-400 Zamość",
  },
  {
    type: "Punkt sprzedaży w Gdańsku",
    address: "Budowlanych 17L",
    address1: "80-298 Gdańsk",
  },
  {
    type: "Punkt sprzedaży w Poznaniu",
    address: "Rzemieślnicza 89",
    address1: "62-081 Baranowo - Poznań",
  },
];

const avatarImage =
  "data:image/png;base64,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";

const phoneImage =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAA7EAAAOxAGVKw4bAAABdElEQVQ4y5WSPS9DYRTH/+dpS3VoWtaKqx2U2BrVoSS1mHSTJhIWsVp8DJ+CRWyNQUSMSloJGxGiV0LSiJdGJG7vy3MMbq97UbfOdE7Oef7P77wQXBZM5sKmZa0CmOvt6Sm0riomfCzoDkzL2gZzEQB0XV8AsOknQG1HDE+mpSUvALYzdBMKhUaN6yP9LwHRdqSUY85jAGBOmoax5EfgCBDRj34ZKHQvAKie3oRYnp+dXux6BuGRfFDTWk9gjtoCGVZrp10TaJeHJoDdrxFw3u+xR8Cew4YrXImkp8S/BCJ94X0QndsI4++a5ruFgDswHm+Z4okGmEs20wzFE3to3jdIyeYC/YOv/HLX6kgAAAPxWBlEBzZFlJkrGJo4YeZj6/PMf9+CR1XJKpL5DMwxbzU1A0KkrHr1uSMBAEi1phJRCd+PizlmSbnmS+AklWyRmbfAHHFRvAkhUrJefehI4Hyo1naIKAOiMog0EDUArBOgtWs+AKVbjK/FQlvtAAAAAElFTkSuQmCC";

const envelopeImage =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAA9ElEQVQ4y8WSMU5CARBEZ3aNLZ+WwlgSSuLvoOAIVtpQmdhIy1Esbcm3suIGNj8kHOQfgbg7FpiICAiFYcvNvNnd7ADnLvK6fJTwDOniRPKDxJMZrSI5AtmcADckR0arLDJrAI2RJcjlEfDSyBJAE5m1QepKqgX03H0IcnYAnrn7UEBPUg2pawAAqZA0z4hJu2iNSU5B5gaYJKftojXOiImkOaQCAIirG21Nqdz9ITMHkl7XLd6Z2XtEvEC6/yH/ZfB9562Ay7UIq5TeIPW3pbbzVqmf0gJAB0AnpcUueP8GG7/+MtybkcPhOSJc9pfg3w3OX597nWlmBN2VVQAAAABJRU5ErkJggg==";

const globeImage =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACNklEQVQ4y5WTy0uVURTFf+scb9jN5JZhlmFmLxJp0EMdlIEEFRFFQVRDJ46aVeAf0KBRRAQ6uQ2a9BpE0MCIqJkpSoMSeiDXUomSVCgp9XM18FMu1qQ9OvucvdfeZ629xTJTbeMe2+1AK1CbXheA55K6XOgdKI6PS4e65qzLN3QCncAqYAXwC7gCfAZOAB3kqmtiRc0zT4zMAoTF5CRJuoE24GmM4WQI4VgmU7JV0ryk3UA5NthtSZJ0x7rm7BJAkiQ3gQZJxxjuO5IMvXq/srT0o00rcNB2FXblUt/2gTQHpX/ul3Tehd67izFhS1OV7au2a4B9ku7aPou9doEsIWlvSAkbXF226n4xObZbsLNBur0ik2kC+oEs0kxRTLvYvP8D8JDhvo4iJVps38OuQppPVcimpE5KumN7PXA6pFK1LqvegV2VOgG7LvU/AuuAF4K3QG1IcxpV23i0CGOef5l9GBiLIXxa4gooYGP7WtjSVLnAjy4j5ZE6kcaXwfTMDfWMG3YBhUiuugHYC6w3ZJga62Zy9BtTY4+ZGntCrnpb+g7SdIzheNnG7bMzM7M3gJdBUhfSojJv/xpt6UGR+2ttLvfjx8/pc0C9pK6QznYeQOj1XwAwjgTSnKQz498nGmzfAvIu9A5EgFhR88z2IcMlrdk0XL5px+DvrwUDeHL0C7nqEknXgQrbD4A3McYLnhiZVfEypePZBgwCj4B3Agw7gVNAPZCPMV5Mhnqm0w6Xtfyf6/wHLT72c9eY2Y4AAAAASUVORK5CYII=";

const rebrandingImage =
  "data:image/png;base64,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";

export default SignatureForm;
