import React, { useEffect, useState } from 'react';
import decryptToken from '../utility/decryptToken';
// import UserInfoForm from '../userinfo/userinfo';
import BloodRequestForm from '../userRequest/userRequest';

const Home = () => {
  const [decodedToken, setDecodedToken] = useState<any>(null);

  useEffect(() => {
    const token = decryptToken();
    setDecodedToken(token);
  }, []);


  return (
    <div>
     {/* <UserInfoForm/> */}
     <BloodRequestForm/>
    </div>
  );
};

export default Home;
