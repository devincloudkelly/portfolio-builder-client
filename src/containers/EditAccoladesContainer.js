import React, { Component } from 'react'
import EditAccoladeForm from '../components/EditAccoladeForm.js'
import EditAccoladeCard from '../components/EditAccoladeCard.js'


export default class EditAccoladesContainer extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
                editing: false,
                id: 0,
                institution: "",
                major: "",
                grad_date: "",
                external_link: "",
                order: 0
        }
        console.log(this.props.accolades)
    }

    handleSubmit = (e, id) => {
        e.preventDefault()
        if(this.state.id === ""){
            this.setState({editing: false}, () => {
                let objToSend = {
                    user_id: this.props.userInfo.id,
                    id: this.state.id,
                    institution: this.state.institution,
                    major: this.state.major,
                    grad_date: this.state.grad_date,
                    external_link: this.state.external_link,
                    order: this.state.order
            }
            delete objToSend['id']
            console.log('%c This is the object being sent to add', 'color: #deff8b;', objToSend)
                this.props.addObj('education', objToSend )
            })
        } else {
            this.setState({editing: false}, () => {
                let objToSend = {
                    user_id: this.props.userInfo.id,
                    id: this.state.id,
                    institution: this.state.institution,
                    major: this.state.major,
                    grad_date: this.state.grad_date,
                    external_link: this.state.external_link,
                    order: this.state.order
            }
            console.log('%c This is the object being sent to edit', 'color: #deff8b;', objToSend)
                this.props.editObj('education', objToSend )
            })
        }
    }

    checkDisplayForm(){
        if(this.state.editing === true){
            return <EditAccoladeForm handleFormSubmit={this.handleSubmit} handleFormChange={this.handleFormChange} cardDetails={this.state}></EditAccoladeForm>
        } else {
            return ""
        }
    }

    renderCards(){
        let accolades = this.props.accolades
        return accolades.map((item,index) => {
            return <EditAccoladeCard deleteObj={this.props.deleteObj} changeEditing={this.changeEditing} key={index} cardDetails={item}> </EditAccoladeCard>
        })
    }

    handleFormChange = (e) => {
        console.log(e.target.name)
       
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    componentDidUpdate(){
        console.log(this.state)
    }

    changeEditing = (e, cardDetails) => {
        this.setState({
            editing: true,
            id: cardDetails.id,
            institution: cardDetails.institution,
            major: cardDetails.major,
            grad_date: cardDetails.grad_date,
            external_link: cardDetails.external_link,
            order: cardDetails.order
    })
    }

    newForm(e){
        e.preventDefault()
        this.setState({
            editing: true,
            id: "",
            institution: "",
            major: "",
            grad_date: "",
            external_link: "",
            order: 0
    })
    }


    render() {
        return (
            <div className="card border-light" style={styles.card}>
                    <div className="card-header text-center" style={styles.about}>Accolades</div>
                    <div className="card-body" style={styles.body}>
                        <button className="btn btn-primary" onClick={e => this.newForm(e)}>Add New Accolade</button>
                        {this.checkDisplayForm()}
                        {this.renderCards()}
                    </div>
                </div>
        )
    }
}

const styles = {

    card: {
        marginTop: 20,
        marginBottom: 20
    },
    body: {
        display: 'flex',
        flexDirection: 'column'
    },
    about: {
        backgroundColor: '#e4f9ff'
    }
}