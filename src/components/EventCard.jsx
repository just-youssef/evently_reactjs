import { Box, Button, IconButton, Modal, Stack, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PlaceIcon from '@mui/icons-material/Place';
import EventIcon from '@mui/icons-material/Event';
import TimelapseIcon from '@mui/icons-material/Timelapse';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const EventCard = ({ event }) => {
  const token = useSelector((state) => state.user.token);
  const userDBID = useSelector((state) => state.user.dbid);
  const navigate = useNavigate();
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [confirmBookOpen, setConfirmBookOpen] = useState(false);
  const [ticketBooked, setTicketBooked] = useState(false);

  useEffect(() => {
    const checkTicketBook = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_ROOT}/ticket/${event._id}`, {
          headers: {
            'x-auth-token': token,
          }
        });
        if (res.ok) {
          setTicketBooked(true)
        }
      } catch (error) {
        console.log(error);
      }
    }
    checkTicketBook();
  }, [token, ticketBooked])

  const handleDelete = async () => {
    setConfirmDeleteOpen(false);
    console.log(token);
    try {
      await fetch(`${import.meta.env.VITE_API_ROOT}/event/${event._id}`, {
        method: "DELETE",
        headers: {
          'x-auth-token': token,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  const handleBook = async () => {
    setConfirmBookOpen(false);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_ROOT}/ticket/${event._id}`, {
        method: "POST",
        headers: {
          'x-auth-token': token,
        },
      });
      const data = await res.json();

      if (data.ticketID) {
        setTicketBooked(true)
      }
    } catch (error) {
      console.log(error);
    }
  }

  const modalStyle = {
    position: 'absolute',
    top: '50%', left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { xs: 2 / 3, md: 1 / 2, lg: 1 / 3 },
    bgcolor: 'background.paper',
    border: 1, borderRadius: 1,
    boxShadow: 24,
    px:{xs:2, sm: 4}, p:4
  };

  const openConfirmBook = () => {
    if(token){
      setConfirmBookOpen(true)
    } else {
      navigate('/signIn')
    }
  }
  return (
    <Stack
      direction="column"
      justifyContent="center"
      bgcolor="background.paper" boxShadow={4}
      border={1} borderRadius={1} borderColor="grey.600"
      px={3} pb={5} pt={3} minHeight={400}
    >
      {
        (token && userDBID == event.organizer._id) ? (
          <Stack direction="row" justifyContent="end" alignItems="center">
            <IconButton onClick={() => navigate(`/updateEvent/${event._id}`)}><EditIcon /></IconButton>
            <IconButton onClick={() => setConfirmDeleteOpen(true)}><DeleteIcon /></IconButton>

            <Modal
              open={confirmDeleteOpen}
              onClose={() => setConfirmDeleteOpen(false)}
            >
              <Stack
                direction="column" gap={1}
                sx={modalStyle}
              >
                <Typography fontSize={20} sx={{ mb: 4 }} textAlign="center">
                  Are your sure you want to delete "{event.title}" event?
                </Typography>
                <Button fullWidth onClick={handleDelete} color='error' variant='contained'>Confirm Delete</Button>
                <Button fullWidth onClick={() => setConfirmDeleteOpen(false)} color='inherit' variant='outlined'>Cancel</Button>
              </Stack>
            </Modal>
          </Stack>
        ) : <Box pt={2} />
      }
      <Box sx={{ mb: 3, pb: 2, '&:hover': { backgroundColor: 'divider', borderRadius: 1 } }}>
        <Link to={`/event/${event._id}`} style={{ textDecoration: 'none' }}>
          <Typography
            fontSize={30}
            color="primary"
            fontWeight={600}
          >
            {event.title}
          </Typography>

          <Typography
            fontSize={20}
            color="text.secondary"
          >
            {event.desc}
          </Typography>
        </Link>
      </Box>

      <Typography
        fontSize={18}
        sx={{ display: "flex", alignItems: "center", gap: 0.6, mb: 1 }}
      >
        <PlaceIcon />
        {event.location}
      </Typography>

      <Typography
        fontSize={18}
        sx={{ display: "flex", alignItems: "center", gap: 0.6, mb: 1 }}
      >
        <EventIcon />
        {event.date}
      </Typography>

      <Typography
        fontSize={18}
        sx={{ display: "flex", alignItems: "center", gap: 0.6 }}
      >
        <TimelapseIcon />
        {event.duration} day(s)
      </Typography>

      <Box sx={{flexGrow: 1}} />

      {
        token && ticketBooked ?
          <Button color='primary' variant='contained' fullWidth disabled startIcon={<CheckCircleIcon />}>
            Ticket Booked
          </Button>
          :
          <Button
            color='primary' variant='contained' fullWidth
            onClick={openConfirmBook}
          >
            Book Ticket
          </Button>
      }
      <Modal
        open={confirmBookOpen}
        onClose={() => setConfirmBookOpen(false)}
      >
        <Stack
          direction="column" gap={1}
          sx={modalStyle}
        >
          <Typography fontSize={20} sx={{ mb: 4 }} textAlign="center">
            Are your sure you want to book a ticket for "{event.title}" event?
          </Typography>
          <Button fullWidth onClick={handleBook} color='success' variant='contained'>Confirm Book</Button>
          <Button fullWidth onClick={() => setConfirmBookOpen(false)} color='inherit' variant='outlined'>Cancel</Button>
        </Stack>
      </Modal>
    </Stack>
  )
}

export default EventCard