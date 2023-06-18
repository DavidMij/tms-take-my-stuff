import {Button, Card, Grid, Typography,} from "@mui/material";
// import Image from "next/image";
import http from "../axios";
import {FilterProperties} from "../components";
import {useRouter} from "next/router";
import {useMemo, useState} from "react";
import {Hero} from "../main.styled";

export default function Home({properties}) {
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
                    sx={{fontSize: "90px", fontWeight: "bold"}}
                >
                    Can we help you with storage?
                </Typography>

                <Typography
                    variant="h3"
                    align="center"
                    sx={{fontSize: "35px", mt: 2}}
                >
                    Find more than thousands of storage places and providers near you the
                    easy way
                </Typography>
            </Hero>

            <Grid container spacing={{ xs: 2, md: 4 }} alignItems="center" sx={{height: '250px'}}>
                <Card sx={{width: "100%", p: 5}}>
                    <FilterProperties onResponseRecieved={handleFilteredResponse}/>
                </Card>
            </Grid>

            <Grid container spacing={{ xs: 2, md: 4 }} columns={{ xs: 4, sm: 8, md: 10 }}>
                {filteredProperties?.length > 0 && !isAllPropertiesRented ? (
                    filteredProperties.map(
                        ({_id, propertyName, propertyAddress, price, image, isRented, space}) => {
                            if (!isRented) {
                                return (
                                    <Grid item xs={2} sm={2} md={2} key={_id}>
                                        <Card sx={{p: 7, backgroundColor: "#ffefef", height: '200px'}}>
                                            <img style={{borderRadius: "3vmin", height: "100px"}} src={image}></img>
                                            <Typography variant="h3" sx={{width: '100%' ,overflow: 'hidden', textOverflow: 'ellipse'}} title={propertyAddress}>{propertyAddress}</Typography>
                                            <Typography variant="span" sx={{width: '100%' ,overflow: 'hidden', textOverflow: 'ellipse'}}>{propertyName}</Typography>
                                            <Typography variant="span" sx={{width: '100%' ,overflow: 'hidden', textOverflow: 'ellipse'}}>  {price}$</Typography>
                                            <Typography variant="span" sx={{width: '100%' ,overflow: 'hidden', textOverflow: 'ellipse'}}>  {space}</Typography>
                                            <Button size="large" onClick={() => router.push(`/pdp/${_id}`)}>
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
                    <Typography
                        sx={{fontSize: "30px", fontWeight: "bold"}}
                    >' No Properties found!</Typography>
                )}
            </Grid>
        </>
    );
}

export const getServerSideProps = async () => {
    const res = await http.get("/api/get-all-properties");
    return {props: {properties: res.data.properties}};
};
