import React, { Component, PropTypes } from 'react';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextFieldWithDialog from '../TextFieldWithDialog/TextFieldWithDialog';

class ProperNameField extends Component {
  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.onShow = this.onShow.bind(this);
    this.handlePrefixChange = this.handlePrefixChange.bind(this);
    this.handleFirstChange = this.handleFirstChange.bind(this);
    this.handleMiddleChange = this.handleMiddleChange.bind(this);
    this.handleLastChange = this.handleLastChange.bind(this);
    this.handleSuffixChange = this.handleSuffixChange.bind(this);
  }

  formatData(data) {
    return [data.prefix, data.first, data.middle, data.last, data.suffix]
      .filter(x => (typeof x === 'string' || x instanceof String) && x.trim().length > 0)
      .join(' '); 
  }

  onShow() {
    //this._inputPrefix.focus();
  }

  handleFieldChange(value, fieldName) {
    const dialogData = {...this.state.dialogData};
    dialogData[fieldName] = value;  
    this.setState({
      dialogData
    });
  }

  handlePrefixChange(event, index, value) {
    this.handleFieldChange(value, "prefix");
  }

  handleFirstChange(event) {
    this.handleFieldChange(event.target.value, "first");
  }

  handleMiddleChange(event) {
    this.handleFieldChange(event.target.value, "middle");
  }

  handleLastChange(event) {
    this.handleFieldChange(event.target.value, "last");
  }

  handleSuffixChange(event, index, value) {
    this.handleFieldChange(value, "suffix");
  }

  render() {
    const {
      hintText,
      container,
    } = this.props;

    const styles = {
      root: {
        //color: calendarTextColor,
        userSelect: 'none',
        width: 310,
      },
      input: {
        "marginLeft": '8px',
      },
    };

    const {prepareStyles} = this.context.muiTheme;

    return (
        <div style={prepareStyles(styles.root)}>
          <SelectField hintText="Prefix" style={styles.input} value={this.state.dialogData.prefix} onChange={this.handlePrefixChange}>
            <MenuItem value={'Mr'} primaryText="Mr" />
            <MenuItem value={'Ms'} primaryText="Ms" />
            <MenuItem value={'Mrs'} primaryText="Mrs" />
            <MenuItem value={'Mdm'} primaryText="Mdm" />
          </SelectField>        
          <TextField hintText="First Name" style={styles.input} value={this.state.dialogData.first} onChange={this.handleFirstChange} />
          <TextField hintText="Middle Name" style={styles.input} value={this.state.dialogData.middle} onChange={this.handleMiddleChange}/>
          <TextField hintText="Last Name" style={styles.input} value={this.state.dialogData.last} onChange={this.handleLastChange}/>
          <SelectField hintText="Suffix" style={styles.input} value={this.state.dialogData.suffix} onChange={this.handleSuffixChange}>
            <MenuItem value={'Jr'} primaryText="Jr" />
            <MenuItem value={'Sr'} primaryText="Sr" />
          </SelectField>        
        </div>
    );
  }
}

export default TextFieldWithDialog(ProperNameField); // Enhanced component