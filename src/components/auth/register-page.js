// React
import React from 'react';

// Tailwindcss
import tw from 'twin.macro';

// React-Icons
import { FcGoogle } from 'react-icons/fc';

// React-Router
import { Link as RRLink } from 'react-router-dom';

// React-Spring
import { animated, useSpring } from 'react-spring';

// Main core
import Input from 'components/form/input';
import Label from 'components/form/label';
import Button from 'components/form/button';

// ===================================
const FormContainer = tw.form`w-full py-8 px-6 md:px-8 lg:w-1/2`;
const Header = tw.h1`text-2xl font-semibold text-gray-700 text-center`;
const WelcomeMessage = tw.p`text-xl text-gray-600 text-center`;
const GoogleButtonLink = tw(RRLink)`
  flex items-center justify-center mt-4 text-white rounded-lg shadow-md hover:bg-gray-100
  px-4 py-3 text-center text-gray-600 font-semibold
`;
const GoogleIcon = tw(FcGoogle)`w-6 h-6`;
const SeparatorRoot = tw.div`flex items-center justify-between mt-4`;
const SeparatorLine = tw.span`w-1/5 border-b lg:w-1/4`;
const SeparatorText = tw.span`text-xs text-center text-gray-500 uppercase`;
const Link = tw(RRLink)`text-xs font-normal text-gray-500 hover:underline`;

const Separator = ({ children }) => {
  return (
    <SeparatorRoot>
      <SeparatorLine />
      <SeparatorText>{children}</SeparatorText>
      <SeparatorLine />
    </SeparatorRoot>
  );
};

const RegisterPage = () => {
  const styles = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
  });
  const handleRegisterUser = (e) => {
    e.preventDefault();
    // TODO: Register User
  };

  return (
    <FormContainer onSubmit={handleRegisterUser}>
      <animated.div style={styles}>
        <Header>
          Access <span tw="text-blue-500">Control</span>
        </Header>

        <WelcomeMessage>Welcome back!</WelcomeMessage>
        <GoogleButtonLink to="#">
          <GoogleIcon />
          <span tw="w-5/6">Sign up with Google</span>
        </GoogleButtonLink>

        <Separator>or register with email</Separator>

        <Label tw="mt-4" htmlFor="RegisterEmailAddress">
          Email Address
        </Label>
        <Input id="RegisterEmailAddress" type="email" />

        <Label tw="mt-4" htmlFor="RegisterPassword">
          Password
        </Label>
        <Input id="RegisterPassword" type="password" />

        <Button fullWidth variant="dark" tw="mt-8" type="button">
          Register
        </Button>

        <Separator>
          <Link to="/login">or sign in</Link>
        </Separator>
      </animated.div>
    </FormContainer>
  );
};

export default RegisterPage;
