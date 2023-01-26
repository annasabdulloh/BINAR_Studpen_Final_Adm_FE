import React from 'react';
import { useState, useCallback } from 'react';
import 'antd/dist/antd.min.css';

import SidebarAdminDaftarUser from './SidebarMainFrame';
import PortalDrawer from './PortalDrawer';
import { useNavigate } from 'react-router-dom';
import './MainFrame.css';
import PropTypes from 'prop-types';

function MainFrame({ children }) {
  const [isSidebarAdminDaftarUserOpen, setSidebarAdminDaftarUserOpen] = useState(false);
  const navigate = useNavigate();

  const openSidebarAdminDaftarUser = useCallback(() => {
    setSidebarAdminDaftarUserOpen(true);
  }, []);

  const closeSidebarAdminDaftarUser = useCallback(() => {
    setSidebarAdminDaftarUserOpen(false);
  }, []);

  const onNavItemContainer1Click = useCallback(() => {
    navigate('/');
  }, [navigate]);

  const onNavItemContainer2Click = useCallback(() => {
    navigate('/admin-tiketterjual');
  }, [navigate]);

  const onNavItemContainer3Click = useCallback(() => {
    navigate('/admin-tikettersedia1');
  }, [navigate]);

  const onNavItemContainer4Click = useCallback(() => {
    navigate('/admin-tambahtiket1');
  }, [navigate]);

  const onNavItemContainer5Click = useCallback(() => {
    navigate('/admin-datatransfer1');
  }, [navigate]);

  const onNavItemContainer6Click = useCallback(() => {
    try {
      let token = localStorage.getItem('x-access-token');
      if (token !== null) {
        localStorage.removeItem('x-access-token');
        navigate('/login');
      }
      console.log('log out berhasil');
    } catch (error) {
      console.log('gagal logout');
    }
  }, [navigate]);


  return (
    <>
      {/* <div className="admin-daftar-user1"> */}
      <div className="header-section5">
        <div className="header-elements-row5">
          <div className="frame-div372">
            <div className="hambuger-menu5" onClick={openSidebarAdminDaftarUser}>
              <div className="line-div15" />
              <div className="line-div15" />
              <div className="line-div15" />
            </div>
            <div className="frame-div373">
              <img className="logo-web-icon20" alt="" src="../logo-web@2x.png" />
            </div>
          </div>
          <div className="frame-div374">
            <div className="account-section5">
              <img className="profile-picture-icon5" alt="" src={`${process.env.REACT_APP_API_SERVER_URL}/user/avatar_default.png`} />
            </div>
            <div className="seperator5" />
            <button className="profile5">Admin</button>
          </div>
        </div>
      </div>
      <div className="section5">
        <div className="nav-list9">
          {/* <div className="nav-item72">
              <div className="leading-icon-nav-link72">
                <div className="leading-icon72">
                  <img className="home-icon9" alt="" src="../home9.svg" />
                </div>
                <div className="leading-icon72">
                  <div className="dashboard35">Dashboard</div>
                </div>
              </div>
            </div> */}
          <div className={'nav-item74 ' + (window.location.pathname == '/' ? 'active' : '')} onClick={onNavItemContainer1Click}>
            <div className="leading-icon-nav-link72">
              <div className="leading-icon72">
                <img className="home-icon9" alt="" src="../3-user8.svg" />
              </div>
              <div className="leading-icon72">
                <div className="dashboard35">User Register</div>
              </div>
            </div>
          </div>
          <div className={'nav-item74 ' + (window.location.pathname == '/admin-tiketterjual' ? 'active' : '')} onClick={onNavItemContainer2Click}>
            <div className="leading-icon-nav-link72">
              <div className="leading-icon72">
                <img className="home-icon9" alt="" src="../edit-square9.svg" />
              </div>
              <div className="leading-icon72">
                <div className="dashboard35">Tiket Terjual</div>
              </div>
            </div>
          </div>
          <div className={'nav-item74 ' + (window.location.pathname == '/admin-tikettersedia1' ? 'active' : '')} onClick={onNavItemContainer3Click}>
            <div className="leading-icon-nav-link72">
              <div className="leading-icon72">
                <img className="home-icon9" alt="" src="../image9.svg" />
              </div>
              <div className="leading-icon72">
                <div className="dashboard35">Tiket Tersedia</div>
              </div>
            </div>
          </div>
          <div className={'nav-item74 ' + (window.location.pathname == '/admin-tambahtiket1' ? 'active' : '')} onClick={onNavItemContainer4Click}>
            <div className="leading-icon-nav-link77">
              <div className="leading-icon72">
                <img className="home-icon9" alt="" src="../document9.svg" />
              </div>
              <div className="leading-icon72">
                <div className="dashboard35">Tambah Tiket</div>
              </div>
            </div>
          </div>
          <div className={'nav-item77 ' + (window.location.pathname == '/admin-datatransfer1' ? 'active' : '')} onClick={onNavItemContainer5Click}>
            <div className="leading-icon-nav-link77">
              <div className="leading-icon77">
                <img className="home-icon9" alt="" src="../chat4.svg" />
              </div>
              <div className="leading-icon72">
                <div className="dashboard35">Data Transfer</div>
              </div>
            </div>
          </div>
          {/* <div className="nav-item78">
              <div className="leading-icon-nav-link72">
                <div className="leading-icon72">
                  <img className="home-icon9" alt="" src="../setting8.svg" />
                </div>
                <div className="leading-icon72">
                  <div className="dashboard35">Settings</div>
                </div>
              </div>
            </div> */}
          <div className="logout-toogle9">
            <div className={'nav-item79 ' + (window.location.pathname == '/admin-datatransfer1' ? 'active' : '')} onClick={onNavItemContainer6Click}>
              <a className="leading-icon-nav-link72">
                <div className="leading-icon79">
                  <img className="logout-icon9" alt="" src="../logout9.svg" />
                </div>
                <div className="leading-icon79">
                  <a href='/logout' className="dashboard37" style={{ color: 'white' }}>
                    Logout
                  </a >
                </div>
              </a>
            </div>
          </div>
        </div>
        <div className="column-layout-frame5">{children}</div>
      </div>
      {/* </div> */}
      {isSidebarAdminDaftarUserOpen && (
        <PortalDrawer overlayColor="rgba(113, 113, 113, 0.3)" placement="Left" onOutsideClick={closeSidebarAdminDaftarUser}>
          <SidebarAdminDaftarUser onClose={closeSidebarAdminDaftarUser} />
        </PortalDrawer>
      )}
      
    </>
  );
}

MainFrame.propTypes = {
  children: PropTypes.node.isRequired,
  // active: PropTypes.node.isRequired
};

export default MainFrame;
