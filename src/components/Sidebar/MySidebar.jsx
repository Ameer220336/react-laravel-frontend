import React, { useState } from "react";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import { Link } from "react-router-dom";


export default function MySideBar() {
  const [visible, setVisible] = useState(false);

  return (
    <div className="card flex justify-content-end p-3">
      <Sidebar visible={visible} onHide={() => setVisible(false)}>
        <aside class="layout-sidebar">
          <a class="logo" aria-label="PrimeReact logo" href="/">
            <img
              alt="logo"
              src="https://sqmresearch.com.au/images.new2/logo.png"
            />
          </a>
          <nav>
            <ol class="layout-menu">
              <li>
                <a class="">
                  <div class="menu-icon">
                    <i class="pi pi-home"></i>
                  </div>
                  <Link className="text-decoration-none" to='/'>Home</Link>
                </a>
              </li>
              <li>
                <a class="" to="/login">
                  <div class="menu-icon">
                    <i class="pi pi-user"></i>
                  </div>
                  <Link className="text-decoration-none" to='/login'>Login</Link>
                </a>
              </li>
              <li>
                <a class="" to="/accounts">
                  <div class="menu-icon">
                    <i class="pi pi-list"></i>
                  </div>
                  <Link className="text-decoration-none" to='/accounts'>Account</Link>
                </a>
              </li>
            </ol>
          </nav>
        </aside>
      </Sidebar>
      <Button icon="pi pi-spin pi-cog" onClick={() => setVisible(true)} />
    </div>
  );
}
