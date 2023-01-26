import React from 'react'
import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./SidebarMainFrame.css";
import PropTypes from 'prop-types'

const SidebarAdminDaftarUser = ({ onClose }) => {
  console.log(onClose)
  const navigate = useNavigate();

  const onNavItemContainer1Click = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const onNavItemContainer2Click = useCallback(() => {
    navigate("/admin-tiketterjual");
  }, [navigate]);

  const onNavItemContainer3Click = useCallback(() => {
    navigate("/admin-tikettersedia1");
  }, [navigate]);

  const onNavItemContainer4Click = useCallback(() => {
    navigate("/admin-tambahtiket1");
  }, [navigate]);

  const onNavItemContainer5Click = useCallback(() => {
    navigate("/admin-datatransfer1");
  }, [navigate]);

  useEffect(() => {
    const scrollAnimElements = document.querySelectorAll(
      "[data-animate-on-scroll]"
    );
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting || entry.intersectionRatio > 0) {
            const targetElement = entry.target;
            targetElement.classList.add("animate");
            observer.unobserve(targetElement);
          }
        }
      },
      {
        threshold: 0.15,
      }
    );

    for (let i = 0; i < scrollAnimElements.length; i++) {
      observer.observe(scrollAnimElements[i]);
    }

    return () => {
      for (let i = 0; i < scrollAnimElements.length; i++) {
        observer.unobserve(scrollAnimElements[i]);
      }
    };
  }, []);

  return (
    <div className="sidebar-admin-daftar-user" data-animate-on-scroll>
      <div className="side-nav4">
        <div className="brand-nav-list4">
          <div className="nav-brand4">
            <div className="logo-web4">
              <img
                className="logo-web-icon21"
                alt=""
                src="../logo-web21@2x.png"
              />
            </div>
          </div>
          <div className="nav-list10">
            {/* <div className="nav-item80">
              <div className="leading-icon-nav-link80">
                <div className="leading-icon80">
                  <img className="home-icon10" alt="" src="../home10.svg" />
                </div>
                <div className="nav-link72">
                  <div className="dashboard38">Dashboard</div>
                </div>
              </div>
            </div> */}
            <div className={"nav-item80 " + (window.location.pathname == '/' ? 'active-side' : '')} onClick={onNavItemContainer1Click}>
              <div className="leading-icon-nav-link80">
                <div className="leading-icon80">
                  <img className="home-icon10" alt="" src="../3-user8.svg" />
                </div>
                <div className="nav-link72">
                  <div className="dashboard38">Users</div>
                </div>
              </div>
            </div>
            <div className={"nav-item82 " + (window.location.pathname == '/admin-tiketterjual' ? 'active-side' : '')} onClick={onNavItemContainer2Click}>
              <div className="leading-icon-nav-link80">
                <div className="leading-icon80">
                  <img
                    className="home-icon10"
                    alt=""
                    src="../edit-square10.svg"
                  />
                </div>
                <div className="nav-link72">
                  <div className="dashboard40">Posts</div>
                </div>
              </div>
            </div>
            <div className={"nav-item83 " + (window.location.pathname == '/admin-tikettersedia1' ? 'active-side' : '')} onClick={onNavItemContainer3Click}>
              <div className="leading-icon-nav-link80">
                <div className="leading-icon80">
                  <img className="home-icon10" alt="" src="../image1.svg" />
                </div>
                <div className="nav-link72">
                  <div className="dashboard38">Media</div>
                </div>
              </div>
            </div>
            <div className={"nav-item83 " + (window.location.pathname == '/admin-tambahtiket1' ? 'active-side' : '')} onClick={onNavItemContainer4Click}>
              <div className="nav-brand4">
                <div className="leading-icon80">
                  <img className="home-icon10" alt="" src="../document10.svg" />
                </div>
              </div>
            </div>
            <div className={"nav-item83 " + (window.location.pathname == '/admin-datatransfer1' ? 'active-side' : '')} onClick={onNavItemContainer5Click}>
              <div className="leading-icon-nav-link80">
                <div className="leading-icon80">
                  <img
                    className="home-icon10"
                    alt=""
                    src="../chat--notification4.svg"
                  />
                </div>
                <div className="nav-link72">
                  <div className="dashboard38">Comments</div>
                </div>
              </div>
            </div>
            {/* <div className="nav-item80">
              <div className="nav-brand4">
                <div className="leading-icon80">
                  <img className="home-icon10" alt="" src="../setting10.svg" />
                </div>
              </div>
            </div> */}
          </div>
        </div>
        <a href='/logout' className="logout-toogle10">
          <div className="nav-item87">
            <div className="leading-icon-nav-link80">
              <div className="leading-icon80">
                <img className="home-icon10" alt="" src="../logout10.svg" />
              </div>
              <div className="nav-link72">
                <div className="dashboard40">Logout</div>
              </div>
            </div>
            <div className="trailing-icon-badge4">
              <div className="badge4">
                <div className="number-notification-badge4">
                  <div className="div32">1</div>
                </div>
              </div>
              <div className="badge4">
                <img
                  className="arrow-right-24"
                  alt=""
                  src="../arrow--right-24.svg"
                />
              </div>
            </div>
          </div>
        </a>
      </div>
    </div>
  );
}

SidebarAdminDaftarUser.propTypes = {
  onClose: PropTypes.node.isRequired
}

export default SidebarAdminDaftarUser;
