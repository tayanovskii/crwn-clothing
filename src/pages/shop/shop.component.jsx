import React from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";

import CollectionOverviewContainer from "../../components/collections-overview/collections-overview.container";
import CollectionPage from "../collection/collection.component";
import { fetchCollectionsStartAsync } from "../../redux/shop/shop.actions";
import WithSpinner from "../../components/with-spinner/with-spinner.component";
import { createStructuredSelector } from "reselect";
import { selectIsCollectionsLoaded } from "../../redux/shop/shop.selectors";

const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component {
  componentDidMount() {
    // collectionRef.onSnapshot(async (snapshot) => {
    //   const collectionMap = convertCollectionsSnapshotToMap(snapshot);
    //   updateCollections(collectionMap);
    //   this.setState({ loading: false });
    // });

    const { fetchCollectionsStartAsync } = this.props;
    fetchCollectionsStartAsync();
  }

  render() {
    const { match, isCollecionsLoaded } = this.props;
    return (
      <div className="shop-page">
        <Route
          exact
          path={`${match.path}`}
          component={CollectionOverviewContainer}
        />
        <Route
          path={`${match.path}/:collectionId`}
          render={(props) => (
            <CollectionPageWithSpinner
              isLoading={!isCollecionsLoaded}
              {...props}
            />
          )}
        ></Route>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  //isCollectonFetching: selectIsCollectonFetching,
  isCollecionsLoaded: selectIsCollectionsLoaded,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);
