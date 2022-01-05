import { styled } from "@mui/styles";
import { useFormik } from "formik";
import * as yup from "yup";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import SendIcon from "@mui/icons-material/Send";
import TextField from "@mui/material/TextField";

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
  mobile: yup
  .string()
  .matches(
    /(?<!\w)(\(?(\+|00)?48\)?)?[ -]?\d{3}[ -]?\d{2,3}[ -]?\d{2,3}(?!\w)/g,
    "Numer telefonu jest niepoprawny"
  ),
  email: yup
    .string()
    .required("Podaj swój adres email")
    .matches(
      /^[a-z\d]+[\w\d.-]*@(?:[a-z\d]+[a-z\d-]+\.){1,5}[a-z]{2,6}$/i,
      "Adres emial jest niepoprawny"
    ),
});

const SignatureForm = ({
  data,
  setData,
  setCode,
  setOpen,
}) => {

  const handleSubmit = (formValues) => {
    const { name, position, phone, email } = formValues;
    if (name && position && phone && email) {
      setData({
        ...data,
        ...formValues,
      });
        generateSignature(formValues, mobileImage, phoneImage, envelopeImage, homeImage, logoImage);
    }
  };

  const generateSignature = (signValues, mobile, phone, envelope, home, logo) => {
    console.log("signValues", signValues)
    const signatureHTML = `
  <div style="max-width:600px; font-family: Arial, sans-serif; margin-bottom:20px;">
    <div style="margin-bottom:5px; font-size:15px; color:#000;">Pozdrawiam,</div>
    <div style="padding:10px; border-bottom:1px solid #7F7F7F; margin-bottom:6px;">
        <div style="font-size:19px; font-weight:700; color:#000;">${signValues.name}</div>
        <div style="font-size:15px; margin-top:2px; margin-bottom:15px; color:#000;">${signValues.position}</div>
        ${signValues.mobile != "" ? `
        <a href="tel:${signValues.mobile}" style="display:block; text-decoration: none; color:#000; cursor: pointer; font-size:13px; margin-top:2px; margin-bottom:2px;">
          <span style="display:inline-block; width:20px;">
              <img src="${mobile}"/>
          </span>
          <span style="color:#000;">${signValues.mobile}</span>
        </a>
    ` : ""}
        <a href="tel:${signValues.phone}" style="display:block; text-decoration: none; color:#000; cursor: pointer; font-size:13px; margin-top:2px; margin-bottom:2px;">
            <span style="display:inline-block; width:20px;">
                <img src="${phone}"/>
            </span>
            <span style="color:#000;">${signValues.phone}</span>
        </a>
        <a href="mailto:${signValues.email}" style="display:block; text-decoration: none; color:#000; cursor: pointer; font-size:13px; margin-top:2px; margin-bottom:2px;">
            <span style="display:inline-block; width:20px;">
                <img src="${envelope}"/>
            </span>
            <span style="color:#000;">${signValues.email}</span>
        </a>
        <a href="https://www.emultimax.pl/" target="_blank" style="display:block; text-decoration: none; color:#000; cursor: pointer; font-size:13px; margin-top:2px; margin-bottom:2px;">
            <span style="display:inline-block; width:20px;">
                <img src="${home}"/>
            </span>
            <span style="color:#000;">www.emultimax.pl</span>
        </a>
        <a href="https://www.emultimax.pl/" target="_blank" style="text-decoration: none; cursor: pointer;">
            <img style="margin-top:5px;" src="${logo}" />
        </a>
    </div>
    <div style="color:#7F7F7F; font-size:10px; padding-left:10px; padding-right:10px;">
        
        <div style="margin-top:10px; margin-bottom:10px;">Emultimax Damian Chwiejczak, Peowiaków 9, 22-400 Zamość, NIP 922-264-64-63.</div>
        <div style="margin-top:10px; margin-bottom:10px;">
            Pozostałe dane kontaktowe oraz adresy naszych salonów znajdziesz na naszej stronie internetowej w zakładce "Kontakt".
        </div> 
        <div>
            Administratorem Państwa danych osobowych zawartych w niniejszej korespondencji jest Emultimax Damian Chwiejczak z siedzibą w Zamościu ul. Peowiaków 9, 22-400 Zamość. Państwa dane osobowe przetwarzane będą w celu przygotowania oferty oraz w celu realizacji umowy na podstawie Art. 6 ust. 1 lit. A, B - Ogólnego rozporządzenia o ochronie danych osobowych z dnia 27 kwietnia 2016 r. Zasady przetwarzania danych osobowych są opisane na stronie <a href="https://www.emultimax.pl/" target="_blank" style="text-decoration: none; color:#7F7F7F; cursor: pointer;">www.emultimax.pl</a> w polityce prywatności. 
        </div>
    </div>
  </div>
  `;

    setCode(signatureHTML);
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      position: "",
      phone: "",
      mobile:"",
      email: "",
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
            id="mobile"
            name="mobile"
            value={formik.values.mobile}
            label="Numer telefonu komórkowego"
            variant="outlined"
            fullWidth
            margin="dense"
            size="small"
            onChange={formik.handleChange}
            error={formik.touched.mobile && Boolean(formik.errors.mobile)}
            helperText={formik.touched.mobile && formik.errors.mobile}
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

const Form = styled("form")({
  marginLeft: 30,
  marginRight: 30,
});

const Legend = styled("div")({
  textAlign: "left",
});

const Star = styled("span")({
  color: "#ea5036",
});


const mobileImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAPCAMAAADqIa48AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAllBMVEXwfDzveDvuczrubjrtajnsZDjrYDfrWzfqVjbqUjXwfDzuczrubjrtajnsZDjsYDjrWzfpUjXuczrubjrtajnsZDjrYDfrWzfubjrtajnsZDjrYDfubjrtaznsYjjrYDftaznsYzjpUjXvfDztajnsZDjqUzXveDvqVjbwfDzpUjXuczrubjrtajnsZDjrYDfrWzf////sy4UBAAAAJ3RSTlOG8f308/P0/fGG8t1vaGhv3fL44N/f4Pj+1NT+2SUm2Tw88YXl5YURKyCJAAAAAWJLR0Qx2dsdcgAAAAlwSFlzAAAuIwAALiMBeKU/dgAAAAd0SU1FB+YBBA4iEXlXpwAAAABTSURBVAjXY2BgZGJmYWVj5+Bk4FLn5uHl4xfQEGTQVBcSFhEVE9fQAjK1dXT19A1owJSQlJKGMmVk5eRBTC51bWEFRTEDDSUGZUZtHRVVfQMONQBFmRUFzBh2DQAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyMi0wMS0wNFQxNDozNDoxMiswMDowMLeVP4EAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMjItMDEtMDRUMTQ6MzQ6MTIrMDA6MDDGyIc9AAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAABJRU5ErkJggg==';

const phoneImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAAPCAMAAAAI/bVFAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAABXFBMVEXubzrsaTrpaTYAAADtbDntaTntajntazntbTnsaDjrWzjrWzfrWTbaLSrqWDbvdzvtZznrXzfqVjbveDvqVTbudTrudTzwaz3ucTrvcjrtbjnucDrubjrtazjsZDrtaDnufzrveTvvdjvucjrucDrwfDzveTvubzrtbDnwfTztazntaTnwfTztazntaTnwfTzubjrtbDntaDnwfDzucjrubzrsajfvfDzveTvubzrsbDnvezvveTvubjrtbDnveDvvdjvtazntaDnrWjfrWjbveDvvdTvtZznsZTjrXjfrXDfqWDbqVjbudDrucjrsYzjrXzfqVTbqUzbucTrtbjrqVTbpUjXtbTntajnpUTXtajnsZzjsYzjqVTbpUjXsZTjsYzjrXzfrXDfqWDbqVTbqUjbvdjvucjrveTvubjrtaznsZzjrXDfqWDbtZznsYzjrYDfsZznqVTb////Oj5CqAAAAZnRSTlMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFR2+ZKYujOJd6oC/3mI/HygQfE/nkCc/yhBh7P9Vto/N45BQYOr9E3NKmsKSvT4OK0FT7b/Zg7zfUko/b1mQtgwvXqcQrNa0YZAAAAAWJLR0RzQQk9zgAAAAlwSFlzAAAuIwAALiMBeKU/dgAAAAd0SU1FB+YBBA4iMUI5h8gAAACySURBVAjXY1BQVFJWYWBkYgYBBlW1tHR1DRZWCE8zIy09U0sbytMB8XT1oDx9IM/A0IgNwjPOSDMxNWOHyplbpKVbWnFA5axt0tJt7Vg4ubh5ePkY+O0d0jMdnQQEnV2EhBiEXd3SM7PcPTy9vH1EGIRFff0ys7L9A3JyA4MYxMQlgkOy8vILcnJDwxiYJSWkwiMKQbyiSAZmZmkZlqjoGCAvNg7IY5aVk49PSExKTkkFACU0Jy0uoai7AAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIyLTAxLTA0VDE0OjM0OjQwKzAwOjAwaOogzAAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMi0wMS0wNFQxNDozNDo0MCswMDowMBm3mHAAAAAZdEVYdFNvZnR3YXJlAHd3dy5pbmtzY2FwZS5vcmeb7jwaAAAAAElFTkSuQmCC';

const envelopeImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAALCAMAAAB4W0xQAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAA9lBMVEXvezv/4GvwfjzvezzqUzbpUDXvezvvdzvudDrrWjfqVzbqVDbwfTzvezvvdzvudDrucDrrXjfrWzfqWDbqVDbpUTXvejvvdzvudDrubzrtbDntaTnsZTjsYjjrXzfrWjfqVzbqVDbuczrucDrtazntaTnsZjjsYzjrXjfrWzfpUTXucDrtbTntajnsZDjsYTjrXjftbDntaTnsZTjsYjjwfTzpUTXwfDzvejvvdzvqVDbpUjXveDvudDrucTrtbTntaTnsZTjsYjjrXjfrWjfqVzbwfTzpUTXvejvvdzvqWDbqVDbuczrrWzfucDrrXzftbDn///+9ViYBAAAAPHRSTlMAAEXZ5l8vr/z+vT1tQhFt4+l6GEdz8ZIdMbP9/ro6IZbzzEcQb3MTSc7+7oAQEIDv/r++/tfwTtT+74DJKI8qAAAAAWJLR0RRlGl8KgAAAAlwSFlzAAAuIwAALiMBeKU/dgAAAAd0SU1FB+YBBA4hJXPOAHYAAABzSURBVAjXY2BitrG1s3dwdHJ2cWVhZWBgY+eAcDm5uBkZeHj5+AVAXEEhYRFRBjcxcQlJKWkZWTl5BUV3BjcPTyVlFVU1dQ1NL28tENdHW0dXT9/AF8b1MzQyNvEHct0h3ACgUVi5pshcMwZzC0s418oaABbEIQDsXQBSAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIyLTAxLTA0VDE0OjMzOjMyKzAwOjAwF2wjhQAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMi0wMS0wNFQxNDozMzozMiswMDowMGYxmzkAAAAZdEVYdFNvZnR3YXJlAHd3dy5pbmtzY2FwZS5vcmeb7jwaAAAAAElFTkSuQmCC';

const homeImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAMCAMAAABlXnzoAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAABOFBMVEUAAADucTrubjrrYDfrXTfvdTvudTrudDvrWjfrVzfufzzvdzvqVjbpTDbwezzpUzXwfjzpUTXpUDXtazntaDnsZjjsYzjucjvubzrtbDntaTnsZTjsYjjrXzfpWzbvdjvucjrucDrtbTntaTnsZTjsYTjrXjfrWzfrWTfveDvvdjvuczrucDrtbDntaTnsZTjsYTjrXjfrWzfqWDbqVTbwfDzvejvvdzvudDrucTrtbTnrYDfrXDfrWjfqVzbqVDbpUjXwfTzvejvveTvvdjvucjrrWzfqVzbqVDbqVDbpUTXwfDzwfjzvezvqUjbpTzXpUTXwfjzpUjbpUDXwfjzvezvpUDXpUjXpUDXpUjXpUDXwfjzvezvpUjbtaTnsZDjtbTnrYDfvdzvucjrrWzfqVjbvezv///9DygOnAAAAXnRSTlMAAAAAAAAAAAAAAAAAAAAAAAAAM8q+KgJV1sLI0EwBEIbjhSstkON/Dyu00VFHyb4+WNaxKl/RpjBv6uJiMKzTYJ9yK6D795Eld6UGKsmzEwpX6SdW/SrsLu8yTvnqTvefhAAAAAFiS0dEZ1vT6bMAAAAJcEhZcwAALiMAAC4jAXilP3YAAAAHdElNRQfmAQQOIRQiEABMAAAAkklEQVQI12NgYGBkZBIWERVjZmFhYGBgZWMXl5CUkpaRlePg4GTg4pZXUFRSVlFVU9fg4WXg09TS1tHV0zcwNDI24WcwNTO3sLSKi7e2sbWzd2BwdHJ2cU2Ii090c/fw9GLw9vFNSgZxU1L9/AMYBALTYNygYEEGgZBQODdMCJkbHgHkBsK5kVFAbnQMjBsbIQQA4r8oeWbVtKcAAAAldEVYdGRhdGU6Y3JlYXRlADIwMjItMDEtMDRUMTQ6MzI6NTkrMDA6MDA8xhXGAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIyLTAxLTA0VDE0OjMyOjU5KzAwOjAwTZutegAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAAASUVORK5CYII=';

const logoImage = 'data:image/png;base64,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';

export default SignatureForm;
