import React, {useState, useRef} from 'react';
import {Container} from 'react-bootstrap';
import UserInfo from '../../components/UserInfo';
import UserLogs from '../../components/UserLogs';
import ChangePasswordModal from '../../components/modals/ChangePasswordModal';

const Page = ({props}) => {
  const [showModal, setShowModal] = useState(false);
  const {setNotification} = props;

  const showChangePassword = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
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
      <UserInfo showChangePassword={showChangePassword} />
      <h1 style={{paddingLeft: 130, margin: '15px 0'}}>Your Logs</h1>
      <Container>
        <UserLogs
          setNotification={setNotification}
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
        setNotification={setNotification}
      />
    </>
  );
};

export default Page;
