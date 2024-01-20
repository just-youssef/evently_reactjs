import { EventForm } from '../components'
import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateEvent = () => {
  const [event, setEvent] = useState({ organizer: "", title: "", date: "", duration: "", location: "", desc: "" });
  const token = useSelector((state) => state.user.token);
  const navigate = useNavigate();
  const { id } = useParams();
  const { login, isAuthenticated, isLoading } = useKindeAuth();

  useEffect(() => {
    const getEvent = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_ROOT}/event/${id}`);
        const data = await res.json();

        setEvent({
          organizer: data.organizer._id,
          title: data.title,
          date: data.date,
          duration: data.duration,
          location: data.location,
          desc: data.desc,
        });
      } catch (error) {
        console.log(error);
      }
    }

    getEvent();
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const res = await fetch(`${import.meta.env.VITE_API_ROOT}/event/${id}`, {
        method: "PUT",
        headers: {
          'x-auth-token': token,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
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
    <EventForm type="Update" handleSubmit={handleSubmit} event={event} setEvent={setEvent} />
  )
}

export default UpdateEvent