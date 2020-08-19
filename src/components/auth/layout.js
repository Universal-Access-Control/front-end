// React
import React from 'react';

// Tailwindcss
import tw, { styled } from 'twin.macro';

// ========================================
// const LAYOUT_IMAGE_URL = 'https://source.unsplash.com/FO7JIlwjOtU?w=667&q=80';
const LAYOUT_IMAGE_URL = 'https://source.unsplash.com/lmFJOx7hPc4?w=667&q=80';
const LayoutContainer = tw.main`
  flex items-center justify-center
  w-screen h-screen px-8 py-16 bg-gray-300
`;
const FormCard = tw.div`
  flex flex-1 max-w-sm overflow-y-auto overflow-x-hidden
  bg-white rounded-lg shadow-lg max-h-full sm:min-h-lg lg:max-w-4xl
`;
const Image = styled.div`
  ${tw`hidden bg-gray-100 bg-center bg-cover lg:block lg:w-1/2`}
  background-image: url(${LAYOUT_IMAGE_URL});
`;

const AuthLayout = ({ children }) => {
  return (
    <LayoutContainer>
      <FormCard>
        <Image />
        {children}
      </FormCard>
    </LayoutContainer>
  );
};

export default AuthLayout;
