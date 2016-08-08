import React, { Component, PropTypes } from 'react';
import TextField from 'material-ui/TextField';

import EventListener from 'react-event-listener';
import keycode from 'keycode';
import Dialog from 'material-ui/Dialog';
import Popover from 'material-ui/Popover/Popover';
import PopoverAnimationVertical from 'material-ui/Popover/PopoverAnimationVertical';

import FlatButton from 'material-ui/FlatButton';

var TextFieldWithDialog = DialogContent => class extends DialogContent {
  static defaultProps = {
    autoOk: false,
    container: 'dialog',
    disabled: false,
    style: {},
    defaultData: {},
  };

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      data: {},
      dialogData: {},
    };
    this.handleAccept = this.handleAccept.bind(this);
    this.handleTouchTap = this.handleTouchTap.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
  }

  getInitialData() {
    return this.isControlled() ? this.getControlledData() : this.props.defaultData;
  }

  componentWillMount() {
    this.setState({
      data: this.getInitialData(),
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.isControlled()) {
      const newData = this.getControlledData(nextProps);
      if (!isEqualData(this.state.data, newData)) {
        this.setState({
          data: newData,
        });
      }
    }
  }

  /**
   * Open the text field dialog programmatically from a parent.
   */
  openDialog() {
    this.setState({
      dialogData: this.state.data,
    }, this.refs.dialogWindow.show);
  }

  /**
   * Alias for `openDialog()` for an api consistent with TextField.
   */
  focus() {
    this.openDialog();
  }

  handleAccept(/*data*/) {
    if (!this.isControlled()) {
      this.setState({
        data: this.state.dialogData,
      });
    }
    if (this.props.onChange) {
      this.props.onChange(null, this.state.dialogData);
    }
  };
  
  handleFocus(event) {
    event.target.blur();
    if (this.props.onFocus) {
      this.props.onFocus(event);
    }
  }

  handleTouchTap(event) {
    if (this.props.onTouchTap) {
      this.props.onTouchTap(event);
    }

    if (!this.props.disabled) {
      setTimeout(() => {
        this.openDialog();
      }, 0);
    }
  }

  isControlled() {
    return this.props.hasOwnProperty('value');
  }

  getControlledData(props = this.props) {
      return props.value;
    //}
  }
  
  render() {
    const {
      autoOk,
      cancelLabel,
      className,
      hintText,
      container,
      defaultData, // eslint-disable-line no-unused-vars
      dialogContainerStyle,
      mode,
      okLabel,
      onFocus, // eslint-disable-line no-unused-vars
      onTouchTap, // eslint-disable-line no-unused-vars
      //shouldDisableDate,
      style,
      textFieldStyle,
      wordings,
      //...other
    } = this.props;

    const {prepareStyles} = this.context.muiTheme;

    return (
      <div className={className} style={prepareStyles(Object.assign({}, style))}>
        <TextField
          /*{...other}*/
          hintText={hintText}
          onFocus={this.handleFocus}
          onTouchTap={this.handleTouchTap}
          ref="input"
          style={textFieldStyle}
          value={this.state.data ? this.formatData(this.state.data)  : ''}
        />
        <TextFieldDialog
          autoOk={autoOk}
          cancelLabel={cancelLabel}
          container={container}
          containerStyle={dialogContainerStyle}
          /*disableYearSelection={disableYearSelection}
          firstDayOfWeek={firstDayOfWeek}*/
          //initialData={this.state.dialogData}
          //locale={locale}
          mode={mode}
          okLabel={okLabel}
          onAccept={this.handleAccept}
          onShow={this.onShow}
          onDismiss={this.onDismiss}
          ref="dialogWindow"
          //shouldDisableDate={shouldDisableDate}
          wordings={wordings}
        >
          {super.render()}
        </TextFieldDialog>
      </div>
    );
  }
};

