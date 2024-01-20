import { useKindeAuth } from '@kinde-oss/kinde-auth-react';
import { EventForm } from '../components'
import { useState } from "react";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const AddEvent = () => {
  const [event, setEvent] = useState({ organizer: "", title: "", date: "", duration: "", location: "", desc: "" });
  const token = useSelector((state) => state.user.token);
  const userDBID = useSelector((state) => state.user.dbid);
  const navigate = useNavigate();
  const { login, isAuthenticated, isLoading } = useKindeAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(userDBID);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_ROOT}/event/new`, {
        method: "POST",
        headers: {
          'x-auth-token': token,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          organizer: userDBID,
          title: event.title,
          date: event.date,
          duration: event.duration,
          location: event.location,
          desc: event.desc,
        })
      });
      const data = await res.json();
      if (data.eventID) {
        navigate("/")
      }
    } catch (error) {
      console.log(error);
    }
  }

  if (!isAuthenticated && !isLoading) login();

  return (
    <EventForm type="Add New" handleSubmit={handleSubmit} event={event} setEvent={setEvent} />
  )
}

export default AddEvent