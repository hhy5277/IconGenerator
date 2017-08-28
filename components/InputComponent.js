const React = require('react')
const ReactDOM = require('react-dom')
const Paper = require('material-ui').Paper
const RadioButtonGroup = require('material-ui').RadioButtonGroup
const RadioButton = require('material-ui').RadioButton
const RaisedButton = require('material-ui').RaisedButton
const CardText = require('material-ui').CardText
const sizeOf = require('image-size')

class InputComponent extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      choice: 'iOS'
    }

    this.handleChoiceChange = this.handleChoiceChange.bind(this)
  }

  render() {
    const divOptions = {
      style: {
        display: 'flex',
        alignSelf: 'stretch',
        width: '100%'
      }
    }

    return React.createElement('div', divOptions, 
      this.makeImage(),
      this.makeChoices()    
    )
  }

  // action

  handleChoiceChange(value) {
    this.setState({
      choice: value
    })
  }

  // make

  makeImage() {
    const divOptions = {
      style: {
        flex: 1.5,
        padding: '10px'
      }
    }

    const paperOptions = {
      style: {
        width: '100%',
        height: '100%'
      }
    }

    return React.createElement('div', divOptions,
      React.createElement(Paper, paperOptions,
        this.makeImageElement(),
        this.makeImageDescriptionElement()
      )
    )
  }

  makeImageElement() {
    let path
    if (this.props.file !== undefined) {
      path = this.props.file.path
    } else {
      path = ''
    }

    const divOptions = {
      style: {
        display: 'flex',
        justifyContent: 'center',
        paddingTop: '20px'
      }
    }

    const imgOptions = {
      style: {
        width: '300px',
        height: '300px',
        border: '1px solid black'
      },
      src: path
    }

    return React.createElement('div', divOptions,
      React.createElement('img', imgOptions)
    )
  }

  makeImageDescriptionElement() {
    let text
    if (this.props.file !== undefined) {
      const size = sizeOf(this.props.file.path)
      text = size.width + ' x ' + size.height + '\n' + 'hello'
    } else {
      text = 'Drag image onto the above box'
    }

    const divOptions = {
      style: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '10px'
      }
    }

    return React.createElement('div', divOptions, 
      React.createElement(CardText, {}, text)
    )
  }

  makeChoices() {
    const divOptions = {
      style: {
        flex: 1,
        padding: '10px'
      }
    }

    const paperOptions = {
      style: {
        paddingTop: '10px',
        paddingBottom: '10px'
      }
    }

    const choices = [
      "iOS", "macOS", "tvOS", "watchOS"
    ]

    const choiceElements = choices.map((name) => {
      const options = {
        value: name,
        label: name,
        key: name
      }

      return React.createElement('RadioButton', options)
    })

    const groupOptions = {
      name: 'choices',
      defaultSelected: this.state.choice,
      onChange: this.handleChoiceChange,
      style: {
        paddingLeft: '10px'
      }
    }

    return React.createElement('div', divOptions,
      React.createElement(Paper, paperOptions,
        React.createElement(RadioButtonGroup, groupOptions, 
          choiceElements
        ),
        this.makeGenerateElement()
      )
    )
  }

  makeGenerateElement() {
    const divOptions = {
      style: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '10px'
      }
    }

    const buttonOptions = {
      backgroundColor: '#EB394E', 
      onTouchTap: this.props.generate,
      style: {
        width: '80%'
      }
    }

    return React.createElement('div', divOptions, 
      React.createElement(RaisedButton, buttonOptions, 'Generate')
    )
  }
}

module.exports = InputComponent