// React
import React, { useContext } from 'react';

// Tailwindcss
import tw, { styled, theme } from 'twin.macro';

// Lodash
import _ from 'lodash';

// React-Spinkit
import Spinner from 'react-spinkit';

// Apollo
import { useMutation } from '@apollo/client';

// React-Hook-Form
import { useForm } from 'react-hook-form';

// React-Toastify
import { toast } from 'react-toastify';

// Main core
import { UPDATE_USER_MUTATION } from 'gql/user-gql';
import { UserContext } from 'store/user-context';
import Card from 'components/base/card';
import Input from 'components/form/input';
import Label from 'components/form/label';
import Button from 'components/form/button';

// ========================================
const Header = tw.h2`pb-4 text-xl font-semibold text-gray-700 capitalize`;
const Body = tw.div`relative flex flex-wrap justify-between pt-4`;
const AvatarWrapper = tw.div`flex-shrink mx-auto`;
const Avatar = tw.object`w-32 h-32 mx-0 bg-gray-200 border-2 border-gray-400 rounded-full md:mr-8`;
const Form = tw.form`flex-auto min-w-xs sm:min-w-none`;
const PageLoading = styled(Spinner)`
  ${tw`flex justify-center flex-1 p-4 mt-10`}
  & > div {
    ${tw`w-10 h-10`}
  }
`;
const LoadingSpinner = styled(Spinner)`
  ${tw`w-full`}
  & > div {
    ${tw`w-2 h-2 m-1`}
  }
`;

const ProfilePage = () => {
  const { user, updateUser } = useContext(UserContext);
  const [updateUserInfo, { loading }] = useMutation(UPDATE_USER_MUTATION);
  const { register, handleSubmit } = useForm();

  const handleUpdateProfile = async (data) => {
    try {
      const res = await updateUserInfo({ variables: data });
      updateUser(res.data.updateMe);
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error('Cannot update your profile!');
    }
  };

  return (
    <Card tw="mx-auto my-16 max-w-sm lg:max-w-2xl">
      <Header>Profile</Header>
      <Body>
        {user ? (
          <>
            <AvatarWrapper>
              <Avatar data="https://source.unsplash.com/MTZTGvDsHFY/300x300" type="image/jpg" />
            </AvatarWrapper>
            <Form onSubmit={handleSubmit(handleUpdateProfile)}>
              <Label>First Name</Label>
              <Input defaultValue={_.get(user, 'firstName', '')} name="firstName" ref={register} />
              <Label tw="mt-4">Last Name</Label>
              <Input defaultValue={_.get(user, 'lastName', '')} name="lastName" ref={register} />
              <Label tw="mt-4">Email</Label>
              <Input defaultValue={_.get(user, 'email', '')} disabled />
              <Button fullWidth tw="mt-8" variant="success" type="submit" disabled={loading}>
                {loading ? <LoadingSpinner name="three-bounce" color={theme`colors.gray.100`} /> : 'Save'}
              </Button>
            </Form>
          </>
        ) : (
          <PageLoading name="pulse" color={theme`colors.gray.600`} />
        )}
      </Body>
    </Card>
  );
};

export default ProfilePage;
