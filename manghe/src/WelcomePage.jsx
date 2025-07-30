import { useNavigate } from 'react-router';

function WelcomePage() {
  const navigate = useNavigate();

  const handleStartJourney = () => {
    navigate('/shop');
  };

  return (
    <div>
      <h1>Welcome</h1>
      <button onClick={handleStartJourney}>开启盲盒之旅</button>
    </div>
  );
}

export default WelcomePage;