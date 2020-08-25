import React, { Component } from 'react'
import InputComponent from '../component/input-component'
import SelectComponent from '../component/select-component'
import 'bootstrap/dist/css/bootstrap.min.css'

class FormContainer extends Component {
    constructor () {
        super()
        this.state = {
            title: '',
            form: [],
            fields: [],
            currentForm: 0,
            valuesForm: {},
            nbForms: 0,
            isFinish: false
        }
    }

    componentDidMount () {
        fetch('http://localhost:8080/forms', {
            method: 'GET'
        })

            .then((response) => {
                return response.json()
            })

            .then((data) => {
                this.setState({
                    title: data.title,
                    form: data.forms[this.state.currentForm],
                    fields: data.forms[this.state.currentForm].fields,
                    nbForms: data.forms.length
                })
                // console.log(data.forms[this.state.currentForm])
                // console.log(this.state.nbForms)
            })
    }

    handleSubmit (event) {
        event.preventDefault()
        if (this.state.currentForm < this.state.nbForms - 1) {
            this.setState({
                currentForm: this.state.currentForm + 1
            })
        }

        if (this.state.currentForm === this.state.nbForms - 1) {
            this.setState({ isFinish: true })
        }

        const requestOptions = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state.valuesForm)
        }

        fetch('http://localhost:8080/result', requestOptions)
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                console.log(data)
            })
    }

    handleChange (event) {
        this.setState({
            valuesForm: Object.assign(this.state.valuesForm, { [event.target.name]: event.target.value })
        })
        // console.log(JSON.stringify(this.state.valuesForm))
    }

    afficherResultat () {
        const dataJson = JSON.parse(JSON.stringify(this.state.valuesForm))
        Object.entries(dataJson).forEach(([key, value]) => {
            // do something with key and val
        })
    }

    componentDidUpdate (prevState) {
        if (this.state.currentForm !== prevState.currentForm) {
            fetch('http://localhost:8080/forms', {
                method: 'GET'
            })

                .then((response) => {
                    return response.json()
                })

                .then((data) => {
                    this.setState({
                        title: data.title,
                        form: data.forms[this.state.currentForm],
                        fields: data.forms[this.state.currentForm].fields
                    })
                // console.log(data.forms[this.state.currentForm])
                })
        }
    }

    render () {
        if (!this.state.isFinish) {
            return (
                <div>
                    <h1>{this.state.title}</h1>

                    <h2>{this.state.form.header}</h2>

                    <form>
                        {this.state.fields.map((field, i) =>
                            field.type !== 'select' ? <InputComponent key={i} typeInput={field.type} label={field.label} idInput={field.id} onChange={this.handleChange.bind(this)} />
                                : <SelectComponent key={i} options={field.options} labelSelect={field.label} idSelect={field.id} onChange={this.handleChange.bind(this)} />
                        )}

                        {this.state.currentForm < this.state.nbForms - 1 ? <input type='submit' value='Suivant' onClick={this.handleSubmit.bind(this)} /> : <input type='submit' value='Terminer' onClick={this.handleSubmit.bind(this)} />}

                    </form>

                </div>
            )
        } else {
            return (
                <div>
                    <h1>Sondage termine !</h1>
                    <p>Vous avez envoyer les informations suivantes : </p>
                </div>
            )
        }
    }
}

export default FormContainer
