import { Link } from 'react-router-dom';
import logo  from 'src/assets/images/logos/Logo_Luki.png';
import { styled } from '@mui/material';

const LinkStyled = styled(Link)(() => ({
  height: '70px',
  width: '180px',
  overflow: 'hidden',
  display: 'block',
  textAlign:'center',
  marginTop: '1.5em'
}));

const Logo = () => {
  return (
    <LinkStyled to="/">
      <img src={logo} height={70} alt="logo" />      
    </LinkStyled>
  )
};

export default Logo;
