import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter} from "@fortawesome/free-brands-svg-icons";
import { faGg} from "@fortawesome/free-brands-svg-icons";
//Link를 사용하여 페이지 이동 구현
import { Link } from "react-router-dom";

const Navigation = ({userObj}) => {
   
    return (
    <nav>
        <ul style={{ display : "flex", justifyContent: "center", marginTop: 50}}>
            <li> 
                {/* 홈 */}
                <Link to="/" style={{ marginRight : 10}}>
                <FontAwesomeIcon icon={faTwitter} color = {"#04AAFF"}   size = "2x" />
            </Link>
            </li>
            <li>
                {/* 프로필 */}
                <Link to="/profile"
                style={{
                    marginLeft : 10,
                    display : "flex",
                    flexDirection : "column",
                    alignItems : "center",
                    fontSize : 12,
                }}>
                <FontAwesomeIcon icon={faGg} color = {"#04AAFF"} size = "2x" />    
                <span style={{ marginTop : 10 }}>
                    {userObj.displayName
                    ? `${userObj.displayName}의 Profile`
                    : "Profile"}
                    </span>               
                </Link>
            </li>
        </ul>
    </nav>
    );
};

export default Navigation;