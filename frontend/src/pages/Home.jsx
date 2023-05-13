import React from "react";
import "./Home.css";
const images = [
  {
    image:
      "https://media.istockphoto.com/id/1344089225/photo/modern-warehouse-with-automated-goods-movement-system.jpg?b=1&s=170667a&w=0&k=20&c=gSNmRE4EgOUWLttyOMI3byG2fLANAiVbwtVq0chZhvQ=",
    address: "Room, 20 sqm Givataym",
  },
  {
    image:
      "https://media.istockphoto.com/id/1405246054/photo/empty-warehouse-in-logistic-center.jpg?b=1&s=170667a&w=0&k=20&c=sNDJa2o9NLuVqkEVHFy21Xxj-BJMCLbkWcM69vAE5SQ=",
    address: "Garage, 45 sqm Rishon Lezion",
  },
  {
    image:
      "https://media.istockphoto.com/id/1299083810/photo/parcels-on-conveyor-belt-in-a-warehouse.jpg?b=1&s=170667a&w=0&k=20&c=gcKD93K_UvTRyb1zZ0OFAWOWjF9pvCpuxwjmk0k1kAQ=",
    address: "Shed, 30 sqm Petach Tikva",
  },
];

const Home = () => {
  return (
    <section className="container mx-auto">
      <h3 className="text-center text-[1.5rem] mb-16">
        Here's Some of What We Have to Offer:
      </h3>
      <div className="grid grid-cols-3 gap-20">
        {images.map((i, idx) => (
          <div>
            <div className="w-full h-[250px] image-reflection">
              <img
                className="w-full h-full rounded-[20px]"
                src={i?.image}
                alt=""
              />
            </div>
            <div className="px-8">
              <h4 className="mt-8 address-text">{i?.address}</h4>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Home;
