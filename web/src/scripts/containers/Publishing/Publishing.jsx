/**
 *    Copyright (C) 2015 Deco Software Inc.
 *
 *    This program is free software: you can redistribute it and/or modify
 *    it under the terms of the GNU Affero General Public License, version 3,
 *    as published by the Free Software Foundation.
 *
 *    This program is distributed in the hope that it will be useful,
 *    but WITHOUT ANY WARRANTY; without even the implied warranty of
 *    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *    GNU Affero General Public License for more details.
 *
 *    You should have received a copy of the GNU Affero General Public License
 *    along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 */

import React, { Component, } from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { createSelector } from 'reselect'

import PublishingSignIn from './PublishingSignIn'
import PublishingBrowser from './PublishingBrowser'
import PublishingMetadata from './PublishingMetadata'
import { PaneHeader } from '../../components'
import DecoClient from '../../api/DecoClient'

import { componentActions, authActions } from '../../actions'

const styles = {
  container: {
    display: 'flex',
    flex: '1 0 auto',
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  inner: {
    overflowY: 'auto',
    padding: 10,
  }
}

const mapStateToProps = (state) => createSelector(
  (state) => state.components.list,
  (state) => state.auth.token,
  (components, token) => ({
    components,
    signedIn: !!token,
    user: {
      username: 'dabbott',
      firstname: 'Devin',
      lastname: 'Abbott',
      thumbnail: 'https://avatars0.githubusercontent.com/u/1198882?v=3&s=460',
    },
  })
)

const mapDispatchToProps = (dispatch) => ({
  componentActions: bindActionCreators(componentActions, dispatch),
  authActions: bindActionCreators(authActions, dispatch),
})

class Publishing extends Component {

  state = {
    currentComponentId: null,
  }

  constructor(props) {
    super()

    props.componentActions.fetchComponents()
  }

  updateComponent = (component) => {
    this.props.componentActions.updateComponent(component)
  }

  deleteComponent = (component) => {
    this.props.componentActions.deleteComponent(component)
      .then(() => this.setState({currentComponentId: null}))
  }

  selectComponent = (currentComponentId) => {
    this.setState({currentComponentId})
  }

  createComponent = () => {
    this.props.componentActions.createComponent()
      .then(component => {
        const {id} = component

        this.setState({currentComponentId: id})
      })
  }

  signIn = () => {
    this.props.authActions.authenticate()
  }

  render() {
    const {currentComponentId} = this.state
    const {dispatch, components, signedIn, user, width} = this.props

    const currentComponent = currentComponentId ?
      _.find(components, ['id', currentComponentId]) : null

    return (
      <div style={styles.container}>
        <PaneHeader
          text={'Publishing'}
          leftTitle={currentComponent ? 'Back' : null}
          onClickLeftTitle={(() => {
            this.setState({currentComponentId: null})
          })}
          rightTitle={signedIn ? 'Sign out' : null}
          onClickRightTitle={() => {
            console.log('Sign out?')
          }}
        />
        {signedIn ? (
          currentComponent ? (
            <PublishingMetadata
              user={user}
              component={currentComponent}
              width={width}
              onUpdateComponent={this.updateComponent}
              onDeleteComponent={this.deleteComponent}
            />
          ) : (
            <PublishingBrowser
              user={user}
              components={components}
              onSelectComponent={this.selectComponent}
              onCreateComponent={this.createComponent}
            />
          )
        ) : (
          <PublishingSignIn
            onClickSignIn={this.signIn}
          />
        )}
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Publishing)
