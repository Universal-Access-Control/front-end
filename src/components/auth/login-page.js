// React
import React, { useContext } from 'react';

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

// React-Hook-Form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';

// Yup
import * as yup from 'yup';

// React-Toastify
import { toast } from 'react-toastify';

// React-Spinkit
import Spinner from 'react-spinkit';

// Main core
import { LoginMutation } from 'gql/auth-gql';
import { UserContext } from 'store/user-context';
import Input from 'components/form/input';
import InputHelper from 'components/form/input-helper';
import Label from 'components/form/label';
import Button from 'components/form/button';

// ===================================
const loginSchema = yup.object().shape({
  email: yup.string().required().email(),
  password: yup.string().required(),
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
const PasswordLabel = tw(Label)`mt-4 flex items-center justify-between`;
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
          <li tw="text-xs">{err.extensions.errors[0].inputs}</li>
        </ul>
      )}
    </div>
  );
};

const LoginPage = () => {
  const styles = useSpring({ from: { opacity: 0 }, to: { opacity: 1 } });
  const { register, handleSubmit, errors } = useForm({ resolver: yupResolver(loginSchema) });
  const [login, { loading }] = useMutation(LoginMutation);
  const { updateUser } = useContext(UserContext);
  const history = useHistory();

  async function handleLoginUser(formData) {
    try {
      const res = await login({ variables: formData });
      updateUser(res.data.login);
      history.push('/devices');
    } catch (err) {
      toast.error(<ErrorToastBody title={err.message} errors={err.graphQLErrors} />);
    }
  }

  return (
    <FormContainer onSubmit={handleSubmit(handleLoginUser)}>
      <animated.div style={styles}>
        {/* Header */}
        <Header>
          Access <span tw="text-blue-500">Control</span>
        </Header>

        <WelcomeMessage>Welcome back!</WelcomeMessage>
        <GoogleButtonLink to="#">
          <GoogleIcon />
          <span tw="w-5/6">Sign in with Google</span>
        </GoogleButtonLink>

        <Separator>or login with email</Separator>

        {/* Email  */}
        <Label tw="mt-4" htmlFor="LoginEmailAddress">
          Email Address
        </Label>
        <Input id="LoginEmailAddress" type="email" name="email" ref={register} />
        <InputHelper error>{errors.email && errors.email.message}</InputHelper>

        {/* Password */}
        <PasswordLabel tw="mt-4" htmlFor="LoginPassword">
          Password
          <Link to="#">Forget Password?</Link>
        </PasswordLabel>
        <Input id="LoginPassword" type="password" name="password" ref={register} />
        <InputHelper error>{errors.password && errors.password.message}</InputHelper>

        {/* Action */}
        <Button fullWidth variant="dark" tw="mt-6" type="submit">
          {loading ? <LoadingSpinner name="three-bounce" color={theme`colors.gray.100`} /> : 'Login'}
        </Button>

        <Separator>
          <Link to="/register">or sign up</Link>
        </Separator>
      </animated.div>
    </FormContainer>
  );
};

export default LoginPage;
