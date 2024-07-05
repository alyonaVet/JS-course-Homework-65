import {NavLink} from 'react-router-dom';
import {PAGES} from '../../constants';

const Toolbar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-info-subtle">
      <div className="container-fluid d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center">
          <NavLink to="/" className="navbar-brand fw-semibold">Static pages</NavLink>
        </div>
        <div className="navbar-nav">
          <div className="navbar-nav">
            <NavLink to="/" className="nav-link fw-medium">Home</NavLink>
            {PAGES.map((page) => (
              <NavLink key={page.id} to={`/pages/${page.id}`} className="nav-link fw-medium">{page.name}</NavLink>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Toolbar;