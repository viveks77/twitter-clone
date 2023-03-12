import { useApolloClient } from '@apollo/client';
import { Avatar, Box, Button, Divider, Flex, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Stack, Text, useDisclosure } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import React, { useState } from 'react'
import { GetLoggedInUserDocument, useUpdateUserMutation } from '../../generated/graphql';
import { InputField } from '../common/inputField';

type User = {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  bio?: string | null;
  avatar?: {
      filename?: string | null;
  } | null | undefined
}

type Props = {
  user: User | null | undefined;
}

const ProfileInfo = ({user}: Props) => {
  
  const [currentUser, setCurrentUser] = useState<User | null | undefined>(user);

  const [modalUser, setModalUser] = useState<User | null | undefined>(null);

  const { isOpen, onOpen, onClose } = useDisclosure()
  
  const [userAvatarSrc, setUserAvatarSrc] = useState<string | ArrayBuffer | null>('');

  const [avatar, setAvatar] = useState<File | string | null>(null);
  
  const [updateUserMutation] = useUpdateUserMutation();

  const client = useApolloClient();
  
  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    
    if(!event.target.files) return;
    const avatarFile = event.target.files[0];

    setAvatar(avatarFile);

    const reader = new FileReader();
    reader.onloadend = () => {
      setUserAvatarSrc(reader.result);
    }

    reader.onerror = () => {
      console.log('error');
    }
    reader.readAsDataURL(avatarFile);
  }

  const handleUserUpdateModal = () => {
    setModalUser(currentUser);
    setUserAvatarSrc(process.env.IMAGE_URL! + currentUser?.avatar?.filename)
    onOpen();
  }

  const handleUserProfileUpdate = async (values: any) => {
      const {data} = await updateUserMutation({variables: {
        ...values,
        file: avatar ? avatar : null
      }, refetchQueries: [GetLoggedInUserDocument]});
      if(!data?.updateUser){
        console.log('oops!');
      }else{
        setCurrentUser(data?.updateUser);
        setModalUser(null);
        onClose();
    }
  }

  return (
    <React.Fragment>
      <Box borderBottom={"1px"} borderColor={"gray.800"}>
        <Flex p={5} alignContent={'flex-start'} justifyContent={'space-between'}>
          <Stack>
            <Avatar name={currentUser?.username} marginTop="-100px" size={'2xl'} borderWidth={1} borderColor={'black'} src={currentUser?.avatar?.filename ? process.env.IMAGE_URL + currentUser?.avatar.filename : ''}/>
            <Stack marginTop={5}>
            <Text fontWeight={'bold'} fontSize={'1.3rem'}>
              {currentUser?.username}
            </Text>
            <Text color={'gray.500'} fontSize={'0.8rem'}>
              {currentUser?.firstName + " " + currentUser?.lastName}
            </Text>
            <Text color={'gray.500'} fontSize={'0.8rem'}>
              joined date and followers
            </Text>
            </Stack>
          </Stack>
          <Button onClick={handleUserUpdateModal}>
            Set up profile
          </Button>
        </Flex>
      </Box>
      <Modal closeOnOverlayClick={true} isOpen={isOpen} onClose={onClose} size={'xl'}>
        <ModalOverlay />
        <ModalContent bg={"black"}>
          <ModalHeader>
            Edit Profile
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack>
              <Box mb={5} w={'100%'} justifyContent={"flex-start"} alignItems={'center'} display={'flex'}>
                  <Input hidden={true} accept="image/*" name="avatar" id="avatar" type="file" onChange={handleAvatarChange} />
                  <Avatar size={'2xl'} name={modalUser?.username} src={ userAvatarSrc as any}/>
                  <Button display={'flex'} alignItems={'center'} justifyContent={'center'} mx={9}>
                    <label htmlFor='avatar'>Upload Avatar</label>
                  </Button>
              </Box>
              <Box mt={10}>
                <Formik
                  initialValues={{email: modalUser?.email, username: modalUser?.username, firstName: modalUser?.firstName, lastName: modalUser?.lastName, bio: modalUser?.bio}}
                  onSubmit={(values) => handleUserProfileUpdate(values)}
                >
                  {({isSubmitting}) => (
                    <Form>
                     <Box marginBottom={7}>
                        <Stack align={"center"} direction={"row"} spacing={3}>
                          <InputField
                              placeholder="Email"
                              label="Email"
                              name="email"
                              readOnly
                            />
                            <InputField
                              type="text"
                              placeholder="Username"
                              label="Username"
                              name="username"
                              readOnly
                            />
                          </Stack>
                          <Stack mt={8} align={"center"} direction={"row"} spacing={3}>
                            <InputField
                              type="text"
                              label="First Name"
                              name="firstName"
                            />
                           <InputField
                              type="text"
                              label="Last Name"
                              name="lastName"
                              autoComplete="off"
                            />
                          </Stack>
                          <Stack mt={5}>
                            <InputField
                              type='text'
                              label='Bio'
                              name='bio' 
                              textarea={true}
                              />
                          </Stack>
                          <Button mt={8} minW={"full"} type="submit" isLoading={isSubmitting}>
                            Update Profile
                          </Button>
                      </Box>
                    </Form>
                  )}
                </Formik>
              </Box>
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </React.Fragment>
  )
}

export default ProfileInfo;