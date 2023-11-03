"use client"
import React, { useContext, useState } from "react";
import Searchbar from "@/Components/SearchBar";
import Navbar from "@/Components/Navbar";
import BookAppointment from "@/Components/BookAppointment";
import { SessionContext } from "@/Components/SessionContextProvider";


const FindDoctor = () => {
  const [doctor, setdoctor] = useState({});
  const [bookapt, setbookapt] = useState(false);
  const { authState } = useContext(SessionContext);

  return (
    <>
      <div>

        {bookapt === false ? (<div>
          <div className="min-h-screen flex items-center justify-center">
            <video
              autoPlay
              muted
              loop
              className="fixed object-cover object-center w-full h-full z-0 filter blur-md m-20"
            >
              <source src='/findDoctor.mp4' type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="absolute w-full h-full z-10">
              <Navbar UserMode={authState.USER_MODE} />
              <Searchbar setdoctor={setdoctor} setbookapt={setbookapt} />
            </div>
          </div>
        </div>) : null}
        {bookapt === true ? (
          <div>
            <Navbar UserMode={authState.USER_MODE} />
            <BookAppointment doctor={doctor} UserMode={authState.USER_MODE} />
          </div>
        ) : null
        }
      </div>
    </>
  );
};

export default FindDoctor;