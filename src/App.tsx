import Map from './compenents/Map';
import GlobalStyles from './assets/GlobalStyles';
import { Typography } from '@mui/material';
import Sidebar from './compenents/Sidebar';
import SearchBar from './compenents/SearchBar';
import MuiTheme from './contexts/MuiTheme';
import emotionStyled from '@emotion/styled';
import { styled } from '@mui/material/styles';
import usePropGetter from './App.usePropGetter';

const Container = emotionStyled.div`
  position: relative;
`;

const MapWrapper = emotionStyled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  z-index: 0;
`;

const ListItem = styled(Typography)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignContent: 'center',
}));

function App() {
  const { state, dispatch, searchHandler } = usePropGetter();
  const { city, error, pending, sidebar } = state;

  return (
    <MuiTheme>
      <Container>
        <GlobalStyles />
        <MapWrapper>
          <Map center={city?.results[0].geometry} />
        </MapWrapper>
        {!city && !error && (
          <SearchBar handler={searchHandler} pending={pending} />
        )}

        {(city || error) && (
          <Sidebar
            open={sidebar}
            toggleOpen={() => dispatch({ type: 'sidebar' })}
          >
            <SearchBar handler={searchHandler} pending={pending} />
            {error ? (
              <Typography sx={{ wordBreak: 'break-word' }} component="h3">
                {error}
              </Typography>
            ) : city ? (
              <>
                <ListItem>
                  <span>City: </span>
                  <span>
                    {city.results[0].components._normalized_city || 'N/A'}
                  </span>
                </ListItem>
                <ListItem>
                  <span>District: </span>
                  <span>{city.results[0].components.district || 'N/A'}</span>
                </ListItem>
                <ListItem>
                  <span>Province: </span>
                  <span>{city.results[0].components.province || 'N/A'}</span>
                </ListItem>
                <ListItem>
                  <span>Country: </span>
                  <span>{city.results[0].components.country || 'N/A'}</span>
                </ListItem>
                <ListItem>
                  <span>Continent: </span>
                  <span>{city.results[0].components.continent || 'N/A'}</span>
                </ListItem>
              </>
            ) : null}
          </Sidebar>
        )}
      </Container>
    </MuiTheme>
  );
}

export default App;
