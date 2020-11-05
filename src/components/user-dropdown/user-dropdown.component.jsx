import React from "react";
import HeaderIconDropdown from "../header-icon-dropdown/header-icon-dropdown.component";
import { connect } from "react-redux";
import { hideUserDropdown, signOutStart } from "../../redux/user/user.actions";
import { selectIsUserDropdownVisible } from "../../redux/user/user.selectors";
import { createStructuredSelector } from "reselect";

function UserDropdown({
  toggleNode,
  hideUserDropdown,
  isUserDropdownVisible,
  signOutStart,
}) {
  const handleSignOut = () => {
    signOutStart();
  };

  return (
    <HeaderIconDropdown
      isDropdownVisible={isUserDropdownVisible}
      toggleNode={toggleNode}
      hideDropdown={hideUserDropdown}
    >
      <button onClick={handleSignOut}>Выйти</button>
    </HeaderIconDropdown>
  );
}

const mapStateToProps = createStructuredSelector({
  isUserDropdownVisible: selectIsUserDropdownVisible,
});

const mapDispatchToProps = (dispatch) => ({
  hideUserDropdown: () => dispatch(hideUserDropdown()),
  signOutStart: () => dispatch(signOutStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserDropdown);
