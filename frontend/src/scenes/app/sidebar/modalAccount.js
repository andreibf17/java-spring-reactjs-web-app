import React from "react";
import {
  Button,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader
} from "reactstrap";
import { createAccount } from "../../../services/RequestAPI";

class ModalAccount extends React.Component {
  constructor() {
    super();

    this.state = {
      fields: {
        name: "",
        sum: ""
      },
      errors: {
        name: ""
      }
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;

    const account = {
      name: fields["name"],
      sum: fields["sum"]
    };
    createAccount(account)
      .then(res => {
        if (res.success === false) {
          errors["name"] = "This account already exists";
          this.setState({ errors: errors });
          formIsValid = false;
        }
      })
      .finally(() => {
        if (formIsValid) {
          this.props.toggleModalAccount();
          this.props.triggerRerender();
        }
      });
    event.preventDefault();
  }

  handleChange(field, e) {
    let fields = this.state.fields;
    fields[field] = e.target.value;
    this.setState({ fields: fields });
  }

  render() {
    return (
      <Modal isOpen={this.props.modal} toggle={this.props.toggleModalAccount}>
        <ModalHeader toggle={this.props.toggleModalAccount}>
          Add a new account
        </ModalHeader>
        <ModalBody>
          <Form onSubmit={this.handleSubmit}>
            <FormGroup row>
              <Label sm={2}>Name</Label>
              <Col sm={8}>
                <Input
                  className={"form-control"}
                  required
                  value={this.state.fields["name"]}
                  onChange={this.handleChange.bind(this, "name")}
                  type={"text"}
                  name={"name"}
                  id={"name"}
                />
                <span style={{ color: "red" }}>
                  {this.state.errors["name"]}
                </span>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label sm={2}>Sum</Label>
              <Col sm={8}>
                <Input
                  className={"form-control"}
                  required
                  value={this.state.fields["sum"]}
                  onChange={this.handleChange.bind(this, "sum")}
                  type={"number"}
                  step={"any"}
                  name={"sum"}
                  id={"sum"}
                />
              </Col>
            </FormGroup>
            <ModalFooter>
              <Input
                className={"btn btn-primary"}
                type={"submit"}
                value={"Submit"}
              />
              <Button
                color={"secondary"}
                onClick={this.props.toggleModalAccount}
              >
                Cancel
              </Button>
            </ModalFooter>
          </Form>
        </ModalBody>
      </Modal>
    );
  }
}

export default ModalAccount;
