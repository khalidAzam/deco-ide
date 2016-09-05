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

import { componentActions, userActions, publishingActions } from '../../actions'

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
  ({components}) => ({
    components: components.list
  }),
  ({user}) => ({
    signedIn: !!user.token,
    user: {
      name: user.name,
      thumbnail: user.thumbnail,
      username: user.githubId,
    },
  }),
  ({ui: {publishing}}) => ({
    currentComponentId: publishing.currentComponentId
  }),
  (components, user, publishing) => ({
    ...components,
    ...user,
    currentComponent: publishing.currentComponentId ?
      _.find(components.components, ['id', publishing.currentComponentId]) : null
  })
)

const mapDispatchToProps = (dispatch) => ({
  publishingActions: bindActionCreators(publishingActions, dispatch),
  componentActions: bindActionCreators(componentActions, dispatch),
  userActions: bindActionCreators(userActions, dispatch),
})

class Publishing extends Component {

  constructor(props) {
    super()

    props.componentActions.fetchComponents()
  }

  createComponent = async () => {
    const {id} = await this.props.componentActions.createComponent()
    this.props.publishingActions.setCurrentComponent(id)
  }

  updateComponent = (component) => {
    this.props.componentActions.updateComponent(component)
  }

  deleteComponent = (component) => {
    this.props.publishingActions.setCurrentComponent(null)
    this.props.componentActions.deleteComponent(component)
  }

  selectComponent = (currentComponentId) => {
    this.props.publishingActions.setCurrentComponent(currentComponentId)
  }

  deselectCurrentComponent = () => {
    this.props.publishingActions.setCurrentComponent(null)
  }

  signIn = () => {
    this.props.userActions.signIn()
  }

  signOut = () => {
    this.props.userActions.signOut()
  }

  render() {
    const {currentComponent, components, signedIn, user, width} = this.props

    return (
      <div style={styles.container}>
        <PaneHeader
          text={'Publishing'}
          leftTitle={currentComponent ? 'Back' : null}
          onClickLeftTitle={this.deselectCurrentComponent}
          rightTitle={signedIn ? 'Sign out' : null}
          onClickRightTitle={this.signOut}
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
