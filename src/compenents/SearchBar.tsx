import * as React from 'react';
import { Button, ButtonProps, TextField } from '@mui/material';
import { Spinner } from './Spinner';
import SearchIcon from '@mui/icons-material/Search';
import emotionStyled from '@emotion/styled';
import { styled } from '@mui/material/styles';

const SearchBarWrapper = emotionStyled.div`
  position: absolute;
  width: 300px;
  top: 1rem;
  left: 1rem;
  background: #fff;
  border-radius: 2rem;
  box-shadow: 2px 2px 4px rgb(0 0 0 / 20%), 0 -1px 0 rgb(0 0 0 / 2%);
  z-index: 100000000;
  form {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

const SearchButton = styled(Button)<ButtonProps>(() => ({
  position: 'absolute',
  right: '10px',
  top: '10px',
  minWidth: '30px',
  borderRadius: '100%',
}));

const SearchBar = ({
  handler,
  pending,
}: {
  handler: (e: React.FormEvent) => void;
  pending: boolean;
}) => {
  const city = new URLSearchParams(window.location.search).get('city') || '';

  const changeHandler = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      const params = new URLSearchParams({
        city: value,
      });
      window.history.replaceState({}, '', `?${params.toString()}`);
    },
    []
  );

  return (
    <SearchBarWrapper>
      <form onSubmit={handler}>
        <TextField
          name="city"
          variant="outlined"
          placeholder="Search city"
          onChange={changeHandler}
          defaultValue={city}
          sx={{
            input: {
              borderRadius: '50px !important',
              paddingRight: '50px !important',
            },
          }}
        />
        {
          <SearchButton sx={{}} type="submit">
            {pending ? <Spinner /> : <SearchIcon sx={{ cursor: 'pointer' }} />}
          </SearchButton>
        }
      </form>
    </SearchBarWrapper>
  );
};

export default SearchBar;
