import "./header.css";

function Header() {
  const uname = localStorage.getItem("uname");
  const handleLogOut = () => {
    localStorage.removeItem("uname");
    window.location.reload();
  };
  return (
    <div className="header">
      <h1 className="headerText">Live chat app demo</h1>
      {uname && (
        <div className="logout" onClick={handleLogOut}>
          Logout
        </div>
      )}
    </div>
  );
}

export default Header;
