/* eslint-disable react-hooks/exhaustive-deps */
import {
  Avatar,
  Button,
  Container,
  Input,
  Progress,
  Text,
} from '@nextui-org/react';
import {
  getDownloadURL,
  ref,
  uploadBytesResumable,
  listAll,
  deleteObject,
} from 'firebase/storage';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import authApi from '~/api/authApi';
import EditIcon from '~/components/Icons/EditIcon';
import { defaultAvatar } from '~/configs/constant';
import myStorage from '~/configs/Firebase';

const acceptedImageFormats = ['.jpg', '.jpeg', '.png', '.gif', '.bmp'];

function AvatarUpload() {
  const user = useSelector((state) => state.auth.login.currentUser);
  const dispatch = useDispatch();
  const inputRef = useRef();
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState({ state: false, progress: 0 });
  const [avatar, setAvatar] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const uploadImage = async () => {
    if (!user) return;
    if (!avatar) return;
    const acceptedImg = acceptedImageFormats.some((tail) =>
      avatar.name.endsWith(tail)
    );
    if (!acceptedImg) {
      setErrorMessage('File format is not correct!!');
      setTimeout(() => setErrorMessage(''), 5000);
      return;
    }

    const metadata = { contentType: 'image/img' };
    const storageRef = ref(myStorage, `avatar/${user.id}/${avatar.name}`);
    const folderRef = ref(myStorage, `avatar/${user.id}`);
    const uploadTask = uploadBytesResumable(storageRef, avatar, metadata);
    await listAll(folderRef).then(
      (res) => {
        const listItem = res.items;
        listItem.forEach((item) => {
          const deleteref = ref(myStorage, item.fullPath);
          deleteObject(deleteref);
        });
      },
      (error) => console.log(error)
    );

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = Math.floor(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setLoading({ state: true, progress: progress });
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
          default:
        }
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(storageRef).then(
          (url) => {
            authApi.updateInfo({ id: user.id, avatar: url }, user, dispatch);
          },
          (reject) => {
            console.log(reject);
          }
        );
        setLoading({ state: false, progress: 0 });
        setAvatar(null);
        inputRef.current.value = null;
      }
    );
  };

  useEffect(() => {
    if (!avatar) return;
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(avatar);
  }, [avatar]);

  return (
    <Container
      css={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '1rem',
      }}
    >
      <Text
        h1
        size={20}
        align="center"
        css={{
          textGradient: '45deg, $blue600 -20%, $pink600 50%',
          fontWeight: 'bold',
        }}
      >
        Change avatar
      </Text>
      <Avatar
        squared
        bordered
        as="button"
        color="primary"
        size="xl"
        css={{ size: '200px' }}
        src={previewUrl || user?.avatar || defaultAvatar}
        onClick={() => inputRef.current.click()}
      />
      {loading.state && (
        <>
          <div style={{ color: '#1361bf', fontWeight: 'bolder' }}>
            {loading.progress + '%'}
          </div>
          <Progress value={loading.progress} color="primary" status="primary" />
        </>
      )}
      <Input
        onChange={(e) => setAvatar(e.target.files[0])}
        type="file"
        label="Avatar"
        id="avatar"
        accept=".jpg,.jpeg,.png,.gif,.bmp"
        ref={inputRef}
        css={{ display: 'none' }}
      />
      <button
        style={{
          height: '40px',
          width: '40px',
          border: 'solid 2px #fc0324',
          borderRadius: '999px',
          display: 'block',
          cursor: 'pointer',
        }}
        onClick={() => inputRef.current.click()}
      >
        <EditIcon fill="#fc0324" />
      </button>
      {errorMessage && (
        <Text color="red" weight="bold">
          {errorMessage}
        </Text>
      )}
      <Button onPress={uploadImage} type="button" bordered>
        Upload image
      </Button>
    </Container>
  );
}

export default AvatarUpload;
