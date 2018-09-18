import React from 'react'

class SendMessageForm extends React.Component {
    
    constructor() {
        super()
        this.state = {
            message: ''
        }
       
    }
    
    handleChange(e) {
        this.setState({
            message: e.target.value
        })
    }
    
    handleSubmit(e) {
        e.preventDefault()
        console.log(this.state.message)
        this.props.sendMessage(this.state.message)
    }
    
    render() {
        return (
            <form
                onSubmit={(e) => this.handleSubmit(e)}
                className="send-message-form">
                <input
                    onChange={(e) => this.handleChange(e)}
                    value={this.state.message}
                    placeholder="Type your message and hit ENTER"
                    type="text" />
            </form>
        )
    }
}

export default SendMessageForm