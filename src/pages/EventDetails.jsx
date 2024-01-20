import { EventCard, Loading } from '../components'
import { Box, Modal, Stack, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import { useParams } from 'react-router-dom';

const EventDetails = () => {
  const [event, setEvent] = useState(null);
  const [whoIsGoing, setWhoIsGoing] = useState([]);
  const [seeMoreOpen, setSeeMoreOpen] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const getEvent = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_ROOT}/event/${id}`);
        const data = await res.json();

        setEvent(data);
      } catch (error) {
        console.log(error);
      }
    }
    getEvent();

    const getWhoIsGoing = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_ROOT}/ticket/whoisgoing/${id}`);
        const data = await res.json();

        setWhoIsGoing(data);
      } catch (error) {
        console.log(error);
      }
    }
    getWhoIsGoing();
  }, [event])

  const modalStyle = {
    position: 'absolute',
    top: '50%', left: '50%',
    transform: 'translate(-50%, -50%)',
    width: {xs:3/4, sm: 2/3, md: 1/2, lg: 1/3},
    bgcolor: 'background.paper',
    border: 1, borderRadius: 1,
    boxShadow: 24,
    px:{xs:2, sm: 4}, p:4
  };

  if (!event) return <Loading />
  return (
    <Stack direction={{ xs: "column", md: "row" }} m={4} gap={4}>
      <Box width={{ xs: 1, md: 1 / 2 }}>
        <EventCard event={event} />
      </Box>

      <Stack
        direction="column"
        bgcolor="background.paper" boxShadow={4}
        border={1} borderRadius={1} borderColor="grey.600"
        px={{xs:2, sm: 4}} py={4} width={{ xs: 1, md: 1 / 2 }}
      >
        <Typography
          fontSize={30}
          color="primary"
          fontWeight={600}
          sx={{ display: "flex", alignItems: "center", gap: 1 }}
        >
          <PeopleAltIcon fontSize='large'/>
          Who is going?
        </Typography>

        <Box component="ol" pl={6}>
          {
            whoIsGoing.slice(0, 5).map((user) => (
              <Typography component="li" key={user.email} fontSize={22}>
                {user.full_name}
                <Box component="span" fontSize={18} color="text.secondary" pl={4} sx={{display: {xs: 'none', sm: "inline"}}}>
                  ({user.email})
                </Box>
              </Typography>
            ))
          }
        </Box>

        {
          whoIsGoing[5] && (
            <Box
              fontSize="large" color="text.secondary"
              sx={{ '&:hover': { textDecoration: 'underline', cursor: 'pointer' }, display: 'flex', justifyContent: 'end'}}
              onClick={() => setSeeMoreOpen(true)}
            >
              See More..
            </Box>
          )
        }

        <Modal
          open={seeMoreOpen}
          onClose={() => setSeeMoreOpen(false)}
        >
          <Stack
            direction="column" gap={1}
            sx={modalStyle}
          >
            <Typography
              fontSize={28}
              color="primary"
              fontWeight={600}
              sx={{ display: "flex", alignItems: "center", gap: 1 }}
            >
              <PeopleAltIcon fontSize='large' />
              Who is going?
            </Typography>

            <Box component="ol" pl={3}>
              {
                whoIsGoing.map((user) => (
                  <Typography component="li" key={user.email} fontSize={{xs: 18, sm: 20}}>
                    {user.full_name}
                    <Box component="span" fontSize={{xs: 14, sm:16}} color="text.secondary" pl={4}>
                      ({user.email})
                    </Box>
                  </Typography>
                ))
              }
            </Box>
          </Stack>
        </Modal>
      </Stack>
    </Stack>
  )
}

export default EventDetails