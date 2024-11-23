import { useEffect } from 'react';
import styled from 'styled-components';

const TitleStyle = styled.div({
   color: (props) => (props.red ? 'red' : props.blue ? 'blue' : 'black'),
   textDecoration: 'underline',
});

export default function StyledComponent() {
   useEffect(() => {
      document.title = 'Styled Component';
   }, []);

   return (
      <>
         <h1>Style de componsant :</h1>
         <br />
         <TitleStyle red>
            <h2>Titre en rouge</h2>
         </TitleStyle>
         <TitleStyle blue>
            <h2>Titre en bleu</h2>
         </TitleStyle>
         <TitleStyle>
            <h2>Titre normal</h2>
         </TitleStyle>
      </>
   );
}
