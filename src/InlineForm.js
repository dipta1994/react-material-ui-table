import React from "react";
import TextField from '@mui/material/TextField'
import CheckIcon from '@mui/icons-material/CheckBox';
import CancelIcon from '@mui/icons-material/Cancel';
import TableCell from '@mui/material/TableCell'

export default class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            values: {
                ...props.x
            },
            errors: {
                firstName: "",
                lastName: "",
                email: "",
                password: "",
                username: ""
            }
        };
    }

    change = e => {
        const { name, value } = e.target;
        this.setState(state => ({
            values: {
                ...state.values,
                [name]: value
            }
        }));
    };

    validate = () => {
        let isError = false;
        const errors = {
            firstName: "",
            lastName: "",
            username: "",
            email: "",
            password: ""
        };

        const { username, email } = this.state.values;

        if (username.length < 5) {
            isError = true;
            errors.username = "Username needs to be atleast 5 characters long";
        }

        if (email.indexOf("@") === -1) {
            isError = true;
            errors.email = "Requires valid email";
        }

        this.setState({
            errors
        });

        return isError;
    };

    onSubmit = e => {
        e.preventDefault();
        const err = this.validate();
        if (!err) {
            this.props.handleSave(this.props.i, this.state.values);
        }
    };

    render() {
        const { header, x, i } = this.props;
        return [
            header.map((y, k) => (
                <TableCell key={`trc-${k}`}>
                    <TextField
                        name={y.prop}
                        onChange={this.change}
                        value={this.state.values[y.prop]}
                        helperText={this.state.errors[y.prop]}
                    />
                </TableCell>
            )),
            <TableCell key="icon-row-column">
                <CheckIcon onClick={this.onSubmit} />
                <CancelIcon onClick={this.props.stopEditing} />
            </TableCell>
        ];
    }
}
