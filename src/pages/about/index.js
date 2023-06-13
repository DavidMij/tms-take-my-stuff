import {Button, Card, Grid, Typography,} from "@mui/material";
// import Image from "next/image";
// import http from "../axios";
import {useRouter} from "next/router";
import {HeroAbout} from "../../main.styled";

export default function About({properties}) {

    const router = useRouter();



    return (
        <>
            <HeroAbout>
                <Typography
                    variant="h1"
                    align="center"
                    sx={{fontSize: "90px", fontWeight: "bold"}}
                >
                    who we are?
                </Typography>

                <Typography
                    variant="h3"
                    align="center"
                    sx={{fontSize: "25px", mt: 2}}
                >
                    we are David and Itay and we wanted to do something related to bulshit
                </Typography>

                <Typography
                    variant="h1"
                    align="center"
                    sx={{fontSize: "90px", fontWeight: "bold"}}
                >
                    Insurance Policy
                </Typography>

                <Typography
                    variant="h3"
                    align="center"
                    sx={{fontSize: "25px", mt: 2}}
                >
                    this is bla bla bla and will cost you fee of X %
                </Typography>
            </HeroAbout>

        </>
    );
}

