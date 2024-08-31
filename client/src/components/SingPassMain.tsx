import { useNavigate } from 'react-router-dom';

const SingPassMain = () => {
    const navigate = useNavigate();

    const handleButtonClick = () => {
        navigate('/page2');
    };

    return (
        <div>
            <button onClick={handleButtonClick}>Login with Mockpass</button>
        </div>
    );
};

export default SingPassMain;