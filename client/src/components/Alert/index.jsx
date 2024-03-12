import Alert from 'react-bootstrap/Alert';

function AlertDismissibleExample(props) {
    const variant = props.success ? "success" : "danger";
    const titleMessage = props.success? "Success!" : "Oh snap! You got an error!";
  if (props.show) {
    return (
      <Alert variant={variant} onClose={props.hideAlert} dismissible>
        <Alert.Heading>{titleMessage}</Alert.Heading>
        <p>
          {props.message}.
        </p>
      </Alert>
    );
  }
}

export default AlertDismissibleExample;