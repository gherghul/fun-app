import Router from 'next/router';
import { useState } from 'react';
import CredentialsForm from '../../components/credentials-form';
import useRequest from '../../hooks/use-request';

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { doRequest, errors } = useRequest({
    url: '/api/users/signin',
    method: 'post',
    body: {
      email, password
    },
    onSuccess: (e) => {
      Router.push('/');
    }
  });

  return (
    <div>
      <CredentialsForm
        submitRequest={[doRequest, errors]}
        title={'Sign In'}
        emailState={[email, setEmail]}
        passwordState={[password, setPassword]}
      />
    </div>

  );

};

export default Signin;