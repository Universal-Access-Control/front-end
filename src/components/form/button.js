// Tailwindcss
import tw, { styled } from 'twin.macro';

// Styled-Tools
import { switchProp, ifProp } from 'styled-tools';

// ===========================================
const Button = styled.button`
  ${tw`px-4 py-2 rounded`}
  ${ifProp('fullWidth', tw`w-full font-bold`)}
  ${switchProp('variant', {
    gray: tw`text-gray-600 hocus:(bg-gray-300 outline-none bg-gray-300)`,
    success: tw`text-gray-100 bg-green-500 hocus:(bg-green-600 outline-none)`,
    danger: tw`text-gray-100 bg-red-500 hocus:(bg-red-600 outline-none)`,
    dark: tw`text-gray-100 bg-gray-700 hocus:(bg-gray-800 outline-none)`,
  })}
`;

export default Button;
