//Link를 사용하여 페이지 이동 구현
import { Link } from "react-router-dom";

const Navigation = ({userObj}) => {
    return (
    <nav>
        <ul>
            <li> 
                {/* 홈 */}
                <Link to="/">Home</Link>
            </li>
            <li>
                {/* 프로필 */}
                <Link to="/profile">{userObj.displayName}의 프로필</Link>
            </li>
        </ul>
    </nav>
    );
};

export default Navigation;