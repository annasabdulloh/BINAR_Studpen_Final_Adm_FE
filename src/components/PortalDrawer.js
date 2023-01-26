import React from 'react';
import { useMemo, useCallback } from "react";
import PropTypes from 'prop-types'
import { createPortal } from "react-dom";
import "./PortalDrawer.css";

const PortalDrawer = ({
  children,
  overlayColor,
  placement = "Left",
  onOutsideClick,
  zIndex = 100,
}) => {
  const drawerStyle = useMemo(() => {
    const style = {};
    style.zIndex = zIndex;

    if (overlayColor) {
      style.backgroundColor = overlayColor;
    }

    switch (placement) {
      case "Left":
        style.alignItems = "flex-start";
        break;
      case "Right":
        style.alignItems = "flex-end";
        break;
      case "Top":
        style.alignItems = "center";
        break;
      case "Bottom":
        style.alignItems = "center";
        style.justifyContent = "flex-end";
        break;
    }

    return style;
  }, [placement, overlayColor, zIndex]);

  const onOverlayClick = useCallback(
    (e) => {
      if (onOutsideClick && e.target.classList.contains("portalPopupOverlay")) {
        onOutsideClick();
      }
      e.stopPropagation();
    },
    [onOutsideClick]
  );

  return (
    <DrawerContainer>
      <div
        className={"portalPopupOverlay"}
        style={drawerStyle}
        onClick={onOverlayClick}
      >
        {children}
      </div>
    </DrawerContainer>
  );
}

PortalDrawer.propTypes = {
  children: PropTypes.node.isRequired,
  overlayColor: PropTypes.node.isRequired,
  placement: PropTypes.node.isRequired,
  onOutsideClick: PropTypes.node.isRequired,
  zIndex: PropTypes.node.isRequired
}

export const DrawerContainer = ({ children, containerId = "portals" }) => {
  let portalsDiv = document.getElementById(containerId);
  if (!portalsDiv) {
    portalsDiv = document.createElement("div");
    portalsDiv.setAttribute("id", containerId);
    document.body.appendChild(portalsDiv);
  }

  return createPortal(children, portalsDiv);
}
export default PortalDrawer;
