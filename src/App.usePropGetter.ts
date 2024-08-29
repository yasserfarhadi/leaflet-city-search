import React from 'react';
import { City } from './types/City';
import * as api from './api';

type PendingAction = { type: 'pending'; payload: boolean };
type CityAction = { type: 'city'; payload: City };
type ErrorAction = { type: 'error'; payload: string };
type SideabrAction = { type: 'sidebar'; payload?: boolean };

type State = {
  pending: boolean;
  city: City | null;
  error: string;
  sidebar: boolean;
};

const initialState = {
  pending: false,
  city: null,
  error: '',
  sidebar: false,
};

const reducer = (
  state: State,
  action: PendingAction | CityAction | ErrorAction | SideabrAction
) => {
  switch (action.type) {
    case 'pending':
      return { ...state, pending: action.payload };
    case 'city':
      return { ...state, city: action.payload };
    case 'error':
      return { ...state, error: action.payload };
    case 'sidebar':
      return {
        ...state,
        sidebar:
          typeof action.payload === 'boolean' ? action.payload : !state.sidebar,
      };
    default:
      return state;
  }
};

export default function usePropGetter() {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  async function searchHandler(event: React.FormEvent) {
    event.preventDefault();
    dispatch({ type: 'pending', payload: true });
    dispatch({ type: 'error', payload: '' });

    try {
      const formData = new FormData(
        (event.currentTarget || event.target) as HTMLFormElement
      );
      const city = formData.get('city') as string;
      if (!city.trim()) return;

      const cityData = await api.getCity(city);
      if (cityData && cityData.results.length) {
        const params = new URLSearchParams({
          city,
          lat: String(cityData.results[0].geometry.lat) || '',
          lng: String(cityData.results[0].geometry.lng) || '',
        });
        window.history.replaceState({}, '', `?${params.toString()}`);
      }
      dispatch({ type: 'city', payload: cityData });
      dispatch({ type: 'sidebar', payload: true });
    } catch (err: unknown) {
      if (typeof err === 'string') {
        dispatch({ type: 'error', payload: err });
      }
    } finally {
      dispatch({ type: 'pending', payload: false });
      dispatch({ type: 'sidebar', payload: true });
    }
  }

  return {
    state,
    dispatch,
    searchHandler,
  };
}

// const [pending, setPending] = React.useState(false);
// const [city, setCity] = React.useState<City | null>(null);
// const [error, setError] = React.useState('');
// const [open, setOpen] = React.useState(false);
