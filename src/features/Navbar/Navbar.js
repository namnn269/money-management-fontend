import { Navbar, Text, Avatar, Dropdown, Button } from '@nextui-org/react';
import { Layout } from './Layout.js';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import authApi from '~/api/authApi.js';
import { defaultAvatar } from '~/configs/constant.js';

export default function NavbarTop() {
  const user = useSelector((state) => state.auth.login.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    authApi.logout(user, dispatch, navigate);
  };

  const logoutAll = (e) => {
    if (!(e === 'logoutAll')) return;
    authApi.logout(user, dispatch, navigate, 'logout-all');
  };

  return (
    <Layout>
      <Navbar isBordered variant="sticky">
        <Navbar.Brand css={{ mr: '$4' }}></Navbar.Brand>
        {!user && (
          <Text weight={'bold'} size={16} color="error">
            Login to use this app!
          </Text>
        )}
        <Navbar.Content
          css={{
            '@xsMax': {
              w: '100%',
              jc: 'flex-end',
            },
          }}
        >
          {!user && (
            <Button auto bordered>
              <Link to="/login">
                <Text color="primary">Login</Text>
              </Link>
            </Button>
          )}
          {user && (
            <Button onPress={handleLogout} auto bordered color="warning">
              Logout
            </Button>
          )}

          {user && (
            <Dropdown placement="bottom-right">
              <Navbar.Item>
                <Dropdown.Trigger>
                  <Avatar
                    bordered
                    as="button"
                    color="primary"
                    size="md"
                    src={user?.avatar || defaultAvatar}
                  />
                </Dropdown.Trigger>
              </Navbar.Item>

              <Dropdown.Menu
                aria-label="User menu actions"
                color="secondary"
                onAction={logoutAll}
              >
                <Dropdown.Item
                  key="profile"
                  css={{ height: '$18' }}
                  textValue="signin"
                >
                  <Text b color="inherit" css={{ d: 'flex' }}>
                    Signed in as
                  </Text>
                  <Text b color="inherit" css={{ d: 'flex' }}>
                    {user?.email}
                    {!user?.verifiedEmail && '(unverified)'}
                  </Text>
                </Dropdown.Item>
                <Dropdown.Item key="logoutAll" withDivider color="error">
                  Logout all devices
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          )}
        </Navbar.Content>
      </Navbar>
    </Layout>
  );
}
