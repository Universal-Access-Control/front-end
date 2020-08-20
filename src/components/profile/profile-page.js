// React
import React from 'react';

// Tailwindcss
import tw from 'twin.macro';

// Main core
import Card from 'components/base/card';
import Input from 'components/form/input';
import Label from 'components/form/label';
import Button from 'components/form/button';

// ========================================
const Header = tw.h2`pb-4 text-xl font-semibold text-gray-700 capitalize`;
const Body = tw.div`flex flex-wrap justify-between pt-4`;
const AvatarWrapper = tw.div`flex-shrink mx-auto`;
const Avatar = tw.object`w-32 h-32 mx-0 bg-gray-200 border-2 border-gray-400 rounded-full md:mr-8`;
const Form = tw.form`flex-auto min-w-xs sm:min-w-none`;

const ProfilePage = () => {
  const handleUpdateProfile = (e) => {
    e.preventDefault();
    // TODO: Update Profile
  };

  return (
    <Card tw="mx-auto my-16 max-w-sm lg:max-w-2xl">
      <Header>Profile</Header>
      <Body>
        <AvatarWrapper>
          <Avatar data="https://source.unsplash.com/MTZTGvDsHFY/300x300" type="image/jpg" />
        </AvatarWrapper>
        <Form onSubmit={handleUpdateProfile}>
          <Label>First Name</Label>
          <Input />
          <Label tw="mt-4">Last Name</Label>
          <Input />
          <Label tw="mt-4">Email</Label>
          <Input />
          <Button fullWidth tw="mt-8" variant="success">
            Save
          </Button>
        </Form>
      </Body>
    </Card>
  );
};

export default ProfilePage;
