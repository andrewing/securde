import React, {useState, useRef} from 'react';
import {Jumbotron, Container} from 'react-bootstrap';
import UserInfo from '../../components/UserInfo';
import UserLogs from '../../components/UserLogs';
import ChangePasswordModal from '../../components/modals/ChangePasswordModal';

const Page = () => {
  const [showModal, setShowModal] = useState(false);

  const showChangePassword = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const changePassword = values => {
    // console.log(values);
  };

  // for table filters
  const [searchText, setSearchText] = useState('');
  const [searchColumn, setSearchColumn] = useState('');
  const searchInput = useRef();

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchColumn(dataIndex);
  };

  const handleReset = clearFilters => {
    clearFilters();
    setSearchText('');
  };

  return (
    <>
      <Jumbotron bsPrefix="page-header" fluid>
        <h1 style={{color: '#6C4CC5'}}>Username</h1>
        <p>Welcome to your profile!</p>
      </Jumbotron>
      <br />
      <UserInfo showChangePassword={showChangePassword} />
      <h1 style={{paddingLeft: 130, margin: '15px 0'}}>Your Logs</h1>
      <Container>
        <UserLogs
          searchText={searchText}
          searchColumn={searchColumn}
          searchInput={searchInput}
          handleSearch={handleSearch}
          handleReset={handleReset}
        />
      </Container>
      <ChangePasswordModal
        showModal={showModal}
        handleClose={handleClose}
        changePassword={changePassword}
      />
    </>
  );
};

export default Page;
