import React from 'react';
import MsgList from '../components/MsgList';
import fetcher from '../fetcher';

const Home = ({ smsgs, susers }) => {
  return (
    <div>
      <MsgList smsgs={smsgs} susers={susers} />
    </div>
  );
};

// @see https://velog.io/@hyounglee/TIL-93
export const getServerSideProps = async () => {
  const smsgs = await fetcher('get', '/messages');
  const susers = await fetcher('get', '/users');
  return {
    props: { smsgs, susers },
  };
};

export default Home;
