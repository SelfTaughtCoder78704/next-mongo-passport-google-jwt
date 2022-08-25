

const Navbar = (props) => {
  const { links } = props;
  return (
    <div className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          LOGO
        </div>
        <div className="navbar-links">

          <ul>
            {links.map((link, index) => {
              return (
                <li key={index}>
                  <a href={link.href}>{link.text}</a>
                </li>
              )
            })}
          </ul>

        </div>
      </div>
    </div>
  )
}

export default Navbar