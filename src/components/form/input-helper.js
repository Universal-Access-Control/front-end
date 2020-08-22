// Tailwindcss
import tw, { styled } from 'twin.macro';

// Styled-Tools
import { ifProp } from 'styled-tools';

// ==============================
const InputHelper = styled.div`
  ${tw`block mb-2 text-xs font-thin text-gray-500`}
  ${ifProp('error', tw`text-red-500`, 'text-gray-500')}
`;

export default InputHelper;
