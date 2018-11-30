import React from 'react'
import { connect } from 'react-redux'

export function connectWithStore<TStore>(store: TStore, WrappedComponent: any, mapStateToProps: any, mapDispatchToProps: any = null) {
  let ConnectedWrappedComponent = connect(mapStateToProps, mapDispatchToProps)(WrappedComponent)
  return function (props: any) {
    return <ConnectedWrappedComponent {...props} store={store} />
  }
}