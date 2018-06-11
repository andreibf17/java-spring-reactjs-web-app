import React from 'react'
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
    FormGroup,
    Label,
    Input,
    Col,
    FormFeedback
} from 'reactstrap';
import axios from 'axios'

class ModalAccount extends React.Component {

    constructor() {
        super();

        this.state = {
            fields: {},
            errors: {}
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleValidation() {
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;

        if(!fields["name"]){
            formIsValid = false;
            errors["name"] = "Cannot be empty";
        }

        if(!fields["sum"]){
            formIsValid = false;
            errors["sum"] = "Cannot be empty";
        }

        if (formIsValid) {
            const account = {
                name: fields["name"],
                sum: fields["sum"]
            }
            console.log(account);
            axios.post('http://localhost:8080/createAccount', account)
                .then(res => {
                    let response = res.data;
                    if (response === 'NOK') {
                        console.log(response);
                        formIsValid = false;
                        errors["name"] = "This account already exists";
                    }
                })
        }

        this.setState({errors: errors});
        return formIsValid;
    }

    handleSubmit(event) {
        let fields = this.state.fields;
        let errors = {};

        const account = {
            name: fields["name"],
            sum: fields["sum"]
        }
        axios.post('http://localhost:8080/createAccount', account)
            .then(res => {
                let response = res.data;
                if (response === 'NOK') {
                    errors["name"] = "This account already exists";
                    this.setState({errors: errors});
                }
            })

        this.setState({errors: errors});
        event.preventDefault();
    }

    handleChange(field, e) {
        let fields = this.state.fields;
        fields[field] = e.target.value;
        this.setState({fields: fields});
    }

    render() {
        return(
            <Modal isOpen={this.props.modal} toggle={this.props.toggleModalAccount}>
                <ModalHeader toggle={this.props.toggleModalAccount}>Add a new account</ModalHeader>
                <ModalBody>
                    <Form onSubmit={this.handleSubmit}>
                        <FormGroup row>
                            <Label sm={2}>Name</Label>
                            <Col sm={8}>
                                <Input className={"form-control"} required value = {this.state.fields["name"]}
                                       onChange={this.handleChange.bind(this, "name")} type={"text"} name={"name"} id={"name"}/>
                                <span style={{color: "red"}}>{this.state.errors["name"]}</span>

                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label sm={2}>Sum</Label>
                            <Col sm={8}>
                                <Input className={"form-control"} required value = {this.state.fields["sum"]}
                                       onChange={this.handleChange.bind(this, "sum")} type={"number"} step={"any"} name={"sum"} id={"sum"}/>
                                <span style={{color: "red"}}>{this.state.errors["sum"]}</span>
                            </Col>
                        </FormGroup>
                        <ModalFooter>
                            <Input className={"btn btn-primary"} type={"submit"} value={"Submit"}/>
                            <Button color={"secondary"} onClick={this.props.toggleModalAccount}>Cancel</Button>
                        </ModalFooter>
                    </Form>
                </ModalBody>
            </Modal>
        );
    }


}

function createAccount() {
    const account = {
        name: document.getElementById("name"),
        sum: document.getElementById("sum")
    }

    axios.post('http://localhost:8080/createAccount', account)
        .then(res => {

        })
}

export default ModalAccount;