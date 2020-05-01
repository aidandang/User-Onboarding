import React from 'react';

export default function Footer() {
  return <>
    <section>
      <div className="containter-fluid bg-dark">
        <div className="row">
          <div className="col-12 navbar navbar-dark bg-dark">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a className="nav-link" href="#">Back to Top</a>
            </li>
          </ul>
          </div>
          <div className="col-12 text-center footer-custom">
            
          </div>
        </div>
      </div>
    </section>
  </>
}