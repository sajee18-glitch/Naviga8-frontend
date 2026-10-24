
import { useNavigate } from "react-router-dom";
import { logoutDemoUser } from "../utils/demoAuth";

function LogoutButton() {
  const navigate = useNavigate();

  function handleLogout() {
    logoutDemoUser();
    navigate("/login", {
      replace: true,
      state: { message: "You have been logged out successfully." },
    });
  }

  return (
    <button type="button"
     className="logout-button"
     onClick={handleLogout}>
      Log Out
    </button>
  );
}

export default LogoutButton;
