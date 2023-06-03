import {
  Typography,
  Grid,
  Button,
  Container,
  Divider,
  Card,
} from "@mui/material";
// import Image from "next/image";
import http from "../axios";
import { FilterProperties } from "../components";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import { Hero } from "../main.styled";

export default function Home({ properties }) {
  const [filteredProperties, setFilteredProperties] = useState(properties);
  const isAllPropertiesRented = useMemo(
    () => filteredProperties.every((p) => p.isRented),
    [filteredProperties]
  );
  const router = useRouter();

  const handleFilteredResponse = (res) => {
    setFilteredProperties(res);
  };

  return (
    <>
      <Hero>
        <Typography
          variant="h1"
          align="center"
          sx={{ fontSize: "60px", fontWeight: "bold" }}
        >
          Can we help you with storage?
        </Typography>

        <Typography
          variant="h3"
          align="center"
          sx={{ fontSize: "25px", mt: 2 }}
        >
          Find more than thousands of storage places and providers near you the
          easy way
        </Typography>
      </Hero>

      <Grid container alignItems="center" sx={{ height: "100%" }}>
        <Card sx={{ width: "100%", p: 2 }}>
          <FilterProperties onResponseRecieved={handleFilteredResponse} />
        </Card>
      </Grid>

      <Grid container sx={{ mt: 5, mb: 15 }} spacing={3}>
        {filteredProperties?.length > 0 && !isAllPropertiesRented ? (
          filteredProperties.map(
            ({ _id, propertyName, propertyAddress, price, image,isRented }) => {
              if (!isRented) {
                return (
                  <Grid item key={_id}>
                    <Card sx={{ p: 5 }}>
                      <img style={{borderRadius: "3vmin",height:"100px"}} src={image}></img>
                      <Typography variant="h3">{propertyName}</Typography>
                      <Typography variant="span">{propertyAddress}</Typography>
                      <Typography variant="span">{price}</Typography>
                      <Button onClick={() => router.push(`/pdp/${_id}`)}>
                        See more
                      </Button>
                    </Card>
                  </Grid>
                );
              }

              return null;
            }
          )
        ) : (
          <Typography>   No properties found</Typography>
        )}
      </Grid>
    </>
  );
}

export const getServerSideProps = async () => {
  const res = await http.get("/api/get-all-properties");
  return { props: { properties: res.data.properties } };
};
