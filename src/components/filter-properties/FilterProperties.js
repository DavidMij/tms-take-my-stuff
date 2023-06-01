import React, { useState } from "react";
import { Button, Grid, TextField } from "@mui/material";
import axios from "../../axios";

export const FilterProperties = ({ onResponseRecieved }) => {
  const [filters, setFilters] = useState({
    price: "",
    maxPrice: "",
    location: "",
  });

  const handleChange = (e) => {
    const name = e.target.name;
    setFilters({
      ...filters,
      [name]:
        name === "price" || name === "maxPrice"
          ? Number(e.target.value)
          : e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post("/api/get-properties", filters).then((res) => {
      onResponseRecieved(res.data);
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit} style={{ width: "100%" }}>
        <Grid container justifyContent="center" alignItems="center" spacing={2}>
          <Grid item>
            <TextField
              label="Minimum price"
              name="price"
              type="number"
              value={filters.price}
              onChange={handleChange}
            />
          </Grid>
          <Grid item>
            <TextField
              label="Maximum price"
              name="maxPrice"
              type="number"
              value={filters.maxPrice}
              onChange={handleChange}
            />
          </Grid>
          <Grid item>
            <TextField
              label="Location"
              name="location"
              value={filters.location}
              onChange={handleChange}
            />
          </Grid>
          <Grid item>
            <Button type="submit" variant="contained" size="large">
              Filter
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default FilterProperties;
