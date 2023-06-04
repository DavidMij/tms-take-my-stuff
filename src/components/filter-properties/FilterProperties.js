import React, { useState } from "react";
import { Button, Grid, TextField } from "@mui/material";
import http from "../../axios";

export const FilterProperties = ({ onResponseRecieved }) => {
  const [filters, setFilters] = useState({
    price: "",
    maxPrice: "",
    location: "",
    startDate: "",
    endDate: "",
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
  const handleReset = (e) => {
    e.preventDefault();
    setFilters({
      price: "",
      maxPrice: "",
      location: "",
      startDate: "",
      endDate: "",
    })
  }
  const handleSubmit = (e) => {
    e.preventDefault();

    http.post("/api/get-properties", filters).then((res) => {
      onResponseRecieved(res.data);
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit} onReset={handleReset} style={{ width: "100%" }}>
        <Grid container justifyContent="center" alignItems="center" spacing={2}>
          <Grid item>
            <TextField
                label="Start Date"
                name="startDate"
                type="date"
                value={filters.startDate}
                onChange={handleChange}
            />
          </Grid>
          <Grid item>
            <TextField
                label="End Date"
                name="endDate"
                type="date"
                value={filters.endDate}
                onChange={handleChange}
            />
          </Grid>
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
            <Button type="submit" variant="contained" size="large" sx={{width: '150px', mr: 2, height: '40px', fontSize: '16px'}}>
              Filter
            </Button>
            <Button type="reset" variant="contained" size="large" sx={{width: '200px', height: '40px', fontSize: '16px'}}>
              Reset Filter
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default FilterProperties;
