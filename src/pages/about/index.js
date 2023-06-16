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
                    Take My Stuff is the “airbnb” of self-storage.

                    Our goal is to help connect storage seekers and storage providers to save money and make money.

                    Take My Stuff connects you with your neighbors who have excess space to rent out at often 50% the average of commercial storage solutions.

                    Because many of us want to make money from our unused space but we do not want the hassle of having someone use our home and facilities,
                    Take My Stuff solves this problem by allowing you to list your empty space,
                    have minimum interactions with your hosts at your own convenience, and enabling you to make consistent money every month.

                    Commercial storage units are expensive and do not always provide flexible options.

                    Most Renters will show up on an average of 3-4 times per year. This is practically an effortless way to make residual income and a no-brainer for those looking for storage space.
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
                    Insurance for self-storage risks provides superior coverage specifically designed for the unique exposures of self-storage businesses.
                    The insurance includes property, liability, and specialty coverages and offers the highest level of flexibility in coverage customization, limits, and deductibles.
                    Coverage against loss or damage to customers’ personal property for which the insured may become legally liable, including property stored in the open.
                    The insurance fee are 10% of the deal !
                </Typography>
            </HeroAbout>

        </>
    );
}

