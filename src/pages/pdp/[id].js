import React, { useEffect, useState } from "react";
import http from "../../axios";
import { Button, Grid, Typography } from "@mui/material";
import { useRouter } from "next/router";

export const PDP = () => {
  const router = useRouter();
  const id = router?.query?.id;

  const [property, setProperty] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  useEffect(() => {
    if (id) {
      http.get(`/api/get-property?id=${id}`).then((res) => {
        setProperty([res.data.property]);
      });
    }
  }, [id]);

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
                    handleRentNowCTA(property[0])
                  }
                  }
                  sx={{ mt: 5 }}
                >
                  {isRented ? "Rented" : "Rent it now!"}
                </Button>
              </Grid>

            </Grid>
          );
        }
      )}
    </Grid>
  );
};

export default PDP;
