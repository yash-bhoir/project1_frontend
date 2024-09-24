import React, { useEffect, useState } from 'react';
import decryptToken from '../utility/decryptToken';

const Home = () => {
  const [decodedToken, setDecodedToken] = useState<any>(null);

  useEffect(() => {
    const token = decryptToken();
    setDecodedToken(token);
  }, []);

  if (!decodedToken) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Decoded Token:</h1>
      <pre>{JSON.stringify(decodedToken, null, 2)}</pre>
    </div>
  );
};

export default Home;
