import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { translate } from 'react-i18next';
import { IconButton, Button } from 'react-toolbox';
import Table from '../../../../components/Table';
import { appListRequest } from '../redux/actions';

export class ApplicationList extends Component {
  displayName: 'ApplicationList'

  componentWillMount() {
    this.props.listApps();
  }

  props: {
    applications: Array<any>,
    loading: bool,
    listApps: Function,
    newApp: Function,
    editApp: Function
  }

  render() {
    const { applications, loading } = this.props;
    const model = {
      appName: { title: 'Application Name' },
      packageName: { title: 'Package' },
      actions: { title: 'Actions' }
    };

    const extendedApps = applications.map((app) => ({
      ...app,
      actions: (
        <span>
          <IconButton icon="edit" onClick={ () => this.props.editApp(app._id) } />
        </span>
      )
    }));

    return (
      <div>
        <h2>Applications</h2>
        <Button label="Create Application" primary raised onClick={ this.props.newApp } />
        <Table model={ model } source={ extendedApps } loading={ loading } selectable={ false } />
      </div>
    );
  }
}

const mapStatesToProps = ({ application: { applications, loading } }) => ({
  applications,
  loading
});

const mapDispatchToProps = (dispatch) => ({
  listApps: () => dispatch(appListRequest()),
  newApp: () => dispatch(push('/app/applications/new')),
  editApp: (id) => dispatch(push(`/app/applications/${ id }`))
});

export default translate()(
  connect(mapStatesToProps, mapDispatchToProps)(ApplicationList)
);
