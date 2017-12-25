import React from 'react'
import { compose, lifecycle, branch, renderNothing, withState, renderComponent } from 'recompose'
import Loading from 'components/loading';
import Error from 'components/error';

// returns HOC
const componentWithApi = (BaseComponent, options) => {
  const {
    requests,
    callbacks
  } = options;

  const handleOnClickButton = () => {
    global.location.reload();
  };

  return compose( 
    withState('loadedRequest', 'setLoadedRequest', !requests),
    withState('failedRequest', 'setFailedRequest', null),
    lifecycle({
      componentDidMount() {
        if (callbacks) {
          callbacks.map(r => r(this.props.dispatch));
        }
        if (requests) {
          Promise.all(requests.map(r => r(this.props.dispatch)))
            .then(() => {
              this.props.setLoadedRequest(true);
            }).catch((reason) => {
              this.props.setFailedRequest(reason.message);
            })
        }
      }
    }), 
    branch(
      ({loadedRequest}) => loadedRequest,
      renderComponent(BaseComponent), 
      renderComponent((prop) => {
        if (prop.failedRequest) {
          return (
            <Error
                buttonText="Refresh page"
                handleOnClickButton={handleOnClickButton}
                header="500"
                row1="Error status"
                row2={prop.failedRequest}
            />
          );
        } else {
          return <Loading />;
        }
      })
    )
  )(renderNothing());
};

export default componentWithApi;
