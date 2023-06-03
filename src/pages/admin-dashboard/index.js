import React, {useEffect} from "react";
import {
    Box,
    Button,
    Grid,
    Tab,
    Tabs,
    Typography,
    Dialog,
    TextField,
    Divider,
    styled,
} from "@mui/material";
import http from "../../axios";
import AddIcon from "@mui/icons-material/Add";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useRouter } from "next/router";

function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            style={{position: "absolute", top: "50px", left: 0}}
            {...other}
        >
            {value === index && (
                <Box sx={{p: 3}}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
}

const StyledDialog = styled(Dialog)`
  & .MuiPaper-root {
    padding: 50px;
    width: 50%;
  }
`;

const AdminDashboard = () => {
    const [selectedTab, setSelectedTab] = React.useState(0);
    const [isDialogOpen, setIsDialogOpen] = React.useState(false);
    const [newPropertyValues, setNewPropertyValues] = React.useState({
        propertyName: "",
        propertyAddress: "",
        price: "",
        propertyDescription: "",
        image: null,
    });
    const [customerProperties, setCustomerProperties] = React.useState([]);
    const [customerRentals, setCustomerRentals] = React.useState([]);
    const router = useRouter();

    useEffect(() => {
        Promise.all([
            http.get("/api/get-customer-properties"),
            http.get("/api/get-customer-rentals"),
        ]).then((res) => {
            res.forEach(({data}) => {
                if (data.properties) {
                    setCustomerProperties(data.properties);
                } else if (data.customerRentals) {
                    setCustomerRentals(data.customerRentals);
                }
            });
        });
    }, []);

    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
    });
    const handleNewPropertyValuesChange = async (e) => {
        const name = e.target.name;
        let value
        switch (name) {
            case "price": value = Number(e.target.value); break
            case "image": value = await toBase64(e.target.files[0]); break
            default: value = e.target.value

        }
        setNewPropertyValues({
            ...newPropertyValues,
            [name]:value
        });
    };

    const handleTabChange = (event, newValue) => {
        setSelectedTab(newValue);
    };

    const handleNewPropertySubmission = async (e) => {
        e.preventDefault();


        http.post("/api/add-new-property", newPropertyValues).then((res) => {
            if (res.status === 200) {
                setNewPropertyValues(
                    {...newPropertyValues}
                );
                setIsDialogOpen(false);
            }
        });
    };

    return (
        <div>
            <Grid
                container
                alignItems="center"
                justifyContent="center"
                sx={{height: "300px"}}
            >
                <Typography variant="h2" align="center" sx={{fontWeight: "bold"}}>
                    Hi, Welcome to your dashboard
                </Typography>
            </Grid>

            <Divider sx={{mb: 5}}/>

            <Grid container justifyContent="center" sx={{mb: 5}}>
                <Button
                    variant="contained"
                    onClick={() => {
                        setIsDialogOpen(true);
                    }}
                    sx={{
                        width: "350px",
                        height: "70px",
                        borderRadius: "20px",
                        fontSize: "16px",
                    }}
                >
                    Add new property
                    <AddIcon sx={{ml: "10px"}}/>
                </Button>
            </Grid>

            <Grid
                container
                direction="column"
                alignItems="center"
                sx={{position: "relative", maxWidth: "700px", m: "0 auto"}}
            >
                <Grid item>
                    <Tabs value={selectedTab} onChange={handleTabChange}>
                        <Tab
                            label="Your properties"
                            {...a11yProps(0)}
                            sx={{width: "500px"}}
                        />
                        <Tab
                            label="Properties that you rent"
                            {...a11yProps(1)}
                            sx={{width: "500px"}}
                        />
                    </Tabs>
                </Grid>

                <TabPanel value={selectedTab} index={0}>
                    {customerProperties.map((property) => {
                        return (
                            <Grid container key={property._id}>
                                <Grid item container alignItems="center">
                                    <Typography>{property.propertyName}</Typography>
                                    <Button>Delete</Button>
                                </Grid>
                            </Grid>
                        );
                    })}
                </TabPanel>

                <TabPanel value={selectedTab} index={1}>
                    {customerRentals.map((rentedProperty) => {
                        return (
                            <Grid container key={rentedProperty._id}>
                                <Grid item container alignItems="center">
                                    <Typography>{rentedProperty.propertyName}</Typography>
                                    <Button onClick={() => router.push(`/pdp/${rentedProperty.propertyId}`)}>
                                        See more
                                    </Button>
                                </Grid>
                            </Grid>
                        );
                    })}
                </TabPanel>
            </Grid>

            <StyledDialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
                <Typography variant="h3" sx={{mb: 3}}>
                    Add new property
                </Typography>

                <form onSubmit={handleNewPropertySubmission}>
                    <Grid container spacing={2}>
                        <Grid item container xs={12}>
                            <TextField
                                fullWidth
                                name="propertyName"
                                value={newPropertyValues.propertyName}
                                onChange={handleNewPropertyValuesChange}
                                label="Property name"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                name="propertyAddress"
                                value={newPropertyValues.propertyAddress}
                                onChange={handleNewPropertyValuesChange}
                                label="Property Address"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                name="price"
                                value={newPropertyValues.price}
                                type="number"
                                onChange={handleNewPropertyValuesChange}
                                label="Property Price"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                name="propertyDescription"
                                value={newPropertyValues.propertyDescription}
                                onChange={handleNewPropertyValuesChange}
                                label="Property Description"
                                multiline
                                rows={4}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Button component="label" variant="outlined">
                                Upload property photo
                                <CloudUploadIcon sx={{ml: "20px"}}/>
                                <input
                                    type="file"
                                    name="image"
                                    hidden={true}
                                    onChange={handleNewPropertyValuesChange}
                                />
                            </Button>
                            <img style={{marginLeft: "1rem",width:"100%",height:"auto"}} src={newPropertyValues?.image}></img>
                        </Grid>

                        <Grid item xs={12}>
                            <Button type="submit" variant="contained" size="large">
                                Add property
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </StyledDialog>
        </div>
    );
};

export default AdminDashboard;
