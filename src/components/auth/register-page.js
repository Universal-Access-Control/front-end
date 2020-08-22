// React
import React from 'react';

// Tailwindcss
import tw, { styled, theme } from 'twin.macro';

// React-Icons
import { FcGoogle } from 'react-icons/fc';

// React-Router
import { Link as RRLink, useHistory } from 'react-router-dom';

// React-Spring
import { animated, useSpring } from 'react-spring';

// Apollo
import { useMutation } from '@apollo/client';

// Yup
import * as yup from 'yup';

// React-Hook-Form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';

// React-Spinkit
import Spinner from 'react-spinkit';

// React-Toastify
import { toast } from 'react-toastify';

// Main core
import { RegisterMutation } from 'gql/auth-gql';
import Input from 'components/form/input';
import Label from 'components/form/label';
import Button from 'components/form/button';
import InputHelper from 'components/form/input-helper';

// ===================================
const PASSWORD_REGEX = /^(?=.*[a-zA-Z])(?=.*[0-9])/;
const PASSWORD_MESSAGE = 'Password must be at least contains both number and letter';
const registerSchema = yup.object().shape({
  email: yup.string().required().email(),
  password: yup.string().required().min(8).max(30).matches(PASSWORD_REGEX, PASSWORD_MESSAGE),
});
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
const LoadingSpinner = styled(Spinner)`
  ${tw`w-full`}
  & > div {
    ${tw`w-2 h-2 m-1`}
  }
`;

const Separator = ({ children }) => {
  return (
    <SeparatorRoot>
      <SeparatorLine />
      <SeparatorText>{children}</SeparatorText>
      <SeparatorLine />
    </SeparatorRoot>
  );
};

const ErrorToastBody = ({ title, errors }) => {
  const err = errors instanceof Array && errors[0];
  return (
    <div>
      <h1 tw="font-bold">{title}</h1>
      {err && err.extensions && err.extensions.code === 'BAD_USER_INPUT' && (
        <ul>
          {err.extensions.errors.map((error) =>
            Object.keys(error).map((key) => (
              <li key={key} tw="text-xs">
                {error[key][0]}
              </li>
            )),
          )}
        </ul>
      )}
    </div>
  );
};

const RegisterPage = () => {
  const styles = useSpring({ from: { opacity: 0 }, to: { opacity: 1 }, config: { duration: 500 } });
  const { register: registerInput, handleSubmit, errors } = useForm({ resolver: yupResolver(registerSchema) });
  const [register, { loading }] = useMutation(RegisterMutation);
  const history = useHistory();

  async function handleRegisterUser(formData) {
    try {
      await register({ variables: formData });
      toast.success(`You're register successfully`);
      history.push('/login');
    } catch (err) {
      toast.error(<ErrorToastBody title={err.message} errors={err.graphQLErrors} />);
    }
  }

  return (
    <FormContainer onSubmit={handleSubmit(handleRegisterUser)} noValidate>
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
        <Input id="RegisterEmailAddress" type="email" name="email" ref={registerInput} />
        <InputHelper error>{errors.email && errors.email.message}</InputHelper>

        <Label tw="mt-4" htmlFor="RegisterPassword">
          Password
        </Label>
        <Input id="RegisterPassword" type="password" name="password" ref={registerInput} />
        <InputHelper error>{errors.password && errors.password.message}</InputHelper>

        <Button fullWidth variant="dark" tw="mt-6" type="submit">
          {loading ? <LoadingSpinner name="three-bounce" color={theme`colors.gray.100`} /> : 'Register'}
        </Button>

        <Separator>
          <Link to="/login">or sign in</Link>
        </Separator>
      </animated.div>
    </FormContainer>
  );
};

export default RegisterPage;
