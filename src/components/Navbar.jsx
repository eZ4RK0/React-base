import { Link } from 'react-router-dom';

export default function Navbar() {
   return (
      <nav>
         <ul>
            <li>
               <Link to="/">Accueil</Link>
            </li>
            <li>
               <Link to="/tic-tac-toe">Tic Tac Toe</Link>
            </li>
            <li>
               <Link to="/style">Styled Component</Link>
            </li>
         </ul>
      </nav>
   );
}
