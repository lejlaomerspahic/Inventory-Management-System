import React, { useState, useEffect } from "react";
import axios from "axios";
import Supplier from "./Suppliers";
function Supplier() {
  const [dobavljaci, setDobavljaci] = useState([]);
  const sendRequest = async () => {
    const res = await axios
      .get("http://localhost:8082/api/dobavljaci")
      .then((res) => {
        setDobavljaci(res.data.suppliers);
      })
      .catch((err) => {
        console.log(err);
        setDobavljaci([]);
      });
  };
  useEffect(() => {
    sendRequest();
  }, []);
  console.log(dobavljaci);
  return (
    <div>
    {dobavljaci && dobavljaci.map((dobavljaci, index)=>
    <Suppliers 
    name= {dobavljaci.name}
    jib= {dobavljaci.jib}
    pdv= {dobavljaci.pdv}
    phoneNumber={dobavljaci.phoneNumber}
    contactPerson= {dobavljaci.contactPerson}
    email= {dobavljaci.email}
    dateOfStart= {dobavljaci.dateOfStart}
    dateOfEnd= {dobavljaci.dateOfEnd}
    materials= {dobavljaci.materials.id}
    />)}
  </div>
  );
}

export default Supplier;
