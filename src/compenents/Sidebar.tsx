import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { Button, ButtonProps } from '@mui/material';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { styled } from '@mui/material/styles';

const CustomButton = styled(Button)<ButtonProps>(() => ({
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  transition: 'left 200ms ease-out',
  backgroundColor: '#FFFFFF',
  zIndex: 4,
  minWidth: '25px',
  width: '25px',
  height: '50px',
  borderTopLeftRadius: '0',
  borderBottomLeftRadius: '0',
  borderTopRightRadius: '10px',
  borderBottomRightRadius: '10px',
  boxShadow: 'inset 3px 0 3px rgba(0, 0, 0, 0.2)',
  border: '2px solid gray',
  borderLeft: 'none',
}));
const DrawerContent = styled(Box)<ButtonProps>(() => ({
  width: 335,
  maxWidth: 335,
  padding: '1rem',
  paddingTop: '100px',
}));

type Props = {
  open: boolean;
  toggleOpen: () => void;
  children: React.ReactNode;
};
const Sidebar: React.FC<Props> = ({ children, open, toggleOpen }) => {
  return (
    <div>
      <CustomButton
        sx={{
          left: open ? 335 : 0,
        }}
        onClick={toggleOpen}
      >
        {open ? <ArrowLeftIcon /> : <ArrowRightIcon />}
      </CustomButton>
      <Drawer sx={{ zIndex: 2 }} open={open} onClose={toggleOpen}>
        <DrawerContent>{children}</DrawerContent>
      </Drawer>
    </div>
  );
};

export default Sidebar;
