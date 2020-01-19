import React from 'react';
//this hoc has purpose of adding a div with a certain class around any element
const withClass = (WrappedComponent, className) => {
    return props => (
        <div className={className}>
            <WrappedComponent {...props} />
            {/* //all the props of the component which is wrapped will end up with the component above
                //that's why we use curly bracket and spread operator to pull out all the props objects */}
            
        </div>
    )
}

export default withClass