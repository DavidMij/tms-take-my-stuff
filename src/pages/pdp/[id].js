import React, { useEffect, useState } from "react";
import http from "../../axios";
import {Button, Grid, Typography, Dialog, Checkbox, FormControlLabel, styled} from "@mui/material";
import { useRouter } from "next/router";

const StyledDialog = styled(Dialog)`
  & .MuiPaper-root {
    width: 100%;
    height: 350px;
    max-width: 900px;
    padding: 25px;
  }
`;

export const PDP = () => {
  const router = useRouter();
  const id = router?.query?.id;

  const [property, setProperty] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [isInsuranceIncluded, setIsInsuranceIncluded] = React.useState(false);

  useEffect(() => {
    if (id) {
      http.get(`/api/get-property?id=${id}`).then((res) => {
        setProperty([res.data.property]);
      });
    }
  }, [id]);

  const checkApproval = () => {
    setIsDialogOpen(true);
  }

  const handleRentNowCTA = (property) => {
    http
      .post("/api/rent-property", {
        _id: property._id,
        propertyOwner: property.userId,
        propertyName: property.propertyName,
      })
      .then((res) => {
        if (res.status === 200) {
          property.isRented = true
          setProperty([property]);
          setIsDialogOpen(false);
        }
      });
  };


  return (
    <Grid container sx={{ mt: 5, p: "0 55px" }}>
      {
        property?.map(
        ({
          propertyName,
          propertyAddress,
          propertyDescription,
            isRented,
            price,
            image,
          _id,
          userId,
        }) => {
          return (
            <Grid item key={_id}>
              <img style={{borderRadius: "3vmin",height:"200px"}} src={image}></img>
              <Typography variant="h2" sx={{ mb: 2, fontWeight: "bold" }}>
                {propertyName}
              </Typography>
              <Typography>Address: {propertyAddress}</Typography>
              <Typography>Description: {propertyDescription}</Typography>
              <Typography>Price: {price}</Typography>
              <Grid item>
                <Button
                  disabled={isRented}
                  variant="contained"
                  size="large"
                  onClick={() => {
                    checkApproval();

                  }
                  }
                  sx={{ mt: 5 }}
                >
                  {isRented ? "Rented" : "Rent it now!"}
                </Button>
              </Grid>

              <StyledDialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
                <Typography variant="h2" align="center" sx={{pt: 5, fontWeight: 'bold', maxWidth: '550px', m: '0 auto'}}>Are you sure you want to rent it?</Typography>

                <Grid container justifyContent="center" sx={{mt: 3, mb: 3}}>
                  <FormControlLabel
                      control={<Checkbox checked={isInsuranceIncluded}
                                         onChange={(e) => setIsInsuranceIncluded(e.target.checked)} />} label="Include property insurance" />
                </Grid>


                <Grid container justifyContent="center">
                  <Button
                      sx={{width: '250px', mr: 4, height: '50px', fontSize: '18px'}}
                      variant="contained"
                      onClick={() => handleRentNowCTA(property[0])}>Yes</Button>
                  <Button variant="outlined" sx={{width: '250px', height: '50px', fontSize: '18px'}}
                          onClick={() => setIsDialogOpen(false)}>No, Maybe next time</Button>
                </Grid>
              </StyledDialog>
            </Grid>
          );
        }
      )}
    </Grid>
  );
};

export default PDP;
