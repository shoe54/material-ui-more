import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
//import { TextFieldWithDialog } from './';
import { ProperNameField } from './';

// For Material-UI. See https://github.com/callemall/material-ui
injectTapEventPlugin();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: {
        prefix: 'Mr',
        first: 'Prefilled',
        middle: '',
        last: 'Name',
        suffix: 'Jr'
      },
      date: new Date(),
    };
  }

  render() {
    return (
      <MuiThemeProvider>
        <div>
          {/*
          <TextFieldWithDialog hintText="Text Field With Dialog">
            <TextField hintText="Prefix" />
            <TextField hintText="First Name" />
            <TextField hintText="Middle Name" />
            <TextField hintText="Last Name" />
            <TextField hintText="Suffix" />
          </TextFieldWithDialog>
          */}
          <ProperNameField 
            hintText="Dialog Mode" 
          />
          <ProperNameField 
            hintText="Inline Mode" 
            container="inline"
          />
          <ProperNameField 
            hintText="Uncontrolled" 
            container="inline"
            defaultData={''}
          />
          <ProperNameField 
            hintText="Controlled" 
            container="inline"
            value={''}
          />
          <ProperNameField 
            hintText="Prefilled Name" 
            container="inline"
            defaultData={this.state.name}
          />
        </div>
      </MuiThemeProvider>
    );
  }
}

ReactDOM.render(
  <App/>,
  document.querySelector("#container")
);  