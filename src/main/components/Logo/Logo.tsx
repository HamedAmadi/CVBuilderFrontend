import './Logo.scss'
import LogoImage from '../../../assets/logo1.png'
import {Link} from 'react-router-dom'


const Logo: React.FC = () => {
  return (
    <Link to='/'>
      <img className='logo' src={LogoImage} alt="logo" />
    </Link>
  )
}

export default Logo
