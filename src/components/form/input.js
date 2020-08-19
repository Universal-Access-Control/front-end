// Tailwindcss
import tw, { styled } from 'twin.macro';

// Styled-Tools
import { switchProp } from 'styled-tools';

// ===========================================
const textStyles = tw`
  block w-full px-4 py-2 mt-2
  text-gray-800 bg-gray-200 border border-gray-300 rounded
  focus:(outline-none bg-white) disabled:text-gray-500
`;
const checkboxStyles = tw`mr-2 cursor-pointer`;

const Input = styled.input`
  ${switchProp(
    'type',
    {
      checkbox: checkboxStyles,
    },
    textStyles,
  )}
`;

export default Input;
