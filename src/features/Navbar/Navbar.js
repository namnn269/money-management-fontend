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
              onAction={(actionKey) => console.log({ actionKey })}
            >
              <Dropdown.Item key="profile" css={{ height: '$18' }}>
                <Text b color="inherit" css={{ d: 'flex' }}>
                  Signed in as
                </Text>
                <Text b color="inherit" css={{ d: 'flex' }}>
                  zoey@example.com
                </Text>
              </Dropdown.Item>
              <Dropdown.Item key="settings" withDivider>
                My Settings
              </Dropdown.Item>
              <Dropdown.Item key="team_settings">Team Settings</Dropdown.Item>
              <Dropdown.Item key="analytics" withDivider>
                Analytics
              </Dropdown.Item>
              <Dropdown.Item key="system">System</Dropdown.Item>
              <Dropdown.Item key="configurations">Configurations</Dropdown.Item>
              <Dropdown.Item key="help_and_feedback" withDivider>
                Help & Feedback
              </Dropdown.Item>
              <Dropdown.Item key="logout" withDivider color="error">
                Log Out
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Navbar.Content>
      </Navbar>
    </Layout>
  );
}
