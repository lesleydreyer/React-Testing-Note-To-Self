import React from 'react';

class Note extends React.Component {
    render() {
        return (
            <div className='note'>
                <p>
                    {this.props.note.text}
                </p>
            </div>
        )
    }
}

export default Note;