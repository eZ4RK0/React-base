import { Link } from 'react-router-dom';

export default function Navbar() {
   return (
      <nav>
         <ul>
            <li>
               <Link to="/">Accueil</Link>
            </li>
            <li>
               <Link to="/about">À propos</Link>
            </li>
         </ul>
      </nav>
   );
}
