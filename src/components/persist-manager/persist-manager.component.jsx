import React, { useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { persistor } from "../../redux/store";
import { selectIsAuthentificationChecked } from "../../redux/user/user.selectors";

function PersistManager({ isAuthentificationChecked, children }) {
  useEffect(() => {
    if (isAuthentificationChecked) {
      persistor.persist();
    }
  }, [isAuthentificationChecked]);

  return <>{children}</>;
}

const mapStateToProps = createStructuredSelector({
  isAuthentificationChecked: selectIsAuthentificationChecked,
});

export default connect(mapStateToProps)(PersistManager);