class TextFieldDialog extends Component {
  static defaultProps = {
    cancelLabel: 'Cancel',
    container: 'dialog',
    okLabel: 'OK',
  };

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {open: false};
    this.show = this.show.bind(this);
    this.dismiss = this.dismiss.bind(this);
    this.handleTouchTapCancel = this.handleTouchTapCancel.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.handleTouchTapOk = this.handleTouchTapOk.bind(this);
    this.handleWindowKeyUp = this.handleWindowKeyUp.bind(this);
  }

  show() {
    if (this.state.open)
      return;
    this.setState({
        open: true,
      },
      () => {
        if (this.props.onShow) {
          this.props.onShow();
        }
      }
    );
  }

  dismiss() {
    if (!this.state.open)
      return;
    this.setState({
        open: false,
      },
      () => {
        if (this.props.onDismiss) {
          this.props.onDismiss();
        }          
      }
    );
  }

  handleTouchTapCancel() {
    this.dismiss();
  }

  handleRequestClose() {
    this.dismiss();
  }

  handleTouchTapOk() {
    if (this.props.onAccept/* && !this.refs.calendar.isSelectedDateDisabled()*/) {
      this.props.onAccept(/*this.refs.calendar.getSelectedDate()*/);
    }

    this.setState({
      open: false,
    });
  }

  handleWindowKeyUp(event) {
    switch (keycode(event)) {
      case 'enter':
        this.handleTouchTapOk();
        break;
    }
  }

  render() {
    const {
      autoOk,
      cancelLabel,
      container,
      containerStyle,
      //disableYearSelection,
      //initialData,
      //locale,
      mode,
      okLabel,
      onAccept, // eslint-disable-line no-unused-vars
      onDismiss, // eslint-disable-line no-unused-vars
      onShow, // eslint-disable-line no-unused-vars
      //shouldDisableDate,
      style, // eslint-disable-line no-unused-vars
      wordings,
      animation,
      //...other,
    } = this.props;

    const {open} = this.state;

    const styles = {
      dialogContent: {
        width: mode === 'landscape' ? 479 : 310,
      },
      dialogBodyContent: {
        padding: 0,
        //minHeight: mode === 'landscape' ? 330 : 434,
        minWidth: mode === 'landscape' ? 479 : 310,
      },
    };

    const Container = (container === 'inline' ? Popover : Dialog);

    return (
      <div /*{...other}*/ ref="root">
        <Container
          anchorEl={this.refs.root} // For Popover
          animation={animation || PopoverAnimationVertical} // For Popover
          bodyStyle={styles.dialogBodyContent}
          contentStyle={styles.dialogContent}
          ref="dialog"
          repositionOnUpdate={true}
          open={open}
          onRequestClose={this.handleRequestClose}
          style={Object.assign(styles.dialogBodyContent, containerStyle)}
        >
          <EventListener
            target="window"
            onKeyUp={this.handleWindowKeyUp}
          />
          {this.props.children}
          {okLabel &&
            <DialogActionButtons
              autoOk={this.props.autoOk}
              cancelLabel={cancelLabel}
              okLabel={okLabel}
              onTouchTapCancel={this.handleTouchTapCancel}
              onTouchTapOk={this.handleTouchTapOk}
              wordings={wordings}
            />
          }
          {/*
          <Calendar
            autoOk={autoOk}
            cancelLabel={cancelLabel}
            disableYearSelection={disableYearSelection}
            firstDayOfWeek={firstDayOfWeek}
            initialData={initialData}
            onTouchTapDay={this.handleTouchTapDay}
            maxDate={maxDate}
            minDate={minDate}
            mode={mode}
            open={open}
            ref="calendar"
            onTouchTapCancel={this.handleTouchTapCancel}
            onTouchTapOk={this.handleTouchTapOk}
            okLabel={okLabel}
            shouldDisableDate={shouldDisableDate}
            wordings={wordings}
          />
          */}
        </Container>
      </div>
    );
  }
}

class DialogActionButtons extends Component {
  render() {
    const {cancelLabel, okLabel, wordings} = this.props;

    const styles = {
      root: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        margin: 0,
        maxHeight: 48,
        padding: 0,
      },
      flatButtons: {
        fontsize: 14,
        margin: '4px 8px 8px 0px',
        maxHeight: 36,
        minWidth: 64,
        padding: 0,
      },
    };

    return (
      <div style={styles.root} >
        <FlatButton
          label={wordings ? wordings.cancel : cancelLabel}
          onTouchTap={this.props.onTouchTapCancel}
          primary={true}
          style={styles.flatButtons}
        />
        {!this.props.autoOk &&
          <FlatButton
            disabled={this.refs.calendar !== undefined && this.refs.calendar.isSelectedDateDisabled()}
            label={wordings ? wordings.ok : okLabel}
            onTouchTap={this.props.onTouchTapOk}
            primary={true}
            style={styles.flatButtons}
          />
        }
      </div>
    );
  }
}

export default TextFieldWithDialog;