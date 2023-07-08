import Router from 'next/router';
import { useState } from 'react';
import CredentialsForm from '../../components/credentials-form';
import useRequest from '../../hooks/use-request';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { doRequest, errors } = useRequest({
    url: '/api/users/signup',
    method: 'post',
    body: {
      email, password
    },
    onSuccess: () => {
      Router.push('/');
    }
  });


  return (
    <CredentialsForm
      submitRequest={[doRequest, errors]}
      title={'Sign Up'}
      emailState={[email, setEmail]}
      passwordState={[password, setPassword]}
    />
  );
};

export default Signup;