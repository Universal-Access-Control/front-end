// Tailwindcss
import tw, { styled } from 'twin.macro';

// Styled-Tools
import { ifProp } from 'styled-tools';

// =========================================
const Card = styled.div`
  ${tw`overflow-hidden bg-white rounded-md shadow-md`}
  ${ifProp('noPadding', null, tw`px-6 py-8 md:px-8`)}
`;

export default Card;
